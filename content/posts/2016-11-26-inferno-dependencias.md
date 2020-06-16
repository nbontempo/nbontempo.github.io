---
title: O inferno das dependências
date: 2016-11-26T16:37:45-03:00
template: "post"
draft: false
slug: "inferno-das-dependencias"
category: "Frameworks"
tags:
  - "Frameworks"
description: "Ferramentas, bibliotecas e frameworks que usamos hoje para construir nossas aplicações web são drasticamente diferentes daquelas usadas a poucos anos atrás. Em poucos anos, muitas dessas tecnologias mudarão novamente.

Mesmo assim, muitos de nós utilizamos essas tecnologias como uma parte central, inseparável dos nossos aplicativos."
socialImage: "/media/image-2.jpg"
---

Ferramentas, bibliotecas e frameworks que usamos hoje para construir nossas aplicações web são drasticamente diferentes daquelas usadas a poucos anos atrás. Em poucos anos, muitas dessas tecnologias mudarão novamente.

Mesmo assim, muitos de nós utilizamos essas tecnologias como uma parte central, inseparável dos nossos aplicativos. Nós importamos, usamos e herdamos a framework do mês como se elas todas fossem ficar inalteradas para sempre. Só que elas não vão e esse é o problema.

Depois de algum tempo em desenvolvimento, design e arquitetura de web apps. Eu encontrei duas importantes verdades:

1- Dependências externas representam uma grande ameaça à estabilidade a longo prazo e a viabilidade de qualquer aplicação.

2- É cada vez mais difícil, se não impossível, construir qualquer tipo de aplicação não trivial sem importar dependências externas.

Esse artigo trata de reconciliar essas duas verdades, para que os nossos aplicativos tenham uma chance de sobrevivência em longo prazo.

# O buraco é muito fundo certamente

Se começarmos pensando todas as coisas que nossa aplicação web depende, é fácil pensar em uma duzia de coisas ou mais, antes de chegar ao código:

- Energia elétrica
- Conexão a internet
- Firewall
- DNS
- Hardware do servidor
- Resfriamento
- Plataforma de virtualização
- Plataforma de container
- Sistema operacional
- Plataforma do web server
- Plataforma do app server
- Navegador web

Como desenvolvedor, é bom ficar conectado a esse tipo de coisa, mas não temos muito o que fazer em relação a elas. Assim, vamos ignora-las por agora e conversar apenas sobre o código.

No código, temos três tipos de dependências:

1. Dependências que nós controlamos

   `Código escrito e de propriedade da nossa organização.`

2. Dependências que nós não controlamos

   `Código escrito por um terceiro ou uma comunidade open source.`

3. Dependências removidas

   `Essas são as dependências que as nossas dependências dependem.`

Nós vamos falar principalmente das dependências que não controlamos.

Dependências que controlamos e dependências removidas também podem causar dor de cabeça, mas elas ainda podem ser resolvidos internamente. No caso das dependências que controlamos, temos que ser capazes de intervir e mitigar qualquer problema.

No caso de dependências removidas, nós podemos geralmente confiar em um terceiro para resolver o problema, uma vez que eles são dependentes destes.

## Porque precisamos usar dependências externas?

Uma grande porção das aplicações web existem para resolver pequenos problemas: autenticação, autorização, acesso de dados, tratamento de erros, navegação, logging, encriptação, mostrar lista de dados, validação de formulários de entrada, fluxos de dados e muitos outros....

Independente de quais tecnologias você usa, tem uma grande chance de que problemas comuns tenham uma solução existente e estejam disponíveis como uma biblioteca que você facilmente pode adquirir e plugar no seu código básico. Escrever qualquer coisa do zero é geralmente uma perda de tempo.

Você precisa concentrar no código para resolver problemas incomuns ou resolver um problema comum de uma maneira incomum. Isso é o que torna uma aplicação de valor: o código que implementa as regras de negócio que são únicas ao seu aplicativo, o diferencial da sua aplicação (o seu `tempero secreto`).

A busca do google e seu algoritmo de page rank, o filtro da timeline do facebook, a seção de recomendação do netflix e algoritmos de compressão, todo o código atrás dessas funcionalidades são o `tempero secreto` por trás desses produtos.

Códigos de terceiros em forma de bibliotecas, possibilita que você implemente rapidamente essas funcionalidades comuns no seu aplicativo, para que você sempre se foque no seu `tempero secreto`.

## Porque dependências de terceiros são ruins

