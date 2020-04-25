sap.ui.define(["sap/ui/base/Object","sap/m/MessageBox"],function(e,t){"use strict";return e.extend("com.sap.dinesh.covid19india.dashboard.controller.ErrorHandler",{constructor:function(e){this._oResourceBundle=e.getModel("i18n").getResourceBundle(),this._oComponent=e,this._oModel=e.getModel("my_global_json_model_data_source_country_model"),this._bMessageOpen=!1,this._sErrorText=this._oResourceBundle.getText("errorText"),this._oModel.attachRequestCompleted(function(e){e.getParameters()},this)},_showMetadataError:function(e){t.error(this._sErrorText,{id:"metadataErrorMessageBox",details:"No internet connection",styleClass:this._oComponent.getContentDensityClass(),actions:[t.Action.RETRY,t.Action.CLOSE],onClose:function(e){e===t.Action.RETRY&&this._oModel.refreshMetadata()}.bind(this)})},_showServiceError:function(e){this._bMessageOpen||(this._bMessageOpen=!0,t.error(this._sErrorText,{id:"serviceErrorMessageBox",details:e,styleClass:this._oComponent.getContentDensityClass(),actions:[t.Action.CLOSE],onClose:function(){this._bMessageOpen=!1}.bind(this)}))}})});
