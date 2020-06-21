---
title: Getting started with Ansible
date: 2020-05-24T22:33:49-03:00
template: "post"
draft: false
slug: "gettins-started-with-ansible"
category: "DevOps"
tags:
  - "DevOps"
  - "Ansible"
description: "Ansible is a open source tool backed by red hat since 2015, that gives you the skill to control and configure multiple server from one single location. So, instead of having to go to each server and configure them, you can create automations with Ansible to do that for you. The benefits of Ansible are that..."
socialImage: "/media/image-2.jpg"
---

Ansible is a open source tool backed by red hat since 2015, that gives you the skill to control and configure multiple server from one single location. So, instead of having to go to each server and configure them, you can create automations with Ansible to do that for you. The benefits of Ansible are that:

- Uses YAML with human readable language, that results in scripts that are simple to understand and to learn.
- It's a powerful tool that can be used to configure systems, deploy software, and orchestrate more advanced IT tasks such as continuous deployment, zero downtime rolling updates and even cloud provisioning.
- You won't need to install an agent, because ansible is agentless, it will run with SSH or WinRM.

### Important concepts you need to know

- Ansible Playbooks - Basically, Ansible Playbooks are an unit of scripts that defines a desired state.
- Inventory - Inventories are a list of managed nodes (network devices/servers) that you will target when running your scripts.
- Modules - Modules are unit of codes that will be executed on your YAML scripts.

## Let's start

First you will install Ansible on your machine (called control node on Ansible documentation), then you will create an inventory, connect with them, copy the modules to the remote machines and execute.

To install Ansible refer to the [documentation](<[https://docs.ansible.com/ansible/latest/installation_guide/index.html](https://docs.ansible.com/ansible/latest/installation_guide/index.html)>).

### Creating an Ansible inventory

By default the Ansible inventory is organized on `/etc/ansible/hosts`, you can create your inventory in a INI file or YAML file. I will be creating a INI file to organize my inventory and subcategories inside it that are Ansible groups, in a way to organize our inventory:

```yaml
[service1]
webserver-z
[service2]
webserver-x
webserver-y
[linux_servers:children]
service1
service2
```

So, in this example I created 3 managed nodes that are separated in 2 Ansible groups, and there are the default groups that are "all" nodes and "ungrouped" nodes. And besides that I created a nested group `linux_servers:children`, that is pointing to the servers of other groups.

Another thing that can be configured on the inventory are variables that normally are the variables used to connect with your nodes. For example:

```yaml
[service1]
webserver-z
webserver-w
webserver-x ansible_password=<override_var_password>
[service1:vars]
ansible_username=<user>
ansible_password=<password>
```

A good practice is when creating variables to use colon to reference the group of nodes that are being referenced by the variables, and I included on this example one variable password on the node "webserver-x" that is using a different password, so you can override the defined variable for this specific node. You can define variables for nested groups as well.

Basically in the end, using what we learned, the file will look like this:

```yaml
[service1]
webserver-x
webserver-y
[service2]
webserver-p
webserver-g
webserver-f
[linux_servers:children]
service1
service2
[linux_servers:vars]
ansible_user=<user>
ansible_password=<password>
```

So, to test if everything is working we can run a ping on our inventory, `ansible linux_servers -m ping`, this will run a module called ping on our nested group `linux_servers` using shared variables of the nested group.

## Writing Ansible playbooks

First you will need to understand what is a module, a module can be defined as a code that will execute some logic, if you have familiarity with programming, module can be interpreted as a function, and as well they can be used with arguments. Modules can be called on the command like we did above with the `ping` module and can be defined inside the playbooks.

One important aspect of Ansible modules are that they are idempotent, so if you run the same module again and again you will always have the same final result (the desired one), and if it sees that the desired state is already achieved it will not try to execute again or give an error.

So, what's an ansible playbook, a playbook can be defined as a unit of tasks (modules) to create a desired state. Playbooks are written on YAML, and can contain variables, list of hosts, groups and tasks. One example of a playbook can be:

```yaml
- hosts: linux_servers
  vars:
    message: "Hello World!"
  tasks:
    - name: Print First Message
      debug:
        msg: { { message } }
```

So, as defined above, this playbook will target the nodes of our ansible inventory in the group `linux_servers`, after that it will define the variable `message` and finally will run the debug module printing our variable. So the characteristics of a playbook is that they will always run in order to top to the bottom, the main responsibility of a task is to execute a module given arguments and variables passed in and can be defined a `name` to create a more readable script.

So let's create a real Ansible Playbook to install apache on our Linux servers:

```yaml
- hosts: linux_servers
  become: yes
  tasks:
    - name: "Ensute that Apache2 is installed"
      apt:
        name: apache2
        state: latest
```

In this playbook the only feature that I used and we didn't learned is `become` that will escalate the privileges (become a super user) on our playbook

### Create runbooks for your team

After you know a little more about the Ansible, you can start creating playbooks to share with your team, and you can use some other tools like [RunDeck](<[https://www.rundeck.com/](https://www.rundeck.com/)>) and [Ansible Tower](<[https://www.ansible.com/products/tower](https://www.ansible.com/products/tower)>).

Another thing that can be created is a project for your team, to create a better organization for your playbooks, you should first read more about [Ansible Roles](<[https://docs.ansible.com/ansible/latest/user_guide/playbooks_reuse_roles.html](https://docs.ansible.com/ansible/latest/user_guide/playbooks_reuse_roles.html)>) that is a way of grouping content to allow easy sharing with others.

### Alternatives tools

- Puppet
- Chef
- Salt

### For more information

- [Oficial documentation](<[https://docs.ansible.com/ansible/latest/user_guide/quickstart.html](https://docs.ansible.com/ansible/latest/user_guide/quickstart.html)>)
