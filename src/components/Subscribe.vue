<template>
  <v-container style="margin-top: 300px; margin-bottom: -250px">
      <v-container grid-list-xl pa-0>

        <v-layout wrap>

          <v-row>
            <v-col style="height: 500px; width: 100%" :align="alignment" :justify="justify">
                <v-divider></v-divider>
                <h1 class="corDoTexto mb-4 mt-5 pa-0">
                  Cadastre seu e-mail
                </h1>
                <p class="corDoTexto">
                  Neste campo, cadastre seu e-mail para receber noticias sobre a plataforma:
                </p>

                <v-layout wrap pa-2>
                  <v-text-field solo hide-details class="textfield mr-4"/>
                  <v-btn class="ma-0" color="error" style="height: 48px">
                    ENVIAR
                  </v-btn>
                </v-layout>
            </v-col>
          </v-row>

          

        </v-layout>

      </v-container>
  </v-container>
</template>

<script>

export default {
  
  data: () => ({
    justify: 'center',
    alignment: 'center',
  })

}
</script>

<style>

.textfield{
  max-width: 100%;
  margin-right: 200px;
}

</style>