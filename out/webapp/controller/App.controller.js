"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("sap/ui/core/mvc/Controller");
const MessageToast_1 = require("sap/m/MessageToast");
const JSONModel_1 = require("sap/ui/model/json/JSONModel");
/**
 * @namespace cursologaligrup.invoicessantos.controller
 */
class App extends Controller_1.default {
    /*eslint-disable @typescript-eslint/no-empty-function*/
    onInit() {
        this.viewModel();
    }
    onBotnButtonPress() {
        let oResourceModel = this.getOwnerComponent()?.getModel("i18n");
        let sText = oResourceModel?.getProperty("Mensaje");
        MessageToast_1.default.show(sText || "No encontrado");
    }
    viewModel() {
        let oData = {
            recipient: {
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
        const oModel = new JSONModel_1.default(oData);
        this.getView()?.setModel(oModel, "view");
    }
}
exports.default = App;
