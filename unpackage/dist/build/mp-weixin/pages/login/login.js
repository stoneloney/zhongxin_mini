(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"012b":function(e,t,n){"use strict";n.r(t);var o=n("8f82"),r=n.n(o);for(var c in o)["default"].indexOf(c)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(c);t["default"]=r.a},"8f82":function(e,t,n){"use strict";(function(e,o){var r=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=r(n("9523")),a=n("34d1"),i=n("b6c8"),u=n("26cb");function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){(0,c.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var f={data:function(){return{openid:""}},methods:s(s({},(0,u.mapMutations)(["SET_MEMBER","SET_OPENID","SET_TOKEN"])),{},{login:function(){var t=this;e.login({provider:"weixin",onlyAuthorize:!0,success:function(n){"login:ok"==n.errMsg?(console.log(n),(0,i.WeixinCode)(n.code,(function(n){0===n.code?(t.SET_OPENID(n.data.openid),t.SET_TOKEN(n.data.salt),t.openid=n.data.openid,e.setStorageSync("openid",n.data.openid),e.setStorageSync("token",n.data.salt),o.getUserInfo({success:function(n){if("getUserInfo:ok"==n.errMsg){var o=n.userInfo,r=o.avatarUrl,c=o.city,i=o.country,u=o.gender,l=o.nickName,s=o.province;(0,a.MemberInfoUpdate)({avatar:r,nickname:l,gender:u,country:i,province:s,city:c,openid:t.openid},(function(t){0===t.code?(e.setStorageSync("memberInfo",{avatar:r,nickname:l,gender:u,country:i,province:s,city:c}),e.navigateTo({url:"/pages/user/user"})):e.showModal({title:"title",content:"授权失败，请重新授权(1004)",showCancel:!1})}))}else e.showModal({title:"title",content:"您取消了授权登录，请重新授权(1003)",showCancel:!1})},fail:function(t){e.showModal({title:"title",content:"授权失败，请重新授权(1002)",showCancel:!1})}})):e.showModal({title:"title",content:"授权失败，请重新授权(1001)",showCancel:!1})}))):e.showModal({title:"title",content:"您取消了授权登录，请重新授权",showCancel:!1})}})}})};t.default=f}).call(this,n("543d")["default"],n("bc2e")["default"])},"9d28":function(e,t,n){"use strict";(function(e,t){var o=n("4ea4");n("1dac");o(n("66fd"));var r=o(n("ed8b"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(r.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},cefe:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){}));var o=function(){var e=this.$createElement;this._self._c},r=[]},ed8b:function(e,t,n){"use strict";n.r(t);var o=n("cefe"),r=n("012b");for(var c in r)["default"].indexOf(c)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(c);var a=n("f0c5"),i=Object(a["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);t["default"]=i.exports}},[["9d28","common/runtime","common/vendor"]]]);