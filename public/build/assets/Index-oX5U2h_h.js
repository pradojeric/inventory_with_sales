import{r as t,j as e,a as p}from"./app-WAcuAQYG.js";import{A as f}from"./AuthenticatedLayout-Lew2t8BI.js";import{A as C,B as U,a as l}from"./Toast-xa_T1Asx.js";import y from"./AddUser-onSsKNrd.js";import N from"./EditUser-pnRZAV5A.js";import"./ApplicationLogo-UB9_MBiy.js";import"./index-izUsY6vX.js";import"./Modal-KXOwnuWY.js";import"./transition-mcgITBB2.js";function B({auth:i,flash:d,users:n}){const[c,o]=t.useState(!1),[x,m]=t.useState(!1),[h,j]=t.useState(),r=()=>{o(s=>s=!s)},a=()=>{m(s=>s=!s)},u=s=>{j(s),a()};return e.jsxs(f,{user:i.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Users"}),children:[e.jsx(p,{title:"Users"}),e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:e.jsx("div",{className:"bg-white overflow-hidden shadow-sm sm:rounded-lg",children:e.jsxs("div",{className:"p-6 text-gray-900 md:w-auto w-screen",children:[d.message&&e.jsx(C,{color:"success",children:d.message}),e.jsx(y,{show:c,onClose:r}),e.jsx(N,{user:h,show:x,onClose:a}),e.jsx("div",{className:"flex justify-end mb-2",children:e.jsx(U,{type:"button",onClick:r,children:"Add User"})}),e.jsx("div",{className:"overflow-auto max-h-96",children:e.jsxs(l,{striped:!0,children:[e.jsxs(l.Head,{className:"top-0 sticky",children:[e.jsx(l.HeadCell,{children:"Name"}),e.jsx(l.HeadCell,{children:"Email"}),e.jsx(l.HeadCell,{children:"Role"}),e.jsx(l.HeadCell,{children:e.jsx("span",{className:"sr-only",children:"Edit"})})]}),e.jsx(l.Body,{className:"divide-y",children:n.map(s=>e.jsxs(l.Row,{children:[e.jsx(l.Cell,{children:s.name}),e.jsx(l.Cell,{children:s.email}),e.jsx(l.Cell,{children:s.role}),e.jsx(l.Cell,{children:e.jsx("button",{type:"button",onClick:()=>{u(s)},className:"font-medium text-cyan-600 hover:underline dark:text-cyan-500",children:"Edit"})})]},s.id))})]})})]})})})})]})}export{B as default};
