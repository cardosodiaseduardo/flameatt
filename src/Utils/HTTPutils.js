// const API_URL = "https://flame-api.herokuapp.com/"
const API_URL = "http://localhost:8000/"
import axios from 'axios'
import { async } from 'q';

export default{

    // Cadastrar novo usuário
    async salvarUsuario(usuarioNovo) {
        return axios.post(API_URL + 'usuarios', usuarioNovo).then(response => response.data);
    },

    async autenticar(usuarioLogando){
        return axios.post(API_URL + "autenticar", usuarioLogando).then(response => response.data);
    },
    
    async autenticarLocalStorage(usuarioNoLocalStorage){
        return axios.post(API_URL + "localstorageemailautenticacao", usuarioNoLocalStorage).then(response => response.data);
    },

    async buscarUsuarioEspecificoPeloId(iDdoUsuario){
        return axios.get(API_URL + 'usuarioid', iDdoUsuario).then(response => response.data)
    },


    //Cadastrar novo projeto
    async salvarProjeto(usuarioMaisProjeto){
        return axios.post(API_URL + "projetos", usuarioMaisProjeto).then(response => response.data)
    },

    //Buscar Projetos do Usuário
    async buscarProjetosDoUsuario(usuarioAencontrarProjetos){
        return axios.post(API_URL + "projetosid", usuarioAencontrarProjetos).then(response => response.data)
    },

    //Deletar um Projeto específico
    async removerProjeto(projetoAserRemovido){
        return axios.post(API_URL + "deleteprojeto", projetoAserRemovido).then(response => response.data)
    },

    //Buscar um projeto específico
    async buscarProjetoEspecifico(idDoProjetoAserBuscado){
        return axios.post(API_URL + "projetoid", idDoProjetoAserBuscado).then(response => response.data)
    },

    //editar Dados do Projeto
    async editarOProjeto(dadosDoProjetoEditadoComIdDoProjeto){
        return axios.put(API_URL + "projetoid", dadosDoProjetoEditadoComIdDoProjeto).then(response => response.data)
    }



};