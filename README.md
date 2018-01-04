# mea5n-booster

This application demonstrates how to deploy to Minishift a project consisting of a back end (API) with express and MongoDB and a front end with 5x Angular, using [[nodeshift](https://github.com/bucharest-gold/nodeshift).

## Running the Booster

You can run this booster as node processes on your localhost, as pods on a local
[minishift](https://github.com/minishift/minishift/releases) installation, or
as part of a project in OpenShift Online V3.

### Localhost

To run the basic application on your local machine, just run the commands:

```
$ cd mea5n-booster/frontend
$ npm install
$ cd mea5n-booster/backend
$ npm install
$ npm run mongodb
```

Open another terminal and run:

```
$ cd mea5n-booster/backend
$ npm run localhost
```

Open another terminal and run:

```
$ cd mea5n-booster/frontend
$ ng serve
```

Access [http://localhost:4200/](http://localhost:4200/)

### Minishift

Minishift should be started, and you should be logged in with a currently active project.

#### MongoDB

For the time being it is necessary to use the [`oc`](https://github.com/openshift/origin/releases)
command line tool to install the `mongodb` instance.

```sh
$ minishift start
$ oc new-app https://raw.githubusercontent.com/openshift/origin/master/examples/db-templates/mongodb-ephemeral-template.json -p DATABASE_SERVICE_NAME=contacts -p MONGODB_USER=default -p MONGODB_PASSWORD=default -p MONGODB_DATABASE=contacts
```

Once your mongodb pod is running, you can deploy the back-end part:

```
$ cd mea5n-booster/backend
$ npm run openshift
```

For the front-end part, you need to set the back-end API URL inside `src/environments/environment.prod.ts` file

example:
```js
export const environment = {
  production: true,
  apiUrl: 'http://mean-booster-backend-myproject.192.168.42.194.nip.io',
};
```

Then build and deploy:

```
$ cd mea5n-booster/frontend
$ ng build --env=prod
$ npm run openshift
```
