const API_URL = "https://servicodados.ibge.gov.br/api/v2/cnae/classes/"
import axios from 'axios'

export default{

    // Cadastrar novo usuário
    async buscarCnaes() {

        return axios.get(API_URL + '').then(response => response.data);

    }

};