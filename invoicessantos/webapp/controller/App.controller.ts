import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace cursologaligrup.invoicessantos.controller
 */
export default class App extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        this.viewModel();
    }

    public onBotnButtonPress(): void {
        let oResourceModel = this.getOwnerComponent()?.getModel("i18n") as ResourceModel;
        let sText = oResourceModel?.getProperty("Mensaje")
       MessageToast.show(sText || "No encontrado")

    }

    private viewModel () : void {
        let oData = {
                recipient:   {
                        name: "Mundo",
                        details: {
                            name: "Mundo2"
                        }                
                },
                contactos: [
                    {
                        name: "Mundo3"
                    }


                ]

        };

        const oModel = new JSONModel(oData) as JSONModel;
        this.getView()?.setModel(oModel, "view");



    }
}