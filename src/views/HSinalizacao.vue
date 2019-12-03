<template>
    <v-layout>


      <v-layout>
          <v-flex>
              <NavigationBar />
          </v-flex>
      </v-layout>

      <v-container>
        <v-layout>
          <v-flex class="PaginaSinalizacao">
                


            <v-card class="mb-0" width="100%" height="30px"  color="blue">
              <v-card-title class="ml-1 pa-0">
                <v-icon class="mr-2">report_problem</v-icon>
                  Sinalização de Emergência
                </v-card-title>
            </v-card>
            <v-card style="width: 100%">
              <v-card-title style="color: black" class="ml-1 pa-4">Especificações</v-card-title>
              <v-card-text>
                <table>
                  <tr>
                    <td>DISTÂNCIA MÁXIMA DE VISIBILIDADE</td>
                    <td>16 m</td>
                  </tr>
                </table>
                <table class="mt-4">
                  <tr>
                    <td>Sinalização de proibição</td>
                    <td>CIRCULAR</td>
                    <td>D =</td>
                    <td>404 mm</td>
                  </tr>
                </table>
                <table class="mt-4">
                  <tr>
                    <td>Sinalização de Alerta</td>
                    <td>TRIANGULAR</td>
                    <td>L =</td>
                    <td>612 mm</td>
                  </tr>
                </table>
                <table class="mt-4">
                  <tr>
                    <td>Sinalização de Orientação, Salvamento e Equipamentos</td>
                    <td>QUADRADA</td>
                    <td>L =</td>
                    <td>358 mm</td>
                  </tr>
                  <tr>
                    <td>Sinalização de Orientação, Salvamento e Equipamentos</td>
                    <td>RETANGULAR</td>
                    <td>H =</td>
                    <td>253 mm</td>
                  </tr>
                  <tr>
                    <td>Sinalização de Orientação, Salvamento e Equipamentos</td>
                    <td>RETANGULAR</td>
                    <td>L =</td>
                    <td>506 mm</td>
                  </tr>
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

.PaginaSinalizacao{
    color: black;
}

</style>