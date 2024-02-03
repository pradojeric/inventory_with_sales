import{r,j as s}from"./app-LFVcxj7R.js";import{M as g}from"./Modal-wbw-UJO-.js";import{L as p,T as j,S as q,B as v}from"./Toast-l3bA4Sul.js";import{formatNumber as u}from"./Util-py14zHy8.js";import"./transition-nGBYlTIw.js";function R({item:a=null,show:o=!1,onClose:d=()=>{},onSave:y=()=>{}}){r.useState(!1);const[e,c]=r.useState(),[x,t]=r.useState(1);r.useState(1);const[f,N]=r.useState(0),[i,h]=r.useState(0);return r.useEffect(()=>{c({...a,newPrice:a==null?void 0:a.retail_price,totalQuantity:1,quantity:(a==null?void 0:a.quantity)-1}),h(a==null?void 0:a.retail_price),t(1)},[o]),s.jsx(s.Fragment,{children:s.jsxs(g,{show:o,onClose:d,closeable:!1,maxWidth:"md",children:[s.jsx("div",{className:"w-screen"}),s.jsx("form",{children:s.jsxs("div",{className:"p-6 text-gray-900",children:[s.jsx("h3",{className:"text-lg font-semibold text-gray-800 uppercase",children:"Add Item"}),s.jsx("hr",{}),s.jsx("div",{className:"uppercase text-xl font-semibold mt-2",children:e==null?void 0:e.product_name}),s.jsxs("div",{className:"text-gray-700 text-sm",children:[e==null?void 0:e.quantity," items left"]}),s.jsx("div",{className:"text-xs",children:"SRP: "+u(e==null?void 0:e.price)}),s.jsx("div",{className:"text-xs",children:"Retail: "+u(e==null?void 0:e.retail_price)}),s.jsx("div",{className:"text-xs",children:"Wholesale: "+u(e==null?void 0:e.wholesale_price)}),s.jsxs("div",{className:"mb-2",children:[s.jsx("div",{className:"mb-2 block",children:s.jsx(p,{htmlFor:"quantity",value:"Quantity"})}),s.jsx(j,{type:"number",id:"quantity",value:x,onChange:l=>{const n=Math.min(a==null?void 0:a.quantity,Math.max(0,l.target.value)),b=Math.max(0,Math.min(a==null?void 0:a.quantity,(a==null?void 0:a.quantity)-n));t(n),c({...e,quantity:b,totalQuantity:n})},required:!0})]}),s.jsxs("div",{className:"mb-2 w-full",children:[s.jsx("div",{className:"mb-2 block",children:s.jsx(p,{htmlFor:"price",value:"Price"})}),s.jsxs("div",{className:"flex space-x-2",children:[i=="custom"&&s.jsx(j,{type:"number",id:"quantity",value:f,min:"0",onChange:l=>{N(l.target.value),c({...e,newPrice:l.target.value})},required:!0}),s.jsxs(q,{className:"w-full",value:i,onChange:l=>{h(l.target.value),l.target.value!="custom"&&c({...e,newPrice:Number(l.target.value)})},children:[s.jsx("option",{value:a==null?void 0:a.price,children:"SRP - "+(a==null?void 0:a.price)}),s.jsx("option",{value:a==null?void 0:a.retail_price,children:"Retail - "+(a==null?void 0:a.retail_price)}),s.jsx("option",{value:a==null?void 0:a.wholesale_price,children:"Wholesale - "+(a==null?void 0:a.wholesale_price)}),s.jsx("option",{value:"custom",children:"Custom"})]})]})]}),s.jsxs("div",{className:"flex justify-end space-x-2",children:[s.jsx(v,{type:"button",color:"light",onClick:d,children:"Close"}),s.jsx(v,{onClick:()=>{y(e),t("")},type:"button",disabled:x<1,children:"Save"})]})]})})]})})}export{R as default};
