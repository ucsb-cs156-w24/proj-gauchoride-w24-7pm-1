# proj-gauchoride

# Deployments

| Type | Link       | 
|------|------------|
| prod | <https://gauchoride.dokku-00.cs.ucsb.edu/> | 
| qa | <https://gauchoride-qa.dokku-00.cs.ucsb.edu/>  | 

# W24 Production Deployments


| Team | Link       | 
|------|------------|
| w24-7pm-1 | <https://gauchoride.dokku-13.cs.ucsb.edu/> | 
| w24-7pm-2 | <https://gauchoride.dokku-14.cs.ucsb.edu/>  | 
| w24-7pm-3 | <https://gauchoride.dokku-15.cs.ucsb.edu/>  | 
| w24-7pm-4 | <https://gauchoride.dokku-16.cs.ucsb.edu/>  | 

# W24 QA Deployments


| Team | Link       | 
|------|------------|
| w24-7pm-1 | <https://gauchoride-qa.dokku-13.cs.ucsb.edu/> | 
| w24-7pm-2 | <https://gauchoride-qa.dokku-14.cs.ucsb.edu/>  | 
| w24-7pm-3 | <https://gauchoride-qa.dokku-15.cs.ucsb.edu/>  | 
| w24-7pm-4 | <https://gauchoride-qa.dokku-16.cs.ucsb.edu/>  | 

# Setup before running application

Before running the application for the first time,
you need to do the steps documented in [`docs/oauth.md`](docs/oauth.md).

Otherwise, when you try to login for the first time, you 
will likely see an error such as:

<img src="https://user-images.githubusercontent.com/1119017/149858436-c9baa238-a4f7-4c52-b995-0ed8bee97487.png" alt="Authorization Error; Error 401: invalid_client; The OAuth client was not found." width="400"/>

# Getting Started on localhost

* Open *two separate terminal windows*  
* In the first window, start up the backend with:
  ``` 
  mvn spring-boot:run
  ```
* In the second window:
  ```
  cd frontend
  npm install  # only on first run or when dependencies change
  npm start
  ```

Then, the app should be available on <http://localhost:8080>

If it doesn't work at first, e.g. you have a blank page on  <http://localhost:8080>, give it a minute and a few page refreshes.  Sometimes it takes a moment for everything to settle in.

If you see the following on localhost, make sure that you also have the frontend code running in a separate window.

```
Failed to connect to the frontend server... On Dokku, be sure that PRODUCTION is defined.  On localhost, open a second terminal window, cd into frontend and type: npm install; npm start;
```

# Accessing swagger

To access the swagger API endpoints, use:

* <http://localhost:8080/swagger-ui/index.html>


# To run React Storybook

* cd into frontend
* use: npm run storybook
* This should put the storybook on http://localhost:6006
* Additional stories are added under frontend/src/stories

* For documentation on React Storybook, see: https://storybook.js.org/

# SQL Database access

On localhost:
* The SQL database is an H2 database and the data is stored in a file under `target`
* Each time you do `mvn clean` the database is completely rebuilt from scratch
* You can access the database console via a special route, <http://localhost:8080/h2-console>
* For more info, see [docs/h2-database.md](/docs/h2-database.md)

On Heroku:
* The SQL database is a postgres database provisioned automatically by Heroku
* You can reset it with `heroku pg:reset --app app-name-goes-here`
* More info and instructions for access the SQL prompt are at [docs/postgres-database.md](/docs/postgres-database.md)
