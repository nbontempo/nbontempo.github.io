---
title: "Introdução de Containers"
date: 2016-11-13T16:39:27-03:00
draft: false
tags: ["containers", "docker", "introdução"]
---
# Conceitos, prós e contras, orquestração, ferramentas (docker e outras alternativas)

A virtualização baseada em containers é uma das tecnologias mais quentes se for pensar no contexto da computação em nuvem. Ela gera combustível para inovação e muda como as aplicações são desenvolvidas e operadas hoje em dia. É difícil nomear grandes empresas de tecnologia que não estejam investindo, nem usando a tecnologia de containers de uma forma ou de outra. As ideias de containers não são novas, as tecnologias para sua criação estão disponíveis desde os anos 2000. Porém, com o surgimento do docker no cenário, foi o que gerou o crescimento dessa técnica de desenvolvimento. Nesse artigo podemos discutir um pouco sobre essa fascinante tecnologia, podendo gerar uma reflexão sobre suas promessas e cada vez mais sobre seu crescimento no cenário de desenvolvimento.

## O que são containers?

Containers (virtualizações em nível do sistema operacional) é uma abordagem para virtualização que provê o mínimo necessario para uma aplicação funcionar como o pretendido. De uma forma, elas podem ser consideradas uma máquina virtual super minimalista que não está rodando em um hypervisor ( controle de virtualização para utilizar diferentes sistema operacionais no mesmo computador ). Usualmente dentro do container temos incluido:

 - Aplicação
 - Dependências
 - Bibliotecas
 - Binários
 - Arquivos de configuração

Utilizar containers possibilita que você rode sua aplicação em diferentes ambientes, através da abstração do sistema operacional e sua estrutura física. Aplicações em container compartilham o kernel do sistema operacional do host com outros containers e as partes compartilhadas pelo sistema operacional tem permissão apenas para leitura. Dentro de um container normalmente temos apenas um serviço ou microservice.

O tamanho de um container é usualmente medido em alguns MBs e requer cerca de 2 segundos para prover um. Quando containers precisam de uma atualização por exemplo, elas precisam apenas de uma modificação no arquivo de configurações e em seguida destruir o antigo container e criar um novo.

## Quais são as principais diferenças entre containers e máquinas virtuais?

Mesmo que as máquinas virtuais e containers compartilhem algumas características, existem diferenças significativas que as diferenciam.

- Máquinas virtuais contêm um sistema operacional completo e aplicações.
- Virtualizações baseadas no Hypervisor são intensivos em gasto de recursos, uma VM pode gastar muitos GB dependendo do sistema operacional utilizado para virtualização.
- Máquinas virtuais usam o Hypervisor para compartilhar e gerenciar o hardware, enquanto containers compartilham o kernel do sistema operacional host para acessar o hardware.
- Máquinas virtuais tem o seu próprio kernel, assim elas não usam ou compartilham o kernel do sistema operacional host, já que eles são isolados de cada um em um nível baixo.
- Máquinas virtuais residindo no mesmo servidor rodam diferentes sistemas operacionais, containers no mesmo servidor usam o mesmo SO.
- Containers estão virtualizando o SO subjacente enquanto as máquinas virtuais estão virtualizando o hardware subjacente.

## Quais são as vantagens de usar containers?

- O tamanho de um container é muito menor que a de uma máquina virtual. Um servidor pode hostear significantemente mais containers que máquinas virtuais.
- Rodar containers gasta menos recursos que rodar máquinas virtuais, assim você pode adicionar mais carga de trabalho computacional no mesmo servidor.
- Prover containers gasta apenas alguns segundos ou menos, assim, o data center pode reagir rapidamente a um pico de atividade do usuário.
- Containers possibilitam a alocação rápida de recursos ao processo e de rodar sua aplicação em vários ambientes.
- O uso de containers pode diminuir o tempo necessário para o desenvolvimento, teste e deploy das suas aplicações e serviços.
- Teste e bug track também se tornam menos complicados desde que não exista diferença entre rodar sua aplicação localmente, ou em um servidor de teste, ou em produção.
- Containers são muito rentáveis. Eles podem diminuir os custos de operação (menos servidores, menos empregados) e o custo de desenvolvimento (desenvolvimento em um ambiente consistente).
- A virtualização por containers são uma grande opção para microservices e deploy continuo.

## Quais são as desvantagens de usar containers ?

