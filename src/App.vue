<template>
  <v-app>
    
    <div class="parallax" v-if="!this.$store.state.logado">
      
      <Toolbar />
      
      <v-content class="parallax" xs12 sm8 md5 lg3 xl2>
        <Carrossel />
      </v-content>

      <v-content class="parallax" xs12 sm8 md5 lg3 xl2>
        <Noticias />
      </v-content>
      
      <v-content class="parallax" xs12 sm8 md5 lg3 xl2>
        <Sobrenos />
      </v-content>

      <v-content class="parallax" xs12 sm8 md5 lg3 xl2>
        <Subscribe />
      </v-content>

      <v-content class="parallax" xs12 sm8 md5 lg3 xl2>
        <Footer />
      </v-content>

    </div>

    <v-content v-if="this.$store.state.logado">
      <v-layout>
        <v-flex>
          <router-view/>
        </v-flex>
      </v-layout>
    </v-content>
  
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar'
import Carrossel from './components/Carrossel'
import Footer from './components/Footer'
import Noticias from './components/Noticias'
import Sobrenos from './components/Sobrenos'
import Subscribe from './components/Subscribe'
import HTTPutils from '@/Utils/HTTPutils'

export default {
  
  name: 'App',

  components: {
    Toolbar,
    Carrossel,
    Noticias,
    Sobrenos,
    Subscribe,
    Footer
  },

  computed: {
    logar(){
      return this.$store.state.logado
    }
  },

  data: () => ({
    usuarioEmail: {}

  }),

};
</script>

<style>

#gate{
  background-image: url("http://www.ignisprojetos.com.br/ism/image/slides/1.jpg");
  background-image: linear-gradient(rgb(199, 18, 18), rgb(158, 36, 36), rgb(116, 20, 20), rgb(78, 8, 8), black);
  background-repeat: no-repeat;
  background-size: contain;
}

.tamanho{
  height: 500px;
}

.margemSobrenos{
  margin-top: 50px
}

.margemFooter{
  margin: 0px
}

.invisible{
  opacity: 0.1;
}

.parallax{
  /* The image used */
  background-image: url("https://cdn.vuetifyjs.com/images/parallax/material2.jpg");
  /* background-image: url("https://www.metalcasty.com.br/wp-content/uploads/2019/07/norma-23-protecao-incendios.jpg"); */
  /* background-image: url("http://www.cazacondominios.com.br/fotos/noticias/amp_caza_ppci.jpg"); */
  /* background-image: url("https://www.metalcasty.com.br/wp-content/uploads/2019/07/norma-23-protecao-incendios.jpg"); */
  /* background-image: url("https://blog.visiogestao.com.br/wp-content/uploads/2019/01/271181-nr23-saiba-mais-sobre-a-norma-de-protecao-contra-incendios.jpg"); */
  /* background-image: url("https://www.unifor.br/documents/392166/0/Horizontal+%286%29.png/7a7627dc-a174-b78c-b0ef-81bc59e7d7cc?t=1540392461674"); */

  /* Set a specific height */
  height: 500px;

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.corDoTexto{
  color: black;
}

</style>