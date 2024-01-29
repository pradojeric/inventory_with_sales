function r(e=0){return"₱"+e.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")}function n(e){return e.replace(/_/g," ")}export{r as formatNumber,n as removeUnderScore};
