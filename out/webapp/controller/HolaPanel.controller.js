"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("sap/ui/core/mvc/Controller");
const MessageToast_1 = require("sap/m/MessageToast");
/**
 * @namespace cursologaligrup.invoicessantos.controller
 */
class HolaPanel extends Controller_1.default {
    onInit() {
    }
    onBotnButtonPress() {
        let oResourceModel = this.getOwnerComponent()?.getModel("i18n");
        let sText = oResourceModel?.getProperty("Mensaje");
        MessageToast_1.default.show(sText || "No encontrado");
    }
    async onOpenDialogo() {
        this.dialog = await this.loadFragment({
            name: "cursologaligrup.invoicessantos.fragment.Dialogo"
        });
        this.dialog.open();
    }
    onCerrar() {
        this.dialog.close();
    }
}
exports.default = HolaPanel;
