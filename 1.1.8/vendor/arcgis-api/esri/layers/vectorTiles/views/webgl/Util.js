//>>built
define("esri/layers/vectorTiles/views/webgl/Util",["require","exports"],function(h,k){return function(){function c(){}c.vertexCount=function(a,d){return a.vertexBuffers[d].size/c.getStride(a.layout[d])};c.getStride=function(a){return a[0].stride};c.assertCompatibleVertexAttributeLocations=function(a,d){var b=a.locations===d.locations;b||console.error("VertexAttributeLocations are incompatible");return b};c.hasAttribute=function(a,d){for(var b=0;b<a.length;b++)if(a[b].name===d)return!0;return!1};c.findAttribute=
function(a,d){for(var b=0;b<a.length;b++)if(a[b].name===d)return a[b];return null};c.copyFramebufferToTexture=function(a,d,b,c,e){void 0===e&&(e=0);var f=a.getBoundFramebufferObject(),g=a.getBoundTexture(0);a.bindFramebuffer(d);a.bindTexture(b,0);a.gl.copyTexImage2D(a.gl.TEXTURE_2D,e,b.descriptor.pixelFormat,c[0],c[1],c[2],c[3],0);a.gl.flush();a.bindFramebuffer(f);a.bindTexture(g,0)};return c}()});