# GPT Prompt Suggestions

This is a simple web-applicaton that relies on OpenAI's API (GPT-3.5 Turbo) to suggest message on hold prompts to play while a customer is on hold, on the phone. It could be used as part of a order form for voice recording services. Or whatever else you can think of :)

Technologies used:

- Vue 3 (Vite)
- Express

![GPT Prompt Suggestions](./preview.png?raw=true)

## Setup

Install

```bash
pnpm install -r
```

Create a `.env` file with the following content:

```
OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
```

Other options (optional; mostly for development):

```
VITE_BASE_URL=http://localhost:5000 # for development only (default '')
PORT=5000 # optional, server port
HOST=0.0.0.0 # optional, server interface for ex. for Docker (default 127.0.0.1)
```

## Run

### Production

```bash
pnpm run build
pnpm run start
```

- front-end [http://localhost:5000/](http://localhost:5000/)
- back-end [http://localhost:5000/api](http://localhost:5000/api)

### Dokku

This will deploy the application as Docker container, listening on port 5000.

```bash
git remote add dokku dokku@<YOUR_DOKKU_HOST>:<YOUR_APPLICATION_NAME>
git push dokku master
dokku config:set <YOUR_APPLICATION_NAME> OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
dokku config:set <YOUR_APPLICATION_NAME> HOST=0.0.0.0
```

### Development

This will start both server and client in development / HMR mode.

```bash
pnpm run dev
```

- front-end [http://localhost:5173/](http://localhost:5173/)
- back-end [http://localhost:5000/api](http://localhost:5000/api)

If you wanted to change something, the best place to start is `introduction.json`; This is where I provide instructions to the model.

## TODO

- [ ] Validate input on backend
- [ ] Add some basic tests
- [ ] Restructure (move server to `./server`)
- [ ] Security
