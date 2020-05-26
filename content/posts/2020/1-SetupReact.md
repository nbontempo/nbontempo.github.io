---
title: "Setup VSCode, ESLint and Prettier for react - 2020"
date: 2020-05-01T19:33:49-03:00
draft: false
tags: ["React", "Javascript", "npm", "spa"]
---

I'm on vacation passing most of my time on home so I started some small projects using react and this is the basic to bootstrap and write code with more productivity and with standards. As things changes quickly on frontend I dated my article, so this is a 2020 edition of this setup.

The intention of this setup is provide early feedback and automation for linting and formatting.

## Let's start creating the react project

`npx create-react-app little-project`

This command will create a standard react project inside the folder `little-project`

## ESLint configuration

[ESLint](https://eslint.org/) is currently the most popular linting tool, works well with ES6 and jsx files as well. The linting can be [configured in separated files with javascript, JSON or YAML and can be configured inside your `package.json` file](https://eslint.org/docs/user-guide/configuring). I prefer the configuration with separated file for the configuration of the eslint. Let's go to the `package.json` file and remove the `eslintConfig` object.

```json
"eslintConfig": {
  "extends": "react-app"
}
```

And let's add our depencies on the `DevDependecies` object on `package.json`:

```json
"devDependencies": {
    "babel-eslint": "10.0.3",
    "eslint": "^6.8.0",
    "eslint-config-babel": "^9.0.0",
    "eslint-config-prettier": "^6.10.0",
    "eslint-plugin-import": "^2.20.2",
    "eslint-plugin-prettier": "^3.1.2",
    "eslint-plugin-react": "^7.19.0",
    "eslint-plugin-simple-import-sort": "^5.0.3",
    "eslint-plugin-standard": "^4.0.1",
    "prettier": "^1.19.1"
}
```

And now let's create our eslint configuration, create on root project folder one file called `.eslintrc.json` with the following content:

```json
{
  "extends": [
    "prettier",
    "prettier/standard",
    "prettier/react",
    "plugin:react/recommended"
  ],
  "plugins": ["prettier", "simple-import-sort"],
  "rules": {
    "simple-import-sort/sort": "error",
    "prettier/prettier": "error"
  },
  "parser": "babel-eslint",
  "env": {
    "browser": true
  },
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  }
}
```

## VSCode configuration

There are some VSCode extensions that are my favorite companions when developing javascript code and that will work flawlessly with our current project configuration. First, let's add the [Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and the [ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

One thing that I learned recently that is a nice feature on VSCode is that you can [sugest extensions to be installed on your project](https://code.visualstudio.com/docs/editor/extension-gallery#_workspace-recommended-extensions). So let's create one folder on the root folder called `.vscode` inside this folder let's create one json file called `.extensions.json` with:

```json
{
  "recommendations": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"]
}
```

Another thing that I like to configure, but not everyone likes, is to setup VSCode to trigger the prettier formatting when I save a file. So let's configure this automatic formatting, open the command palette on VSCode with `Ctrl+shift+P` and let's select "open workspace settings" that will open the project configurations on VSCode. Choose the json editor and insert the following code inside it:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.formatOnSave": false
  },
  "[javascriptreact]": {
    "editor.formatOnSave": false
  }
}
```

## Conclusion

My intent with this article was not to extend on the foundation of the tools used here, but go straight to the point of how to properly configure react applications with eslint and prettier. With this configuration you will be more productive for sure!
