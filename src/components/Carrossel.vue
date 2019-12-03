<template>
  <v-layout>
    

    

    <v-row>
      <v-col cols="12">
        <v-row style="height: 500px; width: 1350px; margin-left: 100px" :align="alignment" :justify="justify">

          <div style="margin-bottom: 40px; width: 500px; height: 150px">
            <v-img height="50px" width="50px" style="margin-bottom: 20px" src="@/assets/favicon.png"></v-img>
            <span class="corDoTexto" style="font-size: 22px ; width: 50%">
              Cadastre-se e inicie seus projetos!
            </span>
            <br>
            <v-btn color="red" style="color: white" class="pa-2 mt-1 mr-4" @click="cadastro = true">
              Cadastre-se
            </v-btn>
          </div>

          <v-dialog v-model="cadastro" width="500" class="DialogClass">
            <v-card>
                <v-card-title>Faça seu Cadastro</v-card-title>
                <v-card-text>Para poder construir seus projetos e utilizar os nossos serviços, por favor, faça seu cadastro:</v-card-text>
                <v-form class="pa-2">
                    <v-container>
                        <v-text-field v-model="usuario.nome" label="Nome Completo" required></v-text-field>
                        <div class="">
                            <v-alert v-if="alertaCadastroNome === true" :type="type" color="error" class="tamanhoAlertaCadastro">
                                {{ msgErroCadastroNome }}
                            </v-alert>
                        </div>

                        <v-text-field v-model="usuario.email" label="E-mail" required></v-text-field>
                        <div class="">
                            <v-alert v-if="alertaCadastroEmail === true" :type="type" color="error" class="tamanhoAlertaCadastro">
                                {{ msgErroCadastroEmail }}
                            </v-alert>
                        </div>

                        <v-text-field v-model="usuario.senha" label="Senha" type="password" required></v-text-field>
                        <div class="">
                            <v-alert v-if="alertaCadastroSenha === true" :type="type" color="error" class="tamanhoAlertaCadastro">
                                {{ msgErroCadastroSenha }}
                            </v-alert>
                        </div>

                    </v-container>
                </v-form>

                <div class="">
                    <v-alert v-if="alertaUsuarioCadastrado === true" :type="type" color="success" class="tamanhoAlertaCadastro2 pt-2">
                        {{ msgAlertaUsuarioCadastrado }}
                    </v-alert>
                </div>

                <v-divider></v-divider>
                <v-layout justify-center>
                    <v-card-actions class="ml-2 pa-2">
                        <v-btn color="error" @click="btnCancelarCadastro">Cancelar</v-btn>
                    </v-card-actions>
                    <v-card-actions class="ml-2 pa-2">
                        <v-btn color="success" @click="btnSalvarUsuario">Cadastrar</v-btn>
                    </v-card-actions>
                </v-layout>
            </v-card>
        </v-dialog>

        </v-row>
      </v-col>
    </v-row>





  </v-layout>
</template>

<script>
import HTTPutils from '@/Utils/HTTPutils'

export default {
    
    data: () => ({
        cadastro: false,
        login: false,
        type: 'error',
        usuario: {},
        usuarioLogando: {},
        
        msgErroCadastroNome: '',
        msgErroCadastroEmail: '',
        msgErroCadastroSenha: '',
        alertaCadastroNome: false,
        alertaCadastroEmail: false,
        alertaCadastroSenha: false,

        msgAlertaUsuarioCadastrado: '',
        alertaUsuarioCadastrado: false,

        alertaLogin: false,

        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],

        justify: 'start',
        alignment: 'center'


    }),

    methods: {
        
        btnSalvarUsuario(){
            
            if (this.usuario.nome == undefined || this.usuario.nome == null || this.usuario.nome == '' ||
            this.usuario.email == undefined || this.usuario.email == null || this.usuario.email == '' ||
            this.usuario.senha == undefined || this.usuario.senha == null || this.usuario.senha == ''){
                
                if(this.usuario.nome == undefined || this.usuario.nome == null || this.usuario.nome == ''){
                    console.log("this.usuario.nome é: " + this.usuario.nome)
                    this.msgErroCadastroNome = 'O campo Nome está vazio, preencha-o, por favor!'
                    this.alertaCadastroNome = true
                } else {
                    this.alertaCadastroNome = false
                }
                if (this.usuario.email == undefined || this.usuario.email == null || this.usuario.email == ''){
                    console.log("this.usuario.email é: " + this.usuario.email)
                    this.msgErroCadastroEmail = 'O campo Email está vazio, preencha-o, por favor!'
                    this.alertaCadastroEmail = true
                } else {
                    this.alertaCadastroEmail = false

                }
                if(this.usuario.senha == undefined || this.usuario.senha == null || this.usuario.senha == ''){
                    console.log("this.usuario.senha é: " + this.usuario.senha)
                    this.msgErroCadastroSenha = 'O campo Senha está vazio, preencha-o, por favor!'
                    this.alertaCadastroSenha = true
                } else {
                    this.alertaCadastroSenha = false
                }
                
            } else {
                HTTPutils.salvarUsuario(this.usuario)
                    .then ( usuarioNovo => {
                        if( usuarioNovo._id != undefined){
                            this.msgAlertaUsuarioCadastrado = 'Usuário cadastrado com sucesso!',
                            this.alertaUsuarioCadastrado = true,
                            this.alertaCadastroNome = false,
                            this.alertaCadastroEmail = false
                            this.alertaCadastroSenha = false
                            this.usuario.nome = '',
                            this.usuario.email = '',
                            this.usuario.senha = ''
                        } else {
                            this.alertaCadastro = true
                            console.log("Erro ao salvar Usuário, problema com o servidor-API")
                        }
                    })

                }

            },

        btnCancelarCadastro(){

            this.cadastro = false
            this.alertaCadastroNome = false,
            this.alertaCadastroEmail = false,
            this.alertaCadastroSenha = false,
            this.usuario.nome = '',
            this.usuario.email = '',
            this.usuario.senha = ''

        },

        btnLogar() {

            HTTPutils.autenticar(this.usuarioLogando)
            .then ( usuarioRetornado => {
                
                if( usuarioRetornado != "Usuário não encontrado"){
                
                    this.login = false
                    let usuarioString = JSON.stringify(usuarioRetornado)
                    this.login = false
                    this.$store.state.logado = true
                    
                } else {
                    this.alertaLogin = true
                    this.usuarioLogando.senha = ''
                    
                }
            })

        }

    }

};

</script>

<style>



</style>