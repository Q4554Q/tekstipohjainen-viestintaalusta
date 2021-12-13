(function(e){function t(t){for(var r,o,i=t[0],c=t[1],d=t[2],u=0,m=[];u<i.length;u++)o=i[u],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&m.push(s[o][0]),s[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);l&&l(t);while(m.length)m.shift()();return n.push.apply(n,d||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],r=!0,i=1;i<a.length;i++){var c=a[i];0!==s[c]&&(r=!1)}r&&(n.splice(t--,1),e=o(o.s=a[0]))}return e}var r={},s={app:0},n=[];function o(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=r,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(a,r,function(t){return e[t]}.bind(null,r));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var d=0;d<i.length;d++)t(i[d]);var l=c;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";a("85ec")},2596:function(e,t,a){},"36fd":function(e,t,a){"use strict";a("8d7d")},"3c0b":function(e,t,a){},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[e.showLogin?a("LoginView",{on:{"login-clicked":e.handleLogin}}):a("MainView",{on:{"logout-clicked":e.handleLogout}})],1)},n=[],o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"mainview"}},[a("TopBar",{staticClass:"fixed-top",on:{"return-clicked":e.openThreadList,"newthread-clicked":e.openNewThread,"profile-clicked":e.openProfile}}),a("div",{staticClass:"container pt-4 mt-5"}),e.mainViewState===e.showThreadList?a("ThreadList",{attrs:{threadData:e.threads},on:{"open-thread":e.openThread}}):e.mainViewState===e.showThread?a("Thread",{attrs:{threadId:e.threadId},on:{"thread-deleted":e.openThreadList}}):e.mainViewState===e.showNewThread?a("NewThread",{on:{"thread-created":e.openThreadList}}):e.mainViewState===e.showProfile?a("Profile",e._g({on:{"open-thread":e.openThread}},e.$listeners)):e._e()],1)},i=[],c=a("1da1"),d=(a("96cf"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"thread"}},[e._l(e.data.messages,(function(t,r){return a("message",e._g({key:t.id,attrs:{writerIdInThread:e.data.yourWriterId,threadId:e.threadId,message_data:t,index:r}},e.$listeners))})),a("NewMessage",{attrs:{threadId:this.threadId},on:{"update-thread":e.updateThread}})],2)}),l=[],u=(a("a9e3"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container my-3 rounded-3",attrs:{id:e.computedId},on:{click:function(t){return e.$emit("message-clicked")}}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-10 px-5 pt-4 text-break"},[a("div",{staticClass:"row"},[a("div",{staticClass:"d-flex align-items-start mb-1"},[a("span",{staticClass:"badge rounded-pill",attrs:{id:"writerid"}},[e._v(e._s(e.computedWriterId))]),a("Clock",{attrs:{id:"clock-icon"}}),a("small",{staticClass:"text-secondary"},[e._v(" "+e._s(e.computedTime))])],1)]),e.message_data.removed?a("div",{staticClass:"row p-3 removed"},[e._v(" "+e._s("This message was deleted")+" ")]):a("div",{staticClass:"row p-3"},[e._v(" "+e._s(e.message_data.content)+" ")]),a("div",{staticClass:"row"},[e.message_data.writerId!==e.writerIdInThread||e.message_data.removed?e._e():a("div",{staticClass:"d-flex align-items-start pt-1"},[e.deleteClicked?e._e():a("Button",{staticClass:"btn",attrs:{type:"button",id:"delete-icon"},on:{click:e.deleteIconClicked}},[a("DeleteIcon",{attrs:{id:"delete-icon"}})],1),e.deleteClicked&&0!==e.index?a("div",{staticClass:"delete-warning"},[e._v(" Do you want to delete this message? "),a("Button",{staticClass:"btn",attrs:{type:"button"},on:{click:e.deleteMessage}},[a("YesIcon",{attrs:{id:"yes-icon"}})],1),a("Button",{staticClass:"btn",attrs:{type:"button"},on:{click:e.cancelDelete}},[a("NoIcon",{attrs:{id:"no-icon"}})],1)],1):e._e(),e.deleteClicked&&0===e.index?a("div",{staticClass:"delete-warning"},[e._v(" Do you want to delete this thread and all the messages in it? "),a("Button",{staticClass:"btn",attrs:{type:"button"},on:{click:e.deleteMessage}},[a("YesIcon",{attrs:{id:"yes-icon"}})],1),a("Button",{staticClass:"btn",attrs:{type:"button"},on:{click:e.cancelDelete}},[a("NoIcon",{attrs:{id:"no-icon"}})],1)],1):e._e()],1)])]),a("div",{staticClass:"col-2 text-center d-flex flex-column m-auto"},[e.message_data.removed?e._e():a("div",{staticClass:"row"},[a("button",{staticClass:"btn",attrs:{type:"button",id:"upvotebutton"},on:{click:e.handleUpvote}},[a("UpvoteIcon",{attrs:{id:e.computedUpVoteIcon}})],1)]),a("div",{staticClass:"row"},[a("span",{staticClass:"fw-bold fs-4",class:{"text-white":!e.message_data.removed,removed:e.message_data.removed},attrs:{id:"score"}},[e._v(e._s(e.message_data.score))])]),e.message_data.removed?e._e():a("div",{staticClass:"row"},[a("button",{staticClass:"btn",attrs:{type:"button",id:"downvotebutton"},on:{click:e.handleDownvote}},[a("DownvoteIcon",{attrs:{id:e.computedDownVoteIcon}})],1)])])])])}),m=[],p=(a("fb6a"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:"16",height:"16"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zm.5 4.75a.75.75 0 00-1.5 0v3.5a.75.75 0 00.471.696l2.5 1a.75.75 0 00.557-1.392L8.5 7.742V4.75z"}})])}),h=[],g={name:"Clock"},f=g,w=a("2877"),v=Object(w["a"])(f,p,h,!1,null,"4831acb1",null),b=v.exports,x=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M18.78 15.28a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 00-1.06 0l-6.25 6.25a.75.75 0 101.06 1.06L12 9.56l5.72 5.72a.75.75 0 001.06 0z"}})])},_=[],k={name:"UpvoteIcon"},C=k,M=Object(w["a"])(C,x,_,!1,null,"a12665c8",null),I=M.exports,y=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M5.22 8.72a.75.75 0 000 1.06l6.25 6.25a.75.75 0 001.06 0l6.25-6.25a.75.75 0 00-1.06-1.06L12 14.44 6.28 8.72a.75.75 0 00-1.06 0z"}})])},T=[],O={name:"DownvoteIcon"},L=O,j=Object(w["a"])(L,y,T,!1,null,"d20a58b8",null),$=j.exports,A=a("bc3a"),z=a.n(A),D=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"}}),a("path",{attrs:{d:"M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"}}),a("path",{attrs:{d:"M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"}})])},P=[],N={name:"DeleteIcon"},V=N,E=Object(w["a"])(V,D,P,!1,null,"ab18f620",null),B=E.exports,S=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm16.28-2.72a.75.75 0 00-1.06-1.06l-5.97 5.97-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6.5-6.5z"}})])},R=[],U={name:"YesIcon"},H=U,F=Object(w["a"])(H,S,R,!1,null,"24234794",null),Z=F.exports,W=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm8.036-4.024a.75.75 0 00-1.06 1.06L10.939 12l-2.963 2.963a.75.75 0 101.06 1.06L12 13.06l2.963 2.964a.75.75 0 001.061-1.06L13.061 12l2.963-2.964a.75.75 0 10-1.06-1.06L12 10.939 9.036 7.976z"}})])},Y=[],J={name:"NoIcon"},K=J,q=Object(w["a"])(K,W,Y,!1,null,"e4e689aa",null),G=q.exports,Q={name:"Message",components:{Clock:b,UpvoteIcon:I,DownvoteIcon:$,DeleteIcon:B,YesIcon:Z,NoIcon:G},props:{message_data:Object,writerIdInThread:Number,threadId:Number,index:Number},data:function(){return{deleteClicked:!1,pending:!1,errorMessage:"",error:0}},methods:{handleUpvote:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.pending=!0,e.error=0,a=1,1===e.message_data.vote&&(a=0),t.prev=4,t.next=7,z.a.post("/api/messages/"+e.message_data.id,{amount:a},{headers:{Authorization:"bearer ".concat(window.accessToken)}}).then((function(t){e.message_data.score=t.data.score,e.message_data.vote=t.data.vote}));case 7:e.error=0,t.next=14;break;case 10:t.prev=10,t.t0=t["catch"](4),e.error=5,t.t0.response?e.errorMessage=t.t0.response.data.error:e.errorMessage=t.t0.message;case 14:e.pending=!1;case 15:case"end":return t.stop()}}),t,null,[[4,10]])})))()},handleDownvote:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.pending=!0,e.error=0,a=-1,-1===e.message_data.vote&&(a=0),t.prev=4,t.next=7,z.a.post("/api/messages/"+e.message_data.id,{amount:a},{headers:{Authorization:"bearer ".concat(window.accessToken)}}).then((function(t){e.message_data.score=t.data.score,e.message_data.vote=t.data.vote}));case 7:e.error=0,t.next=14;break;case 10:t.prev=10,t.t0=t["catch"](4),e.error=5,t.t0.response?e.errorMessage=t.t0.response.data.error:e.errorMessage=t.t0.message;case 14:e.pending=!1;case 15:case"end":return t.stop()}}),t,null,[[4,10]])})))()},deleteMessage:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.pending=!0,e.error=0,t.prev=2,0!==e.index){t.next=10;break}return t.next=6,z.a.delete("/api/threads/"+e.threadId,{headers:{Authorization:"bearer ".concat(window.accessToken)}});case 6:e.$emit("thread-deleted"),e.error=0,t.next=17;break;case 10:return t.next=12,z.a.delete("/api/messages/"+e.message_data.id,{headers:{Authorization:"bearer ".concat(window.accessToken)}}).then((function(t){e.message_data.removed=t.data.removed}));case 12:a=t.sent,r=a.data,e.data=r,console.log(e.data),e.error=0;case 17:t.next=23;break;case 19:t.prev=19,t.t0=t["catch"](2),e.error=5,t.t0.response?e.errorMessage=t.t0.response.data.error:e.errorMessage=t.t0.message;case 23:e.deleteClicked=!1,e.pending=!1;case 25:case"end":return t.stop()}}),t,null,[[2,19]])})))()},getTimeDiff:function(e){var t=[];t.push(e.slice(0,4)),t.push(e.slice(5,7)),t.push(e.slice(8,10)),t.push(e.slice(11,13)),t.push(e.slice(14,16)),t.push(e.slice(17,19));var a=new Date,r=new Date(t[0]+"-"+t[1]+"-"+t[2]+"T"+t[3]+":"+t[4]+":"+t[5]+".000+00:00"),s=a-r,n=s/1e3,o=n/60,i=o/60,c=i/24;return c>365?1===Math.floor(c/365)?"A year ago":Math.floor(c/365)+" years ago":c>30?1===Math.floor(c/30)?"A month ago":Math.floor(c/30)+" months ago":c>=1?1===Math.floor(c)?"A day ago":Math.floor(c)+" days ago":i>=1?1===Math.floor(i)?"An hour ago":Math.floor(i)+" hours ago":o>=1?1===Math.floor(o)?"A minute ago":Math.floor(o)+" minutes ago":n>=5?Math.floor(n)+" seconds ago":"Just now"},deleteIconClicked:function(){this.deleteClicked=!0},cancelDelete:function(){this.deleteClicked=!1}},computed:{computedId:function(){return this.writerIdInThread===this.message_data.writerId?"border":"message"},computedWriterId:function(){return 1===this.message_data.writerId?"AP":this.message_data.writerId-1},computedTime:function(){return this.getTimeDiff(this.message_data.postedTime)},computedUpVoteIcon:function(){return 1===this.message_data.vote?"upvoted":"notupvoted"},computedDownVoteIcon:function(){return-1===this.message_data.vote?"downvoted":"notdownvoted"}}},X=Q,ee=(a("673e"),Object(w["a"])(X,u,m,!1,null,"02c4cb8e",null)),te=ee.exports,ae=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container p-3 my-3 rounded-3",attrs:{id:"newmessage"}},[a("div",{staticClass:"text-center",attrs:{id:"newMessageArea"}},[a("b-form-textarea",{attrs:{size:"lg",placeholder:"Write a message",rows:"5","no-resize":"",maxlength:"350"},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}}),a("div",{staticClass:"text-end"},[a("small",{staticClass:"text-secondary"},[e._v(e._s(e.message.length)+"/350")])]),a("button",{staticClass:"btn fw-bold",on:{click:e.handleNewMessage}},[e._v("Send message "),a("SendmessageIcon",{attrs:{id:"send-message-icon"}})],1)],1),e.pending?a("div",{staticClass:"row justify-content-center"},[a("b-spinner",{staticClass:"mt-3",attrs:{variant:"secondary"}})],1):e._e(),a("b-alert",{staticClass:"mt-3",attrs:{variant:"danger"},model:{value:e.error,callback:function(t){e.error=t},expression:"error"}},[e._v(" "+e._s(e.errorMessage)+" ")])],1)},re=[],se=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M1.513 1.96a1.374 1.374 0 011.499-.21l19.335 9.215a1.146 1.146 0 010 2.07L3.012 22.25a1.374 1.374 0 01-1.947-1.46L2.49 12 1.065 3.21a1.374 1.374 0 01.448-1.25zm2.375 10.79l-1.304 8.042L21.031 12 2.584 3.208l1.304 8.042h7.362a.75.75 0 010 1.5H3.888z"}})])},ne=[],oe={name:"SendmessageIcon"},ie=oe,ce=Object(w["a"])(ie,se,ne,!1,null,"663b53e2",null),de=ce.exports,le={name:"NewMessage.vue",components:{SendmessageIcon:de},data:function(){return{message:"",pending:!1,error:0,errorMessage:""}},props:{threadId:Number},methods:{handleNewMessage:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.error=0,0!==e.message.length){t.next=6;break}e.error=5,e.errorMessage="Please add some content in your message",t.next=19;break;case 6:return e.pending=!0,t.prev=7,t.next=10,z.a.post("/api/threads/"+e.threadId,{message:e.message},{headers:{Authorization:"bearer ".concat(window.accessToken)}}).then((function(t){e.$emit("update-thread",t.data)}));case 10:e.error=0,t.next=17;break;case 13:t.prev=13,t.t0=t["catch"](7),e.error=5,t.t0.response?e.errorMessage=t.t0.response.data.error:e.errorMessage=t.t0.message;case 17:e.pending=!1,e.message="";case 19:case"end":return t.stop()}}),t,null,[[7,13]])})))()}}},ue=le,me=(a("6592"),Object(w["a"])(ue,ae,re,!1,null,"0b30898b",null)),pe=me.exports,he={name:"Thread",components:{Message:te,NewMessage:pe},data:function(){return{data:{}}},props:{threadId:Number},methods:{getThreadDataById:function(e){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function a(){var r,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.pending=!0,t.error=0,a.prev=2,a.next=5,z.a.get("/api/threads/"+e,{headers:{Authorization:"bearer ".concat(window.accessToken)}});case 5:r=a.sent,s=r.data,t.data=s,console.log(t.data),t.error=0,a.next=16;break;case 12:a.prev=12,a.t0=a["catch"](2),t.error=5,a.t0.response?t.errorMessage=a.t0.response.data.error:t.errorMessage=a.t0.message;case 16:t.pending=!1;case 17:case"end":return a.stop()}}),a,null,[[2,12]])})))()},updateThread:function(e){this.data=e}},created:function(){this.getThreadDataById(this.threadId)}},ge=he,fe=Object(w["a"])(ge,d,l,!1,null,"105fb6a3",null),we=fe.exports,ve=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"thread-list"}},e._l(e.threadData,(function(t){return a("OpeningMessage",{key:t.id,attrs:{messageData:t.messages[0],numMessages:t.numMessages,writerIdInThread:t.yourWriterId,threadId:t.id,latestPost:t.latestPostedTime},on:{"message-clicked":function(a){return e.$emit("open-thread",t.id)}}})})),1)},be=[],xe=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container p-3 my-3 rounded-3",attrs:{id:e.computedId},on:{click:function(t){return e.$emit("message-clicked")}}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-10 px-3 text-break"},[a("div",{staticClass:"row"},[a("div",{staticClass:"d-flex align-items-start my-1"},[a("Clock",{attrs:{id:"clock-icon"}}),a("small",{staticClass:"text-secondary"},[e._v(" "+e._s(e.computedTime))])],1)]),a("div",{staticClass:"row p-3"},[e._v(" "+e._s(e.messageData.content)+" ")]),a("div",{staticClass:"row pt-3"},[a("div",{staticClass:"d-flex align-items-start mt-1"},[a("MessageIcon",{attrs:{id:"message-icon"}}),a("span",{staticClass:"fw-bold text-white"},[e._v(" "+e._s(e.numMessages))]),a("small",{staticClass:"text-secondary mx-4"},[e._v("Last post "+e._s(e.computedLatestMsgTime))])],1)])]),a("div",{staticClass:"col-1 m-auto fw-bold fs-3 text-right text-white",attrs:{id:"score"}},[e._v(" "+e._s(e.messageData.score)+" ")])])])},_e=[],ke=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M3.25 4a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h2.5a.75.75 0 01.75.75v3.19l3.72-3.72a.75.75 0 01.53-.22h10a.25.25 0 00.25-.25V4.25a.25.25 0 00-.25-.25H3.25zm-1.75.25c0-.966.784-1.75 1.75-1.75h17.5c.966 0 1.75.784 1.75 1.75v12.5a1.75 1.75 0 01-1.75 1.75h-9.69l-3.573 3.573A1.457 1.457 0 015 21.043V18.5H3.25a1.75 1.75 0 01-1.75-1.75V4.25z"}})])},Ce=[],Me={name:"MessageIcon"},Ie=Me,ye=Object(w["a"])(Ie,ke,Ce,!1,null,"8e8f25c0",null),Te=ye.exports,Oe={name:"OpeningMessage",components:{Clock:b,MessageIcon:Te},props:{messageData:Object,numMessages:Number,writerIdInThread:Number,threadId:Number,lastMessage:Object,latestPost:String},methods:{getTimeDiff:function(e){var t=[];t.push(e.slice(0,4)),t.push(e.slice(5,7)),t.push(e.slice(8,10)),t.push(e.slice(11,13)),t.push(e.slice(14,16)),t.push(e.slice(17,19));var a=new Date,r=new Date(t[0]+"-"+t[1]+"-"+t[2]+"T"+t[3]+":"+t[4]+":"+t[5]+".000+00:00"),s=a-r,n=s/1e3,o=n/60,i=o/60,c=i/24;return c>365?1===Math.floor(c/365)?"A year ago":Math.floor(c/365)+" years ago":c>30?1===Math.floor(c/30)?"A month ago":Math.floor(c/30)+" months ago":c>=1?1===Math.floor(c)?"A day ago":Math.floor(c)+" days ago":i>=1?1===Math.floor(i)?"An hour ago":Math.floor(i)+" hours ago":o>=1?1===Math.floor(o)?"A minute ago":Math.floor(o)+" minutes ago":n>=5?Math.floor(n)+" seconds ago":"Just now"}},computed:{computedTime:function(){return void 0!==this.messageData?this.getTimeDiff(this.messageData.postedTime):""},computedLatestMsgTime:function(){return void 0!==this.messageData?this.getTimeDiff(this.latestPost).toLowerCase():""},computedId:function(){return this.writerIdInThread===this.messageData.writerId?"border":"message"}}},Le=Oe,je=(a("e6bd"),Object(w["a"])(Le,xe,_e,!1,null,"68c07cde",null)),$e=je.exports,Ae={name:"ThreadList",components:{OpeningMessage:$e},props:{threadData:[]}},ze=Ae,De=Object(w["a"])(ze,ve,be,!1,null,"ab5f5bf8",null),Pe=De.exports,Ne=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container p-3 rounded-bottom",attrs:{id:"top-bar"}},[a("div",{staticClass:"d-flex justify-content-between"},[a("button",{staticClass:"btn btn-lg",attrs:{type:"button"},on:{click:function(t){return e.$emit("return-clicked")}}},[a("HomeIcon",{attrs:{id:"home-icon"}})],1),a("button",{staticClass:"btn btn-lg fw-bold",attrs:{type:"button",id:"newthreadbutton"},on:{click:function(t){return e.$emit("newthread-clicked")}}},[e._v("New thread "),a("PenIcon",{attrs:{id:"pen-icon"}})],1),a("button",{staticClass:"btn btn-lg",attrs:{type:"button"},on:{click:function(t){return e.$emit("profile-clicked")}}},[a("ProfileIcon",{attrs:{id:"profile-icon"}})],1)])])},Ve=[],Ee=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:"16",height:"16"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"}})])},Be=[],Se={name:"PenIcon"},Re=Se,Ue=Object(w["a"])(Re,Ee,Be,!1,null,"1aca42e2",null),He=Ue.exports,Fe=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M11.03 2.59a1.5 1.5 0 011.94 0l7.5 6.363a1.5 1.5 0 01.53 1.144V19.5a1.5 1.5 0 01-1.5 1.5h-5.75a.75.75 0 01-.75-.75V14h-2v6.25a.75.75 0 01-.75.75H4.5A1.5 1.5 0 013 19.5v-9.403c0-.44.194-.859.53-1.144l7.5-6.363zM12 3.734l-7.5 6.363V19.5h5v-6.25a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v6.25h5v-9.403L12 3.734z"}})])},Ze=[],We={name:"HomeIcon"},Ye=We,Je=Object(w["a"])(Ye,Fe,Ze,!1,null,"b67090a8",null),Ke=Je.exports,qe=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M12 2.5a5.5 5.5 0 00-3.096 10.047 9.005 9.005 0 00-5.9 8.18.75.75 0 001.5.045 7.5 7.5 0 0114.993 0 .75.75 0 101.499-.044 9.005 9.005 0 00-5.9-8.181A5.5 5.5 0 0012 2.5zM8 8a4 4 0 118 0 4 4 0 01-8 0z"}})])},Ge=[],Qe={name:"ProfileIcon"},Xe=Qe,et=Object(w["a"])(Xe,qe,Ge,!1,null,"32d5013e",null),tt=et.exports,at={name:"TopBar",components:{ProfileIcon:tt,HomeIcon:Ke,PenIcon:He}},rt=at,st=(a("ac23"),Object(w["a"])(rt,Ne,Ve,!1,null,"3ac7dae6",null)),nt=st.exports,ot=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container p-3 my-3 rounded-3",attrs:{id:"new-thread"}},[a("div",{staticClass:"text-center",attrs:{id:"newthreadfield"}},[a("b-form-textarea",{attrs:{size:"lg",placeholder:"Begin a new thread with a message",rows:"5","no-resize":"",maxlength:"350"},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}}),a("div",{staticClass:"text-end"},[a("small",{staticClass:"text-secondary"},[e._v(e._s(e.message.length)+"/350")])]),a("button",{staticClass:"btn fw-bold",on:{click:e.createNewThread}},[e._v("Create thread "),a("SendmessageIcon",{attrs:{id:"send-message-icon"}})],1)],1),e.pending?a("div",{staticClass:"row justify-content-center"},[a("b-spinner",{staticClass:"mt-3",attrs:{variant:"secondary"}})],1):e._e(),a("b-alert",{staticClass:"mt-3",attrs:{variant:"danger"},model:{value:e.error,callback:function(t){e.error=t},expression:"error"}},[e._v(" "+e._s(e.errorMessage)+" ")])],1)},it=[],ct={name:"NewThread.vue",components:{SendmessageIcon:de},props:{token:String},data:function(){return{message:"",pending:!1,error:0,errorMessage:""}},methods:{createNewThread:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.pending=!0,e.error=0,0!==e.message.length){t.next=7;break}e.error=5,e.errorMessage="A message is required in order to create a new thread.",t.next=18;break;case 7:return t.prev=7,t.next=10,z.a.post("/api/threads",{message:e.message},{headers:{Authorization:"bearer ".concat(window.accessToken)}});case 10:e.$emit("thread-created"),e.error=0,t.next=18;break;case 14:t.prev=14,t.t0=t["catch"](7),e.error=5,t.t0.response?e.errorMessage=t.t0.response.data.error:e.errorMessage=t.t0.message;case 18:e.pending=!1;case 19:case"end":return t.stop()}}),t,null,[[7,14]])})))()}}},dt=ct,lt=(a("eeeb"),Object(w["a"])(dt,ot,it,!1,null,"07cf4bf6",null)),ut=lt.exports,mt=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"profile"}},[a("div",{staticClass:"container p-3 my-3 fs-5 text-left rounded-3",attrs:{id:"profile-info"}},[a("div",{staticClass:"row row py-2 px-4"},[e._v(" User name: "+e._s(e.data.username)+" ")]),a("div",{staticClass:"row py-2 px-4 d-inline-block"},[e._v(" Your score: "),a("b",[e._v(e._s(e.data.score))])]),a("div",{staticClass:"row py-2 px-4"},[a("button",{staticClass:"btn fw-bold w-10 my-3",attrs:{type:"button"},on:{click:function(t){return e.$emit("logout-clicked")}}},[e._v("Log out")])]),a("div",{staticClass:"row py-2 px-4"},[e._v(" Threads you have posted on: ")])]),a("ThreadList",e._g({attrs:{threadData:e.data.threads}},e.$listeners))],1)},pt=[],ht={name:"Profile",components:{ThreadList:Pe},data:function(){return{pending:!1,error:0,errorMessage:"",data:{}}},methods:{getUserData:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.pending=!0,e.error=0,t.prev=2,t.next=5,z.a.get("/api/users/me",{headers:{Authorization:"bearer ".concat(window.accessToken)}});case 5:a=t.sent,r=a.data,e.data=r,console.log(e.data),e.error=0,t.next=16;break;case 12:t.prev=12,t.t0=t["catch"](2),e.error=5,t.t0.response?e.errorMessage=t.t0.response.data.error:e.errorMessage=t.t0.message;case 16:e.pending=!1;case 17:case"end":return t.stop()}}),t,null,[[2,12]])})))()}},created:function(){this.getUserData()}},gt=ht,ft=(a("8fa9"),Object(w["a"])(gt,mt,pt,!1,null,"55bd52b1",null)),wt=ft.exports,vt={name:"MainView",components:{NewThread:ut,TopBar:nt,Thread:we,ThreadList:Pe,Profile:wt},data:function(){return{showThreadList:0,showNewThread:1,showThread:2,showProfile:3,mainViewState:0,pending:!1,error:0,errorMessage:"",threadId:null,threads:[]}},methods:{openThreadList:function(){this.getThreads(),this.mainViewState=this.showThreadList},openThread:function(e){this.threadId=e,this.mainViewState=this.showThread},openNewThread:function(){this.mainViewState=this.showNewThread},openProfile:function(){this.mainViewState=this.showProfile},getThreads:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.pending=!0,e.error=0,t.prev=2,t.next=5,z.a.get("/api/threads",{headers:{Authorization:"bearer ".concat(window.accessToken)}});case 5:a=t.sent,r=a.data,e.threads=r,console.log(e.threads),e.error=0,t.next=17;break;case 12:t.prev=12,t.t0=t["catch"](2),e.error=5,401===t.t0.response.status&&e.$emit("logout-clicked"),t.t0.response?e.errorMessage=t.t0.response.data.error:e.errorMessage=t.t0.message;case 17:e.pending=!1;case 18:case"end":return t.stop()}}),t,null,[[2,12]])})))()}},created:function(){this.getThreads()}},bt=vt,xt=Object(w["a"])(bt,o,i,!1,null,"4655bad0",null),_t=xt.exports,kt=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"loginview"}},[e.showLogin?a("Login",e._g({on:{"create-account-clicked":function(t){return e.handleCreateAccount()}}},e.$listeners)):a("CreateAccount",{on:{"return-clicked":function(t){return e.handleCloseCreateAccount()}}})],1)},Ct=[],Mt=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container p-5 my-3 rounded-3 align-items-center",attrs:{id:"login"}},[a("h1",{staticClass:"fs-2"},[e._v("Account login")]),a("form",{staticClass:"align-items-center",on:{submit:function(e){e.preventDefault()}}},[a("div",{staticClass:"row pb-1 mt-4 fw-bold",attrs:{id:"username"}},[e._v("Username:")]),a("div",{staticClass:"row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{placeholder:"Username"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}})]),a("div",{staticClass:"row mt-4 pb-1 fw-bold",attrs:{id:"password"}},[e._v("Password:")]),a("div",{staticClass:"row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),a("div",{staticClass:"row mt-4"},[a("input",{staticClass:"btn btn-primary btn-sm mt-3",attrs:{type:"submit",value:"Log in",id:"loginbutton"},on:{click:e.login}})])]),a("div",{staticClass:"row mt-4"},[a("button",{staticClass:"btn btn-sm my-2",on:{click:function(t){return e.$emit("create-account-clicked")}}},[e._v(" Create new account ")])]),e.pending?a("div",{staticClass:"row justify-content-center"},[a("b-spinner",{staticClass:"mt-3",attrs:{variant:"primary"}})],1):e._e(),a("b-alert",{staticClass:"mt-3",attrs:{variant:"danger"},model:{value:e.error,callback:function(t){e.error=t},expression:"error"}},[e._v(" "+e._s(e.errorMessage)+" ")])],1)},It=[],yt={name:"Login",data:function(){return{username:"",password:"",token:null,pending:!1,error:0,errorMessage:""}},methods:{login:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.pending=!0,e.error=0,t.prev=2,t.next=5,z.a.post("/api/login",{username:e.username,password:e.password});case 5:a=t.sent,r=a.data,e.token=r.token,e.error=0,e.$emit("login-clicked",e.token),t.next=17;break;case 12:t.prev=12,t.t0=t["catch"](2),e.token=null,e.error=5,t.t0.response?e.errorMessage=t.t0.response.data.error:e.errorMessage=t.t0.message;case 17:e.pending=!1;case 18:case"end":return t.stop()}}),t,null,[[2,12]])})))()}}},Tt=yt,Ot=(a("36fd"),Object(w["a"])(Tt,Mt,It,!1,null,"3aacecb9",null)),Lt=Ot.exports,jt=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container p-5 my-3 rounded-3",attrs:{id:"create-account"}},[a("h1",{staticClass:"fs-4"},[e._v("Create a new account")]),a("form",{staticClass:"align-items-center",on:{submit:function(e){e.preventDefault()}}},[a("div",{staticClass:"row pb-1 mt-5 fw-bold",attrs:{id:"username"}},[e._v(" Username: ")]),a("div",{staticClass:"row",attrs:{id:"usernamecontainer"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{placeholder:"Username",pattern:"^[A-Za-z0-9\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u00FF]{3,}$"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}}),a("span",{staticClass:"usernametooltip"},[e._v("Username must contain at least 3 characters, and only letters or numbers")])]),a("div",{staticClass:"row mt-4 pb-1 fw-bold",attrs:{id:"password"}},[e._v(" Password: ")]),a("div",{staticClass:"row",attrs:{id:"passwordcontainer"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password",pattern:"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),a("span",{staticClass:"passwordtooltip"},[e._v("Password must contain at least 6 characters, at least 1 number and at least 1 uppercase character")])]),a("div",{staticClass:"row mt-4 pb-1 fw-bold",attrs:{id:"password2"}},[e._v(" Re-enter your Password: ")]),a("div",{staticClass:"row",attrs:{id:"passwordcontainer2"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.password2,expression:"password2"}],attrs:{type:"password",pattern:"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$"},domProps:{value:e.password2},on:{input:function(t){t.target.composing||(e.password2=t.target.value)}}})]),a("div",{staticClass:"row mt-4"},[a("input",{staticClass:"btn btn-primary btn-sm mt-3",attrs:{type:"submit",value:"Create Account",id:"createaccountbutton"},on:{click:e.createAccount}})])]),a("div",{staticClass:"row mt-4"},[a("button",{staticClass:"btn btn-sm mt-3",on:{click:function(t){return e.$emit("return-clicked")}}},[a("BackIcon",{attrs:{id:"back-icon"}}),e._v(" Return ")],1)]),e.pending?a("div",{staticClass:"row justify-content-center"},[a("b-spinner",{staticClass:"mt-3",attrs:{variant:"primary"}})],1):e._e(),a("b-alert",{staticClass:"mt-3",attrs:{variant:"danger"},model:{value:e.error,callback:function(t){e.error=t},expression:"error"}},[e._v(" "+e._s(e.errorMessage)+" ")])],1)},$t=[],At=(a("ac1f"),a("00b4"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M10.78 19.03a.75.75 0 01-1.06 0l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.75.75 0 111.06 1.06L5.81 11.5h14.44a.75.75 0 010 1.5H5.81l4.97 4.97a.75.75 0 010 1.06z"}})])}),zt=[],Dt={name:"BackIcon"},Pt=Dt,Nt=Object(w["a"])(Pt,At,zt,!1,null,"24937670",null),Vt=Nt.exports,Et={name:"CreateAccount",components:{BackIcon:Vt},data:function(){return{username:"",password:"",password2:"",pending:!1,error:0,errorMessage:""}},methods:{createAccount:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(e.username.length<3)){t.next=5;break}e.error=5,e.errorMessage="Username must be longer than 3 characters.",t.next=56;break;case 5:if(/^[A-Za-z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]*$/.test(e.username)){t.next=10;break}e.error=5,e.errorMessage="Username must only contain letters or numbers.",t.next=56;break;case 10:if(!(e.password.length<6)){t.next=15;break}e.error=5,e.errorMessage="Password must be at least 6 characters long.",t.next=56;break;case 15:if(/[a-z]+/.test(e.password)){t.next=20;break}e.error=5,e.errorMessage="Password must contain a lowercase letter.",t.next=56;break;case 20:if(/[0-9]/.test(e.password)){t.next=25;break}e.error=5,e.errorMessage="Password must contain a number.",t.next=56;break;case 25:if(""!==e.password&&""!==e.password2){t.next=30;break}e.error=5,e.errorMessage="Please fill both password fields.",t.next=56;break;case 30:if(e.password===e.password2){t.next=35;break}e.error=5,e.errorMessage="Passwords don't match!",t.next=56;break;case 35:if(/[A-Z]+/.test(e.password)){t.next=40;break}e.error=5,e.errorMessage="Password must contain an uppercase letter.",t.next=56;break;case 40:return e.pending=!0,e.error=0,t.prev=42,t.next=45,z.a.post("/api/users",{username:e.username,password:e.password});case 45:a=t.sent,a.data,e.error=0,e.$emit("return-clicked"),t.next=55;break;case 51:t.prev=51,t.t0=t["catch"](42),e.error=5,t.t0.response?e.errorMessage=t.t0.response.data.error:e.errorMessage=t.t0.message;case 55:e.pending=!1;case 56:case"end":return t.stop()}}),t,null,[[42,51]])})))()}}},Bt=Et,St=(a("cc79"),Object(w["a"])(Bt,jt,$t,!1,null,"19a39c00",null)),Rt=St.exports,Ut={name:"LoginView",components:{CreateAccount:Rt,Login:Lt},data:function(){return{showLogin:!0}},methods:{handleLogin:function(){this.showLogin=!1},handleCreateAccount:function(){this.showLogin=!1},handleCloseCreateAccount:function(){this.showLogin=!0}}},Ht=Ut,Ft=Object(w["a"])(Ht,kt,Ct,!1,null,"6ca0fde9",null),Zt=Ft.exports,Wt={name:"App",head:{meta:[{charset:"utf-8"},{name:"viewport",content:"width=800"}]},components:{LoginView:Zt,MainView:_t},data:function(){return{showLogin:!0,token:""}},created:function(){var e=localStorage.getItem("TOKEN");e&&this.setToken(e)},methods:{handleLogin:function(e){this.setToken(e)},handleLogout:function(){this.setToken("")},setToken:function(e){this.token=e,window.accessToken=e,localStorage.setItem("TOKEN",e),this.showLogin=""===e}}},Yt=Wt,Jt=(a("034f"),Object(w["a"])(Yt,s,n,!1,null,null,null)),Kt=Jt.exports,qt=a("1e18");a("2dd8"),a("f9e3");r["default"].use(qt["a"]),r["default"].config.productionTip=!1,new r["default"]({render:function(e){return e(Kt)}}).$mount("#app")},"641d":function(e,t,a){},6592:function(e,t,a){"use strict";a("af61")},"673e":function(e,t,a){"use strict";a("efc3")},"85ec":function(e,t,a){},"8d7d":function(e,t,a){},"8fa9":function(e,t,a){"use strict";a("3c0b")},"92b4":function(e,t,a){},ac23:function(e,t,a){"use strict";a("92b4")},af61:function(e,t,a){},cc79:function(e,t,a){"use strict";a("2596")},d9ac:function(e,t,a){},e6bd:function(e,t,a){"use strict";a("641d")},eeeb:function(e,t,a){"use strict";a("d9ac")},efc3:function(e,t,a){}});
//# sourceMappingURL=app.82e3ad47.js.map