"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("sap/ui/core/mvc/Controller");
const History_1 = require("sap/ui/core/routing/History");
/**
 * @namespace master.logaligroup.empleados.controller
 */
class BaseController extends Controller_1.default {
    getRouter() {
        return this.getOwnerComponent().getRouter();
    }
    getModel(name) {
        return this.getView()?.getModel(name);
    }
    setModel(model, name) {
        this.getView()?.setModel(model, name);
    }
    getResourceBundle() {
        return this.getOwnerComponent().getModel("i18n").getResourceBundle();
    }
    onNavToBack() {
        let sPreviousHash = History_1.default.getInstance().getPreviousHash();
        if (sPreviousHash !== undefined) {
            window.history.go(-1);
        }
        else {
            this.getRouter().navTo("RouteMain");
        }
    }
}
exports.default = BaseController;
