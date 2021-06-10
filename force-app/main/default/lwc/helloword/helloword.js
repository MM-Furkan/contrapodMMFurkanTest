import { LightningElement,track,wire,api } from 'lwc';

export default class Helloword extends LightningElement {
    @api rId;
    @api srId;
    @track firVar = '';
    secodVar = '';

    jsonObject = {
        firstName : {
            oneDepth : {
                twoDepth : {
                    value : ''
                },
                value : ''
            },
            value : ''
        },
        lastName : {
            value : ''
        },
    }

    @track jsonObjectwithTrack = {
        firstName : {
            oneDepth : {
                twoDepth : {
                    value : ''
                },
                value : ''
            },
            value : ''
        },
        lastName : {
            value : ''
        },
    }


    renderedCallback(){
        console.log('RerenderCallback');
    }
    handleChange(event){
        this.firVar = event.target.value;
        this.secodVar = event.target.value;
        this.jsonObject.firstName.value = event.target.value;
        this.jsonObject.firstName.oneDepth.value = event.target.value;
        this.jsonObject.firstName.oneDepth.twoDepth.value = event.target.value;
        this.jsonObject.lastName.value = event.target.value;
    }
    otherChnage(event){
        this.secodVar = event.target.value;
    }
    onlyOneChange(event){
        this.jsonObject.firstName.oneDepth.twoDepth.value = event.target.value;
    }
    onlyOneChangeTrackJSON(event){
        this.showSpinner = true;
        new Promise(
        (resolve,reject) => {
            setTimeout(()=> {
                this.jsonObjectwithTrack.firstName.oneDepth.twoDepth.value = event.target.value;
                resolve();
            }, 0);
        }).then(
            () => this.showSpinner = false
        );
    }

    
}