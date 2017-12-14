# mea5n-booster
MEAN App using Angular 5x


### Local development

1. Install

```
cd mea5n-booster/backend
npm install
cd mea5n-booster/frontend
npm install
```

2. Open a terminal and run

```
cd mea5n-booster/backend
npm run mongodb
```

> Note: If you already have a mongodb service running you will see error:

```
docker: Error response from daemon: driver failed programming external connectivity on endpoint mongodb (3b63a0d8f9251bb267ea598373d6716befa078bb4e998ee6444c3f11cb61dcc5): Error starting userland proxy: listen tcp 127.0.0.1:27017: bind: address already in use.
```

3. Open another terminal and run

```
cd mea5n-booster/backend
npm run localhost
```

4. Open another terminal and run

```
cd mea5n-booster/frontend
ng serve
```

4. Access [http://localhost:4200/](http://localhost:4200/)

### Container development

#### Docker and minishift with fedora 27

1. Setup docker

```
sudo dnf install https://download.docker.com/linux/fedora/26/x86_64/stable/Packages/docker-ce-17.09.0.ce-1.fc26.x86_64.rpm
sudo usermod -aG docker $(whoami)
sudo systemctl enable docker
reboot
```

2. Setup minishift

```
1. download https://github.com/minishift/minishift/releases

2. extract to .local/bin

3. setup docker-machine-kvm:

curl -L https://github.com/dhiltgen/docker-machine-kvm/releases/download/v0.10.0/docker-machine-driver-kvm-centos7 > .local/bin/docker-machine-driver-kvm 
chmod +x .local/bin/docker-machine-driver-kvm
sudo dnf install libvirt qemu-kvm
sudo usermod -a -G libvirt $(whoami)
newgrp libvirt
reboot
```

#### Nodeshift

1. Install [nodeshift](https://www.npmjs.com/package/nodeshift)

```
cd mea5n-booster/backend
npm install nodeshift -D
```

2. Add a `files` section to package.json to create a tar with the necessary files:

```
"files": [
  "package.json",
  "README.md",
  "model",
  "server.js"
],
```

3. Add `scripts` section to package.json to run nodeshift deploy command:

```
"scripts": {
  "openshift": "nodeshift --osc.strictSSL=false"
}
```

4. Create .nodeshift directory and add the deployment, service and route yml files

```
cd mea5n-booster/backend
mkdir .nodeshift
```

> see the example of the files inside .nodeshift directory

5. Install [kube-probe](https://www.npmjs.com/package/kube-probe) and add to the app

```
npm install kube-probe -S

// Add a health check
require('kube-probe')(app);
```

6. For the time being it is necessary to use the [`oc`](https://github.com/openshift/origin/releases)
command line tool to install the `mongodb` instance.

```sh
$ minishift start
# make coffee while it starts up
$ oc new-app https://raw.githubusercontent.com/openshift/origin/master/examples/db-templates/mongodb-ephemeral-template.json -p DATABASE_SERVICE_NAME=contacts -p MONGODB_USER=default -p MONGODB_PASSWORD=default -p MONGODB_DATABASE=contacts
```

Once your mongodb pod is running, you can deploy the application.

```
$ npm install
$ npm run openshift
```
