# Setting up GitHub Actios

To setup GitHub Actions so that the tests pass, you will need to configure
one or more  *secrets* on the GitHub repo settings page.

1. Navigate to the settings page for your repo on the GitHub web interface.
2. Click on Settings, and look in the left navigation for Secrets.  If you
   have a brand new repo, this page should show a message `There are no secrets for
   this repository.`
3. At the upper right hand corner, there is a "New Secret" button.  For each of
   the secrets in the table below, please use this button to create a new
   secret.

Here are the secrets you need to create:


| Secret Name | Value | 
|-|-|
| `CODECOV_TOKEN` | This value is a token that allows you to publish test code coverage statistics for your project to the website <https://codecov.io>.  To obtain a value for this token, please refer to the instructions below.  |

(Note: There is currently only one secret, but since other apps based on this repo may require multiple secrets, we are
setting up the instructions template to allow for multiple secrets in the future.)


# Obtaining a `CODECOV_TOKEN`

*Why are we doing this?* Code coverage statistics help a dev team to keep track
of whether they have written new code that is not yet covered by tests.  While
100% coverage does not *necessarily* mean that the team has written *good* tests,
coverage that is going down can indicate a problem.

So, many software dev teams track their code coverage as a early warning sign
of potential technical debt.

To get started, you'll need to do two things first:

* If you haven't yet obtained the GitHub Student Developer Pack, please
  visit <https://education.github.com>, login with your GitHub credentials, 
  and go through the process of registering for the GitHub Student Developer Pack.  Free access to some of the paid features of Codecov.io is part of
  this pack.
* Once you have verified that you have access to the GitHub Student Developer Pack, login to the website <https://codecov.io> using your GitHub credentials.
* Once you log in, assuming that you are already of the course organization
  for CS156, you should see the name of that organization (e.g. `ucsb-cs156-f20`)Note that the quarter may be different depending on when you are reading these
  instructions--navigate to the organization for the current quarter.
  

  You should then be able to navigate to a link for your own repo.
  
  If you do NOT see your organization or repo, you can also try just 
  putting in a URL directly that has the following form, replacing `ORG-NAME`
  with the name of your class organization e.g. `ucsb-cs156-f20` and
  `REPO-NAME` with the name of your repo.

  ```
  https://codecov.io/gh/ORG-NAME/REPO-NAME
  ```

  That should take you to a page that has, across the top, tabs such as these:

  | Overview | Commits | Branches | Pulls | Compares | Settings

  The tab you want is `Settings`, and under `Settings` you will find the
  token value to copy into the Secret called `CODECOV_TOKEN`.

# Adjusting the Code Coverage Badge

Many repos have a "badge" at the top of their README.md file that serves
two purposes: it shows the current level of code coverage, and it's a 
link to the code coverage report.

On the same Settings page where you got the token, if you look at the left, there
is a left navigation option for "Badge".  You can copy/paste that Markdown
into your README.md file to get the badge to show up.

Note that if you used starter code for your repo that already had a badge in it,
it likely doesn't point to the code coverage for your repo; rather it points to the
code coverage of the repo you copied the README.md file from.  You should fix this.
