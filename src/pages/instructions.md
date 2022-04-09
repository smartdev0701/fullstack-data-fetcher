# Exercises

The data be fetched is all publicly available at https://datausa.io/, which is powered by a public API that can be accessed without an API key.  The goal of these exercises is to write implementations that match the accept criteria.

## 1. Create a UI for visualizing interstate trade for a state

### Acceptance Criteria

- As a user, I should be able to search for a state
- As a user, after I have searched for a state I should be able to see:
  - The total $ amount for all interstate trade for the state
  - The total tons for all interstate trade for for the state
  - The top five states in terms of $ amounts
  - The top five states in terms of tons
- There are tests covering this functionality

### Implementation Notes

- [This](https://datausa.io/api/data?Origin%20State=04000US51&measure=Millions%20Of%20Dollars,Thousands%20Of%20Tons&drilldowns=Destination%20State&year=latest) is an example URL (for Virginia) that returns the data.
- The data can be fetched directly from the datause.io API in the browser (this is how the example State search is implemented)

## 2. Update the graphql server to return states, the employment industry and median household income

### Acceptance Criteria

- As a user, I would like to be able to search for a state and select the data I would like to see
  - Interstate trade
  - Employment History
  - Median household income
- As a user, I would like to expand a state returned from interstate trade to view the same data but for that state
- There are tests covering this feature

### Implementation Notes

- There is an existing graphql query that can be referenced as an example.  It queries for states and accepts an optional name parameter
- The graphql queries can be explored and test locally at [graphql](http://localhost:4000/graphql)

## 3. Create a login flow and restrict access to the existing pages when a user is not logged in

### Acceptance Criteria

- As a user, I should be able to sign up for an account and access the other pages
  - To sign up, I need to enter a username and password
  - The sign up form should ask user to confirm the password
- As as a user, I should be able to login and be shown an error message if the username or password are wrong
- As a user, I should only be able to access the home route (`/`) if I'm not logged in

#### Implementation Notes

- Recommended approach is use to passport, but you are welcome to choose any implementation
- There is an existing table/model for a user
- You do not need to worry about creating a secure login
- The new endpoints should be implemented as RESTful endpoints in the express API
