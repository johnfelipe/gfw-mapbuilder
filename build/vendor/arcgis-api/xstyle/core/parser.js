//>>built
define("xstyle/core/parser",[],function(){function K(){this.push.apply(this,arguments)}function G(c){this.value=c}function O(){var c,k=this.args[0];if("string"==typeof k)c=k.split(/\s*,\s*/);else if(k){c=[];for(var q=0,r=0;r<k.length+1;r++){var s=k[r];if("string"==typeof s||void 0===s)if(s=s&&s.split(/\s*,\s*/),1<c.length||void 0===s){var n=k.slice(q,r);0<q&&n.unshift(c.pop());q=r+1;c.push(n);s&&c.push.apply(c,s.slice(1))}}}else return[];return c}function L(c,k,q){function r(k,w){function q(a){B=
!1;var l=n.lastIndex;a.then(function(){B=!0;e&&(n.lastIndex=l,A())});var e=!0}function A(){function c(a){a&&("string"==typeof a&&M)&&(a=M+a);b?b.push?"string"==typeof b[b.length-1]&&"string"==typeof a?b[b.length-1]+=a:a&&b.push(a):"string"==typeof b&&"string"==typeof a?b+=a:b=new K(b,a):b=a}for(B=!0;B;){var l=n.exec(k);if(!l)break;var e=l[5],M=l[1],f=l[2],d=l[3],p=l[4],m,g,b,z,p=p&&H(p),f=f&&H(f);y?(d?(g=f,m=d.charAt(0),z="?"==d.charAt(1),-1<d.indexOf("\n")&&(p=d.slice(1))):p=f,b=p,y=!1):(p=d?f+d:
f,c(p));"{"!=e&&(h+=l[0]);switch(e){case "'":case '"':var C="'"==e?P:Q;C.lastIndex=n.lastIndex;(e=C.exec(k))||t("unterminated string");f=e[1].replace(/\\([a-fA-F\d]{0,5}[ a-fA-F\d]?)/g,function(a,b){if(b)return String.fromCharCode(parseInt(b,16))});n.lastIndex=C.lastIndex;c(new G(f));h+=e[0];continue;case "\\":e=C.lastIndex++;c(k.charAt(e));continue;case "(":case "{":case "[":if("{"==e){y=!0;":"==m&&d&&(f+=d);h=H((h+f).replace(/\s+/g," "));c(d=a.newRule(h));"\x3d"==m&&(D=!1,b.creating=!0);var x=null,
J=E;if(l[6]&&(p=w.cssRules||w.rules,d.cssRule=x=p[l[6].slice(1)]))h=x.selectorText;if(a.root&&D)for(p=w.cssRules||w.rules;x=p[E++];)if(x.selectorText==h||x.selectorText&&x.selectorText.replace(/::/g,":").replace(/'/g,'"')==h.replace(/::/g,":").replace(/'/g,'"')){d.cssRule=x;break}x||(d.ruleIndex=E=J);d.styleSheet=w;b.creating?(d.selector="."+("\x3d"==m?f.match(/[\w-]*$/g,"")[0]:"")+"-x-"+R++,d.creating=!0):/^@(?!font-face)(?!FONT-FACE)/.test(h)?d.setMediaSelector(h):d.selector=a.root?h:a.selector+
" "+h;h=""}else f=p.match(/(.*?)([\w-]*)$/),c(d=a.newCall(f[2],b,a)),d.ref=a.getDefinition(f[2]),d.getArgs=O,(b.calls||(b.calls=[])).push(d);a.currentName=g;a.currentSequence=b;a.assignmentOperator=m;var F;if("{"==e&&(F=d.selector.match(/[@:]\w+/)))F=F[0],(g=a.getDefinition(F))&&g.selector&&g.selector(d);u.push(a=d);a.operator=e;a.start=n.lastIndex;b=g=null;continue}if(b)if(f="string"==typeof b?b:b[0],f.charAt&&"@"==f.charAt(0))if(l=f.match(/\w+/)[0],"import"==l)f=L.getStyleSheet((w.cssRules||w.imports)[E++],
b,w),l=n.lastIndex,r(f.localSource,f),n.lastIndex=l;else{if("xstyle"==l){if("start"==f.slice(8,13))d=a?a.newRule(""):N,d.root=a.root,u.push(a=d);else{var N=a||N;u.pop();a=u[u.length-1]}n=a?s:/(@[\w\s])/g}}else if("\x3d"===m)try{var v=a.declareDefinition(g,b,z);v&&v.then&&q(v)}catch(S){t(S)}switch(e){case ":":"\x3d"==m?(y=!0,m=":"):c(":");break;case "}":if(g&&!a.root&&!a.isMediaBlock)try{a[":"==m?"setValue":"declareDefinition"](g,b,z)}catch(T){t(T)}case ")":case "]":U[a.operator]!=e&&t("Incorrect opening operator "+
a.operator+" with closing operator "+e);g=null;g=k.slice(a.start,n.lastIndex-1);a.cssText=a.cssText?a.cssText+";"+g:g;if("}"==e){"}"==I&&(I=a.parent.selector)&&"@"==!I.charAt(0)&&t("A nested rule must end with a semicolon");if(a.root)t("Unmatched "+e);else{try{a.onRule(a.selector,a)}catch(V){t(V)}D=!0}h=""}if(")"==e||"]"==e)a.args=[b];if(")"==e&&!m){try{v=u[u.length-2].onArguments(a)}catch(W){t(W)}v&&v.then&&q(v)}u.pop();a=u[u.length-1];b=a.currentSequence;g=a.currentName;m=a.assignmentOperator;if(a.root&&
"}"==e){if(m)try{a[":"==m?"setValue":"declareDefinition"](g,b,z)}catch(X){t(X)}y=!0;m=!1}break;case "":case void 0:return;case ";":if(a&&g){try{(v=a[":"==m?"setValue":"declareDefinition"](g,b,z))&&v.then&&q(v)}catch(Y){t(Y)}g}b=null;y=!0;m=D=!1;h=""}var I=e}}function t(a){var c=k.slice(0,n.lastIndex).split("\n"),e=c[c.length-1],c=(w.href||"in-page stylesheet")+":"+c.length+":"+e.length+" near:\n"+e.slice(-40);if(r.onerror)r.onerror(a,c);console.error(a.message||a,c);a.stack&&console.error(a.stack)}
k=k.replace(J,function(a){return a.replace(/[^\n]/g,"")});var a=c;n.lastIndex=0;var B,E=0,D=!0,h="",y=!0;A()}q=q||{addRule:function(){},cssRules:[]};var s,n=s=/(\s*)((?:[^{\}\[\]\(\)\\'":=;]|\[(?:[^\]'"]|'(?:\\.|[^'])*'|"(?:\\.|[^"])*")\])*)([=:]\??\s*([^{\}\[\]\(\)\\'":;]*))?(?:([{\}\[\]\(\)\\'":;])(\/\d+)?|$)/g,u=[c];c.parse=r;r(k,q)}var P=/((?:\\.|[^'])*)'/g,Q=/((?:\\.|[^"])*)"/g,J=/\/\*[\w\W]*?\*\//g,U={"{":"}","[":"]","(":")"},R=0,H="".trim?function(c){return c.trim()}:function(c){return c.replace(/^\s+|\s+$/g,
"")},A=K.prototype=[];A.toString=function(){return this.join("")};A.isSequence=!0;G.prototype.toString=function(){return'"'+this.value.replace(/["\\\n\r]/g,"\\$\x26")+'"'};G.prototype.isLiteralString=!0;return L});