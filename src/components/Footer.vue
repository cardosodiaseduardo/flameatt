<template>
  <v-card style="margin-bottom: 0px; margin-top: 550px">
    <v-footer :padless="padless" absolute>
      
      <v-card flat tile width="100%" class="red lighten-1 text-center">


        <v-row>
          <v-col>
            <v-row :align="alignment" :justify="justify">
              <v-card-text flex>
                <v-btn class="mx-4" icon>
                  <v-icon style="color: white" size="24px">home</v-icon>
                </v-btn>
                <v-btn class="mx-4" icon>
                  <v-icon style="color: white" size="24px">mail</v-icon>
                </v-btn>
                <v-btn class="mx-4" icon>
                  <v-icon style="color: white" size="24px">event</v-icon>
                </v-btn>
                <v-btn class="mx-4" icon>
                  <v-icon style="color: white" size="24px">delete</v-icon>
                </v-btn>
              </v-card-text>
            </v-row>

            <v-row :align="alignment" :justify="justify">
              <v-card-text>
                <h3 style="color: white" class="mb-1 pa-0">Contato</h3>
                <div>
                  <div>
                    <v-icon style="color: white; padding-right: 10px" class="mr-1">email</v-icon>
                    <span>contato@flame.com.br</span>
                  </div>
                  <div>
                    <v-icon style="color: white; padding-right: 10px" class="mr-1">where_to_vote</v-icon>
                    <span>Av. Afonso Pena, 1234 - Centro, Campo Grande/MS, Edificio Evidence Prime Office - Loja 1411, CEP 79121-455</span>
                  </div>
                  <div>
                    <v-icon style="color: white; padding-right: 10px" class="mr-1">phone_enabled</v-icon>
                    <span>(67) 3342-1990</span>
                  </div>
                </div>
              </v-card-text>
            </v-row>
          </v-col>
        </v-row>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — <strong>Flame® - All Rights Reserved</strong>
          </v-card-text>
      
      </v-card>

    </v-footer>
  </v-card>
</template>

<script>
  export default {
    
    data: () => ({
      icons: [ 'home', 'mail', 'event', 'delete'],
      padless: true,
      alignment: 'center',
      justify: 'start'

    }),
    
  }
</script>