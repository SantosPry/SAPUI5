import View from "sap/ui/core/mvc/View";
import BaseController from "./BaseController";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import JSONModel from "sap/ui/model/json/JSONModel";
import Panel from "sap/m/Panel";

/**
 * @namespace master.logaligroup.empleados.controller
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
        console.log("Entra en onObjectMatched");
        view.bindElement({
        path:`/Employees(${id})/`,
        model: 'northwind'
        })

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
        console.log(index)
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


}