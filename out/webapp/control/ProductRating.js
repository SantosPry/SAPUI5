"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Control_1 = require("sap/ui/core/Control");
const RatingIndicator_1 = require("sap/m/RatingIndicator");
const Label_1 = require("sap/m/Label");
const Button_1 = require("sap/m/Button");
/**
 * @namespace com.logaligroup.invoices.control
 */
class ProductRating extends Control_1.default {
    constructor(id, settings) {
        super(id, settings);
        this.renderer = {
            apiVersion: 4,
            render: (rm, control) => {
                rm.openStart("div", control);
                rm.class("productRating");
                rm.openEnd();
                rm.renderControl(control.getAggregation("_rating"));
                rm.renderControl(control.getAggregation("_label"));
                rm.renderControl(control.getAggregation("_button"));
                rm.close("div");
            }
        };
    }
    init() {
        this.setAggregation("_rating", new RatingIndicator_1.default({
            iconSize: "2rem",
            value: this.getValue(),
            liveChange: this._onRate.bind(this)
        }));
        this.setAggregation("_label", new Label_1.default({
            text: "{i18n>productRatingLabelInitial}"
        }).addStyleClass("sapUiSmallMargin"));
        this.setAggregation("_button", new Button_1.default({
            text: "{i18n>productRatingButton}",
            press: this._onSubmit.bind(this)
        }).addStyleClass("sapUiSmallMarginTopBottom"));
    }
    _onRate(event) {
        const resourceBundle = this.getModel("i18n")?.getResourceBundle();
        const value = event.getParameter("value");
        const maxValue = event.getSource().getMaxValue();
        this.setProperty("value", value);
        this.getAggregation("_label").setText(resourceBundle.getText("productRatingLabelIndicator", [value, maxValue]));
        this.getAggregation("_label").setDesign("Bold");
    }
    _onSubmit() {
        const resourceBundle = this.getModel("i18n")?.getResourceBundle();
        this.getAggregation("_rating").setEnabled(false);
        this.getAggregation("_button").setEnabled(false);
        this.getAggregation("_label").setText(resourceBundle.getText("productRatingLabelFinal"));
        this.fireEvent("change", {
            value: this.getValue()
        });
    }
    setValue(value) {
        this.setProperty("value", value);
        this.getAggregation("_rating").setValue(value);
        return this;
    }
    reset() {
        const resourceBundle = this.getModel("i18n")?.getResourceBundle();
        this.getAggregation("_rating").setEnabled(true);
        this.getAggregation("_button").setEnabled(true);
        this.getAggregation("_label").setText(resourceBundle.getText("productRatingLabelInitial"));
        this.getAggregation("_label").setDesign("Standard");
        this.setValue(0);
    }
}
ProductRating.metadata = {
    properties: {
        value: {
            type: 'float',
            defaultValue: 0
        }
    },
    aggregations: {
        _rating: {
            type: "sap.m.RatingIndicator",
            multiple: false,
            visibility: "hidden"
        },
        _label: {
            type: "sap.m.Label",
            multiple: false,
            visibility: "hidden"
        },
        _button: {
            type: "sap.m.Button",
            multiple: false,
            visibility: "hidden"
        }
    },
    events: {
        change: {
            parameters: {
                value: "float"
            }
        }
    }
};
exports.default = ProductRating;
