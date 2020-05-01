---
title: "Introducao Redes"
date: 2017-03-03T16:37:01-03:00
draft: true
tags: ["redes", "introdução"]
---

Decidi revisar um pouco a matéria de redes, espero que forme um conteúdo valoroso para todos, assim como é para mim.


# Redes

Computadores se comunicam (trocam dados) com o objetivo de gerar valor para os dois lados, cada lado da rede precisa de alguma coisa e por isso estão comunicando. Por instância, você chama o Facebook para conversar com seus amigos e o Facebook responde para ganhar dinheiro com propaganda.

Uma **rede** pode ser representada por um grafo o qual os vértices são máquinas de processamento e as arestas são os links de transmissão. Exemplos de redes incluem Internet, telefones, e até walkie-talkies.

## Protocolos

Fundamentalmente, sinais são transmitidos pelo espaço. Padrões definem o modo pelo qual a informação passa, primeiramente como bits, depois como conceitos de maior nível.

Os padrões podem depender da existência de um padrão de nível inferior, formando uma *pilha de protocolos*. O **modelo OSI** é uma pilha teórica com as seguintes camadas:

- Física: transmite bits através de um meio (ex: DSL, 802.11),
- Ligação de dados: transmissão de frames principalmente através de nós adjacentes, para determinar o começo e o fim de uma mensagem (ex: Ethernet, MAC, PPP),
- Rede: transmissão de pacotes pelas rotas do grafo (ex: IP, NAT),
- Transporte: transmissão de segmentos, assim aplicações em ambos endpoints podem trocar mensagens com determinadas garantias de comfiabilidade (ex: TCP, UDP, ICMP (ping)),
- Sessão: configuração e reconhecimento dos endpoints através das mensagens,
- Apresentação: codificação dos dados (charset, compressão, encriptação) (ex: TLS, HTTP com MIME para alguma extensão),
- Aplicação: serialização das estruturas de dados (ex: HTTP (documentos), NTP (tempo), SMTP (email), FTP (arquivos)).

Agora vamos ver uma pilha baseada na teórica OSI.

### HTTP

