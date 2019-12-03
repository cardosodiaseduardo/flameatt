<template>
    <v-layout>


      <v-layout>
          <v-flex>
              <NavigationBar />
          </v-flex>
      </v-layout>

      <v-container>
        <v-layout>
          <v-flex class="PaginaCMAR">
            




          <v-card class="mb-0" width="100%" height="30px"  color="blue">
            <v-card-title class="ml-1 pa-0">
              <v-icon class="mr-2">dns</v-icon>
                Grupo/Divisão
              </v-card-title>
          </v-card>
            <v-card style="width: 100%">

              <v-card-text>
                <table style="margin-left: auto; margin-right: auto; color: black">
                  <tr>
                    <td style="width: 150px">Grupo/Divisão</td>
                    <td style="width: 200px">Piso (Acabamento/Revestimento)</td>
                    <td style="width: 200px">Parede e Divisória(Acabamento/Revestimento)</td>
                    <td style="width: 200px">Teto e Forro(Acabamento/Revestimento)</td>
                  </tr>
                </table>
                <table class="mt-4">
                  <tr>
                    <td style="width: 150px">A</td>
                    <td style="width: 200px">Classe I, II-A, III-A, IV-A ou V-A7</td>
                    <td style="width: 200px">Classe I, II-A, III-A, IV-A ou V-A</td>
                    <td style="width: 200px">Classe I, II-A ou III-A</td>
                  </tr>
                </table>
              </v-card-text>
            </v-card>

            

            <!-- Painel de cadastro dos dados da Altura -->
            <v-card class="mb-0 mt-5" width="100%" height="30px"  color="blue">
              <v-card-title class="ml-1 pa-0">
              <v-icon class="mr-2">horizontal_split</v-icon>
                Piso
              </v-card-title>
            </v-card>
            <v-card style="width: 100%">
              <v-card-text>
                <table>
                  <tr>
                    <td style="width: 30%">MATERIAL UTILIZADO OU SIMILAR</td>
                    <td style="background-color: lightgray; width: 60%">Pedras e Concreto</td>
                    <td style="width: 10%">Classe I</td>
                  </tr>
                </table>
              </v-card-text>
            </v-card>



            <!-- Painel de cadastro dos dados da Carga de Incêndios -->
            <v-card class="mb-0 mt-5" width="100%" height="30px"  color="blue">
              <v-card-title class="ml-1 pa-0">
                <v-icon class="mr-2">waves</v-icon>
                  Parede
              </v-card-title>
            </v-card>
            <v-card style="width: 100%">
              <v-card-text>
                <table>
                  <tr>
                    <td style="width: 30%">MATERIAL UTILIZADO OU SIMILAR</td>
                    <td style="background-color: lightgray; width: 60%">Cerâmicas, Alvenaria, metal, bloco de concreto, lã de vidro</td>
                    <td style="width: 10%">Classe I</td>
                  </tr>
                </table>
              </v-card-text>
            </v-card>


            <!-- Painel de cadastro dos dados da Carga de Incêndios -->
            <v-card class="mb-0 mt-5" width="100%" height="30px"  color="blue">
              <v-card-title class="ml-1 pa-0">
                <v-icon class="mr-2">turned_in_not</v-icon>
                  Teto/Forro
              </v-card-title>
            </v-card>
            <v-card>
              <v-card-text>
                <table>
                  <tr>
                    <td style="width: 30%">MATERIAL UTILIZADO OU SIMILAR</td>
                    <td style="background-color: lightgray; width: 60%">Lã de vidro, telhas cerâmicas, metálicas, placas cimentícias</td>
                    <td style="width: 10%">Classe I</td>
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

.PaginaCMAR{
    color: black;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

</style>