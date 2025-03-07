import extend from "sap/base/util/extend";
import Controller from "sap/ui/core/mvc/Controller";
import Component from "../Component";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import History from "sap/ui/core/routing/History";
import { ProductRating$ChangeEvent } from "../control/ProductRating";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import MessageToast from "sap/m/MessageToast";
import ProductRating from "../control/ProductRating";


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

        (this.byId("rating") as ProductRating).reset();

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
    };

    public onRatingChange (event: ProductRating$ChangeEvent) : void {
        const value = event.getParameter("value");
        const resourceBundle = (this.getView()?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;
        MessageToast.show(resourceBundle.getText("ratinConfirmation", [value]) || "");

    }
}