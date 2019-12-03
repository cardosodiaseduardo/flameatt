<template>
    <v-layout>


      <v-layout>
          <v-flex>
              <NavigationBar />
          </v-flex>
      </v-layout>

      <v-container>
        <v-layout>
          <v-flex class="PaginaIlumincacaoDeEmergencia">
          


            <v-card class="mb-0" width="100%" height="30px"  color="blue">
              <v-card-title class="ml-1 pa-0">
                <v-icon class="mr-2">highlight</v-icon>
                  Iluminação de Emergência
                </v-card-title>
            </v-card>


              <!-- Painel de cadastro da Descrição da Obra -->
              <v-card style="width: 100%">
                <v-card-title style="color: black" class="ml-1 pa-4">Especificações</v-card-title>

                <v-card-text>
                  <table>
                    <tr>
                      <td>Ambiente</td>
                      <td></td>
                    </tr>
                  </table>
                  <table>
                    <tr>
                      <td>Iluminamento mínimo</td>
                      <td>3</td>
                    </tr>
                  </table>
                  <table>
                    <tr>
                      <td>Luminária</td>
                      <td>LEA 101</td>
                    </tr>
                  </table>
                  <table>
                    <tr>
                      <td>Intensidade Luminosa</td>
                      <td>100 Lumnéns</td>
                    </tr>
                  </table>
                  <table>
                    <tr>
                      <td>Quantidade de Luminárias</td>
                      <td>1 Unid</td>
                    </tr>
                  </table>
                  <table>
                    <tr>
                      <td>Área a ser iluminada</td>
                      <td>122m²</td>
                    </tr>
                  </table>
                  <table>
                    <tr>
                      <td>Iluminamento</td>
                      <td>0,82 Lux</td>
                    </tr>
                  </table>
                  <div style="background-color: red">
                    <span>Não atende o iluminamento, aumente o número de luminárias ou a intensidade luminosa</span>
                  </div>
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

.PaginaIlumincacaoDeEmergencia{
    color: black;
}

</style>