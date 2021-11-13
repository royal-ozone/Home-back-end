
 const {
    getDiscountCodeById
 } = require('../models/discountCode')

const calculation = (tax,discount,shipping,sub_total)=>{
    let grand_total = 0;
    let calDiscount = discount * sub_total;
    let calTax = tax * sub_total;
    grand_total =Number(sub_total) - Number(calDiscount)  +Number(calTax)  +Number(shipping)  ;
    return grand_total;
}


const timer =  (year,month,day,hour,minute,second)=>{
    let currentDate = new Date()
    let timerDate = new Date(`${month} ${day} ${year} ${hour}:${minute}:${second}`)
    let different = (timerDate-currentDate);
    let d = Math.floor(different/1000/60/60/24);
    let h = Math.floor((different/1000/60/60)%24);
    let m = Math.floor((different/1000/60)%60);
    let s = Math.floor((different/1000)%60);
    if(d==0 && h==0  && m==0  && s==0 ){
        clearInterval(myTimer)
        console.log('the time is expired ')
        let response={
            day:d,
            hour:h,
            min:m,
            sec:s,
            active:false
        }
       
        return response;
    }else{
        if(!d && !h && !m && !s){
            let response={
                message: 'please enter tha completed time'
            };
            return response;
        }
        let response={
            day:d,
            hour:h,
            min:m,
            sec:s,
            active:true
        }
        return response;
    }
    
}

 const myTimer = (year, month, hour,day,minute,second)=>{
    // let {year, month, hour,day,minute,second} = data;
    let ahmad2={...ahmad,['year']:year,['month']:month,['hour']:hour,['day']:day,['minute']:minute,['second']:second}
     console.log(ahmad2);
     console.log(ahmad)
     if(year&&month&&hour&&day){
         console.log('2222222222222222222')
        
         timer(ahmad2.year,ahmad2.month,ahmad2.hour,ahmad2.day,ahmad2.minute,ahmad2.second);

         setInterval(timer,1000)
    }
    ahmad3.push(ahmad2);
 }

    
    





module.exports = {
    calculation,
    timer,
    myTimer,
}