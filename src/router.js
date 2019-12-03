import Vue from 'vue'
import Router from 'vue-router'
// import Projetos from './views/1Projetos.vue'
// import Cadastro from './views/ACadastro.vue'
// import QuadroDeAreas from './views/BQuadroDeAreas.vue'
// import Classificacao from './views/CClassificacao.vue'
// import MedidasDeSeguranca from './views/DMedidasDeSeguranca.vue'
// import CMAR from './views/ECMAR.vue'
// import SaidasDeEmergencia from './views/FSaidasDeEmergencia.vue'
// import IluminacaoDeEmergencia from './views/GIluminacaoDeEmergencia.vue'
// import Sinalizacao from './views/HSinalizacao.vue'
// import Extintores from './views/IExtintores.vue'
import Cliente from './views/Cliente.vue'

Vue.use(Router)

export default new Router({
  
  routes: [

    {
      path: '/',
      name: 'home',
      component: Cliente
    },
    {
      path: '/cliente',
      name: 'cliente',
      component: Cliente
    }
    // {
    //   path: '/projetos',
    //   name: 'projetos',
    //   component: Projetos
    // },
    // {
    //   path: '/cadastro',
    //   name: 'cadastro',
    //   component: Cadastro
    // },
    // {
    //   path: '/quadrodeareas',
    //   name: 'quadroDeAreas',
    //   component: QuadroDeAreas
    // },
    // {
    //   path: '/classificacao',
    //   name: 'classificacao',
    //   component: Classificacao
    // },
    // {
    //   path: '/medidasdeseguranca',
    //   name: 'MedidasDeSeguranca',
    //   component: MedidasDeSeguranca
    // },
    // {
    //   path: '/cmar',
    //   name: 'CMAR',
    //   component: CMAR
    // },
    // {
    //   path: '/saidasdeemergencia',
    //   name: 'SaidasDeEmergencia',
    //   component: SaidasDeEmergencia
    // },
    // {
    //   path: '/iluminacaodeemergencia',
    //   name: 'IluminacaoDeEmergencia',
    //   component: IluminacaoDeEmergencia
    // },
    // {
    //   path: '/sinalizacao',
    //   name: 'Sinalizacao',
    //   component: Sinalizacao
    // },
    // {
    //   path: '/extintores',
    //   name: 'Extintores',
    //   component: Extintores
    // },

    

  ]
})
