import{r,j as s}from"./app-jOMKqZ42.js";import{M as g}from"./Modal-00af32M3.js";import{L as p,T as j,S as q,B as v}from"./Toast-8aqilxEi.js";import{formatNumber as u}from"./Util-py14zHy8.js";import"./transition-MX07-MAR.js";function R({item:a=null,show:o=!1,onClose:d=()=>{},onSave:f=()=>{}}){r.useState(!1);const[e,t]=r.useState(),[x,c]=r.useState(1);r.useState(1);const[y,b]=r.useState(0),[i,h]=r.useState(0);return r.useEffect(()=>{t({...a,newPrice:a==null?void 0:a.retail_price,totalQuantity:1}),h(a==null?void 0:a.retail_price),c(1)},[o]),s.jsx(s.Fragment,{children:s.jsx(g,{show:o,onClose:d,closeable:!1,maxWidth:"md",children:s.jsx("form",{children:s.jsxs("div",{className:"p-6 text-gray-900",children:[s.jsx("h3",{className:"text-lg font-semibold text-gray-800 uppercase",children:"Add Item"}),s.jsx("hr",{}),s.jsx("div",{className:"uppercase text-xl font-semibold mt-2",children:e==null?void 0:e.product_name}),s.jsxs("div",{className:"text-gray-700 text-sm",children:[e==null?void 0:e.quantity," items left"]}),s.jsx("div",{className:"text-xs",children:"SRP: "+u(e==null?void 0:e.price)}),s.jsx("div",{className:"text-xs",children:"Retail: "+u(e==null?void 0:e.retail_price)}),s.jsx("div",{className:"text-xs",children:"Wholesale: "+u(e==null?void 0:e.wholesale_price)}),s.jsxs("div",{className:"mb-2",children:[s.jsx("div",{className:"mb-2 block",children:s.jsx(p,{htmlFor:"quantity",value:"Quantity"})}),s.jsx(j,{type:"number",id:"quantity",value:x,onChange:l=>{const n=Math.min(a==null?void 0:a.quantity,Math.max(0,l.target.value)),N=Math.max(0,Math.min(a==null?void 0:a.quantity,(a==null?void 0:a.quantity)-n));c(n),t({...e,quantity:N,totalQuantity:n})},required:!0})]}),s.jsxs("div",{className:"mb-2 w-full",children:[s.jsx("div",{className:"mb-2 block",children:s.jsx(p,{htmlFor:"price",value:"Price"})}),s.jsxs("div",{className:"flex space-x-2",children:[i=="custom"&&s.jsx(j,{type:"number",id:"quantity",value:y,min:"0",onChange:l=>{b(l.target.value),t({...e,newPrice:l.target.value})},required:!0}),s.jsxs(q,{className:"w-full",value:i,onChange:l=>{h(l.target.value),l.target.value!="custom"&&t({...e,newPrice:Number(l.target.value)})},children:[s.jsx("option",{value:a==null?void 0:a.price,children:"SRP - "+(a==null?void 0:a.price)}),s.jsx("option",{value:a==null?void 0:a.retail_price,children:"Retail - "+(a==null?void 0:a.retail_price)}),s.jsx("option",{value:a==null?void 0:a.wholesale_price,children:"Wholesale - "+(a==null?void 0:a.wholesale_price)}),s.jsx("option",{value:"custom",children:"Custom"})]})]})]}),s.jsxs("div",{className:"flex justify-end space-x-2",children:[s.jsx(v,{type:"button",color:"light",onClick:d,children:"Close"}),s.jsx(v,{onClick:()=>{f(e),c("")},type:"button",disabled:x<1,children:"Save"})]})]})})})})}export{R as default};
