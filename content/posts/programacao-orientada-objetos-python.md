---
title: "Programacao Orientada Objetos com Python"
date: 2015-06-14T16:33:06-03:00
draft: true
tags: ["python", "programação orientada a objetos"]
---


Nesse guia você irá aprender os tipos fundamentais de python, funções e métodos, como definir uma classe, classes aninhadas, herança e exceções. Tudo o que é necessário para um bom inicio com python.

### 1. Tipos Fundamentais

Tudo em python funciona como se fosse um objeto, por exemplo, quando temos um inteiro em python ele é um objeto, mas esse objeto tem o tipo int. Então em uma definição de um objeto temos os seguintes atributos:
- Identificador
- Valor
- Tipo, todo objeto tem um tipo. O tipo ajuda a determinar que tipo de operações são possíveis com o objeto.
- Um ou mais bases. Uma base é similar a uma super classe.

Exemplo:

``x = 2 >>> type(x) <type ‘int’>``

Primeiramente temos uma variável inteira criada. Dentro dessa variável temos outro objeto int o qual vamos explorar mais profundamente. Quando chamamos type, ele apenas retorna o atributo de \__class__.

``type(type(x)) <type ‘type’>``

E como podemos ver, o objeto int é um objeto type.

``type(x).__bases__ (<type ‘object’>,)``

Além disso, o atributo \__bases__ contém um objeto chamado object.

``
 dir(x) [‘__abs__’, ‘__add__’, ‘__and__’, ‘__class__’, ‘__cmp__’, ‘__coerce__’, ‘__delattr__’, ‘__div__’, ‘__divmod__’, ‘__doc__’, ‘__float__’, ‘__floordiv__’, ‘__format__’, ‘__getattribute__’, ‘__getnewargs__’, ‘__hash__’, ‘__hex__’, ‘__index__’, ‘__init__’, ‘__int__’, ‘__invert__’, ‘__long__’, ‘__lshift__’, ‘__mod__’, ‘__mul__’, ‘__neg__’, ‘__new__’, ‘__nonzero__’, ‘__oct__’, ‘__or__’, ‘__pos__’, ‘__pow__’, ‘__radd__’, ‘__rand__’, ‘__rdiv__’, ‘__rdivmod__’, ‘__reduce__’, ‘__reduce_ex__’, ‘__repr__’, ‘__rfloordiv__’, ‘__rlshift__’, ‘__rmod__’, ‘__rmul__’, ‘__ror__’, ‘__rpow__’, ‘__rrshift__’, ‘__rshift__’, ‘__rsub__’, ‘__rtruediv__’, ‘__rxor__’, ‘__setattr__’, ‘__sizeof__’, ‘__str__’, ‘__sub__’, ‘__subclasshook__’, ‘__truediv__’, ‘__trunc__’, ‘__xor__’, ‘bit_length’, ‘conjugate’, ‘denominator’, ‘imag’, ‘numerator’, ‘real’]
 ``

Depois de tudo, podemos ver que temos vários atributos relacionados com esse objetos quando chamando a função dir. Então, igual vimos TUDO é um objeto. Podemos utilizar isso como uma regra geral de python, TUDO é um objeto. Sim, tudo. Até métodos e funções.

### 2. Funções e métodos

Sempre quando criamos funções, o python cria um objeto em cima da função. Quando colocamos funções dentro de uma classe elas ficam conhecidas como métodos. Como python tudo é um objeto, ele aceita apenas passagem-por-referência, isso significa que quando uma variável entra dentro de uma função ela é verdadeiramente modificada e não apenas sua cópia. Exemplo:

```python
  def um():
  x = 2
  print (x)
  dobra(x)
  print (x)
def dobra(y):
  y = y * y
```

Com saída proveniente do programa um(), 2 e 4. Assim, o programa dobra() modificou verdadeiramente a variável.

### 3. Definindo uma classe

Uma classe é o que define todo o conceito de orientação a objetos, sua instâncias, métodos e outros. Em python uma classe de um certo objeto é o mesmo que seu tipo, já que TUDO é um objeto. Agora vamos mostrar como ela é utilizada em python. Vamos definir uma classe então:

