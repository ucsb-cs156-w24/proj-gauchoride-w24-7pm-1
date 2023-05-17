# Updating Versions of Java and/or node

## Updating the Java version

When updating the version of Java used, the following places need to be adjusted:

* `Versions` section of the README.md
* `pom.xml` file
* `.java-version` file (used by Github Actions scripts)
* `Dockerfile` used for deploying on Dokku

## Updating the node version

* `Versions` section of the README.md
* `engines` section in `frontend/package.json` (this is used by Github Actions scripts)
* `Dockerfile` used for deploying on Dokku
* `pom.xml` in the configuration of `frontend-maven-plugin` (adjust both the node and npm versions)

