<template>
  <div>
    <div>
        <!-- Componente1: Toolbar simples -->
      <v-toolbar dark>
        <v-spacer></v-spacer>

        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-icon>dns</v-icon>
            </v-btn>
          </template>

          <v-list>
            <!-- <v-list-item @click=""> -->
            <v-list-item>
              <v-icon>person</v-icon>
              <v-list-item-title style="color: black">Perfil</v-list-item-title>
            </v-list-item>
            <v-list-item @click="deslogar">
              <v-icon>exit_to_app</v-icon>
              <v-list-item-title style="color: black">Sair</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </div>
        <!-- Componente Principal: Passo a passo -->
    <v-stepper v-model="e1">
        <!-- Componente2: Menu do Passo a Passo -->
      <v-stepper-header>
        <div style="display: flex">
          <div style="display: flex">
            <v-stepper-step step="1">
              <a @click="e1 = 1" style="color: black">Tutorial</a>
            </v-stepper-step>
          </div>
        </div>

        <div style="display: flex">
          <div style="display: flex">
            <v-stepper-step step="2">
              <a @click="e1 = 2" style="color: black">Meus Projetos</a>
            </v-stepper-step>
          </div>
        </div>

        <div style="display: flex" v-if="mostrarProjetoSelecionado">
          <div style="display: flex">
            <v-stepper-step step="3">
              <a @click="e1 = 3" style="color: black">Dados do Projeto</a>
            </v-stepper-step>
          </div>
        </div>

        <div style="display: flex" v-if="mostrarProjetoSelecionado">
          <div style="display: flex">
            <v-stepper-step step="4">
              <a @click="e1 = 4" style="color: black">Quadro de Área</a>
            </v-stepper-step>
          </div>
        </div>

        <div style="display: flex" v-if="mostrarProjetoSelecionado">
          <div style="display: flex">
            <v-stepper-step step="5">
              <a @click="e1 = 5" style="color: black">Classificação</a>
            </v-stepper-step>
          </div>
        </div>

        <v-spacer></v-spacer>
      </v-stepper-header>

        <!-- Componente3: Itens do Passo a Passo -->
      <v-stepper-items>
        <!--  -->
        <!--  -->
        <!--  -->
        <!--  -->
        <!-- Tab inicial: Área do Tutorial -->
        <v-stepper-content step="1" class="conteudo">
          <v-card class="mb-12">
            <v-stepper-step step="1">Tutorial</v-stepper-step>
            <v-card width="100%" height="100%">
              <v-card-title style="color: black">Olá, Cliente1 seja bem vindo!</v-card-title>
              <v-card-text class="mt-2">
                <h1 style="color: black">Conheça o sistema Flame e inicie seu primeiro projeto:</h1>
              </v-card-text>

              <v-card-text style="color: black">
                Cliente1. Parabéns por se cadastrar em nossa plataforma. Esse é o sistema Flame que irá proporcionar ganho de tempo ao seu projeto.
                <br />
              </v-card-text>
              <v-card-text style="color: black">A plataforma Flame oferece</v-card-text>
            </v-card>
          </v-card>

          <v-row justify="center">
            <v-btn color="success" @click="e1 = 2">
              Avançar
              <v-icon>navigate_next</v-icon>
            </v-btn>
          </v-row>
        </v-stepper-content>
        <!--  -->
        <!--  -->
        <!--  -->
        <!--  -->
        <!-- Tab 2:  Listagem dos projetos do cliente -->
        <v-stepper-content step="2" class="conteudo">
          <v-card class="mb-12">
            <v-row justify="start">
              <v-stepper-step step="2">Meus Projetos</v-stepper-step>
            </v-row>

            <div class="text-center">
              <v-dialog v-model="caixaDeDialogoParaNovoProjeto" width="600">
                <template v-slot:activator="{ on }">
                  <v-row justify="start" class="ml-4">
                    <v-btn color="success" class="mr-4" v-on="on">Novo Projeto</v-btn>
                  </v-row>
                </template>

                <v-card>
                  <v-card-title class="headline teal darken-4 mb-4" primary-title>Inserir Projeto</v-card-title>

                  <v-card-text>
                    <v-text-field v-model="novoProjetoNome" label="Nome" placeholder="Insira um nome do seu projeto. Ex: Edifício Via Norte e Sul"></v-text-field>
                    <v-text-field v-model="novoProjetoDescricao" label="Descrição" placeholder="Insira a descrição do seu projeto. Ex: Edificio 8 andares, 4 apês por andar, apês com 3 quartos sendo 2 suítes e sacada"></v-text-field>
                  </v-card-text>

                  <div class="pa-5 mb-4">
                    <v-alert v-if="alertaProjetoNaoSalvo === true" :type="type" color="error" class>{{ msgErroSalvandoProjeto }}</v-alert>
                  </div>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-row justify="center">
                      <v-btn style="color: white" color="green" @click="salvarNovoProjeto">Adicionar</v-btn>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>

            <v-card-title style="color: black">Estes são seus projetos:</v-card-title>

            <v-card-text>
              <v-simple-table style="color: black" class="mt-2">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left" style="width: 20%">Nome</th>
                      <th class="text-left" style="width: 66%">Descrição</th>
                      <th class="text-center" style="width: 7%">Editar</th>
                      <th class="text-center" style="width: 7%">Remover</th>
                    </tr>
                  </thead>
                  <tbody style="color: black" v-for="projeto in projetos" :key="projeto.nome">
                    <tr>
                      <td>{{ projeto.nome }}</td>
                      <td>{{ projeto.descricao }}</td>
                      <td style="width: 20px">
                        <v-row justify="center" align="center">
                          <button>
                            <v-icon style="align: center" @click="buscarTodosOsDadosDoProjetoSelecionado(projeto)">{{ projeto.icon1 }}</v-icon>
                          </button>
                        </v-row>
                      </td>
                      <td style="width: 20px">
                        <v-row justify="center" align="center">
                          <button>
                            <v-icon style="margin-left: 0px" @click="dialogDoProjetoSelecionadoParaDeletar = true">{{ projeto.icon2 }}</v-icon>
                            <div class="text-center">
                              <v-dialog v-model="dialogDoProjetoSelecionadoParaDeletar" width="500">

                                <v-card>
                                  <v-card-title class="headline grey lighten-2" primary-title>
                                    Confirmação de exclusão
                                  </v-card-title>

                                  <v-card-text>
                                    Você tem certeza que deseja deletar o projeto?
                                  </v-card-text>

                                  <v-divider></v-divider>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="error" text @click="dialogDoProjetoSelecionadoParaDeletar = false">
                                      Não
                                    </v-btn>
                                    <v-btn color="success" text @click="removerProjeto(projeto)">
                                      Sim
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </div>
                          </button>
                        </v-row>
                      </td>
                    </tr>


                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>

          <v-snackbar v-model="snackbarDoProjetoSelecionadoParaEditar">
            Projeto selecionado para edição!
            <v-btn color="pink" text @click="snackbarDoProjetoSelecionadoParaEditar = false">
              Fechar
            </v-btn>
          </v-snackbar>

          <v-snackbar v-model="snackbarDoNovoProjeto">
            Novo projeto salvo com sucesso!
            <v-btn color="pink" text @click="snackbarDoNovoProjeto = false">
              Fechar
            </v-btn>
          </v-snackbar>

          <v-snackbar v-model="snackbarDoProjetoSelecionadoJaDeletado">
            Projeto removido com sucesso!
            <v-btn color="pink" text @click="snackbarDoProjetoSelecionadoJaDeletado = false">
              Fechar
            </v-btn>
          </v-snackbar>

          

          <v-row justify="center">
            <v-btn color="error" class="ml-4" @click="e1 = 1">
              <v-icon>navigate_before</v-icon>Voltar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="success" class="mr-4" @click="e1 = 3" v-if="mostrarProjetoSelecionado">
              Avançar
              <v-icon>navigate_next</v-icon>
            </v-btn>
          </v-row>
        </v-stepper-content>
        <!--  -->
        <!--  -->
        <!--  -->
        <!--  -->
        <!-- Tab 3: Dados do projeto selecionado -->
        <v-stepper-content step="3" class="conteudo" v-if="mostrarProjetoSelecionado">
          <v-card class="mb-12">
            <v-row justify="center" align="center">
              <v-stepper-step step="3">Dados do Projeto selecionado</v-stepper-step>
              <v-spacer></v-spacer>
              <v-btn outlined text class="mr-4" @click="ativar(); e1 = 2">◄ Editar outro projeto</v-btn>
            </v-row>

            <v-card-text>
              <v-card class="mb-0" width="100%" height="30px" color="blue">
                <v-card-title class="ml-1 pa-0">
                  <v-icon class="mr-2">assignment_ind</v-icon>Responsável pelo Uso
                </v-card-title>
              </v-card>

              <!-- Painéis do cadastro básico -->
              <v-expansion-panels>
                <!-- Painel de cadastro da Pessoa Física -->
                <v-expansion-panel style="width: 100%">
                  <v-expansion-panel-header style="color: black" class="ml-1 pa-4">Pessoa Física</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-form ref="form">
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.pessoaFisica.nome" label="Nome" required></v-text-field>
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.pessoaFisica.email" label="E-mail" required></v-text-field>
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.pessoaFisica.cpf" label="CPF" required></v-text-field>
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.pessoaFisica.telefonePessoal" label="Telefone celular" required></v-text-field>
                    </v-form>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <!-- Painel de cadastro da Pessoa Jurídica -->
                <v-expansion-panel style="width: 100%">
                  <v-expansion-panel-header style="color: black" class="ml-1 pa-4">Pessoa Jurídica</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-form ref="form">
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.pessoaJuridica.cnpj" label="CNPJ" required></v-text-field>
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.pessoaJuridica.razaoSocial" label="Razão Social" required></v-text-field>
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.pessoaJuridica.nomeFantasia" label="Nome Fantasia" required></v-text-field>
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.pessoaJuridica.emailInstitucional" label="E-mail da Empresa" required></v-text-field>
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.pessoaJuridica.telefoneEmpresa" label="Telefone da Empresa" required></v-text-field>
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.pessoaJuridica.nomeResponsavel" label="Nome Completo do Responsável pela Empresa" required></v-text-field>
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.pessoaJuridica.cpfResponsavel" label="CPF do Responsável pela Empresa" required></v-text-field>
                    </v-form>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-card class="mb-0 mt-5" width="100%" height="30px" color="blue">
                  <v-card-title class="ml-1 pa-0">
                    <v-icon class="mr-2">apartment</v-icon>Edificação
                  </v-card-title>
                </v-card>

                <!-- Painel de cadastro do Endereço da Edificação -->
                <v-expansion-panel style="width: 100%">
                  <v-expansion-panel-header style="color: black" class="ml-1 pa-4">Endereço</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-form ref="form">
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.edificacao.cep" label="CEP" required></v-text-field>
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.edificacao.rua" label="Rua" required></v-text-field>
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.edificacao.numero" label="Número" required></v-text-field>
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.edificacao.bairro" label="Bairro" required></v-text-field>
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.edificacao.municipio" label="Município" required></v-text-field>
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.edificacao.estado" label="Estado" required></v-text-field>
                    </v-form>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <!-- Painel de cadastro dos Dados da Edificação -->
                <v-expansion-panel style="width: 100%">
                  <v-expansion-panel-header style="color: black" class="ml-1 pa-4">Dados da Edificação</v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <v-form ref="form">
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.dadosDaEdificacao.areaDoTerreno" label="Área do terreno (m²)" required></v-text-field>
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.dadosDaEdificacao.areaConstruida" label="Área construída (m²)" required></v-text-field>
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.dadosDaEdificacao.areaAnalisada" label="Área a ser analisada (m²)" required></v-text-field>
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.dadosDaEdificacao.alturaDescendente" label="Altura descendente (Entre Pisos, em m²)" required></v-text-field>
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.dadosDaEdificacao.alturaEdificacao" label="Altura total da edificação (m)" required></v-text-field>
                      <v-text-field class="paddingFoward" v-model="projetoSelecionadoParaEdicao.dadosDaEdificacao.numeroPavimentos" label="Número de pavimentos" required></v-text-field>
                    </v-form>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>

              <v-btn color="success" class="ma-4" @click="buscarTodosOsDadosDoProjetoSelecionado(botaoDeEditarOsDadosDoProjeto)">Salvar Dados</v-btn>
            </v-card-text>
          </v-card>

          <v-row justify="center">
            <v-btn color="error" class="ml-4" @click="e1 = 2">
              <v-icon>navigate_before</v-icon>Voltar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="success" class="mr-4" @click="e1 = 4">
              Avançar
              <v-icon>navigate_next</v-icon>
            </v-btn>
          </v-row>
        </v-stepper-content>
        <!--  -->
        <!--  -->
        <!--  -->
        <!--  -->
        <!-- Tab 4: Quadro de Áreas do Projeto Selecionado, se nenhum projeto está selecionado, não deve aparecer -->
        <v-stepper-content v-if="mostrarProjetoSelecionado" step="4" class="conteudo">
          <v-row justify="center" align="center">
            <v-stepper-step step="4">Quadro de Área</v-stepper-step>
            <v-spacer></v-spacer>
            <v-btn outlined text class="mr-4" @click="ativar(); e1 = 2">◄ Editar outro projeto</v-btn>
          </v-row>

            <v-btn color="success" class="mb-4" @click="caixaDeExpansaoDoAddEdificacao = !caixaDeExpansaoDoAddEdificacao">
              Adicionar Edificação →
            </v-btn>
            <v-card v-if="caixaDeExpansaoDoAddEdificacao" class="pb-4" height="100%">
              <v-card-text>
                <v-text-field label="Nome" placeholder="Ex.: Lounge" v-model="edificacaoNova"></v-text-field>
                <v-text-field label="Área Total (em m²)" placeholder="Ex.: 100" v-model="areaTotalDaNovaEdificacao"></v-text-field>
                <v-text-field label="Ambiente 1" placeholder="Ex.: Bar - 65m²" v-model="ambiente1DaNovaEdificacao"></v-text-field>
                <v-text-field label="Ambiente 2" placeholder="Ex.: Cozinha - 25m²" v-model="ambiente2DaNovaEdificacao"></v-text-field>
                <v-text-field label="Ambiente 3" placeholder="Ex.: Administrativo - 10m²" v-model="ambiente3DaNovaEdificacao"></v-text-field>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions class="mt-4">
                <v-btn outlined color="success" @click="salvarNovaEdificacaoNoQuadroDeAreas()">
                  Salvar
                </v-btn>
              </v-card-actions>                
            </v-card>

            <v-card class="mb-12" style="width: 100%">
              <v-card class="mb-0" width="100%" height="30px" color="blue">
                <v-card-title class="ml-1 pa-0">
                  <v-icon class="mr-2">dashboard</v-icon>Quadro de Áreas do projeto selecionado:
                </v-card-title>
              </v-card>

              <v-card style="width: 100%; height: 100%">
                <v-simple-table>
                  <template>
                    <tbody>
                      <tr>
                        <!-- O método comentado abaixo é o que lê os dados de um objeto no Data de forma correta, está salvo -->
                        <v-expansion-panels>
                          <v-expansion-panel v-for="item in quadroDeAreas" :key="item.edificacaoNova">
                            <v-expansion-panel-header> <h3> {{ item.edificacaoNova }} </h3> </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <h5>Área Total</h5>
                              <span>{{ item.areaTotalDaNovaEdificacao }}</span>
                              <h5>Ambientes internos</h5>
                              <div>
                                <span>{{ item.ambiente1DaNovaEdificacao }} </span><br>
                                <span>{{ item.ambiente2DaNovaEdificacao }} </span><br>
                                <span>{{ item.ambiente3DaNovaEdificacao }} </span>
                              </div>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-card>

          <!-- Botões de voltar e avançar entre as abas -->
          <v-row justify="center">
            <v-btn color="error" class="ml-4" @click="e1 = 3">
              <v-icon>navigate_before</v-icon>Voltar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="success" class="mr-4" @click="e1 = 5">
              Avançar
              <v-icon>navigate_next</v-icon>
            </v-btn>
          </v-row>
        </v-stepper-content>




        <!-- Tab 5: Dados da Classificação do Projeto Selecionado, se nenhum projeto está selecionado, não deve aparecer -->
        <v-stepper-content v-if="mostrarProjetoSelecionado" step="5" class="conteudo">
          <v-row justify="center" align="center">
            <v-stepper-step step="5">Classificação</v-stepper-step>
            <v-spacer></v-spacer>
            <v-btn outlined text class="mr-4" @click="ativar(); e1 = 2">◄ Editar outro projeto</v-btn>
          </v-row>

          <v-card width="100%" height="100%" outlined style="padding-left: 5px; padding-right: 5px; padding-bottom: 10px">
            <v-card class="mb-0" width="100%" height="30px" color="blue">
              <v-card-title class="ml-1 pa-0">
                <v-icon class="mr-2">house</v-icon>Ocupação
              </v-card-title>
            </v-card>

            <!-- Painel de cadastro da Descrição da Obra -->
            <v-card style="width: 100%">
              <v-card-title style="color: black" class="ml-1 pa-4">Descrição</v-card-title>

              <v-card-text>
                <v-form ref="form">
                  <div>
                    <v-autocomplete filled rounded chips label="Escolha o CNAE da atividade principal que será desenvolvida no local" clearable hide-details hide-selected :items="cnaes" item-text="item.idDoCnae" item-value="item.observacoesDoCnae" :placeholder="this.cnaes.descricao" solo></v-autocomplete>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>

            <!-- Painel de cadastro da Ocupação -->
            <v-card style="width: 100%">
              <v-card-title style="color: black" class="ml-1 pa-4">Ocupação</v-card-title>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field class="paddingFoward" label="Ocupação" required placeholder="Ex.: Residencial"></v-text-field>
                  <v-text-field class="paddingFoward mt-5" label="Grupo" required placeholder="Ex.: A"></v-text-field>
                  <v-text-field class="paddingFoward mt-5" label="Divisão" required placeholder="Ex.: A-3"></v-text-field>
                </v-form>
              </v-card-text>
            </v-card>

            <!-- Painel de cadastro dos dados da Altura -->
            <v-card class="mb-0 mt-5" width="100%" height="30px" color="blue">
              <v-card-title class="ml-1 pa-0">
                <v-icon class="mr-2">unfold_more</v-icon>Altura
              </v-card-title>
            </v-card>

            <v-card style="width: 100%">
              <v-card-title style="color: black" class="ml-1 pa-4">Especificações</v-card-title>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field class="paddingFoward" label="Altura da Edificação" placeholder="Ex.: 6,00 m" required></v-text-field>
                  <v-text-field class="paddingFoward mt-5" label="Denominação" placeholder="Ex.: BAIXA" required></v-text-field>
                  <v-text-field class="paddingFoward mt-5" label="Tipo" placeholder="Ex.: 2" required></v-text-field>
                </v-form>
              </v-card-text>
            </v-card>

            <!-- Painel de cadastro dos dados da Carga de Incêndios -->
            <v-card class="mb-0 mt-5" width="100%" height="30px" color="blue">
              <v-card-title class="ml-1 pa-0">
                <v-icon class="mr-2">whatshot</v-icon>Carga de Incêndio
              </v-card-title>
            </v-card>

            <v-card style="width: 100%">
              <v-card-title style="color: black" class="ml-1 pa-4">Especificações</v-card-title>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field class="paddingFoward" label="Carga de Incêndio" placeholder="Ex.: 500" required></v-text-field>
                  <v-text-field class="paddingFoward mt-5" label="Risco" placeholder="Ex.: MÉDIO" required></v-text-field>
                </v-form>
              </v-card-text>
            </v-card>
          </v-card>

          <v-row justify="center">
            <v-btn color="error" class="mt-4" @click="e1 = 4">
              <v-icon>navigate_before</v-icon>Voltar
            </v-btn>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

  </div>
