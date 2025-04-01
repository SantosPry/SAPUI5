import View from "sap/ui/core/mvc/View";
import BaseController from "./BaseController";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import JSONModel from "sap/ui/model/json/JSONModel";
import Panel from "sap/m/Panel";
import Button, { Button$PressEvent } from "sap/m/Button";
import Toolbar from "sap/m/Toolbar";
import Context from "sap/ui/model/Context";
import Utils from "../utils/utils";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ODataListBinding from "sap/ui/model/odata/v2/ODataListBinding";

/**
 * @namespace master.logaligroup.empleados.view.controller
 */

export default class Details extends BaseController {

    panel : Panel;


    public onInit () : void | undefined {

        const router = this.getRouter();
        router.getRoute("RouteDetails")?.attachPatternMatched(this.onObjectMatched.bind(this));

        this.formModel();

    }

    private formModel () : void {
        const model = new JSONModel([]);
        this.setModel(model, "form");
    }

    private onObjectMatched (event : Route$PatternMatchedEvent ) : void {

        const arg = <any> event.getParameter("arguments");
        const id = arg.id;
        const view = this.getView() as View;
        const $this = this;

        view.bindElement({
            path:`/Employees(${id})/`,
            model: 'northwind',
            events: {
                change: function () {
                    $this.read();
                },
                dataRequest: function () {

                },
                dataReceived: function () {
                    
                }
            }
        });

    }

    public onClosePress () : void {
        const router = this.getRouter();
        const viewModel = this.getModel("view") as JSONModel;
        viewModel.setProperty("/layout","OneColumn")
        router.navTo("RouteMain");
    }

    private removeAllContent () : void {
        const panel = this.byId("tableIncidence") as Panel;
        panel.removeAllContent();
    }
    
    public async onCreateIncidencePress () : Promise<void> {
        const panel = this.byId("tableIncidence") as Panel;

        const formModel = this.getModel("form") as JSONModel;
        const aData = formModel.getData();
        const index = aData.length;
        aData.push({Index: index + 1});
        formModel.refresh();

        this.panel = await <Promise<Panel>> this.loadFragment({
            name: "master.logaligroup.empleados.fragment.NewIncidence"
        });

        this.panel.bindElement({
            path: 'form>/'+index,
            model: 'form'
        });

        panel.addContent(this.panel);
    }

    public async onSavePress (event: Button$PressEvent) : Promise<void> {
        console.log("Estoy a punto de crear un nuevo registro");
        const button = event.getSource() as Button;
        const toolbar = button.getParent() as Toolbar;
        const panel = toolbar.getParent() as Panel;
        const bindingContext = panel.getBindingContext("form") as Context;

        const northwind = this.getView()?.getBindingContext("northwind");

        const utils = new Utils(this);

        let object = {
            path: '/IncidentsSet',
            data: {
                SapId:          utils.getSapId(),
                EmployeeId:     (northwind?.getProperty("EmployeeID") as number).toString(),
                CreationDate:   bindingContext.getProperty("CreationDate"),
                Type:           bindingContext.getProperty("Type"),
                Reason:         bindingContext.getProperty("Reason")
            }
        };

        await utils.crud('create', new JSONModel(object));
    }

    private async read () : Promise<void> {
        const utils = new Utils(this);
        const northwind = this.getView()?.getBindingContext("northwind");
        const sEmployeeId = (northwind?.getProperty("EmployeeID") as number).toString();
        const sSapId = utils.getSapId();

        const object = {
            path: '/IncidentsSet',
            filters: [
                new Filter("SapId", FilterOperator.EQ, sSapId),
                new Filter("EmployeeId", FilterOperator.EQ, sEmployeeId)
            ]
        };

        const results = await utils.read(new JSONModel(object));
        this.showIncidents(results);
    }

    private showIncidents (results : ODataListBinding | void) {
        //Limpiar incidencias
        const panel = this.byId("tableIncidence") as Panel;
        panel.removeAllContent();


        const array = results as any;
        const formModel = this.getModel("form") as JSONModel;
        formModel.setData(array.results);
        
       // Hacer el mapeo

       array.results.forEach( async (incidence : object, index : number) => {
            const newIncidence = await <Promise<Panel>> this.loadFragment({name: "master.logaligroup.empleados.fragment.NewIncidence"});
            newIncidence.bindElement("form>/"+index);
            panel.addContent(newIncidence);
       });
        
    }

}