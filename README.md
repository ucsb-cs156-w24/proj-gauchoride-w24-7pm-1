# demo-spring-react-kitchensink: dsrk

Storybook is here:
* Production: <https://happycows.github.io/demo-spring-react-kitchensink-docs/>
* QA:  <https://happycows.github.io/demo-spring-react-kitchensink-docs-qa/>

# Setup before you run for the first time

* Obtain a Google client id and client secret
  - The callback url should be: `http://localhost:8080/login/oauth2/code/google`


# Getting Started on localhost

* The backend and frontend should be run separately, so first start by opening two separate terminal windows.
* In the first window, start up the backend with `mvn spring-boot:run`
* In the second window, `cd frontend` then:
  - If running for the first time, do `npm install` to install dependencies.
  - After that, do `npm start`
* Then, the app should be available on <http://localhost:8080>

# To run React Storybook

* cd into frontend
* use: npm run storybook
* This should put the storybook on http://localhost:6006
* Additional stories are added under frontend/src/stories

* For documentation on React Storybook, see: https://storybook.js.org/
