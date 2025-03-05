import extend from "sap/base/util/extend";
import Controller from "sap/ui/core/mvc/Controller";
import Component from "../Component";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import History from "sap/ui/core/routing/History";


/**
 *  @namespace cursologaligrup.invoicessantos.controller
 */

export default class Detalle extends Controller {
    public onInit() : void | undefined {
        const router =(this.getOwnerComponent() as Component).getRouter();
        router.getRoute("RouteDetalle")?.attachPatternMatched(this.onObtenerDato, this);
    }

    private onObtenerDato (event : Route$PatternMatchedEvent ) : void {
        const  argumentos =  event.getParameter("arguments") as any;
        const path = argumentos.path;
        const view = this.getView();
        console.log(view)

        view?.bindElement({
            path : window.decodeURIComponent(path),
            model: "serviceOdata"
        });  
    }

    public onPageNavButtonPress () :void {
        const history = History.getInstance();
        const previoushash = history.getPreviousHash();
        if (previoushash !== undefined) {
            window.history.go(-1);

        } else {
            const router = (this.getOwnerComponent() as Component).getRouter();
            router.navTo("RouteApp");
        }
    }
}