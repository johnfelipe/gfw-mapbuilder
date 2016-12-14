//>>built
define("dijit/_TimePicker","dojo/_base/array dojo/date dojo/date/locale dojo/date/stamp dojo/_base/declare dojo/dom-class dojo/dom-construct dojo/_base/kernel dojo/keys dojo/_base/lang dojo/sniff dojo/query dojo/mouse dojo/on ./_WidgetBase ./form/_ListMouseMixin".split(" "),function(r,h,k,g,l,f,m,n,e,s,t,u,v,w,p,q){return l("dijit._TimePicker",[p,q],{baseClass:"dijitTimePicker",pickerMin:"T00:00:00",pickerMax:"T23:59:59",clickableIncrement:"T00:15:00",visibleIncrement:"T01:00:00",value:new Date,_visibleIncrement:2,
_clickableIncrement:1,_totalIncrements:10,constraints:{},serialize:g.toISOString,buildRendering:function(){this.inherited(arguments);this.timeMenu=this.containerNode=this.domNode},setValue:function(a){n.deprecated("dijit._TimePicker:setValue() is deprecated.  Use set('value', ...) instead.","","2.0");this.set("value",a)},_setValueAttr:function(a){this._set("value",a);this._showText()},_setFilterStringAttr:function(a){this._set("filterString",a);this._showText()},isDisabledDate:function(){return!1},
_getFilteredNodes:function(a,c,b,d){a=this.ownerDocument.createDocumentFragment();for(c=0;c<this._maxIncrement;c++)(b=this._createOption(c))&&a.appendChild(b);return a},_showText:function(){var a=g.fromISOString;this.domNode.innerHTML="";this._clickableIncrementDate=a(this.clickableIncrement);this._visibleIncrementDate=a(this.visibleIncrement);var c=3600*this._clickableIncrementDate.getHours()+60*this._clickableIncrementDate.getMinutes()+this._clickableIncrementDate.getSeconds(),b=3600*this._visibleIncrementDate.getHours()+
60*this._visibleIncrementDate.getMinutes()+this._visibleIncrementDate.getSeconds();(this.value||this.currentFocus).getTime();this._refDate=a(this.pickerMin);this._refDate.setFullYear(1970,0,1);this._clickableIncrement=1;this._visibleIncrement=b/c;a=a(this.pickerMax);a.setFullYear(1970,0,1);a=0.001*(a.getTime()-this._refDate.getTime());this._maxIncrement=Math.ceil((a+1)/c);c=this._getFilteredNodes();!c.firstChild&&this.filterString?(this.filterString="",this._showText()):this.domNode.appendChild(c)},
constructor:function(){this.constraints={}},postMixInProperties:function(){this.inherited(arguments);this._setConstraintsAttr(this.constraints)},_setConstraintsAttr:function(a){for(var c in{clickableIncrement:1,visibleIncrement:1,pickerMin:1,pickerMax:1})c in a&&(this[c]=a[c]);a.locale||(a.locale=this.lang)},_createOption:function(a){var c=new Date(this._refDate),b=this._clickableIncrementDate;c.setHours(c.getHours()+b.getHours()*a,c.getMinutes()+b.getMinutes()*a,c.getSeconds()+b.getSeconds()*a);
"time"==this.constraints.selector&&c.setFullYear(1970,0,1);var d=k.format(c,this.constraints);if(this.filterString&&0!==d.toLowerCase().indexOf(this.filterString))return null;b=this.ownerDocument.createElement("div");b.className=this.baseClass+"Item";b.date=c;b.idx=a;m.create("div",{"class":this.baseClass+"ItemInner",innerHTML:d},b);d=1>a%this._visibleIncrement&&-1<a%this._visibleIncrement;a=!d&&!(a%this._clickableIncrement);d?b.className+=" "+this.baseClass+"Marker":a&&(b.className+=" "+this.baseClass+
"Tick");this.isDisabledDate(c)&&(b.className+=" "+this.baseClass+"ItemDisabled");this.value&&!h.compare(this.value,c,this.constraints.selector)&&(b.selected=!0,b.className+=" "+this.baseClass+"ItemSelected",this._selectedDiv=b,d?b.className+=" "+this.baseClass+"MarkerSelected":a&&(b.className+=" "+this.baseClass+"TickSelected"),this._highlightOption(b,!0));return b},onOpen:function(){this.inherited(arguments);this.set("selected",this._selectedDiv)},_onOptionSelected:function(a,c){var b=a.target.date||
a.target.parentNode.date;b&&!this.isDisabledDate(b)&&(this._set("value",b),this.emit("input"),c&&(this._highlighted_option=null,this.set("value",b),this.onChange(b)))},onChange:function(){},_highlightOption:function(a,c){if(a){if(c)this._highlighted_option&&this._highlightOption(this._highlighted_option,!1),this._highlighted_option=a;else{if(this._highlighted_option!==a)return;this._highlighted_option=null}f.toggle(a,this.baseClass+"ItemHover",c);f.contains(a,this.baseClass+"Marker")?f.toggle(a,this.baseClass+
"MarkerHover",c):f.toggle(a,this.baseClass+"TickHover",c)}},handleKey:function(a){if(a.keyCode==e.DOWN_ARROW)return this.selectNextNode(),this._onOptionSelected({target:this._highlighted_option},!1),a.stopPropagation(),a.preventDefault(),!1;if(a.keyCode==e.UP_ARROW)return this.selectPreviousNode(),this._onOptionSelected({target:this._highlighted_option},!1),a.stopPropagation(),a.preventDefault(),!1;if(a.keyCode==e.ENTER||a.keyCode===e.TAB){if(!this._keyboardSelected&&a.keyCode===e.TAB)return!0;this._highlighted_option&&
this._onOptionSelected({target:this._highlighted_option},!0);return a.keyCode===e.TAB}},onHover:function(a){this._highlightOption(a,!0)},onUnhover:function(a){this._highlightOption(a,!1)},onSelect:function(a){this._highlightOption(a,!0)},onDeselect:function(a){this._highlightOption(a,!1)},onClick:function(a){this._onOptionSelected({target:a},!0)}})});