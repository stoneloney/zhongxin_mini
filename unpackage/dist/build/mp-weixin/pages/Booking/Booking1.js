(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Booking/Booking1"],{"23b7":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{show:!1,show1:!1,show2:!1,params:{year:!0,month:!0,day:!0,hour:!0,minute:!1,second:!1},seat:["A座(靠窗)","B座","C座(靠窗)","D座(靠窗)","E座(靠窗)"],current:0,list:[{name:"空客H135型直升机",price:"￥2916/人"},{name:"空客H135型直升机1",price:"￥2916/人"},{name:"空客H135型直升机2",price:"￥2916/人"},{name:"空客H135型直升机3",price:"￥2916/人"}],current1:0,date:"2023-05-09 09:20",stars:"",ends:""}},onLoad:function(){},onShow:function(){1==n.getStorageSync("infotype")?this.stars=n.getStorageSync("info").name:this.ends=n.getStorageSync("info").name,n.removeStorageSync("infotype"),n.removeStorageSync("info")},methods:{change1:function(n){this.date=n.year+"-"+n.month+"-"+n.day+" "+n.hour,console.log(n.year+"-"+n.month+"-"+n.day+" "+n.hour)},backs:function(){n.navigateBack({delta:1})},link:function(e){n.navigateTo({url:e})},links:function(e){n.switchTab({url:e})}}};e.default=t}).call(this,t("543d")["default"])},"4c84":function(n,e,t){"use strict";var o=t("c947"),a=t.n(o);a.a},"576e":function(n,e,t){"use strict";(function(n,e){var o=t("4ea4");t("1dac");o(t("66fd"));var a=o(t("b352"));n.__webpack_require_UNI_MP_PLUGIN__=t,e(a.default)}).call(this,t("bc2e")["default"],t("543d")["createPage"])},a1df:function(n,e,t){"use strict";t.d(e,"b",(function(){return a})),t.d(e,"c",(function(){return c})),t.d(e,"a",(function(){return o}));var o={uPicker:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-picker/u-picker")]).then(t.bind(null,"e31c"))}},a=function(){var n=this,e=n.$createElement;n._self._c;n._isMounted||(n.e0=function(e){n.show2=!0})},c=[]},a552:function(n,e,t){"use strict";t.r(e);var o=t("23b7"),a=t.n(o);for(var c in o)["default"].indexOf(c)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(c);e["default"]=a.a},b352:function(n,e,t){"use strict";t.r(e);var o=t("a1df"),a=t("a552");for(var c in a)["default"].indexOf(c)<0&&function(n){t.d(e,n,(function(){return a[n]}))}(c);t("4c84");var r=t("f0c5"),i=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);e["default"]=i.exports},c947:function(n,e,t){}},[["576e","common/runtime","common/vendor"]]]);