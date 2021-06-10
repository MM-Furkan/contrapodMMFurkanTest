import { LightningElement, track, wire, api } from "lwc";
import getOpprtunity from "@salesforce/apex/opportunityManager.getOpprtunity";
import updateOpty from '@salesforce/apex/opportunityManager.updateOpty';
import { getPicklistValues,getObjectInfo } from "lightning/uiObjectInfoApi";
import OPTY_OBJECT from '@salesforce/schema/Opportunity';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class UpdateOpportunityManager extends LightningElement {
  @track showSpinner = false;
  @track optList = null;

  @track optionStage

  connectedCallback() {
    console.log("connectedCallback is Calling");
    this.wireOPTY();
  }

  showToast(toastType,toastTitle, toastMsg) {
    const event = new ShowToastEvent({
      title: toastTitle,
      message: toastMsg,
      variant: toastType,
      mode: "dismissable"
    });
    this.dispatchEvent(event);
  }

  @wire(getObjectInfo, { objectApiName: OPTY_OBJECT })opportinityInfo;

  @wire(getPicklistValues,{recordTypeId: '$opportinityInfo.data.defaultRecordTypeId',fieldApiName: STAGE_FIELD})
  setPicklistOptions({error, data}) {
    console.log('setPicklistOptions data -> ',data);
    console.log('setPicklistOptions error -> ',error);
    if (data) {
        this.optionStage = data.values;
    } else if (error) {
        console.log(error);
    }
}

  wireOPTY() {
    this.showSpinner = true;
    new Promise((resolve, reject) => {
      setTimeout(() => {
        getOpprtunity().then(data => {
          console.log("wireOPTY is Calling", JSON.parse(JSON.stringify(data)));
          if (data) {
            console.log(JSON.parse(JSON.stringify(data)));
            var d = JSON.parse(JSON.stringify(data));
            this.optList = JSON.parse(JSON.stringify(d));
            resolve();
            this.showSpinner = false;
          } else {
            this.optList = undefined;
            resolve();
            this.showSpinner = false;
          }
        });
      }, 0);
    }).then(() => (this.showSpinner = false));
  }

  wiredUpdateOpty(){
    this.showSpinner = true;
    new Promise((resolve, reject) => {
      setTimeout(() => {
        updateOpty({json : JSON.stringify(this.optList)}).then(data => {
          if(data == 'success'){
            this.showToast('success','Record Update','Opprtunity record has been successfully updated');
            this.wireOPTY();
            resolve();
            this.showSpinner = false;
          }else{
            this.showToast('error','Error!','Fail to update records');
            resolve();
            this.showSpinner = false;
          }
        }).catch((error)=>{
          this.showToast('error','Exception!',error);
            resolve();
            this.showSpinner = false;
        });
      }, 0);
    }).then(() => (this.showSpinner = false));
  }

  handleStageChange(event){
    console.log('handleStageChange',event.target.value);
    // console.log('handleStageChange',JSON.parse(JSON.stringify(event.target.dataset.id)));
    console.log('handleStageChange',JSON.parse(JSON.stringify(event.target.dataset)));
    this.optList[event.target.dataset.index].StageName = event.target.value;
  }

  handleDateChange(event){
    console.log('handleDateChange',event.target.value);
    // console.log('handleDateChange',JSON.parse(JSON.stringify(event.target.dataset.id)));
    this.optList[event.target.dataset.index].CloseDate = event.target.value;
  }



}
