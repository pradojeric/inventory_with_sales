import{W as H,r as u,j as e,a as I}from"./app-vmYIqMbQ.js";import{A as P}from"./AuthenticatedLayout-pXQgv0fp.js";import{c as x,B as y,L as m,T as h,S as f,a as r}from"./Toast-lSqrY-Ki.js";import{b as D,a as E}from"./index-HWNWORzS.js";import"./ApplicationLogo-Zi-FhwKp.js";function U({auth:g,flash:T,products:j,categories:b,control_no:p}){const{data:C,setData:v,post:N,processing:_,errors:d,reset:B,clearErrors:A}=H({control_no:p,delivery_date:"",items:[]}),[a,i]=u.useState({product_id:"",category_id:"",quantity:1}),[c,o]=u.useState([]),k=t=>{if(!t)return;const l=j.filter(s=>s.category_id==t&&!c.some(n=>n.productItem.id==s.id));return l.length>0?l.map(s=>e.jsx("option",{value:s.id,children:s.product_name},s.id)):e.jsx("option",{disabled:!0,children:"No product"})},S=t=>{t.preventDefault(),N(route("stocks.store"))};u.useEffect(()=>()=>{},[o]);const q=t=>{t.preventDefault();const l=j.filter(n=>n.id==a.product_id)[0];if(!l)return;const s=[...c];s.push({productItem:l,quantity:a.quantity}),o(s),v("items",s),i({product_id:"",category_id:"",quantity:1})};return e.jsxs(P,{user:g.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Create"}),children:[e.jsx(I,{title:"Stocks"}),e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:e.jsx("div",{className:"bg-white overflow-hidden shadow-sm sm:rounded-lg",children:e.jsxs("div",{className:"p-6 text-gray-900",children:[e.jsxs(x,{"aria-label":"Default breadcrumb example",children:[e.jsx(x.Item,{href:route("sales.index"),icon:D,children:"Stock Up"}),e.jsx(x.Item,{children:"Create"})]}),e.jsx("div",{className:"flex justify-end space-x-2",children:e.jsx(y,{type:"button",disabled:_,onClick:S,children:"Save"})}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsx("div",{className:"mb-2 block",children:e.jsx(m,{htmlFor:"control_no",value:"Control No"})}),e.jsx(h,{id:"control_no",value:p,required:!0,disabled:!0})]}),e.jsxs("div",{children:[e.jsx("div",{className:"mb-2 block",children:e.jsx(m,{htmlFor:"deliver_date",value:"Delivery Date"})}),e.jsx(h,{id:"deliver_date",type:"datetime-local",value:C.delivery_date,onChange:t=>{v("delivery_date",t.target.value)},color:d.delivery_date&&"failure",helperText:d.delivery_date,required:!0})]})]}),e.jsxs("div",{children:[e.jsx("div",{className:"mb-2 block",children:e.jsx(m,{value:"Product/s"})}),d.items&&e.jsx("p",{className:"mt-2 text-sm text-red-700",children:d.items}),e.jsxs("div",{className:"flex space-x-2 mb-2",children:[e.jsxs(f,{className:"w-full",value:a.category_id,onChange:t=>{i({...a,category_id:t.target.value})},children:[e.jsx("option",{value:"",children:"Select One"}),b.map(t=>e.jsx("option",{value:t.id,children:t.name},"fuck"+t.id))]}),e.jsxs(f,{className:"w-full",value:a.product_id,onChange:t=>{i({...a,product_id:t.target.value})},children:[e.jsx("option",{value:"",children:"Select Category"}),k(a.category_id)]}),e.jsx(h,{type:"number",value:a.quantity,min:"1",onChange:t=>{i({...a,quantity:t.target.value})}}),e.jsx(y,{type:"button",onClick:q,children:"Add"})]}),e.jsx("div",{className:"max-h-40 overflow-y-auto",children:e.jsxs(r,{striped:!0,children:[e.jsxs(r.Head,{className:"sticky top-0",children:[e.jsx(r.HeadCell,{children:"Product name"}),e.jsx(r.HeadCell,{children:"Category"}),e.jsx(r.HeadCell,{children:"Quantity"}),e.jsx(r.HeadCell,{children:e.jsx("span",{className:"sr-only",children:"Edit"})})]}),e.jsx(r.Body,{className:"divide-y",children:c.map((t,l)=>{var s;return e.jsxs(r.Row,{children:[e.jsxs(r.Cell,{children:[t.productItem.name," ","(",(s=t.productItem.variant)==null?void 0:s.name,")"]}),e.jsx(r.Cell,{children:t.productItem.category.name}),e.jsx(r.Cell,{children:t.quantity}),e.jsx(r.Cell,{children:e.jsx("button",{type:"button",onClick:()=>{o(c.filter((n,w)=>w!=l))},children:e.jsx(E,{className:"text-red-500"})})})]},"sp"+l)})})]})})]})]})]})})})})]})}export{U as default};