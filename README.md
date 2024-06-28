# LeagueWebsite

## Setup the Backend
1. Navigate to the backend: `cd Backend`
2. Install dependencies from package.json: ```npm install```

## Setup your environment
1. Create a file named `.env` in the `Backend` folder
2. Fill out the following variables as instructed:
    - Note that riot development api keys must be regenerated every 24 hours.
    - this assumes that you set up your local postgresSQL server to have a database named `leaguestats` and its using the default postgresSQL port 5432 and default username `postgres`. You can add a password to your `postgres` database user using the following SQL command: `ALTER USER postgres WITH PASSWORD 'new_password';`
    ```
    #.env
    #Backend server variables
    PORT=3000

    #DB environment variables
    DBS_HOSTNAME="localhost"
    DBS_PORT=5432
    DBS_DB_NAME="leaguestats"
    DBS_USERNAME="postgres"
    DBS_PASSWORD={YOUR_LOCAL_DB_PASSWORD}

    RIOT_API_KEY={YOUR_DEVELOPMENT_RIOT_API_KEY}
    ```

## Run the Backend
1. Navigate to the backend: `cd Backend`
2. Run the server `npm run start`
3. Open the webpage: https://localhost:3000/
