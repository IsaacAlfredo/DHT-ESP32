# DHT ESP32

Vídeo: https://youtu.be/QNyamHbZpSw

Alunos: Arthur Vinicius Vieira Santos, Isaac Alfredo de Freitas Silva, Luis Henrique Amorim da Silva e Nicoli Valentim dos Santos

Código do servidor utilizado (atualmente está upado na AWS): https://github.com/IsaacAlfredo/DHT_Server

## Desenvolvimento do Projeto
Durante a maior parte do tempo do projeto, tentamos desenvolvê-lo com a placa física. No entanto, tivemos uma série de problemas ao longo do percurso, como:
- Computadores não reconhecendo a conexão via USB - resolvemos instalando alguns drivers correspondentes;
- Computadores do laboratório da UFAL (LECC2) sem as devidas bibliotecas instaladas na IDE, sendo necessária a senha do GTI para a instalação;
- Código não recebia dados do sensor;
- Sensor DHT11 queimando ao tentar executar o código.

Não conseguimos solução para o quarto problema, o que acabou frustrando nossas tentativas após queimar 3 sensores sem que descobrissemos a causa. Por conta disso, nos voltamos à tentativa de executar o trabalho com simuladores. Encontramos o Wokwi, porém nos deparamos com o problema de precisar de sua versão Premium para utilizar sua IoT Gateway, necessária para as requisições HTTP para o desenvolvimento do site.

Felizmente, encontramos um exemplo no Wokwi onde o IoT Gateway funcionava. Acreditamos que o motivo para tal é o ssid escolhido, "Wokwi-GUEST", que consegue executar uma versão gratuita da Gateway. Com isso, finalmente pudemos passar para a criação da página web.

Nesse momento, nos deparamos com mais um problema: por algum motivo, o código não reconhece APIs em localhost. Para resolver isso, tivemos que criar um servidor na AWS com a nossa API e utilizar o IP fornecido por ela para as requisições.

Feito isso, conseguimos finalmente construir a página web, que mostra a temperatura e umidade fornecidas pela simulação no Wokwi, e mostra um gráfico com as últimas 10 leituras desses valores. Uma aparente limitação do simulador é a de que o código só roda enquanto a guia do simulador está em foco, portanto é necessário ir e voltar algumas vezes entre as abas para que a requisição da simulação seja devidamente realizada (como demonstrado em vídeo).

## Descrição do Código
### dht.ino
O código que capta as leituras do sensor DHT (nesse caso, em simulador). Definimos o DHTPIN como 15 pois conectamos o pino SDA (Pino digital de dados) ao pino 15 da ESP32. Utilizamos o DHT22 pois é o que o simulador nos fornece. Em seguida, utilizamos a biblioteca wifi para a conexão e a biblioteca DHT para a leitura dos dados do sensor, feito por meio dos métodos "readHumidity" e "readTemperature". Com isso, criamos uma conexão HTTP com nosso servidor e realizamos um GET, que envia para a nossa API os dados coletados por meio dos parâmetros de cabeçalho da requisição. 

### API (server.js: https://github.com/IsaacAlfredo/DHT_Server )
Nossa API foi feita em javascript com a biblioteca Express. Criamos as rotas:
- /update (GET): rota que recebe os dados pelo parâmetro de cabeçalho. Ela atualiza as variáveis que guardam os valores de temperatura e umidade atual, além das listas das últimas 10 leituras de cada valor;
- /temperature (GET): rota que retorna o valor atual da temperatura;
- /humidity (GET): rota que retorna o valor atual da umidade;
- /hist (GET): rota que retorna um json com as listas das últimas 10 leituras.

A API escuta a porta 3000. Por estar na AWS, precisamos definir o header Access-Control-Allow-Origin como * para aceitar requisições de qualquer fonte, para que o simulador pudesse fazê-lo.

### Webpage (index.html, style.css, script.js)
A página web foi criada com HTML e CSS simples, com um script em javascript. Também utilizamos a biblioteca chartjs para a geração do gráfico. Em resumo, o script serve para consumir nossa API por meio da biblioteca Fetch e atualizar os valores de temperatura e umidade na página, além dos valores no gráfico. Definimos o atributo "http-equiv" como "refresh" para atualizar automaticamente a página após 2 segundos.
