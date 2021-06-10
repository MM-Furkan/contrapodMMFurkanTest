global without sharing class DemoController {
    
    @AuraEnabled
    public List<Demo__c> listDemo {get;set;}

    public DemoController() {
        listDemo = new List<Demo__c>();
        listDemo = [ SELECT Id,Name,Demo_URL__c,Description__c,Type__c FROM Demo__c LIMIT 1];
    }

    @AuraEnabled(cacheable=true)
    public static List<Demo__c> getDemos(){
        List<Demo__c> listDemo1 = new List<Demo__c>();
        listDemo1 = [ SELECT Id,Name,Demo_URL__c,External_link__c,Description__c,Type__c FROM Demo__c WHERE Active__c = true Order by Order_Number__c ];
        System.debug('List -> '+listDemo1);
        return listDemo1;
    }

    @AuraEnabled(cacheable=true)
    public static string methodName(){
        return 'Happy Birth Day Furkan :) ';
    }

    @AuraEnabled(cacheable=true)
    public static List<Skills__c> getSkills(){
        List<Skills__c> listSkills1 = new List<Skills__c>();
        listSkills1 = [ SELECT Id,Name,Percent__c,Order_Number__c,Icon_Name__c,Level__c FROM Skills__c Order by Order_Number__c ];
        System.debug('List -> '+listSkills1);
        return listSkills1;
    }
}
