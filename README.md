---

# GraphQL - Twitter Clone

![enter image description here](https://i.imgur.com/9nmaquP.png)

To run this graphql server you need to:

* Clone the repo `git clone`
* Run `yarn` or `npm install`
* Run `yarn watch` or `yarn build && yarn update-scehma && yarn start`
* And there you go to: `http://localhost:5000/graphql`

Queries and Mutations that can be made:

# Queries

---

|    Query | Description               |
| -------: | ------------------------- |
|  `users` | returns a bunch of users  |
|   `user` | returns a specific user   |
| `tweets` | returns a bunch of tweets |
|  `tweet` | returns a specific tweet  |

# Mutations

---

|            Query | Description                        |
| ---------------: | ---------------------------------- |
|       `TweetAdd` | Adds a new Tweet                   |
|      `TweetEdit` | Edit a field from the tweet        |
|     `LoginEmail` | Generates a Token JWT for the user |
|  `RegisterEmail` | Adds a new user to the database    |
| `ChangePassword` | Changes the user password          |
