export function formatNumber(number = 0) {
    return "₱" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

export function removeUnderScore(origString) {
    return origString.replace(/_/g, " ");
}
