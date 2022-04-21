 Add `PUT` (edit) endpoint for a single record in Recommendation table

Note that it is a good idea to implement `GET` for a single item
first; when using `PUT` manually, it's convenient to be able to copy/paste the JSON representation of the data and then edit it in the swagger interface.

Eventually, it's typically the case that in order to populate an edit
form in the front end, you first do a `GET` on a particular item, 
and use that JSON to populate the fields in a form.  You can send the
JSON representation of the new item to the backend.

# Acceptance Criteria:

- [ ] In `RecommendationController.java` there is code for an 
      endpoint `PUT /api/Recommendation?id=123` endpoint 
      that accepts JSON for a new set of values for the database
      fields other than `id`, and updates the values of those fields.
- [ ] The Swagger-UI endpoints for this endpoint is well documented
      so that any member of the team can understand how to use it.
- [ ] The endpoint works as expected on localhost.
- [ ] The endpoint works as expected when deployed to Heroku.
- [ ] There is full test coverage (Jacoco) for the new code in 
      `RecommendationController.java`
- [ ] There is full mutation test coverage (Pitest) for new code in
      `RecommendationController.java`


