# Storybook Setup

When setting up a repo that uses this repo as starter code, at first you may get
failures of the GitHub Actions scripts that set up and update the Storybook.

This file describes the one-time setup steps necessary to get that working.

## Setting up a Personal Access Token for GitHub Actions

The GitHub actions script to deploy the Storybook to QA requires that a repository secret called `DOCS_TOKEN` be set up; this should be an access token for the repository.   This secret can be obtained by visiting the settings page for either the organization, or a user with access to the organization, visiting Developer Settings, and then Personal Access Tokens. 

![image](https://user-images.githubusercontent.com/1119017/147836507-0190801c-ce94-4e5a-9abe-6a1d2d0455af.png)

Copy the personal access token value, then visit the Settings for this repo, and add a repository secret called `DOCS_TOKEN` and paste in the Personal Access Token value.


## Setting up the `-docs-` and `-docs-qa` repos.

First, you'll need to set up two repos that have the same name as this repo, in the same organization, but with these suffixes:

* `-docs`
* `-docs-qa`

For example, for `demo-spring-react-example`, you set up:

* `demo-spring-react-example-docs`, which is updated when changes are merged to the main branch
* `demo-spring-react-example-docs-qa`, which is updated each time a pull request to the main branch is made

There is a GitHub Action that should set these up for you, provided that the personal access token is set up properly.  To run that script, take these steps:

1. Visit this repos's page on GitHub
2. You should see a tab for Actions like this (`Actions` is fourth from the left, after `Pull Requests`)
 
   <img width="988" alt="image" src="https://user-images.githubusercontent.com/1119017/163041904-af830ecc-8530-4cf6-be18-78a16c3d30d9.png">
  
   If there is no `Actions` tab, go under `Settings` and enable it, like this (note that `Actions` is in the left-navigation)
  
   <img width="1158" alt="image" src="https://user-images.githubusercontent.com/1119017/163042157-75863770-b595-4ed1-842c-ec390cc402f2.png">
3. Click on the Actions tab, and you should see this:
   <img width="1326" alt="image" src="https://user-images.githubusercontent.com/1119017/163042423-526da9fc-3307-4151-a555-a11d28d0c984.png">
4. Click on the top action, and you should see the title: `00-publish-docs-to-github-pages-setup: set up -docs and -docs-qa repos (run once, manually)`
   
   Like this:
   <img width="1275" alt="image" src="https://user-images.githubusercontent.com/1119017/163042524-7453ea9b-3ad4-483c-8cf9-8a84b86f75f8.png">

   Click where it says: `Run Workflow` at the right, and you should see a dropdown like this with a Green `Run Workflow` button.  
   Click that button.
   
   <img width="413" alt="image" src="https://user-images.githubusercontent.com/1119017/163042648-ac93f982-8e43-4bcf-8b17-69ac81892a67.png">

   After clicking, wait a few seconds; don't click again immediately. It takes 5-10 seconds for the screen to update.
  
   Then you should see something like this:

   <img width="965" alt="image" src="https://user-images.githubusercontent.com/1119017/163042766-f075a540-6ed1-4eb7-86a0-129a8a7171fc.png">

   That means the script is running to create the repos.

5. When the script is done, the repos should be created.

But if they are not, then just create them manually.  Be careful that the names match the requested names *exactly* or the other scripts will not work properly.


## Run the GitHub Actions to populate the repos

The next step is to manually trigger two GitHub actions that populate the repos:

Those are:

* 02-publish-docs-to-github-pages-qa: Publish QA Storybook to GitHub Pages
* 04-publish-docs-to-github-pages-prod: Publish production Storybook to GitHub Pages

Trigger each of these manually under the `Actions` tab on the main repo.  They should populate the repo with content.

## Enable GitHub Pages in the docs repos

For each of the two new  repos you create (`-docs` and `-docs-qa`), visit the repo settings and go to Pages.

Enable GitHub Pages on the `main` branch, in the `docs` folder for each repo.

That looks like this:

![image](https://user-images.githubusercontent.com/1119017/151077121-693321a9-5684-40c5-a20f-2cb111881066.png)

Note that the `main` branch and the `docs/` folder must exist before you can do this.  If necessary, you can use the GitHub web interface to
first create an empty `README.md` to establish the `main` branch, then create an empty file called `docs/.keep` on the main branch to establish the
`docs/` folder.


## Update the links in the README.md

Finally, at the top of the README.md there shoudl be two links for the Storybook that look like this:

```
Storybook is here:

Production: https://ucsb-cs156-f22.github.io/demo-spring-react-example-docs/
QA: https://ucsb-cs156-f22.github.io/demo-spring-react-example-docs-qa/
```

Each of the URLs has this form:

```
https://ORGANIZATION_NAME.github.io/REPO-NAME-docs/
https://ORGANIZATION_NAME.github.io/REPO-NAME-docs-qa/

```
