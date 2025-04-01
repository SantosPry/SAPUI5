import Controller from "sap/ui/core/mvc/Controller";
import Component from "../Component";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageBox from "sap/m/MessageBox";
import ODataListBinding from "sap/ui/model/odata/v2/ODataListBinding";

/**
 * @namespace master.logaligroup.empleados.utils
 */

export default class Utils {

    private controller : Controller;

    private model : ODataModel

    private resourceBundle : ResourceBundle;

    constructor (controller : Controller) {
        this.controller = controller;
        this.model = (this.controller.getOwnerComponent() as Component).getModel("zservice") as ODataModel;
        this.resourceBundle = <ResourceBundle> ((this.controller.getOwnerComponent() as Component).getModel("i18n") as ResourceModel).getResourceBundle(); 
    }

    public getSapId () : string {
        return 'a25c347@logaligroup.com'
    }

    public async crud (action: string, object? : JSONModel) : Promise<void> {
        const resourceBundle = this.resourceBundle;
        const $this = this;

        MessageBox.confirm(resourceBundle.getText("question") || 'no text defined', {
            actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
            emphasizedAction: MessageBox.Action.OK,
            onClose: async function (sAction : string) {
                if (sAction === MessageBox.Action.OK) {
                    switch (action) {
                        case 'create': await $this._create(object);
                        case 'update': await $this._update();
                        case 'delete': await $this._delete();
                    }
                }
            }
        });
    }

    public async read (object? : JSONModel) : Promise<void | ODataListBinding> {
        const model = this.model;
        const path = object?.getProperty("/path");
        const filters = object?.getProperty("/filters");
        const resourceBundle = this.resourceBundle;

        return new Promise((resolve, reject)=>{
            model.read(path, {
                filters: filters,
                success: function (data : ODataListBinding) {
                    resolve(data); //return
                },
                error: function () {
                    reject();
                }
            });
        });
    }

    private async _create(object?: JSONModel) : Promise<void> {

        const model = this.model;
        const path = object?.getProperty("/path");
        const data = object?.getProperty("/data");
        const resourceBundle = this.resourceBundle;

        model.create(path, data, {
            success: function () {
                MessageBox.success(resourceBundle.getText("success") || 'no text defined');
            },
            error: function () {
                MessageBox.error(resourceBundle.getText("error") || 'no text defined');
            }
        });
        
    }

    private async _update () : Promise<void> {

    }

    private async _delete () : Promise<void> {
        
    }

}