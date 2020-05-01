---
title: "Introdução a Microservices"
date: 2016-11-13T16:37:25-03:00
draft: true
tags: ["microservices"]
---

### Introdução

Hoje, o ecossistema tecnológico muda incessantemente, novas linguagens, estruturas e soluções surgem a todo momento. Usuários esperam que as empresas entreguem valor rápido e frequente. Aplicações com a arquitetura monolítica não lidar com os desafios da mudança rápida das condições de mercado. Então temos os MicroServices, que é um estilo de arquitetura de software mais ideal para o desenvolvimento de aplicações de software mais escaláveis baseadas na nuvem.

### O que são microservices?

MicroServices são o oposto a arquitetura monolítica tradicional. Aplicações monolíticas são baseadas em uma abordagem cliente-servidor e desenvolvidos como uma unidade singular, o qual apenas uma aplicação do lado do servidor precisa trabalhar nas tarefas de manipulação do banco de dados, requisições HTTP, e todas as tarefas computacionais. O código base das diferentes funcionalidades são altamente interligados, portanto mesmo uma pequena modificação pode tornar uma integração muito complexa e transformar a implantação em um campo minado de riscos. Escalabilidade de aplicações monolíticas também é muitas vezes ineficiente, uma vez que toda a aplicação precisa ser dimensionada não apenas as peças que estão em demanda.
Microservices, conhecidas também como estilo arquitetônico microservices, são um método de desenvolvimento de aplicativos que divide uma aplicação em pequenos serviços distintos bem definidos. MicroServices são distribuídos na rede e comunicam-se através de protocolos independentes da tecnologia. Ele surgiu como uma evolução das arquiteturas baseadas em serviços depois que a filosofia pregadaa pelo DevOps se tornou mais difundida.

### Características de MicroServices

A principal característica do estilo da arquitetura de microservices são definidas pelos princípios de baixo acoplamento e alta coesão dos serviços:
- Aplicações são feitas de pequenos serviços independentes.
- As funcionalidades da aplicação são distribuídas entre os diferentes serviços.
- Os serviços são independentes um do outro, pequenos pedaços de código separados.
- Serviços são pequenas unidades completas de funcionalidades.
- Serviços são independentes, modificáveis e destacáveis.
- Serviços se comunicam através de protocolos não relacionados com tecnologia e muito bem definidos como REST (protocolo HTTP) ou RPC (usando o seu próprio protocolo TCP).
- A lógica relacionada a apenas um serviço deve ser mantida em apenas um lugar.
- A arquitetura baseada em MicroServices e implantação contínua é uma ótima conexão.
- Gerenciamento descentralizado dos dados: cada serviço pode ter seu próprio banco de dados.

### Vantagens dos MicroServices
- Desenvolver um MicroService não necessita uma grande equipe.
- Cada serviço da aplicação pode ser modificada independente.
- Desenvolver, modificar e implantar um serviço não afeta a operação de outro serviço.
- Ele não requer um comprometimento de longo termo para um certo tipo de tecnologia.
- Possibilita flexibilidade no uso de linguagens, frameworks e banco de dados com a mesma aplicação.
- Diminui o risco na implantação, a operação fica mais suave e gera menos reclamações dos clientes.
- A implantação contínua é fácil de implementar.
- As tecnologias mais recentes podem ser adotadas com mais agilidade.
- Isolamento de falhas: uma falha em um microservice não faz com que toda a aplicação falhe.
- Eficientemente escalável: apenas os serviços com demanda precisam são escalados.
- Balanceamento de carga.
- Fácil de usar com containers (como docker)
- Não necessita de grande esforços em design antecipado.
- Possibilita uma evolução do produto flexível.
- Facilita liberação rápida de funcionalidades e iterações contínuas.
- Permite um rápido tempo de lançamento no mercado e desenvolvimento ágil.
- Fácil para integrar com serviços de terceiros e ferramentas.

### Desvantagens de MicroServices
- Chamadas remotas intensivas e caras (ao invés de chamadas em processo).
- Aumento da latência da rede.
- Aumento no tempo de processamento.
- O rastreamento de erros pode se tornar tedioso e trabalhoso.
- Barreiras de informação ou dificuldades em comunicação podem gerar erros.
- Desenvolver casos de uso pode precisar da cooperação de várias equipes.
- Os desenvolvedores podem ter dificuldade para visualizar o quadro geral.
- Mover responsabilidades entre os serviços é dificil e complexo.
- Comunição entre diversos times pode diminuir a produtividade.
- Duplicação de esforços e replicação de funcionalidades.

### Alguns serviços que utilizam a arquitetura baseada em MicroServices

- [Uber](https://eng.uber.com/soa/)
- [Netflix](http://techblog.netflix.com/)
- [Amazon](http://highscalability.com/amazon-architecture)
- [Ebay](http://www.addsimplicity.com/downloads/eBaySDForum2006-11-29.pdf)
- [Sound Cloud](https://developers.soundcloud.com/blog/building-products-at-soundcloud-part-2-breaking-the-monolith)
- [Karma](https://blog.karmawifi.com/how-we-build-microservices-at-karma-71497a89bfb4#.cj0nag556)
- [Groupon](https://engineering.groupon.com/2013/misc/i-tier-dismantling-the-monoliths/)
- [Hailo](https://sudo.hailoapp.com/services/2015/03/09/journey-into-a-microservice-world-part-1/)
- [Gilt](https://qconnewyork.com/ny2015/ny2015/presentation/microservices-and-art-taming-dependency-hell-monster.html)
- [Zalando](https://www.infoq.com/news/2016/02/Monolith-Microservices-Zalando)
