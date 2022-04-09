# Focus Fullstack Engineer Exercise

This is the fullstack exercise for Focus Consulting.  The exercise is aimed at generating evidence that can be brought to an interview for discussion as well as to provide a small example of the kind of work that you will potentially be working on.  Each exercise is written in the form of ticket; each part of the exercise is complete after all the acceptance criteria is complete.

## Repository structure

Note: this includes just the relevant files for the exercise

```
src/
  server/
    db.ts // DB configuration and setup
    index.ts // Server entrypoint
  hooks/
    useStates.ts // example hook
  pages/
    StateSearch.tsx // example page
    InterstateTradeSearch.tsx // Implement
    StateEconomySearch.tsx // Implement
    Login.tsx // Implement
    Signup.tsx // Implement
  App.tsx // Main app which includes navigation and the routes that get rendered
  index.tsx // React entry point
  app.db // SQLite DB.  This can get deleted as many times as you would like. App startup will recreate if it does not exist
```

## Styling

These exercsises are not a test of design, so the majority of the effort should be spent on getting the functionality implemented.  The repository is making use of [styled-components](https://styled-components.com/) but you are welcome to bring in any UI library you are comfortable with.

## Relevant commands

- `yarn install` : downloads all the dependencies for the app
- `yarn start` : starts the frontend React app.  Changes will cause a reload
- `yarn server:watch` : starts the backend API.  Changes will cause a reload of the server

## Instructions

Fork this repository into your own account.

Details for what needs to be done can be found by starting up the app or at [instructions](./src/pages/instructions.md).

Once you are done with exercises, push all the completed code to your fork and then share the repository with your interviewer; instructions are included in the interview invite.

## Interviewer Notes

- The goal is to get a sense of how a candidate would do with well scoped tickets for a project.  Interviewer should conduct a code review with the candidate, verifying that functionality is all there (as well as tests) and providing feedback on the work
- The exercise is *not* intended to test a candidate's design chops; however, do note if they they spent time on this and how it does look
- It's okay if the candidate stores the passwords as plain text.  If they do though, interviewer should press on what enhancements could be made to make the implementation more secure

### Follow Up Questions

- What are some alternative authorization strategies you could use?
- How would you make the login/signup process more secure?
- How would you design a table that would store the recent searches a user has performed?
- What are some techniques that you could use as the database schema evolves with new product requirements?
- What are some advantages of using graphql vs. a typical REST API?

## References

- [Local Passport Example](https://github.com/microsoft/TypeScript-Node-Starter/blob/master/src/config/passport.ts)
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
