let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];
const cash = document.getElementById('cash')
const purchaseBtn = document.getElementById('purchase-btn')
const changeDue = document.getElementById('change-due')
const showDraw = document.getElementById('show-draw')
const registerHead = document.getElementById('register-head')

registerHead.innerText = `Total: $${price}`

for( let cashInDraw of cid ){
  showDraw.innerHTML += `<br/>${cashInDraw[0]}: $${cashInDraw[1]}`
}

class Register {
  constructor(drawerCash,itemPrice,customCash) {
    this.drawerCash = drawerCash
    this.price = itemPrice
    this.customCash = customCash
  }

  cashLessPrice(){
    alert('Customer does not have enough money to purchase the item')
  }

  cashEqualPrice(){
    changeDue.style.display = 'block'
    changeDue.textContent = "No change due - customer paid with exact cash"
  }

  cashGreaterPrice(customCash){
    const returnCashArray = []
    let returnCash = Math.round(customCash - this.price) * 100 / 100
    const cashMultiplier = [ 100, 20, 10,5, 1, 0.25, 0.1, 0.05, 0.01 ]
    const useDrawCash = this.drawerCash.toReversed()
    //把幣值加入到對應的陣列裡
    for(let drawIndex = 0; drawIndex < useDrawCash.length; drawIndex++){
      if(useDrawCash[drawIndex].length === 2){
        useDrawCash[drawIndex].push(cashMultiplier[drawIndex])
      }else if(useDrawCash[drawIndex].length > 2){
        continue
      }
    } 
    //判定是否有錢可以找
    let drawCashTotal = 0
    for( let cash of useDrawCash ){
      drawCashTotal += cash[1]
    }
    drawCashTotal = Math.round(drawCashTotal * 100) / 100;
    if(drawCashTotal < returnCash){
      this.cidLessCd()
    }else if(drawCashTotal > returnCash){
      this.cidGreatCd(returnCashArray, returnCash, useDrawCash)
    }else if(drawCashTotal === returnCash){
      this.cidEqualCd(returnCash, useDrawCash)
    }
  }

  cidGreatCd(returnCashArray, returnCash, useDrawCash){
    for(let [cashName, cashTotal, CashValue] of useDrawCash){
      // 只要可找零且抽屜中還有此面額的錢
      while(returnCash >= CashValue && cashTotal >= CashValue){
        let returnCashNameIndex = returnCashArray.findIndex(item => item[0] === cashName)

        if(returnCashNameIndex === -1){
          returnCashArray.push([cashName, CashValue])
        }else{
          returnCashArray[returnCashNameIndex][1] += CashValue
        }
        console.log(returnCashArray)
        returnCash = Math.round((returnCash - CashValue) * 100) / 100
        
        cashTotal = Math.round((cashTotal - CashValue) * 100) / 100
      }
    }

    changeDue.style.display = 'block'
    changeDue.innerHTML = 'Status: OPEN'
    for( let cashReturnCustom of returnCashArray ){
      changeDue.innerHTML += `<br/>${cashReturnCustom[0]}: $${cashReturnCustom[1]}`
    }

    this.updateDrawText(useDrawCash)
  }

  cidEqualCd(returnCash, useDrawCash){
    const sameValueIndex = useDrawCash.findIndex( item => item[2] === returnCash )
    changeDue.style.display = 'block'
    changeDue.innerHTML = `Status: CLOSED : ${useDrawCash[sameValueIndex][0]}: $${useDrawCash[sameValueIndex][2]}`
  }

  cidLessCd(){
    changeDue.style.display = 'block'
    changeDue.innerHTML = "Status: INSUFFICIENT_FUNDS"
  }

  updateDrawText(useDrawCash){
    const copyUserDraw = useDrawCash.toReversed()
    showDraw.innerHTML = `Change in drawer:`
    for(let everyCash of copyUserDraw){
      showDraw.innerHTML += `<br/>${everyCash[0]}: $${everyCash[1]}`
    }
  }

  checkPrice(){  
    //在class內獲取cash的值，每次執行checkPrice會更新cash的值
    const customCash = parseFloat(this.customCash.value)
    if(customCash < this.price){
      this.cashLessPrice()
      return
    }else if( customCash === this.price){
      this.cashEqualPrice()
      return
    }else{
      this.cashGreaterPrice(customCash)   
    }
  }

}

const register = new Register(cid,price,cash)
//防止輸入e
cash.addEventListener('keydown',(event) => {
  if(event.key === 'e'){
  event.preventDefault()
  }else if(event.key === 'Enter'){
    register.checkPrice()
  }
})

purchaseBtn.addEventListener('click', ()=> register.checkPrice())