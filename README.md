# Sprocket API

Sprocket api is a Nodejs server application it wa built using Express which is a Node.js Framework. The api was written using Typescript for strong static typing.

## How to Set Up Your Copy of NodeGoat

### OPTION 1 - Run Sprocketapi on your machine

1) Install [Node.js](http://nodejs.org/) - Sprocketapi requires Node v12 or above

2) Clone the github repository:
   ```
   git clone https://github.com/GustavoSilvaNavarro/sprocket-factory-app
   ```

3) Go to the directory:
   ```
   cd sprocket-factory-app
   ```

4) Install yarn (optionally) you can just doing it using npm and delete the yarn.lock file:
   ```
   npm install -g yarn
   ```

5) Install node packages:
   ```
   yarn run install or npm run install
   ```

6) Set up [postgreSQL](https://www.postgresql.org/). You can install [postgreSQL](https://www.postgresql.org/) locally:
    * Install [postgresQL download guide](https://www.postgresql.org/download/)
    * Start [postgresQL start guide](https://www.postgresqltutorial.com/postgresql-getting-started/connect-to-postgresql-database/)

## pgAdmin Panel

Inside docker compose was added a container that hold pgAdmin so its possible to check the tables and data inside the database. When you run `docker-compose up --build` go to:

1) [http://localhost:16543](http://localhost:16543)

2) You'll be greeted with the pgAdmin panel. Enter the PGADMIN_DEFAULT_EMAIL and PGADMIN_DEFAULT_PASSWORD credentials from the docker-compose.yml file to access it.

3) Once inside click Add New Server.

4) For General -> Name pick a name. Can be whatever you want. `Recommended use postgres`

5) On the Connection tab values must match the docker-compose.yml file:

  * Host: `check the api of the pgAdmin container`
  * port `5432`
  * Username: `postgres`
  * Password: `superSecretDBPassword`

Now you can navigate from the left bar:

Servers -> whatever-you-want -> Databases -> sprocket_db -> Schemas -> public -> Tables