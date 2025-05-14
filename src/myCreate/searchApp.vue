<template>
  <div class="container">
    <div class="row">
      <div class="col-12  justify-content-center">
      <h2 id="title" >RPG Creature Search App</h2>
      <div>
        <form>
          <label for="search-input">Search for Creature Name orID:</label>
          <input type="text" v-model="userInput" id="search-input" required placeholder="Creature Name orID" name="creature-id"/>
          <button type="button" @click='() => getCreatureDetails(userInput)'>Search</button>
        </form>
        <div>
          <div>
            <span>{{ creatureDetails?.name }}</span>
            <span>#{{ creatureDetails?.id }}</span>
            <div id="weight-height">
              <span>Weight: {{ creatureDetails?.weight }}</span>
              <span>Height: {{ creatureDetails?.height }}</span>
            </div>
          </div>
          <div>
            <span>{{}}</span>
          </div>
          <div id="special-area">
            <div>{{creatureDetails.special?.name}}</div>
            <div>{{creatureDetails.special?.description}}</div>
          </div>
        </div>
        <table id="creature-information" v-if="creatureDetails.stats">
          <thead>
            <tr>
              <th>Base</th>
              <th>Stats</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stat,index) in creatureDetails.stats" :key="index">
              <td>{{stat.name}}</td>
              <td>{{stat.base_stat}}</td>
            </tr>
          </tbody>
          
        </table>
      </div>
      </div>
    </div>
  </div>   
</template>

<script setup name="searchApp">
  import axios from 'axios'
  import { ref } from 'vue'

  let creatureDetails = ref({})
  let userInput = ref()
  
  const getCreatureDetails = async () => {
    let userInputNum = parseInt(userInput.value)
    try{
      if(!isNaN(userInputNum)){
        const creatureDetailsData = await axios.get(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${userInputNum}`)
        creatureDetails.value = creatureDetailsData.data
      }else{
        const creatureDetailsData = await axios.get(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${userInput.value}`)
        creatureDetails.value = creatureDetailsData.data
      }
    }catch(error){
      alert("Creature not found")
    }
  }

  
</script>

<style scoped>
.normal {
background-color: #b7b7aa;
}

.fire {
background-color: #ff6f52;
}

.water {
background-color: #42a1ff;
}

.electric {
background-color: #fecc33;
}

.grass {
background-color: #78cc55;
}

.ice {
background-color: #66ccfe;
}

.fighting {
background-color: #d3887e;
}

.poison {
background-color: #c68bb7;
}

.ground {
background-color: #dfba52;
}

.flying {
background-color: #8899ff;
}

.psychic {
background-color: #ff66a3;
}

.bug {
background-color: #aabb23;
}

.rock {
background-color: #baaa66;
}

.ghost {
background-color: #9995d0;
}

.dragon {
background-color: #9e93f1;
}

.dark {
background-color: #b59682;
}

.steel {
background-color: #abaabb;
}

.fairy {
background-color: #ed99ed;
}
</style>