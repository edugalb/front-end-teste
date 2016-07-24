# Olá, Seja bem vindo ao meu teste

**Inicialmente fiquei em dúvida sobre qual o público alvo referente ao simulador, decidi assumir que os usuários estariam
logados em uma aplicação, e que o simulador na realidade seria um módulo da aplicação. Sendo assim, decidi adicionar a barra lateral com o menu do sistema, junto com as informações do usuário, com uma estrutura de aplicação pude utilizar de plugins para gerenciar as Rotas e aplicar um processo de Build**


### Como Instalar

* git clone 
* bower install

### Como contribuir

* Basta me contratar

### Build

* npm install
* gulp build


### Bibliotecas Utilizadas

* Gerenciamento de rotas (ui-router)
* Carregamento assincrono (oc-lazy-loader)
* Máscaras de Valores (jquery.priceformat)
* REST com Restangular

### Usabilidade

* Ao entrar no sistema, o usuário deve utilizar o mouse para selecionar o radio.
* Uma vez selecionado, toda operação pode ser conduzida pelo teclado, utilizando o enter.

### Estrutura

* /javascripts/services: Serviçoes em comum para todos controllers
* /javascripts/components: Components no formato de diretrizes
* /javascripts/app: Rota abstrata padrão, sempre carregada independente do módulo

### Problemas conhecidos

* O processo de build está incompleto.
* Faltou a parte de testes com o jasmine
* Faltou tempo para desenvolver mais :)