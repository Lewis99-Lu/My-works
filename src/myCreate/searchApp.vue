<template>
  <div class="container">
    <div class="row" style="width: 400px">
      <div class="col border border-3 rounded p-2 bg-light">
        <div>
          <h2 id="title" class="mb-3 text-center">RPG Creature Search App</h2>
          <form class="form-floating mb-3">
            <input type="text" class="form-control mb-2 text-center" id="floatingInput" v-model="userInput" required placeholder="Creature Name orID" name="creature-id"/>
            <label for="floatingInput">Search for Creature Name or ID:</label>
            <button type="button" class="btn btn-success" @click='getCreatureDetails'>Search</button>
          </form>
          <div class="mb-3">
            <div class="mb-2">
              <span class="h5 me-1">{{ creatureDetails?.name }}</span>
              <span v-show="creatureDetails" class="h6">#{{ creatureDetails.id }}</span>
            <div>
              <span class="me-2 h6">Weight: {{ creatureDetails?.weight }}</span>
              <span class="h6">Height: {{ creatureDetails?.height }}</span>
            </div>
          </div>
          <div class="mb-2">
            <span v-for="(type,index) in creatureDetails.types" :key="index" class="me-2 p-1 rounded" :id="type.name">{{type.name}}</span>
          </div>
          <div>
            <div class="h6">{{ creatureDetails.special?.name }}</div>
            <div class="text-wrap">{{ creatureDetails.special?.description }}</div>
          </div>
          </div>
          <table class="text-center m-auto table table-info table-bordered">
            <thead>
            <tr>
              <th class="h5">Base</th>
              <th class="h5">Stats</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(stat,index) in creatureDetails.stats" :key="index">
              <td class="h6 text-capitalize">{{ stat.name }}</td>
              <td>{{ stat.base_stat }}</td>
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
  let input = ref()
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
#normal {
background-color: #b7b7aa;
}

#fire {
background-color: #ff6f52;
}

#water {
background-color: #42a1ff;
}

#electric {
background-color: #fecc33;
}

#grass {
background-color: #78cc55;
}

#ice {
background-color: #66ccfe;
}

#fighting {
background-color: #d3887e;
}

#poison {
background-color: #c68bb7;
}

#ground {
background-color: #dfba52;
}

#flying {
background-color: #8899ff;
}

#psychic {
background-color: #ff66a3;
}

#bug {
background-color: #aabb23;
}

#rock {
background-color: #baaa66;
}

#ghost {
background-color: #9995d0;
}

#dragon {
background-color: #9e93f1;
}

#dark {
background-color: #b59682;
}

#steel {
background-color: #abaabb;
}

#fairy {
background-color: #ed99ed;
}
</style>