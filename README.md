# README

![Build Status](https://codeship.com/projects/ceb50510-55fb-0135-6879-3a589c61106a/status?branch=master)
![Code Climate](https://codeclimate.com/github/wesleyjnewcomb/flash-e.png)
![Coverage Status](https://coveralls.io/repos/github/wesleyjnewcomb/flash-e/badge.png)

## [Flash-E](https://flash-e.herokuapp.com)
Flash-E is a flashcard app that allows users to create decks of flashcards and then practice through them to better the knowledge of whatever material they want. While practicing their decks or other people's decks, the user can remove cards that they feel confident in from their practice set – this will prevent that card from showing up again until the user resets their practice set to include all cards.

Flash-E makes heavy use of React and React Router to provide a single-page experience for the user. It is built on top of a Ruby on Rails backend with PostgreSQL as the database. It uses Google OAuth2 for user authentication.

Flash-E was developed during Breakable Toy weeks as part of Launch Academy's curriculum.

### Technologies
* Ruby on Rails
* PostgreSQL
* React.js
* React Router 4
* Jasmine & Enzyme
* Foundation & SASS

### Local Setup
* `git clone https://github.com/wesleyjnewcomb/flash-e.git`
* `cd flash-e`
* `bundle`
* `yarn install`
* `rake db:create && rake db:migrate`
* `rails s`
* In another tab, `yarn start`
* Navigate to `localhost:3000`
#### Tests
In order to run the test suite, run `rake` to run the backend tests and `yarn test` to run the frontend tests.
