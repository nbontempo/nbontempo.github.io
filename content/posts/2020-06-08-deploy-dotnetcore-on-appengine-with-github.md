---
title: Deploy dotnet core application on app engine with github actions
date: 2020-06-08T22:33:49-03:00
template: "post"
draft: false
slug: "deploy-dotnet-core-application-on-app-engine-with-github-actions"
category: "DevOps"
tags:
  - "DevOps"
  - "Google Cloud"
  - "Github Actions"
description: "In this tutorial, I will describe for you how to set up a Github actions workflow and this will enable your project to automatically run your tests, build your app and deploy the new code to google app engine service. At the time of this tutorial the last Dotnet core version supported was 2.1, so I created a docker file to deploy on Dotnet core 3.1."
socialImage: "/media/image-2.jpg"
---

In this tutorial, I will describe for you how to set up a Github actions workflow and this will enable your project to automatically run your tests, build your app and deploy the new code to google app engine service. At the time of this tutorial the last Dotnet core version supported was 2.1, so I created a docker file to deploy on Dotnet core 3.1.

## 1- Setup your project

The first thing you need to do is create your app engine on the google cloud, for that you should go to the [Google Cloud Console](https://console.cloud.google.com/) and create a project. With the project created you will go to the app engine tab and enable the creation of app engine applications on this project.

## 2- Configure the deploy on google cloud

- First let's start configuring the `app.yaml`, on this `app.yaml` you will define which stack that you are developing your application and how many resources you will need on the google app engine, there are several configurations diversified on manual scaling and other rules for automatic scaling, this is our code that you will be using on this project:

```yaml
# Custom because you will be using the docker file to create the runtime
# you will need to do that because Dotnet core 3.1 is currently not supported
runtime: custom
# Flexible environment because is what currently supports custom runtime
env: flex

# Automatic scaling configured
automatic_scaling:
  min_num_instances: 2
  max_num_instances: 10
resources:
  cpu: 1
  memory_gb: 0.5
  disk_size_gb: 10

# If you are using a cloud SQL database
# this will create a tunnel to your cloud SQL
# Then you can use on your application the host as cloud SQL
# to point to your database on the application connection string
beta_settings:
  cloud_sql_instances: "<NAME OF YOUR CLOUD SQL>:<REGION OF YOUR CLOUD SQL>:<PROJECT ID>=tcp:<PORT OF YOUR CLOUD SQL>"
```

- Second, you will create the docker file

```Dockerfile
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["<APPLICATION>.csproj", "<APPLICATION>/"]
RUN dotnet restore "<APPLICATION>.csproj"
COPY . .
WORKDIR "/src/<APPLICATION>"
RUN dotnet build "<APPLICATION>.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "<APPLICATION>.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
# Expose the port 8080 that will be port used by the app engine
EXPOSE 8080
ENV ASPNETCORE_URLS=http://*:8080
ENTRYPOINT ["dotnet", "<APPLICATION>.dll"]
```

- Finally, let's test with the CLI if everything is working fine
  - Install the CLI, following the [docs](https://cloud.google.com/sdk/docs/quickstarts)
  - Now that you configured the CLI, let's start typing `gcloud app deploy app.yaml`
  - If everything worked fine, you should type `gcloud app browse` and that will show to you the URI that the app engine exposed your application, you can test your application to see if everything is working fine

## 3- Create the "Service account" on App Engine

Now that you configured your project to enable the app engine, let's create the service account that you will be using to deploy your code on the google app engine. Go back to the [Google Cloud Console](https://console.cloud.google.com/), open "IAM" > "Service Accounts" > "Create Service Account" follow the steps and create a JSON key.

**Roles that you need to have on the service account**:

- App engine deployer
- App Engine Service Admin
- Cloud Build Editor
- Storage Object Creator
- Storage Object Viewer

With the JSON key created, open your terminal and press `base64 <KEY SERVICE ACCOUNT JSON>`, now you will save this key to the Github secrets, go to your project on Github and follow this steps "Settings" > "Secrets" create two secrets:

- "GCLOUD_AUTH" with the base64 key that you created
- "PROJECT_ID" with the google project id

## 4- Configure the deploy on Github actions

Now that you had configured your app engine and the secrets on Github, let's create the continuous deploy for your application, create a folder on the root of your project called `.github`, this folder is responsible for configuring everything related to Github. Inside the `.github` folder, create a `workflows` folder that will be responsible for all your automations on Github actions.

So let's create your first workflow, create a `build.yml` on the workflows folder and your file will look like that:

```yaml
name: <NAME OF YOUR WORKFLOW>

# on all pushes to master this workflow will run
on:
  push:
    branches: [master]

jobs:
  build:
    # you can change SO that the workflow will run
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup .NET Core
        uses: actions/setup-dotnet@v1
        with:
          dotnet-version: 3.1.101
      - name: dotnet Restore
        run: dotnet restore
      - name: dotnet Build
        run: dotnet build --configuration Release --no-restore
      # on the tests you can use a package called GitHubActionTestLogger
      # that will highlight all the tests that are failing
      # the setup is documented on the repo of the package
      - name: dotnet Test
        run: dotnet test --logger GitHubActions
      # you can replace secrets of the app settings on this step
      # (database connection, logging and etc)
      - uses: microsoft/variable-substitution@v1
        with:
          files: "<PATH>/appsettings.json"
        env:
          Secret1: ${{ secrets.GitHubSecret }}
      - uses: GoogleCloudPlatform/github-actions/setup-gcloud@master
        with:
          version: "290.0.1"
          project_id: ${{ secrets.PROJECT_ID }}
          service_account_key: ${{ secrets.GCLOUD_AUTH }}
          export_default_credentials: true
      - name: Run deployment
        if: success()
        run: gcloud app deploy ./app.yaml --quiet
```

Now everything should work properly. Please give feedback below, if anything was not clear enough I can always edit and add more information to the article.

## Needs more info?

- [GitHubActionsTestLogger](https://github.com/Tyrrrz/GitHubActionsTestLogger)
- [Google App Engine Custom Runtimes for the Flexible Environment documentation](https://cloud.google.com/appengine/docs/flexible/custom-runtimes)
- [Github actions docs](https://help.github.com/en/actions)
