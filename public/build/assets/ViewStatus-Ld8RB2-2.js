import{W as x,j as e}from"./app-BdE4YzGR.js";import{M as h}from"./Modal-Vyw7hR-r.js";import{S as v,B as s}from"./Toast-J2amxNlV.js";import"./transition-3YiIzA00.js";function _({sale:t=null,show:o=!1,onClose:r=()=>{},onSave:m=()=>{}}){const{data:d,setData:a,reset:c,clearErrors:j,put:l,errors:n,processing:u}=x({status:t==null?void 0:t.status}),p=i=>{i.preventDefault(),l(route("sales.update-status",t==null?void 0:t.id),{preserveState:!1,onSuccess:()=>{c(),r()}})};return e.jsx(e.Fragment,{children:e.jsxs(h,{show:o,onClose:r,closeable:!1,maxWidth:"md",children:[e.jsx("div",{className:"w-screen"}),e.jsx("form",{children:e.jsxs("div",{className:"p-6 text-gray-900",children:[t==null?void 0:t.order_no,e.jsx("div",{className:"mb-2",children:e.jsxs(v,{defaultValue:t==null?void 0:t.status,value:d.status,onChange:i=>{a("status",i.target.value)},color:n.cash_received&&"failure",helperText:n.cash_received,children:[e.jsx("option",{value:"pending",children:"Pending"}),e.jsx("option",{value:"processing",children:"Processing"}),e.jsx("option",{value:"confirmed",children:"Confirmed"}),e.jsx("option",{value:"on_delivery",children:"On Delivery"}),e.jsx("option",{value:"on_hold",children:"On Hold"}),e.jsx("option",{value:"waiting_for_payment",children:"Waiting for Payment"}),e.jsx("option",{value:"delivered",children:"Delivered"})]})}),e.jsxs("div",{className:"flex justify-end space-x-2",children:[e.jsx(s,{type:"button",color:"light",onClick:r,children:"Close"}),e.jsx(s,{onClick:p,type:"button",disabled:u,children:"Save"})]})]})})]})})}export{_ as default};
