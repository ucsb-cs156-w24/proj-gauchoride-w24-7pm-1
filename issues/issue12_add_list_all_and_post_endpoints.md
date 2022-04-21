Create `UCSBDiningCommonsMenuItemController`, add `GET` (index) and `POST` (create)

# Acceptance Criteria:

- [ ] There is a controller file `UCSBDiningCommonsMenuItemController.java`
      in the expected directory.
- [ ] In `UCSBDiningCommonsMenuItemController.java` there is 
      code for a `GET /api/UCSBDiningCommonsMenuItem/all` endpoint 
      that returns a JSON list of all `UCSBDiningCommonsMenuItem`s in the database.
      (We sometimes call this an *index* action since it lists all
      items in the database.)
- [ ] In `UCSBDiningCommonsMenuItemController.java` there is 
      code for a `POST /api/UCSBDiningCommonsMenuItem/post` endpoint
      that can be used to create a new entry in the table. (This
      is a *create* action.)
- [ ] The Swagger-UI endpoints for these are well documented so that
      any member of the team can understand what they are for and
      how to use them.
- [ ] The `POST` endpoint works as expected, in the sense that new
      records can be added to the database (on localhost).
- [ ] The `GET` endpoint works as expected, in the sense that the new
      records that are added show up (on localhost).
- [ ] The `GET` and `POST` endpoints work as expected when the 
      app is deployed to Heroku.
- [ ] There is full test coverage (Jacoco) for the methods in 
      `UCSBDiningCommonsMenuItemController.java`
- [ ] There is full mutation test coverage (Pitest) for the methods in
      `UCSBDiningCommonsMenuItemController.java`



