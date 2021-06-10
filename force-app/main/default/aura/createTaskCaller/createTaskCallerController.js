({
    init : function(component, event, helper) {
        var pageReference = component.get("v.pageReference");var a = component.get("v.recordId");
        component.set("v.refRecordId", pageReference.state.c__refRecordId);
        component.set("v.sObjectName", pageReference.state.c__refsObjectName);
    }
})
