# Sprocket API

Sprocket API is a Nodejs server application that was built using Express which is a Node.js Framework. The api was written using Typescript for strong static typing.

## How to Set Up Sprocket API

### OPTION 1 - Run Sprocket API on your machine (A bit more tedious)

1) Install [Node.js](http://nodejs.org/) - Sprocketapi requires Node v16 or above

2) Set up [postgreSQL](https://www.postgresql.org/). You can install [postgreSQL](https://www.postgresql.org/) locally:
    - Install [postgresQL download guide](https://www.postgresql.org/download/), Add pgAdmin during installation or you can add it later on.
    - Start [postgresQL start guide](https://www.postgresqltutorial.com/postgresql-getting-started/connect-to-postgresql-database/)

3) Clone the github repository:
  ```
  git clone https://github.com/GustavoSilvaNavarro/sprocket-factory-app
  ```

4) Go to the directory:
  ```
  cd sprocket-factory-app
  ```

5) Install yarn (globally) you can just doing it using npm:
  ```
  npm install -g yarn
  ```

6) Install node packages:
  ```
  yarn run install
  ```

7) Before running the server locally you need to add inside the backend folder the file .env for env variables. Here is an example:
  ```
  # Server Application needs
  NODE_ENV=development
  PORT_DEV=                     # example 8080
  PORT_TEST=                    # example 3001

  # DB connection SQL | POSTGRES
  DB_SQL_HOST=                  #  127.0.0.1 which is localhost
  DB_SQL_USERNAME=              # postgres
  DB_SQL_PORT=                  # for postgres usually is 5432 unless you have configured it in another port
  DB_SQL_PASSWORD=              # your password
  DB_SQL_DATABASENAME=          # name of the database example sprocket_db
  DB_SQL_DIALECT=               # postgres in sequelize

  DB_SQL_DATABASENAME_TEST=     # database you need when you want to run the tests example sprocket_test_db

  # Client Domain
  CLIENT_DOMAIN=                # reserved to add a client like a frontend application for cors purposes
  ```

8) Before running. You must create the databases so when it connects there is no connections problems. You can do it creating the databases using pgAdmin and write a query to create both databases or just manually:

<div align="center">
  <h3>First Lets create a new database with right click in Databases and click in create -> Database</h3>
  <img src="https://user-images.githubusercontent.com/66889974/216328943-526cbb91-e02b-4349-a652-66311289e0d4.png" />

  <h3>Write the name of the database and click save at the bottom</h3>
  <img src="https://user-images.githubusercontent.com/66889974/216329181-f731aa9a-3ee3-4e3e-91de-ad1ff2bcc333.png" />

  <h3>To populate data inside click on the database you create, click first at the top at the query tool, after that click on open file and finally select the file seed.sql and execute the query</h3>
  <img src="https://user-images.githubusercontent.com/66889974/216332190-abc68870-4585-4fa3-8481-130541619e8e.png" />
</div>

9) Once you have passed all the previous step you are all set up. You can run the following commands
  ```shell
  cd backend
  yarn run start:dev
  ```

10) Start making requests to the api, Check the following URL requests (Assuming you are using port 8080):

    * Endpoint that returns all sprocket factory data (GET request)
    ```
    http://localhost:8080/factories/data
    ```

    * Endpoint that returns factory data for a given factory id - when you populate data comes with 4 companies so you can replace the id with numbers 1 to 4 (GET Request)
    ```
    http://localhost:8080/factories/data/:id
    ```

    * Endpoint that returns sprocket for a given id - when populate data there are 26 types of sprockets so you can replace id with numbers 1 to 26 (GET request)
    ```
    http://localhost:8080/sprockets/data/:id
    ```

    * Endpoint that will create new sprocket (POST Request)
    ```
    http://localhost:8080/sprockets/new
    ```

    * Endpoint that will update sprocket for a given id - when populate data there are 26 types of sprockets so you can replace id with numbers 1 to 26 (PUT Request)
    ```
    http://localhost:8080/sprockets/data/:id
    ```

