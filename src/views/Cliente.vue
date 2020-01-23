<template>
  <div>

    <!-- Componente1: Toolbar simples -->
    <div>
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
            <v-list-item @click="openPerfilEdit()">
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
    
    <!-- Dialog para editar o Usuário -->
    <template>
      <v-row justify="center">
        <v-dialog v-model="perfilEditDialog" max-width="600px">
          <v-card>
            <v-card-title>
              <v-icon class="mr-2">account_box</v-icon>
              <span class="headline">Perfil do Usuário</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>

                  <v-col cols="12">
                    <v-text-field label="Nome*" v-model="usuarioAeditar.nome" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Email*" v-model="usuarioAeditar.email" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Password*" v-model="usuarioAeditar.senha" type="password" required></v-text-field>
                  </v-col>

                </v-row>
              </v-container>
              <small>* Indica os campos obrigatórios</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" text @click="perfilEditDialog = false">Cancelar</v-btn>
              <v-btn color="success" text @click="editarDadosDoPerfilDoUsuario()">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

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
                    <v-alert v-if="alertaProjetoNaoSalvo === true" color="error" class>{{ msgErroSalvandoProjeto }}</v-alert>
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
                            <v-icon style="margin-left: 0px" @click="openDeleteProject(projeto)">{{ projeto.icon2 }}</v-icon>
                          </button>
                        </v-row>
                      </td>
                    </tr>
                  </tbody>

                  <!-- Caixa de confirmação para deletar um projeto -->
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
                          <v-btn color="success" text @click="removerProjeto()">
                            Sim
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>

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

          
          <!-- Botão de avançar ou recuar uma aba -->
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
            





            <v-row justify="start">
                <v-dialog v-model="caixaDeExpansaoDoAddEdificacao" max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Nova Edificação</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-row>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-text-field label="Nome do Espaço" hint="Ex.: Lounge" placeholder="Ex.: Lounge" v-model="edificacaoNova"></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-text-field label="Área Total do Espaço(em m²)" placeholder="Ex.: 100" suffix="m²" v-model="areaTotalDaNovaEdificacao"></v-text-field>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col cols="4">
                                    <v-text-field label="Nome do Ambiente 1" placeholder="Ex.: Bar" v-model="ambiente1DaNovaEdificacao"></v-text-field>
                                    <v-text-field label="Área" placeholder="Ex.: 65m²" suffix="m²" v-model="areaDoambiente1"></v-text-field>
                                  </v-col>
                                  <v-col cols="4">
                                    <v-text-field label="Nome do Ambiente 2" placeholder="Ex.: Cozinha" v-model="ambiente2DaNovaEdificacao"></v-text-field>
                                    <v-text-field label="Área" placeholder="Ex.: 35m²" suffix="m²" v-model="areaDoambiente2"></v-text-field>
                                  </v-col>
                                  <v-col cols="4">
                                    <v-text-field label="Nome do Ambiente 3" placeholder="Ex.: Administrativo" v-model="ambiente3DaNovaEdificacao"></v-text-field>
                                    <v-text-field label="Área" placeholder="Ex.: 15m²" suffix="m²" v-model="areaDoambiente3"></v-text-field>
                                  </v-col>
                                </v-row>

                            </v-row>
                        </v-container>
                        <small style="color: red">*Campos obrigatórios</small>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn color="error" text @click="caixaDeExpansaoDoAddEdificacao = false">Cancelar</v-btn>
                        <v-btn color="success" text @click="salvarItemNoQuadroDeAreas()">Salvar</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-row>

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
                          <v-expansion-panel v-for="item in quadroDeAreas" :key="item.edificacaoNova" append-icon="place">
                            <v-expansion-panel-header><h3>{{ item.edificacaoNova }}</h3></v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <h5>Área Total</h5>
                              <span>{{ item.areaTotalDaNovaEdificacao }}m²</span>
                              <h5>Ambientes internos</h5>
                              <div>
                                <span>{{ item.ambiente1DaNovaEdificacao }}: </span><span> {{ item.areaDoambiente1 }}m² </span><br>
                                <span>{{ item.ambiente2DaNovaEdificacao }}: </span><span> {{ item.areaDoambiente2 }}m² </span><br>
                                <span>{{ item.ambiente3DaNovaEdificacao }}: </span><span> {{ item.areaDoambiente3 }}m² </span>
                                <br>
                                <v-btn @click="editarItemDoQuadroDeAreas(item)" text>
                                  <v-icon>{{ item.edit }}</v-icon>
                                </v-btn>
                                <v-btn @click="deletarItemDoQuadroDeAreas(item)" text>
                                  <v-icon>{{ item.delete }}</v-icon>
                                </v-btn>
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
                    <v-autocomplete :items="cnaesDadosBrutos" v-model="cnaeEscolhido" label="Selecione o CNAE" item-text="descricao" item-value="codigoCNAE" chips max-height="auto" autocomplete return-object>
                     
                      <template slot="selection" slot-scope="data">
                        <v-chip :input-value="data.selected" :key="JSON.stringify(data.item)" close class="chip--select-multi" @input="data.parent.selectItem(data.item)">
                          {{ data.item.codigoCNAE }} : {{ data.item.descricao }}
                        </v-chip>
                      </template>

                    </v-autocomplete>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>

            <!-- <div id="app">
              <v-app id="inspire">
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex xs12 sm6>
                      <v-subheader v-text="'Slots'"></v-subheader>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-select :items="people" v-model="e11" label="Select" item-text="name" item-value="name" multiple chips max-height="auto" autocomplete return-object @input="console.log('coucou')">
                        
                        <template slot="selection" slot-scope="data">
                          <v-chip :selected="data.selected" :key="JSON.stringify(data.item)" close class="chip--select-multi" @input="data.parent.selectItem(data.item)">
                            <v-avatar>
                              <img :src="data.item.avatar">
                            </v-avatar>
                            {{ data.item.name }}
                          </v-chip>
                        </template>
                        
                        <template slot="item" slot-scope="data">
                          <template>
                            <v-list-tile-avatar>
                              <img :src="data.item.avatar">
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                              <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
                            </v-list-tile-content>
                          </template>
                        </template>
                      
                      </v-select>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-app>
            </div> -->

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
    projetoSelecionadoParaDeletar: {},
    
    quadroDeAreas: [],

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
    areaDoambiente1: '',
    ambiente2DaNovaEdificacao: "",
    areaDoambiente2: '',
    ambiente3DaNovaEdificacao: "",
    areaDoambiente3: '',

    caixaDeExpansaoDoAddEdificacao: false,

    //Array para integração com API do IBGE dos CNAEs
    cnaes: [],

    cnaesDadosBrutos: [
      {"codigoCNAE":"0111-3/01","codigoCNAEsemNumero":"0111301","descricao":"Cultivo de arroz"},
      {"codigoCNAE":"0111-3/02","codigoCNAEsemNumero":"0111302","descricao":"Cultivo de milho"},
      {"codigoCNAE":"0111-3/03","codigoCNAEsemNumero":"0111303","descricao":"Cultivo de trigo"},
      {"codigoCNAE":"0111-3/99","codigoCNAEsemNumero":"0111399","descricao":"Cultivo de outros cereais não especificados anteriormente"},
      {"codigoCNAE":"0112-1/01","codigoCNAEsemNumero":"0112101","descricao":"Cultivo de algodão herbáceo"},
      {"codigoCNAE":"0112-1/02","codigoCNAEsemNumero":"0112102","descricao":"Cultivo de juta"},
      {"codigoCNAE":"0112-1/99","codigoCNAEsemNumero":"0112199","descricao":"Cultivo de outras fibras de lavoura temporária não especificadas anteriormente"},
      {"codigoCNAE":"0113-0/00","codigoCNAEsemNumero":"0113000","descricao":"Cultivo de cana-de-açúcar"},
      {"codigoCNAE":"0114-8/00","codigoCNAEsemNumero":"0114800","descricao":"Cultivo de fumo"},
      {"codigoCNAE":"0115-6/00","codigoCNAEsemNumero":"0115600","descricao":"Cultivo de soja"},
      {"codigoCNAE":"0116-4/01","codigoCNAEsemNumero":"0116401","descricao":"Cultivo de amendoim"},
      {"codigoCNAE":"0116-4/02","codigoCNAEsemNumero":"0116402","descricao":"Cultivo de girassol"},
      {"codigoCNAE":"0116-4/03","codigoCNAEsemNumero":"0116403","descricao":"Cultivo de mamona"},
      {"codigoCNAE":"0116-4/99","codigoCNAEsemNumero":"0116499","descricao":"Cultivo de outras oleaginosas de lavoura temporária não especificadas anteriormente"},
      {"codigoCNAE":"0119-9/01","codigoCNAEsemNumero":"0119901","descricao":"Cultivo de abacaxi"},
      {"codigoCNAE":"0119-9/02","codigoCNAEsemNumero":"0119902","descricao":"Cultivo de alho"},
      {"codigoCNAE":"0119-9/03","codigoCNAEsemNumero":"0119903","descricao":"Cultivo de batata-inglesa"},
      {"codigoCNAE":"0119-9/04","codigoCNAEsemNumero":"0119904","descricao":"Cultivo de cebola"},
      {"codigoCNAE":"0119-9/05","codigoCNAEsemNumero":"0119905","descricao":"Cultivo de feijão"},
      {"codigoCNAE":"0119-9/06","codigoCNAEsemNumero":"0119906","descricao":"Cultivo de mandioca"},
      {"codigoCNAE":"0119-9/07","codigoCNAEsemNumero":"0119907","descricao":"Cultivo de melão"},
      {"codigoCNAE":"0119-9/08","codigoCNAEsemNumero":"0119908","descricao":"Cultivo de melancia"},
      {"codigoCNAE":"0119-9/09","codigoCNAEsemNumero":"0119909","descricao":"Cultivo de tomate rasteiro"},
      {"codigoCNAE":"0119-9/99","codigoCNAEsemNumero":"0119999","descricao":"Cultivo de outras plantas de lavoura temporária não especificadas anteriormente"},
      {"codigoCNAE":"0121-1/01","codigoCNAEsemNumero":"0121101","descricao":"Horticultura, exceto morango"},
      {"codigoCNAE":"0121-1/02","codigoCNAEsemNumero":"0121102","descricao":"Cultivo de morango"},
      {"codigoCNAE":"0122-9/00","codigoCNAEsemNumero":"0122900","descricao":"Cultivo de flores e plantas ornamentais"},
      {"codigoCNAE":"0131-8/00","codigoCNAEsemNumero":"0131800","descricao":"Cultivo de laranja"},
      {"codigoCNAE":"0132-6/00","codigoCNAEsemNumero":"0132600","descricao":"Cultivo de uva"},
      {"codigoCNAE":"0133-4/01","codigoCNAEsemNumero":"0133401","descricao":"Cultivo de açaí"},
      {"codigoCNAE":"0133-4/02","codigoCNAEsemNumero":"0133402","descricao":"Cultivo de banana"},
      {"codigoCNAE":"0133-4/03","codigoCNAEsemNumero":"0133403","descricao":"Cultivo de caju"},
      {"codigoCNAE":"0133-4/04","codigoCNAEsemNumero":"0133404","descricao":"Cultivo de cítricos, exceto laranja"},
      {"codigoCNAE":"0133-4/05","codigoCNAEsemNumero":"0133405","descricao":"Cultivo de coco-da-baía"},
      {"codigoCNAE":"0133-4/06","codigoCNAEsemNumero":"0133406","descricao":"Cultivo de guaraná"},
      {"codigoCNAE":"0133-4/07","codigoCNAEsemNumero":"0133407","descricao":"Cultivo de maçã"},
      {"codigoCNAE":"0133-4/08","codigoCNAEsemNumero":"0133408","descricao":"Cultivo de mamão"},
      {"codigoCNAE":"0133-4/09","codigoCNAEsemNumero":"0133409","descricao":"Cultivo de maracujá"},
      {"codigoCNAE":"0133-4/10","codigoCNAEsemNumero":"0133410","descricao":"Cultivo de manga"},
      {"codigoCNAE":"0133-4/11","codigoCNAEsemNumero":"0133411","descricao":"Cultivo de pêssego"},
      {"codigoCNAE":"0133-4/99","codigoCNAEsemNumero":"0133499","descricao":"Cultivo de frutas de lavoura permanente não especificadas anteriormente"},
      {"codigoCNAE":"0134-2/00","codigoCNAEsemNumero":"0134200","descricao":"Cultivo de café"},
      {"codigoCNAE":"0135-1/00","codigoCNAEsemNumero":"0135100","descricao":"Cultivo de cacau"},
      {"codigoCNAE":"0139-3/01","codigoCNAEsemNumero":"0139301","descricao":"Cultivo de chá-da-índia"},
      {"codigoCNAE":"0139-3/02","codigoCNAEsemNumero":"0139302","descricao":"Cultivo de erva-mate"},
      {"codigoCNAE":"0139-3/03","codigoCNAEsemNumero":"0139303","descricao":"Cultivo de pimenta-do-reino"},
      {"codigoCNAE":"0139-3/04","codigoCNAEsemNumero":"0139304","descricao":"Cultivo de plantas para condimento, exceto pimenta-do-reino"},
      {"codigoCNAE":"0139-3/05","codigoCNAEsemNumero":"0139305","descricao":"Cultivo de dendê"},
      {"codigoCNAE":"0139-3/06","codigoCNAEsemNumero":"0139306","descricao":"Cultivo de seringueira"},
      {"codigoCNAE":"0139-3/99","codigoCNAEsemNumero":"0139399","descricao":"Cultivo de outras plantas de lavoura permanente não especificadas anteriormente"},
      {"codigoCNAE":"0141-5/01","codigoCNAEsemNumero":"0141501","descricao":"Produção de sementes certificadas, exceto de forrageiras para pasto"},
      {"codigoCNAE":"0141-5/02","codigoCNAEsemNumero":"0141502","descricao":"Produção de sementes certificadas de forrageiras para formação de pasto"},
      {"codigoCNAE":"0142-3/00","codigoCNAEsemNumero":"0142300","descricao":"Produção de mudas e outras formas de propagação vegetal, certificadas"},
      {"codigoCNAE":"0151-2/01","codigoCNAEsemNumero":"0151201","descricao":"Criação de bovinos para corte"},
      {"codigoCNAE":"0151-2/02","codigoCNAEsemNumero":"0151202","descricao":"Criação de bovinos para leite"},
      {"codigoCNAE":"0151-2/03","codigoCNAEsemNumero":"0151203","descricao":"Criação de bovinos, exceto para corte e leite"},
      {"codigoCNAE":"0152-1/01","codigoCNAEsemNumero":"0152101","descricao":"Criação de bufalinos"},
      {"codigoCNAE":"0152-1/02","codigoCNAEsemNumero":"0152102","descricao":"Criação de equinos"},
      {"codigoCNAE":"0152-1/03","codigoCNAEsemNumero":"0152103","descricao":"Criação de asininos e muares"},
      {"codigoCNAE":"0153-9/01","codigoCNAEsemNumero":"0153901","descricao":"Criação de caprinos"},
      {"codigoCNAE":"0153-9/02","codigoCNAEsemNumero":"0153902","descricao":"Criação de ovinos, inclusive para produção de lã"},
      {"codigoCNAE":"0154-7/00","codigoCNAEsemNumero":"0154700","descricao":"Criação de suínos"},
      {"codigoCNAE":"0155-5/01","codigoCNAEsemNumero":"0155501","descricao":"Criação de frangos para corte"},
      {"codigoCNAE":"0155-5/02","codigoCNAEsemNumero":"0155502","descricao":"Produção de pintos de um dia"},
      {"codigoCNAE":"0155-5/03","codigoCNAEsemNumero":"0155503","descricao":"Criação de outros galináceos, exceto para corte"},
      {"codigoCNAE":"0155-5/04","codigoCNAEsemNumero":"0155504","descricao":"Criação de aves, exceto galináceos"},
      {"codigoCNAE":"0155-5/05","codigoCNAEsemNumero":"0155505","descricao":"Produção de ovos"},
      {"codigoCNAE":"0159-8/01","codigoCNAEsemNumero":"0159801","descricao":"Apicultura"},
      {"codigoCNAE":"0159-8/02","codigoCNAEsemNumero":"0159802","descricao":"Criação de animais de estimação"},
      {"codigoCNAE":"0159-8/03","codigoCNAEsemNumero":"0159803","descricao":"Criação de escargô"},
      {"codigoCNAE":"0159-8/04","codigoCNAEsemNumero":"0159804","descricao":"Criação de bicho-da-seda"},
      {"codigoCNAE":"0159-8/99","codigoCNAEsemNumero":"0159899","descricao":"Criação de outros animais não especificados anteriormente"},
      {"codigoCNAE":"0161-0/01","codigoCNAEsemNumero":"0161001","descricao":"Serviço de pulverização e controle de pragas agrícolas"},
      {"codigoCNAE":"0161-0/02","codigoCNAEsemNumero":"0161002","descricao":"Serviço de poda de árvores para lavouras"},
      {"codigoCNAE":"0161-0/03","codigoCNAEsemNumero":"0161003","descricao":"Serviço de preparação de terreno, cultivo e colheita"},
      {"codigoCNAE":"0161-0/99","codigoCNAEsemNumero":"0161099","descricao":"Atividades de apoio à agricultura não especificadas anteriormente"},
      {"codigoCNAE":"0162-8/01","codigoCNAEsemNumero":"0162801","descricao":"Serviço de inseminação artificial em animais"},
      {"codigoCNAE":"0162-8/02","codigoCNAEsemNumero":"0162802","descricao":"Serviço de tosquiamento de ovinos"},
      {"codigoCNAE":"0162-8/03","codigoCNAEsemNumero":"0162803","descricao":"Serviço de manejo de animais"},
      {"codigoCNAE":"0162-8/99","codigoCNAEsemNumero":"0162899","descricao":"Atividades de apoio à pecuária não especificadas anteriormente"},
      {"codigoCNAE":"0163-6/00","codigoCNAEsemNumero":"0163600","descricao":"Atividades de pós-colheita"},
      {"codigoCNAE":"0170-9/00","codigoCNAEsemNumero":"0170900","descricao":"Caça e serviços relacionados"},
      {"codigoCNAE":"0210-1/01","codigoCNAEsemNumero":"0210101","descricao":"Cultivo de eucalipto"},
      {"codigoCNAE":"0210-1/02","codigoCNAEsemNumero":"0210102","descricao":"Cultivo de acácia-negra"},
      {"codigoCNAE":"0210-1/03","codigoCNAEsemNumero":"0210103","descricao":"Cultivo de pinus"},
      {"codigoCNAE":"0210-1/04","codigoCNAEsemNumero":"0210104","descricao":"Cultivo de teca"},
      {"codigoCNAE":"0210-1/05","codigoCNAEsemNumero":"0210105","descricao":"Cultivo de espécies madeireiras, exceto eucalipto, acácia-negra, pinus e teca"},
      {"codigoCNAE":"0210-1/06","codigoCNAEsemNumero":"0210106","descricao":"Cultivo de mudas em viveiros florestais"},
      {"codigoCNAE":"0210-1/07","codigoCNAEsemNumero":"0210107","descricao":"Extração de madeira em florestas plantadas"},
      {"codigoCNAE":"0210-1/08","codigoCNAEsemNumero":"0210108","descricao":"Produção de carvão vegetal - florestas plantadas"},
      {"codigoCNAE":"0210-1/09","codigoCNAEsemNumero":"0210109","descricao":"Produção de casca de acácia-negra - florestas plantadas"},
      {"codigoCNAE":"0210-1/99","codigoCNAEsemNumero":"0210199","descricao":"Produção de produtos não madeireiros não especificados anteriormente em florestas plantadas"},
      {"codigoCNAE":"0220-9/01","codigoCNAEsemNumero":"0220901","descricao":"Extração de madeira em florestas nativas"},
      {"codigoCNAE":"0220-9/02","codigoCNAEsemNumero":"0220902","descricao":"Produção de carvão vegetal - florestas nativas"},
      {"codigoCNAE":"0220-9/03","codigoCNAEsemNumero":"0220903","descricao":"Coleta de castanha-do-pará em florestas nativas"},
      {"codigoCNAE":"0220-9/04","codigoCNAEsemNumero":"0220904","descricao":"Coleta de látex em florestas nativas"},
      {"codigoCNAE":"0220-9/05","codigoCNAEsemNumero":"0220905","descricao":"Coleta de palmito em florestas nativas"},
      {"codigoCNAE":"0220-9/06","codigoCNAEsemNumero":"0220906","descricao":"Conservação de florestas nativas"},
      {"codigoCNAE":"0220-9/99","codigoCNAEsemNumero":"0220999","descricao":"Coleta de produtos não madeireiros não especificados anteriormente em florestas nativas"},
      {"codigoCNAE":"0230-6/00","codigoCNAEsemNumero":"0230600","descricao":"Atividades de apoio à produção florestal"},
      {"codigoCNAE":"0311-6/01","codigoCNAEsemNumero":"0311601","descricao":"Pesca de peixes em água salgada"},
      {"codigoCNAE":"0311-6/02","codigoCNAEsemNumero":"0311602","descricao":"Pesca de crustáceos e moluscos em água salgada"},
      {"codigoCNAE":"0311-6/03","codigoCNAEsemNumero":"0311603","descricao":"Coleta de outros produtos marinhos"},
      {"codigoCNAE":"0311-6/04","codigoCNAEsemNumero":"0311604","descricao":"Atividades de apoio à pesca em água salgada"},
      {"codigoCNAE":"0312-4/01","codigoCNAEsemNumero":"0312401","descricao":"Pesca de peixes em água doce"},
      {"codigoCNAE":"0312-4/02","codigoCNAEsemNumero":"0312402","descricao":"Pesca de crustáceos e moluscos em água doce"},
      {"codigoCNAE":"0312-4/03","codigoCNAEsemNumero":"0312403","descricao":"Coleta de outros produtos aquáticos de água doce"},
      {"codigoCNAE":"0312-4/04","codigoCNAEsemNumero":"0312404","descricao":"Atividades de apoio à pesca em água doce"},
      {"codigoCNAE":"0321-3/01","codigoCNAEsemNumero":"0321301","descricao":"Criação de peixes em água salgada e salobra"},
      {"codigoCNAE":"0321-3/02","codigoCNAEsemNumero":"0321302","descricao":"Criação de camarões em água salgada e salobra"},
      {"codigoCNAE":"0321-3/03","codigoCNAEsemNumero":"0321303","descricao":"Criação de ostras e mexilhões em água salgada e salobra"},
      {"codigoCNAE":"0321-3/04","codigoCNAEsemNumero":"0321304","descricao":"Criação de peixes ornamentais em água salgada e salobra"},
      {"codigoCNAE":"0321-3/05","codigoCNAEsemNumero":"0321305","descricao":"Atividades de apoio à aquicultura em água salgada e salobra"},
      {"codigoCNAE":"0321-3/99","codigoCNAEsemNumero":"0321399","descricao":"Cultivos e semicultivos da aquicultura em água salgada e salobra não especificados anteriormente"},
      {"codigoCNAE":"0322-1/01","codigoCNAEsemNumero":"0322101","descricao":"Criação de peixes em água doce"},
      {"codigoCNAE":"0322-1/02","codigoCNAEsemNumero":"0322102","descricao":"Criação de camarões em água doce"},
      {"codigoCNAE":"0322-1/03","codigoCNAEsemNumero":"0322103","descricao":"Criação de ostras e mexilhões em água doce"},
      {"codigoCNAE":"0322-1/04","codigoCNAEsemNumero":"0322104","descricao":"Criação de peixes ornamentais em água doce"},
      {"codigoCNAE":"0322-1/05","codigoCNAEsemNumero":"0322105","descricao":"Ranicultura"},
      {"codigoCNAE":"0322-1/06","codigoCNAEsemNumero":"0322106","descricao":"Criação de jacaré"},
      {"codigoCNAE":"0322-1/07","codigoCNAEsemNumero":"0322107","descricao":"Atividades de apoio à aquicultura em água doce"},
      {"codigoCNAE":"0322-1/99","codigoCNAEsemNumero":"0322199","descricao":"Cultivos e semicultivos da aquicultura em água doce não especificados anteriormente"},
      {"codigoCNAE":"0500-3/01","codigoCNAEsemNumero":"0500301","descricao":"Extração de carvão mineral"},
      {"codigoCNAE":"0500-3/02","codigoCNAEsemNumero":"0500302","descricao":"Beneficiamento de carvão mineral"},
      {"codigoCNAE":"0600-0/01","codigoCNAEsemNumero":"0600001","descricao":"Extração de petróleo e gás natural"},
      {"codigoCNAE":"0600-0/02","codigoCNAEsemNumero":"0600002","descricao":"Extração e beneficiamento de xisto"},
      {"codigoCNAE":"0600-0/03","codigoCNAEsemNumero":"0600003","descricao":"Extração e beneficiamento de areias betuminosas"},
      {"codigoCNAE":"0710-3/01","codigoCNAEsemNumero":"0710301","descricao":"Extração de minério de ferro"},
      {"codigoCNAE":"0710-3/02","codigoCNAEsemNumero":"0710302","descricao":"Pelotização, sinterização e outros beneficiamentos de minério de ferro"},
      {"codigoCNAE":"0721-9/01","codigoCNAEsemNumero":"0721901","descricao":"Extração de minério de alumínio"},
      {"codigoCNAE":"0721-9/02","codigoCNAEsemNumero":"0721902","descricao":"Beneficiamento de minério de alumínio"},
      {"codigoCNAE":"0722-7/01","codigoCNAEsemNumero":"0722701","descricao":"Extração de minério de estanho"},
      {"codigoCNAE":"0722-7/02","codigoCNAEsemNumero":"0722702","descricao":"Beneficiamento de minério de estanho"},
      {"codigoCNAE":"0723-5/01","codigoCNAEsemNumero":"0723501","descricao":"Extração de minério de manganês"},
      {"codigoCNAE":"0723-5/02","codigoCNAEsemNumero":"0723502","descricao":"Beneficiamento de minério de manganês"},
      {"codigoCNAE":"0724-3/01","codigoCNAEsemNumero":"0724301","descricao":"Extração de minério de metais preciosos"},
      {"codigoCNAE":"0724-3/02","codigoCNAEsemNumero":"0724302","descricao":"Beneficiamento de minério de metais preciosos"},
      {"codigoCNAE":"0725-1/00","codigoCNAEsemNumero":"0725100","descricao":"Extração de minerais radioativos"},
      {"codigoCNAE":"0729-4/01","codigoCNAEsemNumero":"0729401","descricao":"Extração de minérios de nióbio e titânio"},
      {"codigoCNAE":"0729-4/02","codigoCNAEsemNumero":"0729402","descricao":"Extração de minério de tungstênio"},
      {"codigoCNAE":"0729-4/03","codigoCNAEsemNumero":"0729403","descricao":"Extração de minério de níquel"},
      {"codigoCNAE":"0729-4/04","codigoCNAEsemNumero":"0729404","descricao":"Extração de minérios de cobre, chumbo, zinco e outros minerais metálicos não ferrosos não especificados anteriormente"},
      {"codigoCNAE":"0729-4/05","codigoCNAEsemNumero":"0729405","descricao":"Beneficiamento de minérios de cobre, chumbo, zinco e outros minerais metálicos não ferrosos não especificados anteriormente"},
      {"codigoCNAE":"0810-0/01","codigoCNAEsemNumero":"0810001","descricao":"Extração de ardósia e beneficiamento associado"},
      {"codigoCNAE":"0810-0/02","codigoCNAEsemNumero":"0810002","descricao":"Extração de granito e beneficiamento associado"},
      {"codigoCNAE":"0810-0/03","codigoCNAEsemNumero":"0810003","descricao":"Extração de mármore e beneficiamento associado"},
      {"codigoCNAE":"0810-0/04","codigoCNAEsemNumero":"0810004","descricao":"Extração de calcário e dolomita e beneficiamento associado"},
      {"codigoCNAE":"0810-0/05","codigoCNAEsemNumero":"0810005","descricao":"Extração de gesso e caulim"},
      {"codigoCNAE":"0810-0/06","codigoCNAEsemNumero":"0810006","descricao":"Extração de areia, cascalho ou pedregulho e beneficiamento associado"},
      {"codigoCNAE":"0810-0/07","codigoCNAEsemNumero":"0810007","descricao":"Extração de argila e beneficiamento associado"},
      {"codigoCNAE":"0810-0/08","codigoCNAEsemNumero":"0810008","descricao":"Extração de saibro e beneficiamento associado"},
      {"codigoCNAE":"0810-0/09","codigoCNAEsemNumero":"0810009","descricao":"Extração de basalto e beneficiamento associado"},
      {"codigoCNAE":"0810-0/10","codigoCNAEsemNumero":"0810010","descricao":"Beneficiamento de gesso e caulim associado à extração"},
      {"codigoCNAE":"0810-0/99","codigoCNAEsemNumero":"0810099","descricao":"Extração e britamento de pedras e outros materiais para construção e beneficiamento associado"},
      {"codigoCNAE":"0891-6/00","codigoCNAEsemNumero":"0891600","descricao":"Extração de minerais para fabricação de adubos, fertilizantes e outros produtos químicos"},
      {"codigoCNAE":"0892-4/01","codigoCNAEsemNumero":"0892401","descricao":"Extração de sal marinho"},
      {"codigoCNAE":"0892-4/02","codigoCNAEsemNumero":"0892402","descricao":"Extração de sal-gema"},
      {"codigoCNAE":"0892-4/03","codigoCNAEsemNumero":"0892403","descricao":"Refino e outros tratamentos do sal"},
      {"codigoCNAE":"0893-2/00","codigoCNAEsemNumero":"0893200","descricao":"Extração de gemas (pedras preciosas e semipreciosas)"},
      {"codigoCNAE":"0899-1/01","codigoCNAEsemNumero":"0899101","descricao":"Extração de grafita"},
      {"codigoCNAE":"0899-1/02","codigoCNAEsemNumero":"0899102","descricao":"Extração de quartzo"},
      {"codigoCNAE":"0899-1/03","codigoCNAEsemNumero":"0899103","descricao":"Extração de amianto"},
      {"codigoCNAE":"0899-1/99","codigoCNAEsemNumero":"0899199","descricao":"Extração de outros minerais não metálicos não especificados anteriormente"},
      {"codigoCNAE":"0910-6/00","codigoCNAEsemNumero":"0910600","descricao":"Atividades de apoio à extração de petróleo e gás natural"},
      {"codigoCNAE":"0990-4/01","codigoCNAEsemNumero":"0990401","descricao":"Atividades de apoio à extração de minério de ferro"},
      {"codigoCNAE":"0990-4/02","codigoCNAEsemNumero":"0990402","descricao":"Atividades de apoio à extração de minerais metálicos não ferrosos"},
      {"codigoCNAE":"0990-4/03","codigoCNAEsemNumero":"0990403","descricao":"Atividades de apoio à extração de minerais não metálicos"},
      {"codigoCNAE":"1011-2/01","codigoCNAEsemNumero":"1011201","descricao":"Frigorífico - abate de bovinos"},
      {"codigoCNAE":"1011-2/02","codigoCNAEsemNumero":"1011202","descricao":"Frigorífico - abate de equinos"},
      {"codigoCNAE":"1011-2/03","codigoCNAEsemNumero":"1011203","descricao":"Frigorífico - abate de ovinos e caprinos"}	,
      {"codigoCNAE":"1011-2/04","codigoCNAEsemNumero":"1011204","descricao":"Frigorífico - abate de bufalinos"},
      {"codigoCNAE":"1011-2/05","codigoCNAEsemNumero":"1011205","descricao":"Matadouro - abate de reses sob contrato, exceto abate de suínos"},
      {"codigoCNAE":"1012-1/01","codigoCNAEsemNumero":"1012101","descricao":"Abate de aves"},
      {"codigoCNAE":"1012-1/02","codigoCNAEsemNumero":"1012102","descricao":"Abate de pequenos animais"},
      {"codigoCNAE":"1012-1/03","codigoCNAEsemNumero":"1012103","descricao":"Frigorífico - abate de suínos"},
      {"codigoCNAE":"1012-1/04","codigoCNAEsemNumero":"1012104","descricao":"Matadouro - abate de suínos sob contrato"},
      {"codigoCNAE":"1013-9/01","codigoCNAEsemNumero":"1013901","descricao":"Fabricação de produtos de carne"},
      {"codigoCNAE":"1013-9/02","codigoCNAEsemNumero":"1013902","descricao":"Preparação de subprodutos do abate"},
      {"codigoCNAE":"1020-1/01","codigoCNAEsemNumero":"1020101","descricao":"Preservação de peixes, crustáceos e moluscos"},
      {"codigoCNAE":"1020-1/02","codigoCNAEsemNumero":"1020102","descricao":"Fabricação de conservas de peixes, crustáceos e moluscos"},
      {"codigoCNAE":"1031-7/00","codigoCNAEsemNumero":"1031700","descricao":"Fabricação de conservas de frutas"},
      {"codigoCNAE":"1032-5/01","codigoCNAEsemNumero":"1032501","descricao":"Fabricação de conservas de palmito"},
      {"codigoCNAE":"1032-5/99","codigoCNAEsemNumero":"1032599","descricao":"Fabricação de conservas de legumes e outros vegetais, exceto palmito"},
      {"codigoCNAE":"1033-3/01","codigoCNAEsemNumero":"1033301","descricao":"Fabricação de sucos concentrados de frutas, hortaliças e legumes"},
      {"codigoCNAE":"1033-3/02","codigoCNAEsemNumero":"1033302","descricao":"Fabricação de sucos de frutas, hortaliças e legumes, exceto concentrados"},
      {"codigoCNAE":"1041-4/00","codigoCNAEsemNumero":"1041400","descricao":"Fabricação de óleos vegetais em bruto, exceto óleo de milho"},
      {"codigoCNAE":"1042-2/00","codigoCNAEsemNumero":"1042200","descricao":"Fabricação de óleos vegetais refinados, exceto óleo de milho"},
      {"codigoCNAE":"1043-1/00","codigoCNAEsemNumero":"1043100","descricao":"Fabricação de margarina e outras gorduras vegetais e de óleos não comestíveis de animais"},
      {"codigoCNAE":"1051-1/00","codigoCNAEsemNumero":"1051100","descricao":"Preparação do leite"},
      {"codigoCNAE":"1052-0/00","codigoCNAEsemNumero":"1052000","descricao":"Fabricação de laticínios"},
      {"codigoCNAE":"1053-8/00","codigoCNAEsemNumero":"1053800","descricao":"Fabricação de sorvetes e outros gelados comestíveis"},
      {"codigoCNAE":"1061-9/01","codigoCNAEsemNumero":"1061901","descricao":"Beneficiamento de arroz"},
      {"codigoCNAE":"1061-9/02","codigoCNAEsemNumero":"1061902","descricao":"Fabricação de produtos do arroz"},
      {"codigoCNAE":"1062-7/00","codigoCNAEsemNumero":"1062700","descricao":"Moagem de trigo e fabricação de derivados"},
      {"codigoCNAE":"1063-5/00","codigoCNAEsemNumero":"1063500","descricao":"Fabricação de farinha de mandioca e derivados"},
      {"codigoCNAE":"1064-3/00","codigoCNAEsemNumero":"1064300","descricao":"Fabricação de farinha de milho e derivados, exceto óleos de milho"},
      {"codigoCNAE":"1065-1/01","codigoCNAEsemNumero":"1065101","descricao":"Fabricação de amidos e féculas de vegetais"},
      {"codigoCNAE":"1065-1/02","codigoCNAEsemNumero":"1065102","descricao":"Fabricação de óleo de milho em bruto"},
      {"codigoCNAE":"1065-1/03","codigoCNAEsemNumero":"1065103","descricao":"Fabricação de óleo de milho refinado"},
      {"codigoCNAE":"1066-0/00","codigoCNAEsemNumero":"1066000","descricao":"Fabricação de alimentos para animais"},
      {"codigoCNAE":"1069-4/00","codigoCNAEsemNumero":"1069400","descricao":"Moagem e fabricação de produtos de origem vegetal não especificados anteriormente"},
      {"codigoCNAE":"1071-6/00","codigoCNAEsemNumero":"1071600","descricao":"Fabricação de açúcar em bruto"},
      {"codigoCNAE":"1072-4/01","codigoCNAEsemNumero":"1072401","descricao":"Fabricação de açúcar de cana refinado"},
      {"codigoCNAE":"1072-4/02","codigoCNAEsemNumero":"1072402","descricao":"Fabricação de açúcar de cereais (dextrose) e de beterraba"},
      {"codigoCNAE":"1081-3/01","codigoCNAEsemNumero":"1081301","descricao":"Beneficiamento de café"},
      {"codigoCNAE":"1081-3/02","codigoCNAEsemNumero":"1081302","descricao":"Torrefação e moagem de café"},
      {"codigoCNAE":"1082-1/00","codigoCNAEsemNumero":"1082100","descricao":"Fabricação de produtos à base de café"},
      {"codigoCNAE":"1091-1/01","codigoCNAEsemNumero":"1091101","descricao":"Fabricação de produtos de panificação industrial"},
      {"codigoCNAE":"1091-1/02","codigoCNAEsemNumero":"1091102","descricao":"Fabricação de produtos de padaria e confeitaria com predominância de produção própria"},
      {"codigoCNAE":"1092-9/00","codigoCNAEsemNumero":"1092900","descricao":"Fabricação de biscoitos e bolachas"},
      {"codigoCNAE":"1093-7/01","codigoCNAEsemNumero":"1093701","descricao":"Fabricação de produtos derivados do cacau e de chocolates"},
      {"codigoCNAE":"1093-7/02","codigoCNAEsemNumero":"1093702","descricao":"Fabricação de frutas cristalizadas, balas e semelhantes"},
      {"codigoCNAE":"1094-5/00","codigoCNAEsemNumero":"1094500","descricao":"Fabricação de massas alimentícias"},
      {"codigoCNAE":"1095-3/00","codigoCNAEsemNumero":"1095300","descricao":"Fabricação de especiarias, molhos, temperos e condimentos"},
      {"codigoCNAE":"1096-1/00","codigoCNAEsemNumero":"1096100","descricao":"Fabricação de alimentos e pratos prontos"},
      {"codigoCNAE":"1099-6/01","codigoCNAEsemNumero":"1099601","descricao":"Fabricação de vinagres"},
      {"codigoCNAE":"1099-6/02","codigoCNAEsemNumero":"1099602","descricao":"Fabricação de pós-alimentícios"},
      {"codigoCNAE":"1099-6/03","codigoCNAEsemNumero":"1099603","descricao":"Fabricação de fermentos e leveduras"},
      {"codigoCNAE":"1099-6/04","codigoCNAEsemNumero":"1099604","descricao":"Fabricação de gelo comum"},
      {"codigoCNAE":"1099-6/05","codigoCNAEsemNumero":"1099605","descricao":"Fabricação de produtos para infusão (chá, mate, etc.)"},
      {"codigoCNAE":"1099-6/06","codigoCNAEsemNumero":"1099606","descricao":"Fabricação de adoçantes naturais e artificiais"},
      {"codigoCNAE":"1099-6/07","codigoCNAEsemNumero":"1099607","descricao":"Fabricação de alimentos dietéticos e complementos alimentares"},
      {"codigoCNAE":"1099-6/99","codigoCNAEsemNumero":"1099699","descricao":"Fabricação de outros produtos alimentícios não especificados anteriormente"},
      {"codigoCNAE":"1111-9/01","codigoCNAEsemNumero":"1111901","descricao":"Fabricação de aguardente de cana-de-açúcar"},
      {"codigoCNAE":"1111-9/02","codigoCNAEsemNumero":"1111902","descricao":"Fabricação de outras aguardentes e bebidas destiladas"},
      {"codigoCNAE":"1112-7/00","codigoCNAEsemNumero":"1112700","descricao":"Fabricação de vinho"},
      {"codigoCNAE":"1113-5/01","codigoCNAEsemNumero":"1113501","descricao":"Fabricação de malte, inclusive malte uísque"},
      {"codigoCNAE":"1113-5/02","codigoCNAEsemNumero":"1113502","descricao":"Fabricação de cervejas e chopes"},
      {"codigoCNAE":"1121-6/00","codigoCNAEsemNumero":"1121600","descricao":"Fabricação de águas envasadas"},
      {"codigoCNAE":"1122-4/01","codigoCNAEsemNumero":"1122401","descricao":"Fabricação de refrigerantes"},
      {"codigoCNAE":"1122-4/02","codigoCNAEsemNumero":"1122402","descricao":"Fabricação de chá mate e outros chás prontos para consumo"},
      {"codigoCNAE":"1122-4/03","codigoCNAEsemNumero":"1122403","descricao":"Fabricação de refrescos, xaropes e pós para refrescos, exceto refrescos de frutas"},
      {"codigoCNAE":"1122-4/04","codigoCNAEsemNumero":"1122404","descricao":"Fabricação de bebidas isotônicas"},
      {"codigoCNAE":"1122-4/99","codigoCNAEsemNumero":"1122499","descricao":"Fabricação de outras bebidas não alcoólicas não especificadas anteriormente"},
      {"codigoCNAE":"1210-7/00","codigoCNAEsemNumero":"1210700","descricao":"Processamento industrial do fumo"},
      {"codigoCNAE":"1220-4/01","codigoCNAEsemNumero":"1220401","descricao":"Fabricação de cigarros"},
      {"codigoCNAE":"1220-4/02","codigoCNAEsemNumero":"1220402","descricao":"Fabricação de cigarrilhas e charutos"},
      {"codigoCNAE":"1220-4/03","codigoCNAEsemNumero":"1220403","descricao":"Fabricação de filtros para cigarros"},
      {"codigoCNAE":"1220-4/99","codigoCNAEsemNumero":"1220499","descricao":"Fabricação de outros produtos do fumo, exceto cigarros, cigarrilhas e charutos"},
      {"codigoCNAE":"1311-1/00","codigoCNAEsemNumero":"1311100","descricao":"Preparação e fiação de fibras de algodão"},
      {"codigoCNAE":"1312-0/00","codigoCNAEsemNumero":"1312000","descricao":"Preparação e fiação de fibras têxteis naturais, exceto algodão"},
      {"codigoCNAE":"1313-8/00","codigoCNAEsemNumero":"1313800","descricao":"Fiação de fibras artificiais e sintéticas"},
      {"codigoCNAE":"1314-6/00","codigoCNAEsemNumero":"1314600","descricao":"Fabricação de linhas para costurar e bordar"},
      {"codigoCNAE":"1321-9/00","codigoCNAEsemNumero":"1321900","descricao":"Tecelagem de fios de algodão"},
      {"codigoCNAE":"1322-7/00","codigoCNAEsemNumero":"1322700","descricao":"Tecelagem de fios de fibras têxteis naturais, exceto algodão"},
      {"codigoCNAE":"1323-5/00","codigoCNAEsemNumero":"1323500","descricao":"Tecelagem de fios de fibras artificiais e sintéticas"},
      {"codigoCNAE":"1330-8/00","codigoCNAEsemNumero":"1330800","descricao":"Fabricação de tecidos de malha"},
      {"codigoCNAE":"1340-5/01","codigoCNAEsemNumero":"1340501","descricao":"Estamparia e texturização em fios, tecidos, artefatos têxteis e peças do vestuário"},
      {"codigoCNAE":"1340-5/02","codigoCNAEsemNumero":"1340502","descricao":"Alvejamento, tingimento e torção em fios, tecidos, artefatos têxteis e peças do vestuário"},
      {"codigoCNAE":"1340-5/99","codigoCNAEsemNumero":"1340599","descricao":"Outros serviços de acabamento em fios, tecidos, artefatos têxteis e peças do vestuário"},
      {"codigoCNAE":"1351-1/00","codigoCNAEsemNumero":"1351100","descricao":"Fabricação de artefatos têxteis para uso doméstico"},
      {"codigoCNAE":"1352-9/00","codigoCNAEsemNumero":"1352900","descricao":"Fabricação de artefatos de tapeçaria"},
      {"codigoCNAE":"1353-7/00","codigoCNAEsemNumero":"1353700","descricao":"Fabricação de artefatos de cordoaria"},
      {"codigoCNAE":"1354-5/00","codigoCNAEsemNumero":"1354500","descricao":"Fabricação de tecidos especiais, inclusive artefatos"},
      {"codigoCNAE":"1359-6/00","codigoCNAEsemNumero":"1359600","descricao":"Fabricação de outros produtos têxteis não especificados anteriormente"},
      {"codigoCNAE":"1411-8/01","codigoCNAEsemNumero":"1411801","descricao":"Confecção de roupas íntimas"},
      {"codigoCNAE":"1411-8/02","codigoCNAEsemNumero":"1411802","descricao":"Facção de roupas íntimas"},
      {"codigoCNAE":"1412-6/01","codigoCNAEsemNumero":"1412601","descricao":"Confecção de peças do vestuário, exceto roupas íntimas e as confeccionadas sob medida"},
      {"codigoCNAE":"1412-6/02","codigoCNAEsemNumero":"1412602","descricao":"Confecção, sob medida, de peças do vestuário, exceto roupas íntimas"},
      {"codigoCNAE":"1412-6/03","codigoCNAEsemNumero":"1412603","descricao":"Facção de peças do vestuário, exceto roupas íntimas"},
      {"codigoCNAE":"1413-4/01","codigoCNAEsemNumero":"1413401","descricao":"Confecção de roupas profissionais, exceto sob medida"},
      {"codigoCNAE":"1413-4/02","codigoCNAEsemNumero":"1413402","descricao":"Confecção, sob medida, de roupas profissionais"},
      {"codigoCNAE":"1413-4/03","codigoCNAEsemNumero":"1413403","descricao":"Facção de roupas profissionais"},
      {"codigoCNAE":"1414-2/00","codigoCNAEsemNumero":"1414200","descricao":"Fabricação de acessórios do vestuário, exceto para segurança e proteção"},
      {"codigoCNAE":"1421-5/00","codigoCNAEsemNumero":"1421500","descricao":"Fabricação de meias"},
      {"codigoCNAE":"1422-3/00","codigoCNAEsemNumero":"1422300","descricao":"Fabricação de artigos do vestuário, produzidos em malharias e tricotagens, exceto meias"},
      {"codigoCNAE":"1510-6/00","codigoCNAEsemNumero":"1510600","descricao":"Curtimento e outras preparações de couro"},
      {"codigoCNAE":"1521-1/00","codigoCNAEsemNumero":"1521100","descricao":"Fabricação de artigos para viagem, bolsas e semelhantes de qualquer material"},
      {"codigoCNAE":"1529-7/00","codigoCNAEsemNumero":"1529700","descricao":"Fabricação de artefatos de couro não especificados anteriormente"},
      {"codigoCNAE":"1531-9/01","codigoCNAEsemNumero":"1531901","descricao":"Fabricação de calçados de couro"},
      {"codigoCNAE":"1531-9/02","codigoCNAEsemNumero":"1531902","descricao":"Acabamento de calçados de couro sob contrato"},
      {"codigoCNAE":"1532-7/00","codigoCNAEsemNumero":"1532700","descricao":"Fabricação de tênis de qualquer material"},
      {"codigoCNAE":"1533-5/00","codigoCNAEsemNumero":"1533500","descricao":"Fabricação de calçados de material sintético"},
      {"codigoCNAE":"1539-4/00","codigoCNAEsemNumero":"1539400","descricao":"Fabricação de calçados de materiais não especificados anteriormente"},
      {"codigoCNAE":"1540-8/00","codigoCNAEsemNumero":"1540800","descricao":"Fabricação de partes para calçados, de qualquer material"},
      {"codigoCNAE":"1610-2/03","codigoCNAEsemNumero":"1610203","descricao":"Serrarias com desdobramento de madeira em bruto"},
      {"codigoCNAE":"1610-2/04","codigoCNAEsemNumero":"1610204","descricao":"Serrarias sem desdobramento de madeira em bruto - Resseragem"},
      {"codigoCNAE":"1610-2/05","codigoCNAEsemNumero":"1610205","descricao":"Serviço de tratamento de madeira realizado sob contrato"},
      {"codigoCNAE":"1621-8/00","codigoCNAEsemNumero":"1621800","descricao":"Fabricação de madeira laminada e de chapas de madeira compensada, prensada e aglomerada"},
      {"codigoCNAE":"1622-6/01","codigoCNAEsemNumero":"1622601","descricao":"Fabricação de casas de madeira pré-fabricadas"},
      {"codigoCNAE":"1622-6/02","codigoCNAEsemNumero":"1622602","descricao":"Fabricação de esquadrias de madeira e de peças de madeira para instalações industriais e comerciais"},
      {"codigoCNAE":"1622-6/99","codigoCNAEsemNumero":"1622699","descricao":"Fabricação de outros artigos de carpintaria para construção"},
      {"codigoCNAE":"1623-4/00","codigoCNAEsemNumero":"1623400","descricao":"Fabricação de artefatos de tanoaria e de embalagens de madeira"},
      {"codigoCNAE":"1629-3/01","codigoCNAEsemNumero":"1629301","descricao":"Fabricação de artefatos diversos de madeira, exceto móveis"},
      {"codigoCNAE":"1629-3/02","codigoCNAEsemNumero":"1629302","descricao":"Fabricação de artefatos diversos de cortiça, bambu, palha, vime e outros materiais trançados, exceto móveis"},
      {"codigoCNAE":"1710-9/00","codigoCNAEsemNumero":"1710900","descricao":"Fabricação de celulose e outras pastas para a fabricação de papel"},
      {"codigoCNAE":"1721-4/00","codigoCNAEsemNumero":"1721400","descricao":"Fabricação de papel"},
      {"codigoCNAE":"1722-2/00","codigoCNAEsemNumero":"1722200","descricao":"Fabricação de cartolina e papel-cartão"},
      {"codigoCNAE":"1731-1/00","codigoCNAEsemNumero":"1731100","descricao":"Fabricação de embalagens de papel"},
      {"codigoCNAE":"1732-0/00","codigoCNAEsemNumero":"1732000","descricao":"Fabricação de embalagens de cartolina e papel-cartão"},
      {"codigoCNAE":"1733-8/00","codigoCNAEsemNumero":"1733800","descricao":"Fabricação de chapas e de embalagens de papelão ondulado"},
      {"codigoCNAE":"1741-9/01","codigoCNAEsemNumero":"1741901","descricao":"Fabricação de formulários contínuos"},
      {"codigoCNAE":"1741-9/02","codigoCNAEsemNumero":"1741902","descricao":"Fabricação de produtos de papel, cartolina, papel-cartão e papelão ondulado para uso comercial e de escritório"},
      {"codigoCNAE":"1742-7/01","codigoCNAEsemNumero":"1742701","descricao":"Fabricação de fraldas descartáveis"},
      {"codigoCNAE":"1742-7/02","codigoCNAEsemNumero":"1742702","descricao":"Fabricação de absorventes higiênicos"},
      {"codigoCNAE":"1742-7/99","codigoCNAEsemNumero":"1742799","descricao":"Fabricação de produtos de papel para uso doméstico e higiênico-sanitário não especificados anteriormente"},
      {"codigoCNAE":"1749-4/00","codigoCNAEsemNumero":"1749400","descricao":"Fabricação de produtos de pastas celulósicas, papel, cartolina, papel-cartão e papelão ondulado não especificados anteriormente"},
      {"codigoCNAE":"1811-3/01","codigoCNAEsemNumero":"1811301","descricao":"Impressão de jornais"},
      {"codigoCNAE":"1811-3/02","codigoCNAEsemNumero":"1811302","descricao":"Impressão de livros, revistas e outras publicações periódicas"},
      {"codigoCNAE":"1812-1/00","codigoCNAEsemNumero":"1812100","descricao":"Impressão de material de segurança"},
      {"codigoCNAE":"1813-0/01","codigoCNAEsemNumero":"1813001","descricao":"Impressão de material para uso publicitário"},
      {"codigoCNAE":"1813-0/99","codigoCNAEsemNumero":"1813099","descricao":"Impressão de material para outros usos"},
      {"codigoCNAE":"1821-1/00","codigoCNAEsemNumero":"1821100","descricao":"Serviços de pré-impressão"},
      {"codigoCNAE":"1822-9/01","codigoCNAEsemNumero":"1822901","descricao":"Serviços de encadernação e plastificação"},
      {"codigoCNAE":"1822-9/99","codigoCNAEsemNumero":"1822999","descricao":"Serviços de acabamentos gráficos, exceto encadernação e plastificação"},
      {"codigoCNAE":"1830-0/01","codigoCNAEsemNumero":"1830001","descricao":"Reprodução de som em qualquer suporte"},
      {"codigoCNAE":"1830-0/02","codigoCNAEsemNumero":"1830002","descricao":"Reprodução de vídeo em qualquer suporte"},
      {"codigoCNAE":"1830-0/03","codigoCNAEsemNumero":"1830003","descricao":"Reprodução de software em qualquer suporte"},
      {"codigoCNAE":"1910-1/00","codigoCNAEsemNumero":"1910100","descricao":"Coquerias"},
      {"codigoCNAE":"1921-7/00","codigoCNAEsemNumero":"1921700","descricao":"Fabricação de produtos do refino de petróleo"},
      {"codigoCNAE":"1922-5/01","codigoCNAEsemNumero":"1922501","descricao":"Formulação de combustíveis"},
      {"codigoCNAE":"1922-5/02","codigoCNAEsemNumero":"1922502","descricao":"Rerrefino de óleos lubrificantes"},
      {"codigoCNAE":"1922-5/99","codigoCNAEsemNumero":"1922599","descricao":"Fabricação de outros produtos derivados do petróleo, exceto produtos do refino"},
      {"codigoCNAE":"1931-4/00","codigoCNAEsemNumero":"1931400","descricao":"Fabricação de álcool"},
      {"codigoCNAE":"1932-2/00","codigoCNAEsemNumero":"1932200","descricao":"Fabricação de biocombustíveis, exceto álcool"},
      {"codigoCNAE":"2011-8/00","codigoCNAEsemNumero":"2011800","descricao":"Fabricação de cloro e álcalis"},
      {"codigoCNAE":"2012-6/00","codigoCNAEsemNumero":"2012600","descricao":"Fabricação de intermediários para fertilizantes"},
      {"codigoCNAE":"2013-4/01","codigoCNAEsemNumero":"2013401","descricao":"Fabricação de adubos e fertilizantes organo-minerais"},
      {"codigoCNAE":"2013-4/02","codigoCNAEsemNumero":"2013402","descricao":"Fabricação de adubos e fertilizantes, exceto organo-minerais"},
      {"codigoCNAE":"2014-2/00","codigoCNAEsemNumero":"2014200","descricao":"Fabricação de gases industriais"},
      {"codigoCNAE":"2019-3/01","codigoCNAEsemNumero":"2019301","descricao":"Elaboração de combustíveis nucleares"},
      {"codigoCNAE":"2019-3/99","codigoCNAEsemNumero":"2019399","descricao":"Fabricação de outros produtos químicos inorgânicos não especificados anteriormente"},
      {"codigoCNAE":"2021-5/00","codigoCNAEsemNumero":"2021500","descricao":"Fabricação de produtos petroquímicos básicos"},
      {"codigoCNAE":"2022-3/00","codigoCNAEsemNumero":"2022300","descricao":"Fabricação de intermediários para plastificantes, resinas e fibras"},
      {"codigoCNAE":"2029-1/00","codigoCNAEsemNumero":"2029100","descricao":"Fabricação de produtos químicos orgânicos não especificados anteriormente"},
      {"codigoCNAE":"2031-2/00","codigoCNAEsemNumero":"2031200","descricao":"Fabricação de resinas termoplásticas"},
      {"codigoCNAE":"2032-1/00","codigoCNAEsemNumero":"2032100","descricao":"Fabricação de resinas termofixas"},
      {"codigoCNAE":"2033-9/00","codigoCNAEsemNumero":"2033900","descricao":"Fabricação de elastômeros"},
      {"codigoCNAE":"2040-1/00","codigoCNAEsemNumero":"2040100","descricao":"Fabricação de fibras artificiais e sintéticas"},
      {"codigoCNAE":"2051-7/00","codigoCNAEsemNumero":"2051700","descricao":"Fabricação de defensivos agrícolas"},
      {"codigoCNAE":"2052-5/00","codigoCNAEsemNumero":"2052500","descricao":"Fabricação de desinfestantes domissanitários"},
      {"codigoCNAE":"2061-4/00","codigoCNAEsemNumero":"2061400","descricao":"Fabricação de sabões e detergentes sintéticos"},
      {"codigoCNAE":"2062-2/00","codigoCNAEsemNumero":"2062200","descricao":"Fabricação de produtos de limpeza e polimento"},
      {"codigoCNAE":"2063-1/00","codigoCNAEsemNumero":"2063100","descricao":"Fabricação de cosméticos, produtos de perfumaria e de higiene pessoal"},
      {"codigoCNAE":"2071-1/00","codigoCNAEsemNumero":"2071100","descricao":"Fabricação de tintas, vernizes, esmaltes e lacas"},
      {"codigoCNAE":"2072-0/00","codigoCNAEsemNumero":"2072000","descricao":"Fabricação de tintas de impressão"},
      {"codigoCNAE":"2073-8/00","codigoCNAEsemNumero":"2073800","descricao":"Fabricação de impermeabilizantes, solventes e produtos afins"},
      {"codigoCNAE":"2091-6/00","codigoCNAEsemNumero":"2091600","descricao":"Fabricação de adesivos e selantes"},
      {"codigoCNAE":"2092-4/01","codigoCNAEsemNumero":"2092401","descricao":"Fabricação de pólvoras, explosivos e detonantes"},
      {"codigoCNAE":"2092-4/02","codigoCNAEsemNumero":"2092402","descricao":"Fabricação de artigos pirotécnicos"},
      {"codigoCNAE":"2092-4/03","codigoCNAEsemNumero":"2092403","descricao":"Fabricação de fósforos de segurança"},
      {"codigoCNAE":"2093-2/00","codigoCNAEsemNumero":"2093200","descricao":"Fabricação de aditivos de uso industrial"},
      {"codigoCNAE":"2094-1/00","codigoCNAEsemNumero":"2094100","descricao":"Fabricação de catalisadores"},
      {"codigoCNAE":"2099-1/01","codigoCNAEsemNumero":"2099101","descricao":"Fabricação de chapas, filmes, papéis e outros materiais e produtos químicos para fotografia"},
      {"codigoCNAE":"2099-1/99","codigoCNAEsemNumero":"2099199","descricao":"Fabricação de outros produtos químicos não especificados anteriormente"},
      {"codigoCNAE":"2110-6/00","codigoCNAEsemNumero":"2110600","descricao":"Fabricação de produtos farmoquímicos"},
      {"codigoCNAE":"2121-1/01","codigoCNAEsemNumero":"2121101","descricao":"Fabricação de medicamentos alopáticos para uso humano"},
      {"codigoCNAE":"2121-1/02","codigoCNAEsemNumero":"2121102","descricao":"Fabricação de medicamentos homeopáticos para uso humano"},
      {"codigoCNAE":"2121-1/03","codigoCNAEsemNumero":"2121103","descricao":"Fabricação de medicamentos fitoterápicos para uso humano"},
      {"codigoCNAE":"2122-0/00","codigoCNAEsemNumero":"2122000","descricao":"Fabricação de medicamentos para uso veterinário"},
      {"codigoCNAE":"2123-8/00","codigoCNAEsemNumero":"2123800","descricao":"Fabricação de preparações farmacêuticas"},
      {"codigoCNAE":"2211-1/00","codigoCNAEsemNumero":"2211100","descricao":"Fabricação de pneumáticos e de câmaras-de-ar"},
      {"codigoCNAE":"2212-9/00","codigoCNAEsemNumero":"2212900","descricao":"Reforma de pneumáticos usados"},
      {"codigoCNAE":"2219-6/00","codigoCNAEsemNumero":"2219600","descricao":"Fabricação de artefatos de borracha não especificados anteriormente"},
      {"codigoCNAE":"2221-8/00","codigoCNAEsemNumero":"2221800","descricao":"Fabricação de laminados planos e tubulares de material plástico"},
      {"codigoCNAE":"2222-6/00","codigoCNAEsemNumero":"2222600","descricao":"Fabricação de embalagens de material plástico"},
      {"codigoCNAE":"2223-4/00","codigoCNAEsemNumero":"2223400","descricao":"Fabricação de tubos e acessórios de material plástico para uso na construção"},
      {"codigoCNAE":"2229-3/01","codigoCNAEsemNumero":"2229301","descricao":"Fabricação de artefatos de material plástico para uso pessoal e doméstico"},
      {"codigoCNAE":"2229-3/02","codigoCNAEsemNumero":"2229302","descricao":"Fabricação de artefatos de material plástico para usos industriais"},
      {"codigoCNAE":"2229-3/03","codigoCNAEsemNumero":"2229303","descricao":"Fabricação de artefatos de material plástico para uso na construção, exceto tubos e acessórios"},
      {"codigoCNAE":"2229-3/99","codigoCNAEsemNumero":"2229399","descricao":"Fabricação de artefatos de material plástico para outros usos não especificados anteriormente"},
      {"codigoCNAE":"2311-7/00","codigoCNAEsemNumero":"2311700","descricao":"Fabricação de vidro plano e de segurança"},
      {"codigoCNAE":"2312-5/00","codigoCNAEsemNumero":"2312500","descricao":"Fabricação de embalagens de vidro"},
      {"codigoCNAE":"2319-2/00","codigoCNAEsemNumero":"2319200","descricao":"Fabricação de artigos de vidro"},
      {"codigoCNAE":"2320-6/00","codigoCNAEsemNumero":"2320600","descricao":"Fabricação de cimento"},
      {"codigoCNAE":"2330-3/01","codigoCNAEsemNumero":"2330301","descricao":"Fabricação de estruturas pré-moldadas de concreto armado, em série e sob encomenda"},
      {"codigoCNAE":"2330-3/02","codigoCNAEsemNumero":"2330302","descricao":"Fabricação de artefatos de cimento para uso na construção"},
      {"codigoCNAE":"2330-3/03","codigoCNAEsemNumero":"2330303","descricao":"Fabricação de artefatos de fibrocimento para uso na construção"},
      {"codigoCNAE":"2330-3/04","codigoCNAEsemNumero":"2330304","descricao":"Fabricação de casas pré-moldadas de concreto"},
      {"codigoCNAE":"2330-3/05","codigoCNAEsemNumero":"2330305","descricao":"Preparação de massa de concreto e argamassa para construção"},
      {"codigoCNAE":"2330-3/99","codigoCNAEsemNumero":"2330399","descricao":"Fabricação de outros artefatos e produtos de concreto, cimento, fibrocimento, gesso e materiais semelhantes"},
      {"codigoCNAE":"2341-9/00","codigoCNAEsemNumero":"2341900","descricao":"Fabricação de produtos cerâmicos refratários"},
      {"codigoCNAE":"2342-7/01","codigoCNAEsemNumero":"2342701","descricao":"Fabricação de azulejos e pisos"},
      {"codigoCNAE":"2342-7/02","codigoCNAEsemNumero":"2342702","descricao":"Fabricação de artefatos de cerâmica e barro cozido para uso na construção, exceto azulejos e pisos"},
      {"codigoCNAE":"2349-4/01","codigoCNAEsemNumero":"2349401","descricao":"Fabricação de material sanitário de cerâmica"},
      {"codigoCNAE":"2349-4/99","codigoCNAEsemNumero":"2349499","descricao":"Fabricação de produtos cerâmicos não refratários não especificados anteriormente"},
      {"codigoCNAE":"2391-5/01","codigoCNAEsemNumero":"2391501","descricao":"Britamento de pedras, exceto associado à extração"},
      {"codigoCNAE":"2391-5/02","codigoCNAEsemNumero":"2391502","descricao":"Aparelhamento de pedras para construção, exceto associado à extração"},
      {"codigoCNAE":"2391-5/03","codigoCNAEsemNumero":"2391503","descricao":"Aparelhamento de placas e execução de trabalhos em mármore, granito, ardósia e outras pedras"},
      {"codigoCNAE":"2392-3/00","codigoCNAEsemNumero":"2392300","descricao":"Fabricação de cal e gesso"},
      {"codigoCNAE":"2399-1/01","codigoCNAEsemNumero":"2399101","descricao":"Decoração, lapidação, gravação, vitrificação e outros trabalhos em cerâmica, louça, vidro e cristal"},
      {"codigoCNAE":"2399-1/02","codigoCNAEsemNumero":"2399102","descricao":"Fabricação de abrasivos"},
      {"codigoCNAE":"2399-1/99","codigoCNAEsemNumero":"2399199","descricao":"Fabricação de outros produtos de minerais não metálicos não especificados anteriormente"},
      {"codigoCNAE":"2411-3/00","codigoCNAEsemNumero":"2411300","descricao":"Produção de ferro-gusa"},
      {"codigoCNAE":"2412-1/00","codigoCNAEsemNumero":"2412100","descricao":"Produção de ferroligas"},
      {"codigoCNAE":"2421-1/00","codigoCNAEsemNumero":"2421100","descricao":"Produção de semiacabados de aço"},
      {"codigoCNAE":"2422-9/01","codigoCNAEsemNumero":"2422901","descricao":"Produção de laminados planos de aço ao carbono, revestidos ou não"},
      {"codigoCNAE":"2422-9/02","codigoCNAEsemNumero":"2422902","descricao":"Produção de laminados planos de aços especiais"},
      {"codigoCNAE":"2423-7/01","codigoCNAEsemNumero":"2423701","descricao":"Produção de tubos de aço sem costura"},
      {"codigoCNAE":"2423-7/02","codigoCNAEsemNumero":"2423702","descricao":"Produção de laminados longos de aço, exceto tubos"},
      {"codigoCNAE":"2424-5/01","codigoCNAEsemNumero":"2424501","descricao":"Produção de arames de aço"},
      {"codigoCNAE":"2424-5/02","codigoCNAEsemNumero":"2424502","descricao":"Produção de relaminados, trefilados e perfilados de aço, exceto arames"},
      {"codigoCNAE":"2431-8/00","codigoCNAEsemNumero":"2431800","descricao":"Produção de tubos de aço com costura"},
      {"codigoCNAE":"2439-3/00","codigoCNAEsemNumero":"2439300","descricao":"Produção de outros tubos de ferro e aço"},
      {"codigoCNAE":"2441-5/01","codigoCNAEsemNumero":"2441501","descricao":"Produção de alumínio e suas ligas em formas primárias"},
      {"codigoCNAE":"2441-5/02","codigoCNAEsemNumero":"2441502","descricao":"Produção de laminados de alumínio"},
      {"codigoCNAE":"2442-3/00","codigoCNAEsemNumero":"2442300","descricao":"Metalurgia dos metais preciosos"},
      {"codigoCNAE":"2443-1/00","codigoCNAEsemNumero":"2443100","descricao":"Metalurgia do cobre"},
      {"codigoCNAE":"2449-1/01","codigoCNAEsemNumero":"2449101","descricao":"Produção de zinco em formas primárias"},
      {"codigoCNAE":"2449-1/02","codigoCNAEsemNumero":"2449102","descricao":"Produção de laminados de zinco"},
      {"codigoCNAE":"2449-1/03","codigoCNAEsemNumero":"2449103","descricao":"Fabricação de ânodos para galvanoplastia"},
      {"codigoCNAE":"2449-1/99","codigoCNAEsemNumero":"2449199","descricao":"Metalurgia de outros metais não ferrosos e suas ligas não especificados anteriormente"},
      {"codigoCNAE":"2451-2/00","codigoCNAEsemNumero":"2451200","descricao":"Fundição de ferro e aço"},
      {"codigoCNAE":"2452-1/00","codigoCNAEsemNumero":"2452100","descricao":"Fundição de metais não ferrosos e suas ligas"},
      {"codigoCNAE":"2511-0/00","codigoCNAEsemNumero":"2511000","descricao":"Fabricação de estruturas metálicas"},
      {"codigoCNAE":"2512-8/00","codigoCNAEsemNumero":"2512800","descricao":"Fabricação de esquadrias de metal"},
      {"codigoCNAE":"2513-6/00","codigoCNAEsemNumero":"2513600","descricao":"Fabricação de obras de caldeiraria pesada"},
      {"codigoCNAE":"2521-7/00","codigoCNAEsemNumero":"2521700","descricao":"Fabricação de tanques, reservatórios metálicos e caldeiras para aquecimento central"},
      {"codigoCNAE":"2522-5/00","codigoCNAEsemNumero":"2522500","descricao":"Fabricação de caldeiras geradoras de vapor, exceto para aquecimento central e para veículos"},
      {"codigoCNAE":"2531-4/01","codigoCNAEsemNumero":"2531401","descricao":"Produção de forjados de aço"},
      {"codigoCNAE":"2531-4/02","codigoCNAEsemNumero":"2531402","descricao":"Produção de forjados de metais não ferrosos e suas ligas"},
      {"codigoCNAE":"2532-2/01","codigoCNAEsemNumero":"2532201","descricao":"Produção de artefatos estampados de metal"},
      {"codigoCNAE":"2532-2/02","codigoCNAEsemNumero":"2532202","descricao":"Metalurgia do pó"},
      {"codigoCNAE":"2539-0/01","codigoCNAEsemNumero":"2539001","descricao":"Serviços de usinagem, torneiria e solda"},
      {"codigoCNAE":"2539-0/02","codigoCNAEsemNumero":"2539002","descricao":"Serviços de tratamento e revestimento em metais"},
      {"codigoCNAE":"2541-1/00","codigoCNAEsemNumero":"2541100","descricao":"Fabricação de artigos de cutelaria"},
      {"codigoCNAE":"2542-0/00","codigoCNAEsemNumero":"2542000","descricao":"Fabricação de artigos de serralheria, exceto esquadrias"},
      {"codigoCNAE":"2543-8/00","codigoCNAEsemNumero":"2543800","descricao":"Fabricação de ferramentas"},
      {"codigoCNAE":"2550-1/01","codigoCNAEsemNumero":"2550101","descricao":"Fabricação de equipamento bélico pesado, exceto veículos militares de combate"},
      {"codigoCNAE":"2550-1/02","codigoCNAEsemNumero":"2550102","descricao":"Fabricação de armas de fogo, outras armas e munições"},
      {"codigoCNAE":"2591-8/00","codigoCNAEsemNumero":"2591800","descricao":"Fabricação de embalagens metálicas"},
      {"codigoCNAE":"2592-6/01","codigoCNAEsemNumero":"2592601","descricao":"Fabricação de produtos de trefilados de metal padronizados"},
      {"codigoCNAE":"2592-6/02","codigoCNAEsemNumero":"2592602","descricao":"Fabricação de produtos de trefilados de metal, exceto padronizados"},
      {"codigoCNAE":"2593-4/00","codigoCNAEsemNumero":"2593400","descricao":"Fabricação de artigos de metal para uso doméstico e pessoal"},
      {"codigoCNAE":"2599-3/01","codigoCNAEsemNumero":"2599301","descricao":"Serviços de confecção de armações metálicas para a construção"},
      {"codigoCNAE":"2599-3/02","codigoCNAEsemNumero":"2599302","descricao":"Serviço de corte e dobra de metais"},
      {"codigoCNAE":"2599-3/99","codigoCNAEsemNumero":"2599399","descricao":"Fabricação de outros produtos de metal não especificados anteriormente"},
      {"codigoCNAE":"2610-8/00","codigoCNAEsemNumero":"2610800","descricao":"Fabricação de componentes eletrônicos"},
      {"codigoCNAE":"2621-3/00","codigoCNAEsemNumero":"2621300","descricao":"Fabricação de equipamentos de informática"},
      {"codigoCNAE":"2622-1/00","codigoCNAEsemNumero":"2622100","descricao":"Fabricação de periféricos para equipamentos de informática"},
      {"codigoCNAE":"2631-1/00","codigoCNAEsemNumero":"2631100","descricao":"Fabricação de equipamentos transmissores de comunicação, peças e acessórios"},
      {"codigoCNAE":"2632-9/00","codigoCNAEsemNumero":"2632900","descricao":"Fabricação de aparelhos telefônicos e de outros equipamentos de comunicação, peças e acessórios"},
      {"codigoCNAE":"2640-0/00","codigoCNAEsemNumero":"2640000","descricao":"Fabricação de aparelhos de recepção, reprodução, gravação e amplificação de áudio e vídeo"},
      {"codigoCNAE":"2651-5/00","codigoCNAEsemNumero":"2651500","descricao":"Fabricação de aparelhos e equipamentos de medida, teste e controle"},
      {"codigoCNAE":"2652-3/00","codigoCNAEsemNumero":"2652300","descricao":"Fabricação de cronômetros e relógios"},
      {"codigoCNAE":"2660-4/00","codigoCNAEsemNumero":"2660400","descricao":"Fabricação de aparelhos eletromédicos e eletroterapêuticos e equipamentos de irradiação"},
      {"codigoCNAE":"2670-1/01","codigoCNAEsemNumero":"2670101","descricao":"Fabricação de equipamentos e instrumentos ópticos, peças e acessórios"},
      {"codigoCNAE":"2670-1/02","codigoCNAEsemNumero":"2670102","descricao":"Fabricação de aparelhos fotográficos e cinematográficos, peças e acessórios"},
      {"codigoCNAE":"2680-9/00","codigoCNAEsemNumero":"2680900","descricao":"Fabricação de mídias virgens, magnéticas e ópticas"},
      {"codigoCNAE":"2710-4/01","codigoCNAEsemNumero":"2710401","descricao":"Fabricação de geradores de corrente contínua e alternada, peças e acessórios"},
      {"codigoCNAE":"2710-4/02","codigoCNAEsemNumero":"2710402","descricao":"Fabricação de transformadores, indutores, conversores, sincronizadores e semelhantes, peças e acessórios"},
      {"codigoCNAE":"2710-4/03","codigoCNAEsemNumero":"2710403","descricao":"Fabricação de motores elétricos, peças e acessórios"},
      {"codigoCNAE":"2721-0/00","codigoCNAEsemNumero":"2721000","descricao":"Fabricação de pilhas, baterias e acumuladores elétricos, exceto para veículos automotores"},
      {"codigoCNAE":"2722-8/01","codigoCNAEsemNumero":"2722801","descricao":"Fabricação de baterias e acumuladores para veículos automotores"},
      {"codigoCNAE":"2722-8/02","codigoCNAEsemNumero":"2722802","descricao":"Recondicionamento de baterias e acumuladores para veículos automotores"},
      {"codigoCNAE":"2731-7/00","codigoCNAEsemNumero":"2731700","descricao":"Fabricação de aparelhos e equipamentos para distribuição e controle de energia elétrica"},
      {"codigoCNAE":"2732-5/00","codigoCNAEsemNumero":"2732500","descricao":"Fabricação de material elétrico para instalações em circuito de consumo"},
      {"codigoCNAE":"2733-3/00","codigoCNAEsemNumero":"2733300","descricao":"Fabricação de fios, cabos e condutores elétricos isolados"},
      {"codigoCNAE":"2740-6/01","codigoCNAEsemNumero":"2740601","descricao":"Fabricação de lâmpadas"},
      {"codigoCNAE":"2740-6/02","codigoCNAEsemNumero":"2740602","descricao":"Fabricação de luminárias e outros equipamentos de iluminação"},
      {"codigoCNAE":"2751-1/00","codigoCNAEsemNumero":"2751100","descricao":"Fabricação de fogões, refrigeradores e máquinas de lavar e secar para uso doméstico, peças e acessórios"},
      {"codigoCNAE":"2759-7/01","codigoCNAEsemNumero":"2759701","descricao":"Fabricação de aparelhos elétricos de uso pessoal, peças e acessórios"},
      {"codigoCNAE":"2759-7/99","codigoCNAEsemNumero":"2759799","descricao":"Fabricação de outros aparelhos eletrodomésticos não especificados anteriormente, peças e acessórios"},
      {"codigoCNAE":"2790-2/01","codigoCNAEsemNumero":"2790201","descricao":"Fabricação de eletrodos, contatos e outros artigos de carvão e grafita para uso elétrico, eletroímãs e isoladores"},
      {"codigoCNAE":"2790-2/02","codigoCNAEsemNumero":"2790202","descricao":"Fabricação de equipamentos para sinalização e alarme"},
      {"codigoCNAE":"2790-2/99","codigoCNAEsemNumero":"2790299","descricao":"Fabricação de outros equipamentos e aparelhos elétricos não especificados anteriormente"},
      {"codigoCNAE":"2811-9/00","codigoCNAEsemNumero":"2811900","descricao":"Fabricação de motores e turbinas, peças e acessórios, exceto para aviões e veículos rodoviários"},
      {"codigoCNAE":"2812-7/00","codigoCNAEsemNumero":"2812700","descricao":"Fabricação de equipamentos hidráulicos e pneumáticos, peças e acessórios, exceto válvulas"},
      {"codigoCNAE":"2813-5/00","codigoCNAEsemNumero":"2813500","descricao":"Fabricação de válvulas, registros e dispositivos semelhantes, peças e acessórios"},
      {"codigoCNAE":"2814-3/01","codigoCNAEsemNumero":"2814301","descricao":"Fabricação de compressores para uso industrial, peças e acessórios"},
      {"codigoCNAE":"2814-3/02","codigoCNAEsemNumero":"2814302","descricao":"Fabricação de compressores para uso não industrial, peças e acessórios"},
      {"codigoCNAE":"2815-1/01","codigoCNAEsemNumero":"2815101","descricao":"Fabricação de rolamentos para fins industriais"},
      {"codigoCNAE":"2815-1/02","codigoCNAEsemNumero":"2815102","descricao":"Fabricação de equipamentos de transmissão para fins industriais, exceto rolamentos"},
      {"codigoCNAE":"2821-6/01","codigoCNAEsemNumero":"2821601","descricao":"Fabricação de fornos industriais, aparelhos e equipamentos não elétricos para instalações térmicas, peças e acessórios"},
      {"codigoCNAE":"2821-6/02","codigoCNAEsemNumero":"2821602","descricao":"Fabricação de estufas e fornos elétricos para fins industriais, peças e acessórios"},
      {"codigoCNAE":"2822-4/01","codigoCNAEsemNumero":"2822401","descricao":"Fabricação de máquinas, equipamentos e aparelhos para transporte e elevação de pessoas, peças e acessórios"},
      {"codigoCNAE":"2822-4/02","codigoCNAEsemNumero":"2822402","descricao":"Fabricação de máquinas, equipamentos e aparelhos para transporte e elevação de cargas, peças e acessórios"},
      {"codigoCNAE":"2823-2/00","codigoCNAEsemNumero":"2823200","descricao":"Fabricação de máquinas e aparelhos de refrigeração e ventilação para uso industrial e comercial, peças e acessórios"},
      {"codigoCNAE":"2824-1/01","codigoCNAEsemNumero":"2824101","descricao":"Fabricação de aparelhos e equipamentos de ar condicionado para uso industrial"},
      {"codigoCNAE":"2824-1/02","codigoCNAEsemNumero":"2824102","descricao":"Fabricação de aparelhos e equipamentos de ar condicionado para uso não industrial"},
      {"codigoCNAE":"2825-9/00","codigoCNAEsemNumero":"2825900","descricao":"Fabricação de máquinas e equipamentos para saneamento básico e ambiental, peças e acessórios"},
      {"codigoCNAE":"2829-1/01","codigoCNAEsemNumero":"2829101","descricao":"Fabricação de máquinas de escrever, calcular e outros equipamentos não eletrônicos para escritório, peças e acessórios"},
      {"codigoCNAE":"2829-1/99","codigoCNAEsemNumero":"2829199","descricao":"Fabricação de outras máquinas e equipamentos de uso geral não especificados anteriormente, peças e acessórios"},
      {"codigoCNAE":"2831-3/00","codigoCNAEsemNumero":"2831300","descricao":"Fabricação de tratores agrícolas, peças e acessórios"},
      {"codigoCNAE":"2832-1/00","codigoCNAEsemNumero":"2832100","descricao":"Fabricação de equipamentos para irrigação agrícola, peças e acessórios"},
      {"codigoCNAE":"2833-0/00","codigoCNAEsemNumero":"2833000","descricao":"Fabricação de máquinas e equipamentos para a agricultura e pecuária, peças e acessórios, exceto para irrigação"},
      {"codigoCNAE":"2840-2/00","codigoCNAEsemNumero":"2840200","descricao":"Fabricação de máquinas-ferramenta, peças e acessórios"},
      {"codigoCNAE":"2851-8/00","codigoCNAEsemNumero":"2851800","descricao":"Fabricação de máquinas e equipamentos para a prospecção e extração de petróleo, peças e acessórios"},
      {"codigoCNAE":"2852-6/00","codigoCNAEsemNumero":"2852600","descricao":"Fabricação de outras máquinas e equipamentos para uso na extração mineral, peças e acessórios, exceto na extração de petróleo"},
      {"codigoCNAE":"2853-4/00","codigoCNAEsemNumero":"2853400","descricao":"Fabricação de tratores, peças e acessórios, exceto agrícolas"},
      {"codigoCNAE":"2854-2/00","codigoCNAEsemNumero":"2854200","descricao":"Fabricação de máquinas e equipamentos para terraplenagem, pavimentação e construção, peças e acessórios, exceto tratores"},
      {"codigoCNAE":"2861-5/00","codigoCNAEsemNumero":"2861500","descricao":"Fabricação de máquinas para a indústria metalúrgica, peças e acessórios, exceto máquinas-ferramenta"},
      {"codigoCNAE":"2862-3/00","codigoCNAEsemNumero":"2862300","descricao":"Fabricação de máquinas e equipamentos para as indústrias de alimentos, bebidas e fumo, peças e acessórios"},
      {"codigoCNAE":"2863-1/00","codigoCNAEsemNumero":"2863100","descricao":"Fabricação de máquinas e equipamentos para a indústria têxtil, peças e acessórios"},
      {"codigoCNAE":"2864-0/00","codigoCNAEsemNumero":"2864000","descricao":"Fabricação de máquinas e equipamentos para as indústrias do vestuário, do couro e de calçados, peças e acessórios"},
      {"codigoCNAE":"2865-8/00","codigoCNAEsemNumero":"2865800","descricao":"Fabricação de máquinas e equipamentos para as indústrias de celulose, papel e papelão e artefatos, peças e acessórios"},
      {"codigoCNAE":"2866-6/00","codigoCNAEsemNumero":"2866600","descricao":"Fabricação de máquinas e equipamentos para a indústria do plástico, peças e acessórios"},
      {"codigoCNAE":"2869-1/00","codigoCNAEsemNumero":"2869100","descricao":"Fabricação de máquinas e equipamentos para uso industrial específico não especificados anteriormente, peças e acessórios"},
      {"codigoCNAE":"2910-7/01","codigoCNAEsemNumero":"2910701","descricao":"Fabricação de automóveis, camionetas e utilitários"},
      {"codigoCNAE":"2910-7/02","codigoCNAEsemNumero":"2910702","descricao":"Fabricação de chassis com motor para automóveis, camionetas e utilitários"},
      {"codigoCNAE":"2910-7/03","codigoCNAEsemNumero":"2910703","descricao":"Fabricação de motores para automóveis, camionetas e utilitários"},
      {"codigoCNAE":"2920-4/01","codigoCNAEsemNumero":"2920401","descricao":"Fabricação de caminhões e ônibus"},
      {"codigoCNAE":"2920-4/02","codigoCNAEsemNumero":"2920402","descricao":"Fabricação de motores para caminhões e ônibus"},
      {"codigoCNAE":"2930-1/01","codigoCNAEsemNumero":"2930101","descricao":"Fabricação de cabines, carrocerias e reboques para caminhões"},
      {"codigoCNAE":"2930-1/02","codigoCNAEsemNumero":"2930102","descricao":"Fabricação de carrocerias para ônibus"},
      {"codigoCNAE":"2930-1/03","codigoCNAEsemNumero":"2930103","descricao":"Fabricação de cabines, carrocerias e reboques para outros veículos automotores, exceto caminhões e ônibus"},
      {"codigoCNAE":"2941-7/00","codigoCNAEsemNumero":"2941700","descricao":"Fabricação de peças e acessórios para o sistema motor de veículos automotores"},
      {"codigoCNAE":"2942-5/00","codigoCNAEsemNumero":"2942500","descricao":"Fabricação de peças e acessórios para os sistemas de marcha e transmissão de veículos automotores"},
      {"codigoCNAE":"2943-3/00","codigoCNAEsemNumero":"2943300","descricao":"Fabricação de peças e acessórios para o sistema de freios de veículos automotores"},
      {"codigoCNAE":"2944-1/00","codigoCNAEsemNumero":"2944100","descricao":"Fabricação de peças e acessórios para o sistema de direção e suspensão de veículos automotores"},
      {"codigoCNAE":"2945-0/00","codigoCNAEsemNumero":"2945000","descricao":"Fabricação de material elétrico e eletrônico para veículos automotores, exceto baterias"},
      {"codigoCNAE":"2949-2/01","codigoCNAEsemNumero":"2949201","descricao":"Fabricação de bancos e estofados para veículos automotores"},
      {"codigoCNAE":"2949-2/99","codigoCNAEsemNumero":"2949299","descricao":"Fabricação de outras peças e acessórios para veículos automotores não especificadas anteriormente"},
      {"codigoCNAE":"2950-6/00","codigoCNAEsemNumero":"2950600","descricao":"Recondicionamento e recuperação de motores para veículos automotores"},
      {"codigoCNAE":"3011-3/01","codigoCNAEsemNumero":"3011301","descricao":"Construção de embarcações de grande porte"},
      {"codigoCNAE":"3011-3/02","codigoCNAEsemNumero":"3011302","descricao":"Construção de embarcações para uso comercial e para usos especiais, exceto de grande porte"},
      {"codigoCNAE":"3012-1/00","codigoCNAEsemNumero":"3012100","descricao":"Construção de embarcações para esporte e lazer"},
      {"codigoCNAE":"3031-8/00","codigoCNAEsemNumero":"3031800","descricao":"Fabricação de locomotivas, vagões e outros materiais rodantes"},
      {"codigoCNAE":"3032-6/00","codigoCNAEsemNumero":"3032600","descricao":"Fabricação de peças e acessórios para veículos ferroviários"},
      {"codigoCNAE":"3041-5/00","codigoCNAEsemNumero":"3041500","descricao":"Fabricação de aeronaves"},
      {"codigoCNAE":"3042-3/00","codigoCNAEsemNumero":"3042300","descricao":"Fabricação de turbinas, motores e outros componentes e peças para aeronaves"},
      {"codigoCNAE":"3050-4/00","codigoCNAEsemNumero":"3050400","descricao":"Fabricação de veículos militares de combate"},
      {"codigoCNAE":"3091-1/01","codigoCNAEsemNumero":"3091101","descricao":"Fabricação de motocicletas"},
      {"codigoCNAE":"3091-1/02","codigoCNAEsemNumero":"3091102","descricao":"Fabricação de peças e acessórios para motocicletas"},
      {"codigoCNAE":"3092-0/00","codigoCNAEsemNumero":"3092000","descricao":"Fabricação de bicicletas e triciclos não motorizados, peças e acessórios"},
      {"codigoCNAE":"3099-7/00","codigoCNAEsemNumero":"3099700","descricao":"Fabricação de equipamentos de transporte não especificados anteriormente"},
      {"codigoCNAE":"3101-2/00","codigoCNAEsemNumero":"3101200","descricao":"Fabricação de móveis com predominância de madeira"},
      {"codigoCNAE":"3102-1/00","codigoCNAEsemNumero":"3102100","descricao":"Fabricação de móveis com predominância de metal"},
      {"codigoCNAE":"3103-9/00","codigoCNAEsemNumero":"3103900","descricao":"Fabricação de móveis de outros materiais, exceto madeira e metal"},
      {"codigoCNAE":"3104-7/00","codigoCNAEsemNumero":"3104700","descricao":"Fabricação de colchões"},
      {"codigoCNAE":"3211-6/01","codigoCNAEsemNumero":"3211601","descricao":"Lapidação de gemas"},
      {"codigoCNAE":"3211-6/02","codigoCNAEsemNumero":"3211602","descricao":"Fabricação de artefatos de joalheria e ourivesaria"},
      {"codigoCNAE":"3211-6/03","codigoCNAEsemNumero":"3211603","descricao":"Cunhagem de moedas e medalhas"},
      {"codigoCNAE":"3212-4/00","codigoCNAEsemNumero":"3212400","descricao":"Fabricação de bijuterias e artefatos semelhantes"},
      {"codigoCNAE":"3220-5/00","codigoCNAEsemNumero":"3220500","descricao":"Fabricação de instrumentos musicais, peças e acessórios"},
      {"codigoCNAE":"3230-2/00","codigoCNAEsemNumero":"3230200","descricao":"Fabricação de artefatos para pesca e esporte"},
      {"codigoCNAE":"3240-0/01","codigoCNAEsemNumero":"3240001","descricao":"Fabricação de jogos eletrônicos"},
      {"codigoCNAE":"3240-0/02","codigoCNAEsemNumero":"3240002","descricao":"Fabricação de mesas de bilhar, de sinuca e acessórios não associada à locação"},
      {"codigoCNAE":"3240-0/03","codigoCNAEsemNumero":"3240003","descricao":"Fabricação de mesas de bilhar, de sinuca e acessórios associada à locação"},
      {"codigoCNAE":"3240-0/99","codigoCNAEsemNumero":"3240099","descricao":"Fabricação de outros brinquedos e jogos recreativos não especificados anteriormente"},
      {"codigoCNAE":"3250-7/01","codigoCNAEsemNumero":"3250701","descricao":"Fabricação de instrumentos não eletrônicos e utensílios para uso médico, cirúrgico, odontológico e de laboratório"},
      {"codigoCNAE":"3250-7/02","codigoCNAEsemNumero":"3250702","descricao":"Fabricação de mobiliário para uso médico, cirúrgico, odontológico e de laboratório"},
      {"codigoCNAE":"3250-7/03","codigoCNAEsemNumero":"3250703","descricao":"Fabricação de aparelhos e utensílios para correção de defeitos físicos e aparelhos ortopédicos em geral sob encomenda"},
      {"codigoCNAE":"3250-7/04","codigoCNAEsemNumero":"3250704","descricao":"Fabricação de aparelhos e utensílios para correção de defeitos físicos e aparelhos ortopédicos em geral, exceto sob encomenda"},
      {"codigoCNAE":"3250-7/05","codigoCNAEsemNumero":"3250705","descricao":"Fabricação de materiais para medicina e odontologia"},
      {"codigoCNAE":"3250-7/06","codigoCNAEsemNumero":"3250706","descricao":"Serviços de prótese dentária"},
      {"codigoCNAE":"3250-7/07","codigoCNAEsemNumero":"3250707","descricao":"Fabricação de artigos ópticos"},
      {"codigoCNAE":"3250-7/09","codigoCNAEsemNumero":"3250709","descricao":"Serviço de laboratório óptico"},
      {"codigoCNAE":"3291-4/00","codigoCNAEsemNumero":"3291400","descricao":"Fabricação de escovas, pincéis e vassouras"},
      {"codigoCNAE":"3292-2/01","codigoCNAEsemNumero":"3292201","descricao":"Fabricação de roupas de proteção e segurança e resistentes a fogo"},
      {"codigoCNAE":"3292-2/02","codigoCNAEsemNumero":"3292202","descricao":"Fabricação de equipamentos e acessórios para segurança pessoal e profissional"},
      {"codigoCNAE":"3299-0/01","codigoCNAEsemNumero":"3299001","descricao":"Fabricação de guarda-chuvas e similares"},
      {"codigoCNAE":"3299-0/02","codigoCNAEsemNumero":"3299002","descricao":"Fabricação de canetas, lápis e outros artigos para escritório"},
      {"codigoCNAE":"3299-0/03","codigoCNAEsemNumero":"3299003","descricao":"Fabricação de letras, letreiros e placas de qualquer material, exceto luminosos"},
      {"codigoCNAE":"3299-0/04","codigoCNAEsemNumero":"3299004","descricao":"Fabricação de painéis e letreiros luminosos"},
      {"codigoCNAE":"3299-0/05","codigoCNAEsemNumero":"3299005","descricao":"Fabricação de aviamentos para costura"},
      {"codigoCNAE":"3299-0/06","codigoCNAEsemNumero":"3299006","descricao":"Fabricação de velas, inclusive decorativas"},
      {"codigoCNAE":"3299-0/99","codigoCNAEsemNumero":"3299099","descricao":"Fabricação de produtos diversos não especificados anteriormente"},
      {"codigoCNAE":"3311-2/00","codigoCNAEsemNumero":"3311200","descricao":"Manutenção e reparação de tanques, reservatórios metálicos e caldeiras, exceto para veículos"},
      {"codigoCNAE":"3312-1/02","codigoCNAEsemNumero":"3312102","descricao":"Manutenção e reparação de aparelhos e instrumentos de medida, teste e controle"},
      {"codigoCNAE":"3312-1/03","codigoCNAEsemNumero":"3312103","descricao":"Manutenção e reparação de aparelhos eletromédicos e eletroterapêuticos e equipamentos de irradiação"},
      {"codigoCNAE":"3312-1/04","codigoCNAEsemNumero":"3312104","descricao":"Manutenção e reparação de equipamentos e instrumentos ópticos"},
      {"codigoCNAE":"3313-9/01","codigoCNAEsemNumero":"3313901","descricao":"Manutenção e reparação de geradores, transformadores e motores elétricos"},
      {"codigoCNAE":"3313-9/02","codigoCNAEsemNumero":"3313902","descricao":"Manutenção e reparação de baterias e acumuladores elétricos, exceto para veículos"},
      {"codigoCNAE":"3313-9/99","codigoCNAEsemNumero":"3313999","descricao":"Manutenção e reparação de máquinas, aparelhos e materiais elétricos não especificados anteriormente"},
      {"codigoCNAE":"3314-7/01","codigoCNAEsemNumero":"3314701","descricao":"Manutenção e reparação de máquinas motrizes não elétricas"},
      {"codigoCNAE":"3314-7/02","codigoCNAEsemNumero":"3314702","descricao":"Manutenção e reparação de equipamentos hidráulicos e pneumáticos, exceto válvulas"},
      {"codigoCNAE":"3314-7/03","codigoCNAEsemNumero":"3314703","descricao":"Manutenção e reparação de válvulas industriais"},
      {"codigoCNAE":"3314-7/04","codigoCNAEsemNumero":"3314704","descricao":"Manutenção e reparação de compressores"},
      {"codigoCNAE":"3314-7/05","codigoCNAEsemNumero":"3314705","descricao":"Manutenção e reparação de equipamentos de transmissão para fins industriais"},
      {"codigoCNAE":"3314-7/06","codigoCNAEsemNumero":"3314706","descricao":"Manutenção e reparação de máquinas, aparelhos e equipamentos para instalações térmicas"},
      {"codigoCNAE":"3314-7/07","codigoCNAEsemNumero":"3314707","descricao":"Manutenção e reparação de máquinas e aparelhos de refrigeração e ventilação para uso industrial e comercial"},
      {"codigoCNAE":"3314-7/08","codigoCNAEsemNumero":"3314708","descricao":"Manutenção e reparação de máquinas, equipamentos e aparelhos para transporte e elevação de cargas"},
      {"codigoCNAE":"3314-7/09","codigoCNAEsemNumero":"3314709","descricao":"Manutenção e reparação de máquinas de escrever, calcular e de outros equipamentos não eletrônicos para escritório"},
      {"codigoCNAE":"3314-7/10","codigoCNAEsemNumero":"3314710","descricao":"Manutenção e reparação de máquinas e equipamentos para uso geral não especificados anteriormente"},
      {"codigoCNAE":"3314-7/11","codigoCNAEsemNumero":"3314711","descricao":"Manutenção e reparação de máquinas e equipamentos para agricultura e pecuária"},
      {"codigoCNAE":"3314-7/12","codigoCNAEsemNumero":"3314712","descricao":"Manutenção e reparação de tratores agrícolas"},
      {"codigoCNAE":"3314-7/13","codigoCNAEsemNumero":"3314713","descricao":"Manutenção e reparação de máquinas-ferramenta"},
      {"codigoCNAE":"3314-7/14","codigoCNAEsemNumero":"3314714","descricao":"Manutenção e reparação de máquinas e equipamentos para a prospecção e extração de petróleo"},
      {"codigoCNAE":"3314-7/15","codigoCNAEsemNumero":"3314715","descricao":"Manutenção e reparação de máquinas e equipamentos para uso na extração mineral, exceto na extração de petróleo"},
      {"codigoCNAE":"3314-7/16","codigoCNAEsemNumero":"3314716","descricao":"Manutenção e reparação de tratores, exceto agrícolas"},
      {"codigoCNAE":"3314-7/17","codigoCNAEsemNumero":"3314717","descricao":"Manutenção e reparação de máquinas e equipamentos de terraplenagem, pavimentação e construção, exceto tratores"},
      {"codigoCNAE":"3314-7/18","codigoCNAEsemNumero":"3314718","descricao":"Manutenção e reparação de máquinas para a indústria metalúrgica, exceto máquinas-ferramenta"},
      {"codigoCNAE":"3314-7/19","codigoCNAEsemNumero":"3314719","descricao":"Manutenção e reparação de máquinas e equipamentos para as indústrias de alimentos, bebidas e fumo"},
      {"codigoCNAE":"3314-7/20","codigoCNAEsemNumero":"3314720","descricao":"Manutenção e reparação de máquinas e equipamentos para a indústria têxtil, do vestuário, do couro e calçados"},
      {"codigoCNAE":"3314-7/21","codigoCNAEsemNumero":"3314721","descricao":"Manutenção e reparação de máquinas e aparelhos para a indústria de celulose, papel e papelão e artefatos"},
      {"codigoCNAE":"3314-7/22","codigoCNAEsemNumero":"3314722","descricao":"Manutenção e reparação de máquinas e aparelhos para a indústria do plástico"},
      {"codigoCNAE":"3314-7/99","codigoCNAEsemNumero":"3314799","descricao":"Manutenção e reparação de outras máquinas e equipamentos para usos industriais não especificados anteriormente"},
      {"codigoCNAE":"3315-5/00","codigoCNAEsemNumero":"3315500","descricao":"Manutenção e reparação de veículos ferroviários"},
      {"codigoCNAE":"3316-3/01","codigoCNAEsemNumero":"3316301","descricao":"Manutenção e reparação de aeronaves, exceto a manutenção na pista"},
      {"codigoCNAE":"3316-3/02","codigoCNAEsemNumero":"3316302","descricao":"Manutenção de aeronaves na pista"},
      {"codigoCNAE":"3317-1/01","codigoCNAEsemNumero":"3317101","descricao":"Manutenção e reparação de embarcações e estruturas flutuantes"},
      {"codigoCNAE":"3317-1/02","codigoCNAEsemNumero":"3317102","descricao":"Manutenção e reparação de embarcações para esporte e lazer"},
      {"codigoCNAE":"3319-8/00","codigoCNAEsemNumero":"3319800","descricao":"Manutenção e reparação de equipamentos e produtos não especificados anteriormente"},
      {"codigoCNAE":"3321-0/00","codigoCNAEsemNumero":"3321000","descricao":"Instalação de máquinas e equipamentos industriais"},
      {"codigoCNAE":"3329-5/01","codigoCNAEsemNumero":"3329501","descricao":"Serviços de montagem de móveis de qualquer material"},
      {"codigoCNAE":"3329-5/99","codigoCNAEsemNumero":"3329599","descricao":"Instalação de outros equipamentos não especificados anteriormente"},
      {"codigoCNAE":"3511-5/01","codigoCNAEsemNumero":"3511501","descricao":"Geração de energia elétrica"},
      {"codigoCNAE":"3511-5/02","codigoCNAEsemNumero":"3511502","descricao":"Atividades de coordenação e controle da operação da geração e transmissão de energia elétrica"},
      {"codigoCNAE":"3512-3/00","codigoCNAEsemNumero":"3512300","descricao":"Transmissão de energia elétrica"},
      {"codigoCNAE":"3513-1/00","codigoCNAEsemNumero":"3513100","descricao":"Comércio atacadista de energia elétrica"},
      {"codigoCNAE":"3514-0/00","codigoCNAEsemNumero":"3514000","descricao":"Distribuição de energia elétrica"},
      {"codigoCNAE":"3520-4/01","codigoCNAEsemNumero":"3520401","descricao":"Produção de gás; processamento de gás natural"},
      {"codigoCNAE":"3520-4/02","codigoCNAEsemNumero":"3520402","descricao":"Distribuição de combustíveis gasosos por redes urbanas"},
      {"codigoCNAE":"3530-1/00","codigoCNAEsemNumero":"3530100","descricao":"Produção e distribuição de vapor, água quente e ar condicionado"},
      {"codigoCNAE":"3600-6/01","codigoCNAEsemNumero":"3600601","descricao":"Captação, tratamento e distribuição de água"},
      {"codigoCNAE":"3600-6/02","codigoCNAEsemNumero":"3600602","descricao":"Distribuição de água por caminhões"},
      {"codigoCNAE":"3701-1/00","codigoCNAEsemNumero":"3701100","descricao":"Gestão de redes de esgoto"},
      {"codigoCNAE":"3702-9/00","codigoCNAEsemNumero":"3702900","descricao":"Atividades relacionadas a esgoto, exceto a gestão de redes"},
      {"codigoCNAE":"3811-4/00","codigoCNAEsemNumero":"3811400","descricao":"Coleta de resíduos não perigosos"},
      {"codigoCNAE":"3812-2/00","codigoCNAEsemNumero":"3812200","descricao":"Coleta de resíduos perigosos"},
      {"codigoCNAE":"3821-1/00","codigoCNAEsemNumero":"3821100","descricao":"Tratamento e disposição de resíduos não perigosos"},
      {"codigoCNAE":"3822-0/00","codigoCNAEsemNumero":"3822000","descricao":"Tratamento e disposição de resíduos perigosos"},
      {"codigoCNAE":"3831-9/01","codigoCNAEsemNumero":"3831901","descricao":"Recuperação de sucatas de alumínio"},
      {"codigoCNAE":"3831-9/99","codigoCNAEsemNumero":"3831999","descricao":"Recuperação de materiais metálicos, exceto alumínio"},
      {"codigoCNAE":"3832-7/00","codigoCNAEsemNumero":"3832700","descricao":"Recuperação de materiais plásticos"},
      {"codigoCNAE":"3839-4/01","codigoCNAEsemNumero":"3839401","descricao":"Usinas de compostagem"},
      {"codigoCNAE":"3839-4/99","codigoCNAEsemNumero":"3839499","descricao":"Recuperação de materiais não especificados anteriormente"},
      {"codigoCNAE":"3900-5/00","codigoCNAEsemNumero":"3900500","descricao":"Descontaminação e outros serviços de gestão de resíduos"},
      {"codigoCNAE":"4110-7/00","codigoCNAEsemNumero":"4110700","descricao":"Incorporação de empreendimentos imobiliários"},
      {"codigoCNAE":"4120-4/00","codigoCNAEsemNumero":"4120400","descricao":"Construção de edifícios"},
      {"codigoCNAE":"4211-1/01","codigoCNAEsemNumero":"4211101","descricao":"Construção de rodovias e ferrovias"},
      {"codigoCNAE":"4211-1/02","codigoCNAEsemNumero":"4211102","descricao":"Pintura para sinalização em pistas rodoviárias e aeroportos"},
      {"codigoCNAE":"4212-0/00","codigoCNAEsemNumero":"4212000","descricao":"Construção de obras de arte especiais"},
      {"codigoCNAE":"4213-8/00","codigoCNAEsemNumero":"4213800","descricao":"Obras de urbanização - ruas, praças e calçadas"},
      {"codigoCNAE":"4221-9/01","codigoCNAEsemNumero":"4221901","descricao":"Construção de barragens e represas para geração de energia elétrica"},
      {"codigoCNAE":"4221-9/02","codigoCNAEsemNumero":"4221902","descricao":"Construção de estações e redes de distribuição de energia elétrica"},
      {"codigoCNAE":"4221-9/03","codigoCNAEsemNumero":"4221903","descricao":"Manutenção de redes de distribuição de energia elétrica"},
      {"codigoCNAE":"4221-9/04","codigoCNAEsemNumero":"4221904","descricao":"Construção de estações e redes de telecomunicações"},
      {"codigoCNAE":"4221-9/05","codigoCNAEsemNumero":"4221905","descricao":"Manutenção de estações e redes de telecomunicações"},
      {"codigoCNAE":"4222-7/01","codigoCNAEsemNumero":"4222701","descricao":"Construção de redes de abastecimento de água, coleta de esgoto e construções correlatas, exceto obras de irrigação"},
      {"codigoCNAE":"4222-7/02","codigoCNAEsemNumero":"4222702","descricao":"Obras de irrigação"},
      {"codigoCNAE":"4223-5/00","codigoCNAEsemNumero":"4223500","descricao":"Construção de redes de transportes por dutos, exceto para água e esgoto"},
      {"codigoCNAE":"4291-0/00","codigoCNAEsemNumero":"4291000","descricao":"Obras portuárias, marítimas e fluviais"},
      {"codigoCNAE":"4292-8/01","codigoCNAEsemNumero":"4292801","descricao":"Montagem de estruturas metálicas"},
      {"codigoCNAE":"4292-8/02","codigoCNAEsemNumero":"4292802","descricao":"Obras de montagem industrial"},
      {"codigoCNAE":"4299-5/01","codigoCNAEsemNumero":"4299501","descricao":"Construção de instalações esportivas e recreativas"},
      {"codigoCNAE":"4299-5/99","codigoCNAEsemNumero":"4299599","descricao":"Outras obras de engenharia civil não especificadas anteriormente"},
      {"codigoCNAE":"4311-8/01","codigoCNAEsemNumero":"4311801","descricao":"Demolição de edifícios e outras estruturas"},
      {"codigoCNAE":"4311-8/02","codigoCNAEsemNumero":"4311802","descricao":"Preparação de canteiro e limpeza de terreno"},
      {"codigoCNAE":"4312-6/00","codigoCNAEsemNumero":"4312600","descricao":"Perfurações e sondagens"},
      {"codigoCNAE":"4313-4/00","codigoCNAEsemNumero":"4313400","descricao":"Obras de terraplenagem"},
      {"codigoCNAE":"4319-3/00","codigoCNAEsemNumero":"4319300","descricao":"Serviços de preparação do terreno não especificados anteriormente"},
      {"codigoCNAE":"4321-5/00","codigoCNAEsemNumero":"4321500","descricao":"Instalação e manutenção elétrica"},
      {"codigoCNAE":"4322-3/01","codigoCNAEsemNumero":"4322301","descricao":"Instalações hidráulicas, sanitárias e de gás"},
      {"codigoCNAE":"4322-3/02","codigoCNAEsemNumero":"4322302","descricao":"Instalação e manutenção de sistemas centrais de ar condicionado, de ventilação e refrigeração"},
      {"codigoCNAE":"4322-3/03","codigoCNAEsemNumero":"4322303","descricao":"Instalações de sistema de prevenção contra incêndio"},
      {"codigoCNAE":"4329-1/01","codigoCNAEsemNumero":"4329101","descricao":"Instalação de painéis publicitários"},
      {"codigoCNAE":"4329-1/02","codigoCNAEsemNumero":"4329102","descricao":"Instalação de equipamentos para orientação à navegação marítima, fluvial e lacustre"},
      {"codigoCNAE":"4329-1/03","codigoCNAEsemNumero":"4329103","descricao":"Instalação, manutenção e reparação de elevadores, escadas e esteiras rolantes"},
      {"codigoCNAE":"4329-1/04","codigoCNAEsemNumero":"4329104","descricao":"Montagem e instalação de sistemas e equipamentos de iluminação e sinalização em vias públicas, portos e aeroportos"},
      {"codigoCNAE":"4329-1/05","codigoCNAEsemNumero":"4329105","descricao":"Tratamentos térmicos, acústicos ou de vibração"},
      {"codigoCNAE":"4329-1/99","codigoCNAEsemNumero":"4329199","descricao":"Outras obras de instalações em construções não especificadas anteriormente"},
      {"codigoCNAE":"4330-4/01","codigoCNAEsemNumero":"4330401","descricao":"Impermeabilização em obras de engenharia civil"},
      {"codigoCNAE":"4330-4/02","codigoCNAEsemNumero":"4330402","descricao":"Instalação de portas, janelas, tetos, divisórias e armários embutidos de qualquer material"},
      {"codigoCNAE":"4330-4/03","codigoCNAEsemNumero":"4330403","descricao":"Obras de acabamento em gesso e estuque"},
      {"codigoCNAE":"4330-4/04","codigoCNAEsemNumero":"4330404","descricao":"Serviços de pintura de edifícios em geral"},
      {"codigoCNAE":"4330-4/05","codigoCNAEsemNumero":"4330405","descricao":"Aplicação de revestimentos e de resinas em interiores e exteriores"},
      {"codigoCNAE":"4330-4/99","codigoCNAEsemNumero":"4330499","descricao":"Outras obras de acabamento da construção"},
      {"codigoCNAE":"4391-6/00","codigoCNAEsemNumero":"4391600","descricao":"Obras de fundações"},
      {"codigoCNAE":"4399-1/01","codigoCNAEsemNumero":"4399101","descricao":"Administração de obras"},
      {"codigoCNAE":"4399-1/02","codigoCNAEsemNumero":"4399102","descricao":"Montagem e desmontagem de andaimes e outras estruturas temporárias"},
      {"codigoCNAE":"4399-1/03","codigoCNAEsemNumero":"4399103","descricao":"Obras de alvenaria"},
      {"codigoCNAE":"4399-1/04","codigoCNAEsemNumero":"4399104","descricao":"Serviços de operação e fornecimento de equipamentos para transporte e elevação de cargas e pessoas para uso em obras"},
      {"codigoCNAE":"4399-1/05","codigoCNAEsemNumero":"4399105","descricao":"Perfuração e construção de poços de água"},
      {"codigoCNAE":"4399-1/99","codigoCNAEsemNumero":"4399199","descricao":"Serviços especializados para construção não especificados anteriormente"},
      {"codigoCNAE":"4511-1/01","codigoCNAEsemNumero":"4511101","descricao":"Comércio a varejo de automóveis, camionetas e utilitários novos"},
      {"codigoCNAE":"4511-1/02","codigoCNAEsemNumero":"4511102","descricao":"Comércio a varejo de automóveis, camionetas e utilitários usados"},
      {"codigoCNAE":"4511-1/03","codigoCNAEsemNumero":"4511103","descricao":"Comércio por atacado de automóveis, camionetas e utilitários novos e usados"},
      {"codigoCNAE":"4511-1/04","codigoCNAEsemNumero":"4511104","descricao":"Comércio por atacado de caminhões novos e usados"},
      {"codigoCNAE":"4511-1/05","codigoCNAEsemNumero":"4511105","descricao":"Comércio por atacado de reboques e semireboques novos e usados"},
      {"codigoCNAE":"4511-1/06","codigoCNAEsemNumero":"4511106","descricao":"Comércio por atacado de ônibus e micro-ônibus novos e usados"},
      {"codigoCNAE":"4512-9/01","codigoCNAEsemNumero":"4512901","descricao":"Representantes comerciais e agentes do comércio de veículos automotores"},
      {"codigoCNAE":"4512-9/02","codigoCNAEsemNumero":"4512902","descricao":"Comércio sob consignação de veículos automotores"},
      {"codigoCNAE":"4520-0/01","codigoCNAEsemNumero":"4520001","descricao":"Serviços de manutenção e reparação mecânica de veículos automotores"},
      {"codigoCNAE":"4520-0/02","codigoCNAEsemNumero":"4520002","descricao":"Serviços de lanternagem ou funilaria e pintura de veículos automotores"},
      {"codigoCNAE":"4520-0/03","codigoCNAEsemNumero":"4520003","descricao":"Serviços de manutenção e reparação elétrica de veículos automotores"},
      {"codigoCNAE":"4520-0/04","codigoCNAEsemNumero":"4520004","descricao":"Serviços de alinhamento e balanceamento de veículos automotores"},
      {"codigoCNAE":"4520-0/05","codigoCNAEsemNumero":"4520005","descricao":"Serviços de lavagem, lubrificação e polimento de veículos automotores"},
      {"codigoCNAE":"4520-0/06","codigoCNAEsemNumero":"4520006","descricao":"Serviços de borracharia para veículos automotores"},
      {"codigoCNAE":"4520-0/07","codigoCNAEsemNumero":"4520007","descricao":"Serviços de instalação, manutenção e reparação de acessórios para veículos automotores"},
      {"codigoCNAE":"4520-0/08","codigoCNAEsemNumero":"4520008","descricao":"Serviços de capotaria"},
      {"codigoCNAE":"4530-7/01","codigoCNAEsemNumero":"4530701","descricao":"Comércio por atacado de peças e acessórios novos para veículos automotores"},
      {"codigoCNAE":"4530-7/02","codigoCNAEsemNumero":"4530702","descricao":"Comércio por atacado de pneumáticos e câmaras-de-ar"},
      {"codigoCNAE":"4530-7/03","codigoCNAEsemNumero":"4530703","descricao":"Comércio a varejo de peças e acessórios novos para veículos automotores"},
      {"codigoCNAE":"4530-7/04","codigoCNAEsemNumero":"4530704","descricao":"Comércio a varejo de peças e acessórios usados para veículos automotores"},
      {"codigoCNAE":"4530-7/05","codigoCNAEsemNumero":"4530705","descricao":"Comércio a varejo de pneumáticos e câmaras-de-ar"},
      {"codigoCNAE":"4530-7/06","codigoCNAEsemNumero":"4530706","descricao":"Representantes comerciais e agentes do comércio de peças e acessórios novos e usados para veículos automotores"},
      {"codigoCNAE":"4541-2/01","codigoCNAEsemNumero":"4541201","descricao":"Comércio por atacado de motocicletas e motonetas"},
      {"codigoCNAE":"4541-2/02","codigoCNAEsemNumero":"4541202","descricao":"Comércio por atacado de peças e acessórios para motocicletas e motonetas"},
      {"codigoCNAE":"4541-2/03","codigoCNAEsemNumero":"4541203","descricao":"Comércio a varejo de motocicletas e motonetas novas"},
      {"codigoCNAE":"4541-2/04","codigoCNAEsemNumero":"4541204","descricao":"Comércio a varejo de motocicletas e motonetas usadas"},
      {"codigoCNAE":"4541-2/06","codigoCNAEsemNumero":"4541206","descricao":"Comércio a varejo de peças e acessórios novos para motocicletas e motonetas"},
      {"codigoCNAE":"4541-2/07","codigoCNAEsemNumero":"4541207","descricao":"Comércio a varejo de peças e acessórios usados para motocicletas e motonetas"},
      {"codigoCNAE":"4542-1/01","codigoCNAEsemNumero":"4542101","descricao":"Representantes comerciais e agentes do comércio de motocicletas e motonetas, peças e acessórios"},
      {"codigoCNAE":"4542-1/02","codigoCNAEsemNumero":"4542102","descricao":"Comércio sob consignação de motocicletas e motonetas"},
      {"codigoCNAE":"4543-9/00","codigoCNAEsemNumero":"4543900","descricao":"Manutenção e reparação de motocicletas e motonetas"},
      {"codigoCNAE":"4611-7/00","codigoCNAEsemNumero":"4611700","descricao":"Representantes comerciais e agentes do comércio de matérias-primas agrícolas e animais vivos"},
      {"codigoCNAE":"4612-5/00","codigoCNAEsemNumero":"4612500","descricao":"Representantes comerciais e agentes do comércio de combustíveis, minerais, produtos siderúrgicos e químicos"},
      {"codigoCNAE":"4613-3/00","codigoCNAEsemNumero":"4613300","descricao":"Representantes comerciais e agentes do comércio de madeira, material de construção e ferragens"},
      {"codigoCNAE":"4614-1/00","codigoCNAEsemNumero":"4614100","descricao":"Representantes comerciais e agentes do comércio de máquinas, equipamentos, embarcações e aeronaves"},
      {"codigoCNAE":"4615-0/00","codigoCNAEsemNumero":"4615000","descricao":"Representantes comerciais e agentes do comércio de eletrodomésticos, móveis e artigos de uso doméstico"},
      {"codigoCNAE":"4616-8/00","codigoCNAEsemNumero":"4616800","descricao":"Representantes comerciais e agentes do comércio de têxteis, vestuário, calçados e artigos de viagem"},
      {"codigoCNAE":"4617-6/00","codigoCNAEsemNumero":"4617600","descricao":"Representantes comerciais e agentes do comércio de produtos alimentícios, bebidas e fumo"},
      {"codigoCNAE":"4618-4/01","codigoCNAEsemNumero":"4618401","descricao":"Representantes comerciais e agentes do comércio de medicamentos, cosméticos e produtos de perfumaria"},
      {"codigoCNAE":"4618-4/02","codigoCNAEsemNumero":"4618402","descricao":"Representantes comerciais e agentes do comércio de instrumentos e materiais odonto-médico-hospitalares"},
      {"codigoCNAE":"4618-4/03","codigoCNAEsemNumero":"4618403","descricao":"Representantes comerciais e agentes do comércio de jornais, revistas e outras publicações"},
      {"codigoCNAE":"4618-4/99","codigoCNAEsemNumero":"4618499","descricao":"Outros representantes comerciais e agentes do comércio especializado em produtos não especificados anteriormente"},
      {"codigoCNAE":"4619-2/00","codigoCNAEsemNumero":"4619200","descricao":"Representantes comerciais e agentes do comércio de mercadorias em geral não especializado"},
      {"codigoCNAE":"4621-4/00","codigoCNAEsemNumero":"4621400","descricao":"Comércio atacadista de café em grão"},
      {"codigoCNAE":"4622-2/00","codigoCNAEsemNumero":"4622200","descricao":"Comércio atacadista de soja"},
      {"codigoCNAE":"4623-1/01","codigoCNAEsemNumero":"4623101","descricao":"Comércio atacadista de animais vivos"},
      {"codigoCNAE":"4623-1/02","codigoCNAEsemNumero":"4623102","descricao":"Comércio atacadista de couros, lãs, peles e outros subprodutos não comestíveis de origem animal"},
      {"codigoCNAE":"4623-1/03","codigoCNAEsemNumero":"4623103","descricao":"Comércio atacadista de algodão"},
      {"codigoCNAE":"4623-1/04","codigoCNAEsemNumero":"4623104","descricao":"Comércio atacadista de fumo em folha não beneficiado"},
      {"codigoCNAE":"4623-1/05","codigoCNAEsemNumero":"4623105","descricao":"Comércio atacadista de cacau"},
      {"codigoCNAE":"4623-1/06","codigoCNAEsemNumero":"4623106","descricao":"Comércio atacadista de sementes, flores, plantas e gramas"},
      {"codigoCNAE":"4623-1/07","codigoCNAEsemNumero":"4623107","descricao":"Comércio atacadista de sisal"},
      {"codigoCNAE":"4623-1/08","codigoCNAEsemNumero":"4623108","descricao":"Comércio atacadista de matérias-primas agrícolas com atividade de fracionamento e acondicionamento associada"},
      {"codigoCNAE":"4623-1/09","codigoCNAEsemNumero":"4623109","descricao":"Comércio atacadista de alimentos para animais"},
      {"codigoCNAE":"4623-1/99","codigoCNAEsemNumero":"4623199","descricao":"Comércio atacadista de matérias-primas agrícolas não especificadas anteriormente"},
      {"codigoCNAE":"4631-1/00","codigoCNAEsemNumero":"4631100","descricao":"Comércio atacadista de leite e laticínios"},
      {"codigoCNAE":"4632-0/01","codigoCNAEsemNumero":"4632001","descricao":"Comércio atacadista de cereais e leguminosas beneficiados"},
      {"codigoCNAE":"4632-0/02","codigoCNAEsemNumero":"4632002","descricao":"Comércio atacadista de farinhas, amidos e féculas"},
      {"codigoCNAE":"4632-0/03","codigoCNAEsemNumero":"4632003","descricao":"Comércio atacadista de cereais e leguminosas beneficiados, farinhas, amidos e féculas, com atividade de fracionamento e acondicionamento associada"},
      {"codigoCNAE":"4633-8/01","codigoCNAEsemNumero":"4633801","descricao":"Comércio atacadista de frutas, verduras, raízes, tubérculos, hortaliças e legumes frescos"},
      {"codigoCNAE":"4633-8/02","codigoCNAEsemNumero":"4633802","descricao":"Comércio atacadista de aves vivas e ovos"},
      {"codigoCNAE":"4633-8/03","codigoCNAEsemNumero":"4633803","descricao":"Comércio atacadista de coelhos e outros pequenos animais vivos para alimentação"},
      {"codigoCNAE":"4634-6/01","codigoCNAEsemNumero":"4634601","descricao":"Comércio atacadista de carnes bovinas e suínas e derivados"},
      {"codigoCNAE":"4634-6/02","codigoCNAEsemNumero":"4634602","descricao":"Comércio atacadista de aves abatidas e derivados"},
      {"codigoCNAE":"4634-6/03","codigoCNAEsemNumero":"4634603","descricao":"Comércio atacadista de pescados e frutos do mar"},
      {"codigoCNAE":"4634-6/99","codigoCNAEsemNumero":"4634699","descricao":"Comércio atacadista de carnes e derivados de outros animais"},
      {"codigoCNAE":"4635-4/01","codigoCNAEsemNumero":"4635401","descricao":"Comércio atacadista de água mineral"},
      {"codigoCNAE":"4635-4/02","codigoCNAEsemNumero":"4635402","descricao":"Comércio atacadista de cerveja, chope e refrigerante"},
      {"codigoCNAE":"4635-4/03","codigoCNAEsemNumero":"4635403","descricao":"Comércio atacadista de bebidas com atividade de fracionamento e acondicionamento associada"},
      {"codigoCNAE":"4635-4/99","codigoCNAEsemNumero":"4635499","descricao":"Comércio atacadista de bebidas não especificadas anteriormente"},
      {"codigoCNAE":"4636-2/01","codigoCNAEsemNumero":"4636201","descricao":"Comércio atacadista de fumo beneficiado"},
      {"codigoCNAE":"4636-2/02","codigoCNAEsemNumero":"4636202","descricao":"Comércio atacadista de cigarros, cigarrilhas e charutos"},
      {"codigoCNAE":"4637-1/01","codigoCNAEsemNumero":"4637101","descricao":"Comércio atacadista de café torrado, moído e solúvel"},
      {"codigoCNAE":"4637-1/02","codigoCNAEsemNumero":"4637102","descricao":"Comércio atacadista de açúcar"},
      {"codigoCNAE":"4637-1/03","codigoCNAEsemNumero":"4637103","descricao":"Comércio atacadista de óleos e gorduras"},
      {"codigoCNAE":"4637-1/04","codigoCNAEsemNumero":"4637104","descricao":"Comércio atacadista de pães, bolos, biscoitos e similares"},
      {"codigoCNAE":"4637-1/05","codigoCNAEsemNumero":"4637105","descricao":"Comércio atacadista de massas alimentícias"},
      {"codigoCNAE":"4637-1/06","codigoCNAEsemNumero":"4637106","descricao":"Comércio atacadista de sorvetes"},
      {"codigoCNAE":"4637-1/07","codigoCNAEsemNumero":"4637107","descricao":"Comércio atacadista de chocolates, confeitos, balas, bombons e semelhantes"},
      {"codigoCNAE":"4637-1/99","codigoCNAEsemNumero":"4637199","descricao":"Comércio atacadista especializado em outros produtos alimentícios não especificados anteriormente"},
      {"codigoCNAE":"4639-7/01","codigoCNAEsemNumero":"4639701","descricao":"Comércio atacadista de produtos alimentícios em geral"},
      {"codigoCNAE":"4639-7/02","codigoCNAEsemNumero":"4639702","descricao":"Comércio atacadista de produtos alimentícios em geral, com atividade de fracionamento e acondicionamento associada"},
      {"codigoCNAE":"4641-9/01","codigoCNAEsemNumero":"4641901","descricao":"Comércio atacadista de tecidos"},
      {"codigoCNAE":"4641-9/02","codigoCNAEsemNumero":"4641902","descricao":"Comércio atacadista de artigos de cama, mesa e banho"},
      {"codigoCNAE":"4641-9/03","codigoCNAEsemNumero":"4641903","descricao":"Comércio atacadista de artigos de armarinho"},
      {"codigoCNAE":"4642-7/01","codigoCNAEsemNumero":"4642701","descricao":"Comércio atacadista de artigos do vestuário e acessórios, exceto profissionais e de segurança"},
      {"codigoCNAE":"4642-7/02","codigoCNAEsemNumero":"4642702","descricao":"Comércio atacadista de roupas e acessórios para uso profissional e de segurança do trabalho"},
      {"codigoCNAE":"4643-5/01","codigoCNAEsemNumero":"4643501","descricao":"Comércio atacadista de calçados"},
      {"codigoCNAE":"4643-5/02","codigoCNAEsemNumero":"4643502","descricao":"Comércio atacadista de bolsas, malas e artigos de viagem"},
      {"codigoCNAE":"4644-3/01","codigoCNAEsemNumero":"4644301","descricao":"Comércio atacadista de medicamentos e drogas de uso humano"},
      {"codigoCNAE":"4644-3/02","codigoCNAEsemNumero":"4644302","descricao":"Comércio atacadista de medicamentos e drogas de uso veterinário"},
      {"codigoCNAE":"4645-1/01","codigoCNAEsemNumero":"4645101","descricao":"Comércio atacadista de instrumentos e materiais para uso médico, cirúrgico, hospitalar e de laboratórios"},
      {"codigoCNAE":"4645-1/02","codigoCNAEsemNumero":"4645102","descricao":"Comércio atacadista de próteses e artigos de ortopedia"},
      {"codigoCNAE":"4645-1/03","codigoCNAEsemNumero":"4645103","descricao":"Comércio atacadista de produtos odontológicos"},
      {"codigoCNAE":"4646-0/01","codigoCNAEsemNumero":"4646001","descricao":"Comércio atacadista de cosméticos e produtos de perfumaria"},
      {"codigoCNAE":"4646-0/02","codigoCNAEsemNumero":"4646002","descricao":"Comércio atacadista de produtos de higiene pessoal"},
      {"codigoCNAE":"4647-8/01","codigoCNAEsemNumero":"4647801","descricao":"Comércio atacadista de artigos de escritório e de papelaria"},
      {"codigoCNAE":"4647-8/02","codigoCNAEsemNumero":"4647802","descricao":"Comércio atacadista de livros, jornais e outras publicações"},
      {"codigoCNAE":"4649-4/01","codigoCNAEsemNumero":"4649401","descricao":"Comércio atacadista de equipamentos elétricos de uso pessoal e doméstico"},
      {"codigoCNAE":"4649-4/02","codigoCNAEsemNumero":"4649402","descricao":"Comércio atacadista de aparelhos eletrônicos de uso pessoal e doméstico"},
      {"codigoCNAE":"4649-4/03","codigoCNAEsemNumero":"4649403","descricao":"Comércio atacadista de bicicletas, triciclos e outros veículos recreativos"},
      {"codigoCNAE":"4649-4/04","codigoCNAEsemNumero":"4649404","descricao":"Comércio atacadista de móveis e artigos de colchoaria"},
      {"codigoCNAE":"4649-4/05","codigoCNAEsemNumero":"4649405","descricao":"Comércio atacadista de artigos de tapeçaria; persianas e cortinas"},
      {"codigoCNAE":"4649-4/06","codigoCNAEsemNumero":"4649406","descricao":"Comércio atacadista de lustres, luminárias e abajures"},
      {"codigoCNAE":"4649-4/07","codigoCNAEsemNumero":"4649407","descricao":"Comércio atacadista de filmes, CDs, DVDs, fitas e discos"},
      {"codigoCNAE":"4649-4/08","codigoCNAEsemNumero":"4649408","descricao":"Comércio atacadista de produtos de higiene, limpeza e conservação domiciliar"},
      {"codigoCNAE":"4649-4/09","codigoCNAEsemNumero":"4649409","descricao":"Comércio atacadista de produtos de higiene, limpeza e conservação domiciliar, com atividade de fracionamento e acondicionamento associada"},
      {"codigoCNAE":"4649-4/10","codigoCNAEsemNumero":"4649410","descricao":"Comércio atacadista de jóias, relógios e bijuterias, inclusive pedras preciosas e semipreciosas lapidadas"},
      {"codigoCNAE":"4649-4/99","codigoCNAEsemNumero":"4649499","descricao":"Comércio atacadista de outros equipamentos e artigos de uso pessoal e doméstico não especificados anteriormente"},
      {"codigoCNAE":"4651-6/01","codigoCNAEsemNumero":"4651601","descricao":"Comércio atacadista de equipamentos de informática"},
      {"codigoCNAE":"4651-6/02","codigoCNAEsemNumero":"4651602","descricao":"Comércio atacadista de suprimentos para informática"},
      {"codigoCNAE":"4652-4/00","codigoCNAEsemNumero":"4652400","descricao":"Comércio atacadista de componentes eletrônicos e equipamentos de telefonia e comunicação"},
      {"codigoCNAE":"4661-3/00","codigoCNAEsemNumero":"4661300","descricao":"Comércio atacadista de máquinas, aparelhos e equipamentos para uso agropecuário; partes e peças"},
      {"codigoCNAE":"4662-1/00","codigoCNAEsemNumero":"4662100","descricao":"Comércio atacadista de máquinas, equipamentos para terraplenagem, mineração e construção; partes e peças"},
      {"codigoCNAE":"4663-0/00","codigoCNAEsemNumero":"4663000","descricao":"Comércio atacadista de máquinas e equipamentos para uso industrial; partes e peças"},
      {"codigoCNAE":"4664-8/00","codigoCNAEsemNumero":"4664800","descricao":"Comércio atacadista de máquinas, aparelhos e equipamentos para uso odonto-médico-hospitalar; partes e peças"},
      {"codigoCNAE":"4665-6/00","codigoCNAEsemNumero":"4665600","descricao":"Comércio atacadista de máquinas e equipamentos para uso comercial; partes e peças"},
      {"codigoCNAE":"4669-9/01","codigoCNAEsemNumero":"4669901","descricao":"Comércio atacadista de bombas e compressores; partes e peças"},
      {"codigoCNAE":"4669-9/99","codigoCNAEsemNumero":"4669999","descricao":"Comércio atacadista de outras máquinas e equipamentos não especificados anteriormente; partes e peças"},
      {"codigoCNAE":"4671-1/00","codigoCNAEsemNumero":"4671100","descricao":"Comércio atacadista de madeira e produtos derivados"},
      {"codigoCNAE":"4672-9/00","codigoCNAEsemNumero":"4672900","descricao":"Comércio atacadista de ferragens e ferramentas"},
      {"codigoCNAE":"4673-7/00","codigoCNAEsemNumero":"4673700","descricao":"Comércio atacadista de material elétrico"},
      {"codigoCNAE":"4674-5/00","codigoCNAEsemNumero":"4674500","descricao":"Comércio atacadista de cimento"},
      {"codigoCNAE":"4679-6/01","codigoCNAEsemNumero":"4679601","descricao":"Comércio atacadista de tintas, vernizes e similares"},
      {"codigoCNAE":"4679-6/02","codigoCNAEsemNumero":"4679602","descricao":"Comércio atacadista de mármores e granitos"},
      {"codigoCNAE":"4679-6/03","codigoCNAEsemNumero":"4679603","descricao":"Comércio atacadista de vidros, espelhos e vitrais"},
      {"codigoCNAE":"4679-6/04","codigoCNAEsemNumero":"4679604","descricao":"Comércio atacadista especializado de materiais de construção não especificados anteriormente"},
      {"codigoCNAE":"4679-6/99","codigoCNAEsemNumero":"4679699","descricao":"Comércio atacadista de materiais de construção em geral"},
      {"codigoCNAE":"4681-8/01","codigoCNAEsemNumero":"4681801","descricao":"Comércio atacadista de álcool carburante, biodiesel, gasolina e demais derivados de petróleo, exceto lubrificantes, não realizado por transportador retalhista (TRR)"},
      {"codigoCNAE":"4681-8/02","codigoCNAEsemNumero":"4681802","descricao":"Comércio atacadista de combustíveis realizado por transportador retalhista (TRR)"},
      {"codigoCNAE":"4681-8/03","codigoCNAEsemNumero":"4681803","descricao":"Comércio atacadista de combustíveis de origem vegetal, exceto álcool carburante"},
      {"codigoCNAE":"4681-8/04","codigoCNAEsemNumero":"4681804","descricao":"Comércio atacadista de combustíveis de origem mineral em bruto"},
      {"codigoCNAE":"4681-8/05","codigoCNAEsemNumero":"4681805","descricao":"Comércio atacadista de lubrificantes"},
      {"codigoCNAE":"4682-6/00","codigoCNAEsemNumero":"4682600","descricao":"Comércio atacadista de gás liquefeito de petróleo (GLP)"},
      {"codigoCNAE":"4683-4/00","codigoCNAEsemNumero":"4683400","descricao":"Comércio atacadista de defensivos agrícolas, adubos, fertilizantes e corretivos do solo"},
      {"codigoCNAE":"4684-2/01","codigoCNAEsemNumero":"4684201","descricao":"Comércio atacadista de resinas e elastômeros"},
      {"codigoCNAE":"4684-2/02","codigoCNAEsemNumero":"4684202","descricao":"Comércio atacadista de solventes"},
      {"codigoCNAE":"4684-2/99","codigoCNAEsemNumero":"4684299","descricao":"Comércio atacadista de outros produtos químicos e petroquímicos não especificados anteriormente"},
      {"codigoCNAE":"4685-1/00","codigoCNAEsemNumero":"4685100","descricao":"Comércio atacadista de produtos siderúrgicos e metalúrgicos, exceto para construção"},
      {"codigoCNAE":"4686-9/01","codigoCNAEsemNumero":"4686901","descricao":"Comércio atacadista de papel e papelão em bruto"},
      {"codigoCNAE":"4686-9/02","codigoCNAEsemNumero":"4686902","descricao":"Comércio atacadista de embalagens"},
      {"codigoCNAE":"4687-7/01","codigoCNAEsemNumero":"4687701","descricao":"Comércio atacadista de resíduos de papel e papelão"},
      {"codigoCNAE":"4687-7/02","codigoCNAEsemNumero":"4687702","descricao":"Comércio atacadista de resíduos e sucatas não metálicos, exceto de papel e papelão"},
      {"codigoCNAE":"4687-7/03","codigoCNAEsemNumero":"4687703","descricao":"Comércio atacadista de resíduos e sucatas metálicos"},
      {"codigoCNAE":"4689-3/01","codigoCNAEsemNumero":"4689301","descricao":"Comércio atacadista de produtos da extração mineral, exceto combustíveis"},
      {"codigoCNAE":"4689-3/02","codigoCNAEsemNumero":"4689302","descricao":"Comércio atacadista de fios e fibras beneficiados"},
      {"codigoCNAE":"4689-3/99","codigoCNAEsemNumero":"4689399","descricao":"Comércio atacadista especializado em outros produtos intermediários não especificados anteriormente"},
      {"codigoCNAE":"4691-5/00","codigoCNAEsemNumero":"4691500","descricao":"Comércio atacadista de mercadorias em geral, com predominância de produtos alimentícios"},
      {"codigoCNAE":"4692-3/00","codigoCNAEsemNumero":"4692300","descricao":"Comércio atacadista de mercadorias em geral, com predominância de insumos agropecuários"},
      {"codigoCNAE":"4693-1/00","codigoCNAEsemNumero":"4693100","descricao":"Comércio atacadista de mercadorias em geral, sem predominância de alimentos ou de insumos agropecuários"},
      {"codigoCNAE":"4711-3/01","codigoCNAEsemNumero":"4711301","descricao":"Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - hipermercados"},
      {"codigoCNAE":"4711-3/02","codigoCNAEsemNumero":"4711302","descricao":"Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - supermercados"},
      {"codigoCNAE":"4712-1/00","codigoCNAEsemNumero":"4712100","descricao":"Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - minimercados, mercearias e armazéns"},
      {"codigoCNAE":"4713-0/02","codigoCNAEsemNumero":"4713002","descricao":"Lojas de variedades, exceto lojas de departamentos ou magazines"},
      {"codigoCNAE":"4713-0/04","codigoCNAEsemNumero":"4713004","descricao":"Lojas de departamentos ou magazines, exceto lojas francas (Duty free)"},
      {"codigoCNAE":"4713-0/05","codigoCNAEsemNumero":"4713005","descricao":"Lojas francas (Duty Free) de aeroportos, portos e em fronteiras terrestres"},
      {"codigoCNAE":"4721-1/02","codigoCNAEsemNumero":"4721102","descricao":"Padaria e confeitaria com predominância de revenda"},
      {"codigoCNAE":"4721-1/03","codigoCNAEsemNumero":"4721103","descricao":"Comércio varejista de laticínios e frios"},
      {"codigoCNAE":"4721-1/04","codigoCNAEsemNumero":"4721104","descricao":"Comércio varejista de doces, balas, bombons e semelhantes"},
      {"codigoCNAE":"4722-9/01","codigoCNAEsemNumero":"4722901","descricao":"Comércio varejista de carnes - açougues"},
      {"codigoCNAE":"4722-9/02","codigoCNAEsemNumero":"4722902","descricao":"Peixaria"},
      {"codigoCNAE":"4723-7/00","codigoCNAEsemNumero":"4723700","descricao":"Comércio varejista de bebidas"},
      {"codigoCNAE":"4724-5/00","codigoCNAEsemNumero":"4724500","descricao":"Comércio varejista de hortifrutigranjeiros"},
      {"codigoCNAE":"4729-6/01","codigoCNAEsemNumero":"4729601","descricao":"Tabacaria"},
      {"codigoCNAE":"4729-6/02","codigoCNAEsemNumero":"4729602","descricao":"Comércio varejista de mercadorias em lojas de conveniência"},
      {"codigoCNAE":"4729-6/99","codigoCNAEsemNumero":"4729699","descricao":"Comércio varejista de produtos alimentícios em geral ou especializado em produtos alimentícios não especificados anteriormente"},
      {"codigoCNAE":"4731-8/00","codigoCNAEsemNumero":"4731800","descricao":"Comércio varejista de combustíveis para veículos automotores"},
      {"codigoCNAE":"4732-6/00","codigoCNAEsemNumero":"4732600","descricao":"Comércio varejista de lubrificantes"},
      {"codigoCNAE":"4741-5/00","codigoCNAEsemNumero":"4741500","descricao":"Comércio varejista de tintas e materiais para pintura"},
      {"codigoCNAE":"4742-3/00","codigoCNAEsemNumero":"4742300","descricao":"Comércio varejista de material elétrico"},
      {"codigoCNAE":"4743-1/00","codigoCNAEsemNumero":"4743100","descricao":"Comércio varejista de vidros"},
      {"codigoCNAE":"4744-0/01","codigoCNAEsemNumero":"4744001","descricao":"Comércio varejista de ferragens e ferramentas"},
      {"codigoCNAE":"4744-0/02","codigoCNAEsemNumero":"4744002","descricao":"Comércio varejista de madeira e artefatos"},
      {"codigoCNAE":"4744-0/03","codigoCNAEsemNumero":"4744003","descricao":"Comércio varejista de materiais hidráulicos"},
      {"codigoCNAE":"4744-0/04","codigoCNAEsemNumero":"4744004","descricao":"Comércio varejista de cal, areia, pedra britada, tijolos e telhas"},
      {"codigoCNAE":"4744-0/05","codigoCNAEsemNumero":"4744005","descricao":"Comércio varejista de materiais de construção não especificados anteriormente"},
      {"codigoCNAE":"4744-0/06","codigoCNAEsemNumero":"4744006","descricao":"Comércio varejista de pedras para revestimento"},
      {"codigoCNAE":"4744-0/99","codigoCNAEsemNumero":"4744099","descricao":"Comércio varejista de materiais de construção em geral"},
      {"codigoCNAE":"4751-2/01","codigoCNAEsemNumero":"4751201","descricao":"Comércio varejista especializado de equipamentos e suprimentos de informática"},
      {"codigoCNAE":"4751-2/02","codigoCNAEsemNumero":"4751202","descricao":"Recarga de cartuchos para equipamentos de informática"},
      {"codigoCNAE":"4752-1/00","codigoCNAEsemNumero":"4752100","descricao":"Comércio varejista especializado de equipamentos de telefonia e comunicação"},
      {"codigoCNAE":"4753-9/00","codigoCNAEsemNumero":"4753900","descricao":"Comércio varejista especializado de eletrodomésticos e equipamentos de áudio e vídeo"},
      {"codigoCNAE":"4754-7/01","codigoCNAEsemNumero":"4754701","descricao":"Comércio varejista de móveis"},
      {"codigoCNAE":"4754-7/02","codigoCNAEsemNumero":"4754702","descricao":"Comércio varejista de artigos de colchoaria"},
      {"codigoCNAE":"4754-7/03","codigoCNAEsemNumero":"4754703","descricao":"Comércio varejista de artigos de iluminação"},
      {"codigoCNAE":"4755-5/01","codigoCNAEsemNumero":"4755501","descricao":"Comércio varejista de tecidos"},
      {"codigoCNAE":"4755-5/02","codigoCNAEsemNumero":"4755502","descricao":"Comercio varejista de artigos de armarinho"},
      {"codigoCNAE":"4755-5/03","codigoCNAEsemNumero":"4755503","descricao":"Comercio varejista de artigos de cama, mesa e banho"},
      {"codigoCNAE":"4756-3/00","codigoCNAEsemNumero":"4756300","descricao":"Comércio varejista especializado de instrumentos musicais e acessórios"},
      {"codigoCNAE":"4757-1/00","codigoCNAEsemNumero":"4757100","descricao":"Comércio varejista especializado de peças e acessórios para aparelhos eletroeletrônicos para uso doméstico, exceto informática e comunicação"},
      {"codigoCNAE":"4759-8/01","codigoCNAEsemNumero":"4759801","descricao":"Comércio varejista de artigos de tapeçaria, cortinas e persianas"},
      {"codigoCNAE":"4759-8/99","codigoCNAEsemNumero":"4759899","descricao":"Comércio varejista de outros artigos de uso doméstico não especificados anteriormente"},
      {"codigoCNAE":"4761-0/01","codigoCNAEsemNumero":"4761001","descricao":"Comércio varejista de livros"},
      {"codigoCNAE":"4761-0/02","codigoCNAEsemNumero":"4761002","descricao":"Comércio varejista de jornais e revistas"},
      {"codigoCNAE":"4761-0/03","codigoCNAEsemNumero":"4761003","descricao":"Comércio varejista de artigos de papelaria"},
      {"codigoCNAE":"4762-8/00","codigoCNAEsemNumero":"4762800","descricao":"Comércio varejista de discos, CDs, DVDs e fitas"},
      {"codigoCNAE":"4763-6/01","codigoCNAEsemNumero":"4763601","descricao":"Comércio varejista de brinquedos e artigos recreativos"},
      {"codigoCNAE":"4763-6/02","codigoCNAEsemNumero":"4763602","descricao":"Comércio varejista de artigos esportivos"},
      {"codigoCNAE":"4763-6/03","codigoCNAEsemNumero":"4763603","descricao":"Comércio varejista de bicicletas e triciclos; peças e acessórios"},
      {"codigoCNAE":"4763-6/04","codigoCNAEsemNumero":"4763604","descricao":"Comércio varejista de artigos de caça, pesca e camping"},
      {"codigoCNAE":"4763-6/05","codigoCNAEsemNumero":"4763605","descricao":"Comércio varejista de embarcações e outros veículos recreativos; peças e acessórios"},
      {"codigoCNAE":"4771-7/01","codigoCNAEsemNumero":"4771701","descricao":"Comércio varejista de produtos farmacêuticos, sem manipulação de fórmulas"},
      {"codigoCNAE":"4771-7/02","codigoCNAEsemNumero":"4771702","descricao":"Comércio varejista de produtos farmacêuticos, com manipulação de fórmulas"},
      {"codigoCNAE":"4771-7/03","codigoCNAEsemNumero":"4771703","descricao":"Comércio varejista de produtos farmacêuticos homeopáticos"},
      {"codigoCNAE":"4771-7/04","codigoCNAEsemNumero":"4771704","descricao":"Comércio varejista de medicamentos veterinários"},
      {"codigoCNAE":"4772-5/00","codigoCNAEsemNumero":"4772500","descricao":"Comércio varejista de cosméticos, produtos de perfumaria e de higiene pessoal"},
      {"codigoCNAE":"4773-3/00","codigoCNAEsemNumero":"4773300","descricao":"Comércio varejista de artigos médicos e ortopédicos"},
      {"codigoCNAE":"4774-1/00","codigoCNAEsemNumero":"4774100","descricao":"Comércio varejista de artigos de óptica"},
      {"codigoCNAE":"4781-4/00","codigoCNAEsemNumero":"4781400","descricao":"Comércio varejista de artigos do vestuário e acessórios"},
      {"codigoCNAE":"4782-2/01","codigoCNAEsemNumero":"4782201","descricao":"Comércio varejista de calçados"},
      {"codigoCNAE":"4782-2/02","codigoCNAEsemNumero":"4782202","descricao":"Comércio varejista de artigos de viagem"},
      {"codigoCNAE":"4783-1/01","codigoCNAEsemNumero":"4783101","descricao":"Comércio varejista de artigos de joalheria"},
      {"codigoCNAE":"4783-1/02","codigoCNAEsemNumero":"4783102","descricao":"Comércio varejista de artigos de relojoaria"},
      {"codigoCNAE":"4784-9/00","codigoCNAEsemNumero":"4784900","descricao":"Comércio varejista de gás liqüefeito de petróleo (GLP)"},
      {"codigoCNAE":"4785-7/01","codigoCNAEsemNumero":"4785701","descricao":"Comércio varejista de antiguidades"},
      {"codigoCNAE":"4785-7/99","codigoCNAEsemNumero":"4785799","descricao":"Comércio varejista de outros artigos usados"},
      {"codigoCNAE":"4789-0/01","codigoCNAEsemNumero":"4789001","descricao":"Comércio varejista de suvenires, bijuterias e artesanatos"},
      {"codigoCNAE":"4789-0/02","codigoCNAEsemNumero":"4789002","descricao":"Comércio varejista de plantas e flores naturais"},
      {"codigoCNAE":"4789-0/03","codigoCNAEsemNumero":"4789003","descricao":"Comércio varejista de objetos de arte"},
      {"codigoCNAE":"4789-0/04","codigoCNAEsemNumero":"4789004","descricao":"Comércio varejista de animais vivos e de artigos e alimentos para animais de estimação"},
      {"codigoCNAE":"4789-0/05","codigoCNAEsemNumero":"4789005","descricao":"Comércio varejista de produtos saneantes domissanitários"},
      {"codigoCNAE":"4789-0/06","codigoCNAEsemNumero":"4789006","descricao":"Comércio varejista de fogos de artifício e artigos pirotécnicos"},
      {"codigoCNAE":"4789-0/07","codigoCNAEsemNumero":"4789007","descricao":"Comércio varejista de equipamentos para escritório"},
      {"codigoCNAE":"4789-0/08","codigoCNAEsemNumero":"4789008","descricao":"Comércio varejista de artigos fotográficos e para filmagem"},
      {"codigoCNAE":"4789-0/09","codigoCNAEsemNumero":"4789009","descricao":"Comércio varejista de armas e munições"},
      {"codigoCNAE":"4789-0/99","codigoCNAEsemNumero":"4789099","descricao":"Comércio varejista de outros produtos não especificados anteriormente"},
      {"codigoCNAE":"4911-6/00","codigoCNAEsemNumero":"4911600","descricao":"Transporte ferroviário de carga"},
      {"codigoCNAE":"4912-4/01","codigoCNAEsemNumero":"4912401","descricao":"Transporte ferroviário de passageiros intermunicipal e interestadual"},
      {"codigoCNAE":"4912-4/02","codigoCNAEsemNumero":"4912402","descricao":"Transporte ferroviário de passageiros municipal e em região metropolitana"},
      {"codigoCNAE":"4912-4/03","codigoCNAEsemNumero":"4912403","descricao":"Transporte metroviário"},
      {"codigoCNAE":"4921-3/01","codigoCNAEsemNumero":"4921301","descricao":"Transporte rodoviário coletivo de passageiros, com itinerário fixo, municipal"},
      {"codigoCNAE":"4921-3/02","codigoCNAEsemNumero":"4921302","descricao":"Transporte rodoviário coletivo de passageiros, com itinerário fixo, intermunicipal em região metropolitana"},
      {"codigoCNAE":"4922-1/01","codigoCNAEsemNumero":"4922101","descricao":"Transporte rodoviário coletivo de passageiros, com itinerário fixo, intermunicipal, exceto em região metropolitana"},
      {"codigoCNAE":"4922-1/02","codigoCNAEsemNumero":"4922102","descricao":"Transporte rodoviário coletivo de passageiros, com itinerário fixo, interestadual"},
      {"codigoCNAE":"4922-1/03","codigoCNAEsemNumero":"4922103","descricao":"Transporte rodoviário coletivo de passageiros, com itinerário fixo, internacional"},
      {"codigoCNAE":"4923-0/01","codigoCNAEsemNumero":"4923001","descricao":"Serviço de táxi"},
      {"codigoCNAE":"4923-0/02","codigoCNAEsemNumero":"4923002","descricao":"Serviço de transporte de passageiros - locação de automóveis com motorista"},
      {"codigoCNAE":"4924-8/00","codigoCNAEsemNumero":"4924800","descricao":"Transporte escolar"},
      {"codigoCNAE":"4929-9/01","codigoCNAEsemNumero":"4929901","descricao":"Transporte rodoviário coletivo de passageiros, sob regime de fretamento, municipal"},
      {"codigoCNAE":"4929-9/02","codigoCNAEsemNumero":"4929902","descricao":"Transporte rodoviário coletivo de passageiros, sob regime de fretamento, intermunicipal, interestadual e internacional"},
      {"codigoCNAE":"4929-9/03","codigoCNAEsemNumero":"4929903","descricao":"Organização de excursões em veículos rodoviários próprios, municipal"},
      {"codigoCNAE":"4929-9/04","codigoCNAEsemNumero":"4929904","descricao":"Organização de excursões em veículos rodoviários próprios, intermunicipal, interestadual e internacional"},
      {"codigoCNAE":"4929-9/99","codigoCNAEsemNumero":"4929999","descricao":"Outros transportes rodoviários de passageiros não especificados anteriormente"},
      {"codigoCNAE":"4930-2/01","codigoCNAEsemNumero":"4930201","descricao":"Transporte rodoviário de carga, exceto produtos perigosos e mudanças, municipal"},
      {"codigoCNAE":"4930-2/02","codigoCNAEsemNumero":"4930202","descricao":"Transporte rodoviário de carga, exceto produtos perigosos e mudanças, intermunicipal, interestadual e internacional"},
      {"codigoCNAE":"4930-2/03","codigoCNAEsemNumero":"4930203","descricao":"Transporte rodoviário de produtos perigosos"},
      {"codigoCNAE":"4930-2/04","codigoCNAEsemNumero":"4930204","descricao":"Transporte rodoviário de mudanças"},
      {"codigoCNAE":"4940-0/00","codigoCNAEsemNumero":"4940000","descricao":"Transporte dutoviário"},
      {"codigoCNAE":"4950-7/00","codigoCNAEsemNumero":"4950700","descricao":"Trens turísticos, teleféricos e similares"},
      {"codigoCNAE":"5011-4/01","codigoCNAEsemNumero":"5011401","descricao":"Transporte marítimo de cabotagem - Carga"},
      {"codigoCNAE":"5011-4/02","codigoCNAEsemNumero":"5011402","descricao":"Transporte marítimo de cabotagem - Passageiros"},
      {"codigoCNAE":"5012-2/01","codigoCNAEsemNumero":"5012201","descricao":"Transporte marítimo de longo curso - Carga"},
      {"codigoCNAE":"5012-2/02","codigoCNAEsemNumero":"5012202","descricao":"Transporte marítimo de longo curso - Passageiros"},
      {"codigoCNAE":"5021-1/01","codigoCNAEsemNumero":"5021101","descricao":"Transporte por navegação interior de carga, municipal, exceto travessia"},
      {"codigoCNAE":"5021-1/02","codigoCNAEsemNumero":"5021102","descricao":"Transporte por navegação interior de carga, intermunicipal, interestadual e internacional, exceto travessia"},
      {"codigoCNAE":"5022-0/01","codigoCNAEsemNumero":"5022001","descricao":"Transporte por navegação interior de passageiros em linhas regulares, municipal, exceto travessia"},
      {"codigoCNAE":"5022-0/02","codigoCNAEsemNumero":"5022002","descricao":"Transporte por navegação interior de passageiros em linhas regulares, intermunicipal, interestadual e internacional, exceto travessia"},
      {"codigoCNAE":"5030-1/01","codigoCNAEsemNumero":"5030101","descricao":"Navegação de apoio marítimo"},
      {"codigoCNAE":"5030-1/02","codigoCNAEsemNumero":"5030102","descricao":"Navegação de apoio portuário"},
      {"codigoCNAE":"5030-1/03","codigoCNAEsemNumero":"5030103","descricao":"Serviço de rebocadores e empurradores"},
      {"codigoCNAE":"5091-2/01","codigoCNAEsemNumero":"5091201","descricao":"Transporte por navegação de travessia, municipal"},
      {"codigoCNAE":"5091-2/02","codigoCNAEsemNumero":"5091202","descricao":"Transporte por navegação de travessia, intermunicipal, interestadual e internacional"},
      {"codigoCNAE":"5099-8/01","codigoCNAEsemNumero":"5099801","descricao":"Transporte aquaviário para passeios turísticos"},
      {"codigoCNAE":"5099-8/99","codigoCNAEsemNumero":"5099899","descricao":"Outros transportes aquaviários não especificados anteriormente"},
      {"codigoCNAE":"5111-1/00","codigoCNAEsemNumero":"5111100","descricao":"Transporte aéreo de passageiros regular"},
      {"codigoCNAE":"5112-9/01","codigoCNAEsemNumero":"5112901","descricao":"Serviço de táxi aéreo e locação de aeronaves com tripulação"},
      {"codigoCNAE":"5112-9/99","codigoCNAEsemNumero":"5112999","descricao":"Outros serviços de transporte aéreo de passageiros não regular"},
      {"codigoCNAE":"5120-0/00","codigoCNAEsemNumero":"5120000","descricao":"Transporte aéreo de carga"},
      {"codigoCNAE":"5130-7/00","codigoCNAEsemNumero":"5130700","descricao":"Transporte espacial"},
      {"codigoCNAE":"5211-7/01","codigoCNAEsemNumero":"5211701","descricao":"Armazéns gerais - emissão de warrant"},
      {"codigoCNAE":"5211-7/02","codigoCNAEsemNumero":"5211702","descricao":"Guarda-móveis"},
      {"codigoCNAE":"5211-7/99","codigoCNAEsemNumero":"5211799","descricao":"Depósitos de mercadorias para terceiros, exceto armazéns gerais e guarda-móveis"},
      {"codigoCNAE":"5212-5/00","codigoCNAEsemNumero":"5212500","descricao":"Carga e descarga"},
      {"codigoCNAE":"5221-4/00","codigoCNAEsemNumero":"5221400","descricao":"Concessionárias de rodovias, pontes, túneis e serviços relacionados"},
      {"codigoCNAE":"5222-2/00","codigoCNAEsemNumero":"5222200","descricao":"Terminais rodoviários e ferroviários"},
      {"codigoCNAE":"5223-1/00","codigoCNAEsemNumero":"5223100","descricao":"Estacionamento de veículos"},
      {"codigoCNAE":"5229-0/01","codigoCNAEsemNumero":"5229001","descricao":"Serviços de apoio ao transporte por táxi, inclusive centrais de chamada"},
      {"codigoCNAE":"5229-0/02","codigoCNAEsemNumero":"5229002","descricao":"Serviços de reboque de veículos"},
      {"codigoCNAE":"5229-0/99","codigoCNAEsemNumero":"5229099","descricao":"Outras atividades auxiliares dos transportes terrestres não especificadas anteriormente"},
      {"codigoCNAE":"5231-1/01","codigoCNAEsemNumero":"5231101","descricao":"Administração da infraestrutura portuária"},
      {"codigoCNAE":"5231-1/02","codigoCNAEsemNumero":"5231102","descricao":"Atividades do Operador Portuário"},
      {"codigoCNAE":"5231-1/03","codigoCNAEsemNumero":"5231103","descricao":"Gestão de terminais aquaviários"},
      {"codigoCNAE":"5232-0/00","codigoCNAEsemNumero":"5232000","descricao":"Atividades de agenciamento marítimo"},
      {"codigoCNAE":"5239-7/01","codigoCNAEsemNumero":"5239701","descricao":"Serviços de praticagem"},
      {"codigoCNAE":"5239-7/99","codigoCNAEsemNumero":"5239799","descricao":"Atividades auxiliares dos transportes aquaviários não especificadas anteriormente"},
      {"codigoCNAE":"5240-1/01","codigoCNAEsemNumero":"5240101","descricao":"Operação dos aeroportos e campos de aterrissagem"},
      {"codigoCNAE":"5240-1/99","codigoCNAEsemNumero":"5240199","descricao":"Atividades auxiliares dos transportes aéreos, exceto operação dos aeroportos e campos de aterrissagem"},
      {"codigoCNAE":"5250-8/01","codigoCNAEsemNumero":"5250801","descricao":"Comissaria de despachos"},
      {"codigoCNAE":"5250-8/02","codigoCNAEsemNumero":"5250802","descricao":"Atividades de despachantes aduaneiros"},
      {"codigoCNAE":"5250-8/03","codigoCNAEsemNumero":"5250803","descricao":"Agenciamento de cargas, exceto para o transporte marítimo"},
      {"codigoCNAE":"5250-8/04","codigoCNAEsemNumero":"5250804","descricao":"Organização logística do transporte de carga"},
      {"codigoCNAE":"5250-8/05","codigoCNAEsemNumero":"5250805","descricao":"Operador de transporte multimodal - OTM"},
      {"codigoCNAE":"5310-5/01","codigoCNAEsemNumero":"5310501","descricao":"Atividades do Correio Nacional"},
      {"codigoCNAE":"5310-5/02","codigoCNAEsemNumero":"5310502","descricao":"Atividades de franqueadas e permissionárias do Correio Nacional"},
      {"codigoCNAE":"5320-2/01","codigoCNAEsemNumero":"5320201","descricao":"Serviços de malote não realizados pelo Correio Nacional"},
      {"codigoCNAE":"5320-2/02","codigoCNAEsemNumero":"5320202","descricao":"Serviços de entrega rápida"},
      {"codigoCNAE":"5510-8/01","codigoCNAEsemNumero":"5510801","descricao":"Hotéis"},
      {"codigoCNAE":"5510-8/02","codigoCNAEsemNumero":"5510802","descricao":"Apart-hotéis"},
      {"codigoCNAE":"5510-8/03","codigoCNAEsemNumero":"5510803","descricao":"Motéis"},
      {"codigoCNAE":"5590-6/01","codigoCNAEsemNumero":"5590601","descricao":"Albergues, exceto assistenciais"},
      {"codigoCNAE":"5590-6/02","codigoCNAEsemNumero":"5590602","descricao":"Campings"},
      {"codigoCNAE":"5590-6/03","codigoCNAEsemNumero":"5590603","descricao":"Pensões (alojamento)"},
      {"codigoCNAE":"5590-6/99","codigoCNAEsemNumero":"5590699","descricao":"Outros alojamentos não especificados anteriormente"},
      {"codigoCNAE":"5611-2/01","codigoCNAEsemNumero":"5611201","descricao":"Restaurantes e similares"},
      {"codigoCNAE":"5611-2/03","codigoCNAEsemNumero":"5611203","descricao":"Lanchonetes, casas de chá, de sucos e similares"},
      {"codigoCNAE":"5611-2/04","codigoCNAEsemNumero":"5611204","descricao":"Bares e outros estabelecimentos especializados em servir bebidas, sem entretenimento"},
      {"codigoCNAE":"5611-2/05","codigoCNAEsemNumero":"5611205","descricao":"Bares e outros estabelecimentos especializados em servir bebidas, com entretenimento"},
      {"codigoCNAE":"5612-1/00","codigoCNAEsemNumero":"5612100","descricao":"Serviços ambulantes de alimentação"},
      {"codigoCNAE":"5620-1/01","codigoCNAEsemNumero":"5620101","descricao":"Fornecimento de alimentos preparados preponderantemente para empresas"},
      {"codigoCNAE":"5620-1/02","codigoCNAEsemNumero":"5620102","descricao":"Serviços de alimentação para eventos e recepções - bufê"},
      {"codigoCNAE":"5620-1/03","codigoCNAEsemNumero":"5620103","descricao":"Cantinas - serviços de alimentação privativos"},
      {"codigoCNAE":"5620-1/04","codigoCNAEsemNumero":"5620104","descricao":"Fornecimento de alimentos preparados preponderantemente para consumo domiciliar"},
      {"codigoCNAE":"5811-5/00","codigoCNAEsemNumero":"5811500","descricao":"Edição de livros"},
      {"codigoCNAE":"5812-3/01","codigoCNAEsemNumero":"5812301","descricao":"Edição de jornais diários"},
      {"codigoCNAE":"5812-3/02","codigoCNAEsemNumero":"5812302","descricao":"Edição de jornais não diários"},
      {"codigoCNAE":"5813-1/00","codigoCNAEsemNumero":"5813100","descricao":"Edição de revistas"},
      {"codigoCNAE":"5819-1/00","codigoCNAEsemNumero":"5819100","descricao":"Edição de cadastros, listas e outros produtos gráficos"},
      {"codigoCNAE":"5821-2/00","codigoCNAEsemNumero":"5821200","descricao":"Edição integrada à impressão de livros"},
      {"codigoCNAE":"5822-1/01","codigoCNAEsemNumero":"5822101","descricao":"Edição integrada à impressão de jornais diários"},
      {"codigoCNAE":"5822-1/02","codigoCNAEsemNumero":"5822102","descricao":"Edição integrada à impressão de jornais não diários"},
      {"codigoCNAE":"5823-9/00","codigoCNAEsemNumero":"5823900","descricao":"Edição integrada à impressão de revistas"},
      {"codigoCNAE":"5829-8/00","codigoCNAEsemNumero":"5829800","descricao":"Edição integrada à impressão de cadastros, listas e outros produtos gráficos"},
      {"codigoCNAE":"5911-1/01","codigoCNAEsemNumero":"5911101","descricao":"Estúdios cinematográficos"},
      {"codigoCNAE":"5911-1/02","codigoCNAEsemNumero":"5911102","descricao":"Produção de filmes para publicidade"},
      {"codigoCNAE":"5911-1/99","codigoCNAEsemNumero":"5911199","descricao":"Atividades de produção cinematográfica, de vídeos e de programas de televisão não especificadas anteriormente"},
      {"codigoCNAE":"5912-0/01","codigoCNAEsemNumero":"5912001","descricao":"Serviços de dublagem"},
      {"codigoCNAE":"5912-0/02","codigoCNAEsemNumero":"5912002","descricao":"Serviços de mixagem sonora em produção audiovisual"},
      {"codigoCNAE":"5912-0/99","codigoCNAEsemNumero":"5912099","descricao":"Atividades de pós-produção cinematográfica, de vídeos e de programas de televisão não especificadas anteriormente"},
      {"codigoCNAE":"5913-8/00","codigoCNAEsemNumero":"5913800","descricao":"Distribuição cinematográfica, de vídeo e de programas de televisão"},
      {"codigoCNAE":"5914-6/00","codigoCNAEsemNumero":"5914600","descricao":"Atividades de exibição cinematográfica"},
      {"codigoCNAE":"5920-1/00","codigoCNAEsemNumero":"5920100","descricao":"Atividades de gravação de som e de edição de música"},
      {"codigoCNAE":"6010-1/00","codigoCNAEsemNumero":"6010100","descricao":"Atividades de rádio"},
      {"codigoCNAE":"6021-7/00","codigoCNAEsemNumero":"6021700","descricao":"Atividades de televisão aberta"},
      {"codigoCNAE":"6022-5/01","codigoCNAEsemNumero":"6022501","descricao":"Programadoras"},
      {"codigoCNAE":"6022-5/02","codigoCNAEsemNumero":"6022502","descricao":"Atividades relacionadas à televisão por assinatura, exceto programadoras"},
      {"codigoCNAE":"6110-8/01","codigoCNAEsemNumero":"6110801","descricao":"Serviços de telefonia fixa comutada - STFC"},
      {"codigoCNAE":"6110-8/02","codigoCNAEsemNumero":"6110802","descricao":"Serviços de redes de transporte de telecomunicações - SRTT"},
      {"codigoCNAE":"6110-8/03","codigoCNAEsemNumero":"6110803","descricao":"Serviços de comunicação multimídia - SCM"},
      {"codigoCNAE":"6110-8/99","codigoCNAEsemNumero":"6110899","descricao":"Serviços de telecomunicações por fio não especificados anteriormente"},
      {"codigoCNAE":"6120-5/01","codigoCNAEsemNumero":"6120501","descricao":"Telefonia móvel celular"},
      {"codigoCNAE":"6120-5/02","codigoCNAEsemNumero":"6120502","descricao":"Serviço móvel especializado - SME"},
      {"codigoCNAE":"6120-5/99","codigoCNAEsemNumero":"6120599","descricao":"Serviços de telecomunicações sem fio não especificados anteriormente"},
      {"codigoCNAE":"6130-2/00","codigoCNAEsemNumero":"6130200","descricao":"Telecomunicações por satélite"},
      {"codigoCNAE":"6141-8/00","codigoCNAEsemNumero":"6141800","descricao":"Operadoras de televisão por assinatura por cabo"},
      {"codigoCNAE":"6142-6/00","codigoCNAEsemNumero":"6142600","descricao":"Operadoras de televisão por assinatura por micro-ondas"},
      {"codigoCNAE":"6143-4/00","codigoCNAEsemNumero":"6143400","descricao":"Operadoras de televisão por assinatura por satélite"},
      {"codigoCNAE":"6190-6/01","codigoCNAEsemNumero":"6190601","descricao":"Provedores de acesso às redes de comunicações"},
      {"codigoCNAE":"6190-6/02","codigoCNAEsemNumero":"6190602","descricao":"Provedores de voz sobre protocolo Internet - VOIP"},
      {"codigoCNAE":"6190-6/99","codigoCNAEsemNumero":"6190699","descricao":"Outras atividades de telecomunicações não especificadas anteriormente"},
      {"codigoCNAE":"6201-5/01","codigoCNAEsemNumero":"6201501","descricao":"Desenvolvimento de programas de computador sob encomenda"},
      {"codigoCNAE":"6201-5/02","codigoCNAEsemNumero":"6201502","descricao":"Web desing"},
      {"codigoCNAE":"6202-3/00","codigoCNAEsemNumero":"6202300","descricao":"Desenvolvimento e licenciamento de programas de computador customizáveis"},
      {"codigoCNAE":"6203-1/00","codigoCNAEsemNumero":"6203100","descricao":"Desenvolvimento e licenciamento de programas de computador não customizáveis"},
      {"codigoCNAE":"6204-0/00","codigoCNAEsemNumero":"6204000","descricao":"Consultoria em tecnologia da informação"},
      {"codigoCNAE":"6209-1/00","codigoCNAEsemNumero":"6209100","descricao":"Suporte técnico, manutenção e outros serviços em tecnologia da informação"},
      {"codigoCNAE":"6311-9/00","codigoCNAEsemNumero":"6311900","descricao":"Tratamento de dados, provedores de serviços de aplicação e serviços de hospedagem na Internet"},
      {"codigoCNAE":"6319-4/00","codigoCNAEsemNumero":"6319400","descricao":"Portais, provedores de conteúdo e outros serviços de informação na Internet"},
      {"codigoCNAE":"6391-7/00","codigoCNAEsemNumero":"6391700","descricao":"Agências de notícias"},
      {"codigoCNAE":"6399-2/00","codigoCNAEsemNumero":"6399200","descricao":"Outras atividades de prestação de serviços de informação não especificadas anteriormente"},
      {"codigoCNAE":"6410-7/00","codigoCNAEsemNumero":"6410700","descricao":"Banco Central"},
      {"codigoCNAE":"6421-2/00","codigoCNAEsemNumero":"6421200","descricao":"Bancos comerciais"},
      {"codigoCNAE":"6422-1/00","codigoCNAEsemNumero":"6422100","descricao":"Bancos múltiplos, com carteira comercial"},
      {"codigoCNAE":"6423-9/00","codigoCNAEsemNumero":"6423900","descricao":"Caixas econômicas"},
      {"codigoCNAE":"6424-7/01","codigoCNAEsemNumero":"6424701","descricao":"Bancos cooperativos"},
      {"codigoCNAE":"6424-7/02","codigoCNAEsemNumero":"6424702","descricao":"Cooperativas centrais de crédito"},
      {"codigoCNAE":"6424-7/03","codigoCNAEsemNumero":"6424703","descricao":"Cooperativas de crédito mútuo"},
      {"codigoCNAE":"6424-7/04","codigoCNAEsemNumero":"6424704","descricao":"Cooperativas de crédito rural"},
      {"codigoCNAE":"6431-0/00","codigoCNAEsemNumero":"6431000","descricao":"Bancos múltiplos, sem carteira comercial"},
      {"codigoCNAE":"6432-8/00","codigoCNAEsemNumero":"6432800","descricao":"Bancos de investimento"},
      {"codigoCNAE":"6433-6/00","codigoCNAEsemNumero":"6433600","descricao":"Bancos de desenvolvimento"},
      {"codigoCNAE":"6434-4/00","codigoCNAEsemNumero":"6434400","descricao":"Agências de fomento"},
      {"codigoCNAE":"6435-2/01","codigoCNAEsemNumero":"6435201","descricao":"Sociedades de crédito imobiliário"},
      {"codigoCNAE":"6435-2/02","codigoCNAEsemNumero":"6435202","descricao":"Associações de poupança e empréstimo"},
      {"codigoCNAE":"6435-2/03","codigoCNAEsemNumero":"6435203","descricao":"Companhias hipotecárias"},
      {"codigoCNAE":"6436-1/00","codigoCNAEsemNumero":"6436100","descricao":"Sociedades de crédito, financiamento e investimento - financeiras"},
      {"codigoCNAE":"6437-9/00","codigoCNAEsemNumero":"6437900","descricao":"Sociedades de crédito ao microempreendedor"},
      {"codigoCNAE":"6438-7/01","codigoCNAEsemNumero":"6438701","descricao":"Bancos de câmbio"},
      {"codigoCNAE":"6438-7/99","codigoCNAEsemNumero":"6438799","descricao":"Outras instituições de intermediação não monetária não especificadas anteriormente"},
      {"codigoCNAE":"6440-9/00","codigoCNAEsemNumero":"6440900","descricao":"Arrendamento mercantil"},
      {"codigoCNAE":"6450-6/00","codigoCNAEsemNumero":"6450600","descricao":"Sociedades de capitalização"},
      {"codigoCNAE":"6461-1/00","codigoCNAEsemNumero":"6461100","descricao":"Holdings de instituições financeiras"},
      {"codigoCNAE":"6462-0/00","codigoCNAEsemNumero":"6462000","descricao":"Holdings de instituições não financeiras"},
      {"codigoCNAE":"6463-8/00","codigoCNAEsemNumero":"6463800","descricao":"Outras sociedades de participação, exceto holdings"},
      {"codigoCNAE":"6470-1/01","codigoCNAEsemNumero":"6470101","descricao":"Fundos de investimento, exceto previdenciários e imobiliários"},
      {"codigoCNAE":"6470-1/02","codigoCNAEsemNumero":"6470102","descricao":"Fundos de investimento previdenciários"},
      {"codigoCNAE":"6470-1/03","codigoCNAEsemNumero":"6470103","descricao":"Fundos de investimento imobiliários"},
      {"codigoCNAE":"6491-3/00","codigoCNAEsemNumero":"6491300","descricao":"Sociedades de fomento mercantil - factoring"},
      {"codigoCNAE":"6492-1/00","codigoCNAEsemNumero":"6492100","descricao":"Securitização de créditos"},
      {"codigoCNAE":"6493-0/00","codigoCNAEsemNumero":"6493000","descricao":"Administração de consórcios para aquisição de bens e direitos"},
      {"codigoCNAE":"6499-9/01","codigoCNAEsemNumero":"6499901","descricao":"Clubes de investimento"},
      {"codigoCNAE":"6499-9/02","codigoCNAEsemNumero":"6499902","descricao":"Sociedades de investimento"},
      {"codigoCNAE":"6499-9/03","codigoCNAEsemNumero":"6499903","descricao":"Fundo garantidor de crédito"},
      {"codigoCNAE":"6499-9/04","codigoCNAEsemNumero":"6499904","descricao":"Caixas de financiamento de corporações"},
      {"codigoCNAE":"6499-9/05","codigoCNAEsemNumero":"6499905","descricao":"Concessão de crédito pelas OSCIP"},
      {"codigoCNAE":"6499-9/99","codigoCNAEsemNumero":"6499999","descricao":"Outras atividades de serviços financeiros não especificadas anteriormente"},
      {"codigoCNAE":"6511-1/01","codigoCNAEsemNumero":"6511101","descricao":"Sociedade seguradora de seguros vida"},
      {"codigoCNAE":"6511-1/02","codigoCNAEsemNumero":"6511102","descricao":"Planos de auxílio-funeral"},
      {"codigoCNAE":"6512-0/00","codigoCNAEsemNumero":"6512000","descricao":"Sociedade seguradora de seguros não vida"},
      {"codigoCNAE":"6520-1/00","codigoCNAEsemNumero":"6520100","descricao":"Sociedade seguradora de seguros-saúde"},
      {"codigoCNAE":"6530-8/00","codigoCNAEsemNumero":"6530800","descricao":"Resseguros"},
      {"codigoCNAE":"6541-3/00","codigoCNAEsemNumero":"6541300","descricao":"Previdência complementar fechada"},
      {"codigoCNAE":"6542-1/00","codigoCNAEsemNumero":"6542100","descricao":"Previdência complementar aberta"},
      {"codigoCNAE":"6550-2/00","codigoCNAEsemNumero":"6550200","descricao":"Planos de saúde"},
      {"codigoCNAE":"6611-8/01","codigoCNAEsemNumero":"6611801","descricao":"Bolsa de valores"},
      {"codigoCNAE":"6611-8/02","codigoCNAEsemNumero":"6611802","descricao":"Bolsa de mercadorias"},
      {"codigoCNAE":"6611-8/03","codigoCNAEsemNumero":"6611803","descricao":"Bolsa de mercadorias e futuros"},
      {"codigoCNAE":"6611-8/04","codigoCNAEsemNumero":"6611804","descricao":"Administração de mercados de balcão organizados"},
      {"codigoCNAE":"6612-6/01","codigoCNAEsemNumero":"6612601","descricao":"Corretoras de títulos e valores mobiliários"},
      {"codigoCNAE":"6612-6/02","codigoCNAEsemNumero":"6612602","descricao":"Distribuidoras de títulos e valores mobiliários"},
      {"codigoCNAE":"6612-6/03","codigoCNAEsemNumero":"6612603","descricao":"Corretoras de câmbio"},
      {"codigoCNAE":"6612-6/04","codigoCNAEsemNumero":"6612604","descricao":"Corretoras de contratos de mercadorias"},
      {"codigoCNAE":"6612-6/05","codigoCNAEsemNumero":"6612605","descricao":"Agentes de investimentos em aplicações financeiras"},
      {"codigoCNAE":"6613-4/00","codigoCNAEsemNumero":"6613400","descricao":"Administração de cartões de crédito"},
      {"codigoCNAE":"6619-3/01","codigoCNAEsemNumero":"6619301","descricao":"Serviços de liquidação e custódia"},
      {"codigoCNAE":"6619-3/02","codigoCNAEsemNumero":"6619302","descricao":"Correspondentes de instituições financeiras"},
      {"codigoCNAE":"6619-3/03","codigoCNAEsemNumero":"6619303","descricao":"Representações de bancos estrangeiros"},
      {"codigoCNAE":"6619-3/04","codigoCNAEsemNumero":"6619304","descricao":"Caixas eletrônicos"},
      {"codigoCNAE":"6619-3/05","codigoCNAEsemNumero":"6619305","descricao":"Operadoras de cartões de débito"},
      {"codigoCNAE":"6619-3/99","codigoCNAEsemNumero":"6619399","descricao":"Outras atividades auxiliares dos serviços financeiros não especificadas anteriormente"},
      {"codigoCNAE":"6621-5/01","codigoCNAEsemNumero":"6621501","descricao":"Peritos e avaliadores de seguros"},
      {"codigoCNAE":"6621-5/02","codigoCNAEsemNumero":"6621502","descricao":"Auditoria e consultoria atuarial"},
      {"codigoCNAE":"6622-3/00","codigoCNAEsemNumero":"6622300","descricao":"Corretores e agentes de seguros, de planos de previdência complementar e de saúde"},
      {"codigoCNAE":"6629-1/00","codigoCNAEsemNumero":"6629100","descricao":"Atividades auxiliares dos seguros, da previdência complementar e dos planos de saúde não especificadas anteriormente"},
      {"codigoCNAE":"6630-4/00","codigoCNAEsemNumero":"6630400","descricao":"Atividades de administração de fundos por contrato ou comissão"},
      {"codigoCNAE":"6810-2/01","codigoCNAEsemNumero":"6810201","descricao":"Compra e venda de imóveis próprios"},
      {"codigoCNAE":"6810-2/02","codigoCNAEsemNumero":"6810202","descricao":"Aluguel de imóveis próprios"},
      {"codigoCNAE":"6810-2/03","codigoCNAEsemNumero":"6810203","descricao":"Loteamento de imóveis próprios"},
      {"codigoCNAE":"6821-8/01","codigoCNAEsemNumero":"6821801","descricao":"Corretagem na compra e venda e avaliação de imóveis"},
      {"codigoCNAE":"6821-8/02","codigoCNAEsemNumero":"6821802","descricao":"Corretagem no aluguel de imóveis"},
      {"codigoCNAE":"6822-6/00","codigoCNAEsemNumero":"6822600","descricao":"Gestão e administração da propriedade imobiliária"},
      {"codigoCNAE":"6911-7/01","codigoCNAEsemNumero":"6911701","descricao":"Serviços advocatícios"},
      {"codigoCNAE":"6911-7/02","codigoCNAEsemNumero":"6911702","descricao":"Atividades auxiliares da justiça"},
      {"codigoCNAE":"6911-7/03","codigoCNAEsemNumero":"6911703","descricao":"Agente de propriedade industrial"},
      {"codigoCNAE":"6912-5/00","codigoCNAEsemNumero":"6912500","descricao":"Cartórios"},
      {"codigoCNAE":"6920-6/01","codigoCNAEsemNumero":"6920601","descricao":"Atividades de contabilidade"},
      {"codigoCNAE":"6920-6/02","codigoCNAEsemNumero":"6920602","descricao":"Atividades de consultoria e auditoria contábil e tributária"},
      {"codigoCNAE":"7020-4/00","codigoCNAEsemNumero":"7020400","descricao":"Atividades de consultoria em gestão empresarial, exceto consultoria técnica específica"},
      {"codigoCNAE":"7111-1/00","codigoCNAEsemNumero":"7111100","descricao":"Serviços de arquitetura"},
      {"codigoCNAE":"7112-0/00","codigoCNAEsemNumero":"7112000","descricao":"Serviços de engenharia"},
      {"codigoCNAE":"7119-7/01","codigoCNAEsemNumero":"7119701","descricao":"Serviços de cartografia, topografia e geodésia"},
      {"codigoCNAE":"7119-7/02","codigoCNAEsemNumero":"7119702","descricao":"Atividades de estudos geológicos"},
      {"codigoCNAE":"7119-7/03","codigoCNAEsemNumero":"7119703","descricao":"Serviços de desenho técnico relacionados à arquitetura e engenharia"},
      {"codigoCNAE":"7119-7/04","codigoCNAEsemNumero":"7119704","descricao":"Serviços de perícia técnica relacionados à segurança do trabalho"},
      {"codigoCNAE":"7119-7/99","codigoCNAEsemNumero":"7119799","descricao":"Atividades técnicas relacionadas à engenharia e arquitetura não especificadas anteriormente"},
      {"codigoCNAE":"7120-1/00","codigoCNAEsemNumero":"7120100","descricao":"Testes e análises técnicas"},
      {"codigoCNAE":"7210-0/00","codigoCNAEsemNumero":"7210000","descricao":"Pesquisa e desenvolvimento experimental em ciências físicas e naturais"},
      {"codigoCNAE":"7220-7/00","codigoCNAEsemNumero":"7220700","descricao":"Pesquisa e desenvolvimento experimental em ciências sociais e humanas"},
      {"codigoCNAE":"7311-4/00","codigoCNAEsemNumero":"7311400","descricao":"Agências de publicidade"},
      {"codigoCNAE":"7312-2/00","codigoCNAEsemNumero":"7312200","descricao":"Agenciamento de espaços para publicidade, exceto em veículos de comunicação"},
      {"codigoCNAE":"7319-0/01","codigoCNAEsemNumero":"7319001","descricao":"Criação de estandes para feiras e exposições"},
      {"codigoCNAE":"7319-0/02","codigoCNAEsemNumero":"7319002","descricao":"Promoção de vendas"},
      {"codigoCNAE":"7319-0/03","codigoCNAEsemNumero":"7319003","descricao":"Marketing direto"},
      {"codigoCNAE":"7319-0/04","codigoCNAEsemNumero":"7319004","descricao":"Consultoria em publicidade"},
      {"codigoCNAE":"7319-0/99","codigoCNAEsemNumero":"7319099","descricao":"Outras atividades de publicidade não especificadas anteriormente"},
      {"codigoCNAE":"7320-3/00","codigoCNAEsemNumero":"7320300","descricao":"Pesquisas de mercado e de opinião pública"},
      {"codigoCNAE":"7410-2/02","codigoCNAEsemNumero":"7410202","descricao":"Design de interiores"},
      {"codigoCNAE":"7410-2/03","codigoCNAEsemNumero":"7410203","descricao":"Desing de produto"},
      {"codigoCNAE":"7410-2/99","codigoCNAEsemNumero":"7410299","descricao":"Atividades de desing não especificadas anteriormente"},
      {"codigoCNAE":"7420-0/01","codigoCNAEsemNumero":"7420001","descricao":"Atividades de produção de fotografias, exceto aérea e submarina"},
      {"codigoCNAE":"7420-0/02","codigoCNAEsemNumero":"7420002","descricao":"Atividades de produção de fotografias aéreas e submarinas"},
      {"codigoCNAE":"7420-0/03","codigoCNAEsemNumero":"7420003","descricao":"Laboratórios fotográficos"},
      {"codigoCNAE":"7420-0/04","codigoCNAEsemNumero":"7420004","descricao":"Filmagem de festas e eventos"},
      {"codigoCNAE":"7420-0/05","codigoCNAEsemNumero":"7420005","descricao":"Serviços de microfilmagem"},
      {"codigoCNAE":"7490-1/01","codigoCNAEsemNumero":"7490101","descricao":"Serviços de tradução, interpretação e similares"},
      {"codigoCNAE":"7490-1/02","codigoCNAEsemNumero":"7490102","descricao":"Escafandria e mergulho"},
      {"codigoCNAE":"7490-1/03","codigoCNAEsemNumero":"7490103","descricao":"Serviços de agronomia e de consultoria às atividades agrícolas e pecuárias"},
      {"codigoCNAE":"7490-1/04","codigoCNAEsemNumero":"7490104","descricao":"Atividades de intermediação e agenciamento de serviços e negócios em geral, exceto imobiliários"},
      {"codigoCNAE":"7490-1/05","codigoCNAEsemNumero":"7490105","descricao":"Agenciamento de profissionais para atividades esportivas, culturais e artísticas"},
      {"codigoCNAE":"7490-1/99","codigoCNAEsemNumero":"7490199","descricao":"Outras atividades profissionais, científicas e técnicas não especificadas anteriormente"},
      {"codigoCNAE":"7500-1/00","codigoCNAEsemNumero":"7500100","descricao":"Atividades veterinárias"},
      {"codigoCNAE":"7711-0/00","codigoCNAEsemNumero":"7711000","descricao":"Locação de automóveis sem condutor"},
      {"codigoCNAE":"7719-5/01","codigoCNAEsemNumero":"7719501","descricao":"Locação de embarcações sem tripulação, exceto para fins recreativos"},
      {"codigoCNAE":"7719-5/02","codigoCNAEsemNumero":"7719502","descricao":"Locação de aeronaves sem tripulação"},
      {"codigoCNAE":"7719-5/99","codigoCNAEsemNumero":"7719599","descricao":"Locação de outros meios de transporte não especificados anteriormente, sem condutor"},
      {"codigoCNAE":"7721-7/00","codigoCNAEsemNumero":"7721700","descricao":"Aluguel de equipamentos recreativos e esportivos"},
      {"codigoCNAE":"7722-5/00","codigoCNAEsemNumero":"7722500","descricao":"Aluguel de fitas de vídeo, DVDs e similares"},
      {"codigoCNAE":"7723-3/00","codigoCNAEsemNumero":"7723300","descricao":"Aluguel de objetos do vestuário, jóias e acessórios"},
      {"codigoCNAE":"7729-2/01","codigoCNAEsemNumero":"7729201","descricao":"Aluguel de aparelhos de jogos eletrônicos"},
      {"codigoCNAE":"7729-2/02","codigoCNAEsemNumero":"7729202","descricao":"Aluguel de móveis, utensílios e aparelhos de uso doméstico e pessoal; instrumentos musicais"},
      {"codigoCNAE":"7729-2/03","codigoCNAEsemNumero":"7729203","descricao":"Aluguel de material médico"},
      {"codigoCNAE":"7729-2/99","codigoCNAEsemNumero":"7729299","descricao":"Aluguel de outros objetos pessoais e domésticos não especificados anteriormente"},
      {"codigoCNAE":"7731-4/00","codigoCNAEsemNumero":"7731400","descricao":"Aluguel de máquinas e equipamentos agrícolas sem operador"},
      {"codigoCNAE":"7732-2/01","codigoCNAEsemNumero":"7732201","descricao":"Aluguel de máquinas e equipamentos para construção sem operador, exceto andaimes"},
      {"codigoCNAE":"7732-2/02","codigoCNAEsemNumero":"7732202","descricao":"Aluguel de andaimes"},
      {"codigoCNAE":"7733-1/00","codigoCNAEsemNumero":"7733100","descricao":"Aluguel de máquinas e equipamentos para escritório"},
      {"codigoCNAE":"7739-0/01","codigoCNAEsemNumero":"7739001","descricao":"Aluguel de máquinas e equipamentos para extração de minérios e petróleo, sem operador"},
      {"codigoCNAE":"7739-0/02","codigoCNAEsemNumero":"7739002","descricao":"Aluguel de equipamentos científicos, médicos e hospitalares, sem operador"},
      {"codigoCNAE":"7739-0/03","codigoCNAEsemNumero":"7739003","descricao":"Aluguel de palcos, coberturas e outras estruturas de uso temporário, exceto andaimes"},
      {"codigoCNAE":"7739-0/99","codigoCNAEsemNumero":"7739099","descricao":"Aluguel de outras máquinas e equipamentos comerciais e industriais não especificados anteriormente, sem operador"},
      {"codigoCNAE":"7740-3/00","codigoCNAEsemNumero":"7740300","descricao":"Gestão de ativos intangíveis não financeiros"},
      {"codigoCNAE":"7810-8/00","codigoCNAEsemNumero":"7810800","descricao":"Seleção e agenciamento de mão de obra"},
      {"codigoCNAE":"7820-5/00","codigoCNAEsemNumero":"7820500","descricao":"Locação de mão de obra temporária"},
      {"codigoCNAE":"7830-2/00","codigoCNAEsemNumero":"7830200","descricao":"Fornecimento e gestão de recursos humanos para terceiros"},
      {"codigoCNAE":"7911-2/00","codigoCNAEsemNumero":"7911200","descricao":"Agências de viagens"},
      {"codigoCNAE":"7912-1/00","codigoCNAEsemNumero":"7912100","descricao":"Operadores turísticos"},
      {"codigoCNAE":"7990-2/00","codigoCNAEsemNumero":"7990200","descricao":"Serviços de reservas e outros serviços de turismo não especificados anteriormente"},
      {"codigoCNAE":"8011-1/01","codigoCNAEsemNumero":"8011101","descricao":"Atividades de vigilância e segurança privada"},
      {"codigoCNAE":"8011-1/02","codigoCNAEsemNumero":"8011102","descricao":"Serviços de adestramento de cães de guarda"},
      {"codigoCNAE":"8012-9/00","codigoCNAEsemNumero":"8012900","descricao":"Atividades de transporte de valores"},
      {"codigoCNAE":"8020-0/01","codigoCNAEsemNumero":"8020001","descricao":"Atividades de monitoramento de sistemas de segurança eletrônico"},
      {"codigoCNAE":"8020-0/02","codigoCNAEsemNumero":"8020002","descricao":"Outras atividades de serviços de segurança"},
      {"codigoCNAE":"8030-7/00",	"codigoCNAEsemNumero"	:	"8030700"	,	"descricao"	:	"Atividades de investigação particular"	}	,
      {"codigoCNAE":"8111-7/00","codigoCNAEsemNumero":"8111700","descricao":"Serviços combinados para apoio a edifícios, exceto condomínios prediais"},
      {"codigoCNAE":"8112-5/00","codigoCNAEsemNumero":"8112500","descricao":"Condomínios prediais"},
      {"codigoCNAE":"8121-4/00","codigoCNAEsemNumero":"8121400","descricao":"Limpeza em prédios e em domicílios"},
      {"codigoCNAE":"8122-2/00","codigoCNAEsemNumero":"8122200","descricao":"Imunização e controle de pragas urbanas"},
      {"codigoCNAE":"8129-0/00","codigoCNAEsemNumero":"8129000","descricao":"Atividades de limpeza não especificadas anteriormente"},
      {"codigoCNAE":"8130-3/00","codigoCNAEsemNumero":"8130300","descricao":"Atividades paisagísticas"},
      {"codigoCNAE":"8211-3/00","codigoCNAEsemNumero":"8211300","descricao":"Serviços combinados de escritório e apoio administrativo"},
      {"codigoCNAE":"8219-9/01","codigoCNAEsemNumero":"8219901","descricao":"Fotocópias"},
      {"codigoCNAE":"8219-9/99","codigoCNAEsemNumero":"8219999","descricao":"Preparação de documentos e serviços especializados de apoio administrativo não especificados anteriormente"},
      {"codigoCNAE":"8220-2/00","codigoCNAEsemNumero":"8220200","descricao":"Atividades de teleatendimento"},
      {"codigoCNAE":"8230-0/01","codigoCNAEsemNumero":"8230001","descricao":"Serviços de organização de feiras, congressos, exposições e festas"},
      {"codigoCNAE":"8230-0/02","codigoCNAEsemNumero":"8230002","descricao":"Casas de festas e eventos"},
      {"codigoCNAE":"8291-1/00","codigoCNAEsemNumero":"8291100","descricao":"Atividades de cobrança e informações cadastrais"},
      {"codigoCNAE":"8292-0/00","codigoCNAEsemNumero":"8292000","descricao":"Envasamento e empacotamento sob contrato"},
      {"codigoCNAE":"8299-7/01","codigoCNAEsemNumero":"8299701","descricao":"Medição de consumo de energia elétrica, gás e água"},
      {"codigoCNAE":"8299-7/02","codigoCNAEsemNumero":"8299702","descricao":"Emissão de vales-alimentação, vales-transporte e similares"},
      {"codigoCNAE":"8299-7/03","codigoCNAEsemNumero":"8299703","descricao":"Serviços de gravação de carimbos, exceto confecção"},
      {"codigoCNAE":"8299-7/04","codigoCNAEsemNumero":"8299704","descricao":"Leiloeiros independentes"},
      {"codigoCNAE":"8299-7/05","codigoCNAEsemNumero":"8299705","descricao":"Serviços de levantamento de fundos sob contrato"},
      {"codigoCNAE":"8299-7/06","codigoCNAEsemNumero":"8299706","descricao":"Casas lotéricas"},
      {"codigoCNAE":"8299-7/07","codigoCNAEsemNumero":"8299707","descricao":"Salas de acesso à Internet"},
      {"codigoCNAE":"8299-7/99","codigoCNAEsemNumero":"8299799","descricao":"Outras atividades de serviços prestados principalmente às empresas não especificadas anteriormente"},
      {"codigoCNAE":"8411-6/00","codigoCNAEsemNumero":"8411600","descricao":"Administração pública em geral"},
      {"codigoCNAE":"8412-4/00","codigoCNAEsemNumero":"8412400","descricao":"Regulação das atividades de saúde, educação, serviços culturais e outros serviços sociais"},
      {"codigoCNAE":"8413-2/00","codigoCNAEsemNumero":"8413200","descricao":"Regulação das atividades econômicas"},
      {"codigoCNAE":"8421-3/00","codigoCNAEsemNumero":"8421300","descricao":"Relações exteriores"},
      {"codigoCNAE":"8422-1/00","codigoCNAEsemNumero":"8422100","descricao":"Defesa"},
      {"codigoCNAE":"8423-0/00","codigoCNAEsemNumero":"8423000","descricao":"Justiça"},
      {"codigoCNAE":"8424-8/00","codigoCNAEsemNumero":"8424800","descricao":"Segurança e ordem pública"},
      {"codigoCNAE":"8425-6/00","codigoCNAEsemNumero":"8425600","descricao":"Defesa Civil"},
      {"codigoCNAE":"8430-2/00","codigoCNAEsemNumero":"8430200","descricao":"Seguridade social obrigatória"},
      {"codigoCNAE":"8511-2/00","codigoCNAEsemNumero":"8511200","descricao":"Educação infantil - creche"},
      {"codigoCNAE":"8512-1/00","codigoCNAEsemNumero":"8512100","descricao":"Educação infantil - pré-escola"},
      {"codigoCNAE":"8513-9/00","codigoCNAEsemNumero":"8513900","descricao":"Ensino fundamental"},
      {"codigoCNAE":"8520-1/00","codigoCNAEsemNumero":"8520100","descricao":"Ensino médio"},
      {"codigoCNAE":"8531-7/00","codigoCNAEsemNumero":"8531700","descricao":"Educação superior - graduação"},
      {"codigoCNAE":"8532-5/00","codigoCNAEsemNumero":"8532500","descricao":"Educação superior - graduação e pós-graduação"},
      {"codigoCNAE":"8533-3/00","codigoCNAEsemNumero":"8533300","descricao":"Educação superior - pós-graduação e extensão"},
      {"codigoCNAE":"8541-4/00","codigoCNAEsemNumero":"8541400","descricao":"Educação profissional de nível técnico"},
      {"codigoCNAE":"8542-2/00","codigoCNAEsemNumero":"8542200","descricao":"Educação profissional de nível tecnológico"},
      {"codigoCNAE":"8550-3/01","codigoCNAEsemNumero":"8550301","descricao":"Administração de caixas escolares"},
      {"codigoCNAE":"8550-3/02","codigoCNAEsemNumero":"8550302","descricao":"Atividades de apoio à educação, exceto caixas escolares"},
      {"codigoCNAE":"8591-1/00","codigoCNAEsemNumero":"8591100","descricao":"Ensino de esportes"},
      {"codigoCNAE":"8592-9/01","codigoCNAEsemNumero":"8592901","descricao":"Ensino de dança"},
      {"codigoCNAE":"8592-9/02","codigoCNAEsemNumero":"8592902","descricao":"Ensino de artes cênicas, exceto dança"},
      {"codigoCNAE":"8592-9/03","codigoCNAEsemNumero":"8592903","descricao":"Ensino de música"},
      {"codigoCNAE":"8592-9/99","codigoCNAEsemNumero":"8592999","descricao":"Ensino de arte e cultura não especificado anteriormente"},
      {"codigoCNAE":"8593-7/00","codigoCNAEsemNumero":"8593700","descricao":"Ensino de idiomas"},
      {"codigoCNAE":"8599-6/01","codigoCNAEsemNumero":"8599601","descricao":"Formação de condutores"},
      {"codigoCNAE":"8599-6/02","codigoCNAEsemNumero":"8599602","descricao":"Cursos de pilotagem"},
      {"codigoCNAE":"8599-6/03","codigoCNAEsemNumero":"8599603","descricao":"Treinamento em informática"},
      {"codigoCNAE":"8599-6/04","codigoCNAEsemNumero":"8599604","descricao":"Treinamento em desenvolvimento profissional e gerencial"},
      {"codigoCNAE":"8599-6/05","codigoCNAEsemNumero":"8599605","descricao":"Cursos preparatórios para concursos"},
      {"codigoCNAE":"8599-6/99","codigoCNAEsemNumero":"8599699","descricao":"Outras atividades de ensino não especificadas anteriormente"},
      {"codigoCNAE":"8610-1/01","codigoCNAEsemNumero":"8610101","descricao":"Atividades de atendimento hospitalar, exceto pronto-socorro e unidades para atendimento a urgências"},
      {"codigoCNAE":"8610-1/02","codigoCNAEsemNumero":"8610102","descricao":"Atividades de atendimento em pronto-socorro e unidades hospitalares para atendimento a urgências"},
      {"codigoCNAE":"8621-6/01","codigoCNAEsemNumero":"8621601","descricao":"UTI móvel"},
      {"codigoCNAE":"8621-6/02","codigoCNAEsemNumero":"8621602","descricao":"Serviços móveis de atendimento a urgências, exceto por UTI móvel"},
      {"codigoCNAE":"8622-4/00","codigoCNAEsemNumero":"8622400","descricao":"Serviços de remoção de pacientes, exceto os serviços móveis de atendimento a urgências"},
      {"codigoCNAE":"8630-5/01","codigoCNAEsemNumero":"8630501","descricao":"Atividade médica ambulatorial com recursos para realização de procedimentos cirúrgicos"},
      {"codigoCNAE":"8630-5/02","codigoCNAEsemNumero":"8630502","descricao":"Atividade médica ambulatorial com recursos para realização de exames complementares"},
      {"codigoCNAE":"8630-5/03","codigoCNAEsemNumero":"8630503","descricao":"Atividade médica ambulatorial restrita a consultas"},
      {"codigoCNAE":"8630-5/04","codigoCNAEsemNumero":"8630504","descricao":"Atividade odontológica"},
      {"codigoCNAE":"8630-5/06","codigoCNAEsemNumero":"8630506","descricao":"Serviços de vacinação e imunização humana"},
      {"codigoCNAE":"8630-5/07","codigoCNAEsemNumero":"8630507","descricao":"Atividades de reprodução humana assistida"},
      {"codigoCNAE":"8630-5/99","codigoCNAEsemNumero":"8630599","descricao":"Atividades de atenção ambulatorial não especificadas anteriormente"},
      {"codigoCNAE":"8640-2/01","codigoCNAEsemNumero":"8640201","descricao":"Laboratórios de anatomia patológica e citológica"},
      {"codigoCNAE":"8640-2/02","codigoCNAEsemNumero":"8640202","descricao":"Laboratórios clínicos"},
      {"codigoCNAE":"8640-2/03","codigoCNAEsemNumero":"8640203","descricao":"Serviços de diálise e nefrologia"},
      {"codigoCNAE":"8640-2/04","codigoCNAEsemNumero":"8640204","descricao":"Serviços de tomografia"},
      {"codigoCNAE":"8640-2/05","codigoCNAEsemNumero":"8640205","descricao":"Serviços de diagnóstico por imagem com uso de radiação ionizante, exceto tomografia"},
      {"codigoCNAE":"8640-2/06","codigoCNAEsemNumero":"8640206","descricao":"Serviços de ressonância magnética"},
      {"codigoCNAE":"8640-2/07","codigoCNAEsemNumero":"8640207","descricao":"Serviços de diagnóstico por imagem sem uso de radiação ionizante, exceto ressonância magnética"},
      {"codigoCNAE":"8640-2/08","codigoCNAEsemNumero":"8640208","descricao":"Serviços de diagnóstico por registro gráfico - ECG, EEG e outros exames análogos"},
      {"codigoCNAE":"8640-2/09","codigoCNAEsemNumero":"8640209","descricao":"Serviços de diagnóstico por métodos ópticos - endoscopia e outros exames análogos"},
      {"codigoCNAE":"8640-2/10","codigoCNAEsemNumero":"8640210","descricao":"Serviços de quimioterapia"},
      {"codigoCNAE":"8640-2/11","codigoCNAEsemNumero":"8640211","descricao":"Serviços de radioterapia"},
      {"codigoCNAE":"8640-2/12","codigoCNAEsemNumero":"8640212","descricao":"Serviços de hemoterapia"},
      {"codigoCNAE":"8640-2/13","codigoCNAEsemNumero":"8640213","descricao":"Serviços de litotripsia"},
      {"codigoCNAE":"8640-2/14","codigoCNAEsemNumero":"8640214","descricao":"Serviços de bancos de células e tecidos humanos"},
      {"codigoCNAE":"8640-2/99","codigoCNAEsemNumero":"8640299","descricao":"Atividades de serviços de complementação diagnóstica e terapêutica não especificadas anteriormente"},
      {"codigoCNAE":"8650-0/01","codigoCNAEsemNumero":"8650001","descricao":"Atividades de enfermagem"},
      {"codigoCNAE":"8650-0/02","codigoCNAEsemNumero":"8650002","descricao":"Atividades de profissionais da nutrição"},
      {"codigoCNAE":"8650-0/03","codigoCNAEsemNumero":"8650003","descricao":"Atividades de psicologia e psicanálise"},
      {"codigoCNAE":"8650-0/04","codigoCNAEsemNumero":"8650004","descricao":"Atividades de fisioterapia"},
      {"codigoCNAE":"8650-0/05","codigoCNAEsemNumero":"8650005","descricao":"Atividades de terapia ocupacional"},
      {"codigoCNAE":"8650-0/06","codigoCNAEsemNumero":"8650006","descricao":"Atividades de fonoaudiologia"},
      {"codigoCNAE":"8650-0/07","codigoCNAEsemNumero":"8650007","descricao":"Atividades de terapia de nutrição enteral e parenteral"},
      {"codigoCNAE":"8650-0/99","codigoCNAEsemNumero":"8650099","descricao":"Atividades de profissionais da área de saúde não especificadas anteriormente"},
      {"codigoCNAE":"8660-7/00","codigoCNAEsemNumero":"8660700","descricao":"Atividades de apoio à gestão de saúde"},
      {"codigoCNAE":"8690-9/01","codigoCNAEsemNumero":"8690901","descricao":"Atividades de práticas integrativas e complementares em saúde humana"},
      {"codigoCNAE":"8690-9/02","codigoCNAEsemNumero":"8690902","descricao":"Atividades de bancos de leite humano"},
      {"codigoCNAE":"8690-9/03","codigoCNAEsemNumero":"8690903","descricao":"Atividades de acupuntura"},
      {"codigoCNAE":"8690-9/04","codigoCNAEsemNumero":"8690904","descricao":"Atividades de podologia"},
      {"codigoCNAE":"8690-9/99","codigoCNAEsemNumero":"8690999","descricao":"Outras atividades de atenção à saúde humana não especificadas anteriormente"},
      {"codigoCNAE":"8711-5/01","codigoCNAEsemNumero":"8711501","descricao":"Clínicas e residências geriátricas"},
      {"codigoCNAE":"8711-5/02","codigoCNAEsemNumero":"8711502","descricao":"Instituições de longa permanência para idosos"},
      {"codigoCNAE":"8711-5/03","codigoCNAEsemNumero":"8711503","descricao":"Atividades de assistência a deficientes físicos, imunodeprimidos e convalescentes"},
      {"codigoCNAE":"8711-5/04","codigoCNAEsemNumero":"8711504","descricao":"Centros de apoio a pacientes com câncer e com AIDS"},
      {"codigoCNAE":"8711-5/05","codigoCNAEsemNumero":"8711505","descricao":"Condomínios residenciais para idosos"},
      {"codigoCNAE":"8712-3/00","codigoCNAEsemNumero":"8712300","descricao":"Atividades de fornecimento de infraestrutura de apoio e assistência a paciente no domicílio"},
      {"codigoCNAE":"8720-4/01","codigoCNAEsemNumero":"8720401","descricao":"Atividades de centros de assistência psicossocial"},
      {"codigoCNAE":"8720-4/99","codigoCNAEsemNumero":"8720499","descricao":"Atividades de assistência psicossocial e à saúde a portadores de distúrbios psíquicos, deficiência mental e dependência química e grupos similares não especificadas anteriormente"},
      {"codigoCNAE":"8730-1/01","codigoCNAEsemNumero":"8730101","descricao":"Orfanatos"},
      {"codigoCNAE":"8730-1/02","codigoCNAEsemNumero":"8730102","descricao":"Albergues assistenciais"},
      {"codigoCNAE":"8730-1/99","codigoCNAEsemNumero":"8730199","descricao":"Atividades de assistência social prestadas em residências coletivas e particulares não especificadas anteriormente"},
      {"codigoCNAE":"8800-6/00","codigoCNAEsemNumero":"8800600","descricao":"Serviços de assistência social sem alojamento"},
      {"codigoCNAE":"9001-9/01","codigoCNAEsemNumero":"9001901","descricao":"Produção teatral"},
      {"codigoCNAE":"9001-9/02","codigoCNAEsemNumero":"9001902","descricao":"Produção musical"},
      {"codigoCNAE":"9001-9/03","codigoCNAEsemNumero":"9001903","descricao":"Produção de espetáculos de dança"},
      {"codigoCNAE":"9001-9/04","codigoCNAEsemNumero":"9001904","descricao":"Produção de espetáculos circenses, de marionetes e similares"},
      {"codigoCNAE":"9001-9/05","codigoCNAEsemNumero":"9001905","descricao":"Produção de espetáculos de rodeios, vaquejadas e similares"},
      {"codigoCNAE":"9001-9/06","codigoCNAEsemNumero":"9001906","descricao":"Atividades de sonorização e de iluminação"},
      {"codigoCNAE":"9001-9/99","codigoCNAEsemNumero":"9001999","descricao":"Artes cênicas, espetáculos e atividades complementares não especificados anteriormente"},
      {"codigoCNAE":"9002-7/01","codigoCNAEsemNumero":"9002701","descricao":"Atividades de artistas plásticos, jornalistas independentes ee scritores"},
      {"codigoCNAE":"9002-7/02","codigoCNAEsemNumero":"9002702","descricao":"Restauração de obras de arte"},
      {"codigoCNAE":"9003-5/00","codigoCNAEsemNumero":"9003500","descricao":"Gestão de espaços para artes cênicas, espetáculos e outras atividades artísticas"},
      {"codigoCNAE":"9101-5/00","codigoCNAEsemNumero":"9101500","descricao":"Atividades de bibliotecas e arquivos"},
      {"codigoCNAE":"9102-3/01","codigoCNAEsemNumero":"9102301","descricao":"Atividades de museus e de exploração de lugares e prédios históricos e atrações similares"},
      {"codigoCNAE":"9102-3/02","codigoCNAEsemNumero":"9102302","descricao":"Restauração e conservação de lugares e prédios históricos"},
      {"codigoCNAE":"9103-1/00","codigoCNAEsemNumero":"9103100","descricao":"Atividades de jardins botânicos, zoológicos, parques nacionais, reservas ecológicas e áreas de proteção ambiental"},
      {"codigoCNAE":"9200-3/01","codigoCNAEsemNumero":"9200301","descricao":"Casas de bingo"},
      {"codigoCNAE":"9200-3/02","codigoCNAEsemNumero":"9200302","descricao":"Exploração de apostas em corridas de cavalos"},
      {"codigoCNAE":"9200-3/99","codigoCNAEsemNumero":"9200399","descricao":"Exploração de jogos de azar e apostas não especificados anteriormente"},
      {"codigoCNAE":"9311-5/00","codigoCNAEsemNumero":"9311500","descricao":"Gestão de instalações de esportes"},
      {"codigoCNAE":"9312-3/00","codigoCNAEsemNumero":"9312300","descricao":"Clubes sociais, esportivos e similares"},
      {"codigoCNAE":"9313-1/00","codigoCNAEsemNumero":"9313100","descricao":"Atividades de condicionamento físico"},
      {"codigoCNAE":"9319-1/01","codigoCNAEsemNumero":"9319101","descricao":"Produção e promoção de eventos esportivos"},
      {"codigoCNAE":"9319-1/99","codigoCNAEsemNumero":"9319199","descricao":"Outras atividades esportivas não especificadas anteriormente"},
      {"codigoCNAE":"9321-2/00","codigoCNAEsemNumero":"9321200","descricao":"Parques de diversão e parques temáticos"},
      {"codigoCNAE":"9329-8/01","codigoCNAEsemNumero":"9329801","descricao":"Discotecas, danceterias, salões de dança e similares"},
      {"codigoCNAE":"9329-8/02","codigoCNAEsemNumero":"9329802","descricao":"Exploração de boliches"},
      {"codigoCNAE":"9329-8/03","codigoCNAEsemNumero":"9329803","descricao":"Exploração de jogos de sinuca, bilhar e similares"},
      {"codigoCNAE":"9329-8/04","codigoCNAEsemNumero":"9329804","descricao":"Exploração de jogos eletrônicos recreativos"},
      {"codigoCNAE":"9329-8/99","codigoCNAEsemNumero":"9329899","descricao":"Outras atividades de recreação e lazer não especificadas anteriormente"},
      {"codigoCNAE":"9411-1/00","codigoCNAEsemNumero":"9411100","descricao":"Atividades de organizações associativas patronais e empresariais"},
      {"codigoCNAE":"9412-0/01","codigoCNAEsemNumero":"9412001","descricao":"Atividades de fiscalização profissional"},
      {"codigoCNAE":"9412-0/99","codigoCNAEsemNumero":"9412099","descricao":"Outras atividades associativas profissionais"},
      {"codigoCNAE":"9420-1/00","codigoCNAEsemNumero":"9420100","descricao":"Atividades de organizações sindicais"},
      {"codigoCNAE":"9430-8/00","codigoCNAEsemNumero":"9430800","descricao":"Atividades de associações de defesa de direitos sociais"},
      {"codigoCNAE":"9491-0/00","codigoCNAEsemNumero":"9491000","descricao":"Atividades de organizações religiosas ou filosóficas"},
      {"codigoCNAE":"9492-8/00","codigoCNAEsemNumero":"9492800","descricao":"Atividades de organizações políticas"},
      {"codigoCNAE":"9493-6/00","codigoCNAEsemNumero":"9493600","descricao":"Atividades de organizações associativas ligadas à cultura e à arte"},
      {"codigoCNAE":"9499-5/00","codigoCNAEsemNumero":"9499500","descricao":"Atividades associativas não especificadas anteriormente"},
      {"codigoCNAE":"9511-8/00","codigoCNAEsemNumero":"9511800","descricao":"Reparação e manutenção de computadores e de equipamentos periféricos"},
      {"codigoCNAE":"9512-6/00","codigoCNAEsemNumero":"9512600","descricao":"Reparação e manutenção de equipamentos de comunicação"},
      {"codigoCNAE":"9521-5/00","codigoCNAEsemNumero":"9521500","descricao":"Reparação e manutenção de equipamentos eletroeletrônicos de uso pessoal e doméstico"},
      {"codigoCNAE":"9529-1/01","codigoCNAEsemNumero":"9529101","descricao":"Reparação de calçados, bolsas e artigos de viagem"},
      {"codigoCNAE":"9529-1/02","codigoCNAEsemNumero":"9529102","descricao":"Chaveiros"},
      {"codigoCNAE":"9529-1/03","codigoCNAEsemNumero":"9529103","descricao":"Reparação de relógios"},
      {"codigoCNAE":"9529-1/04","codigoCNAEsemNumero":"9529104","descricao":"Reparação de bicicletas, triciclos e outros veículos não motorizados"},
      {"codigoCNAE":"9529-1/05","codigoCNAEsemNumero":"9529105","descricao":"Reparação de artigos do mobiliário"},
      {"codigoCNAE":"9529-1/06","codigoCNAEsemNumero":"9529106","descricao":"Reparação de jóias"},
      {"codigoCNAE":"9529-1/99","codigoCNAEsemNumero":"9529199","descricao":"Reparação e manutenção de outros objetos e equipamentos pessoais e domésticos não especificados anteriormente"},
      {"codigoCNAE":"9601-7/01","codigoCNAEsemNumero":"9601701","descricao":"Lavanderias"},
      {"codigoCNAE":"9601-7/02","codigoCNAEsemNumero":"9601702","descricao":"Tinturarias"},
      {"codigoCNAE":"9601-7/03","codigoCNAEsemNumero":"9601703","descricao":"Toalheiros"},
      {"codigoCNAE":"9602-5/01","codigoCNAEsemNumero":"9602501","descricao":"Cabeleireiros, manicure e pedicure"},
      {"codigoCNAE":"9602-5/02","codigoCNAEsemNumero":"9602502","descricao":"Atividades de estética e outros serviços de cuidados com a beleza"},
      {"codigoCNAE":"9603-3/01","codigoCNAEsemNumero":"9603301","descricao":"Gestão e manutenção de cemitérios"},
      {"codigoCNAE":"9603-3/02","codigoCNAEsemNumero":"9603302","descricao":"Serviços de cremação"},
      {"codigoCNAE":"9603-3/03","codigoCNAEsemNumero":"9603303","descricao":"Serviços de sepultamento"},
      {"codigoCNAE":"9603-3/04","codigoCNAEsemNumero":"9603304","descricao":"Serviços de funerárias"},
      {"codigoCNAE":"9603-3/05","codigoCNAEsemNumero":"9603305","descricao":"Serviços de somatoconservação"},
      {"codigoCNAE":"9603-3/99","codigoCNAEsemNumero":"9603399","descricao":"Atividades funerárias e serviços relacionados não especificados anteriormente"},
      {"codigoCNAE":"9609-2/02","codigoCNAEsemNumero":"9609202","descricao":"Agências matrimoniais"},
      {"codigoCNAE":"9609-2/04","codigoCNAEsemNumero":"9609204","descricao":"Exploração de máquinas de serviços pessoais acionadas por moeda"},
      {"codigoCNAE":"9609-2/05","codigoCNAEsemNumero":"9609205","descricao":"Atividades de sauna e banhos"},
      {"codigoCNAE":"9609-2/06","codigoCNAEsemNumero":"9609206","descricao":"Serviços de tatuagem e colocação de piercing"},
      {"codigoCNAE":"9609-2/07","codigoCNAEsemNumero":"9609207","descricao":"Alojamento de animais domésticos"},
      {"codigoCNAE":"9609-2/08","codigoCNAEsemNumero":"9609208","descricao":"Higiene e embelezamento de animais domésticos"},
      {"codigoCNAE":"9609-2/99","codigoCNAEsemNumero":"9609299","descricao":"Outras atividades de serviços pessoais não especificadas anteriormente"},
      {"codigoCNAE":"9700-5/00","codigoCNAEsemNumero":"9700500","descricao":"Serviços domésticos"},

    ],
    cnaeEscolhido: {},

    perfilEditDialog: false,
    usuarioAeditar: {},

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

    // Método para setar os valores do usuário no dialog de edição do usuário
    openPerfilEdit(){
      let usuarioBuscado = {}
      let _id = localStorage.getItem("_id")
      usuarioBuscado._id = _id
      HTTPutils.buscarUsuarioEspecificoPeloId(usuarioBuscado).then( usuarioEncontrado => {
        this.usuarioAeditar = usuarioEncontrado
      })
      this.perfilEditDialog = true
    },

    // Método para salvar edição do usuário
    editarDadosDoPerfilDoUsuario(){
      this.perfilEditDialog = false
      HTTPutils.editarUsuario(this.usuarioAeditar).then( usuarioEditado => {
        this.usuarioAeditar = usuarioEditado
      })
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

    openDeleteProject(projetoAserRemovido){
      this.dialogDoProjetoSelecionadoParaDeletar = true
      this.projetoSelecionadoParaDeletar = projetoAserRemovido
    },

    removerProjeto(){
      HTTPutils.removerProjeto(this.projetoSelecionadoParaDeletar)
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

    salvarItemNoQuadroDeAreas(){
      
      let projetoAserEditadoMaisOquadroDeAreas = {}
      let novaEdificacaoNoQuadroDeAreas = {}
      let arrayParaOquadroDeAreas = []
      projetoAserEditadoMaisOquadroDeAreas._id = localStorage.getItem("projetoId")

      novaEdificacaoNoQuadroDeAreas.edificacaoNova = this.edificacaoNova
      novaEdificacaoNoQuadroDeAreas.areaTotalDaNovaEdificacao = this.areaTotalDaNovaEdificacao
      novaEdificacaoNoQuadroDeAreas.ambiente1DaNovaEdificacao = this.ambiente1DaNovaEdificacao
      novaEdificacaoNoQuadroDeAreas.ambiente2DaNovaEdificacao = this.ambiente2DaNovaEdificacao
      novaEdificacaoNoQuadroDeAreas.ambiente3DaNovaEdificacao = this.ambiente3DaNovaEdificacao
      novaEdificacaoNoQuadroDeAreas.areaDoambiente1 = this.areaDoambiente1
      novaEdificacaoNoQuadroDeAreas.areaDoambiente2 = this.areaDoambiente2
      novaEdificacaoNoQuadroDeAreas.areaDoambiente3 = this.areaDoambiente3

      arrayParaOquadroDeAreas.push(novaEdificacaoNoQuadroDeAreas)
      projetoAserEditadoMaisOquadroDeAreas.quadroDeAreas = arrayParaOquadroDeAreas
      
      let usuario = {}
      usuario._id = localStorage.getItem("_id")
      projetoAserEditadoMaisOquadroDeAreas.usuario = usuario

      HTTPutils.adicionarItemNoQuadroDeAreas(projetoAserEditadoMaisOquadroDeAreas)
        .then( objetoRetornadoDaApi => {

          this.quadroDeAreas = objetoRetornadoDaApi.quadroDeAreas
          
          for(let i = 0; i < this.quadroDeAreas.length; i++){
            this.quadroDeAreas[i].edit = 'edit'
            this.quadroDeAreas[i].delete = 'delete'
          }
        })

    },

    deletarItemDoQuadroDeAreas(item){
      let projetoAdeletarItemNoQuadroDeAreas = {}
      let projetoId = localStorage.getItem("projetoId")
      projetoAdeletarItemNoQuadroDeAreas._id = projetoId
      projetoAdeletarItemNoQuadroDeAreas.itemAdeletar = item
      
      HTTPutils.deletarItemNoQuadroDeAreas(projetoAdeletarItemNoQuadroDeAreas).then( projetoRetornado => {
        if(projetoRetornado != '' && projetoRetornado != null && projetoRetornado != undefined && projetoRetornado != {} && projetoRetornado != []){
          this.quadroDeAreas = projetoRetornado.quadroDeAreas
        } else {
          console.log("Erro ao deletar o item no quadro de áreas, por favor, informe ao admin do site!")
        }
      })

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
              for(let i = 0; i < this.quadroDeAreas.length; i++){
                this.quadroDeAreas[i].edit = 'edit'
                this.quadroDeAreas[i].delete = 'delete'
              }
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