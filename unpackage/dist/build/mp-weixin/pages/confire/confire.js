(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/confire/confire"],{2155:function(e,t,n){"use strict";n.r(t);var a=n("b0fd"),o=n.n(a);for(var r in a)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=o.a},"2a51":function(e,t,n){"use strict";n.r(t);var a=n("4973"),o=n("2155");for(var r in o)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n("a6cd");var s=n("f0c5"),i=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);t["default"]=i.exports},"451f":function(e,t,n){"use strict";(function(e,t){var a=n("4ea4");n("1dac");a(n("66fd"));var o=a(n("2a51"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(o.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},4973:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){}));var a=function(){var e=this,t=e.$createElement,n=(e._self._c,e.selectIds.length),a=n>0?e.selectIds.length:null,o=e.__map(e.reserve.passenger,(function(t,n){var a=e.__get_orig(t),o=e.selectIds.indexOf(t.id);return{$orig:a,g2:o}}));e.$mp.data=Object.assign({},{$root:{g0:n,g1:a,l0:o}})},o=[]},a6cd:function(e,t,n){"use strict";var a=n("f9ac"),o=n.n(a);o.a},b0fd:function(e,t,n){"use strict";(function(e,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("34d1"),r=n("b6c8"),s={data:function(){return{reserve:{},selectIds:[],totalPrice:0,from:"",id:"",number:0,msg_phone:"",pageParams:{}}},computed:{},onShow:function(){var t=this,n=getCurrentPages(),a=n[n.length-1];1==a.data.isDoRefresh&&(a.data.isDoRefresh=!1,(0,o.MemberTicketReserve)({from:this.pageParams.from,id:this.pageParams.id,number:this.pageParams.number},(function(n){0===n.code?(t.reserve=n.data,"tour"==t.from&&(t.totalPrice=t.number*t.reserve.price),console.log(t.reserve)):e.showModal({title:"错误提示",content:"网络异常，请稍后重试",showCancel:!1})})))},onLoad:function(t){console.log("params.selectDate:"+t.selectDate);var n=this;n.from=t.from,n.id=t.id,n.number=t.number,n.pageParams=t,(0,o.MemberTicketReserve)({from:t.from,id:t.id,number:t.number,select_date:t.selectDate},(function(t){0===t.code?(n.reserve=t.data,"tour"==n.from&&(n.totalPrice=n.number*n.reserve.price),console.log(n.reserve)):e.showModal({title:"错误提示",content:"网络异常，请稍后重试",showCancel:!1})}))},methods:{link:function(t){e.navigateTo({url:t})},addSelect:function(e){var t=this.selectIds.indexOf(e);console.log(t),t<0?this.selectIds.push(e):this.selectIds.splice(t,1),"ferry"==this.from&&(this.totalPrice=this.selectIds.length*this.reserve.price)},edit:function(t){e.navigateTo({url:"/pages/add_people/add_people?id="+t})},PrePay:function(){0!==this.selectIds.length?0!==this.msg_phone.length?(0,r.PrePay)({id:this.id,from:this.from,select_ids:this.selectIds,number:this.number,msg_phone:this.msg_phone},(function(t){0===t.code?a.requestPayment({timeStamp:t.data.timeStamp,nonceStr:t.data.nonceStr,package:t.data.package,signType:t.data.signType,paySign:t.data.paySign,success:function(t){e.navigateTo({url:"/pages/user/user"})},fail:function(t){e.showModal({title:"提示",content:"已取消支付",showCancel:!1})},complete:function(e){console.log("complete:"+t)}}):e.showModal({title:"错误提示",content:"网络异常，请稍后重试",showCancel:!1})})):e.showToast({title:"请填写联系人号码",icon:"none",duration:2e3}):e.showToast({title:"请选择乘机人",icon:"none",duration:2e3})}}};t.default=s}).call(this,n("543d")["default"],n("bc2e")["default"])},f9ac:function(e,t,n){}},[["451f","common/runtime","common/vendor"]]]);