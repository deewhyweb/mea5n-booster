# mea5n-booster
MEAN App using Angular 5x


### Local development

1. Open a terminal and run

```
cd mea5n-booster/backend
npm run mongodb
```

> Note: If you already have a mongodb service running you will see error:

```
docker: Error response from daemon: driver failed programming external connectivity on endpoint mongodb (3b63a0d8f9251bb267ea598373d6716befa078bb4e998ee6444c3f11cb61dcc5): Error starting userland proxy: listen tcp 127.0.0.1:27017: bind: address already in use.
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

