

const calculation = (tax,discount,shipping,sub_total)=>{
    let grand_total = 0;
    let calDiscount = discount * sub_total;
    let calTax = tax * sub_total;
    grand_total =Number(sub_total) - Number(calDiscount)  +Number(calTax)  +Number(shipping)  ;
    return grand_total;
}

module.exports = {calculation}