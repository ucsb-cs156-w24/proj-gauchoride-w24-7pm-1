# Storybook Setup

When setting up a repo that uses this repo as starter code, at first you may get
failures of the GitHub Actions scripts that set up and update the Storybook.

This file describes the one-time setup steps necessary to get that working.

## Setting up the repos

First, you'll need to set up two repos that have the same name as this repo, in the same organization, but with these suffixes:

* `-docs`
* `-qa-docs`

## Enable GitHub Pages in the docs repos

Then, for each of those repos, visit the repo settings and go to Pages.

Enable GitHub Pages on the `main` branch, in the `docs` folder for each repo.


## Setting up a Personal Access Token for GitHub Actions

The GitHub actions script to deploy the Storybook to QA requires that a repository secret called `TOKEN` be set up; this should be an access token for the repository.   This secret can be obtained by visiting the settings page for either the organization, or a user with access to the organization, visiting Developer Settings, and then Personal Access Tokens. 

![image](https://user-images.githubusercontent.com/1119017/147836507-0190801c-ce94-4e5a-9abe-6a1d2d0455af.png)

Copy the personal access token value, then visit the Settings for this repo, and add a repository secret called `TOKEN` and paste in the Personal Access Token value.

