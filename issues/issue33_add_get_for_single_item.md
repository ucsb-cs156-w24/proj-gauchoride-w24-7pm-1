 Add `GET` (show) endpoint for a single record in Recommendation table

# Acceptance Criteria:

- [ ] In `RecommendationController.java` there is code for an 
      endpoint `GET /api/Recommendation?id=123` endpoint 
      that returns the JSON of the database record with id 123 if it
      exists, or a 400 and the error message `id 123 not found` if it
      does not.
- [ ] The Swagger-UI endpoints for this endpoint is well documented
      so that any member of the team can understand how to use it.
- [ ] The endpoint works as expected on localhost.
- [ ] The endpoint works as expected when deployed to Heroku.
- [ ] There is full test coverage (Jacoco) for the new code in 
      `RecommendationController.java`
- [ ] There is full mutation test coverage (Pitest) for new code in
      `RecommendationController.java`