- Uma das maiores desvantagens da virtualização baseada em container comparada com as tradicionais máquinas virtuais é a segurança. Containers compartilham o kernel, outros componentes do sistema operacional e eles possuem acesso de root. Isso significa que containers são menos isolados comparados com máquinas virtuais, e se existe alguma vulnerabilidade do kernel pode comprometer a segurança dos containers também. Máquinas virtuais apenas compartilham o Hypervisor o que possui menos funcionalidades e é menos propenso a ataques do que o kernel compartilhado dos containers.
- Menos flexível em questão de sistemas operacionais. Você precisa iniciar um novo servidor para ter a possibilidade de rodar containers com diferentes sistemas operacionais. Enquanto máquinas virtuais com qualquer tipo de sistema operacional podem viver ao lado do outro no mesmo servidor. Isso pode não ser um problema para provedores de host, mas para aplicações complexas de empresas isso pode ser uma limitação séria.
- Outro desafio é a criação de redes. Implantar containers em um caminho isolado enquanto mantem uma conexão adequada pode ser complicado. Existem soluções que estão tentando resolver esse problema, como [Weave Net 1.5](https://www.weave.works/weave-net-container-network-interface-kubernetes/) mas parece que existe muito espaço para melhorias.

## Ferramentas

[Docker](https://www.docker.com/) é de longe a plataforma mais famosa para o uso de containers. Baseada em tecnologias open source anteriores, o docker criou uma forma padrão para o deploy de aplicações linux em containers os quais podem rodar diferentes ambientes como pretendido. Docker tem um grande número de projetos open source servindo como base para a plataforma docker. A empresa foi fundada em 2010 por Solomon Hykes com o levantamento de $180.8 milhões para a criação da empresa. Eles construíram parcerias com gigantes da tecnologia incluindo Microsoft e Google. Sua popularidade é tão grande que de acordo com a [revista Cluster](https://clusterhq.com/assets/pdfs/state-of-container-usage-june-2016.pdf) 94% dos entrevistados usavam Docker.
Embora o docker seja a tecnologia de container mais popular, existem muitas outras soluções como:

- [LXC](https://linuxcontainers.org/lxc/introduction/)

- [LXD](https://linuxcontainers.org/lxd/introduction/)

- [RKT](https://coreos.com/rkt/)

- [Oracle Solaris Containers](http://www.oracle.com/technetwork/server-storage/solaris/containers-169727.html)

- [BSD Jails](https://www.freebsd.org/doc/handbook/jails.html)

## Existem soluções container que não sejam baseadas em linux?

Sim. Existem [duas soluções](https://msdn.microsoft.com/en-us/virtualization/windowscontainers/about/about_overview) criadas pela microsoft Windows server container e Hyper-V container. A principal diferença entre as duas é que a Windows server container compartilha o kernel com o container host e o outro container Hyper-V não.

## Container Orchestration

As plataformas de container orchestration dão a capacidade para os usuários de implantar, gerenciar e escalar multi-containers baseado em aplicações com grandes núcleos sem ter que se preocupar sobre qual servidor hospedará um determinado container. Container orchestration é também um espaço com muita competição. Alguns dos mais populares são:

- [Amazon ECS](https://aws.amazon.com/ecs/)

- [Kubernetes](http://kubernetes.io/)

- [Marathon](https://mesosphere.github.io/marathon/)

- [Hashicorp Nomad](https://www.nomadproject.io/)

- [Docker Swarm](https://docs.docker.com/swarm/)

- [Diego](https://docs.cloudfoundry.org/concepts/diego/diego-architecture.html)

- [Open Stack Magnum](https://wiki.openstack.org/wiki/Magnum)

- [CoreOS Fleet](https://coreos.com/fleet/)

- [Azure Container Service](https://azure.microsoft.com/en-us/blog/azure-container-service-preview/)

## Revisão
Virtualização baseada em container é uma tecnologia disruptiva que está sendo adotada a um ritmo notável por pequenas e médios negócios. Empresas maiores demonstram um bom interesse também, mas estáo se aproximando da adoção no ambiente de produção com muito cuidado. Google search, Google App Engine e Twitter são exemplos de sucesso do uso de containers em grande escala.

Máquinas virtuais ainda são consideradas como uma tecnologia muito mais madura com uma segurança muito maior e muitas equipes estão mais acostumadas a trabalhar com as mesmas. Máquinas virtuais são geralmente mais suscetíveis para aplicações monolíticas e para cenários onde a preocupação com segurança supera a necessidade de uma solução leve.

A virtualização baseada em containers é uma solução muito melhor para o estilo de [arquitetura baseada em microservices](/introducoes-microservices.html), o qual os recursos da aplicação são divididos em pequenos e muito bem definidos serviços distintos. Containers e máquinas virtuais não se excluem, eles podem ser vistos como soluções complementares. Um excelente exemplo para isso é o [Netflix Cloud](https://www.infoq.com/presentations/container-management-netflix?utm_source=medium&utm_medium=flow.ciweekly&utm_campaign=flow.ci%20says%20hi) o qual containers estão rodando dentro de máquinas virtuais.
