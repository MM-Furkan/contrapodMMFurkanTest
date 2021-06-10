@RestResource(urlMapping='/Account/*')
global with sharing class restResourceAccountRecordSharing {
    @HttpGet
    global static resposeWrapper getRecord() {
        // Add your code
        resposeWrapper rW = new resposeWrapper();
        try {
            Date convertedDate = Date.parse(RestContext.request.params.get('filterDate'));
            System.debug('convertedDate : '+ convertedDate);
            // Date dT = Date.parse('12/27/2013');
            List<Account> listAccount  = [ SELECT Id,Name,CreatedDate FROM Account WHERE CreatedDate >: convertedDate ];
            if(listAccount.size() > 0){
                rW.status = true;
                rW.message = 'successfully retrived';
                rW.data = listAccount;
            }else{
                rW.status = true;
                rW.message = 'No record found with this filter date on createdDate'+convertedDate;
                rW.data = listAccount;
            }
            return rW;
        } catch (Exception e) {
            rW.status = true;
            rW.message = 'Error Invalid Input';
            rW.data = null;
            return rW;
        }
    }

    global class resposeWrapper{
        public boolean status;
        public String message;
        public List<Account> data;
    }
}
