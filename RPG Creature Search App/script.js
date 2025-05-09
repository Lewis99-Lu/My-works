const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-button')
const creatureName = document.getElementById('creature-name')
const creatureId = document.getElementById('creature-id')
const creatureWeight = document.getElementById('weight')
const creatureHeight = document.getElementById('height')
const creatureTypes = document.getElementById('types')
const creatureSpName = document.getElementById('special-name')
const creatureSpDescription = document.getElementById('special-description')
const creatureInfo = document.getElementsByTagName('td')

const getCreature = async () =>{
    try{
        const resCreatureIdAndName = await fetch('https://rpg-creature-api.freecodecamp.rocks/api/creatures')
        const creatureIdAndName = await resCreatureIdAndName.json()
        await showCreatureInformation(creatureIdAndName,searchInput)
    } catch(err){
    }
}

//獲取生物的詳細資料
const getCreatureInformation = async (idOrName) => {
    const resCreatureDetails = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${idOrName}`)
    const creatureDetails = await resCreatureDetails.json()
    return creatureDetails
}

//顯示生物資訊
const showCreatureInformation = async(creatureArr,userInput) => {
    try{
        let userInputNum = parseInt(userInput.value)
        if(!isNaN(userInputNum)){
            let {id} = creatureArr.find( creature => creature.id === userInputNum )
            const currentCreatureDetails  = await getCreatureInformation(id)
            showMethods(currentCreatureDetails)
        }else{
            console.log(userInput.value)
            let {name} = creatureArr.find( creature => creature.name === userInput.value )
            const currentCreatureDetails  = await getCreatureInformation(name)
            console.log(currentCreatureDetails)
            showMethods(currentCreatureDetails)
        }
    }catch(err){
        alert("Creature not found")
    }
    
}
//顯示基本資料
const showMethods = (currentCreatureDetails) => {
    const {name,id,weight,height,special,stats,types} = currentCreatureDetails
    
    creatureTypes.innerHTML = ``
    creatureName.textContent = name.toUpperCase()
    creatureId.textContent = `#${id}`
    creatureWeight.textContent = `Weight: ${weight}`
    creatureHeight.textContent = `Height: ${height}`
    for ( let type of types){
        creatureTypes.innerHTML += `<span id="${type.name}">${type.name.toUpperCase()}</span>`
    }
    creatureSpName.textContent = special.name
    creatureSpDescription.textContent = special.description
    for( let infoIndex = 0; infoIndex < stats.length; infoIndex++){
        creatureInfo[infoIndex].textContent = stats[infoIndex].base_stat
    }
}

searchBtn.addEventListener('click', () => getCreature())