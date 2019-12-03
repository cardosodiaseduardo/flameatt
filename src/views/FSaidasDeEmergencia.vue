<template>
    <v-layout>


      <v-layout>
          <v-flex>
              <NavigationBar />
          </v-flex>
      </v-layout>

      <v-container>
        <v-layout>
          <v-flex class="PaginaSaidasDeEmergencia">
          


            <v-card class="mb-0" width="100%" height="30px"  color="blue">
              <v-card-title class="ml-1 pa-0">
                <v-icon class="mr-2">exit_to_app</v-icon>
                  Saídas de Emergência
                </v-card-title>
            </v-card>
          

            <!-- Painel de cadastro da Descrição da Obra -->
            <v-card>
              <v-card-title style="color: black" class="ml-1 pa-4">Especificações</v-card-title>

              <v-card-text>
                <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                  <table>
                    <tr>
                      <td>Dimensionamento das Saídas de Emergência</td>
                      <td colspan="2">NT 11</td>
                    </tr>
                    <tr style="height: 10px">
                      <td>Ocupação do ambiente</td>
                      <td colspan="2">Garagem sem acesso de público e sem abastecimento</td>
                    </tr>
                    <tr style="height: 10px">
                      <td>Divisão</td>
                      <td colspan="2">G-1</td>
                    </tr>
                    <tr style="height: 10px">
                      <td></td>
                      <td colspan="2"></td>
                    </tr>
                    <tr style="height: 10px">
                      <td>Área útil</td>
                      <td colspan="2">100,00m²</td>
                    </tr>
                    <tr style="height: 10px">
                      <td>População por m²</td>
                      <td colspan="2">0,03m²</td>
                    </tr>
                    <tr style="height: 10px">
                      <td>População Total</td>
                      <td colspan="2">2,50</td>
                    </tr>
                    <tr style="height: 20px">
                      <td></td>
                      <td colspan="2"></td>
                    </tr>
                    <tr style="height: 10px">
                      <td>Capacidade da UP - C</td>
                      <td colspan="2">PORTAS</td>
                    </tr>
                    <tr style="height: 10px">
                      <td></td>
                      <td>C =</td>
                      <td>100</td>
                    </tr>
                    <tr style="height: 10px">
                      <td>N</td>
                      <td>1</td>
                      <td>Up's</td>
                    </tr>
                    <tr> style="height: 10px"
                      <td>Saídas existentes</td>
                      <td>0,80</td>
                      <td>m</td>
                    </tr>
                    <tr style="height: 10px">
                      <td>1,45</td>
                      <td colspan="2">Up's</td>
                    </tr>
                  </table>
                  <div style="background-color: green;"><span>ATENDE</span></div>
                </v-form>
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

.PaginaSaidasDeEmergencia{
    color: black;
}

</style>