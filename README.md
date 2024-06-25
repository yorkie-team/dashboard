# Dashboard

Dashboard is an administrative tool that allows users to manage projects and documents.

## Developing Dashboard

### Building Dashboard

For building dashboard, You'll first need Node.js installed(Node.js version 16+ and npm version 7.10+ are required).

```
# install packages
npm install

# build
npm run build
```

To generate proto messages, we use `protoc-gen-connect-es`, which is a code generator plugin for Protocol Buffer compilers, like buf and protoc. It generates both clients and server definitions from Protocol Buffer schema.

For more details, see [@connectrpc/protoc-gen-connect-es](https://github.com/connectrpc/connect-es/tree/main/packages/protoc-gen-connect-es).

```
# To generate code for all protobuf files within the project
npm run build:proto
```

> Primary "source of truth" location of protobuf message is in [yorkie](https://github.com/yorkie-team/yorkie/tree/main/api). We manage the messages in the repository.

### Running Dashboard

Dashboard needs Yorkie server. We can simply run them using `docker-compose`.
To start Yorkie in a terminal:

```
$ docker-compose -f docker/docker-compose.yml up --build -d
```

In the project directory, you can run:

```
$ npm run dev
```

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for details on submitting patches and the contribution workflow.
