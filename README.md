# Focus Fullstack Engineer Exercise

This is the fullstack technical exercise for Focus Consulting.

Objectives:
- provide you with an example of the kind of work that you will likely be working on
- provide a context for our upcoming discussion/interview
- provide evidence of your coding ability and understanding of relevant stack
- create an efficient interviewing process based on early alignment on both sides

Technical Stack:
- Typescript
- Node
- GraphQL
- Express
- React

Each exercise is written in the form of a typical user story ticket; each part of the exercise is complete after all the acceptance criteria is met.

## Instructions

1. Complete reading through this README page.
2. Fork this repository into your own account.
3. Work on the [exercises](./src/pages/instructions.md).
4. Once you are done with exercises, push all the completed code to your fork and then share the repository with your interviewer; instructions are included in the interview invite.

Details for what needs to be done can be found by starting up the app or at [instructions](./src/pages/instructions.md).

## Timeline

We expect work on the exercises to take 2-4 hours. You may spend as much time as you like on them.

You have 7 days from the day we send you the exercise to submit your forked repo. Since most of our projects need roles filled in quickly, we encourage you to submit as soon as you are able.

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

## Relevant commands

- `yarn install` : downloads all the dependencies for the app
- `yarn start` : starts the frontend React app.  Changes will cause a reload
- `yarn server:watch` : starts the backend API.  Changes will cause a reload of the server

## Styling

These exercsises are not a test of design, so the majority of the effort should be spent on getting the functionality implemented.  The repository is making use of [styled-components](https://styled-components.com/) but you are welcome to bring in any UI library you are comfortable with.

## References

- [Local Passport Example](https://github.com/microsoft/TypeScript-Node-Starter/blob/master/src/config/passport.ts)
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

---

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


