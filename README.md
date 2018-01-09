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

#### Specific parts of configuration for nodeshift and openshift

##### back-end

```
npm install -S kube-probe 
npm install -D nodeshift
```

Add the files on package.json/files section:

example:
```
"files": [
  "package.json",
  "foo.js",
  "bar.js"
],
```

require kube-probe:

```
require('kube-probe')(app);
```

Create `.nodeshift` directory and `.yaml` files:

```
mkdir .nodeshift
touch svc.yaml route.yaml deployment.yaml
```
> See the example of yaml files inside .nodeshift directory of this project

Add to package.json/scripts:

```
"openshift": "nodeshift --strictSSL=false --nodeVersion=8.x"
```

##### front-end

```
npm install -D nodeshift
```

Add the files on package.json/files section:

> In case Angular 5x projects we need to add the 'dist' directory

```
"files": [
  "dist",
  "package.json"
],
```

Add to package.json/scripts:

```
"openshift": "nodeshift --strictSSL=false --nodeVersion=8.x"
```

Create `.nodeshift` directory and `.yaml` files:

```
mkdir .nodeshift
touch svc.yaml route.yaml deployment.yaml
```
> See the example of yaml files inside .nodeshift directory of this project.


##### front-end - openshift

We need a http-server to serve `dist` directory

```
npm install http-server -D
```

Add to package.json/scripts:

```
"start-localhost": "ng serve",
"start": "node node_modules/http-server/bin/http-server dist/"
```

Add a URL variable on `src/environments/environment.prod.ts`

```
apiUrl: 'http://yourbackend-yourproject.192.168.42.194.nip.io'
```

And the localhost URL variable on `src/environments/environment.ts`

```
apiUrl: 'http://localhost:8080'
```

Replace the API hard-corded URL inside Angular 5x code:

```ts
import { environment } from '../../environments/environment';

// FROM
getContacts() {
  return this.http.get(`http://localhost:8080/contacts`).map(res => res.json());
}

// TO
getContacts() {
  return this.http.get(`${environment.apiUrl}/contacts`).map(res => res.json());
}
```

Build (to generate the dist directory) and deploy with nodeshift:

```
ng build --env=prod
npm run openshift
```
