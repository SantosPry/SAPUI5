import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Controller from "sap/ui/core/mvc/Controller";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

export default {
    statusText : function (this: Controller, status : string){
        const resource = <ResourceBundle> (this.getOwnerComponent()?.getModel("i18n") as ResourceModel).getResourceBundle();
            switch (status) {
                case 'A' : return resource.getText("StatusA");
                case 'B' : return resource.getText("StatusB");
                case 'C' : return resource.getText("StatusC");
                default : return resource.getText("StatusD")

            }


    }


}