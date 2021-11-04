module.exports=function(){var s={761:function(s,t,f){"use strict";const h=f(331);const _=f(320);const e=f(514);const u=f(671);const c=s=>{if(typeof s!=="object"||!s)return s;const t=Object.assign({},s);if(s.mappings){t.mappings=Buffer.from(s.mappings,"utf-8")}if(s.sourcesContent){t.sourcesContent=s.sourcesContent.map(s=>s&&Buffer.from(s,"utf-8"))}return t};const o=s=>{if(typeof s!=="object"||!s)return s;const t=Object.assign({},s);if(s.mappings){t.mappings=s.mappings.toString("utf-8")}if(s.sourcesContent){t.sourcesContent=s.sourcesContent.map(s=>s&&s.toString("utf-8"))}return t};class CachedSource extends h{constructor(s,t){super();this._source=s;this._cachedSourceType=t?t.source:undefined;this._cachedSource=undefined;this._cachedBuffer=t?t.buffer:undefined;this._cachedSize=t?t.size:undefined;this._cachedMaps=t?t.maps:new Map;this._cachedHashUpdate=t?t.hash:undefined}getCachedData(){const s=new Map;for(const t of this._cachedMaps){let f=t[1];if(f.bufferedMap===undefined){f.bufferedMap=c(this._getMapFromCacheEntry(f))}s.set(t[0],{map:undefined,bufferedMap:f.bufferedMap})}if(this._cachedSource){this.buffer()}return{buffer:this._cachedBuffer,source:this._cachedSourceType!==undefined?this._cachedSourceType:typeof this._cachedSource==="string"?true:Buffer.isBuffer(this._cachedSource)?false:undefined,size:this._cachedSize,maps:s,hash:this._cachedHashUpdate}}originalLazy(){return this._source}original(){if(typeof this._source==="function")this._source=this._source();return this._source}source(){const s=this._getCachedSource();if(s!==undefined)return s;return this._cachedSource=this.original().source()}_getMapFromCacheEntry(s){if(s.map!==undefined){return s.map}else if(s.bufferedMap!==undefined){return s.map=o(s.bufferedMap)}}_getCachedSource(){if(this._cachedSource!==undefined)return this._cachedSource;if(this._cachedBuffer&&this._cachedSourceType!==undefined){return this._cachedSource=this._cachedSourceType?this._cachedBuffer.toString("utf-8"):this._cachedBuffer}}buffer(){if(this._cachedBuffer!==undefined)return this._cachedBuffer;if(this._cachedSource!==undefined){if(Buffer.isBuffer(this._cachedSource)){return this._cachedBuffer=this._cachedSource}return this._cachedBuffer=Buffer.from(this._cachedSource,"utf-8")}if(typeof this.original().buffer==="function"){return this._cachedBuffer=this.original().buffer()}const s=this.source();if(Buffer.isBuffer(s)){return this._cachedBuffer=s}return this._cachedBuffer=Buffer.from(s,"utf-8")}size(){if(this._cachedSize!==undefined)return this._cachedSize;if(this._cachedBuffer!==undefined){return this._cachedSize=this._cachedBuffer.length}const s=this._getCachedSource();if(s!==undefined){return this._cachedSize=Buffer.byteLength(s)}return this._cachedSize=this.original().size()}sourceAndMap(s){const t=s?JSON.stringify(s):"{}";const f=this._cachedMaps.get(t);if(f!==undefined){const s=this._getMapFromCacheEntry(f);return{source:this.source(),map:s}}let h=this._getCachedSource();let _;if(h!==undefined){_=this.original().map(s)}else{const t=this.original().sourceAndMap(s);h=t.source;_=t.map;this._cachedSource=h}this._cachedMaps.set(t,{map:_,bufferedMap:undefined});return{source:h,map:_}}streamChunks(s,t,f,h){const c=s?JSON.stringify(s):"{}";if(this._cachedMaps.has(c)&&(this._cachedBuffer!==undefined||this._cachedSource!==undefined)){const{source:u,map:c}=this.sourceAndMap(s);if(c){return _(u,c,t,f,h,!!(s&&s.finalSource),true)}else{return e(u,t,f,h,!!(s&&s.finalSource))}}const{result:o,source:p,map:i}=u(this.original(),s,t,f,h);this._cachedSource=p;this._cachedMaps.set(c,{map:i,bufferedMap:undefined});return o}map(s){const t=s?JSON.stringify(s):"{}";const f=this._cachedMaps.get(t);if(f!==undefined){return this._getMapFromCacheEntry(f)}const h=this.original().map(s);this._cachedMaps.set(t,{map:h,bufferedMap:undefined});return h}updateHash(s){if(this._cachedHashUpdate!==undefined){for(const t of this._cachedHashUpdate)s.update(t);return}const t=[];let f=undefined;const h={update:s=>{if(typeof s==="string"&&s.length<10240){if(f===undefined){f=s}else{f+=s;if(f.length>102400){t.push(Buffer.from(f));f=undefined}}}else{if(f!==undefined){t.push(Buffer.from(f));f=undefined}t.push(s)}}};this.original().updateHash(h);if(f!==undefined){t.push(Buffer.from(f))}for(const f of t)s.update(f);this._cachedHashUpdate=t}}s.exports=CachedSource},318:function(s,t,f){"use strict";const h=f(331);class CompatSource extends h{static from(s){return s instanceof h?s:new CompatSource(s)}constructor(s){super();this._sourceLike=s}source(){return this._sourceLike.source()}buffer(){if(typeof this._sourceLike.buffer==="function"){return this._sourceLike.buffer()}return super.buffer()}size(){if(typeof this._sourceLike.size==="function"){return this._sourceLike.size()}return super.size()}map(s){if(typeof this._sourceLike.map==="function"){return this._sourceLike.map(s)}return super.map(s)}sourceAndMap(s){if(typeof this._sourceLike.sourceAndMap==="function"){return this._sourceLike.sourceAndMap(s)}return super.sourceAndMap(s)}updateHash(s){if(typeof this._sourceLike.updateHash==="function"){return this._sourceLike.updateHash(s)}if(typeof this._sourceLike.map==="function"){throw new Error("A Source-like object with a 'map' method must also provide an 'updateHash' method")}s.update(this.buffer())}}s.exports=CompatSource},177:function(s,t,f){"use strict";const h=f(331);const _=f(771);const e=f(737);const{getMap:u,getSourceAndMap:c}=f(45);const o=new WeakSet;class ConcatSource extends h{constructor(){super();this._children=[];for(let s=0;s<arguments.length;s++){const t=arguments[s];if(t instanceof ConcatSource){for(const s of t._children){this._children.push(s)}}else{this._children.push(t)}}this._isOptimized=arguments.length===0}getChildren(){if(!this._isOptimized)this._optimize();return this._children}add(s){if(s instanceof ConcatSource){for(const t of s._children){this._children.push(t)}}else{this._children.push(s)}this._isOptimized=false}addAllSkipOptimizing(s){for(const t of s){this._children.push(t)}}buffer(){if(!this._isOptimized)this._optimize();const s=[];for(const t of this._children){if(typeof t.buffer==="function"){s.push(t.buffer())}else{const f=t.source();if(Buffer.isBuffer(f)){s.push(f)}else{s.push(Buffer.from(f,"utf-8"))}}}return Buffer.concat(s)}source(){if(!this._isOptimized)this._optimize();let s="";for(const t of this._children){s+=t.source()}return s}size(){if(!this._isOptimized)this._optimize();let s=0;for(const t of this._children){s+=t.size()}return s}map(s){return u(this,s)}sourceAndMap(s){return c(this,s)}streamChunks(s,t,f,h){if(!this._isOptimized)this._optimize();if(this._children.length===1)return this._children[0].streamChunks(s,t,f,h);let _=0;let u=0;let c=new Map;let o=new Map;const p=!!(s&&s.finalSource);let i="";let d=false;for(const A of this._children){const B=[];const S=[];let v=0;const{generatedLine:y,generatedColumn:z,source:r}=e(A,s,(s,f,h,e,c,o,A)=>{const y=f+_;const z=f===1?h+u:h;if(d){if(f!==1||h!==0){t(undefined,_+1,u,-1,-1,-1,-1)}d=false}const r=e<0||e>=B.length?-1:B[e];const j=A<0||A>=S.length?-1:S[A];v=r<0?0:f;if(p){if(s!==undefined)i+=s;if(r>=0){t(undefined,y,z,r,c,o,j)}}else{if(r<0){t(s,y,z,-1,-1,-1,-1)}else{t(s,y,z,r,c,o,j)}}},(s,t,h)=>{let _=c.get(t);if(_===undefined){c.set(t,_=c.size);f(_,t,h)}B[s]=_},(s,t)=>{let f=o.get(t);if(f===undefined){o.set(t,f=o.size);h(f,t)}S[s]=f});if(r!==undefined)i+=r;if(d){if(y!==1||z!==0){t(undefined,_+1,u,-1,-1,-1,-1);d=false}}if(y>1){u=z}else{u+=z}d=d||p&&v===y;_+=y-1}return{generatedLine:_+1,generatedColumn:u,source:p?i:undefined}}updateHash(s){if(!this._isOptimized)this._optimize();s.update("ConcatSource");for(const t of this._children){t.updateHash(s)}}_optimize(){const s=[];let t=undefined;let f=undefined;const h=s=>{if(f===undefined){f=s}else if(Array.isArray(f)){f.push(s)}else{f=[typeof f==="string"?f:f.source(),s]}};const e=s=>{if(f===undefined){f=s}else if(Array.isArray(f)){f.push(s.source())}else{f=[typeof f==="string"?f:f.source(),s.source()]}};const u=()=>{if(Array.isArray(f)){const t=new _(f.join(""));o.add(t);s.push(t)}else if(typeof f==="string"){const t=new _(f);o.add(t);s.push(t)}else{s.push(f)}};for(const _ of this._children){if(typeof _==="string"){if(t===undefined){t=_}else{t+=_}}else{if(t!==undefined){h(t);t=undefined}if(o.has(_)){e(_)}else{if(f!==undefined){u();f=undefined}s.push(_)}}}if(t!==undefined){h(t)}if(f!==undefined){u()}this._children=s;this._isOptimized=true}}s.exports=ConcatSource},591:function(s,t,f){"use strict";const{getMap:h,getSourceAndMap:_}=f(45);const e=f(432);const u=f(450);const c=f(331);const o=/[^\n;{}]+[;{} \r\t]*\n?|[;{} \r\t]+\n?|\n/g;class OriginalSource extends c{constructor(s,t){super();const f=Buffer.isBuffer(s);this._value=f?undefined:s;this._valueAsBuffer=f?s:undefined;this._name=t}getName(){return this._name}source(){if(this._value===undefined){this._value=this._valueAsBuffer.toString("utf-8")}return this._value}buffer(){if(this._valueAsBuffer===undefined){this._valueAsBuffer=Buffer.from(this._value,"utf-8")}return this._valueAsBuffer}map(s){return h(this,s)}sourceAndMap(s){return _(this,s)}streamChunks(s,t,f,h){if(this._value===undefined){this._value=this._valueAsBuffer.toString("utf-8")}f(0,this._name,this._value);const _=!!(s&&s.finalSource);if(!s||s.columns!==false){const s=this._value.match(o);let f=1;let h=0;if(s!==null){for(const e of s){const s=e.endsWith("\n");if(s&&e.length===1){if(!_)t(e,f,h,-1,-1,-1,-1)}else{const s=_?undefined:e;t(s,f,h,0,f,h,-1)}if(s){f++;h=0}else{h+=e.length}}}return{generatedLine:f,generatedColumn:h,source:_?this._value:undefined}}else if(_){const s=u(this._value);const{generatedLine:f,generatedColumn:h}=s;if(h===0){for(let s=1;s<f;s++)t(undefined,s,0,0,s,0,-1)}else{for(let s=1;s<=f;s++)t(undefined,s,0,0,s,0,-1)}return s}else{let s=1;const f=e(this._value);let h;for(h of f){t(_?undefined:h,s,0,0,s,0,-1);s++}return f.length===0||h.endsWith("\n")?{generatedLine:f.length+1,generatedColumn:0,source:_?this._value:undefined}:{generatedLine:f.length,generatedColumn:h.length,source:_?this._value:undefined}}}updateHash(s){if(this._valueAsBuffer===undefined){this._valueAsBuffer=Buffer.from(this._value,"utf-8")}s.update("OriginalSource");s.update(this._valueAsBuffer);s.update(this._name||"")}}s.exports=OriginalSource},664:function(s,t,f){"use strict";const h=f(331);const _=f(771);const e=f(737);const{getMap:u,getSourceAndMap:c}=f(45);const o=/\n(?=.|\s)/g;class PrefixSource extends h{constructor(s,t){super();this._source=typeof t==="string"||Buffer.isBuffer(t)?new _(t,true):t;this._prefix=s}getPrefix(){return this._prefix}original(){return this._source}source(){const s=this._source.source();const t=this._prefix;return t+s.replace(o,"\n"+t)}map(s){return u(this,s)}sourceAndMap(s){return c(this,s)}streamChunks(s,t,f,h){const _=this._prefix;const u=_.length;const c=!!(s&&s.columns===false);const{generatedLine:p,generatedColumn:i,source:d}=e(this._source,s,(s,f,h,e,o,p,i)=>{if(h!==0){h+=u}else if(s!==undefined){if(c||e<0){s=_+s}else if(u>0){t(_,f,h,-1,-1,-1,-1);h+=u}}else if(!c){h+=u}t(s,f,h,e,o,p,i)},f,h);return{generatedLine:p,generatedColumn:i===0?0:u+i,source:d!==undefined?_+d.replace(o,"\n"+_):undefined}}updateHash(s){s.update("PrefixSource");this._source.updateHash(s);s.update(this._prefix)}}s.exports=PrefixSource},771:function(s,t,f){"use strict";const h=f(514);const _=f(331);class RawSource extends _{constructor(s,t=false){super();const f=Buffer.isBuffer(s);if(!f&&typeof s!=="string"){throw new TypeError("argument 'value' must be either string of Buffer")}this._valueIsBuffer=!t&&f;this._value=t&&f?undefined:s;this._valueAsBuffer=f?s:undefined;this._valueAsString=f?undefined:s}isBuffer(){return this._valueIsBuffer}source(){if(this._value===undefined){this._value=this._valueAsBuffer.toString("utf-8")}return this._value}buffer(){if(this._valueAsBuffer===undefined){this._valueAsBuffer=Buffer.from(this._value,"utf-8")}return this._valueAsBuffer}map(s){return null}streamChunks(s,t,f,_){if(this._value===undefined){this._value=Buffer.from(this._valueAsBuffer,"utf-8")}if(this._valueAsString===undefined){this._valueAsString=typeof this._value==="string"?this._value:this._value.toString("utf-8")}return h(this._valueAsString,t,f,_,!!(s&&s.finalSource))}updateHash(s){if(this._valueAsBuffer===undefined){this._valueAsBuffer=Buffer.from(this._value,"utf-8")}s.update("RawSource");s.update(this._valueAsBuffer)}}s.exports=RawSource},251:function(s,t,f){"use strict";const{getMap:h,getSourceAndMap:_}=f(45);const e=f(737);const u=f(331);const c=f(432);const o=typeof process==="object"&&process.versions&&typeof process.versions.v8==="string"&&!/^[0-6]\./.test(process.versions.v8);const p=536870912;class Replacement{constructor(s,t,f,h){this.start=s;this.end=t;this.content=f;this.name=h;if(!o){this.index=-1}}}class ReplaceSource extends u{constructor(s,t){super();this._source=s;this._name=t;this._replacements=[];this._isSorted=true}getName(){return this._name}getReplacements(){this._sortReplacements();return this._replacements}replace(s,t,f,h){if(typeof f!=="string")throw new Error("insertion must be a string, but is a "+typeof f);this._replacements.push(new Replacement(s,t,f,h));this._isSorted=false}insert(s,t,f){if(typeof t!=="string")throw new Error("insertion must be a string, but is a "+typeof t+": "+t);this._replacements.push(new Replacement(s,s-1,t,f));this._isSorted=false}source(){if(this._replacements.length===0){return this._source.source()}let s=this._source.source();let t=0;const f=[];this._sortReplacements();for(const h of this._replacements){const _=Math.floor(h.start);const e=Math.floor(h.end+1);if(t<_){const h=_-t;f.push(s.slice(0,h));s=s.slice(h);t=_}f.push(h.content);if(t<e){const f=e-t;s=s.slice(f);t=e}}f.push(s);return f.join("")}map(s){if(this._replacements.length===0){return this._source.map(s)}return h(this,s)}sourceAndMap(s){if(this._replacements.length===0){return this._source.sourceAndMap(s)}return _(this,s)}original(){return this._source}_sortReplacements(){if(this._isSorted)return;if(o){this._replacements.sort(function(s,t){const f=s.start-t.start;if(f!==0)return f;const h=s.end-t.end;if(h!==0)return h;return 0})}else{this._replacements.forEach((s,t)=>s.index=t);this._replacements.sort(function(s,t){const f=s.start-t.start;if(f!==0)return f;const h=s.end-t.end;if(h!==0)return h;return s.index-t.index})}this._isSorted=true}streamChunks(s,t,f,h){this._sortReplacements();const _=this._replacements;let u=0;let o=0;let i=-1;let d=o<_.length?Math.floor(_[o].start):p;let A=0;let B=0;let S=0;const v=[];const y=new Map;const z=[];const r=(s,t,f,h)=>{let _=s<v.length?v[s]:undefined;if(_===undefined)return false;if(typeof _==="string"){_=c(_);v[s]=_}const e=t<=_.length?_[t-1]:null;if(e===null)return false;return e.slice(f,f+h.length)===h};let{generatedLine:j,generatedColumn:M}=e(this._source,Object.assign({},s,{finalSource:false}),(s,f,e,c,v,j,M)=>{let H=0;let b=u+s.length;if(i>u){if(i>=b){const t=f+A;if(s.endsWith("\n")){A--;if(S===t){B+=e}}else if(S===t){B-=s.length}else{B=-s.length;S=t}u=b;return}H=i-u;if(r(c,v,j,s.slice(0,H))){j+=H}u+=H;const t=f+A;if(S===t){B-=H}else{B=-H;S=t}e+=H}if(d<b){do{let W=f+A;if(d>u){const f=d-u;const h=s.slice(H,H+f);t(h,W,e+(W===S?B:0),c,v,j,M<0||M>=z.length?-1:z[M]);e+=f;H+=f;u=d;if(r(c,v,j,h)){j+=h.length}}const l=/[^\n]+\n?|\n/g;const{content:J,name:U}=_[o];let q=l.exec(J);let $=M;if(c>=0&&U){let s=y.get(U);if(s===undefined){s=y.size;y.set(U,s);h(s,U)}$=s}while(q!==null){const s=q[0];t(s,W,e+(W===S?B:0),c,v,j,$);$=-1;q=l.exec(J);if(q===null&&!s.endsWith("\n")){if(S===W){B+=s.length}else{B=s.length;S=W}}else{A++;W++;B=-e;S=W}}i=Math.max(i,Math.floor(_[o].end+1));o++;d=o<_.length?Math.floor(_[o].start):p;const F=s.length-b+i-H;if(F>0){if(i>=b){let t=f+A;if(s.endsWith("\n")){A--;if(S===t){B+=e}}else if(S===t){B-=s.length-H}else{B=H-s.length;S=t}u=b;return}const t=f+A;if(r(c,v,j,s.slice(H,H+F))){j+=F}H+=F;u+=F;if(S===t){B-=F}else{B=-F;S=t}e+=F}}while(d<b)}if(H<s.length){const h=H===0?s:s.slice(H);const _=f+A;t(h,_,e+(_===S?B:0),c,v,j,M<0?-1:z[M])}u=b},(s,t,h)=>{while(v.length<s)v.push(undefined);v[s]=h;f(s,t,h)},(s,t)=>{let f=y.get(t);if(f===undefined){f=y.size;y.set(t,f);h(f,t)}z[s]=f});let H="";for(;o<_.length;o++){H+=_[o].content}let b=j+A;const W=/[^\n]+\n?|\n/g;let l=W.exec(H);while(l!==null){const s=l[0];t(s,b,M+(b===S?B:0),-1,-1,-1,-1);l=W.exec(H);if(l===null&&!s.endsWith("\n")){if(S===b){B+=s.length}else{B=s.length;S=b}}else{A++;b++;B=-M;S=b}}return{generatedLine:b,generatedColumn:M+(b===S?B:0)}}updateHash(s){this._sortReplacements();s.update("ReplaceSource");this._source.updateHash(s);s.update(this._name||"");for(const t of this._replacements){s.update(`${t.start}${t.end}${t.content}${t.name}`)}}}s.exports=ReplaceSource},746:function(s,t,f){"use strict";const h=f(331);class SizeOnlySource extends h{constructor(s){super();this._size=s}_error(){return new Error("Content and Map of this Source is not available (only size() is supported)")}size(){return this._size}source(){throw this._error()}buffer(){throw this._error()}map(s){throw this._error()}updateHash(){throw this._error()}}s.exports=SizeOnlySource},331:function(s){"use strict";class Source{source(){throw new Error("Abstract")}buffer(){const s=this.source();if(Buffer.isBuffer(s))return s;return Buffer.from(s,"utf-8")}size(){return this.buffer().length}map(s){return null}sourceAndMap(s){return{source:this.source(),map:this.map(s)}}updateHash(s){throw new Error("Abstract")}}s.exports=Source},33:function(s,t,f){"use strict";const h=f(331);const _=f(320);const e=f(10);const{getMap:u,getSourceAndMap:c}=f(45);class SourceMapSource extends h{constructor(s,t,f,h,_,e){super();const u=Buffer.isBuffer(s);this._valueAsString=u?undefined:s;this._valueAsBuffer=u?s:undefined;this._name=t;this._hasSourceMap=!!f;const c=Buffer.isBuffer(f);const o=typeof f==="string";this._sourceMapAsObject=c||o?undefined:f;this._sourceMapAsString=o?f:undefined;this._sourceMapAsBuffer=c?f:undefined;this._hasOriginalSource=!!h;const p=Buffer.isBuffer(h);this._originalSourceAsString=p?undefined:h;this._originalSourceAsBuffer=p?h:undefined;this._hasInnerSourceMap=!!_;const i=Buffer.isBuffer(_);const d=typeof _==="string";this._innerSourceMapAsObject=i||d?undefined:_;this._innerSourceMapAsString=d?_:undefined;this._innerSourceMapAsBuffer=i?_:undefined;this._removeOriginalSource=e}_ensureValueBuffer(){if(this._valueAsBuffer===undefined){this._valueAsBuffer=Buffer.from(this._valueAsString,"utf-8")}}_ensureValueString(){if(this._valueAsString===undefined){this._valueAsString=this._valueAsBuffer.toString("utf-8")}}_ensureOriginalSourceBuffer(){if(this._originalSourceAsBuffer===undefined&&this._hasOriginalSource){this._originalSourceAsBuffer=Buffer.from(this._originalSourceAsString,"utf-8")}}_ensureOriginalSourceString(){if(this._originalSourceAsString===undefined&&this._hasOriginalSource){this._originalSourceAsString=this._originalSourceAsBuffer.toString("utf-8")}}_ensureInnerSourceMapObject(){if(this._innerSourceMapAsObject===undefined&&this._hasInnerSourceMap){this._ensureInnerSourceMapString();this._innerSourceMapAsObject=JSON.parse(this._innerSourceMapAsString)}}_ensureInnerSourceMapBuffer(){if(this._innerSourceMapAsBuffer===undefined&&this._hasInnerSourceMap){this._ensureInnerSourceMapString();this._innerSourceMapAsBuffer=Buffer.from(this._innerSourceMapAsString,"utf-8")}}_ensureInnerSourceMapString(){if(this._innerSourceMapAsString===undefined&&this._hasInnerSourceMap){if(this._innerSourceMapAsBuffer!==undefined){this._innerSourceMapAsString=this._innerSourceMapAsBuffer.toString("utf-8")}else{this._innerSourceMapAsString=JSON.stringify(this._innerSourceMapAsObject)}}}_ensureSourceMapObject(){if(this._sourceMapAsObject===undefined){this._ensureSourceMapString();this._sourceMapAsObject=JSON.parse(this._sourceMapAsString)}}_ensureSourceMapBuffer(){if(this._sourceMapAsBuffer===undefined){this._ensureSourceMapString();this._sourceMapAsBuffer=Buffer.from(this._sourceMapAsString,"utf-8")}}_ensureSourceMapString(){if(this._sourceMapAsString===undefined){if(this._sourceMapAsBuffer!==undefined){this._sourceMapAsString=this._sourceMapAsBuffer.toString("utf-8")}else{this._sourceMapAsString=JSON.stringify(this._sourceMapAsObject)}}}getArgsAsBuffers(){this._ensureValueBuffer();this._ensureSourceMapBuffer();this._ensureOriginalSourceBuffer();this._ensureInnerSourceMapBuffer();return[this._valueAsBuffer,this._name,this._sourceMapAsBuffer,this._originalSourceAsBuffer,this._innerSourceMapAsBuffer,this._removeOriginalSource]}buffer(){this._ensureValueBuffer();return this._valueAsBuffer}source(){this._ensureValueString();return this._valueAsString}map(s){if(!this._hasInnerSourceMap){this._ensureSourceMapObject();return this._sourceMapAsObject}return u(this,s)}sourceAndMap(s){if(!this._hasInnerSourceMap){this._ensureValueString();this._ensureSourceMapObject();return{source:this._valueAsString,map:this._sourceMapAsObject}}return c(this,s)}streamChunks(s,t,f,h){this._ensureValueString();this._ensureSourceMapObject();this._ensureOriginalSourceString();if(this._hasInnerSourceMap){this._ensureInnerSourceMapObject();return e(this._valueAsString,this._sourceMapAsObject,this._name,this._originalSourceAsString,this._innerSourceMapAsObject,this._removeOriginalSource,t,f,h,!!(s&&s.finalSource),!!(s&&s.columns!==false))}else{return _(this._valueAsString,this._sourceMapAsObject,t,f,h,!!(s&&s.finalSource),!!(s&&s.columns!==false))}}updateHash(s){this._ensureValueBuffer();this._ensureSourceMapBuffer();this._ensureOriginalSourceBuffer();this._ensureInnerSourceMapBuffer();s.update("SourceMapSource");s.update(this._valueAsBuffer);s.update(this._sourceMapAsBuffer);if(this._hasOriginalSource){s.update(this._originalSourceAsBuffer)}if(this._hasInnerSourceMap){s.update(this._innerSourceMapAsBuffer)}s.update(this._removeOriginalSource?"true":"false")}}s.exports=SourceMapSource},744:function(s){"use strict";const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");const f=32;const h=s=>{const t=s&&s.columns===false;return t?e():_()};const _=()=>{let s=1;let h=0;let _=0;let e=1;let u=0;let c=0;let o=false;let p=false;let i=true;return(d,A,B,S,v,y)=>{if(o&&s===d){if(B===_&&S===e&&v===u&&!p&&y<0){return""}}else{if(B<0){return""}}let z;if(s<d){z=";".repeat(d-s);s=d;h=0;i=false}else if(i){z="";i=false}else{z=","}const r=s=>{const h=s>>>31&1;const _=s>>31;const e=s+_^_;let u=e<<1|h;for(;;){const s=u&31;u>>=5;if(u===0){z+=t[s];break}else{z+=t[s|f]}}};r(A-h);h=A;if(B>=0){o=true;if(B===_){z+="A"}else{r(B-_);_=B}r(S-e);e=S;if(v===u){z+="A"}else{r(v-u);u=v}if(y>=0){r(y-c);c=y;p=true}else{p=false}}else{o=false}return z}};const e=()=>{let s=0;let h=1;let _=0;let e=1;return(u,c,o,p,i,d)=>{if(o<0){return""}if(s===u){return""}let A;const B=s=>{const h=s>>>31&1;const _=s>>31;const e=s+_^_;let u=e<<1|h;for(;;){const s=u&31;u>>=5;if(u===0){A+=t[s];break}else{A+=t[s|f]}}};s=u;if(u===h+1){h=u;if(o===_){_=o;if(p===e+1){e=p;return";AACA"}else{A=";AA";B(p-e);e=p;return A+"A"}}else{A=";A";B(o-_);_=o;B(p-e);e=p;return A+"A"}}else{A=";".repeat(u-h);h=u;if(o===_){_=o;if(p===e+1){e=p;return A+"AACA"}else{A+="AA";B(p-e);e=p;return A+"A"}}else{A+="A";B(o-_);_=o;B(p-e);e=p;return A+"A"}}}};s.exports=h},45:function(s,t,f){"use strict";const h=f(744);t.getSourceAndMap=((s,t)=>{let f="";let _="";let e=[];let u=[];let c=[];const o=h(t);const{source:p}=s.streamChunks(Object.assign({},t,{finalSource:true}),(s,t,h,e,u,c,p)=>{if(s!==undefined)f+=s;_+=o(t,h,e,u,c,p)},(s,t,f)=>{while(e.length<s){e.push(null)}e[s]=t;if(f!==undefined){while(u.length<s){u.push(null)}u[s]=f}},(s,t)=>{while(c.length<s){c.push(null)}c[s]=t});return{source:p!==undefined?p:f,map:_.length>0?{version:3,file:"x",mappings:_,sources:e,sourcesContent:u.length>0?u:undefined,names:c}:null}});t.getMap=((s,t)=>{let f="";let _=[];let e=[];let u=[];const c=h(t);s.streamChunks(Object.assign({},t,{source:false,finalSource:true}),(s,t,h,_,e,u,o)=>{f+=c(t,h,_,e,u,o)},(s,t,f)=>{while(_.length<s){_.push(null)}_[s]=t;if(f!==undefined){while(e.length<s){e.push(null)}e[s]=f}},(s,t)=>{while(u.length<s){u.push(null)}u[s]=t});return f.length>0?{version:3,file:"x",mappings:f,sources:_,sourcesContent:e.length>0?e:undefined,names:u}:null})},450:function(s){"use strict";const t="\n".charCodeAt(0);const f=s=>{if(s===undefined){return{}}const f=s.lastIndexOf("\n");if(f===-1){return{generatedLine:1,generatedColumn:s.length,source:s}}let h=2;for(let _=0;_<f;_++){if(s.charCodeAt(_)===t)h++}return{generatedLine:h,generatedColumn:s.length-f-1,source:s}};s.exports=f},682:function(s){"use strict";const t=(s,t)=>{if(t<0)return null;const{sourceRoot:f,sources:h}=s;const _=h[t];if(!f)return _;if(f.endsWith("/"))return f+_;return f+"/"+_};s.exports=t},150:function(s){"use strict";const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";const f=32;const h=64;const _=h|1;const e=h|2;const u=31;const c=new Uint8Array("z".charCodeAt(0)+1);{c.fill(e);for(let s=0;s<t.length;s++){c[t.charCodeAt(s)]=s}c[",".charCodeAt(0)]=h;c[";".charCodeAt(0)]=_}const o=c.length-1;const p=(s,t)=>{const e=new Uint32Array([0,0,1,0,0]);let p=0;let i=0;let d=0;let A=1;let B=-1;for(let S=0;S<s.length;S++){const v=s.charCodeAt(S);if(v>o)continue;const y=c[v];if((y&h)!==0){if(e[0]>B){if(p===1){t(A,e[0],-1,-1,-1,-1)}else if(p===4){t(A,e[0],e[1],e[2],e[3],-1)}else if(p===5){t(A,e[0],e[1],e[2],e[3],e[4])}B=e[0]}p=0;if(y===_){A++;e[0]=0;B=-1}}else if((y&f)===0){i|=y<<d;const s=i&1?-(i>>1):i>>1;e[p++]+=s;d=0;i=0}else{i|=(y&u)<<d;d+=5}}if(p===1){t(A,e[0],-1,-1,-1,-1)}else if(p===4){t(A,e[0],e[1],e[2],e[3],-1)}else if(p===5){t(A,e[0],e[1],e[2],e[3],e[4])}};s.exports=p},432:function(s){const t=s=>{const t=[];const f=s.length;let h=0;for(;h<f;){const _=s.charCodeAt(h);if(_===10){t.push("\n");h++}else{let _=h+1;while(_<f&&s.charCodeAt(_)!==10)_++;t.push(s.slice(h,_+1));h=_+1}}return t};s.exports=t},671:function(s,t,f){"use strict";const h=f(744);const _=f(737);const e=(s,t,f,e,u)=>{let c="";let o="";let p=[];let i=[];let d=[];const A=h(Object.assign({},t,{columns:true}));const B=!!(t&&t.finalSource);const{generatedLine:S,generatedColumn:v,source:y}=_(s,t,(s,t,h,_,e,u,p)=>{if(s!==undefined)c+=s;o+=A(t,h,_,e,u,p);return f(B?undefined:s,t,h,_,e,u,p)},(s,t,f)=>{while(p.length<s){p.push(null)}p[s]=t;if(f!==undefined){while(i.length<s){i.push(null)}i[s]=f}return e(s,t,f)},(s,t)=>{while(d.length<s){d.push(null)}d[s]=t;return u(s,t)});const z=y!==undefined?y:c;return{result:{generatedLine:S,generatedColumn:v,source:B?z:undefined},source:z,map:o.length>0?{version:3,file:"x",mappings:o,sources:p,sourcesContent:i.length>0?i:undefined,names:d}:null}};s.exports=e},737:function(s,t,f){"use strict";const h=f(514);const _=f(320);s.exports=((s,t,f,e,u)=>{if(typeof s.streamChunks==="function"){return s.streamChunks(t,f,e,u)}else{const c=s.sourceAndMap(t);if(c.map){return _(c.source,c.map,f,e,u,!!(t&&t.finalSource),!!(t&&t.columns!==false))}else{return h(c.source,f,e,u,!!(t&&t.finalSource))}}})},10:function(s,t,f){"use strict";const h=f(320);const _=f(432);const e=(s,t,f,e,u,c,o,p,i,d,A)=>{let B=new Map;let S=new Map;const v=[];const y=[];const z=[];let r=-2;const j=[];const M=[];const H=[];const b=[];const W=[];const l=[];const J=[];const U=(s,t)=>{if(s>J.length)return-1;const{mappingsData:f}=J[s-1];let h=0;let _=f.length/5;while(h<_){let s=h+_>>1;if(f[s*5]<=t){h=s+1}else{_=s}}if(h===0)return-1;return h-1};return h(s,t,(t,h,u,d,A,q,$)=>{if(d===r){const r=U(A,q);if(r!==-1){const{chunks:s,mappingsData:f}=J[A-1];const e=r*5;const c=f[e+1];const d=f[e+2];let v=f[e+3];let U=f[e+4];if(c>=0){const A=s[r];const J=f[e];const F=q-J;if(F>0){let s=c<b.length?b[c]:null;if(s===undefined){const t=H[c];s=t?_(t):null;b[c]=s}if(s!==null){const t=d<=s.length?s[d-1].slice(v,v+F):"";if(A.slice(0,F)===t){v+=F;U=-1}}}let K=c<j.length?j[c]:-2;if(K===-2){const[s,t]=c<M.length?M[c]:[null,undefined];let f=B.get(s);if(f===undefined){B.set(s,f=B.size);p(f,s,t)}K=f;j[c]=K}let Q=-1;if(U>=0){Q=U<W.length?W[U]:-2;if(Q===-2){const s=U<l.length?l[U]:undefined;if(s){let t=S.get(s);if(t===undefined){S.set(s,t=S.size);i(t,s)}Q=t}else{Q=-1}W[U]=Q}}else if($>=0){let s=b[c];if(s===undefined){const t=H[c];s=t?_(t):null;b[c]=s}if(s!==null){const t=z[$];const f=d<=s.length?s[d-1].slice(v,v+t.length):"";if(t===f){Q=$<y.length?y[$]:-2;if(Q===-2){const s=z[$];if(s){let t=S.get(s);if(t===undefined){S.set(s,t=S.size);i(t,s)}Q=t}else{Q=-1}y[$]=Q}}}}o(t,h,u,K,d,v,Q);return}}if(c){o(t,h,u,-1,-1,-1,-1);return}else{if(v[d]===-2){let t=B.get(f);if(t===undefined){B.set(s,t=B.size);p(t,f,e)}v[d]=t}}}const F=d<0||d>=v.length?-1:v[d];if(F<0){o(t,h,u,-1,-1,-1,-1)}else{let s=-1;if($>=0&&$<y.length){s=y[$];if(s===-2){const t=z[$];let f=S.get(t);if(f===undefined){S.set(t,f=S.size);i(f,t)}s=f;y[$]=s}}o(t,h,u,F,A,q,s)}},(s,t,_)=>{if(t===f){r=s;if(e!==undefined)_=e;else e=_;v[s]=-2;h(_,u,(s,t,f,h,_,e,u)=>{while(J.length<t){J.push({mappingsData:[],chunks:[]})}const c=J[t-1];c.mappingsData.push(f,h,_,e,u);c.chunks.push(s)},(s,t,f)=>{H[s]=f;b[s]=undefined;j[s]=-2;M[s]=[t,f]},(s,t)=>{W[s]=-2;l[s]=t},false,A)}else{let f=B.get(t);if(f===undefined){B.set(t,f=B.size);p(f,t,_)}v[s]=f}},(s,t)=>{y[s]=-2;z[s]=t},d,A)};s.exports=e},514:function(s,t,f){"use strict";const h=f(450);const _=f(432);const e=(s,t,f,h)=>{let e=1;const u=_(s);let c;for(c of u){t(c,e,0,-1,-1,-1,-1);e++}return u.length===0||c.endsWith("\n")?{generatedLine:u.length+1,generatedColumn:0}:{generatedLine:u.length,generatedColumn:c.length}};s.exports=((s,t,f,_,u)=>{return u?h(s):e(s,t,f,_)})},320:function(s,t,f){"use strict";const h=f(450);const _=f(682);const e=f(150);const u=f(432);const c=(s,t,f,h,c)=>{const o=u(s);if(o.length===0){return{generatedLine:1,generatedColumn:0}}const{sources:p,sourcesContent:i,names:d,mappings:A}=t;for(let s=0;s<p.length;s++){h(s,_(t,s),i&&i[s]||undefined)}if(d){for(let s=0;s<d.length;s++){c(s,d[s])}}const B=o[o.length-1];const S=B.endsWith("\n");const v=S?o.length+1:o.length;const y=S?0:B.length;let z=1;let r=0;let j=false;let M=-1;let H=-1;let b=-1;let W=-1;const l=(s,t,h,_,e,u)=>{if(j&&z<=o.length){let h;const _=z;const e=r;const u=o[z-1];if(s!==z){h=u.slice(r);z++;r=0}else{h=u.slice(r,t);r=t}if(h){f(h,_,e,M,H,b,W)}j=false}if(s>z&&r>0){if(z<=o.length){const s=o[z-1].slice(r);f(s,z,r,-1,-1,-1,-1)}z++;r=0}while(s>z){if(z<=o.length){f(o[z-1],z,0,-1,-1,-1,-1)}z++}if(t>r){if(z<=o.length){const s=o[z-1].slice(r,t);f(s,z,r,-1,-1,-1,-1)}r=t}if(h>=0&&(s<v||s===v&&t<y)){j=true;M=h;H=_;b=e;W=u}};e(A,l);l(v,y,-1,-1,-1,-1);return{generatedLine:v,generatedColumn:y}};const o=(s,t,f,h,c)=>{const o=u(s);if(o.length===0){return{generatedLine:1,generatedColumn:0}}const{sources:p,sourcesContent:i,mappings:d}=t;for(let s=0;s<p.length;s++){h(s,_(t,s),i&&i[s]||undefined)}let A=1;const B=(s,t,h,_,e,u)=>{if(h<0||s<A||s>o.length){return}while(s>A){if(A<=o.length){f(o[A-1],A,0,-1,-1,-1,-1)}A++}if(s<=o.length){f(o[s-1],s,0,h,_,e,-1);A++}};e(d,B);for(;A<=o.length;A++){f(o[A-1],A,0,-1,-1,-1,-1)}const S=o[o.length-1];const v=S.endsWith("\n");const y=v?o.length+1:o.length;const z=v?0:S.length;return{generatedLine:y,generatedColumn:z}};const p=(s,t,f,u,c)=>{const o=h(s);const{generatedLine:p,generatedColumn:i}=o;if(p===1&&i===0)return o;const{sources:d,sourcesContent:A,names:B,mappings:S}=t;for(let s=0;s<d.length;s++){u(s,_(t,s),A&&A[s]||undefined)}if(B){for(let s=0;s<B.length;s++){c(s,B[s])}}let v=0;const y=(s,t,h,_,e,u)=>{if(s>=p&&(t>=i||s>p)){return}if(h>=0){f(undefined,s,t,h,_,e,u);v=s}else if(v===s){f(undefined,s,t,-1,-1,-1,-1);v=0}};e(S,y);return o};const i=(s,t,f,u,c)=>{const o=h(s);const{generatedLine:p,generatedColumn:i}=o;if(p===1&&i===0){return{generatedLine:1,generatedColumn:0}}const{sources:d,sourcesContent:A,mappings:B}=t;for(let s=0;s<d.length;s++){u(s,_(t,s),A&&A[s]||undefined)}const S=i===0?p-1:p;let v=1;const y=(s,t,h,_,e,u)=>{if(h>=0&&v<=s&&s<=S){f(undefined,s,0,h,_,e,-1);v=s+1}};e(B,y);return o};s.exports=((s,t,f,h,_,e,u)=>{if(u){return e?p(s,t,f,h,_):c(s,t,f,h,_)}else{return e?i(s,t,f,h,_):o(s,t,f,h,_)}})},964:function(s,t,f){const h=(s,f)=>{let h;Object.defineProperty(t,s,{get:()=>{if(f!==undefined){h=f();f=undefined}return h},configurable:true})};h("Source",()=>f(331));h("RawSource",()=>f(771));h("OriginalSource",()=>f(591));h("SourceMapSource",()=>f(33));h("CachedSource",()=>f(761));h("ConcatSource",()=>f(177));h("ReplaceSource",()=>f(251));h("PrefixSource",()=>f(664));h("SizeOnlySource",()=>f(746));h("CompatSource",()=>f(318))}};var t={};function __nccwpck_require__(f){if(t[f]){return t[f].exports}var h=t[f]={exports:{}};var _=true;try{s[f](h,h.exports,__nccwpck_require__);_=false}finally{if(_)delete t[f]}return h.exports}__nccwpck_require__.ab=__dirname+"/";return __nccwpck_require__(964)}();