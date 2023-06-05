![License](https://img.shields.io/github/license/ElijahLawson/divvy-tips.svg?style=for-the-badge) ![Repo Size](https://img.shields.io/github/languages/code-size/ElijahLawson/divvy-tips.svg?style=for-the-badge) ![TOP_LANGUAGE](https://img.shields.io/github/languages/top/ElijahLawson/divvy-tips.svg?style=for-the-badge) ![FORKS](https://img.shields.io/github/forks/ElijahLawson/divvy-tips.svg?style=for-the-badge&social) ![Stars](https://img.shields.io/github/stars/ElijahLawson/divvy-tips.svg?style=for-the-badge)
    
# Divvy Tips

## Table of Contents

- [Divvy Tips](#divvy-tips)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Prerequisites](#prerequisites)
  - [Create database and table](#create-database-and-table)
  - [Development Setup Instructions](#development-setup-instructions)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)
  - [Contacts](#contacts)

## Description

Divvy Tips is a mobile-focused responsive web application that looks at
alleviating the pain and time-consuming task of having to calculate the hours, credit card and cash tips, and bar back cut for bartenders that
are “running” the money at the end of the night. It allows bartenders to
log in, submit their hours, and submit their credit card tips for their
respective drawer. This information is stored so, whoever is running the
money, will be able to press a couple buttons and receive a detailed
quick divvy table. This application can save up to three hours,
depending on the bar size, at the end of a long bartending shift.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `prime_app` and create a `user` table:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
```

If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`


Once you're logged in, click add tips to add your tips and hours to the shift. At the end of the night, one individual will "Run the Money", and confirm all of the changes needed


## License

<a href="https://choosealicense.com/licenses/mit/"><img src="https://raw.githubusercontent.com/johnturner4004/readme-generator/master/src/components/assets/images/mit.svg" height=40 />MIT License</a>

## Acknowledgements

This goes out to all of my prime cohort and my instructors, Matt and Andrew. Without all these people, I wouldn't have been able to execute a fifth of this project.

## Contacts

<a href="https://www.linkedin.com/in/https://www.linkedin.com/in/ElijahDLawson"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>  <a href="mailto:"><img src=https://raw.githubusercontent.com/johnturner4004/readme-generator/master/src/components/assets/images/email_me_button_icon_151852.svg /></a>