### OPTION 2 - Run Sprocket API using docker container and docker-compose (easiest way)
1) Install [Docker](https://docs.docker.com/get-docker/)

2) Clone the github repository:
  ```
  git clone https://github.com/GustavoSilvaNavarro/sprocket-factory-app
  ```

3) Go to the directory:
  ```
  cd sprocket-factory-app
  ```

4) Install node packages:
  ```
  yarn run install
  ```

5) Before running the server with Docker you need to add inside the backend folder the file .env for env variables. Here is the data you need to add:
  ```
  # .env

  # Server Application needs
  NODE_ENV=development
  PORT_DEV=8080
  PORT_TEST=3001

  # DB connection SQL | POSTGRES
  DB_SQL_HOST=postgres-db
  DB_SQL_USERNAME=postgres
  DB_SQL_PORT=5432
  DB_SQL_PASSWORD=superSecretDBPassword
  DB_SQL_DATABASENAME=sprocket_db
  DB_SQL_DIALECT=postgres

  DB_SQL_DATABASENAME_TEST=sprocket_test_db
  ```

6) In your terminal run the following docker command
  ```
  docker-compose up --build
  ```
7) Start making requests to the api, Check the following URL requests:

    * Endpoint that returns all sprocket factory data (GET request)
    ```
    http://localhost:8080/factories/data
    ```

    * Endpoint that returns factory data for a given factory id - when you populate data comes with 4 companies so you can replace the id with numbers 1 to 4 (GET Request)
    ```
    http://localhost:8080/factories/data/:id
    ```

    * Endpoint that returns sprocket for a given id - when populate data there are 26 types of sprockets so you can replace id with numbers 1 to 26 (GET request)
    ```
    http://localhost:8080/sprockets/data/:id
    ```

    * Endpoint that will create new sprocket (POST Request)
    ```
    http://localhost:8080/sprockets/new
    ```

    * Endpoint that will update sprocket for a given id - when populate data there are 26 types of sprockets so you can replace id with numbers 1 to 26 (PUT Request)
    ```
    http://localhost:8080/sprockets/data/:id
    ```

## pgAdmin Panel - In case you want access to pgAdmin to look for the data

Inside docker compose was added a container that hold pgAdmin so its possible to check the tables and data inside the database. When you run `docker-compose up --build` go to:

1) [http://localhost:16543](http://localhost:16543)

2) You'll be greeted with the pgAdmin panel. Enter the `PGADMIN_DEFAULT_EMAIL` and `PGADMIN_DEFAULT_PASSWORD` credentials from the docker-compose.yml file to access it.

<div align="center">
  <img src="https://user-images.githubusercontent.com/66889974/216379290-d3429f74-3733-41b4-a20a-01d40daf5067.png" />
</div>

3) Once inside click Add New Server.

4) For General -> Name pick a name. Can be whatever you want. `Recommended use postgres`

5) On the Connection tab values must match the docker-compose.yml file:

  * Host: Here you need to check the terminal in `sprocket-factory-pgadmin-compose-1` since that host might change
  * port `5432`
  * Username: `postgres`
  * Password: `superSecretDBPassword` this was set on the db service the password of the db

<div align="center">
  <img src="https://user-images.githubusercontent.com/66889974/216380494-06c9f027-8a51-4dcf-a999-32ff3184be42.png" />


  <img src="https://user-images.githubusercontent.com/66889974/216380883-cabc2b22-a01f-4795-aa9e-e3b45cbf177b.png" />
</div>

Now you can navigate from the left bar:

Servers -> whatever-you-want -> Databases -> sprocket_db -> Schemas -> public -> Tables

<div align="center">
  <img src="https://user-images.githubusercontent.com/66889974/216381267-e7a89cfb-1933-4ea1-a55b-3723fb983e0c.png" />


  <img src="https://user-images.githubusercontent.com/66889974/216381533-9bfda0f9-755d-4874-bbb5-6e2e2f128d98.png" />
</div>