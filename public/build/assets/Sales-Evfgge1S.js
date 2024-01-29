import{r as l,y as k,j as e,a as H}from"./app-vmYIqMbQ.js";import{A as R}from"./AuthenticatedLayout-pXQgv0fp.js";import{A as _,B as y,d as A,a as t,L as i,T as c,S as E}from"./Toast-lSqrY-Ki.js";import{formatNumber as n}from"./Util-py14zHy8.js";import"./ApplicationLogo-Zi-FhwKp.js";import"./index-HWNWORzS.js";function I({auth:C,flash:p,categories:S,sales:d}){const D=["All","Daily","Monthly","Yearly","Custom"],[o,m]=l.useState(),[u,g]=l.useState(),[j,b]=l.useState(),[h,v]=l.useState(),[r,w]=l.useState(0),[N,f]=l.useState(!1);l.useEffect(()=>{m(new Date().toISOString().split("T")[0]),g(new Date().toISOString().split("T")[0]),b(new Date().getMonth()),v(new Date().getFullYear())},[]),l.useEffect(()=>{F()},[o,u,r,j,h]);const F=()=>{k.reload({data:{date:o,endDate:u,selectedReport:r,month:j,year:h},onStart:()=>{f(!0)},onProgress:s=>{console.log(s)},onFinish:()=>{f(!1)}})},T=()=>{if(r==1)return e.jsxs("div",{className:"mb-2 ",children:[e.jsx("div",{className:"block",children:e.jsx(i,{htmlFor:"date",value:"Date"})}),e.jsx(c,{id:"date",value:o,onChange:s=>{m(s.target.value)},type:"date"})]});if(r==2){const s=["January","February","March","April","May","June","July","August","September","October","November","December"];return e.jsxs("div",{className:"block",children:[e.jsxs("div",{children:[e.jsx("div",{className:"block",children:e.jsx(i,{htmlFor:"month",value:"Month"})}),e.jsx(E,{id:"month",value:j,onChange:a=>{b(a.target.value)},type:"date",children:s.map((a,x)=>e.jsx("option",{value:x,children:a},x))})]}),e.jsxs("div",{children:[e.jsx("div",{className:"block",children:e.jsx(i,{htmlFor:"year",value:"Year"})}),e.jsx(c,{id:"year",value:h,onChange:a=>{v(a.target.value)}})]})]})}if(r==3)return e.jsxs("div",{className:"mb-2 ",children:[e.jsx("div",{className:"block",children:e.jsx(i,{htmlFor:"year",value:"Year"})}),e.jsx(c,{id:"year",value:h,onChange:s=>{v(s.target.value)}})]});if(r==4)return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"mb-2 ",children:[e.jsx("div",{className:"block",children:e.jsx(i,{htmlFor:"date",value:"Date"})}),e.jsx(c,{id:"date",value:o,onChange:s=>{m(s.target.value)},type:"date"})]}),e.jsxs("div",{className:"mb-2 ",children:[e.jsx("div",{className:"block",children:e.jsx(i,{htmlFor:"endDate",value:"End Date"})}),e.jsx(c,{id:"endDate",value:u,onChange:s=>{g(s.target.value)},type:"date"})]})]})};return e.jsxs(R,{user:C.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Sales Report"}),children:[e.jsx(H,{title:"Reports"}),e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:e.jsx("div",{className:"bg-white overflow-hidden shadow-sm sm:rounded-lg h-[70vh] overflow-y-visible",children:e.jsxs("div",{className:"p-6 text-gray-900",children:[p.message&&e.jsx(_,{color:"success",children:p.message}),e.jsxs("div",{className:"sticky top-0 bg-white z-10",children:[e.jsx("div",{className:"flex justify-end",children:e.jsx(y.Group,{children:D.map((s,a)=>e.jsx(y,{onClick:()=>{w(a)},color:r==a?"blue":"info",children:s},"H"+a))})}),T()]}),e.jsx("hr",{}),N&&e.jsx("div",{className:"flex justify-center",children:e.jsx(A,{className:"h-24 w-24"})}),!N&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"grid grid-cols-2 gap-4 pt-2",children:S.map(s=>e.jsxs("div",{className:"mb-5",children:[s.name,e.jsxs(t,{striped:!0,children:[e.jsxs(t.Head,{children:[e.jsx(t.HeadCell,{children:"Product"}),e.jsx(t.HeadCell,{children:"Qty"}),e.jsx(t.HeadCell,{children:"Gross"})]}),e.jsx(t.Body,{children:s.products.map((a,x)=>e.jsxs(t.Row,{className:"text-xs",children:[e.jsx(t.Cell,{children:a.product_name}),e.jsx(t.Cell,{children:a.quantity}),e.jsx(t.Cell,{children:n(a.total_price)})]},"prod"+x))}),e.jsxs(t.Head,{children:[e.jsx(t.HeadCell,{children:"Total"}),e.jsx(t.HeadCell,{children:s.total_quantity}),e.jsx(t.HeadCell,{children:n(s.total_price)})]})]})]},s.id))}),e.jsx("hr",{}),e.jsxs("div",{className:"mt-2",children:[e.jsx("h3",{className:"text-lg font-semibold uppercase",children:"Summary"}),e.jsx("div",{children:"Total Cash: "+n(d.total_cash)}),e.jsx("div",{children:"Total GCash: "+n(d.total_gcash)}),e.jsx("div",{children:"Total Cheque: "+n(d.total_cheque)}),e.jsx("div",{children:"Total Account Receivable: ("+n(d.total_receivable)+")"}),e.jsx("div",{className:"font-bold text-lg",children:"Total Sales: "+n(d.total_price)})]})]})]})})})})]})}export{I as default};
