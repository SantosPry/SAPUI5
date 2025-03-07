"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("sap/ui/core/mvc/Controller");
const History_1 = require("sap/ui/core/routing/History");
const MessageToast_1 = require("sap/m/MessageToast");
/**
 *  @namespace cursologaligrup.invoicessantos.controller
 */
class Detalle extends Controller_1.default {
    onInit() {
        const router = this.getOwnerComponent().getRouter();
        router.getRoute("RouteDetalle")?.attachPatternMatched(this.onObtenerDato, this);
    }
    onObtenerDato(event) {
        const argumentos = event.getParameter("arguments");
        const path = argumentos.path;
        const view = this.getView();
        this.byId("rating").reset();
        view?.bindElement({
            path: window.decodeURIComponent(path),
            model: "serviceOdata"
        });
    }
    onPageNavButtonPress() {
        const history = History_1.default.getInstance();
        const previoushash = history.getPreviousHash();
        if (previoushash !== undefined) {
            window.history.go(-1);
        }
        else {
            const router = this.getOwnerComponent().getRouter();
            router.navTo("RouteApp");
        }
    }
    ;
    onRatingChange(event) {
        const value = event.getParameter("value");
        const resourceBundle = this.getView()?.getModel("i18n")?.getResourceBundle();
        MessageToast_1.default.show(resourceBundle.getText("ratinConfirmation", [value]) || "");
    }
}
exports.default = Detalle;
