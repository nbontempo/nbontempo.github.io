---
title: "Strategies to pipeline control"
date: 2018-09-14T16:33:49-03:00
draft: false
tags: ["dataflow", "pipeline"]
---

# The Circuit Breaker

I have a consumer that connect to a web service that consume, when the web service is not reachable, this is no problem because the consumer will continue to receive the commands and will retry for each 20 seconds the connection. Because of it, the consumer always will take 20 seconds for failure, which can create more awaits and the whole system could suffer. 

Then the circuit breaker come along, when a configured percentage of errors are thrown the circuit breaker is open, once it's open he will just generate the same exception that tripped the circuit breaker in the first place and it will do so for a configured period of time. Then the failure happen immediatly and not after 20 seconds. 

# The Rate Limiter

The rate limiter limits the number of messages the consumer will process during a period of time. For example, the consumer is connected to a web service, this web service only can process 10 messages for each second, in that way my consumer can't receive more than 10 messages for each second, if he receives 100 messages in one second the web service will not be able to handle that amount of messages.

There is several ways to solve this problem, one can be reduce the speed of connections which are requesting too quickly, this is used by rabbit mq that is called "Flow Control" in this tool.

# The Latest Filter

The latest filter is used to capture tha latest value of a certain context and make that avaible for future reference. 