<template>
    <v-layout>


      <v-layout>
          <v-flex>
              <NavigationBar />
          </v-flex>
      </v-layout>

      <v-container>
        <v-layout>
          <v-flex class="PaginaExtintores">



            <v-card class="mb-0" width="100%" height="30px"  color="blue">
              <v-card-title class="ml-1 pa-0">
                <v-icon class="mr-2">fireplace</v-icon>
                  Cálculo de Extintores
                </v-card-title>
            </v-card>
            <v-card style="width: 100%">
              <v-card-title style="color: black" class="ml-1 pa-4">Especificações</v-card-title>

              <v-card-text>
                <table>
                  <td>Risco</td>
                  <td>MÉDIO</td>
                </table>
              </v-card-text>
            </v-card>






          </v-flex>
        </v-layout>
      </v-container>

    </v-layout>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'


  export default {

    components: {
        NavigationBar
    },

  }

</script>

<style>

.PaginaExtintores{
    color: black;
}

</style>