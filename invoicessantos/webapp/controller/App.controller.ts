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