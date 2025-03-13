"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JSONModel_1 = require("sap/ui/model/json/JSONModel");
const BaseController_1 = require("./BaseController");
/**
 * @namespace master.logaligroup.empleados.controller
 */
class App extends BaseController_1.default {
    /*eslint-disable @typescript-eslint/no-empty-function*/
    onInit() {
        this.viewModel();
    }
    viewModel() {
        const data = {
            //            layout: "TwoColumnsMidExpanded"
            layout: "OneColumn"
        };
        const model = new JSONModel_1.default(data);
        this.setModel(model, "view");
    }
}
exports.default = App;
