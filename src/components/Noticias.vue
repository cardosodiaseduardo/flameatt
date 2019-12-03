<template>
    <v-layout class="layoutNoticias">

        <v-flex v-for="(noticia, index) in noticias" :key="index">
            <v-divider></v-divider>
            <v-card class="mx-auto pa-2" style="margin-top: 70px" flat dark width="650" height="450">
                <v-img class="white--text" height="300px" :src="noticia.Imagem">
                    <v-card-title style="color: black" class="align-end fill-height"> {{ noticia.Titulo }} </v-card-title>
                </v-img>
                <v-card-text style="color: white"> {{ noticia.Descricao }} </v-card-text>
                <v-card-actions>
                    <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-btn text @click="somarContador(noticia.ContadorNoticia)">
                        <v-icon>thumb_up</v-icon>
                    </v-btn>
                    <code class="mr-4"> {{ noticia.ContadorNoticia }} </code>
                    <v-btn outlined>Saiba mais</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>

    </v-layout>
</template>

<script>
  export default {
    
    data: () => ({
        noticias: [ 
            {   Titulo: 'Programa de Prevenção',
                Descricao: 'Controle a queimadas em zonas rurais tem nova fase de aprovação na Câmara Municipal',
                Imagem: require('@/assets/controledeincendios.jpg'),
                ContadorNoticia: 0
            },
            {   Titulo: 'Proteção contra Incêndios',
                Descricao: 'Proteção contra incêndios é assunto sério, saiba como treinar sua equipe para prevenção',
                Imagem: require('@/assets/treinamento_incendio.jpg'),
                ContadorNoticia: 0
            }
        ],

        contador: 0
    }),

    methods: {

        somarContador(daNoticia){
            this.noticias.ContadorNoticia = this.noticias.ContadorNoticia + 1
        }

    }

  }
</script>

<style>

.layoutNoticias{
    width: 100%;
}

</style>