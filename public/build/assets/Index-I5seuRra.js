import{r as t,j as e,a as S,y as w}from"./app-WAcuAQYG.js";import{A as k}from"./AuthenticatedLayout-Lew2t8BI.js";import{c as x,A,L as h,T as j,B as P,d as _,a as s}from"./Toast-xa_T1Asx.js";import{b as T}from"./index-izUsY6vX.js";import D from"./Payment-MjEZEMDj.js";import{formatNumber as u}from"./Util-py14zHy8.js";import"./ApplicationLogo-UB9_MBiy.js";import"./Modal-KXOwnuWY.js";import"./transition-mcgITBB2.js";function z({auth:p,flash:r,sales:d,inputs:o}){const[a,n]=t.useState({from:o.from,to:o.to}),[C,f]=t.useState(!1),[v,y]=t.useState(null),[c,i]=t.useState(!1),m=()=>{f(l=>l=!l)},N=l=>{y(l),m()},b=()=>{w.reload({data:{from:a.from,to:a.to},only:["sales"],onStart:()=>{i(!0)},onProgress:l=>{console.log(l)},onSuccess:()=>{i(!1)}})},H=()=>d.reduce((l,g)=>l+g.total_amount,0);return e.jsxs(k,{user:p.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Receivables"}),children:[e.jsx(S,{title:"Sales"}),e.jsx(D,{sale:v,show:C,onClose:m}),e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:e.jsx("div",{className:"bg-white overflow-hidden shadow-sm sm:rounded-lg",children:e.jsxs("div",{className:"p-6 text-gray-900 md:w-auto w-screen",children:[e.jsx(x,{"aria-label":"Default breadcrumb example",children:e.jsx(x.Item,{href:route("sales.index"),icon:T,children:"Receivables"})}),r.message&&e.jsx(A,{color:"success",children:r.message}),e.jsx("div",{className:"mb-2",children:e.jsxs("div",{className:"flex flex-col md:flex-row md:space-x-2 space-y-2 md:items-end",children:[e.jsxs("div",{className:"",children:[e.jsx("div",{className:"block",children:e.jsx(h,{htmlFor:"from",value:"From"})}),e.jsx(j,{id:"from",value:a.from,onChange:l=>{n({...a,from:l.target.value})},type:"date"})]}),e.jsxs("div",{className:"",children:[e.jsx("div",{className:"block",children:e.jsx(h,{htmlFor:"to",value:"To"})}),e.jsx(j,{id:"to",value:a.to,onChange:l=>{n({...a,to:l.target.value})},type:"date"})]}),e.jsx("div",{children:e.jsx(P,{type:"button",onClick:b,children:"Filter"})})]})}),c&&e.jsx(_,{}),!c&&e.jsx("div",{className:"overflow-auto max-h-96",children:e.jsxs(s,{striped:!0,children:[e.jsxs(s.Head,{className:"sticky top-0",children:[e.jsx(s.HeadCell,{children:"Order #"}),e.jsx(s.HeadCell,{children:"Customer Name"}),e.jsx(s.HeadCell,{children:"Sale Date"}),e.jsx(s.HeadCell,{children:"Total Amount"}),e.jsx(s.HeadCell,{children:"Due Date"}),e.jsx(s.HeadCell,{children:"Created At"}),e.jsx(s.HeadCell,{children:e.jsx("span",{className:"sr-only",children:"View"})})]}),e.jsx(s.Body,{className:"divide-y",children:d.map(l=>e.jsxs(s.Row,{children:[e.jsx(s.Cell,{children:l.order_no}),e.jsx(s.Cell,{children:l.customer_name}),e.jsx(s.Cell,{children:l.sale_date}),e.jsx(s.Cell,{children:u(l.total_amount)}),e.jsx(s.Cell,{children:l.due_date}),e.jsx(s.Cell,{children:l.created_at}),e.jsx(s.Cell,{children:!l.paid&&e.jsx("button",{type:"button",onClick:()=>{N(l)},className:"font-medium text-cyan-600 hover:underline dark:text-cyan-500",children:"Paid"})})]},l.id))}),e.jsxs(s.Head,{className:"sticky bottom-0",children:[e.jsx(s.HeadCell,{}),e.jsx(s.HeadCell,{}),e.jsx(s.HeadCell,{children:"Total Amount:"}),e.jsx(s.HeadCell,{className:"text-base",children:u(H())}),e.jsx(s.HeadCell,{}),e.jsx(s.HeadCell,{}),e.jsx(s.HeadCell,{children:e.jsx("span",{className:"sr-only",children:"View"})})]})]})})]})})})})]})}export{z as default};
