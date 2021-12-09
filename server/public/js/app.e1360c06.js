(function(e){function t(t){for(var r,o,i=t[0],c=t[1],d=t[2],u=0,p=[];u<i.length;u++)o=i[u],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&p.push(s[o][0]),s[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);l&&l(t);while(p.length)p.shift()();return n.push.apply(n,d||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],r=!0,i=1;i<a.length;i++){var c=a[i];0!==s[c]&&(r=!1)}r&&(n.splice(t--,1),e=o(o.s=a[0]))}return e}var r={},s={app:0},n=[];function o(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=r,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(a,r,function(t){return e[t]}.bind(null,r));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var d=0;d<i.length;d++)t(i[d]);var l=c;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";a("85ec")},"09c8":function(e,t,a){},"2dba":function(e,t,a){},"34e0":function(e,t,a){},4365:function(e,t,a){},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[e.showLogin?a("LoginView",{on:{"login-clicked":e.handleLogin}}):a("MainView",{attrs:{token:e.token},on:{"logout-clicked":e.handleLogout}})],1)},n=[],o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"mainview"}},[a("TopBar",{staticClass:"fixed-top",on:{"return-clicked":e.openThreadList,"newthread-clicked":e.openNewThread,"profile-clicked":e.openProfile}}),a("div",{staticClass:"container pt-4 mt-5"}),e.mainViewState===e.showThreadList?a("ThreadList",{attrs:{threadData:e.threads},on:{"open-thread":e.openThread}}):e.mainViewState===e.showThread?a("Thread",{attrs:{threadId:e.threadId}}):e.mainViewState===e.showNewThread?a("NewThread",{on:{"thread-created":e.openThreadList}}):e.mainViewState===e.showProfile?a("Profile",e._g({on:{"open-thread":e.openThread}},e.$listeners)):e._e()],1)},i=[],c=a("1da1"),d=(a("96cf"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"thread"}},[e._l(e.data.messages,(function(t){return a("message",{key:t.id,attrs:{writerIdInThread:e.data.yourWriterId,message_data:t}})})),a("NewMessage",{attrs:{threadId:this.threadId,token:e.token},on:{"update-thread":e.updateThread}})],2)}),l=[],u=(a("a9e3"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container my-3 rounded-3",attrs:{id:e.computedId},on:{click:function(t){return e.$emit("message-clicked")}}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-10 px-5 pt-4 text-break"},[a("div",{staticClass:"row"},[a("div",{staticClass:"d-flex align-items-start mb-1"},[a("span",{staticClass:"badge rounded-pill",attrs:{id:"writerid"}},[e._v(e._s(e.computedWriterId))]),a("Clock",{attrs:{id:"clock-icon"}}),a("small",{staticClass:"text-secondary"},[e._v(" "+e._s(e.computedTime))])],1)]),a("div",{staticClass:"row p-3"},[e._v(" "+e._s(e.message_data.content)+" ")])]),a("div",{staticClass:"col-sm-2 text-center d-flex flex-column m-auto"},[a("div",{staticClass:"row"},[a("button",{staticClass:"btn btn-xs",attrs:{type:"button"},on:{click:e.handleUpvote}},[a("UpvoteIcon",{attrs:{id:"upvote"}})],1)]),a("div",{staticClass:"row"},[a("span",{staticClass:"fw-bold fs-4 text-white",attrs:{id:"score"}},[e._v(e._s(e.message_data.score))])]),a("div",{staticClass:"row"},[a("button",{staticClass:"btn btn-xs",attrs:{type:"button"},on:{click:e.handleDownvote}},[a("DownvoteIcon",{attrs:{id:"downvote"}})],1)])])])])}),p=[],m=(a("fb6a"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:"16",height:"16"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zm.5 4.75a.75.75 0 00-1.5 0v3.5a.75.75 0 00.471.696l2.5 1a.75.75 0 00.557-1.392L8.5 7.742V4.75z"}})])}),h=[],g={name:"Clock"},f=g,w=a("2877"),v=Object(w["a"])(f,m,h,!1,null,"4831acb1",null),b=v.exports,x=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M18.78 15.28a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 00-1.06 0l-6.25 6.25a.75.75 0 101.06 1.06L12 9.56l5.72 5.72a.75.75 0 001.06 0z"}})])},_=[],k={name:"UpvoteIcon"},C=k,M=Object(w["a"])(C,x,_,!1,null,"a12665c8",null),T=M.exports,y=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M5.22 8.72a.75.75 0 000 1.06l6.25 6.25a.75.75 0 001.06 0l6.25-6.25a.75.75 0 00-1.06-1.06L12 14.44 6.28 8.72a.75.75 0 00-1.06 0z"}})])},I=[],O={name:"DownvoteIcon"},j=O,L=Object(w["a"])(j,y,I,!1,null,"d20a58b8",null),A=L.exports,$=a("bc3a"),P=a.n($),z={name:"Message",components:{Clock:b,UpvoteIcon:T,DownvoteIcon:A},props:{message_data:Object,writerIdInThread:Number},data:function(){return{pending:!1,errorMessage:"",error:0}},methods:{handleUpvote:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.pending=!0,e.error=0,t.prev=2,t.next=5,P.a.post("/api/messages/"+e.message_data.id,{amount:1},{headers:{Authorization:"bearer ".concat(window.accessToken)}}).then((function(t){e.message_data.score=t.data.score}));case 5:e.error=0,t.next=12;break;case 8:t.prev=8,t.t0=t["catch"](2),e.error=5,t.t0.response?e.errorMessage=t.t0.response.data.error:e.errorMessage=t.t0.message;case 12:e.pending=!1;case 13:case"end":return t.stop()}}),t,null,[[2,8]])})))()},handleDownvote:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.pending=!0,e.error=0,t.prev=2,t.next=5,P.a.post("/api/messages/"+e.message_data.id,{amount:-1},{headers:{Authorization:"bearer ".concat(window.accessToken)}}).then((function(t){e.message_data.score=t.data.score}));case 5:e.error=0,t.next=12;break;case 8:t.prev=8,t.t0=t["catch"](2),e.error=5,t.t0.response?e.errorMessage=t.t0.response.data.error:e.errorMessage=t.t0.message;case 12:e.pending=!1;case 13:case"end":return t.stop()}}),t,null,[[2,8]])})))()},getTimeDiff:function(e){var t=[];t.push(e.slice(0,4)),t.push(e.slice(5,7)),t.push(e.slice(8,10)),t.push(e.slice(11,13)),t.push(e.slice(14,16)),t.push(e.slice(17,19));var a=new Date,r=new Date(t[0]+"-"+t[1]+"-"+t[2]+"T"+t[3]+":"+t[4]+":"+t[5]+".000+00:00"),s=a-r,n=s/1e3,o=n/60,i=o/60,c=i/24;return c>365?1===Math.floor(c/365)?"A year ago":Math.floor(c/365)+" years ago":c>30?1===Math.floor(c/30)?"A month ago":Math.floor(c/30)+" months ago":c>=1?1===Math.floor(c)?"A day ago":Math.floor(c)+" days ago":i>=1?1===Math.floor(i)?"An hour ago":Math.floor(i)+" hours ago":o>=1?1===Math.floor(o)?"A minute ago":Math.floor(o)+" minutes ago":n>=5?Math.floor(n)+" seconds ago":"Just now"}},computed:{computedId:function(){return this.writerIdInThread===this.message_data.writerId?"border":"message"},computedWriterId:function(){return 1===this.message_data.writerId?"AP":this.message_data.writerId-1},computedTime:function(){return this.getTimeDiff(this.message_data.postedTime)}}},D=z,N=(a("5820"),Object(w["a"])(D,u,p,!1,null,"1b20d8f8",null)),E=N.exports,S=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container p-3 my-3 rounded-3",attrs:{id:"newmessage"}},[a("div",{staticClass:"text-center",attrs:{id:"newMessageArea"}},[a("b-form-textarea",{attrs:{size:"lg",placeholder:"Write a message",rows:"5","no-resize":"",maxlength:"350"},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}}),a("div",{staticClass:"text-end"},[a("small",{staticClass:"text-secondary"},[e._v(e._s(e.message.length)+"/350")])]),a("button",{staticClass:"btn btn-sm",on:{click:e.handleNewMessage}},[e._v("Send message "),a("SendmessageIcon",{attrs:{id:"send-message-icon"}})],1)],1)])},R=[],V=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M1.513 1.96a1.374 1.374 0 011.499-.21l19.335 9.215a1.146 1.146 0 010 2.07L3.012 22.25a1.374 1.374 0 01-1.947-1.46L2.49 12 1.065 3.21a1.374 1.374 0 01.448-1.25zm2.375 10.79l-1.304 8.042L21.031 12 2.584 3.208l1.304 8.042h7.362a.75.75 0 010 1.5H3.888z"}})])},B=[],U={name:"SendmessageIcon"},F=U,H=Object(w["a"])(F,V,B,!1,null,"663b53e2",null),Z=H.exports,W={name:"NewMessage.vue",components:{SendmessageIcon:Z},data:function(){return{message:""}},props:{threadId:Number},methods:{handleNewMessage:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.pending=!0,e.error=0,t.prev=2,t.next=5,P.a.post("/api/threads/"+e.threadId,{message:e.message},{headers:{Authorization:"bearer ".concat(window.accessToken)}}).then((function(t){e.$emit("update-thread",t.data)}));case 5:e.error=0,t.next=12;break;case 8:t.prev=8,t.t0=t["catch"](2),e.error=5,t.t0.response?e.errorMessage=t.t0.response.data.error:e.errorMessage=t.t0.message;case 12:e.pending=!1,e.message="";case 14:case"end":return t.stop()}}),t,null,[[2,8]])})))()}}},J=W,K=(a("fbe4"),Object(w["a"])(J,S,R,!1,null,"453bf1d8",null)),Y=K.exports,q={name:"Thread",components:{Message:E,NewMessage:Y},data:function(){return{data:{}}},props:{threadId:Number},methods:{getThreadsById:function(e){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function a(){var r,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.pending=!0,t.error=0,a.prev=2,a.next=5,P.a.get("/api/threads/"+e,{headers:{Authorization:"bearer ".concat(window.accessToken)}});case 5:r=a.sent,s=r.data,t.data=s,console.log(t.data),t.error=0,a.next=16;break;case 12:a.prev=12,a.t0=a["catch"](2),t.error=5,a.t0.response?t.errorMessage=a.t0.response.data.error:t.errorMessage=a.t0.message;case 16:t.pending=!1;case 17:case"end":return a.stop()}}),a,null,[[2,12]])})))()},updateThread:function(e){this.data=e}},created:function(){this.getThreadsById(this.threadId)}},G=q,Q=Object(w["a"])(G,d,l,!1,null,"05e8c716",null),X=Q.exports,ee=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"thread-list"}},e._l(e.threadData,(function(t){return a("OpeningMessage",{key:t.id,attrs:{messageData:t.messages[0],numMessages:t.numMessages,writerIdInThread:t.yourWriterId,threadId:t.id},on:{"message-clicked":function(a){return e.$emit("open-thread",t.id)}}})})),1)},te=[],ae=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container p-3 my-3 rounded-3",attrs:{id:e.computedId},on:{click:function(t){return e.$emit("message-clicked")}}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-10 px-3 text-break"},[a("div",{staticClass:"row"},[a("div",{staticClass:"d-flex align-items-start my-1"},[a("Clock",{attrs:{id:"clock-icon"}}),a("small",{staticClass:"text-secondary"},[e._v(" "+e._s(e.computedTime))])],1)]),a("div",{staticClass:"row p-3"},[e._v(" "+e._s(e.messageData.content)+" ")]),a("div",{staticClass:"row pt-3"},[a("div",{staticClass:"d-flex align-items-start mt-1"},[a("MessageIcon",{attrs:{id:"message-icon"}}),a("span",{staticClass:"fw-bold text-white"},[e._v(" "+e._s(e.numMessages))]),a("small",{staticClass:"text-secondary mx-4"},[e._v("Last post "+e._s(e.computedLatestMsgTime))])],1)])]),a("div",{staticClass:"col-sm-1 m-auto fw-bold fs-3 text-right text-white",attrs:{id:"score"}},[e._v(" "+e._s(e.messageData.score)+" ")])])])},re=[],se=(a("33d1"),a("ea98"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M3.25 4a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h2.5a.75.75 0 01.75.75v3.19l3.72-3.72a.75.75 0 01.53-.22h10a.25.25 0 00.25-.25V4.25a.25.25 0 00-.25-.25H3.25zm-1.75.25c0-.966.784-1.75 1.75-1.75h17.5c.966 0 1.75.784 1.75 1.75v12.5a1.75 1.75 0 01-1.75 1.75h-9.69l-3.573 3.573A1.457 1.457 0 015 21.043V18.5H3.25a1.75 1.75 0 01-1.75-1.75V4.25z"}})])}),ne=[],oe={name:"MessageIcon"},ie=oe,ce=Object(w["a"])(ie,se,ne,!1,null,"8e8f25c0",null),de=ce.exports,le={name:"OpeningMessage",components:{Clock:b,MessageIcon:de},props:{messageData:Object,numMessages:Number,writerIdInThread:Number,threadId:Number,lastMessage:Object},data:function(){return{data:{}}},methods:{getThreadsById:function(e){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function a(){var r,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.pending=!0,t.error=0,a.prev=2,a.next=5,P.a.get("/api/threads/"+e,{headers:{Authorization:"bearer ".concat(window.accessToken)}});case 5:r=a.sent,s=r.data,t.data=s,t.error=0,a.next=15;break;case 11:a.prev=11,a.t0=a["catch"](2),t.error=5,a.t0.response?t.errorMessage=a.t0.response.data.error:t.errorMessage=a.t0.message;case 15:t.pending=!1;case 16:case"end":return a.stop()}}),a,null,[[2,11]])})))()},getTimeDiff:function(e){var t=[];t.push(e.slice(0,4)),t.push(e.slice(5,7)),t.push(e.slice(8,10)),t.push(e.slice(11,13)),t.push(e.slice(14,16)),t.push(e.slice(17,19));var a=new Date,r=new Date(t[0]+"-"+t[1]+"-"+t[2]+"T"+t[3]+":"+t[4]+":"+t[5]+".000+00:00"),s=a-r,n=s/1e3,o=n/60,i=o/60,c=i/24;return c>365?1===Math.floor(c/365)?"A year ago":Math.floor(c/365)+" years ago":c>30?1===Math.floor(c/30)?"A month ago":Math.floor(c/30)+" months ago":c>=1?1===Math.floor(c)?"A day ago":Math.floor(c)+" days ago":i>=1?1===Math.floor(i)?"An hour ago":Math.floor(i)+" hours ago":o>=1?1===Math.floor(o)?"A minute ago":Math.floor(o)+" minutes ago":n>=5?Math.floor(n)+" seconds ago":"Just now"}},computed:{computedTime:function(){return void 0!==this.data.messages?this.getTimeDiff(this.messageData.postedTime):""},computedLatestMsgTime:function(){return void 0!==this.data.messages?this.getTimeDiff(this.data.messages.at(-1).postedTime).toLowerCase():""},computedId:function(){return this.writerIdInThread===this.messageData.writerId?"border":"message"}},created:function(){this.getThreadsById(this.threadId)}},ue=le,pe=(a("dbab"),Object(w["a"])(ue,ae,re,!1,null,"790d80e6",null)),me=pe.exports,he={name:"ThreadList",components:{OpeningMessage:me},props:{threadData:[]}},ge=he,fe=Object(w["a"])(ge,ee,te,!1,null,"7277f813",null),we=fe.exports,ve=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container p-3 rounded-bottom text-white",attrs:{id:"top-bar"}},[a("div",{staticClass:"d-flex justify-content-between"},[a("button",{staticClass:"btn btn-lg",attrs:{type:"button"},on:{click:function(t){return e.$emit("return-clicked")}}},[a("HomeIcon",{attrs:{id:"home-icon"}})],1),a("button",{staticClass:"btn btn-lg fw-bold",attrs:{type:"button",id:"newthreadbutton"},on:{click:function(t){return e.$emit("newthread-clicked")}}},[e._v("New thread "),a("PenIcon",{attrs:{id:"pen-icon"}})],1),a("button",{staticClass:"btn btn-lg",attrs:{type:"button"},on:{click:function(t){return e.$emit("profile-clicked")}}},[a("ProfileIcon",{attrs:{id:"profile-icon"}})],1)])])},be=[],xe=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:"16",height:"16"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"}})])},_e=[],ke={name:"PenIcon"},Ce=ke,Me=Object(w["a"])(Ce,xe,_e,!1,null,"1aca42e2",null),Te=Me.exports,ye=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M11.03 2.59a1.5 1.5 0 011.94 0l7.5 6.363a1.5 1.5 0 01.53 1.144V19.5a1.5 1.5 0 01-1.5 1.5h-5.75a.75.75 0 01-.75-.75V14h-2v6.25a.75.75 0 01-.75.75H4.5A1.5 1.5 0 013 19.5v-9.403c0-.44.194-.859.53-1.144l7.5-6.363zM12 3.734l-7.5 6.363V19.5h5v-6.25a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v6.25h5v-9.403L12 3.734z"}})])},Ie=[],Oe={name:"HomeIcon"},je=Oe,Le=Object(w["a"])(je,ye,Ie,!1,null,"b67090a8",null),Ae=Le.exports,$e=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M12 2.5a5.5 5.5 0 00-3.096 10.047 9.005 9.005 0 00-5.9 8.18.75.75 0 001.5.045 7.5 7.5 0 0114.993 0 .75.75 0 101.499-.044 9.005 9.005 0 00-5.9-8.181A5.5 5.5 0 0012 2.5zM8 8a4 4 0 118 0 4 4 0 01-8 0z"}})])},Pe=[],ze={name:"ProfileIcon"},De=ze,Ne=Object(w["a"])(De,$e,Pe,!1,null,"32d5013e",null),Ee=Ne.exports,Se={name:"TopBar",components:{ProfileIcon:Ee,HomeIcon:Ae,PenIcon:Te}},Re=Se,Ve=(a("6703"),Object(w["a"])(Re,ve,be,!1,null,"4517498f",null)),Be=Ve.exports,Ue=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container p-3 my-3 rounded-3",attrs:{id:"new-thread"}},[a("div",{staticClass:"text-center",attrs:{id:"newthreadfield"}},[a("b-form-textarea",{attrs:{size:"lg",placeholder:"Begin a new thread with a message",rows:"5","no-resize":"",maxlength:"350"},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}}),a("div",{staticClass:"text-end"},[a("small",{staticClass:"text-secondary"},[a("b-icon",{attrs:{icon:"clock"}}),e._v(e._s(e.message.length)+"/350")],1)]),a("button",{staticClass:"btn btn-sm",on:{click:e.createNewThread}},[e._v("Create thread "),a("SendmessageIcon",{attrs:{id:"send-message-icon"}})],1)],1),e.pending?a("div",{staticClass:"row justify-content-center"},[a("b-spinner",{staticClass:"mt-3",attrs:{variant:"primary"}})],1):e._e(),a("b-alert",{staticClass:"mt-3",attrs:{variant:"danger"},model:{value:e.error,callback:function(t){e.error=t},expression:"error"}},[e._v(" "+e._s(e.errorMessage)+" ")])],1)},Fe=[],He={name:"NewThread.vue",components:{SendmessageIcon:Z},props:{token:String},data:function(){return{message:"",pending:!1,error:0,errorMessage:""}},methods:{createNewThread:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.pending=!0,e.error=0,t.prev=2,t.next=5,P.a.post("/api/threads",{message:e.message},{headers:{Authorization:"bearer ".concat(window.accessToken)}});case 5:e.$emit("thread-created"),e.error=0,t.next=13;break;case 9:t.prev=9,t.t0=t["catch"](2),e.error=5,t.t0.response?e.errorMessage=t.t0.response.data.error:e.errorMessage=t.t0.message;case 13:e.pending=!1;case 14:case"end":return t.stop()}}),t,null,[[2,9]])})))()}}},Ze=He,We=(a("7161"),Object(w["a"])(Ze,Ue,Fe,!1,null,"192368a0",null)),Je=We.exports,Ke=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"profile"}},[a("div",{staticClass:"container p-3 my-3 fs-5 text-left rounded-3",attrs:{id:"profile-info"}},[a("div",{staticClass:"row row py-2 px-4"},[e._v(" User name: "+e._s(e.data.username)+" ")]),a("div",{staticClass:"row py-2 px-4 d-inline-block"},[e._v(" Your score: "),a("b",[e._v(e._s(e.data.score))])]),a("div",{staticClass:"row py-2 px-4"},[a("button",{staticClass:"btn fw-bold w-10 my-3",attrs:{type:"button"},on:{click:function(t){return e.$emit("logout-clicked")}}},[e._v("Log out")])]),a("div",{staticClass:"row py-2 px-4"},[e._v(" Threads you have posted on: ")])]),a("ThreadList",e._g({attrs:{threadData:e.data.threads}},e.$listeners))],1)},Ye=[],qe={name:"Profile",components:{ThreadList:we},data:function(){return{pending:!1,error:0,errorMessage:"",data:{}}},methods:{getData:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.pending=!0,e.error=0,t.prev=2,t.next=5,P.a.get("/api/users/me",{headers:{Authorization:"bearer ".concat(window.accessToken)}});case 5:a=t.sent,r=a.data,e.data=r,console.log(e.data),e.error=0,t.next=16;break;case 12:t.prev=12,t.t0=t["catch"](2),e.error=5,t.t0.response?e.errorMessage=t.t0.response.data.error:e.errorMessage=t.t0.message;case 16:e.pending=!1;case 17:case"end":return t.stop()}}),t,null,[[2,12]])})))()}},created:function(){this.getData()}},Ge=qe,Qe=(a("7830"),Object(w["a"])(Ge,Ke,Ye,!1,null,"04bba80a",null)),Xe=Qe.exports,et={name:"MainView",components:{NewThread:Je,TopBar:Be,Thread:X,ThreadList:we,Profile:Xe},props:{token:String},data:function(){return{showThreadList:0,showNewThread:1,showThread:2,showProfile:3,mainViewState:0,pending:!1,error:0,errorMessage:"",threadId:null,threads:[]}},methods:{openThreadList:function(){this.getThreads(),this.mainViewState=this.showThreadList},openThread:function(e){this.threadId=e,this.mainViewState=this.showThread},openNewThread:function(){this.mainViewState=this.showNewThread},openProfile:function(){this.mainViewState=this.showProfile},getThreads:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.pending=!0,e.error=0,t.prev=2,t.next=5,P.a.get("/api/threads",{headers:{Authorization:"bearer ".concat(window.accessToken)}});case 5:a=t.sent,r=a.data,e.threads=r,console.log(e.threadData),e.error=0,t.next=16;break;case 12:t.prev=12,t.t0=t["catch"](2),e.error=5,t.t0.response?e.errorMessage=t.t0.response.data.error:e.errorMessage=t.t0.message;case 16:e.pending=!1;case 17:case"end":return t.stop()}}),t,null,[[2,12]])})))()}},created:function(){this.getThreads()}},tt=et,at=Object(w["a"])(tt,o,i,!1,null,"69381004",null),rt=at.exports,st=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"loginview"}},[e.showLogin?a("Login",e._g({on:{"create-account-clicked":function(t){return e.handleCreateAccount()}}},e.$listeners)):a("CreateAccount",{on:{"return-clicked":function(t){return e.handleCloseCreateAccount()}}})],1)},nt=[],ot=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container p-5 my-3 rounded-3 align-items-center",attrs:{id:"login"}},[a("h1",{staticClass:"fs-2"},[e._v("Account login")]),a("form",{staticClass:"align-items-center",on:{submit:function(e){e.preventDefault()}}},[a("div",{staticClass:"row pb-1 mt-4 fw-bold",attrs:{id:"username"}},[e._v("Username:")]),a("div",{staticClass:"row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{placeholder:"Username"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}})]),a("div",{staticClass:"row mt-4 pb-1 fw-bold",attrs:{id:"password"}},[e._v("Password:")]),a("div",{staticClass:"row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),a("div",{staticClass:"row mt-4"},[a("input",{staticClass:"btn btn-primary btn-sm mt-3",attrs:{type:"submit",value:"Log in",id:"loginbutton"},on:{click:e.login}})])]),a("div",{staticClass:"row mt-4"},[a("button",{staticClass:"btn btn-sm my-2",on:{click:function(t){return e.$emit("create-account-clicked")}}},[e._v(" Create new account ")])]),e.pending?a("div",{staticClass:"row justify-content-center"},[a("b-spinner",{staticClass:"mt-3",attrs:{variant:"primary"}})],1):e._e(),a("b-alert",{staticClass:"mt-3",attrs:{variant:"danger"},model:{value:e.error,callback:function(t){e.error=t},expression:"error"}},[e._v(" "+e._s(e.errorMessage)+" ")])],1)},it=[],ct={name:"Login",data:function(){return{username:"",password:"",token:null,pending:!1,error:0,errorMessage:""}},methods:{login:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.pending=!0,e.error=0,t.prev=2,t.next=5,P.a.post("/api/login",{username:e.username,password:e.password});case 5:a=t.sent,r=a.data,e.token=r.token,e.error=0,e.$emit("login-clicked",e.token),t.next=17;break;case 12:t.prev=12,t.t0=t["catch"](2),e.token=null,e.error=5,t.t0.response?e.errorMessage=t.t0.response.data.error:e.errorMessage=t.t0.message;case 17:e.pending=!1;case 18:case"end":return t.stop()}}),t,null,[[2,12]])})))()}}},dt=ct,lt=(a("f5d2"),Object(w["a"])(dt,ot,it,!1,null,"f787f3b6",null)),ut=lt.exports,pt=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container p-5 my-3 rounded-3",attrs:{id:"create-account"}},[a("h1",{staticClass:"fs-4"},[e._v("Create a new account")]),a("form",{staticClass:"align-items-center",on:{submit:function(e){e.preventDefault()}}},[a("div",{staticClass:"row pb-1 mt-5 fw-bold",attrs:{id:"username"}},[e._v(" Username: ")]),a("div",{staticClass:"row",attrs:{id:"usernamecontainer"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{placeholder:"Username",pattern:"^[A-Za-z0-9\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u00FF]{3,}$"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}}),a("span",{staticClass:"usernametooltip"},[e._v("Username must contain at least 3 characters, and only letters or numbers")])]),a("div",{staticClass:"row mt-4 pb-1 fw-bold",attrs:{id:"password"}},[e._v(" Password: ")]),a("div",{staticClass:"row",attrs:{id:"passwordcontainer"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password",pattern:"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),a("span",{staticClass:"passwordtooltip"},[e._v("Password must contain at least 6 characters, at least 1 number and at least 1 uppercase character")])]),a("div",{staticClass:"row mt-4 pb-1 fw-bold",attrs:{id:"password2"}},[e._v(" Re-enter your Password: ")]),a("div",{staticClass:"row",attrs:{id:"passwordcontainer2"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.password2,expression:"password2"}],attrs:{type:"password",pattern:"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$"},domProps:{value:e.password2},on:{input:function(t){t.target.composing||(e.password2=t.target.value)}}})]),a("div",{staticClass:"row mt-4"},[a("input",{staticClass:"btn btn-primary btn-sm mt-3",attrs:{type:"submit",value:"Create Account",id:"createaccountbutton"},on:{click:e.createAccount}})])]),a("div",{staticClass:"row mt-4"},[a("button",{staticClass:"btn btn-sm mt-3",on:{click:function(t){return e.$emit("return-clicked")}}},[a("BackIcon",{attrs:{id:"back-icon"}}),e._v(" Return ")],1)]),e.pending?a("div",{staticClass:"row justify-content-center"},[a("b-spinner",{staticClass:"mt-3",attrs:{variant:"primary"}})],1):e._e(),a("b-alert",{staticClass:"mt-3",attrs:{variant:"danger"},model:{value:e.error,callback:function(t){e.error=t},expression:"error"}},[e._v(" "+e._s(e.errorMessage)+" ")])],1)},mt=[],ht=(a("ac1f"),a("00b4"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M10.78 19.03a.75.75 0 01-1.06 0l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.75.75 0 111.06 1.06L5.81 11.5h14.44a.75.75 0 010 1.5H5.81l4.97 4.97a.75.75 0 010 1.06z"}})])}),gt=[],ft={name:"BackIcon"},wt=ft,vt=Object(w["a"])(wt,ht,gt,!1,null,"24937670",null),bt=vt.exports,xt={name:"CreateAccount",components:{BackIcon:bt},data:function(){return{username:"",password:"",password2:"",pending:!1,error:0,errorMessage:""}},methods:{createAccount:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(e.username.length<3)){t.next=5;break}e.error=5,e.errorMessage="Username must be longer than 3 characters.",t.next=56;break;case 5:if(/^[A-Za-z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]*$/.test(e.username)){t.next=10;break}e.error=5,e.errorMessage="Username must only contain letters or numbers.",t.next=56;break;case 10:if(!(e.password.length<6)){t.next=15;break}e.error=5,e.errorMessage="Password must be at least 6 characters long.",t.next=56;break;case 15:if(/[a-z]+/.test(e.password)){t.next=20;break}e.error=5,e.errorMessage="Password must contain a lowercase letter.",t.next=56;break;case 20:if(/[0-9]/.test(e.password)){t.next=25;break}e.error=5,e.errorMessage="Password must contain a number.",t.next=56;break;case 25:if(""!==e.password&&""!==e.password2){t.next=30;break}e.error=5,e.errorMessage="Please fill both password fields.",t.next=56;break;case 30:if(e.password===e.password2){t.next=35;break}e.error=5,e.errorMessage="Passwords don't match!",t.next=56;break;case 35:if(/[A-Z]+/.test(e.password)){t.next=40;break}e.error=5,e.errorMessage="Password must contain an uppercase letter.",t.next=56;break;case 40:return e.pending=!0,e.error=0,t.prev=42,t.next=45,P.a.post("/api/users",{username:e.username,password:e.password});case 45:a=t.sent,a.data,e.error=0,e.$emit("return-clicked"),t.next=55;break;case 51:t.prev=51,t.t0=t["catch"](42),e.error=5,t.t0.response?e.errorMessage=t.t0.response.data.error:e.errorMessage=t.t0.message;case 55:e.pending=!1;case 56:case"end":return t.stop()}}),t,null,[[42,51]])})))()}}},_t=xt,kt=(a("82a7"),Object(w["a"])(_t,pt,mt,!1,null,"1cb9844b",null)),Ct=kt.exports,Mt={name:"LoginView",components:{CreateAccount:Ct,Login:ut},data:function(){return{showLogin:!0}},methods:{handleLogin:function(){this.showLogin=!1},handleCreateAccount:function(){this.showLogin=!1},handleCloseCreateAccount:function(){this.showLogin=!0}}},Tt=Mt,yt=Object(w["a"])(Tt,st,nt,!1,null,"6ca0fde9",null),It=yt.exports,Ot={name:"App",components:{LoginView:It,MainView:rt},data:function(){return{showLogin:!0,token:""}},created:function(){var e=localStorage.getItem("TOKEN");e&&this.setToken(e)},methods:{handleLogin:function(e){this.setToken(e)},handleLogout:function(){this.setToken("")},setToken:function(e){this.token=e,window.accessToken=e,localStorage.setItem("TOKEN",e),this.showLogin=""===e}}},jt=Ot,Lt=(a("034f"),Object(w["a"])(jt,s,n,!1,null,null,null)),At=Lt.exports,$t=a("1e18");a("2dd8"),a("f9e3");r["default"].use($t["a"]),r["default"].config.productionTip=!1,new r["default"]({render:function(e){return e(At)}}).$mount("#app")},5820:function(e,t,a){"use strict";a("a5c2")},6703:function(e,t,a){"use strict";a("34e0")},7161:function(e,t,a){"use strict";a("09c8")},"748c":function(e,t,a){},7830:function(e,t,a){"use strict";a("748c")},"82a7":function(e,t,a){"use strict";a("875b")},"85ec":function(e,t,a){},"875b":function(e,t,a){},a5c2:function(e,t,a){},dbab:function(e,t,a){"use strict";a("4365")},f5d2:function(e,t,a){"use strict";a("fac5")},fac5:function(e,t,a){},fbe4:function(e,t,a){"use strict";a("2dba")}});
//# sourceMappingURL=app.e1360c06.js.map