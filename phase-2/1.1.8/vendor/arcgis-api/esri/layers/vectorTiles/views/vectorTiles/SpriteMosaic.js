//>>built
define("esri/layers/vectorTiles/views/vectorTiles/SpriteMosaic",["require","exports","./Rect","./RectangleBinPack","../webgl/Texture"],function(m,n,k,f,l){return function(){function e(c,d){this._height=this._width=0;this._mosaicRects={};this._dirty=!1;this.pixelRatio=1;(0>=c||0>=d)&&console.error("Sprites mosaic width and height must be greater than zero!");this._width=c;this._height=d;this._binPack=new f(c,d)}Object.defineProperty(e.prototype,"width",{get:function(){return this._width},enumerable:!0,
configurable:!0});Object.defineProperty(e.prototype,"height",{get:function(){return this._height},enumerable:!0,configurable:!0});e.prototype.setSpriteSource=function(c){this._dispose();this.pixelRatio=c.devicePixelRatio;this._mosaicData||(this._binPack=new f(this._width,this._height),this._mosaicData=new Uint32Array(Math.floor(this._width)*Math.floor(this._height)));this._sprites=c};e.prototype.getSpriteItem=function(c,d){void 0===d&&(d=!1);var a=this._mosaicRects[c];if(a)return a;if(!this._sprites||
"loaded"!==this._sprites.loadStatus)return null;var b=this._sprites.getSpritePosition(c);if(!b||!b.width||!b.height)return null;var e=this._allocateImage(b.width,b.height);if(0>=e.width)return null;a={rect:e,width:b.width,height:b.height,sdf:b.sdf,pixelRatio:b.pixelRatio};this._copy(e,b,d);return this._mosaicRects[c]=a};e.prototype.getSpriteItems=function(c){for(var d={},a=0;a<c.length;a++){var b=c[a];d[b]=this.getSpriteItem(b)}return d};e.prototype.getMosaicItemPosition=function(c,d){var a=this.getSpriteItem(c,
d),b=a&&a.rect;if(!b)return null;b.width=a.width;b.height=a.height;return{size:[a.width,a.height],tl:[(b.x+1)/this._width,(b.y+1)/this._height],br:[(b.x+1+a.width)/this._width,(b.y+1+a.height)/this._height]}};e.prototype.bind=function(c,d,a){void 0===a&&(a=0);this._texture||(this._texture=new l(c,{pixelFormat:6408,dataType:5121,width:this._width,height:this._height},new Uint8Array(this._mosaicData.buffer)));this._texture.setSamplingMode(d);c.bindTexture(this._texture,a);this._dirty&&this._texture.updateData(0,
0,0,this._width,this._height,new Uint8Array(this._mosaicData.buffer));this._dirty=!1};e._copyBits=function(c,d,a,b,e,f,g,h,k,l){a=b*d+a;g=h*f+g;for(h=0;h<l;h++){for(b=0;b<k;b++)e[g+b]=c[a+b];a+=d;g+=f}};e.prototype._copy=function(c,d,a){if(this._sprites&&"loaded"===this._sprites.loadStatus){a=new Uint32Array(this._sprites.image.buffer);var b=this._mosaicData;(!b||!a)&&console.error("Source or target images are uninitialized!");e._copyBits(a,this._sprites.width,d.x,d.y,b,this._width,c.x+1,c.y+1,d.width,
d.height);this._dirty=!0}};e.prototype._allocateImage=function(c,d){c+=2;d+=2;var a=this._binPack.allocate(c+(c%4?4-c%4:0),d+(d%4?4-d%4:0));0>=a.width&&(console.warn("Out of sprite mosaic space!"),a=new k(0,0,0,0));return a};e.prototype._dispose=function(){this._binPack=this._mosaicData=null;this._mosaicRects={};this._dirty=!0};return e}()});