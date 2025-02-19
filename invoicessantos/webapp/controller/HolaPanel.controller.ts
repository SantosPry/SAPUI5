
import Controller from "sap/ui/core/mvc/Controller";
import Dialog from "sap/m/Dialog";
import MessageToast from "sap/m/MessageToast";
import ResourceModel from "sap/ui/model/resource/ResourceModel";



/**
 * @namespace cursologaligrup.invoicessantos.controller
 */

export default class HolaPanel extends Controller {

    private dialog : Dialog

    public onInit () : void | undefined {

    }

    public onBotnButtonPress(): void {
        let oResourceModel = this.getOwnerComponent()?.getModel("i18n") as ResourceModel;
        let sText = oResourceModel?.getProperty("Mensaje")
       MessageToast.show(sText || "No encontrado");

    }

    public async onOpenDialogo () : Promise<void> {
        this.dialog = await <Promise<Dialog>> this.loadFragment({
           name:"cursologaligrup.invoicessantos.fragment.Dialogo"
       }
       );
       this.dialog.open ();


   }
   public onCerrar (): void {
       this.dialog.close();
       
   }



}