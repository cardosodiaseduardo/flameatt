<template>
    <v-layout class="ma-5 pa-2">
        <v-flex>

            <v-container style="color: black; margin-top: 70px">
                <v-divider></v-divider>
                
                <div class="corDoTexto" style="margin-top: 50px">
                    <h1>Sobre nós</h1>
                </div>

                <blockquote class="corDoTexto ml-0">
                    Somos a descomplicação da burocracia. Você, arquiteto e engenheiro, não precisará mais recorrer
                    à pesquisas de legislações sobre controle de incêncidos para poder emitir os documentos necessários
                    que irá compor o seu projeto final. Basta informar os dados da construção que nós fazemos o resto. 
                    Simples e descomplicado assim mesmo.
                </blockquote>
                
                <v-layout>
                    <v-flex v-for="(membro, index) in equipe" :key="index" class="ma-0 mt-2 pr-4">
                        
                        <v-card flat max-width="400" class="" dark>
                            <v-row style="padding: 20px" class="">
                                <v-img height="200" width="80%" :src="membro.Imagem"></v-img>
                            </v-row>

                            <v-row class="pa-4">
                                <v-btn icon>
                                    <a :href= "membro.Midia1Link" target="_blank">
                                        <v-img style="height: 35px; width: 35px" :src="membro.Midia1"></v-img>
                                    </a>
                                </v-btn>
                                <v-btn icon>
                                    <v-img style="height: 35px; width: 35px" :src="membro.Midia2"></v-img>
                                </v-btn>
                            </v-row>

                            <v-container class="pa-2" flat>
                                <v-card-text class="pa-0"> {{ membro.Membro }} </v-card-text>
                                <v-card-text class="pa-0"> {{ membro.Cargo }} </v-card-text>
                                <v-card-text class="pa-0"> {{ membro.Resumo }} </v-card-text>
                                <v-text-field disabled></v-text-field>
                                <v-spacer></v-spacer>
                            </v-container>
                        </v-card>

                    </v-flex>
                </v-layout>

            </v-container>

        </v-flex>
    </v-layout>
</template>

<script>

export default {
  
  data: () => ({
    
      equipe: [
          { Membro: 'André Lorandi', Midia1: require('@/assets/face.png'), Midia1Link: '//www.globo.com:', Midia2: require('@/assets/linkedin.png'), Cargo: 'Sócio Diretor-Presidente', Imagem: require('@/assets/andre.jpg'), Resumo:'Graduado em Engenharia Civil pela UNIDERP, com MBA em Gerenciamento de Obras, Tecnologia e Qualidade da Construção, André possui experiência com ...' },
          { Membro: 'Eduardo Dias Cardoso', Midia1: require('@/assets/face.png'), Midia1Link: '//www.google.com:', Midia2: require('@/assets/linkedin.png'), Cargo: 'Sócio Diretor de Tecnologia', Imagem: require('@/assets/Eduardo.jpg'), Resumo:'Graduado em Administração pela UFMS e Pós graduado em Gestão Pública pela UFMS, com cursos na área de tecnologia, Eduardo é o desenvolvedor da solução Flame.' }
      ]

  })

};
</script>

<style>


</style>