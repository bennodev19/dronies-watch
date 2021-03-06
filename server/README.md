# 💾 Backend
> api.dronies.watch

## 🍪 Session

This backend uses `Discord OAuth2` for authentications,
and reaches back to `Session` (valid for `7 days`) 
for further user assignment and authentication.
The session logic is inspired of the (`Discord OAuth2 Implementation Tutorial`)[https://github.com/stuyy/discord-oauth2-implementation] repository.

### Example Cookie for `Postman`
```
DISCORD_OAUTH_SESSION_ID=s%3ADIEAWKI3fYvmaeLLQuNMcu_1WWqc0kAC.%2Foy9fri87cjVzjCTyuWVasqpZ2%2BngZMEsaE%2FdtMb6QQ; Path=/; Expires=Fri, 08 Jul 2022 09:27:17 GMT;
```

## 🚊 Routes

**GET** /v1/auth/discord/login
- Redirects to the Discord login page.

**GET** /v1/auth/discord/redirect
- Discord redirects to this route once the user clicks the "Authorize" button on Discord's platform.

**GET** /v1/auth/discord/revoke
- Revokes the access token. This unauthorizes the access token from further use on behalf of the authenticated user.

**GET** /v1/user/current
- Retrieves the authenticated user data.

**POST** /v1/games/flappydronie/played
- TODO

## Installation & Instructions
Do you wish to use this code?
Please follow the following instructions on how to set everything up.

**Pre-requisites:**
- Clone this repository
- Run npm install or yarn install
  - Use the sample below as a `.env` or `.env.local` boilerplate. 
    Don't share the value of your variables publicly as these include critical information.
    ```text
    # Express App Server Details
    APP_PORT=9000
    APP_AFTER_OAUTH2_REDIRECT_URI=http://localhost:3000/lab
    APP_BASE_URL=http://localhost:%s
    APP_JSON_PAYLOAD_SECRET={NICE_256BIT_KEY}
    APP_CORS_ORIGIN=http://localhost:3000
    
    # Discord OAuth2 Client Details
    DISCORD_APPLICATION_ID={YOUR_APPLICATION_ID}
    DISCORD_CLIENT_SECRET={YOUR_CLIENT_SECRET}
    
    # Postgres & TypeORM Connection Options
    DB_HOST=dronies-watch-db
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=postgres
    DB_NAME=dronies_watch
    DB_SYNC=true
    DB_ENCRYPT_SECRET={NICE_256BIT_KEY}
    
    # Cookie & Session Options
    SESSION_SECRET={NICE_256BIT_KEY}
    ```

## 👨‍🎓 Learnings

### How to Deploy a Heroku Backend to a Netlify Subdomain
- https://mokkapps.de/blog/how-to-deploy-a-heroku-backend-to-a-netlify-subdomain/

### OAuth2 w/ Discord From Scratch
- https://discord.com/developers/docs/topics/oauth2
- https://www.youtube.com/watch?v=RP0P_zGdvj8
- https://www.youtube.com/watch?v=NtS5BkqS6M0

### What is Bearer token and How it works?
- https://www.devopsschool.com/blog/what-is-bearer-token-and-how-it-works/

### How to have value in string represented by %s and then replaced with a value
- https://stackoverflow.com/questions/3318621/javascript-how-to-have-value-in-string-represented-by-s-and-then-replaced-with/35754033

### How to change PostgreSQL user password?
- https://stackoverflow.com/questions/12720967/how-to-change-postgresql-user-password

### Typeorm
- https://typeorm.io/#/
- https://www.youtube.com/watch?v=NtS5BkqS6M0&t=204s
- https://www.youtube.com/watch?v=xt6etYGbPpo

### Writing middleware for use in Express apps
- https://expressjs.com/en/guide/writing-middleware.html#writing-middleware-for-use-in-express-apps

### Error Handler Middleware
- https://www.becomebetterprogrammer.com/how-to-use-error-handler-middleware-with-express-js-and-typescript/

### Secure Express Backend
- https://expressjs.com/en/advanced/best-practice-security.html

### Redis
TODO
- https://adostes.medium.com/adding-a-redis-cache-to-an-express-app-455c834becd1

### Create rate limiter and consume points on every request
- https://adostes.medium.com/adding-a-redis-cache-to-an-express-app-455c834becd1

### TypeORM Relations between Tables
- https://www.youtube.com/watch?v=rKgZLVgdvAY
- https://orkhan.gitbook.io/typeorm/docs/relations
- https://stackoverflow.com/questions/61361008/typeorm-insert-with-relationid

### Heroku

<details>
<summary>Heroku Learnings</summary>

#### How to deploy multiple apps in monorepo with Heroku
- https://michaellin.me/deploy-multiple-apps-in-monorepo-to-heroku/

#### Deploying a PostgreSQL database on Heroku
- https://www.youtube.com/watch?v=80oty2v4HsE

#### Connect to Postgres Database from local end machine
```text
# Heroku Example
psql --host=ec2-34-255-225-151.eu-west-1.compute.amazonaws.com --port=5432 --username=htozchapbteyzi --password --dbname=dbuea1u652cemv

# Custom Server Example
psql --host=api.dronies.watch --port=5432 --username=postgres --password --dbname=dronies_watch
```

#### Unable to connect to Heroku Postgres
```
There was an error initializing DB: no pg_hba.conf entry for host "x", user "y", database "z", SSL off
```
https://community.n8n.io/t/unable-to-connect-to-heroku-postgres-in-0-104-0/4721

</details>

### CORS: credentials mode is 'include'
- https://stackoverflow.com/questions/42803394/cors-credentials-mode-is-include
- http://50linesofco.de/post/2017-03-06-cors-a-guided-tour
- https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe

### `DISTINT ON`
- https://stackoverflow.com/questions/3800551/select-first-row-in-each-group-by-group
- https://stackoverflow.com/questions/54666465/typeorm-queryrunner-select-distinct

### Deploy to Digital Ocean Droplet
- https://www.youtube.com/watch?v=JsOoUrII3EY
- https://www.youtube.com/watch?v=hf8wUUrGCgU&t=282s
- https://faun.pub/full-ci-cd-with-docker-github-actions-digitalocean-droplets-container-registry-db2938db8246

### Docker

<details>
<summary>Docker Learnings</summary>

- Remove Images (Docker Images are like a Blueprint to Docker Containers)
  ```shell
  # Display all installed Docker Images
  docker images
  
  > REPOSITORY                        TAG       IMAGE ID       CREATED             SIZE
  > dronies-watch-server              latest    1be73bba1885   About an hour ago   1.04GB
  > node                              latest    14777a723ec4   34 hours ago        993MB
  > postgres                          latest    07e2ee723e2d   9 days ago          374MB
  
  # Remove Docker Image with the name 'x'
  docker rmi dronies-watch-server
  
  > Deleted: sha256:1be73bba18859b5b9cc18c65f9fc13af5024e6dc46d2156551a284bdf9dae8ca
  ```
- Connect to running Server
  ```bash
  docker exec -it container-name bash 
  ```

#### Node.js & Express
- https://www.youtube.com/watch?v=9zUHg7xjIqQ
- https://blog.morizyun.com/javascript/docker-dockerfile-basic-nodejs.html

#### Postgres
- https://hub.docker.com/_/postgres
- https://www.baeldung.com/ops/docker-attach-detach-container
- Start Postgres Docker Container
  ```shell
  # --name = Specify name of Postgres Docker Container
  # -e     = Specify environment variables (in this case the POSTGRES_PASSWORD)
  # -d     = Detach Docker Container (Starts the container, prints its id, and then returns to the shell prompt. Thus, we can continue with other tasks while the container continues to run in the background.)
  # -p     = Specify the port ([exposed port]:[internal port])
  docker run --name dronies-watch-postgres -e POSTGRES_PASSWORD=postgres -d -p 5000:5432 postgres
  ```
  
- Stop and Remove Postgres Docker Container
  ```shell
  # Show running Docker Containers
  docker ps
  
  > CONTAINER ID   IMAGE      COMMAND                  CREATED          STATUS          PORTS                    NAMES
  > a636127d2a35   postgres   "docker-entrypoint.s…"   14 minutes ago   Up 14 minutes   0.0.0.0:5432->5432/tcp   dronies-watch-postgres
  
  # Stop Docker Container with the ID 'x'
  # ('-t 0' to stop it immediately because the default shut down time is 10s)
  docker stop a636127d2a35 -t 0
  
  > a636127d2a35
  
  # Remove Docker Container with the ID 'x'
  docker rm a636127d2a35
  
  > a636127d2a35
  ```
  
- https://herewecode.io/blog/create-a-postgresql-database-using-docker-compose/
  
#### Docker Compose
- Run Docker Compose Script
  ```shell
  # Executes the docker-compose.yml script in the current folder in detached mode (-d)
  # [--build] checks if something has changed and if so build the images from scratch,
  # otherwise it would execute the existing images (if some where already built)
  docker-compose up --build -d
  ```
- Shut down Docker Container (that were created via the `docker-compose.yml` script) and remove them 
  ```shell
  docker-compose down
  ```
- https://codewithhugo.com/node-postgres-express-docker-compose/
- https://www.youtube.com/watch?v=A9bA5HpOk30

#### Build Docker Container
https://stackoverflow.com/questions/28996907/docker-build-requires-1-argument-see-docker-build-help
https://docs.docker.com/docker-hub/
```shell
# -t = Specifying the Name:Tag of the Docker Image
# . = Context (-> where to search for the Dockerfile)
docker build -t bennodev19/dronies-watch-backend:latest .
```

</details>

### Setting Cookies to another domain
Doesn't work -> can't use Heroku as it doesn't want to accept my debit card, and thus I can't change the url :/
- https://stackoverflow.com/questions/40097648/express-cookie-with-redirect-does-not-set-cookie-on-client
- https://github.com/expressjs/express/issues/4416
- https://stackoverflow.com/questions/40400436/express-js-redirect-cookies-not-sent

### How to fix: "error fsevents@2.0.7: The platform "linux" is incompatible with this module."
- https://stackoverflow.com/questions/57082249/how-to-fix-error-fsevents2-0-7-the-platform-linux-is-incompatible-with-thi

### Weired set cookie
Look at the cookies set in the request (Chrome)
and check if the cookie is set correctly there or if it exists twice.
Spent 2h to figure that out lol :/
