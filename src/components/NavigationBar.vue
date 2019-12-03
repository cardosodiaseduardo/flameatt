<template>
  <v-container class="pa-0">

          <v-navigation-drawer width="350px" height="100vh" dark v-model="drawer" permanent>
            <v-list>
             


              <router-link to="/projetos">
                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon>list</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Projetos</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </router-link>


              <router-link to="/cadastro">
                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon>account_box</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Cadastro</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </router-link>
              


              <router-link to="/quadrodeareas">
                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon>dashboard</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Quadro de Áreas</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </router-link>



              <router-link to="/classificacao">
                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon>gavel</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Classificação</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </router-link>



              <router-link to="/medidasdeseguranca">
                <v-list-item link>
                  <v-list-item-icon>
                  <v-icon>file_copy</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Medidas de Segurança</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </router-link>



              <router-link to="/cmar">
                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon>local_shipping</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>CMAR</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </router-link>



              <router-link to="/saidasdeemergencia">
                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon>report_problem</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Saídas de Emergência</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </router-link>



              <router-link to="/iluminacaodeemergencia">
                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon>highlight</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Iluminação de Emergência</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </router-link>



              <router-link to="/sinalizacao">
                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon>meeting_room</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Sinalização</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </router-link>



              <router-link to="/extintores">
                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon>fireplace</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Extintores</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </router-link>
          


            </v-list>

            <template v-slot:append>
              <div class="pa-1 mr-1 .d-xl-none">
                <v-btn block @click="deslogar">
                  Sair
                  <v-icon>directions_walk</v-icon>
                </v-btn>
              </div>
            </template>



          </v-navigation-drawer>

  </v-container>
</template>

<script>

  export default {

    data: () => ({
      
      drawer: true

    }),

    methods: {

      deslogar(){

        this.$store.state.logado = false
      }

    }

  }

</script>

<style>

a, div {
  color: white;
  text-decoration: none;

}

.v-list-item__content{
  margin-left: -20px;
}

.v-list-item__title{
  font-family: 20px;
}

.botaoDoMenuLateral{
  margin-left: 21px;
}

</style>