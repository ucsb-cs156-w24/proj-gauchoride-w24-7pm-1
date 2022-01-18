# demo-spring-react-example: dsrk


Storybook is here:
* Production: <https://happycows.github.io/demo-spring-react-example-docs/>
* QA:  <https://happycows.github.io/demo-spring-react-example-docs-qa/>

The GitHub actions script to deploy the Storybook to QA requires that a repository secret called `TOKEN` be set up; this should be an access token for the repository.   This secret can be obtained by visiting the settings page for either the organization, or a user with access to the organization, visiting Developer Settings, and then Personal Access Tokens. 

![image](https://user-images.githubusercontent.com/1119017/147836507-0190801c-ce94-4e5a-9abe-6a1d2d0455af.png)


# Setup before running application

Before running the application for the first time,
you need to do the steps documented in [`docs/oauth.md`](docs/oauth.md).

Otherwise, when you try to login for the first time, you 
will likely see an error such as:

```
Authorization Error
Error 401: invalid_client
The OAuth client was not found.
```


# Getting Started on localhost

* The backend and frontend should be run separately, so first start by opening two separate terminal windows.
* In the first window, start up the backend with `mvn spring-boot:run`
* In the second window, `cd frontend` then:
  - If running for the first time, do `npm install` to install dependencies.
  - After that, do `npm start`
* Then, the app should be available on <http://localhost:8080>

If it doesn't work at first, e.g. you have a blank page on  <http://localhost:8080>, give it a minute and a few page refreshes.  Sometimes it takes a moment for everything to settle in.

# Accessing swagger

To access the swagger API endpoints, use:

* < <http://localhost:8080/swagger-ui/index.html>

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