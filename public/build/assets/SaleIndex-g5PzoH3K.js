import{r as a,j as e,a as B,d as D,y as p}from"./app-jOMKqZ42.js";import{A as T}from"./AuthenticatedLayout-Pr9jd9q1.js";import{c as v,A as F,B as f,L as n,T as C,S as I,d as O,a as l,e as P}from"./Toast-8aqilxEi.js";import{G as L,b as M,c as z}from"./index-Cn3kJYtV.js";import E from"./ViewStatus-XXe1vSL4.js";import{formatNumber as y,removeUnderScore as V}from"./Util-py14zHy8.js";import"./ApplicationLogo-ZdBNHtfl.js";import"./Modal-00af32M3.js";import"./transition-MX07-MAR.js";function G(r){return L({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"},child:[]}]})(r)}function Z({auth:r,flash:o,sales:i,inputs:d}){const[t,c]=a.useState({from:d.from,to:d.to}),[x,g]=a.useState(d.status),[S,N]=a.useState(!1),[H,b]=a.useState(null),[m,h]=a.useState(!1),u=()=>{N(s=>s=!s)},_=s=>{s.deleted_at||(b(s),u())},w=s=>{p.delete(route("sales.destroy",s.id),{preserveState:!1,onBefore:()=>confirm("Are you sure to cancel order? It will restock all items into the inventory")})},k=()=>{p.reload({data:{from:t.from,to:t.to,status:x},only:["sales"],onStart:()=>{h(!0)},onProgress:s=>{console.log(s)},onSuccess:()=>{h(!1)}})},A=()=>i.reduce((s,j)=>j.deleted_at?s:s+j.total_amount,0);return e.jsxs(T,{user:r.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Sales"}),children:[e.jsx(B,{title:"Sales"}),e.jsx(E,{sale:H,show:S,onClose:u}),e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:e.jsx("div",{className:"bg-white overflow-hidden shadow-sm sm:rounded-lg",children:e.jsxs("div",{className:"p-6 text-gray-900",children:[e.jsx(v,{"aria-label":"Default breadcrumb example",children:e.jsx(v.Item,{href:route("sales.index"),icon:M,children:"Orders"})}),o.message&&e.jsx(F,{color:"success",children:o.message}),e.jsx("div",{className:"flex justify-end mb-2",children:e.jsx(f,{href:route("sales.create"),children:"Add"})}),e.jsx("div",{className:"mb-2",children:e.jsxs("div",{className:"flex space-x-2 items-end",children:[e.jsxs("div",{className:"",children:[e.jsx("div",{className:"block",children:e.jsx(n,{htmlFor:"from",value:"From"})}),e.jsx(C,{id:"from",value:t.from,onChange:s=>{c({...t,from:s.target.value})},type:"date"})]}),e.jsxs("div",{className:"",children:[e.jsx("div",{className:"block",children:e.jsx(n,{htmlFor:"to",value:"To"})}),e.jsx(C,{id:"to",value:t.to,onChange:s=>{c({...t,to:s.target.value})},type:"date"})]}),e.jsxs("div",{className:"",children:[e.jsx("div",{className:"block",children:e.jsx(n,{htmlFor:"status",value:"Status"})}),e.jsxs(I,{id:"status",value:x,onChange:s=>{g(s.target.value)},children:[e.jsx("option",{value:"all",children:"All"}),e.jsx("option",{value:"pending",children:"Pending"}),e.jsx("option",{value:"processing",children:"Processing"}),e.jsx("option",{value:"confirmed",children:"Confirmed"}),e.jsx("option",{value:"on_delivery",children:"On Delivery"}),e.jsx("option",{value:"on_hold",children:"On Hold"}),e.jsx("option",{value:"waiting_for_payment",children:"Waiting for Payment"}),e.jsx("option",{value:"delivered",children:"Delivered"})]})]}),e.jsx("div",{children:e.jsx(f,{type:"button",onClick:k,children:"Filter"})})]})}),e.jsxs("div",{className:"overflow-y-auto max-h-96",children:[m&&e.jsx(O,{}),!m&&e.jsxs(l,{striped:!0,children:[e.jsxs(l.Head,{className:"sticky top-0",children:[e.jsx(l.HeadCell,{children:"Order #"}),e.jsx(l.HeadCell,{children:"Customer Name"}),e.jsx(l.HeadCell,{children:"Sale Date"}),e.jsx(l.HeadCell,{children:"Payment Mode"}),e.jsx(l.HeadCell,{children:"Total Amount"}),e.jsx(l.HeadCell,{children:"Status"}),e.jsx(l.HeadCell,{children:"Created By"}),e.jsx(l.HeadCell,{children:"Created At"}),e.jsx(l.HeadCell,{children:e.jsx("span",{className:"sr-only",children:"View"})})]}),e.jsx(l.Body,{className:"divide-y",children:i.map(s=>e.jsxs(l.Row,{children:[e.jsx(l.Cell,{children:s.order_no}),e.jsx(l.Cell,{children:s.customer_name}),e.jsx(l.Cell,{children:s.sale_date}),e.jsx(l.Cell,{children:s.payment_type}),e.jsx(l.Cell,{children:y(s.total_amount)}),e.jsx(l.Cell,{children:e.jsx(P,{as:"button",className:"uppercase",onClick:()=>{_(s)},children:s.deleted_at?"Cancelled":V(s.status)})}),e.jsx(l.Cell,{children:s.user.name}),e.jsx(l.Cell,{children:s.created_at}),e.jsxs(l.Cell,{children:[s.deleted_at&&"Deleted",!s.deleted_at&&e.jsxs("div",{className:"flex space-x-2",children:[e.jsx(D,{href:route("sales.show",s.id),className:"font-medium text-cyan-600 hover:underline dark:text-cyan-500",children:e.jsx(z,{})}),e.jsx("button",{onClick:()=>w(s),type:"button",className:"font-medium text-cyan-600 hover:underline dark:text-cyan-500 ml-2",children:e.jsx(G,{})})]})]})]},s.id))}),e.jsxs(l.Head,{className:"sticky bottom-0",children:[e.jsx(l.HeadCell,{}),e.jsx(l.HeadCell,{}),e.jsx(l.HeadCell,{}),e.jsx(l.HeadCell,{children:"Total Amount:"}),e.jsx(l.HeadCell,{className:"text-base",children:y(A())}),e.jsx(l.HeadCell,{}),e.jsx(l.HeadCell,{}),e.jsx(l.HeadCell,{children:e.jsx("span",{className:"sr-only",children:"View"})})]})]})]})]})})})})]})}export{Z as default};
