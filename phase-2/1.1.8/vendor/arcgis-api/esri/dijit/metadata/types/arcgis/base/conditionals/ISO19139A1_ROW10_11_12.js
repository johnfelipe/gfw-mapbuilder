//>>built
define("esri/dijit/metadata/types/arcgis/base/conditionals/ISO19139A1_ROW10_11_12","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/topic dojo/has ../../../../../../kernel dojo/i18n!../../../../nls/i18nArcGIS ../../../../base/Conditional".split(" "),function(e,g,n,f,h,k,l,m){e=e(m,{key:"ISO19139A1_ROW10_11_12",postCreate:function(){this.inherited(arguments);var b=this;this.own(f.subscribe("gxe/interaction-occurred",function(a){try{if(b.parentXNode&&a&&a.inputWidget&&a.inputWidget.parentXNode){var c=
a.inputWidget.parentXNode.gxePath;"/metadata/dqInfo/dqScope/scpLvl/ScopeCd/@value"===c?b.emitInteractionOccurred():"/metadata/dqInfo/dataLineage/statement"===c&&b.emitInteractionOccurred()}}catch(d){console.error(d)}}));this.own(f.subscribe("gxe/optional-content-toggled",function(a){try{if(b.parentXNode&&a&&a.src&&a.src.target){var c=a.src.target;("prcStep"===c||"dataSource"===c)&&b.emitInteractionOccurred()}}catch(d){console.error(d)}}));this.own(f.subscribe("gxe/after-xnode-destroyed",function(a){try{if(b.parentXNode&&
a&&a.xnode){var c=a.xnode.target;("prcStep"===c||"dataSource"===c)&&b.emitInteractionOccurred()}}catch(d){console.error(d)}}))},hasLineage:function(b){var a=!1;b=b.domNode;this.forActiveXNodes("/metadata/dqInfo/dataLineage/statement",b,function(b){if(!this.isXNodeInputEmpty(b))return a=!0},this);a||this.forActiveXNodes("/metadata/dqInfo/dataLineage/prcStep/stepDesc,/metadata/dqInfo/dataLineage/dataSource/srcDesc",b,function(b){return a=!0},this);return a},validateConditionals:function(b){var a=this.newStatus({message:l.conditionals[this.key]}),
c=!0,d=this.parentXNode.parentElement;if(!this.isXNodeOff(this.parentXNode)){var e=this.findInputValue("/metadata/dqInfo/dqScope/scpLvl/ScopeCd/@value",d.domNode);if("005"==e||"006"==e)c=this.hasLineage(d)}a.isValid=c;this.track(a,b);return a}});h("extend-esri")&&g.setObject("dijit.metadata.types.arcgis.base.conditionals.ISO19139A1_ROW10_11_12",e,k);return e});