**HyperText Transfer Protocol** ([HTTP](https://tools.ietf.org/html/rfc2616)) é um protocolo da camada de aplicação designed para transmissão de documentos por cliente-servidor. Por instância, para requisitar a página principal de um servidor HTTP pelo seu computador:

    GET / HTTP/1.1
    Host: localhost:1234
    Accept: text/html

(Cada nova linha é constituída por dois bytes: 0x0D e 0x0A, CR-LF; ele termina com duas novas linhas). O servidor pode responder:

    HTTP/1.1 200 OK
    Content-Type: text/html
    Date: Sat, 31 Dec 2016 15:31:45 GMT
    Connection: keep-alive
    Transfer-Encoding: chunked

    7E
    <!doctype html>
    <html>
     <head>
      <meta charset=utf-8>
      <title> This is HTML </title>
     </head>
     <body></body>
    </html>

    0

Essa resposta inclue o arquivo [HTML](https://html.spec.whatwg.org/multipage/) que o cliente HTTP (usualmente, o browser, como o Firefox ou o Google Chrome) vai ler as instruções de como criar a página, o que determina os pixels que devem ser mostrados, as animações que devem ser mostradas, as interações a serem executadas quando um usuário se move pela página ou clica o mouse, o som a ser reproduzido, etc.

Todas as requisições têm a primeira linha com o método (`GET`), um caminho (`/`), e um protocolo (`HTTP/1.1`), seguidos pelo cabeçalho mapeando nomes de cabeçalhos (`Accept`) para o seu valor (`text/html`). As solicitações também podem levar dados.

Respostas tem a primeira linha com o protocolo (`HTTP/1.1`), um código (`200 OK`; código iniciado com 1 são informacionais, 2 para sucesso, 3 para redirecionamento, 4 para erro no cliente, 5 para erro no servidor). Respostas usualmente trazem dados (no exemplo, um código HTML), e também possui o cabeçalho, o qual explica quais são os dados, e qual o seu encode (charset, compressão), que horas são, se está usando cache, como guardar informações de sessão (através de cookies) e outras coisas.

Como mencionado, HTTP inclui uma camada de apresentação "protocolos" nos cabeçalhos, como o **Multipurpose Internet Mail Extensions** ([MIME](https://tools.ietf.org/html/rfc2045)) no `Content-Type`, para especificar o arquivo `<tipo>/<subtipo>` (ex. `text/plain`), ou se recursivamente contém subarquivos com `multipart/mixed` ou [`multipart/form-data`](https://tools.ietf.org/html/rfc7578), em que cada subarquivo especifica o seu próprio cabeçalho:

    POST /upload HTTP/1.1
    Host: localhost:1234
    Content-Length: 882
    Content-Type: multipart/form-data; boundary=random0ACxeUx4Nxqy3roVtMxrAw

    --random0ACxeUx4Nxqy3roVtMxrAw
    Content-Disposition: form-data; name="name-of-first-part"
    Content-Type: text/plain

    This first file contains normal plain text.
    --random0ACxeUx4Nxqy3roVtMxrAw
    Content-Disposition: form-data; name="multiple-images"; filename="image.svg"
    Content-Type: image/svg+xml; charset=UTF-8

    <?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="20">
      <text x="10" y="15">This is an image</text>
    </svg>
    --random0ACxeUx4Nxqy3roVtMxrAw
    Content-Disposition: form-data; name="multiple-images"; filename="image.png"
    Content-Type: image/png
    Content-Transfer-Encoding: base64

    iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACx
    jwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY2BgYAAAAAQAAVzN/2kAAAAASUVO
    RK5CYII=
    --random0ACxeUx4Nxqy3roVtMxrAw--

(Note o uso de base64 na image.png está depreciado; na vida real, ele seria substituido pelos dados binários diretamente.)

HTTPS é similar ao HTTP, exceto por todo o fluxo de dados, incluindo o cabeçalho, é encriptado para previnir nós intermediários na rede de ler ou modificar o conteúdo, o qual é necessário quando transmitindo identificações ou informações bancarias, e para previnir ser passado como um tolo performando perigosos atos.

### TCP

**Transmission Control Protocol** ([TCP](https://tools.ietf.org/html/rfc793)) é um protocolo da camada de transporte que garante que os segmentos são recebidos sem erros na ordem em que eles são enviados.
Quando usado IP, ele corta os segmentos em pedaços que cabem em um pacote.

1. O servidor inicia a ouvir uma porta.
2. O cliente inicia uma conexão com SYN(número de sequenciamento).
3. O servidor informa o cliente que recebeu com o SYN+ACK(número de confirmação).
4. O cliente envia um ACK.
5. O servidor e o cliente agora pode enviar uma série de pacotes entre eles, e eles enviam ACK para confirmar cada recebimento e se todos os pacotes prévios foram recebidos em ordem.
6. O cliente envia um FIN(sem mais dados para enviar).
7. O servidor envia um FIN+ACK (ou um ACK seguido por um FIN).
8. O cliente envia um ACK. (A conexão permace aberta até dar time out.)

Um cabeçalho TCP inclue:

- Porta de origim em 2 bytes,
- Porta de destino em 2 bytes,
- Número de sequenciamento 4 bytes:
  - Em um SYN, o qual é o número de sequenciamento inicial (ISN) escolhido randomicamente,
  - ou pode ser (server ISN) + 1 + número de bytes enviado previamente, garantindo que os pacotes podem ser reordenados para obter o segmento inicial.
- Número de confirmação 4 bytes:
  - Em um SYN-ACK, esse é (cliente ISN) + 1, e número de sequenciamento do servidor é escolhido randomicamente,
  - Em um ACK, esse é (server ISN) + número de bytes recebidos + 1, o qual é o próximo número de sequencia a ser recebedor pelo servidor.
- Offset dos dados 4 bits, o tamanho do cabeçalho TCP em palavras de 32-bit (padrão em 5),
- 000 (reservado),
- Marcações(flags) em 9 bits: NS, CWR, ECE, URG (ponteiro de leitura urgente), ACK (numero de confirmação de receber dados ou SYN), PSH (enviar dados do buffer para a aplicação), RST (reset a conexão), SYN (sincronizar o número de sequenciamento, usado apenas no handshake inicial), FIN (fim dos dados, usado apenas no fim do handshake),
- tamanho da janela 2 bytes, possibilitando fluxo e controle dos dados,
- checksum 2 bytes para checar corrupção do cabeçalho ou dos dados,
- ponteiro urgente 2 bytes apontando para um número de sequencia,

### IP

**Internet Protocol** ([IP](https://tools.ietf.org/html/rfc791)) é um protocolo da camada de rede que garante que os pacotes irão para o destino correto mesmo passando por diversas máquinas pelo caminho.

Além disso, corta o pacote em fragmentos que cabem dentro de um frame da camada de link.

Fragmentar e reordenar o pacote para outro fim foi projetado para casos os quais o pacote precisa ser transmitido por um link, o qual não pode enviar todo o pacote (tipicamente, um valor máximo de tamanho para um fração na conexão ethernet ou quando o destino não tem memória o bastante para guardar o pacote).

Assim, o TCP pode dividir os dados arbitrariamente em pacotes menores para caber em um frame ethernet, e a fragmentação diminui a segurança, já que a cauda dos fragmentos não guardam o cabeçalho TCP. Além disso, o caminho MTU (transporte maximo de unidade) descoberto (PMTUD) possibilita determinar o tamanho do frame na camada física através da rede. Como resultado, o IPV6 não habilita a fragmentação de pacotes com o caminho, necessitando que o envio seja em ambas as formas com seu tamanho correto (para TCP), ou em forma de fragmentos no tamanho correto (para UDP e ICMP, os quais não podem dividir os dados em multiplos pacotes).

Note que pacotes podem ser perdidos, dusplicados, recebidos fora de ordem, ou corrompidos sem que a camada de IP note. O próprio TCP é responsável por previnir que isso não aconteça.

Endereços IP segmentam a internet em cada vez menores sub-redes, as quais **roteadores** processam os pacotes dentro e através das redes. Isso pode manualmente mudar ou obtidos automaticamente pelo **Protocolo de configuração do host** (DHCP).

Endereços IPv4 possuem 4 bytes, comumente escritos em decimais separados por pontos, ex. `192.168.0.200`.

Endereços IPv6 possuem 16 bytes, os quais pares de bytes representam números hexadecimais separador por dois pontos, os quais zeros podem opcionalmente serem subtituidos por dois pontos duplos, ex. `ff02::1:ff00:0`

Alguns endereços IPs podem ser mapeados para um nome (ex, `google.com.br` → 201.17.165.177) utilizando o **Domais name system** (DNS), um sistema de nomeação para entidades da internet. Companhias que podem alocar novos domínios são conhecidos como registradores. Eles publicam as suas informações como arquivos de zonas, e possibilitam edição autenticada desses arquivos pelo domínio dos proprietários. [IP]: https://tools.ietf.org/html/rfc791

*Enquanto o HTTP requer o TCP, o qual requer IP, protocolos de layers mais baixos são usualmente insubstituíveis.*

### Ethernet

Na camada do link, comunicação basicamente ocorre diretamente entre dois nós adjacentes.

Dentro dos protocolos da camada de link, **Ethernet** (LAN, IEEE 802.3) é uma camada de link, protocolo para transmitir pacotes através de um fio entre duas máquinas.

A Ethernet sobrevive graças a **repetidores** para transmitir dados por longas distâncias, já que a camada física usualmente possui cabos com comprimentos máximos. Diversas máquinas são conectadas a um repetidor, criando uma topologia de estrela. **Pontes** são máquinas inteligentes que se lembram do endereço MAC que enviou os dados e usam essa informação para fugir de envios de pacotes para máquinas que não são o destino de acordo com o pacote. **Switches** são máquinas programáveis inteligentes que detectam e bloqueiam pacotes corrompidos.

Uma alternativa a Ethernet é a **WiFi** (WLAN, IEEE 802.11), o protocolo comum de wireless.

## Layouts de redes

**Distribuídos** são sistemas os quais dependem de múltiplos pontos computacionais comunicando.

**Cliente-servidor** (Modelo Estrela) é uma arquitetura que possui uma unidade especial, o servidor, o qual recebe requests de diversas unidades computacionais (clientes), processa o request, e envia a resposta para cada request. Exemplo o HTTP.

**Arquitetura em três camadas** arquitetura que separa os nós em três tipos:
- Camada de apresentação: lê os dados de entrada e mostra a interface de usuário (UI). Tipicamente, notebooks e celulares.
- Camada de negócio: executas queries de usuários e move dados.
- Camada de dados: gerencia os dados, tipicamente através de uma Criação-Leitura-Atualização-Remoção (CRUD), Application Programming Interfaces (APIs), tipicamente garantindo atomicidade-consistencia-isolação-durabilidade (ACID).

**Arquitetura multi camada** é quando a arquitetura em três camadas possui sub camadas.

**Descentralizado** arquitetura que tem a capacidade de perder qualquer nó e se manter. Ex. inclui Hash Tables Distribuidos (DHT).

**Peer-to-peer** (P2P) arquitetura que se sustenta com a perda de qualquer número de nós, enquanto existir um nó sempre vai existir uma rede. Ex. incluem Bittorrent, Bitcoin e alguns tipos de arquivos de sistema.
