
import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

/**
 * @namespace cursologaligrup.invoicessantos.controller
 */

export default class HolaPanel extends Controller {
    public onInit () : void | undefined {

    }

    public onBotnButtonPress(): void {
        let oResourceModel = this.getOwnerComponent()?.getModel("i18n") as ResourceModel;
        let sText = oResourceModel?.getProperty("Mensaje")
       MessageToast.show(sText || "No encontrado")

    }

}