```python
class Retangulo(object):
  def __init__(self, largura, comprimento):
    self._largura = largura
    self._comprimento = comprimento
Agora, vamos definir algumas instâncias com tipo Retângulo:
c = Retangulo(1,0)
d = Retangulo(2,0)
e = Retangulo(3,0)
print (c._largura)
print (d._largura)
print (e._largura)
```

O que retorna como saída, 1, 2, 3. Ambas c e d se referem a duas instâncias diferentes da classe Retangulo. O atributo de instância object é acessado utilizando o operador . (ponto).

Agora, o que seria esse método \__init__ utilizado para definir a classe?

Esse é o construtor em python.
Agora vamos definir como é feito o encapsulamento em python:

```python
class Retangulo(object):
  def getLargura(self):
    return self._largura
  def setLargura(self, valor):
    self._largura = valor
  largura = property( fget = getLargura, fset = setLargura)
```

Esses métodos criados são utilizados para prover acesso aos atributos. Exemplo:
c.setLargural(2)

print (c.getLargura())
O que modifica a largura da instância c para 2.
Agora o property é um atributo de classe para promover o get e o set. O argumento fget é uma propriedade específica do “getter” e o argumento fset é uma propriedade específica do “setter”. Seu uso é simples, como pode ser visto abaixo:

```python
c.setLargural(2)
print c.getLargura()
//o que seria equivalente utilizando property a:
c.largura = 2
print (c.largura)
```

Além disso, podemos também utilizar em python sobrecarga dos operadores, que determinaria outra ação para uma soma entre os objetos ou qualquer outra operação. Por exemplo:

```python
def __add__(self, c):
  return Retangulo(self.largura + c.largura, self.comprimento + c.comprimento)
```

Assim quando utilizamos uma soma ele vai executar as ações definidas acima. Além desses podemos fazer para subtração __sub__ e para multiplicação __mul__.
Temos também em python métodos estatísticos. Eles são definidos da seguinte forma:

```python
@staticmethod
  def main(*argv):
    print ("oi")
```

### 4. Classes Aninhadas

Em python podemos definir uma classe dentro de outra. Dessa forma elas são conhecidas como aninhadas. Conforme o exemplo:

```python
class Ponto(object):
  def __init__(self):
    self.y = 0
    self.x = 0
  class OutroPonto(object):
    def __init__(self):
      self.x = 0  
      selt.y = 1
    def f(self):
      self.x = self.y
```
Python trata uma classe aninhada da mesma forma que uma classe não aninhada. Como pode ser visto:

```python
obj = Ponto.OutroPonto()
obj.f()
```
### 5. Herança

Primeiramente, o que seria o conceito de herança dentro do desenvolvimento orientado a objetos?

Herança é o conceito no qual, você cria uma nova classe a partir de uma classe já existente. Herdando seus atributos e métodos.
Isso ajuda você a escrever menos códigos repetitivos, por exemplo, quando temos bases, já vieram diversos atributos considerados úteis para uso em cada tipo de variável. Essa foi uma herança de object. Agora vamos ver como utilizá-la em python:

```python
class Pessoa(object):
  FEMALE = 0
  MALE = 1
  def __init__(self, nome, sexo):
    super(Pessoa, self).__init__()
    self._nome = nome
    self._sexo = sexo
  def __str__(self):
    return str(self._nome)
class Pais(Pessoa):
  def __init__(self, nome, sexo, crianca):
    super(Pais, self).__init__(nome, sexo)
    self._crianca = crianca
  def getCrianca(self, i):
    return self._crianca[i]
  def __str__(self):
    pass
```

Assim, um pai vai possuir todos os atributos de pessoa. O que evita que esses atributos sejam escritos novamente na classe Pais. Diferente de outras linguagens, também possuímos uma herança múltipla em python. Conforme visto a seguir:

```python
class Nada1(object):
  def g():
    pass
class Nada2(object):
  pass
  def g():
    pass
class Nada3(Nada1, Nada2):
  pass
```

