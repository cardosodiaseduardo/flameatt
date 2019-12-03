<template>
    <v-toolbar dark>       

        <v-toolbar-title>Flame</v-toolbar-title>

        <v-spacer></v-spacer>    


        <!-- Botões de Cadastro e Login -->
        <v-btn color="red" text class="pa-2 mt-1 mr-4" @click="cadastro = true">
            Cadastre-se |
        </v-btn>

        <v-btn color="success" class="pl-3 mt-1" @click="login = true">
            Login
            <v-icon right>check_circle</v-icon>
        </v-btn>
        <!-- Fim dos botões de Cadastro e Login -->





        <!-- Dialog do Login -->
        <v-dialog v-model="login" width="500" height="auto">
            <v-card>
                <v-card class="pa-4 mb-4">
                    <v-card-text><h2>Faça seu Login</h2></v-card-text>
                </v-card>
                <v-card-text>Faça o login e cadastre seus projetos:</v-card-text>
                <v-form class="pa-5">
                    <v-container>
                        <v-text-field v-model="usuarioLogando.email" :rules="emailRules" label="E-mail" required></v-text-field>

                        <v-text-field v-model="usuarioLogando.senha" label="Senha" type="password" required></v-text-field>
                    </v-container>
                </v-form>
                    <div class="pa-5 mb-4">
                        <v-alert v-if="alertaLogin === true" :type="type" color="error" class="" style="color: white">
                            Email ou Senha inválidos, por gentileza, preencha-os novamente!
                        </v-alert>
                    </div>
                <v-layout justify-center>
                    <v-card-actions class="ml-2 pa-2">
                        <v-btn color="error" @click="login = false">Cancelar</v-btn>
                    </v-card-actions>
                    <v-card-actions class="ml-2 pa-2">
                        <v-btn color="success" @click="btnLogar">Entrar</v-btn>
                    </v-card-actions>
                </v-layout>
            </v-card>
        </v-dialog>
        <!-- Fim do Dialog do Login -->








        <!-- Dialog do Cadastro -->
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
        <!-- Fim do Dialog do Cadastro -->




    </v-toolbar>
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
                    localStorage.setItem("_id", usuarioRetornado._id)
                    
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

.tamanhoAlertaCadastro{
    width: 100%;
    height: 40px;
    margin-top: -15px;
    
}

.tamanhoAlertaCadastro2{
    width: 80%;
    height: 20px;
    margin-top: -25px;
    margin-left: auto;
    margin-right: auto;
    
}

.DialogClass{
    overflow-y: auto;
    overflow-x: auto;
}

</style>