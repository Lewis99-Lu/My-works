let price = 19.5;
let cid = [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];
const currencies = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100]
const currenciesName = ['Pennies', 'Nickels', 'Dimes', 'Quarters', 'Ones', 'Fives', 'Tens', 'Twenties', 'Hundreds']
const cash = document.getElementById('cash')
const purchaseBtn = document.getElementById('purchase-btn')
const changeDue = document.getElementById('change-due')
const showDraw = document.getElementById('show-draw')
const registerHead = document.getElementById('register-head')

registerHead.innerText = `Total: $${price}`

//加入幣值
for(let currencyIndex = 0; currencyIndex < currencies.length; currencyIndex++){
  cid[currencyIndex].push(currencies[currencyIndex])
}

class Register {
  constructor(drawerCash,itemPrice,customCash,currenciesName) {
    this.drawerCash = drawerCash
    this.itemPrice = itemPrice
    this.customCash = customCash
    this.currenciesName = currenciesName
  }
  //付款不足的情況
  cashLessPrice(){
    alert('Customer does not have enough money to purchase the item')
  }
  //不須找錢的情況
  cashEqualPrice(){
    changeDue.style.display = 'block'
    changeDue.textContent = "No change due - customer paid with exact cash"
  }
  //要找錢的情況
  cashGreaterPrice(customCash){
    let change = (Math.round(customCash * 100) - Math.round(this.itemPrice * 100))/100
    let totalDrawerCash = this.drawerCash.reduce((total,[, cash,]) => total + cash,0)
    //收銀機的錢不夠找
    if(totalDrawerCash < change){
      this.cidLessChange()
    }
    //收銀機的錢剛好等於找的錢
    if(totalDrawerCash === change){
      let sameValueIndex = -1
      //如果有剛好相同幣值
      if(sameValueIndex !== -1){
        this.cidEqualChange(sameValueIndex)
      }
      //不同幣值
      else{
        this.cidGreaterChange(change)
      }
    }
    //如果收銀機的錢大於找的錢
    if(totalDrawerCash > change){
      this.cidGreaterChange(change)
    }
  }

  cidEqualChange(sameValueIndex){
    changeDue.style.display = 'block'
    changeDue.innerHTML = `Status: CLOSED ${this.drawerCash[sameValueIndex][0]}: $${this.drawerCash[sameValueIndex][1]}`
  }

  cidLessChange(){
    changeDue.style.display = 'block'
    changeDue.innerHTML = "Status: INSUFFICIENT_FUNDS"
  }

  cidGreaterChange(change){
    let changeArr = []
    const drawerCashReverse = this.drawerCash.toReversed()
    for(let cash of drawerCashReverse){
      let [cashName, cashTotal, cashValue] = cash
      let originCashIndex = this.drawerCash.findIndex((cash) => cash[0] === cashName)
      // //如果當前幣值小於等於找錢以及當前現金總值還有現金，才用當前幣值找錢
      //未完成需修改
      while(change >= cashValue && cashTotal > 0){
        let exitCash = changeArr.findIndex((changeCash) => changeCash[0] === cashName)
        if(exitCash === -1 && cashTotal > change){
          alert(1)
          changeArr.push([cashName, cashValue])
          // cashTotal = Math.round((cashTotal - cashValue) * 100) / 100;
          // change = (Math.round(change * 100) - Math.round(cashValue * 100)) / 100
          // this.drawerCash[originCashIndex][1] = (Math.round(this.drawerCash[originCashIndex][1] * 100) - Math.round(cashValue * 100)) / 100
        }
        if(exitCash >= 0){
          alert(2)
          changeArr[exitCash][1] = (Math.round(changeArr[exitCash][1] * 100) + Math.round(cashValue * 100)) / 100
          // cashTotal = Math.round((cashTotal - cashValue) * 100) / 100;
          // change = (Math.round(change * 100) - Math.round(cashValue * 100)) / 100
          // this.drawerCash[originCashIndex][1] = (Math.round(this.drawerCash[originCashIndex][1] * 100) - Math.round(cashValue * 100)) / 100
        }
        console.log(cashTotal ,"抽屜裡的錢原來")
        console.log(change,"原本換錢")
        console.log(cashTotal ,"抽屜裡的錢後來")
        console.log(change,"後來換錢")
      }
    }
    if(change !== 0){
      this.cidLessChange()
      this.updateCid()
      return
    }
    this.updateCid()
    changeDue.style.display = 'block'
    changeDue.innerHTML = `Status: OPEN `
    for(let [cashName, cashValue] of changeArr){
      changeDue.innerHTML += `<br>${cashName}: $${cashValue}`
    }
  }

  updateCid(){
    showDraw.innerHTML = ``
    for(let cashIndex = 0; cashIndex < this.drawerCash.length; cashIndex++){
    showDraw.innerHTML += `<br/>${this.currenciesName[cashIndex]}: $${this.drawerCash[cashIndex][1]}`
  }
  }
  

  checkPrice(){  
    //在class內獲取cash的值，每次執行checkPrice會更新cash的值
    let customCash = parseFloat(this.customCash.value)
    
    if(customCash < this.itemPrice){
      this.cashLessPrice()
      return
    }else if( customCash === this.itemPrice){
      this.cashEqualPrice()
      return
    }else{
      this.cashGreaterPrice(customCash)   
    }
  }
}

const register = new Register(cid,price,cash,currenciesName)
register.updateCid()
//防止輸入e
cash.addEventListener('keydown',(event) => {
  if(event.key === 'e'){
  event.preventDefault() 
  } 
  if(event.key === 'Enter'){
    register.checkPrice()
  }
})

purchaseBtn.addEventListener('click', () => register.checkPrice())