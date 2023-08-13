## Setup Locally

First, install all dependency:

```bash
npm install
# or
yarn install
```

Then, Run the development mode:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see.

## Recommended - run with docker

make sure you've installed docker on your machine

run with docker compose

```bash
docker-compose up
```

or with docker image

build image
```bash
docker build -t your-build-name .
```

run the image
```bash
docker run -p 3000:3000 your-build-name
```

