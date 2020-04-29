sap.ui.require.preload({"com/sap/dinesh/covid19india/dashboard/Component.js":'sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","com/sap/dinesh/covid19india/dashboard/model/models","com/sap/dinesh/covid19india/dashboard/controller/ErrorHandler","sap/base/Log"],function(s,t,e,i,o){"use strict";return s.extend("com.sap.dinesh.covid19india.dashboard.Component",{metadata:{manifest:"json"},init:function(){s.prototype.init.apply(this,arguments),o.Level="NONE",this._oErrorHandler=new i(this),this.setModel(e.createDeviceModel(),"device"),this.getRouter().initialize()},destroy:function(){this._oErrorHandler.destroy(),s.prototype.destroy.apply(this,arguments)},getContentDensityClass:function(){return void 0===this._sContentDensityClass&&(jQuery(document.body).hasClass("sapUiSizeCozy")||jQuery(document.body).hasClass("sapUiSizeCompact")?this._sContentDensityClass="":t.support.touch?this._sContentDensityClass="sapUiSizeCozy":this._sContentDensityClass="sapUiSizeCompact"),this._sContentDensityClass}})});',"com/sap/dinesh/covid19india/dashboard/controller/App.controller.js":'sap.ui.define(["com/sap/dinesh/covid19india/dashboard/controller/BaseController","sap/ui/model/json/JSONModel"],function(e,n){"use strict";return e.extend("com.sap.dinesh.covid19india.dashboard.controller.App",{onInit:function(){var e=new n({busy:!0,delay:0});this.setModel(e,"appView"),this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())},fnSetAppNotBusy:function(){}})});',"com/sap/dinesh/covid19india/dashboard/controller/BaseController.js":'sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("com.sap.dinesh.covid19india.dashboard.controller.BaseController",{getRouter:function(){return sap.ui.core.UIComponent.getRouterFor(this)},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},getResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},onShareEmailPress:function(){var e=this.getModel("objectView")||this.getModel("worklistView");sap.m.URLHelper.triggerEmail(null,e.getProperty("/shareSendEmailSubject"),e.getProperty("/shareSendEmailMessage"))},checkConnection:function(){return navigator.onLine}})});',"com/sap/dinesh/covid19india/dashboard/controller/ErrorHandler.js":'sap.ui.define(["sap/ui/base/Object","sap/m/MessageBox"],function(e,s){"use strict";return e.extend("com.sap.dinesh.covid19india.dashboard.controller.ErrorHandler",{constructor:function(e){this._oResourceBundle=e.getModel("i18n").getResourceBundle(),this._oComponent=e,this._bMessageOpen=!1,this._sErrorText=this._oResourceBundle.getText("errorText")},_showMetadataError:function(e){s.error(this._sErrorText,{id:"metadataErrorMessageBox",details:"No internet connection",styleClass:this._oComponent.getContentDensityClass(),actions:[s.Action.RETRY,s.Action.CLOSE],onClose:function(e){e===s.Action.RETRY&&this._oModel.refreshMetadata()}.bind(this)})},_showServiceError:function(e){this._bMessageOpen||(this._bMessageOpen=!0,s.error(this._sErrorText,{id:"serviceErrorMessageBox",details:e,styleClass:this._oComponent.getContentDensityClass(),actions:[s.Action.CLOSE],onClose:function(){this._bMessageOpen=!1}.bind(this)}))}})});',"com/sap/dinesh/covid19india/dashboard/controller/map.controller.js":'sap.ui.define(["com/sap/dinesh/covid19india/dashboard/controller/BaseController","sap/ui/model/json/JSONModel","sap/ui/Device","sap/ui/core/routing/History"],function(e,t,o,i){"use strict";return e.extend("com.sap.dinesh.covid19india.dashboard.controller.map",{onInit:function(){this.getRouter().getRoute("map").attachMatched(this._onRouteMatched,this)},_onRouteMatched:function(){if(this.getView().getModel("appView").setProperty("/busy",!0),this.checkConnection()){var e=new t;e.setData(this.getOwnerComponent().getModel("CountryData").getData()),e.setSizeLimit(500),this.getView().setModel(e)}else this.getRouter().getTargets().display("notFound");this.getView().getModel("appView").setProperty("/busy",!1)},onAfterRendering:function(){this.getView().setBusy(!1)},onNavBack:function(){this.getView().getModel("appView").setProperty("/busy",!0),void 0!==i.getInstance().getPreviousHash()?window.history.go(-1):this.getRouter().navTo("worklist",{},!0)},GoogleMap:function(){}})});',"com/sap/dinesh/covid19india/dashboard/controller/NotFound.controller.js":'sap.ui.define(["com/sap/dinesh/covid19india/dashboard/controller/BaseController"],function(n){"use strict";return n.extend("com.sap.dinesh.covid19india.dashboard.controller.NotFound",{onInit:function(){var n=this;n.intervalHandle=setInterval(function(){n.getData()},3e4)},onLinkPressed:function(){this.checkConnection()&&window.open("https://dineshchadoker.com/Covid19India/","_self")}})});',"com/sap/dinesh/covid19india/dashboard/controller/Worklist.controller.js":'sap.ui.define(["com/sap/dinesh/covid19india/dashboard/controller/BaseController","sap/ui/model/json/JSONModel","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/core/Fragment","sap/ui/Device","sap/base/util/deepClone"],function(e,t,o,n,i,s,r){"use strict";return e.extend("com.sap.dinesh.covid19india.dashboard.controller.Worklist",{onInit:function(){this.getRouter().getRoute("worklist").attachMatched(this._onRouteMatched,this)},_onRouteMatched:function(){this.getView().getModel("appView").setProperty("/busy",!0),this.getView().setBusy(!0),this.getData(),this.modelServices(),this.checkConnection()||this.getRouter().getTargets().display("notFound")},onAfterRendering:function(){this.getView().getModel("appView").setProperty("/busy",!0),s.support.touch?this.getView().byId("Tilecontainer").setHeight("100%"):this.getView().byId("Tilecontainer").setHeight("50%")},modelServices:function(){var e=this;e.intervalHandle=setInterval(function(){e.getData()},12e5)},getData:function(){var e=this,o=[],n=[],i=[],s=[],a=0,l=0,p=[],u=[],c={flag:"images/global.png"},d=new t(e.getOwnerComponent().getModel("flagdata").getData());this.getView().setModel(d,"flag");var h=e.getOwnerComponent().getModel("my_global_json_model").getData();h.statewise&&(u=h.statewise.filter(function(e){return"Total"===e.state}));var g=new t;g.setSizeLimit(1e3),g.attachRequestCompleted(function(d){if((o=d.getSource().getData()).length){var h=o.filter(function(e){return"World"===e.country||"Global"===e.country}),g=new t(h);e.getView().setModel(g,"GlobalData")}if(o.length>0){n=e.getOwnerComponent().getModel("flagdata").getData();for(var f=0;f<o.length;f++)if(a+=Number(o[f].totalTests),l+=Number(o[f].testsPerOneMillion),n.length){for(var v=!1,w=0;w<n.length;w++)n[w].country===o[f].country&&(o[f].countryInfo=n[w].countryInfo,v=!0);v||(o[f].countryInfo=c),"World"===o[f].country||"Global"===o[f].country?(o[f].country="Global",o[f].countryInfo=c,p.push(o[f])):("India"===o[f].country&&(u.length&&(o[f].recovered=Number(u[0].recovered)),u.length&&(o[f].cases=Number(u[0].confirmed)),u.length&&(o[f].active=Number(u[0].active)),i.push(o[f])),"Total"!==o[f].country&&"Total:"!==o[f].country&&"India"!==o[f].country&&s.push(o[f]))}}p.length&&(p[0].totalTests=a),p.length&&(p[0].testsPerOneMillion=l),i=p.concat(i),s=i.concat(s);var m=new t;m.setData(s),m.setSizeLimit(1e3),e.getView().setModel(m,"CountryData"),e.getOwnerComponent().setModel(m,"CountryData");var y=r(s),P=new t;y.length&&y.sort(function(e,t){return t.cases-e.cases}),P.setData(y),P.setSizeLimit(1e3),e.getView().setModel(P,"CountryDataCases"),this.getView().getModel("appView").setProperty("/busy",!1),this.getView().setBusy(!1)},this).loadData("https://coronavirus-19-api.herokuapp.com/countries?sort=cases")},onSearch:function(e){var t=[],n=e.getSource().getValue();n&&n.length>0&&(t=[new o("country",sap.ui.model.FilterOperator.Contains,n)]),e.getSource().getParent().getParent().getBinding("items").filter(t,"Application")},onSearchState:function(e){var t=e.getSource().getValue();if(t&&t.length>0)var n=new sap.ui.model.Filter({filters:[new o("state",sap.ui.model.FilterOperator.Contains,t),new o("statecode",sap.ui.model.FilterOperator.Contains,t)]});e.getSource().getParent().getParent().getBinding("items").filter(n,"Application")},onTileDisplayDetails:function(e){this._oPopover?(this._oPopover.bindElement("CountryData>"+e.getSource().oBindingContexts.CountryData.sPath+"/"),this._oPopover.openBy(e.getSource())):(this._oPopover=sap.ui.xmlfragment("com.sap.dinesh.covid19india.dashboard.view.QuickViewCard",this),this.getView().addDependent(this._oPopover),this._oPopover.bindElement("CountryData>"+e.getSource().oBindingContexts.CountryData.sPath+"/"),this._oPopover.openBy(e.getSource()))},handleClosePressed:function(e){this._oPopover.close()},handleClosePressed_oPopoverHelpfulLinks:function(e){this._oPopoverHelpfulLinks.close()},handleCloseMapPressed:function(e){this._oPopoverMap.close()},onExit:function(){this._oPopover&&this._oPopover.destroy(),this._oPopoverHelpfulLinks&&this._oPopoverHelpfulLinks.destroy(),this._oPopoverdIstrictReporting&&this._oPopoverdIstrictReporting.destroy(),this._oPopoverMap&&this._oPopoverMap.destroy()},onHome:function(){window.open("https://indiaagainstcovid19.in/","_self")},dIstrictReporting:function(e){window.open("https://www.mohfw.gov.in/pdf/Districtreporting408.pdf","_blank")},helpLineNumbers:function(e){window.open("https://www.mohfw.gov.in/pdf/coronvavirushelplinenumber.pdf")},helpfulLinks:function(e){this._oPopoverHelpfulLinks?this._oPopoverHelpfulLinks.openBy(e.getSource()):(this._oPopoverHelpfulLinks=sap.ui.xmlfragment("com.sap.dinesh.covid19india.dashboard.view.HelpFullinks",this),this.getView().addDependent(this._oPopoverHelpfulLinks),this._oPopoverHelpfulLinks.openBy(e.getSource()))},openMap:function(e){this.getView().getModel("appView").setProperty("/busy",!0),this.getRouter().navTo("map")}})});',"com/sap/dinesh/covid19india/dashboard/model/models.js":'sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);return i.setDefaultBindingMode("OneWay"),i}}});',"com/sap/dinesh/covid19india/dashboard/view/CountryWiseVizChart.fragment.js":'sap.ui.define(["sap/viz/ui5/controls/VizFrame","sap/viz/ui5/data/FlattenedDataset","sap/viz/ui5/data/DimensionDefinition","sap/viz/ui5/data/MeasureDefinition","sap/viz/ui5/controls/common/feeds/FeedItem","sap/ui/model/json/JSONModel"],function(e,a,i,t,n,s){"use strict";return sap.ui.jsfragment("com.sap.dinesh.covid19india.dashboard.view.CountryWiseVizChart",{createContent:function(s){var o=new e({height:"350px",width:"100%",vizType:"column",uiConfig:{applicationSet:"fiori"}});o.attachRenderComplete(function(e){});var r=new a({dimensions:new i({name:"Country",value:"{country}"}),measures:[new t({name:"Cases",value:"{cases}"}),new t({name:"Recovered",value:"{recovered}"})],data:"{CountryDataCases>/}"});return o.setDataset(r),o.addFeed(new n({uid:"valueAxis",type:"Measure",values:["Cases","Recovered"]})),o.addFeed(new n({uid:"categoryAxis",type:"Dimension",values:["Country"]})),o.setVizProperties({interaction:{selectability:{mode:"EXCLUSIVE"}},plotArea:{showGap:!1,colorPalette:["#FF0000","#00FF00"],dataLabel:{visible:!0},primaryScale:{fixedRange:!1,minValue:0,maxValue:25e5}},title:{visible:!0,text:"Global"},valueAxis:{title:{text:"Cases"}},toolTip:{visible:!0}}),new sap.viz.ui5.controls.Popover({}).connect(o.getVizUid()),o}})});',"com/sap/dinesh/covid19india/dashboard/view/VizChart.fragment.js":'sap.ui.define(["sap/viz/ui5/controls/VizFrame","sap/viz/ui5/data/FlattenedDataset","sap/viz/ui5/data/DimensionDefinition","sap/viz/ui5/data/MeasureDefinition","sap/viz/ui5/controls/common/feeds/FeedItem","sap/ui/model/json/JSONModel"],function(e,a,i,t,o,n){"use strict";return sap.ui.jsfragment("com.sap.dinesh.covid19india.dashboard.view.VizChart",{createContent:function(s){var d=new e({height:"350px",width:"100%",vizType:"line",uiConfig:{applicationSet:"fiori"}});d.attachRenderComplete(function(e){d.zoom({direction:"out"}),d.zoom({direction:"out"}),d.zoom({direction:"out"})});var r=new a({dimensions:new i({name:"Date",value:"{date}"}),measures:[new t({name:"Totalrecovered",value:"{totalrecovered}"}),new t({name:"TotalConfirmedCases",value:"{totalconfirmed}"})],data:"{/cases_time_series}"});d.setDataset(r),d.addFeed(new o({uid:"valueAxis",type:"Measure",values:["Totalrecovered"]})),d.addFeed(new o({uid:"valueAxis",type:"Measure",values:["TotalConfirmedCases"]})),d.addFeed(new o({uid:"categoryAxis",type:"Dimension",values:["Date"]})),d.setVizProperties({interaction:{selectability:{mode:"EXCLUSIVE"}},plotArea:{general:{groupData:!1},showGap:!0,dataLabel:{visible:!0},primaryScale:{fixedRange:!0,minValue:0,maxValue:5e4}},title:{visible:!0,text:"India"},valueAxis:{title:{text:"Cases"}}});var l=new n(s.getOwnerComponent().getModel("my_global_json_model").getData());return s.getView().setModel(l),new sap.viz.ui5.controls.Popover({}).connect(d.getVizUid()),d}})});',"com/sap/dinesh/covid19india/dashboard/view/VizChartDailyConfirmed.fragment.js":'sap.ui.define(["sap/viz/ui5/controls/VizFrame","sap/viz/ui5/data/FlattenedDataset","sap/viz/ui5/data/DimensionDefinition","sap/viz/ui5/data/MeasureDefinition","sap/viz/ui5/controls/common/feeds/FeedItem","sap/ui/model/json/JSONModel"],function(e,i,a,t,n,o){"use strict";return sap.ui.jsfragment("com.sap.dinesh.covid19india.dashboard.view.VizChartDailyConfirmed",{createContent:function(s){var d=new e({height:"350px",width:"100%",vizType:"line",uiConfig:{applicationSet:"fiori"}});d.attachRenderComplete(function(e){d.zoom({direction:"out"}),d.zoom({direction:"out"}),d.zoom({direction:"out"})});var r=new i({dimensions:new a({name:"Date",value:"{date}"}),measures:[new t({name:"Dailyrecovered",value:"{dailydeceased}"}),new t({name:"DailyConfirmedCases",value:"{dailyconfirmed}"})],data:"{/cases_time_series}"});d.setDataset(r),d.addFeed(new n({uid:"valueAxis",type:"Measure",values:["Dailyrecovered"]})),d.addFeed(new n({uid:"valueAxis",type:"Measure",values:["DailyConfirmedCases"]})),d.addFeed(new n({uid:"categoryAxis",type:"Dimension",values:["Date"]})),d.setVizProperties({interaction:{selectability:{mode:"EXCLUSIVE"}},plotArea:{general:{groupData:!1},showGap:!0,dataLabel:{visible:!0},primaryScale:{fixedRange:!0,minValue:0,maxValue:2500}},title:{visible:!0,text:"India"},valueAxis:{title:{text:"Cases"}}});var l=new o(s.getOwnerComponent().getModel("my_global_json_model").getData());return s.getView().setModel(l),new sap.viz.ui5.controls.Popover({}).connect(d.getVizUid()),d}})});',"com/sap/dinesh/covid19india/dashboard/view/VizChartState.fragment.js":'sap.ui.define(["sap/viz/ui5/controls/VizFrame","sap/viz/ui5/data/FlattenedDataset","sap/viz/ui5/data/DimensionDefinition","sap/viz/ui5/data/MeasureDefinition","sap/viz/ui5/controls/common/feeds/FeedItem","sap/ui/model/json/JSONModel"],function(e,i,a,t,n,s){"use strict";return sap.ui.jsfragment("com.sap.dinesh.covid19india.dashboard.view.VizChartState",{createContent:function(s){var o=new e({height:"350px",width:"100%",vizType:"column",uiConfig:{applicationSet:"fiori"}});o.attachRenderComplete(function(e){});var r=new i({dimensions:new a({name:"States & UT",value:"{state}"}),measures:[new t({name:"Confirmed",value:"{confirmed}"}),new t({name:"Recovered",value:"{recovered}"})],data:{path:"/statewise",sorter:{path:"confirmed"}}});return o.setDataset(r),o.addFeed(new n({uid:"valueAxis",type:"Measure",values:["Confirmed","Recovered"]})),o.addFeed(new n({uid:"categoryAxis",type:"Dimension",values:["States & UT"]})),o.setVizProperties({interaction:{selectability:{mode:"EXCLUSIVE"}},plotArea:{showGap:!0,colorPalette:["#FF0000","#00FF00"],dataLabel:{visible:!0,distance:.3,line:{visible:!0}},primaryScale:{fixedRange:!1,minValue:0,maxValue:1e4}},title:{visible:!0,text:"States And Union Territories Of India"},valueAxis:{title:{text:"Cases"}}}),new sap.viz.ui5.controls.Popover({}).connect(o.getVizUid()),o}})});',"com/sap/dinesh/covid19india/dashboard/view/Countrytable.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core"><Table items="{CountryDataCases>/}"><headerToolbar><OverflowToolbar><SearchField liveChange=".onSearch" width="100%"/></OverflowToolbar></headerToolbar><columns><Column width="50px" minScreenWidth="Tablet" demandPopin="true"><Text text=""/></Column><Column minScreenWidth="Tablet" demandPopin="true"><Text text="Country"/></Column><Column minScreenWidth="Tablet" demandPopin="true"><Text text="Cases"/></Column><Column minScreenWidth="Tablet" demandPopin="true"><Text text="Recovered"/></Column><Column minScreenWidth="Tablet" demandPopin="true"><Text text="Deaths"/></Column><Column minScreenWidth="Tablet" demandPopin="true"><Text text="Today Cases"/></Column><Column minScreenWidth="Tablet" demandPopin="true"><Text text="Today Deaths"/></Column><Column minScreenWidth="Tablet" demandPopin="true"><Text text="Active Cases"/></Column><Column minScreenWidth="Tablet" demandPopin="true"><Text text="Critical Cases"/></Column></columns><items><ColumnListItem><cells><Image src="{CountryDataCases>countryInfo/flag}" width="30px"/><ObjectNumber number="{CountryDataCases>country}" state="None"/><ObjectNumber number="{CountryDataCases>cases}" state="Error"/><ObjectNumber number="{CountryDataCases>recovered}" state="Success"/><ObjectNumber number="{CountryDataCases>deaths}" state="Error"/><ObjectNumber number="{CountryDataCases>todayCases}" state="Information"/><ObjectNumber number="{CountryDataCases>todayDeaths}"/><ObjectNumber number="{CountryDataCases>active}" state="Information"/><ObjectNumber number="{CountryDataCases>critical}" state="Error"/></cells></ColumnListItem></items></Table></core:FragmentDefinition>',"com/sap/dinesh/covid19india/dashboard/view/DailyTable.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core"><Table items="{/cases_time_series}"><columns><Column minScreenWidth="Tablet"  demandPopin="true"><Text text="Date"/></Column><Column minScreenWidth="Tablet" demandPopin="true"><Text text="Daily Confirmed"/></Column><Column minScreenWidth="Tablet" demandPopin="true"><Text text="Daily Recovered"/></Column><Column minScreenWidth="Tablet" demandPopin="true"><Text text="Daily Deceased"/></Column><Column minScreenWidth="Tablet" demandPopin="true"><Text text="Total Confirmed"/></Column><Column minScreenWidth="Tablet" demandPopin="true"><Text text="Total Recovered"/></Column><Column minScreenWidth="Tablet" demandPopin="true"><Text text="Total Deceased"/></Column></columns><items><ColumnListItem><cells><ObjectNumber number="{date}" state="None"/><ObjectNumber number="{dailyconfirmed}" state="Error"/><ObjectNumber number="{dailyrecovered}" state="Warning"/><ObjectNumber number="{dailydeceased}"/><ObjectNumber number="{totalconfirmed}" state="Error"/><ObjectNumber number="{totalrecovered}" state="Success"/><ObjectNumber number="{totaldeceased}"/></cells></ColumnListItem></items></Table></core:FragmentDefinition>',"com/sap/dinesh/covid19india/dashboard/view/HelpFullinks.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core"><Popover title="Helpful links" class="sapUiSmallMargin" placement="Auto" initialFocus="action"><footer><OverflowToolbar><ToolbarSpacer/><Button text="Close" press="handleClosePressed_oPopoverHelpfulLinks"/></OverflowToolbar></footer><VBox class="sapUiSmallMargin"><Link text="HELPLINE Numbers India " target="_blank" href="https://www.mohfw.gov.in/pdf/coronvavirushelplinenumber.pdf"/><Link text="Aarogya Setu Mobile App" target="_blank" href="https://www.mygov.in/aarogya-setu-app/"/><Link text="COVID-19 Informaion and Resources " target="_blank" href="https://www.google.com/covid19/#page-top"/><Link text="Ministry of Health and Family Welfare, Gov. of India" target="_blank" href="HTTPS://WWW.MOHFW.GOV.IN/"/><Link text="WHO : COVID-19 Home Page " target="_blank" href="HTTPS://WWW.WHO.INT/EMERGENCIES/DISEASES/NOVEL-CORONAVIRUS-2019"/></VBox></Popover></core:FragmentDefinition>',"com/sap/dinesh/covid19india/dashboard/view/QuickViewCard.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:f="sap.ui.layout.form" xmlns:core="sap.ui.core"><Popover title="{CountryData>country}" class="sapUiSizeCompact" placement="Auto" initialFocus="action"><footer><OverflowToolbar><ToolbarSpacer/><Button text="Close" press="handleClosePressed"/></OverflowToolbar></footer><f:SimpleForm id="SimpleFormDisplay480_12120Dual" editable="false" layout="ResponsiveGridLayout" labelSpanXL="6" labelSpanL="6"\n\t\t\tlabelSpanM="6" labelSpanS="6" adjustLabelSpan="true" emptySpanXL="0" emptySpanL="0" emptySpanM="0" emptySpanS="0" columnsXL="2" columnsL="2"\n\t\t\tcolumnsM="2" singleContainerFullSize="true"><f:content><Image src="{CountryData>countryInfo/flag}" width="50px"/><Label text="Cases"/><Text text="{CountryData>cases}"/><Label text="Today Cases"/><Text text="{CountryData>todayCases}"/><Label text="Recovered"/><Text text="{CountryData>recovered}"/><Label text="Deaths"/><Text text="{CountryData>deaths}"/><Label text="Today Deaths"/><Text text="{CountryData>todayDeaths}"/><Label text="Active"/><Text text="{CountryData>active}"/><Label text="Critical "/><Text text="{CountryData>critical}"/><Label text="Cases Per One Million"/><Text text="{CountryData>casesPerOneMillion}"/><Label text="Deaths Per One Million"/><Text text="{CountryData>deathsPerOneMillion}"/><Label text="Total Tests"/><Text text="{CountryData>totalTests}"/><Label text="Tests Per One Million"/><Text text="{CountryData>testsPerOneMillion}"/></f:content></f:SimpleForm></Popover></core:FragmentDefinition>',"com/sap/dinesh/covid19india/dashboard/view/StateTable.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core"><Table items="{/statewise}"><headerToolbar><OverflowToolbar><SearchField liveChange=".onSearchState" width="100%"/></OverflowToolbar></headerToolbar><columns><Column demandPopin="true"><Text text="State Code"/></Column><Column minScreenWidth="Tablet" demandPopin="true"><Text text="State"/></Column><Column minScreenWidth="Tablet"  demandPopin="true"><Text text="Active Cases"/></Column><Column minScreenWidth="Tablet"  demandPopin="true"><Text text="Confirmed Cases"/></Column><Column minScreenWidth="Tablet"  demandPopin="true"><Text text="Recovered Cases"/></Column><Column minScreenWidth="Tablet"  demandPopin="true"><Text text="Last Updated Time"/></Column><Column minScreenWidth="Tablet"  demandPopin="true"><Text text="State Notes"/></Column></columns><items><ColumnListItem><cells><ObjectNumber number="{statecode}" state="None"/><ObjectNumber number="{state}" state="None"/><ObjectNumber number="{active}" state="Warning"/><ObjectNumber number="{confirmed}" state="Error"/><ObjectNumber number="{recovered}" state="Success"/><ObjectNumber number="{lastupdatedtime}"/><ObjectNumber number="{statenotes}" tooltip="{statenotes}"/></cells></ColumnListItem></items></Table></core:FragmentDefinition>',"com/sap/dinesh/covid19india/dashboard/view/App.view.xml":'<mvc:View\r\n\txmlns:mvc="sap.ui.core.mvc"\r\n\tcontrollerName="com.sap.dinesh.covid19india.dashboard.controller.App"\r\n\tdisplayBlock="true"\r\n\txmlns="sap.m"><App id="app"\r\n\t\t busy="{appView>/busy}"\r\n\t\t busyIndicatorDelay="{appView>/delay}"\r\n\t\t \r\n\t\t /></mvc:View>',"com/sap/dinesh/covid19india/dashboard/view/map.view.xml":'<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns:semantic="sap.m.semantic" xmlns="sap.m" xmlns:vbm="sap.ui.vbm" xmlns:vk="sap.ui.vk"\n\tcontrollerName="com.sap.dinesh.covid19india.dashboard.controller.map" height="100%" afterRendering="onAfterRendering"><semantic:FullscreenPage id="page" navButtonPress="onNavBack" showSubHeader="true" showNavButton="true" title="{i18n>worklistViewTitle}"><semantic:content><vk:MapContainer autoAdjustHeight="true" showHome="true" showMapLayer="false" showNavbar="true" showRectangularZoom="false" showZoom="true"><vk:content><vk:ContainerContent icon="sap-icon://geographic-bubble-chart"><vk:content><vbm:AnalyticMap xmlns:l="sap.ui.layout" id="vbi" width="100%" height="100%"\n\t\t\t\t\t\t\tnavcontrolVisible="false" busy="false" initialPosition="0;10;0"><vbm:resources><vbm:Resource name="PinRed.png" src="images/Red_Pin.png"/></vbm:resources><vbm:vos><vbm:Spots items="{/}" click="onClickItem" contextMenu="onContextMenuItem"><vbm:Spot position="{countryInfo/long};{countryInfo/lat}" tooltip="{country}" text="{cases}+"\n\t\t\t\t\t\t\t\t\t\t\ttype="{= ${cases} &gt;= 50000 ? \'Error\' : \'Warning\' }"/></vbm:Spots></vbm:vos></vbm:AnalyticMap></vk:content></vk:ContainerContent></vk:content></vk:MapContainer></semantic:content><semantic:customFooterContent><Button visible="true" icon="sap-icon://nav-back" text="Back" press=".onNavBack"/></semantic:customFooterContent></semantic:FullscreenPage></mvc:View>',"com/sap/dinesh/covid19india/dashboard/view/NotFound.view.xml":'<mvc:View\n\tcontrollerName="com.sap.dinesh.covid19india.dashboard.controller.NotFound"\n\txmlns:mvc="sap.ui.core.mvc"\n\txmlns="sap.m"><MessagePage\n\t\ttitle="{i18n>notFoundTitle}"\n\t\ttext="{i18n>notFoundText}"\n\t\ticon="{sap-icon://document}"\n\t\tid="page"\n\t\tdescription=""><customDescription><Link id="link" text="{i18n>backToWorklist}" press="onLinkPressed" /></customDescription></MessagePage></mvc:View>',
"com/sap/dinesh/covid19india/dashboard/view/Worklist.view.xml":'<mvc:View controllerName="com.sap.dinesh.covid19india.dashboard.controller.Worklist" xmlns="sap.m" xmlns:semantic="sap.m.semantic"\n\txmlns:viz="sap.viz.ui5.controls" xmlns:mvc="sap.ui.core.mvc" xmlns:core="sap.ui.core" xmlns:suite="sap.suite.ui.commons"\n\txmlns:l="sap.ui.layout"><semantic:FullscreenPage id="page" navButtonPress="onNavBack" showSubHeader="true" showNavButton="false" title="{i18n>worklistViewTitle}"><semantic:customHeaderContent><Image src="images/corona.png" width="40px"/></semantic:customHeaderContent><semantic:content><Panel><headerToolbar><OverflowToolbar height="2rem"><Title text="COVID-19-Report"/></OverflowToolbar></headerToolbar><HBox class="sapUiContentPaddi10g" width="100%"><ObjectNumber number="Last Updated Time - {/statewise/0/lastupdatedtime}" state="Information"><layoutData><FlexItemData growFactor="1" backgroundDesign="Transparent" styleClass="sapUiSmallMarginEnd"/></layoutData></ObjectNumber></HBox><VBox height="10px"></VBox><HBox class="sapUiContentPaddi10g" width="100%"><ObjectNumber number="Global -"><layoutData><FlexItemData growFactor="1" backgroundDesign="Transparent" styleClass="sapUiSmallMarginEnd"/></layoutData></ObjectNumber></HBox><HBox class="sapUiContentPadding" width="100%"><ObjectNumber number="{GlobalData>/0/cases} Confirmed" state="Information"><layoutData><FlexItemData growFactor="1" backgroundDesign="Solid" styleClass="sapUiSmallMarginEnd"/></layoutData></ObjectNumber><ObjectNumber number="{GlobalData>/0/recovered} Cured / Discharge" state="Success"><layoutData><FlexItemData growFactor="1" backgroundDesign="Solid" styleClass="sapUiSmallMarginEnd"/></layoutData></ObjectNumber><ObjectNumber number="{GlobalData>/0/deaths} Deaths" state="Error" class="sapUiVisibleOnlyOnDesktop" visible="{= !${device>/system/phone} }"><layoutData><FlexItemData growFactor="1" backgroundDesign="Solid" styleClass="sapUiSmallMarginEnd"/></layoutData></ObjectNumber><ObjectNumber number="{GlobalData>/0/active} Active" state="Warning" class="sapUiVisibleOnlyOnDesktop"\n\t\t\t\t\t\tvisible="{= !${device>/system/phone} }"><layoutData><FlexItemData growFactor="1" backgroundDesign="Solid" styleClass="sapUiSmallMarginEnd"/></layoutData></ObjectNumber></HBox><VBox height="10px"></VBox><HBox class="sapUiContentPaddi10g" width="100%"><ObjectNumber number="India -"><layoutData><FlexItemData growFactor="1" backgroundDesign="Transparent" styleClass="sapUiSmallMarginEnd"/></layoutData></ObjectNumber></HBox><HBox class="sapUiContentPadding" width="100%"><ObjectNumber number="{/statewise/0/confirmed} Confirmed" state="Information"><layoutData><FlexItemData growFactor="1" backgroundDesign="Solid" styleClass="sapUiSmallMarginEnd"/></layoutData></ObjectNumber><ObjectNumber number="{/statewise/0/recovered} Cured / Discharge" state="Success"><layoutData><FlexItemData growFactor="1" backgroundDesign="Solid" styleClass="sapUiSmallMarginEnd"/></layoutData></ObjectNumber><ObjectNumber number="{/statewise/0/deaths} Deaths" state="Error" class="sapUiVisibleOnlyOnDesktop" visible="{= !${device>/system/phone} }"><layoutData><FlexItemData growFactor="1" backgroundDesign="Solid" styleClass="sapUiSmallMarginEnd"/></layoutData></ObjectNumber><ObjectNumber number="{/statewise/0/active} Active" state="Warning" class="sapUiVisibleOnlyOnDesktop"\n\t\t\t\t\t\tvisible="{= !${device>/system/phone} }"><layoutData><FlexItemData growFactor="1" backgroundDesign="Solid" styleClass="sapUiSmallMarginEnd"/></layoutData></ObjectNumber></HBox></Panel><TileContainer id="Tilecontainer" tiles="{CountryData>/}" width="100%"><StandardTile icon="{CountryData>countryInfo/flag}" number="{CountryData>cases}" numberUnit="Cases" title="{CountryData>country}"\n\t\t\t\t\tinfo="{CountryData>recovered} Recovered" infoState="Success" press="onTileDisplayDetails"/></TileContainer><l:Grid defaultSpan="L12 M12 S12" class="sapUiResponsiveMargin" vSpacing="0" hSpacing="0"><suite:ChartContainer id="idChartContainerDailyCases" title="India-Covid19-Report Daily" showFullScreen="true" autoAdjustHeight="false"><suite:ChartContainerContent icon="sap-icon://vertical-bullet-chart" title="Analytic View"><suite:content><core:Fragment fragmentName="com.sap.dinesh.covid19india.dashboard.view.VizChartDailyConfirmed" type="JS"/></suite:content></suite:ChartContainerContent><suite:ChartContainerContent id="CharttableDailyCases" icon="sap-icon://table-chart" title="Tabular View"><suite:content><core:Fragment fragmentName="com.sap.dinesh.covid19india.dashboard.view.DailyTable" type="XML"/></suite:content></suite:ChartContainerContent></suite:ChartContainer><suite:ChartContainer id="idChartContainerDateWise" title="India-Covid19-Report By Date" autoAdjustHeight="false" showFullScreen="true"><suite:ChartContainerContent icon="sap-icon://vertical-bullet-chart" title="Analytic View"><suite:content><core:Fragment fragmentName="com.sap.dinesh.covid19india.dashboard.view.VizChart" type="JS"/></suite:content></suite:ChartContainerContent><suite:ChartContainerContent id="CharttableDatewise" icon="sap-icon://table-chart" title="Tabular View"><suite:content><core:Fragment fragmentName="com.sap.dinesh.covid19india.dashboard.view.DailyTable" type="XML"/></suite:content></suite:ChartContainerContent></suite:ChartContainer><suite:ChartContainer id="idChartContainerStateWise" title="India-Covid19-Report By State" showFullScreen="true" autoAdjustHeight="false"><suite:ChartContainerContent icon="sap-icon://vertical-bullet-chart" title="Analytic View"><suite:content><core:Fragment fragmentName="com.sap.dinesh.covid19india.dashboard.view.VizChartState" type="JS"/></suite:content></suite:ChartContainerContent><suite:ChartContainerContent id="CharttableStatewise" icon="sap-icon://table-chart" title="Tabular View"><suite:content><core:Fragment fragmentName="com.sap.dinesh.covid19india.dashboard.view.StateTable" type="XML"/></suite:content></suite:ChartContainerContent></suite:ChartContainer><suite:ChartContainer id="idChartContainerCountryWise" title="Global-Covid19-Report" showFullScreen="true" autoAdjustHeight="false"><suite:ChartContainerContent icon="sap-icon://vertical-bullet-chart" title="Analytic View "><suite:content><core:Fragment fragmentName="com.sap.dinesh.covid19india.dashboard.view.CountryWiseVizChart" type="JS"/></suite:content></suite:ChartContainerContent><suite:ChartContainerContent id="CharttableCountrywise" icon="sap-icon://table-chart" title="Tabular View"><suite:content><core:Fragment fragmentName="com.sap.dinesh.covid19india.dashboard.view.Countrytable" type="XML"/></suite:content></suite:ChartContainerContent></suite:ChartContainer></l:Grid><Image src="images/corona.png" width="50px"/></semantic:content><semantic:customFooterContent><Button visible="true" icon="sap-icon://map" text="Map" press=".openMap"/><Button visible="true" icon="sap-icon://chain-link" text="Helpful links" press=".helpfulLinks"/><Button visible="true" icon="sap-icon://pdf-attachment" text="District Report" press=".dIstrictReporting"/><Button icon="sap-icon://home" text="Home" tooltip="Home" press="onHome"/></semantic:customFooterContent></semantic:FullscreenPage></mvc:View>',"com/sap/dinesh/covid19india/dashboard/i18n/i18n_en_US.properties":'\r\n#XTIT: Application name\r\nappTitle=#IndiaFightsCorona COVID-19\r\n\r\n#YDES: Application description\r\nappDescription=#IndiaFightsCorona COVID-19\r\n\r\n#~~~ Worklist View ~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n#XTIT: Table view title\r\nworklistViewTitle=#IndiaFightsCorona COVID-19\r\n\r\nbackToWorklist=Main Page\r\n\r\n\r\n#~~~ Not Found View ~~~~~~~~~~~~~~~~~~~~~~~\r\n\r\n#XTIT: Not found view title\r\nnotFoundTitle=No Internet\r\n\r\n#YMSG: The ProductSet not found text is displayed when there is no ProductSet with this id\r\nnotFoundText= Try: Checking the network cables, modem and router, Reconnecting to Wi-Fi. \r\n\r\nbackToWorklist = "Home"\r\n\r\nerrorText=No Data\r\n\r\n',"com/sap/dinesh/covid19india/dashboard/i18n/i18n_en.properties":'\r\n#XTIT: Application name\r\nappTitle=#IndiaFightsCorona COVID-19\r\n\r\n#YDES: Application description\r\nappDescription=#IndiaFightsCorona COVID-19\r\n\r\n#~~~ Worklist View ~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n#XTIT: Table view title\r\nworklistViewTitle=#IndiaFightsCorona COVID-19\r\n\r\nbackToWorklist=Main Page\r\n\r\n\r\n#~~~ Not Found View ~~~~~~~~~~~~~~~~~~~~~~~\r\n\r\n#XTIT: Not found view title\r\nnotFoundTitle=No Internet\r\n\r\n#YMSG: The ProductSet not found text is displayed when there is no ProductSet with this id\r\nnotFoundText= Try: Checking the network cables, modem and router, Reconnecting to Wi-Fi. \r\n\r\nbackToWorklist = "Home"\r\n\r\nerrorText=No Data\r\n\r\n',"com/sap/dinesh/covid19india/dashboard/i18n/i18n.properties":'\r\n#XTIT: Application name\r\nappTitle=#IndiaFightsCorona COVID-19\r\n\r\n#YDES: Application description\r\nappDescription=#IndiaFightsCorona COVID-19\r\n\r\n#~~~ Worklist View ~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n#XTIT: Table view title\r\nworklistViewTitle=#IndiaFightsCorona COVID-19\r\n\r\nbackToWorklist=Main Page\r\n\r\n\r\n#~~~ Not Found View ~~~~~~~~~~~~~~~~~~~~~~~\r\n\r\n#XTIT: Not found view title\r\nnotFoundTitle=No Internet\r\n\r\n#YMSG: The ProductSet not found text is displayed when there is no ProductSet with this id\r\nnotFoundText= Try: Checking the network cables, modem and router, Reconnecting to Wi-Fi. \r\n\r\nbackToWorklist = "Home"\r\n\r\nerrorText=No Data\r\n\r\n',"com/sap/dinesh/covid19india/dashboard/manifest.json":'{"_version":"1.2.0","sap.app":{"_version":"1.2.0","id":"com.sap.dinesh.covid19india.dashboard","type":"application","i18n":"i18n/i18n.properties","title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.2"},"dataSources":{"my_global_json_model_data_source":{"uri":"https://api.covid19india.org/data.json","type":"JSON"},"flagdata":{"uri":"model/flag.json","type":"JSON"}},"sourceTemplate":{"id":"sap.ui.ui5-template-plugin.1worklist","version":"1.36.2"}},"sap.ui":{"_version":"1.2.0","technology":"UI5","icons":{"icon":"sap-icon://task","favIcon":"images/favicon.ico","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true},"supportedThemes":["sap_hcb","sap_bluecrystal"]},"sap.ui5":{"_version":"1.2.0","rootView":{"viewName":"com.sap.dinesh.covid19india.dashboard.view.App","type":"XML","id":"app"},"dependencies":{"minUI5Version":"1.36.0","libs":{"sap.ui.core":{"minVersion":"1.36.0"},"sap.m":{"minVersion":"1.36.0"}}},"contentDensities":{"compact":true,"cozy":true},"models":{"my_global_json_model":{"type":"sap.ui.model.json.JSONModel","dataSource":"my_global_json_model_data_source"},"flagdata":{"type":"sap.ui.model.json.JSONModel","dataSource":"flagdata"},"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"com.sap.dinesh.covid19india.dashboard.i18n.i18n"}},"":{"dataSource":"mainService","settings":{"defaultBindingMode":"TwoWay","metadataUrlParams":{"sap-documentation":"heading"}}}},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"com.sap.dinesh.covid19india.dashboard.view","controlId":"app","controlAggregation":"pages","bypassed":{"target":["notFound"]},"async":true},"routes":[{"pattern":"","name":"worklist","target":["worklist"]},{"pattern":"map","name":"map","target":["map"]}],"targets":{"worklist":{"viewName":"Worklist","viewId":"worklist","viewLevel":1,"transition":"show"},"map":{"viewName":"map","viewId":"map","viewLevel":2,"transition":"show"},"objectNotFound":{"viewName":"ObjectNotFound","viewId":"objectNotFound","transition":"fade"},"notFound":{"viewName":"NotFound","viewId":"notFound","transition":"fade"}}}}}'},"com/sap/dinesh/covid19india/dashboard/Component-preload");