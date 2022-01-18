# OAuth Setup

This Spring Boot application is set up to use Google OAuth as it's authentication scheme.

Setting this up on localhost requires the first two steps below; getting this to work on Heroku requires an additional third step.

1. Obtaining a Google *client id* and *client secret*, which is
   done at the [Google Developer Console](https://console.cloud.google.com/).
2. Configuring the `.env` file with these values.
3. Copying the `.env` values to the Heroku app's configuration values.

Each is explained below.

## Step 1: Obtain a Google client id and client secret

1. Login to the Google Developer Console at 
   <https://console.cloud.google.com/>

2. Look under the left navigation for 
   - `APIs and Services`
   - then `Credentials`
   - then `Create Credentials`

3. You should now have the screen where you can create a new set
   of OAuth Credentials (i.e. a client id and client secret).
    
   You'll be asked for a callback url.

   For localhost, enter this (note: `http`, not `https`):
   ```
   http://localhost:8080/login/oauth2/code/google 
   ``` 
     
   For Heroku, add a second callback url, using `https`, and
   substituting in your app name in place of `myappname`:

   ```
   https://myappname.herokuapp.com/login/oauth2/code/google
   ``` 
   
## Step 2: Copy `.env.SAMPLE` to `.env` and enter values

Use this command to copy `.env.SAMPLE` to `.env`.  Recall that you
may need to use `ls -a` to get the files to show up, since they are hidden files on Unix-like systems.

```
cp .env.SAMPLE .env
```

The file `.env.SAMPLE` **should not be edited;** it is intended to
be a template for creating a file called `.env` that contains
your repository secrets.

The `.env` is in the `.gitignore` because **a file containing secrets should NOT be committed to GitHub, not even in a private repo.

After copying, the file `.env` looks like this:

```
GOOGLE_CLIENT_ID=see-instructions
GOOGLE_CLIENT_SECRET=see-instructions
ADMIN_EMAILS=phtcon@ucsb.edu
```

Replace `see-instructions` with the appropriate values.

For ADMIN_EMAILS, add your own email and any teammates you are collaborating with after phtcon.ucsb.edu; you can separate multiple emails with commas, e.g.

```
ADMIN_EMAILS=phtcon@ucsb.edu,cgaucho@ucsb.edu,ldelplaya@ucsb.edu
```

With this done, you should be all set to run on localhost.

For Heroku, there is one more step.

## Step 3: Copying `.env` values to Heroku

The easy way, using the Heroku CLI:

(Note: if you don't access to the Heroku CLI, scroll down to "the tedious way")

1.  Make sure you have the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) installed.
2.  Login with `heroku login`
3.  Use this command, with the name of your app in place of `my-heroku-app`

    ```
    heroku config:set --app my-heroku-app  `cat .env` 
    ```

    You should get output like this:

    ```
    Setting GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, ADMIN_EMAILS and restarting ⬢ demo-spring-react-example... done, v6
    ```

    You can check the values by visiting the `Settings` tab 
    in the Heroku Dashboard, and clicking `Reveal Config Vars`

The slightly more tedious way: 

1. In the Heroku Dashboard, visit the `Settings` tab 
   then click `Reveal Config Vars`.
2. For each variable in `.env`, create a Config Var entry
   with the corresponding name and value.  
   
   Be sure that you preserve case: if it's `CLIENT_SECRET`, you must use `CLIENT_SECRET` not `client_secret`.

3. When finished, restart the application by going to the 
   `Deploy` tab and clicking `Deploy Branch`.