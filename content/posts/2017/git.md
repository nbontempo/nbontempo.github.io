---
title: "Worflow com o Git - Sugestões de uso"
date: 2017-07-20T16:38:04-03:00
draft: false
tags: ["git"]
---

Existem diversos padrões e estruturações quando se trata de versionamento de código com git. Um worflow que tem sido muito utilizado pela comunidade é o *Feature Branch Workflow*, que basicamente diz que cada nova funcionalidade do sistema (ou correção de bugs) deve ter uma nova *branch*, ao invés de ser trabalhada na *branch master*, o que encoraja vários desenvolvedores trabalharem na nova funcionalidade e diminui as chances de ocorrer código quebrado na *branch* principal. Esse worflow melhora a comunicação entre a equipe graças a *code reviews* pelos *pull requests*, tornando o ambiente de trabalho mais interativo e comunicativo, para se aprofundar nesse assunto recomendo o artigo da Atlassian [Feature branch workflow](https://www.atlassian.com/git/tutorials/comparing-workflows#feature-branch-workflow) (Spoiler, conteúdo em Inglês).

Outro conceito bem interessante é utilizar o *rebasing* quando for oportuno, já que ele melhora a visão como um todo das mudanças realizadas na *master* enquanto você estava criando sua nova funcionalidade. O *rebase* funciona da seguinte forma, diferente do merge que ele realiza um *commit* para introduzir as mudanças de uma branch em outra, o *rebase* traz os *commits* para o histórico da branch que está recebendo, mas ele deve ser utilizado com cuidado como dito no artigo também da Atlassian [Golden Rule of Rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing#the-golden-rule-of-rebasing) (Spoiler, conteúdo em Inglês).

Assim, esses dois conceitos juntos com o [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows#gitflow-workflow) (Spoiler, conteúdo em Inglês), que melhora a organização da *master* para realizar lançamento de atualizações, nomeando *branch* de desenvolvimento e utilizando *tags* para numeração de versões da *master*.

Os principais passos para elucidar esses conceitos em formato prático, são os seguintes:

* Criar uma *branch* com uma nova funcionalidade ou correção de bugs

    ```
    git checkout -b <nomeDaBranch>
    ```

* Fazer mudanças

    ```
    git add
    git commit -m "descrição das mudanças"
    ```

* Sincronizar com as mudanças do servidor, caso você as tenha perdido

    ```
    git checkout develop
    git pull
    ```

* Atualizar a sua *branch* com as últimas mudanças da *branch* de desenvolvimento utilizando *interactive rebase*

    ```
    git checkout <nomeDaBranch>
    git rebase -i develop
    ```

* Caso você possua conflitos, resolva eles ([Aqui como](https://help.github.com/articles/resolving-a-merge-conflict-using-the-command-line/) (Spoiler, conteúdo em Inglês)) e continue o seu *rebase*

    ```
	git add <arquivo1> <arquivo2> ...
    git rebase --continue
    ```

* Atualize a sua *branch*. Como o *rebase* modifica o histórico, você precisa utilizar o `-f` para forçar mudanças dentro da *branch* remota, caso você esteja trabalhando com mais pessoas nessa *branch*, use mudanças menos destrutivas através `--force-with-lease` ([Explicação](https://developer.atlassian.com/blog/2015/04/force-with-lease/) (Spoiler, conteúdo em Inglês)).

    ```
    git push -f
    ```

* Faça um *Pull request*

* Através do *Pull request* a equipe pode dar opiniões sobre a qualidade do código, utilizando *code reviews*, se bem implementado na equipe pode vir a ser muito util e motivador

* O *Pull request* vai ser aceito, realizado o *merge* e fechado pelo revisor

* Remover a sua *branch* local quando estiver finalizada


## Regras
Existem cuidados com o git que devem ser mantidos em mente, para obedecer os conceitos do worflow e gerar menores problemas no uso do git:

* Realizar trabalho apenas na *branch* de novas funcionalidades.
* Criar *Pull requests* apenas para a *branch `develop`*
* Nunca realizar *push* diretamente para as *branch `develop`* ou *`master`*.
* Atualizar sua *branch `develop`* e fazer *rebase* antes de realizar o *push* da sua nova funcionalidade e criar um *pull request*
* Resolver potenciais conflitos enquanto realiza o *rebase* e antes de criar um *pull request*
* Deletar a *branch* local e remover a *branch* de novas funcionalidade antes de fazer o merge.
* Antes de fazer um *Pull request*, tenha certeza que a sua *branch* de nova funcionalidade compila normalmente e passa em todos os testes (incluso teste de estilo de código).
* Utilizar um gitignore apropriado para cada projeto, [crio meus gitignore através desse link](https://www.gitignore.io/).
* Proteja a sua *branch develop* e a sua *master* por permissões (No [Github](https://help.github.com/articles/about-protected-branches/) e [Bitbucket](https://confluence.atlassian.com/bitbucketserver/using-branch-permissions-776639807.html)).
* Escreva mensagens claras no *Commit*, tente alinhar as suas mensagens com o time, sempre observando se as suas mensagens estão claras iguais ao resto do time, talvez até sugerindo um padrão para melhorar a organização dos *commits*.
