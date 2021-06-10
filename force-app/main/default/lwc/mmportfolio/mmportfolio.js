import { LightningElement,track,api,wire } from 'lwc';
import getDemos from '@salesforce/apex/DemoController.getDemos';
import getSkills from '@salesforce/apex/DemoController.getSkills';
import methodName from '@salesforce/apex/DemoController.methodName';
import mmimg from '@salesforce/resourceUrl/mmimg';

export default class Mmportfolio extends LightningElement {
    @track url = 'https://drive.google.com/file/d/1qQA1txXb-DKiWeRL3aPAYRaasATSRtAG/preview';
    // @track url = 'https://drive.google.com/file/d/10hM_pyRnLrWNKQhgxqaEyOFMhiQMZRcP/view?usp=sharing';
    jsonDemo = null;
    // jsonSkills = null;
    showSpinner = true;
    staticResourceURL = mmimg;

    @wire(getDemos)
    wiredDemos({error, data}){
        this.showSpinner = true;
        if(data){
            console.log(JSON.parse(JSON.stringify(data)));
            this.demoList = JSON.parse(JSON.stringify(data));
            this.showSpinner = false;
        }else if(error){
            console.log(JSON.parse(JSON.stringify(error)));
            console.log(JSON.parse(JSON.stringify(data)));
            this.showSpinner = false;
        }
    }

    @wire(getSkills)
    wiredSkills({error, data}){
        this.showSpinner = true;
        if(data){
            console.log(JSON.parse(JSON.stringify(data)));
            this.skillList = JSON.parse(JSON.stringify(data));
            this.showSpinner = false;
        }else if(error){
            console.log(JSON.parse(JSON.stringify(error)));
            console.log(JSON.parse(JSON.stringify(data)));
            this.showSpinner = false;
        }
    }

    @wire(methodName)
    wiredmethodName({error, data}){
        console.log('==> data==>',data);
        console.log('==> error==>',error);
    }

    get demoList(){
        console.log('demoList getter -> ',this.jsonDemo);
        return this.jsonDemo;
    }
    set demoList(value){
        console.log('demoList Setter -> ',value);
        this.jsonDemo = value;
    }
    get skillList(){
        console.log('skillList getter -> ',this.jsonSkills);
        return this.jsonSkills;
    }
    set skillList(value){
        console.log('skillList Setter -> ',value);
        this.jsonSkills = value;
    }
}