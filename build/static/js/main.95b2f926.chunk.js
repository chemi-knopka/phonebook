(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var r=t(0),c=t(2),a=t(14),o=t.n(a),i=t(3),u=function(e){var n=e.nameFilter,t=e.handleNewFilter;return Object(r.jsxs)("div",{children:[Object(r.jsx)("strong",{children:"enter person's name to filter:"}),Object(r.jsx)("input",{value:n,onChange:t})]})},s=function(e){return Object(r.jsxs)("form",{onSubmit:e.addNewName,children:[Object(r.jsx)("h2",{children:"add new "}),Object(r.jsxs)("div",{children:["name :",Object(r.jsx)("input",{value:e.newName,onChange:e.handleNewName})]}),Object(r.jsxs)("div",{children:["phone:",Object(r.jsx)("input",{value:e.newPhone,onChange:e.handleNewPhone})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",children:"add"})})]})},d=function(e){var n=e.person,t=e.deletePerson;return Object(r.jsxs)("div",{children:[Object(r.jsxs)("strong",{children:[n.name,":"]})," ",n.number,Object(r.jsx)("button",{onClick:t,children:" delete"})]})},l=function(e){var n=e.message,t=e.isError;if(null===n)return null;var c=t?"error":"notification";return Object(r.jsx)("div",{className:c,children:n})},j=t(4),f=t.n(j),b="/api/persons",h=function(e){return f.a.post(b,e).then((function(e){return e.data}))},m=function(){return f.a.get(b).then((function(e){return e.data}))},O=function(e){return f.a.delete("".concat(b,"/").concat(e))},p=function(e,n){return f.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))},x=(t(37),function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],a=n[1],o=Object(c.useState)(""),j=Object(i.a)(o,2),f=j[0],b=j[1],x=Object(c.useState)(""),v=Object(i.a)(x,2),w=v[0],N=v[1],g=Object(c.useState)(""),k=Object(i.a)(g,2),P=k[0],S=k[1],y=Object(c.useState)(null),C=Object(i.a)(y,2),F=C[0],E=C[1],L=Object(c.useState)(!1),D=Object(i.a)(L,2),J=D[0],q=D[1];Object(c.useEffect)((function(){m().then((function(e){a(e)}))}),[]);var B=t.filter((function(e){return e.name.toLowerCase().includes(P.toLowerCase())})),I=function(e){var n=t.find((function(n){return n.name===e.name}));p(n.id,e).then((function(n){a(t.map((function(t){return t.name!==e.name?t:n}))),q(!1),T("updated '".concat(n.name,"'"))})).catch((function(e){q(!0),e.response.data.error?T(e.response.data.error):(T("can't update person '".concat(n.name,"',it is deleted")),a(t.filter((function(e){return e.id!==n.id}))))}))},T=function(e){E("".concat(e)),setTimeout((function(){E(null)}),3e3)};return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h1",{children:"Phonebook"}),Object(r.jsx)(l,{message:F,isError:J}),Object(r.jsx)(u,{nameFilter:P,handleNewFilter:function(e){return S(e.target.value)}}),Object(r.jsx)(s,{addNewName:function(e){e.preventDefault();var n={name:f,number:w};t.some((function(e){return e.name===f}))?window.confirm("person '".concat(f,"' already exists in the phonebook, \n                                          \nDo you really want to update its number?"))?I(n):console.log("request on update was rejected"):h(n).then((function(e){a(t.concat(e)),b(""),N(""),q(!1),T("added '".concat(e.name,"'"))})).catch((function(e){q(!0),T(e.response.data.error)}))},newName:f,handleNewName:function(e){return b(e.target.value)},newPhone:w,handleNewPhone:function(e){return N(e.target.value)}}),Object(r.jsx)("h2",{children:"List"}),Object(r.jsx)("div",{children:B.map((function(e){return Object(r.jsx)(d,{person:e,deletePerson:function(){return function(e){var n=t.find((function(n){return n.id===e}));O(e).then((function(r){a(t.filter((function(n){return n.id!==e}))),q(!1),T("deleted '".concat(n.name,"'"))})).catch((function(r){a(t.filter((function(n){return n.id!==e}))),q(!0),T("person '".concat(n.name,"' is already deleted"))}))}(e.id)}},e.number)}))})]})});o.a.render(Object(r.jsx)(x,{}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.95b2f926.chunk.js.map