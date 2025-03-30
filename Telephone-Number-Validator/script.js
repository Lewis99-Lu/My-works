const userInput = document.getElementById('user-input')
const result = document.getElementById('results-div')
const checkBtn = document.getElementById('check-btn')
const clearBtn = document.getElementById('clear-btn')

const checkFun = (input) => {
    //1 555-555-5555
    // const checkRegex = /^1\s\d{3}-\d{3}-\d{4}$/g

    //1 (555) 555-5555
    //const checkRegex =/^1\s\(\d{3}\)\s\d{3}-\d{4}$/g

    //1(555)555-5555
    //const checkRegex =/^1\(\d{3}\)\d{3}-\d{4}$/g

    //1 555 555 5555
    // const checkRegex =/^1\s\d{3}\s\d{3}\s\d{4$}/g

    //555-555-5555
    // const checkRegex =/^\d{3}-\d{3}-\d{4}$/g

    //(555)555-5555
    // const checkRegex =/^\(\d{3}\)\d{3}-\d{4}/g

    //5555555555
    // const checkRegex =/^\d{10}$/g
    const checkRegex = /^1?\s?(\(\d{3}\)|(\d{3}))[-\s]?(\d{3}[-\s]?\d{4})$/g
    if(input.value === ''){
        alert("Please provide a phone number")
        return
    }
    if( checkRegex.test(input.value)){
        result.style = 'inline'
        result.textContent = `Valid US number: ${input.value}`
        return
    }else{
        
        result.style = 'inline'
        result.textContent = `Invalid US number: ${input.value}`
        return
    }
}

clearBtn.addEventListener('click',()=>{
    userInput.value = ''
    result.textContent = ''
})

checkBtn.addEventListener('click',()=>checkFun(userInput))