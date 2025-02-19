import extend from "sap/base/util/extend";
import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import { SearchField$SearchEvent } from "sap/m/SearchField";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import FilterSelect from "sap/m/semantic/FilterSelect";
import List from "sap/m/List";
import ListBinding from "sap/ui/model/ListBinding";
import Select from "sap/m/Select";

/***
 * @namespace cursologaligrup.invoicessantos.controller
 */


export default class listado extends Controller {

    public onInit(): void | undefined {
        this.cargarMoneda();
        
    }

    private cargarMoneda() : void {
        const oData : {
            moneda : string
        } = { moneda : "EUR"
        };
        const oModel = new JSONModel(oData);
        this.getView()?.setModel(oModel, "monedas");
    };
    public onFilter(event : SearchField$SearchEvent) : void {
        const valor = event.getParameter("query");
        const select = this.byId("idSelect") as Select;
        const key = select.getSelectedKey();
        const filtros = [] ;

        if (key) {
            filtros.push(new Filter("Estado", FilterOperator.EQ, key));

        }

        if (valor) {
           // filtros.push(new Filter("Producto", FilterOperator.Contains, valor));
                filtros.push( 
                  new Filter({
                    filters: [
                            new Filter("Producto", FilterOperator.Contains,valor),
                            new Filter("Marca", FilterOperator.Contains,valor)
                ],
                and: false
             })
            );
        }
        const list = this.byId("idList") as List;
        const binding = list.getBinding("items") as ListBinding;
        binding.filter(filtros);

   }
}