//>>built
define("esri/layers/vectorTiles/views/2d/layers/support/LODInfo",["require","exports","./TileKey"],function(p,q,f){function m(b,a,d){b[0]=a;b[1]=d;return b}return function(){function b(a,d,b,e,g,h,k,l,n,m,f){this.level=a;this.resolution=d;this.origin=b;this.first=e;this.last=g;this.size=h;this.norm=k;this.worldStart=l;this.worldEnd=n;this.worldSize=m;this.wrap=f}b.create=function(a,d,c){var e=a.spatialReference._getInfo(),g=[a.origin.x,a.origin.y],h=[a.size[0]*d.resolution,a.size[1]*d.resolution],
k=[-Infinity,-Infinity],l=[Infinity,Infinity],n=[Infinity,Infinity];c&&(m(k,Math.max(0,Math.floor((c.xmin-g[0])/h[0])),Math.max(0,Math.floor((g[1]-c.ymax)/h[1]))),m(l,Math.max(0,Math.floor((c.xmax-g[0])/h[0])),Math.max(0,Math.floor((g[1]-c.ymin)/h[1]))),m(n,l[0]-k[0]+1,l[1]-k[1]+1));var f;e?(a=[Math.ceil(Math.round(2*e.origin[1]/d.resolution)/a.size[0]),n[1]],e=[Math.floor((e.origin[0]-g[0])/h[0]),k[1]],c=[a[0]-e[0]-1,l[1]],f=!0):(e=k,c=l,a=n,f=!1);return new b(d.level,d.resolution,g,k,l,n,h,e,c,
a,f)};b.prototype.normalizeCol=function(a){if(!this.wrap)return a;var b=this.worldSize[0];return 0>a?b-1-Math.abs((a+1)%b):a%b};b.prototype.denormalizeCol=function(a,b){return!this.wrap?a:this.worldSize[0]*b+a};b.prototype.getWorldForColumn=function(a){return!this.wrap?0:Math.floor(a/this.worldSize[0])};b.prototype.getFirstColumnForWorld=function(a){return a*this.worldSize[0]+this.first[0]};b.prototype.getLastColumnForWorld=function(a){return a*this.worldSize[0]+this.first[0]+this.size[0]-1};b.prototype.getColumnForX=
function(a){return(a-this.origin[0])/this.norm[0]};b.prototype.getXForColumn=function(a){return this.origin[0]+a*this.norm[0]};b.prototype.getRowForY=function(a){return(this.origin[1]-a)/this.norm[1]};b.prototype.getYForRow=function(a){return this.origin[1]-a*this.norm[1]};b.prototype.getTileTopLeft=function(a,b){var c=f.from(b);return m(a,this.getXForColumn(this.denormalizeCol(c.col,c.world)),this.getYForRow(c.row))};b.prototype.getTileBottomRight=function(a,b){var c=f.from(b);return m(a,this.getXForColumn(this.denormalizeCol(c.col,
c.world)+1),this.getYForRow(c.row+1))};return b}()});