import extend from "sap/base/util/extend";
import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";

/***
 * @namespace cursologaligrup.invoicessantos.controller
 */


export default class listado extends Controller {

    public onInit(): void | undefined {
        this.cargarMoneda();
        
    }

    private cargarMoneda() : void {
        const oData : {
            moneda : string
        } = { moneda : "EUR"
        };
        const oModel = new JSONModel(oData);
        this.getView()?.setModel(oModel, "monedas");
    };

}