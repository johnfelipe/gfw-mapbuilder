//>>built
define("dojox/io/xhrPlugins",["dojo/_base/kernel","dojo/_base/xhr","dojo/AdapterRegistry"],function(b,m,n){function f(){return k=dojox.io.xhrPlugins.plainXhr=k||b._defaultXhr||m}b.getObject("io.xhrPlugins",!0,dojox);var d,k;dojox.io.xhrPlugins.register=function(){var e=f();d||(d=new n,b[b._defaultXhr?"_defaultXhr":"xhr"]=function(b,c,a){return d.match.apply(d,arguments)},d.register("xhr",function(b,c){if(!c.url.match(/^\w*:\/\//))return!0;var a=window.location.href.match(/^.*?\/\/.*?\//)[0];return c.url.substring(0,
a.length)==a},e));return d.register.apply(d,arguments)};dojox.io.xhrPlugins.addProxy=function(e){var h=f();dojox.io.xhrPlugins.register("proxy",function(b,a){return!0},function(c,a,p){a.url=e+encodeURIComponent(a.url);return h.call(b,c,a,p)})};var g;dojox.io.xhrPlugins.addCrossSiteXhr=function(e,h){var c=f();if(void 0===g&&window.XMLHttpRequest)try{(new XMLHttpRequest).open("GET","http://testing-cross-domain-capability.com",!0),g=!0,b.config.noRequestedWithHeaders=!0}catch(a){g=!1}dojox.io.xhrPlugins.register("cs-xhr",
function(a,b){return(g||window.XDomainRequest&&!0!==b.sync&&("GET"==a||"POST"==a||h))&&b.url.substring(0,e.length)==e},g?c:function(){var a=b._xhrObj;b._xhrObj=function(){function a(c,e){return function(){b.readyState=e;b.status=c}}var b=new XDomainRequest;b.readyState=1;b.setRequestHeader=function(){};b.getResponseHeader=function(a){return"Content-Type"==a?b.contentType:null};b.onload=a(200,4);b.onprogress=a(200,3);b.onerror=a(404,4);return b};var c=(h?h(f()):f()).apply(b,arguments);b._xhrObj=a;
return c})};dojox.io.xhrPlugins.fullHttpAdapter=function(e,h){return function(c,a,d){var f={},g={};"GET"!=c&&(g["http-method"]=c,a.putData&&h&&(f["http-content"]=a.putData,delete a.putData,d=!1),a.postData&&h&&(f["http-content"]=a.postData,delete a.postData,d=!1),c="POST");for(var l in a.headers){var k=l.match(/^X-/)?l.substring(2).replace(/-/g,"_").toLowerCase():"http-"+l;g[k]=a.headers[l]}a.query=b.objectToQuery(g);b._ioAddQueryToUrl(a);a.content=b.mixin(a.content||{},f);return e.call(b,c,a,d)}};
return dojox.io.xhrPlugins});