Olhe um pouco para uma aplicação Web não trivial construída nos últimos anos e você ficará absolutamente surpreso com a quantidade de código vindo de bibliotecas de terceiros, acesse qualquer website utilizando o plugin [Wappalyzer](https://wappalyzer.com/) e você ficará assustado com o número de bibliotecas utilizadas nas aplicações web. E se uma dessas bibliotecas de terceiros [muda drasticamente](https://daveceddia.com/angular-2-should-you-upgrade/), ou [desaparece](http://blog.parse.com/announcements/moving-on/), ou [quebra](http://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos/)?

Se é um projeto de código aberto, pelo menos você pode concertar por si mesmo. Mas quão bem você vai entender todo o código naquela biblioteca que você não possui? Uma grande razão do porque você usa uma biblioteca em primeiro lugar é conseguir os benefícios do código sem ter que se importar com detalhes. Mas agora você está preso. Você gastou uma fortuna nessa dependência, que você não possui e não controla.

Tenho uma boa historia que pode elucidar um pouco das consequências de uma dependência má escolhida. Uma empresa construiu um aplicativo usando um provedor de backend-as-a-service. Utilizando de uma biblioteca provida pelo serviço para consumir o mesmo. No processo, eles amarraram algumas partes do seu código com a biblioteca, incluindo o seu `tempero secreto`.

Três meses depois do lançamento do produto da empresa, justamente quando ele havia começado a receber alguma tração no negócio com clientes pagantes, o serviço de backend-as-a-service anunciou que iria ser desligado.

Agora ao invés de focar na iteração do produto e crescer a sua base de consumidores, a empresa teve que descobrir se eles migravam para uma plataforma hospedada por eles mesmos, uma versão open source do projeto, ou substituir completamente o serviço.

A interrupção que isso causou para uma aplicação jovem e incipiente foi tão grande que a empresa acabou com o app completamente.

## Balanceando as consequências e os benefícios

Minha antiga solução para conter os riscos e colher os benefícios das bibliotecas é utilizar o [Adapter Pattern](https://en.wikipedia.org/wiki/Adapter_pattern). Seguir os padrões SOLID também é aconselhável.

Essencialmente, você coloca códigos de terceiros em uma classe adapter ou um módulo que você escreveu. Isso então funciona de uma forma que você consiga isolar o código de terceiros de uma maneira que você controle.

Utilizando esse padrão, se uma biblioteca de terceiro ou uma framework muda, ou vai embora, você precisa mudar apenas o código dentro do adapter. O resto do seu aplicativo continua intacto.

Isso soa bem no papel. Quando você possui dependências auto contidas que provem apenas poucas funcionalidades, isso vai resolver o problema. Mas coisas podem ficar feias rapidamente.

Você pode imaginar ter que incluir a biblioteca Angular 2 antes de usar qualquer coisa do mesmo? Que tal incluir jQuery, ou Angular, ou a Framework Spring em java? Rapidamente isso pode se tornar um pesadelo.

Existe uma melhor abordagem para o problema com tantas dependências...

Para cada dependência que você deseja adicionar na base do seu código, é necessário avaliar o nível de risco que será introduzido multiplicando dois fatores:

1. A probabilidade de que a dependência vai mudar de forma material.
2. A quantia de dano que uma mudança material na dependência vai fazer com a sua aplicação.

Uma biblioteca de terceiros tem menor probabilidade de mudar quando algumas dessas prerrogativas seguintes são verdadeiras:

- Ela está entre nós por alguns anos e teve grandes releases.
- É usada por muitas aplicações comerciais.
- Tem um suporte ativo de grandes organizações, preferencialmente um nome familiar de empresa ou instituição.

Possuir apenas popularidade não é uma prerrogativa, veja o [angular](https://github.com/angular/angular) por exemplo, que na mudança para o Angular 2 quebrou completamente a compatibilidade com a sua versão antiga. Além de controlar a probabilidade de mudança, devemos controlar também os danos que podem ser causados, uma biblioteca de terceiro ou framework vai causar menos dano em sua aplicação quando algumas ou todas as prerrogativas seguintes são verdadeiras:

- Ela foi usada apenas em pequenas partes da sua aplicação, em vez de ser usada por toda parte.
- O código que depende da biblioteca, não é o `tempero secreto`.
- Remove-lo requer pequenas mudanças no seu código base.
- Sua aplicação é muito pequena e pode ser reescrita rapidamente (Seja cuidados com essa, ela será verdade apenas por pouco tempo provavelmente)

O quanto mais ariscado algo for, mais provável que você deva isolá-lo ou evitá-lo de qualquer forma.

Quando conversamos sobre o código que é a proporção central da sua aplicação, o `tempero secreto`, você precisa ser extremamente cuidado e protecionista. Fazer um código extremamente independente quanto possível. Se você absolutamente precisa usar uma dependência, considerar injetar ela, ao contrário de referenciar a mesma diretamente. Mesmo assim, seja cuidadoso.

Algumas vezes isso significa 'não' para uma biblioteca de terceiros que você pensa ser realmente muito legal, ou que você queria muito usar por uma razão ou outra. Seja forte. Acredite, vai pagar. Apenas pergunte para quem investiu pesado no primeiro lançamento de angular, ou a empresa que perdeu a aplicação. Não foi divertido. Acredite.

Outra forma de visualizar as dependências de outra maneira é gerar um grafo de dependências para as suas aplicações, é uma boa forma de entender o nível de risco introduzido pelas suas dependências. Existem ferramentas gratuitas para fazer isso em diversas linguagens.
