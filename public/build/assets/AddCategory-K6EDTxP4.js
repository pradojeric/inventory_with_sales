import{W as N,r as o,j as e}from"./app-jOMKqZ42.js";import{M as C}from"./Modal-00af32M3.js";import{L as c,T as u,b as k,B as d}from"./Toast-8aqilxEi.js";import{a as T}from"./index-Cn3kJYtV.js";import"./transition-MX07-MAR.js";function B({show:m=!1,onClose:a=()=>{}}){const{data:E,setData:i,post:h,processing:j,errors:r,reset:F,clearErrors:f}=N({name:"",category:"",variants:[]}),[l,p]=o.useState({name:""}),[t,n]=o.useState([]);o.useEffect(()=>{f(),n([])},[m]);const g=s=>{s.preventDefault(),h(route("categories.store"),{onSuccess:()=>[a()]})},v=s=>{s.name&&(n([...t,s]),i("variants",[...t,s]),p({name:""}))};return e.jsx(e.Fragment,{children:e.jsx(C,{show:m,onClose:a,closeable:!1,children:e.jsxs("div",{className:"p-6 text-gray-900",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-800 uppercase",children:"Category"}),e.jsx("hr",{}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{children:[e.jsx("div",{className:"mb-2 block",children:e.jsx(c,{htmlFor:"name",value:"Category Name"})}),e.jsx(u,{id:"name",type:"text",required:!0,onChange:s=>i("name",s.target.value),color:r.name&&"failure",helperText:r.name})]}),e.jsxs("div",{children:[e.jsx("div",{className:"mb-2 block",children:e.jsx(c,{htmlFor:"description",value:"Description"})}),e.jsx(k,{id:"description",required:!0,rows:2,onChange:s=>i("description",s.target.value),color:r.description&&"failure",helperText:r.description})]}),e.jsxs("div",{children:[e.jsx("div",{className:"mb-2 block",children:e.jsx(c,{htmlFor:"properties",value:"Variants"})}),e.jsxs("div",{className:"flex space-x-2 mb-2",children:[e.jsx(u,{id:"properties",className:"w-full",placeholder:"Small/3mg/pcs",value:l.name,onChange:s=>p({name:s.target.value})}),e.jsx(d,{type:"button",disabled:!l.name,onClick:()=>v(l),children:"Add"})]}),t.map((s,x)=>e.jsxs("div",{className:"flex items-center",children:[e.jsx("button",{className:"mr-4 text-red-700",onClick:()=>{const b=t.filter((S,y)=>y!=x);n(b)},children:e.jsx(T,{className:"w-5 h-5"})}),s.name]},"prop"+x))]}),e.jsx("hr",{}),e.jsxs("div",{className:"flex justify-end space-x-2",children:[e.jsx(d,{type:"button",color:"light",onClick:a,children:"Close"}),e.jsx(d,{type:"button",onClick:g,disabled:j,children:"Add"})]})]})]})})})}export{B as default};
