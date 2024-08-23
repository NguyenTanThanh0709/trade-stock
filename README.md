# Docker Compose Nodejs and MongoDB example

## Run the System
We can easily run the whole with only a single command:
```bash
docker compose up
```

Docker will pull the MongoDB and Node.js images (if our machine does not have it before).

The services can be run on the background with command:
```bash
docker compose up -d
```

```bash
docker exec -it kafka-topics --delete --topic stock --bootstrap-server localhost:9092
```
