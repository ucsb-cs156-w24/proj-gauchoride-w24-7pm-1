# demo-spring-react-kitchensink: dsrk


Storybook is here:
* Production: <https://happycows.github.io/demo-spring-react-kitchensink-docs/>
* QA:  <https://happycows.github.io/demo-spring-react-kitchensink-docs-qa/>




# Test setup

For testing, you need to set a repository secret `TEST_PROPERTIES` to be the contents of `.env.SAMPLE`.   It is not necessary to have
valid values for each of the environment variables, but if they are undefined, the tests will fail.

# Setup before running application

* Obtain a Google client id and client secret
  - This is done at the Google Developer Console <https://console.cloud.google.com/> via the left navigation under `APIs and Services`, then `Credentials`, then `Create Credentials`
  - The callback url should be: `http://localhost:8080/login/oauth2/code/google`.  (Note: `http` not `https` for localhost).
  - You will also need to add a callback URL for Heroku if you are deploying there, e.g. `https://myappname.herokuapp.com/login/oauth2/code/google` (Note the `https` in the Heroku case.)


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
