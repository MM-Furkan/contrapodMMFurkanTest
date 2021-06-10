import { LightningElement,api,track,wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import createTask from "@salesforce/apex/createTaskManager.createTask";
import { NavigationMixin } from 'lightning/navigation';

const projectFields = [
    'Project__c.Name',
    'Project__c.Description__c',
    'Project__c.Project_No__c',
    'Project__c.Total_no_of_Tasks__c',
    'Project__c.Total_no_of_Pending_Tasks__c',
    'Project__c.Total_no_of_Completed_Tasks__c'
];

export default class CreateTaskManager extends NavigationMixin(LightningElement) {
    @api rId = 'a022w00000JKxM6';
    @api srId = null;

    @track projectData = null;

    @track taskList = [];
    @track showTable = false;
    

    constructor(){
        super();
        console.log('constructor RID -> '+this.rId);
    }
    connectedCallback(){
        console.log('connectedCallback RID -> '+this.rId);
    }

    showToast(toastType, toastMsg){
        const event = new ShowToastEvent({
            title: toastMsg,
            message: toastType,
            variant: toastType,
            mode: "dismissable"
        });
        this.dispatchEvent(event);
    }

    navigateToRecordPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.rId,
                objectApiName: 'Project__c',
                actionName: 'view'
            }
        });
    }

    @wire(getRecord, { recordId: '$rId', fields: projectFields })
        wireRec({ error, data }) {
            if (error) {
                this.error = error;
                this.projectData = null;
            } else if (data) {
                this.projectData = JSON.parse(JSON.stringify(data));
                console.log(JSON.parse(JSON.stringify(this.projectData)));
            }
        }

        addTask(event){
            console.log('Add Task');
            // console.log(JSON.parse(JSON.stringify(event)));
            var task = {
                Number : 1,
                Name : null,
                Description__c : null,
                Start_Date__c : null,
                End_Date__c : null
            };
            if(this.taskList.length > 0){
                task.Number = this.taskList.length+1;
            }
            console.log(JSON.parse(JSON.stringify(task)));
            this.taskList.push(task);
            this.showTable = true;
            console.log(JSON.parse(JSON.stringify(this.taskList)));
        }

        removeTask(event){
            this.taskList.pop();
            if(this.taskList.length == 0){
                this.showTable = false;
            }
        }

        handleInputChage(event){
            console.log("handleStandAlonCheckboxChange",JSON.parse(JSON.stringify(event.currentTarget)));
            console.log("handleStandAlonCheckboxChange",JSON.parse(JSON.stringify(event.currentTarget.dataset)));
            this.taskList[event.target.dataset.index][event.target.dataset.key] = event.target.value;
            console.log(JSON.parse(JSON.stringify(this.taskList)));
        }

        submit(event){
            var redirect = event.currentTarget.dataset.variant;
            console.log("handleStandAlonCheckboxChange",JSON.parse(JSON.stringify(event.currentTarget.dataset)));
            const isInputsCorrect = [...this.template.querySelectorAll('lightning-input, lightning-combobox')]
            .reduce((validSoFar, inputField) => {
            inputField.reportValidity();
            return validSoFar && inputField.checkValidity();
            }, true);
            if (isInputsCorrect) {
                console.log("handleStandAlonCheckboxChange",JSON.parse(JSON.stringify(this.taskList)));
                console.log("handleStandAlonCheckboxChange",JSON.stringify(this.taskList));
                this.showSpinner = true;
                createTask({json : JSON.stringify(this.taskList), projectId : this.rId}).then((data) => {
                    if(data){
                        if(data == true){
                            this.showToast('Success','Task Created Successfully');
                            this.taskList = [];
                            this.showSpinner = false;
                            if(redirect == 'save'){
                                this.navigateToRecordPage();
                            }
                        }else{
                            this.showSpinner = false;
                            this.showToast('info','Task creation fail');
                        }
                    }else{
                        this.showSpinner = false;
                        this.showToast('info','Task creation fail');
                    }
                });
            }
        }
}