# mea5n-booster
MEAN App using Angular 5x


# Local development

1. Open a terminal and run

```
docker rm mongodb ; docker run -p 127.0.0.1:27017:27017 --name mongodb -e MONGODB_USER=default -e MONGODB_PASSWORD=default -e MONGODB_DATABASE=contacts -e MONGODB_ADMIN_PASSWORD=admin centos/mongodb-32-centos7
```

2. Open another terminal and run

```
cd mea5n-booster/backend
npm run localhost
```

3. Open another terminal and run

```
cd mea5n-booster/frontend
ng serve
```