### 6. Exceções
Em python temos um objeto Exception que pode ser definido uma ação quando ocorre uma exceção. Por exemplo:

```python
class Excecao(Exception):
  pass
def t():
  raise A
def s():
  try:
    t()
  except A:
    pass
```

Um método levanta uma exceção usando o identificador raise: Um identificador raise é similar a um identificador return. Uma identificador return representa a terminação normal de um método e o objeto retornado combina o valor do retorno do método. Um identificador raise representa a terminação anormal de um método e o objeto levantado representa o tipo de erro encontrado. O método f levanta uma exceção de A.

Os alimentadores da exceção são definidos usando um bloco try: O corpo do bloco try está executado qualquer um até que uma exceção esteja levantada ou até que termine normalmente. Um ou mais alimentadores de exceção seguem em um bloco try. Cada alimentador de exceção consiste na cláusula que especifica as exceções a serem travadas, e um bloco do código, que é executado quando a exceção ocorre. Quando o corpo do bloco try levanta uma exceção para que uma exceção está definida, o controle é transferido ao corpo do alimentador da exceção.

### 7. Recomendações

[Python Types and Objects](http://www.cafepy.com/article/python_types_and_objects/python_types_and_objects.html) de Shalabh Chaturvedi

[Python Attributes and Methods](http://www.cafepy.com/article/python_attributes_and_methods/) de Shalabh Chaturvedi

[Python 2.x official documentation](https://docs.python.org/2/tutorial/classes.html) about classes

[Python 3.x official documentation](https://docs.python.org/3/tutorial/classes.html)

[PEP 252 — Making Types Look More Like Classes](http://legacy.python.org/dev/peps/pep-0252/) and many other PEPs like PEP [3115 — Metaclasses in Python 3000](http://legacy.python.org/dev/peps/pep-3115/) and / [PEP 3119 — Introducing Abstract Base Classes](http://legacy.python.org/dev/peps/pep-3119) by Guido van Rossum and others

[Python’s super() considered super!](http://rhettinger.wordpress.com/2011/05/26/super-considered-super/) and [PEP 3135 — New Super](http://legacy.python.org/dev/peps/pep-3135/) by Raymond Hettinger

[A Guide to Python’s Magic Methods](http://www.rafekettler.com/magicmethods.html) by Rafe Kettler

[Improve Your Python: Python Classes and Object Oriented Programming](http://jeffknupp.com/blog/2014/06/18/improve-your-python-python-classes-and-object-oriented-programming/) by Jeff Knupp

[Drastically Improve Your Python: Understanding Python’s Execution Model](http://www.jeffknupp.com/blog/2013/02/14/drastically-improve-your-python-understanding-pythons-execution-model/) by Jeff Knupp

[Decorators and Functional Python](http://www.brianholdefehr.com/decorators-and-functional-python) by Brian Holdefehr (despite the title, it has to do with classes too)

[Origin of metaclasses in Python](http://python-history.blogspot.it/2013/10/origin-of-metaclasses-in-python.html) by Guido van Rossum

[The Inside Story on New-Style Classes](http://python-history.blogspot.it/2010/06/inside-story-on-new-style-classes.html) by Guido van Rossum

[OOP Concepts in Python 2.x](http://lgiordani.com/blog/2014/03/05/oop-concepts-in-python-2-dot-x-part-1/) by Leonardo Giordani (series of 3 articles, superseded by the following one)

[Python 3 OOP](http://lgiordani.com/blog/2014/08/20/python-3-oop-part-1-objects-and-types/) by Leonardo Giordani (series of 6 articles)

[Python 3 OOP Notebooks](http://lgiordani.com/blog/2015/03/14/python-3-oop-notebooks/) by Leonardo Giordani (IPython Notebooks version of the previous series of posts)

[Understanding Python metaclasses](http://blog.ionelmc.ro/2015/02/09/understanding-python-metaclasses/) by Ionel C. Mărieș

### 8. Recomendações de livros para data science em python

[Página do Github com diversos livros para data science em python](https://github.com/donnemartin/data-science-ipython-notebooks), spoiler, estão em inglês. :p