</template>

<script>
import HTTPutils from "@/Utils/HTTPutils";
import HTTPcnaeConexion from "@/Utils/HTTPcnaeConexion";

export default {
  data: () => ({
    // Dados Globais
    mostrarProjetoSelecionado: false,
    e1: 0,
    
    projetoSelecionadoParaEdicao: {
      "pessoaJuridica": {
        "cnpj": "",
        "razaoSocial": "",
        "nomeFantasia": "",
        "emailInstitucional": "",
        "telefoneEmpresa": "",
        "nomeResponsavel": "",
        "cpfResponsavel": ""
      },
      
      "pessoaFisica": {
        "nome": "",
        "email": "",
        "cpf": "",
        "telefonePessoal": ""
      },

      "edificacao": {
        "cep": "",
        "rua": "",
        "numero": "",
        "bairro": "",
        "municipio": "",
        "estado": ""
      },

      "dadosDaEdificacao": {
        "areaDoTerreno": "",
        "areaConstruida": "",
        "areaAnalisada": "",
        "alturaDescendente": "",
        "alturaEdificacao": "",
        "numeroPavimentos": ""
      },

      quadroDeAreas: {}

    },
    
    quadroDeAreas: [
       {
          "nome": "Escritório",
          "area": "25m²",
          "ambientes": {
            "Sala de Reunião": "Área de 10m²",
            "Sala de espera": "Área de 5m²",
            "Escritório": "Área de 10m²"
          }
        },
        {
          "nome": "Auditório",
          "area": "50m²",
          "ambientes": {
            "Sala do Maquinário": "Área de 5m²",
            "Auditório": "Área de 45m²"
          }
        }
    ],

    //como o quadro de areas deve ser salvo
    // quadroDeAreas: [
    //     {
    //       "nome": "Escritório",
    //       "area": "25m²",
    //       "ambientes": {
    //         "Ambiente 1": "Sala de Reunião - Área de 10m²",
    //         "Ambiente 2": "Sala de espera - Área de 5m²",
    //         "Ambiente 3": "Escritório - Área de 10m²"
    //       }
    //     },
    //     {
    //       "nome": "Auditório",
    //       "area": "50m²",
    //       "ambientes": {
    //         "Ambiente 1": "Sala do Maquinário - Área de 5m²",
    //         "Ambiente 2": "Auditório - Área de 45m²"
    //       }
    //     }
      
    //   ],

    alertaProjetoNaoSalvo: false,
    msgErroSalvandoProjeto: "",
    // Adicionando novo projeto na tab da listagem dos projetos
    caixaDeDialogoParaNovoProjeto: false,
    novoProjetoNome: "",
    novoProjetoDescricao: "",
    projetoSelecionado: false,
    projetos: [],
    snackbarDoProjetoSelecionadoParaEditar: false,
    fdsi: "",
    dialogDoProjetoSelecionadoParaDeletar: false,
    snackbarDoProjetoSelecionadoJaDeletado: false,
    snackbarDoNovoProjeto: false,
    botaoDeEditarOsDadosDoProjeto: "editar os dados do projeto",

    edificacaoNova: "",
    areaTotalDaNovaEdificacao: "",
    ambiente1DaNovaEdificacao: "",
    ambiente2DaNovaEdificacao: "",
    ambiente3DaNovaEdificacao: "",

    caixaDeExpansaoDoAddEdificacao: false,

    //Array para integração com API do IBGE dos CNAEs
    cnaes: []

  }),

  mounted() {
    this.buscarProjetosDoUsuarioPeloId();
    this.trazerDadosDosCnaes();
  },

  methods: {
    //Deslogar o cliente do APP
    deslogar() {
      this.$store.state.logado = false;
    },

    //Métodos de ativar as tabs para edição do projeto
    ativar() {
      this.mostrarProjetoSelecionado = !this.mostrarProjetoSelecionado;
    },

    //Método para verificar se o usuário tem projetos cadastrados e exibe-os na listagem
    buscarProjetosDoUsuarioPeloId() {
      let usuarioQueBuscaProjetos = {};

      usuarioQueBuscaProjetos._id = localStorage.getItem("_id");

      HTTPutils.buscarProjetosDoUsuario(usuarioQueBuscaProjetos).then(
        usuarioAencontrarProjetos => {
          if (usuarioAencontrarProjetos != []) {
            this.projetos = usuarioAencontrarProjetos;
            let icone1 = "edit"
            let icone2 = "delete"

            for(let i = 0; i < this.projetos.length; i++){
                this.projetos[i].icon1 = icone1
                this.projetos[i].icon2 = icone2
            }
          } else {
            alert("Erro ao buscar projetos do usuário, por favor, contate o admin do site!");
          }
        }
      );
    },
    
    salvarNovoProjeto() {
      let novoProjeto = {};

      if (this.novoProjetoNome === "" || this.novoProjetoDescricao === "") {
        this.msgErroSalvandoProjeto = "Por gentileza, preencha os dados do nome e da descrição do projeto para salvar e começar a editar o projeto!";
        this.alertaProjetoNaoSalvo = true;
      } else {
        
        //Setando os itens do objeto projeto
        novoProjeto.usuario = localStorage.getItem("_id");
        novoProjeto.nome = this.novoProjetoNome;
        novoProjeto.descricao = this.novoProjetoDescricao;

        //setando os dados da pessoaFisica do objeto projeto
        let pessoaFisica = {}
        let nome = ''
        let email = ''
        let cpf = ''
        let telefonePessoal = ''
        
        pessoaFisica.nome = nome
        pessoaFisica.email = email
        pessoaFisica.cpf = cpf
        pessoaFisica.telefonePessoal = telefonePessoal

        novoProjeto.pessoaFisica = pessoaFisica

        //setando os dados da pessoaJuridica do objeto projeto
        let pessoaJuridica = {}
        let cnpj = ''
        let razaoSocial = ''
        let nomeFantasia = ''
        let emailInstitucional = ''
        let telefoneEmpresa = ''
        let nomeResponsavel = ''
        let cpfResponsavel = ''
        
        pessoaJuridica.cnpj = cnpj
        pessoaJuridica.razaoSocial = razaoSocial
        pessoaJuridica.nomeFantasia = nomeFantasia
        pessoaJuridica.emailInstitucional = emailInstitucional
        pessoaJuridica.telefoneEmpresa = telefoneEmpresa
        pessoaJuridica.nomeResponsavel = nomeResponsavel
        pessoaJuridica.cpfResponsavel = cpfResponsavel

        novoProjeto.pessoaJuridica = pessoaJuridica

        //setando os dados da edificacao do objeto projeto
        let edificacao = {}
        let cep = ''
        let rua = ''
        let numero = ''
        let bairro = ''
        let municipio = ''
        let estado = ''
        
        edificacao.cep = cep
        edificacao.rua = rua
        edificacao.numero = numero
        edificacao.bairro = bairro
        edificacao.municipio = municipio
        edificacao.estado = estado

        novoProjeto.edificacao = edificacao

        //setando os dados da edificacao de metragem do objeto projeto
        let dadosDaEdificacao = {}
        let areaDoTerreno = ''
        let areaConstruida = ''
        let areaAnalisada = ''
        let alturaDescendente = ''
        let alturaEdificacao = ''
        let numeroPavimentos = ''

        dadosDaEdificacao.areaDoTerreno = areaDoTerreno
        dadosDaEdificacao.areaConstruida = areaConstruida
        dadosDaEdificacao.areaAnalisada = areaAnalisada
        dadosDaEdificacao.alturaDescendente = alturaDescendente
        dadosDaEdificacao.alturaEdificacao = alturaEdificacao
        dadosDaEdificacao.numeroPavimentos = numeroPavimentos

        novoProjeto.dadosDaEdificacao = dadosDaEdificacao

        HTTPutils.salvarProjeto(novoProjeto).then(projetoRetornado => {
          if (projetoRetornado != "Erro interno, não foi possível adicionar o projeto, tente novamente ou contate o administrador do site" && projetoRetornado != {} && projetoRetornado != []){
            // Projeto salvo com sucesso
            this.snackbarDoNovoProjeto = true
            this.projetoSelecionadoParaEdicao = projetoRetornado
            this.buscarProjetosDoUsuarioPeloId()

          } else {
            // "Projeto não foi salvo!
            this.msgErroSalvandoProjeto = "Projeto não foi salvo por algum motivo. Por gentileza, contate o admin do site para informar!"
            this.alertaProjetoNaoSalvo = true;
          }
        });

        this.caixaDeDialogoParaNovoProjeto = false;
        this.novoProjetoDescricao = "";
        this.ativar();
      }
    },

    salvarEdicaoDosDadosDoProjeto(){
      let projetoAserEditadoOsDadosComIdDoProjeto = {}

      projetoAserEditadoOsDadosComIdDoProjeto._id = localStorage.getItem("projetoId")

      let pessoaFisica = {}
      pessoaFisica.nome = this.projetoSelecionadoParaEdicao.pessoaFisica.nome
      pessoaFisica.email = this.projetoSelecionadoParaEdicao.pessoaFisica.email
      pessoaFisica.cpf = this.projetoSelecionadoParaEdicao.pessoaFisica.cpf
      pessoaFisica.telefonePessoal = this.projetoSelecionadoParaEdicao.pessoaFisica.telefonePessoal

      projetoAserEditadoOsDadosComIdDoProjeto.pessoaFisica = pessoaFisica
      
      let pessoaJuridica = {}
      pessoaJuridica.cnpj = this.projetoSelecionadoParaEdicao.pessoaJuridica.cnpj
      pessoaJuridica.razaoSocial = this.projetoSelecionadoParaEdicao.pessoaJuridica.razaoSocial
      pessoaJuridica.nomeFantasia = this.projetoSelecionadoParaEdicao.pessoaJuridica.nomeFantasia
      pessoaJuridica.emailInstitucional = this.projetoSelecionadoParaEdicao.pessoaJuridica.emailInstitucional
      pessoaJuridica.telefoneEmpresa = this.projetoSelecionadoParaEdicao.pessoaJuridica.telefoneEmpresa
      pessoaJuridica.nomeResponsavel = this.projetoSelecionadoParaEdicao.pessoaJuridica.nomeResponsavel
      pessoaJuridica.cpfResponsavel = this.projetoSelecionadoParaEdicao.pessoaJuridica.cpfResponsavel

      projetoAserEditadoOsDadosComIdDoProjeto.pessoaJuridica = pessoaJuridica

      let edificacao = {}
      edificacao.cep = this.projetoSelecionadoParaEdicao.edificacao.cep
      edificacao.rua = this.projetoSelecionadoParaEdicao.edificacao.rua
      edificacao.numero = this.projetoSelecionadoParaEdicao.edificacao.numero
      edificacao.bairro = this.projetoSelecionadoParaEdicao.edificacao.bairro
      edificacao.municipio = this.projetoSelecionadoParaEdicao.edificacao.municipio
      edificacao.estado = this.projetoSelecionadoParaEdicao.edificacao.estado

      projetoAserEditadoOsDadosComIdDoProjeto.edificacao = edificacao

      let dadosDaEdificacao = {}
      dadosDaEdificacao.areaDoTerreno = this.projetoSelecionadoParaEdicao.dadosDaEdificacao.areaDoTerreno
      dadosDaEdificacao.areaConstruida = this.projetoSelecionadoParaEdicao.dadosDaEdificacao.areaConstruida
      dadosDaEdificacao.areaAnalisada = this.projetoSelecionadoParaEdicao.dadosDaEdificacao.areaAnalisada
      dadosDaEdificacao.alturaDescendente = this.projetoSelecionadoParaEdicao.dadosDaEdificacao.alturaDescendente
      dadosDaEdificacao.alturaEdificacao = this.projetoSelecionadoParaEdicao.dadosDaEdificacao.alturaEdificacao
      dadosDaEdificacao.numeroPavimentos = this.projetoSelecionadoParaEdicao.dadosDaEdificacao.numeroPavimentos

      projetoAserEditadoOsDadosComIdDoProjeto.dadosDaEdificacao = dadosDaEdificacao

      HTTPutils.editarOProjeto(projetoAserEditadoOsDadosComIdDoProjeto).then( avisoDoProjetoRetornadoJaEditado => {
        console.log("Projeto editado com sucesso!")
      })

    },

    removerProjeto(projetoAserRemovido){
      console.log(JSON.stringify(projetoAserRemovido))
      HTTPutils.removerProjeto(projetoAserRemovido)
        .then( resultado => {
          
          if(resultado != "Erro ao deletar projeto!" && resultado != undefined && resultado != null && resultado != {} && resultado != []){
            //Projeto deletado com sucesso
            const lista = this.projetos.filter(projeto => projeto._id !== resultado._id);

            this.projetos = [...lista]
            this.dialogDoProjetoSelecionadoParaDeletar = false
            this.snackbarDoProjetoSelecionadoJaDeletado = true
            return

          } else {
            alert("Houve algum problema ao deletar o projeto, por gentileza, informe o admin do site por meio do email: cardosodiaseduardo@gmail.com")
            return
          }
        })

      

    },

    salvarNovaEdificacaoNoQuadroDeAreas(){
      
      let objetoAserEditadoOQuadroDeAreas = {}
      let novaEdificacaoNoQuadroDeAreas = {}

      objetoAserEditadoOQuadroDeAreas._id = localStorage.getItem("projetoId")

      novaEdificacaoNoQuadroDeAreas.edificacaoNova = this.edificacaoNova
      novaEdificacaoNoQuadroDeAreas.areaTotalDaNovaEdificacao = this.areaTotalDaNovaEdificacao
      novaEdificacaoNoQuadroDeAreas.ambiente1DaNovaEdificacao = this.ambiente1DaNovaEdificacao
      novaEdificacaoNoQuadroDeAreas.ambiente2DaNovaEdificacao = this.ambiente2DaNovaEdificacao
      novaEdificacaoNoQuadroDeAreas.ambiente3DaNovaEdificacao = this.ambiente3DaNovaEdificacao

      objetoAserEditadoOQuadroDeAreas.quadroDeAreas = novaEdificacaoNoQuadroDeAreas
      
      let usuario = {}
      usuario._id = localStorage.getItem("_id")
      objetoAserEditadoOQuadroDeAreas.usuario = usuario

      HTTPutils.editarOProjeto(objetoAserEditadoOQuadroDeAreas)
        .then( objetoRetornadoDaApi => {
          console.log(JSON.stringify(objetoRetornadoDaApi))
        })

      this.quadroDeAreas.push(novaEdificacaoNoQuadroDeAreas)

    },

    buscarTodosOsDadosDoProjetoSelecionado(projetoAserEditado){
      
      if(projetoAserEditado !== {} && projetoAserEditado !== "editar os dados do projeto"){
        localStorage.setItem("projetoId", projetoAserEditado._id)
  
        HTTPutils.buscarProjetoEspecifico(projetoAserEditado)
          .then ( projetoRetornadoDaApi => {
            if(projetoRetornadoDaApi !== "Erro ao buscar o projeto específico!" || projetoRetornadoDaApi !== {} || projetoRetornadoDaApi !== []){
              //Projeto retornou
              this.projetoSelecionadoParaEdicao = projetoRetornadoDaApi
              this.quadroDeAreas = projetoRetornadoDaApi.quadroDeAreas
              if(this.mostrarProjetoSelecionado === false){
                this.snackbarDoProjetoSelecionadoParaEditar = true
              } else {
                this.snackbarDoProjetoSelecionadoParaEditar = false
              }
              this.ativar();
  
            } else {
              console.log("Erro ao buscar projeto específico!")
            }
          })

      } else {
        this.salvarEdicaoDosDadosDoProjeto()
      }
      

    },

    trazerDadosDosCnaes(){

      HTTPcnaeConexion.buscarCnaes()
        .then( resultado => {
          
          for(let i = 0; i < resultado.length; i++){
            let idDoCnae = JSON.stringify(resultado[i].id)
            let descricaoDoCnae = JSON.stringify(resultado[i].grupo.divisao.secao.descricao)
            let observacoesDoCnae = JSON.stringify(resultado[i].observacoes)
            const objetoDoCnae = ''
            objetoDoCnae = idDoCnae + ': ' + descricaoDoCnae + '/ Observações deste CNAE: ' + observacoesDoCnae
            this.cnaes.push(objetoDoCnae)
          }
        })

    },

    addNovoAmbiente(){
      this.novaEdificacao.edificacao.ambientes = JSON.stringify(this.novaEdificacao.edificacao.ambientes) + "Ambiente 4: Banheiro - Área de 5m²"
      console.log("this.novaEdificacao.edificacao.ambientes é: " + JSON.stringify(this.novaEdificacao.edificacao))
    }

  }
};
</script>

<style>
.conteudo {
  width: 100%;
  height: 100%;
  padding-left: 0px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-left: 10px;
  margin-right: 20px;
  margin-bottom: 0px;
  margin-top: 0px;
}
</style>