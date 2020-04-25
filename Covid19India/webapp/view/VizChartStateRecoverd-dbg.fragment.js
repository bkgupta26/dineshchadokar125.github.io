sap.ui.define(["sap/viz/ui5/controls/VizFrame","sap/viz/ui5/data/FlattenedDataset","sap/viz/ui5/data/DimensionDefinition","sap/viz/ui5/data/MeasureDefinition","sap/viz/ui5/controls/common/feeds/FeedItem","sap/ui/model/json/JSONModel"],function(e,a,i,t,s,n){"use strict";return sap.ui.jsfragment("com.sap.dinesh.covid19india.dashboard.view.VizChartStateRecoverd",{createContent:function(n){var o=new e({height:"350px",width:"100%",vizType:"column",uiConfig:{applicationSet:"fiori"}}),d=new a({dimensions:new i({name:"State",value:"{state}"}),measures:[new t({name:"Recovered",value:"{recovered}"})],data:"{DatadataCasesdataRecoverd>/}"});return o.setDataset(d),o.addFeed(new s({uid:"valueAxis",type:"Measure",values:["Recovered"]})),o.addFeed(new s({uid:"categoryAxis",type:"Dimension",values:["State"]})),o.setVizProperties({interaction:{selectability:{mode:"EXCLUSIVE"}},plotArea:{showGap:!0,colorPalette:"#00FF00",dataLabel:{visible:!0},primaryScale:{fixedRange:!1,minValue:0,maxValue:1e4}},title:{visible:!1},valueAxis:{title:{text:"Total Recoverd Cases"}}}),new sap.viz.ui5.controls.Popover({}).connect(o.getVizUid()),o}})});
