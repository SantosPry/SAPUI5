import extend from "sap/base/util/extend";
import Controller from "sap/ui/core/mvc/Controller";
import Component from "../Component";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";


/**
 *  @namespace cursologaligrup.invoicessantos.controller
 */

export default class Detalle extends Controller {
    public onInit() : void | undefined {
        const router =(this.getOwnerComponent() as Component).getRouter();
        router.getRoute("RouteDetalle")?.attachPatternMatched(this.onObtenerDeta, this);
    }

    private onObtenerDeta (event : Route$PatternMatchedEvent ) : void {
        const  argumentos =  event.getParameter("arguments") as any;
        const path = argumentos.path;
        const view = this.getView();

        view?.bindElement({
            path : window.decodeURI(path),
            model: "serviceOdata"
        });  
    }
}