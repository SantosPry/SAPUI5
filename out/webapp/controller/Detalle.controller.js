"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("sap/ui/core/mvc/Controller");
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
        view?.bindElement({
            path: window.decodeURIComponent(path),
            model: "serviceOdata"
        });
    }
}
exports.default = Detalle;
