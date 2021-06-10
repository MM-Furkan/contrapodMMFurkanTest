public with sharing class opportunityManager {
    public opportunityManager() {

    }

    @AuraEnabled(cacheable=false)
    public static List<Opportunity> getOpprtunity(){
        List<Opportunity> optyList = new List<Opportunity>();
        return  optyList = [ SELECT Id,Name,AccountId,CloseDate,Description,StageName,Type,Amount FROM Opportunity ORDER BY Name ];
    }

    @AuraEnabled
    public static String updateOpty(String json){
        try {
            String s = json.replace( '__c' , '_c' );
            String ss = s.replace( '__r' , '_r' );
            List<json2apex> p2json = parseTarget(ss);
            List<Opportunity> listOpty = new List<Opportunity>();
            if(Schema.sObjectType.Opportunity.fields.StageName.isUpdateable() && Schema.sObjectType.Opportunity.fields.CloseDate.isUpdateable()){
                for (json2apex j2A : p2json) {
                    Opportunity Opty = new Opportunity();
                    Opty.Id = j2A.Id;

                    Opty.StageName = j2A.StageName;
                    Opty.CloseDate = j2A.CloseDate;
                    listOpty.add(Opty);
                }
                update listOpty;
                return 'success';
            }else{
                return 'you don\'t have permission to update the record';
            }
        } catch (Exception e) {
            return String.valueOf(e);
            
        }
    }

    public static List < json2apex > parseTarget(String json) {
        return (List < json2apex > ) System.JSON.deserialize(json, List < json2apex > .class);
    }

    public class json2apex{
        public String Id;
        public String StageName;
        public Date CloseDate;
    }
}
