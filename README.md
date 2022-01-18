# demo-spring-react-example: dsre

Storybook is here:
* Production: <https://ucsb-cs156-w22.github.io/demo-spring-react-example-docs/>
* QA:  <https://ucsb-cs156-w22.github.io/demo-spring-react-example-docs-qa/>

If these reposare not yet setup, see the setup steps in [`docs/storybook.md`](docs/storybook.md).

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
Failed to connect to the frontend server! You may have forgotten to run npm start in a separate ./dev_environment window (or it hasn't loaded yet).
```

# Getting Started on Heroku

On Heroku, you'll need to set the following configuration variable:

* Using the Heroku CLI:
  ```
  heroku config:set PRODUCTION=true --app <heroku app name>
  ```
* Or set it on the Heroku Dashboard:
  ![image](https://user-images.githubusercontent.com/1119017/149855768-7b56164a-98f7-4357-b877-da34b7bd9ea4.png)

You'll also need to follow the OAuth set up instructions here: [`docs/oauth.md`](docs/oauth.md).

If you get the following message, it probably means that you failed to setup one or more of the environment variables:

```
Failed to connect to the frontend server! You may have forgotten to run npm start in a separate ./dev_environment window (or it hasn't loaded yet).
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


# GitHub Actions Setup

As long as each property value needed has a sane default value that works
in test mode, it is not necessary to configure any repository secrets for
GitHub Actions.

As an example, in `src/main/resources/application.properties`, we see lines that contain fallback values for `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` and `ADMIN_EMAILS`:

```
spring.security.oauth2.client.registration.google.client-id=${GOOGLE_CLIENT_ID:${env.GOOGLE_CLIENT_ID:client_id_unset}}
spring.security.oauth2.client.registration.google.client-secret=${GOOGLE_CLIENT_SECRET:${env.GOOGLE_CLIENT_SECRET:client_secret_unset}}
spring.security.oauth2.client.registration.google.scope=email,profile
...
app.admin.emails=${ADMIN_EMAILS:${env.ADMIN_EMAILS:phtcon@ucsb.edu}}
```

The fallback values, in this case being:

| Env variable | Default Value |
|--------------|---------------|
| `GOOGLE_CLIENT_ID` | `client_id_unset` |
| `GOOGLE_CLIENT_SECRET` | `client_secret_unset` |
| `ADMIN_EMAILS` | `phtcon@ucsb.edu` |

This avoids the error that the Spring Boot application fails to load because a specific environment variable is undefined.   It is recommended that if any additional environment variables are added to `.env.SAMPLE` that similar fallback values be included in the `.properties` files.

Having said that, if specific values are needed for GitHub actions testing, it is possible to define those in a repository secret called  `TEST_PROPERTIES` that has the contents of `.env.SAMPLE` with appropriate values.
