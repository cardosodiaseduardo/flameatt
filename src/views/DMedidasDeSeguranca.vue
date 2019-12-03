<template>
  <v-layout>


    <v-layout>
        <v-flex>
            <NavigationBar />
        </v-flex>
    </v-layout>










    <v-container>
      <v-layout>
        <v-flex>
          



          <v-card class="mb-0" width="100%" height="30px"  color="blue">
            <v-card-title class="ml-1 pa-0">
              <v-icon class="mr-2">security</v-icon>
                Medidas de Segurança
              </v-card-title>
          </v-card>
          

            <!-- Painel de cadastro da Descrição da Obra -->
            <v-card style="width: 100%">
              <v-card-title style="color: black" class="ml-1 pa-4">Especificações</v-card-title>

              <v-card-text>
                <v-form ref="form" v-model="valid" :lazy-validation="lazy">

                  <v-text-field class="paddingFoward" v-model="cnpj" :rules="nameRules" label="Ocupação" placeholder="Ex.: Residencial" required></v-text-field>
                  <v-text-field class="paddingFoward mt-5" v-model="cnpj" :rules="nameRules" label="Grupo" placeholder="Ex.: A" required></v-text-field>
                  <v-text-field class="paddingFoward mt-5" v-model="cnpj" :rules="nameRules" label="Divisão" placeholder="Ex.: A-3" required></v-text-field>
                  <v-text-field class="paddingFoward mt-5" v-model="cnpj" :rules="nameRules" label="Área" placeholder="Ex.: 920 m²" required></v-text-field>
                  <v-text-field class="paddingFoward mt-5" v-model="cnpj" :rules="nameRules" label="Altura" placeholder="Ex.: H<6" required></v-text-field>

                  <v-card class="mt-5 pb-4">
                    <v-card-title style="color: black;">Resultados</v-card-title>
                    <span class="ml-4">Resultados apresentados</span>
                  </v-card>

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

.PaginaMedidasDeSeguranca{
    color: black;
}

</style>