public class createTaskManager {
    public createTaskManager() {}

    // CALLING FRO LWC 
    @AuraEnabled(cacheable=false)
    public static boolean createTask(String json,String projectId){
        try {
            String s = json.replace( '__c' , '_c' );	// REPLACE ALL KEYS FROM __C TO _C FOR APEX CLASS VARIBALE
            List<json2Apex> taskdataList = parseTarget(s);	// CONVERT JSON TO APEX READABLE FORM
            List<Tasks__c> taskList = new List<Tasks__c>();	
            for (json2Apex jA : taskdataList) {			// CONVERTED TASK LIST ITERATION TO GET THE VALUES FROM LWC
                Tasks__c tsk = new Tasks__c();			
                tsk.Name = jA.Name;
                tsk.Description__c = jA.Description_c;
                tsk.Start_Date__c = jA.Start_Date_c;
                tsk.End_Date__c = jA.End_Date_c;
                tsk.Project__c = projectId;
                taskList.add(tsk);		// ADD TASK TO TASKLIST FOR INSERTING
            }
            insert taskList;			// INSERT TASK'S
            return true;
        } catch (Exception e) {
            return false;
        }
        
    }
    
    // JSON TO APEX CONVERTER
    public static List<json2Apex> parseTarget(String json) {
        return (List<json2Apex>) System.JSON.deserialize(json,List<json2Apex>.class);
    }

    // JSON TO APEX WRAPPER CLASS
    public class json2Apex{
        public String Id;
        public String Name;
        public String Description_c;
        public Date Start_Date_c;
        public Date End_Date_c;
    }
}