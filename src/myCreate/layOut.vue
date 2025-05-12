<template>
  <div class="container">
    <div class="row">
      <div id='outer' class="col-18">
      <h2 id="title" >RPG Creature Search App</h2>
      <div id="main-area">
        <form id="search-area">
          <label for="search-input">Search for Creature Name or ID:</label>
          <input type="text"  id="search-input"  required  placeholder="Creature Name or ID"  name="creature-id"/>
          <button type="button">Search</button>
        </form>
        <div id="show-area">
          <div id="basic-information">
            <span id="creature-name"></span>
            <span id="creature-id"></span>
            <div id="weight-height">
              <span id="weight">Weight: </span>
              <span id="height">Height: </span>
            </div>
          </div>
          <div id="types">
            <span></span>
          </div>
          <div id="special-area">
            <div id="special-name"></div>
            <div id="special-description"></div>
          </div>
        </div>
        <table id="creature-information">
          <tr>
            <th>Base</th>
            <th>Stats</th>
          </tr>
          <tr>
            <th>HP:</th>
            <td></td>
          </tr>
          <tr>
            <th>Attack:</th>
            <td></td>
          </tr>
          <tr>
            <th>Defense:</th>
            <td></td>
          </tr>
          <tr>
            <th>Sp. Attack:</th>
            <td></td>
          </tr>
          <tr>
            <th>Sp. Defense:</th>
            <td></td>
          </tr>
          <tr>
            <th>Speed:</th>
            <td></td>
          </tr>
        </table>
      </div>
      </div>
    </div>
  </div>   
</template>

<script setup name="layOut">
</script>

<style scoped>
  #outer{
    background-color: rgb(155, 155, 190);
  }

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