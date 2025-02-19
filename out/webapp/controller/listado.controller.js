"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("sap/ui/core/mvc/Controller");
const JSONModel_1 = require("sap/ui/model/json/JSONModel");
const Filter_1 = require("sap/ui/model/Filter");
const FilterOperator_1 = require("sap/ui/model/FilterOperator");
/***
 * @namespace cursologaligrup.invoicessantos.controller
 */
class listado extends Controller_1.default {
    onInit() {
        this.cargarMoneda();
    }
    cargarMoneda() {
        const oData = { moneda: "EUR"
        };
        const oModel = new JSONModel_1.default(oData);
        this.getView()?.setModel(oModel, "monedas");
    }
    ;
    onFilter(event) {
        const valor = event.getParameter("query");
        const select = this.byId("idSelect");
        const key = select.getSelectedKey();
        const filtros = [];
        if (key) {
            filtros.push(new Filter_1.default("Estado", FilterOperator_1.default.EQ, key));
        }
        if (valor) {
            // filtros.push(new Filter("Producto", FilterOperator.Contains, valor));
            filtros.push(new Filter_1.default({
                filters: [
                    new Filter_1.default("Producto", FilterOperator_1.default.Contains, valor),
                    new Filter_1.default("Marca", FilterOperator_1.default.Contains, valor)
                ],
                and: false
            }));
        }
        const list = this.byId("idList");
        const binding = list.getBinding("items");
        binding.filter(filtros);
    }
}
exports.default = listado;
