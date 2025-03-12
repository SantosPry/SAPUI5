"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("./BaseController");
const JSONModel_1 = require("sap/ui/model/json/JSONModel");
/**
 * @namespace master.logaligroup.empleados.controller
 */
class Main extends BaseController_1.default {
    /*eslint-disable @typescript-eslint/no-empty-function*/
    onInit() {
        this.loadEmployees();
        this.loadCountries();
    }
    loadEmployees() {
        const model = new JSONModel_1.default();
        model.loadData("../model/Employees.json");
        this.setModel(model, "employees");
    }
    loadCountries() {
        const model = new JSONModel_1.default();
        model.loadData("../model/Countries.json");
        this.setModel(model, "countries");
    }
    onFilterBarSearch() {
    }
}
exports.default = Main;
