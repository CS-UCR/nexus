# Nexus

<p align="center">
<img src="/documentation/images/NexusCover.png" alt="cover page for Nexus project" width="750">
</p>
&nbsp;

> Authors:  
> Rajbir Johar  
> Isaac Curiel  
> Florian Catalan  
> Robert Rivera  
> Brian Coffey

## Table of Contents
1. [Overview](#overview)
2. [Usage](#usage)
3. [How To Run](#how-to-run)
4. [Diagrams](#diagrams)
5. [Stack & Dependencies](#stack-and-dependencies)

## Overview

> Summary of Project, purpose, stack, etc.

### Stack

<img alt="Next JS" src="https://img.shields.io/badge/nextjs-%23000000.svg?&style=for-the-badge&logo=next.js&logoColor=white"/> <img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/> <img alt="Typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/> <img alt="HTML5" src="https://img.shields.io/badge/html5-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/> <img alt="CSS3" src="https://img.shields.io/badge/css3-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/> <img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" /> <img alt="Prettier" src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E"/> <img alt="Stack Overflow" src="https://img.shields.io/badge/Stack_Overflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white"/>

### Features

- [x] Dark Mode
- [x] Authentication
- [x] Serverless APIs
- [x] Org Profiles
- [x] Posts (CRUD)
- [x] Instant Routing
- [x] Protected Routing
- [ ] Dynamic Routing
- [ ] Pagination
- [ ] Roles
- [ ] Search
- [ ] Sort

### About

Nexus is the one-stop shop for a student at UCR hosting information on different clubs, organizations, and events as well as reviews on classes provided by other students. We want the students that use this site to be as informed as possible about what is currently going on on campus.
 
Using the most powerful and dynamic stack, we are able to provide a near instant and seamless user experience. Our framework of choice, NextJS allows us to build and scale our application for large populations all while remaining incredibly smooth. MongoDB allows us to structure data in an intuitive way and offers easy ways to access and write data to and from the frontend without any hiccups.

## Team

> List of pictures, names, and relevant websites

### Rajbir Johar

<img align="left" src="/documentation/images/rajbir.png" alt="image of Rajbir Johar" width="75" height="75">

Hey I'm Rajbir! You can find out more about me on my [Portfolio](https://rajbir.io/) or my [Github](https://github.com/rajbirjohar). Currently, I'm interested in automotives, especially german cars, building bespoke mechanical keyboards, and web development and design.

<br/>

### Isaac Curiel

<img align="left" src="/documentation/images/isaac.png" alt="image of Isaac Curiel" width="75" height="75">

Hey there, I'm Isaac! Some of my interests include stationery, mainly fountain pens, and sports (Go Rams!). Check out my [Github](https://github.com/isaac-18) for more. 

<br/>

### Florian Catalan
<img align="left" src="/documentation/images/florian.png" alt="image of Florian Catalan" width="75" height="75">

Hello, I'm Florian. 4th year CS major at UCR and you can find more from me at my [Github](https://github.com/floriancat). I enjoy playing video games, watching movies/shows designing, and editing in my free time. 

<br/>

### Brian Coffey
<img align="left" src="/documentation/images/brian.png" alt="image of Brian Coffey" width="75" height="75">

Hey, I'm Brian! I am a 4th year Computer Science major at UCR, and I am applying for my Masters in Education. Follow my [Github](https://github.com/brianpcoffey) to keep up to date with my projects! I also have many interests, such as bouldering, surfing, coffee, and really just trying anything new! 

<br/>

### Robert Rivera
<img align="left" src="/documentation/images/robert.png" alt="image of Robert Rivera" width="75" height="75">

Hello, I'm Robert! I'm a 4th year Computer Science major at UCR. If you are interested in learning more about me, check out my [LinkedIn](https://www.linkedin.com/in/robertrivera288/) and [Github](https://github.com/Robert288) pages. 

<br/>

## Usage

### How To Run

1. Clone or fork this project on your local machine.
2. Ensure you have [Node](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/) installed.
3. Within the root directory, run `yarn` or `yarn install` to install all required packages needed for this project.
4. Then run `yarn run dev` to start your local server at `http://localhost:3000` and enter this address in your favorite browswer.
5. From here, you can edit and poke around and watch your changes hot update.

⚠️ **Important: In order to achieve full functionality, you will need to configure your environment variables as explained below.**

## Configuration

### Set up a MongoDB database

1. Set up a MongoDB database either locally or with [MongoDB Atlas for free](https://mongodb.com/atlas).
2. Once you have created your cluster and database, select **Connect** to begin connecting your frontend to your database.
3. You will need to create a database user and note down the username and password.
4. Then select the method **Connect Your Application** where you will be prompted with a link as represented below.
```
mongodb+srv://<user>:<password>@cluster0.qhvo8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```
5. This link represents your **MONGODB_URI** where you will replace `<user>`, `<password>`, and `myFirstDatabase` with your respective values without `<>`.

### Set Up Environment Variables

Rename `.env.example` to `.env.local`

Set each variable on `.env.local`:

- `MONGODB_URI` - Your MongoDB connection string.
- `MONGODB_DB` - The name of your Database.
- `NEXTAUTH_URL` - The canonical url of your website. Your local environment should be `http://localhost:3000`. Your production should be your actual domain.
- `GOOGLE_CLIENT_ID` - The ID generated by the Google API dashboard when you are setting up OAuth.
- `GOOGLE_CLIENT_SECRET` - The password by the Google API dashboard when you are setting up OAuth.

⚠️ **Important: The `.gitignore` should already filter the .env files but just in case, never commit your environment variables.**

### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.

[MongoDB](https://www.mongodb.com/) is a general purpose, document-based, distributed database built for modern application developers and for the cloud era. This example will show you how to connect to and use MongoDB as your backend for your Next.js app.

If you want to learn more about MongoDB, visit the following pages:

- [MongoDB Atlas](https://mongodb.com/atlas)
- [MongoDB Documentation](https://docs.mongodb.com/)

## Diagrams

> UI/UX Mockups/State Diagrams

### Landing Page

Our design language leans towards a simple yet tasteful color scheme and layout to create an unparalleled user experience. We want to be able to provide as much information as possible while being digestable for the user. Along with our purple brand, we offer a dark mode for those who enjoy browsing at night giving the user options and control over their experience.

<p align="center">
<img src="/documentation/images/LandingMockDark.png" alt="image of Nexus' landing page" width="750">
</p>
&nbsp;

### Profile Page 

Our Profile page displays the user's name, the organizations they've made as admins, and the course reviews they've submitted. Functionality from this page includes the ability to delete course reviews. Upcoming functionality includes users being able to edit their own course reviews and organizations.

<p align="center">
<img src="/documentation/images/ProfileMockDark.png" alt="image of Nexus' profile page" width="750">
&nbsp;
</p>
&nbsp;

### Courses Page 

Our Courses page features functionality that allows users to post, read, edit, and delete course reviews. We want to be able to show all the important information that user might want to see at a glance. There are future plans on allowing the user to sort by a specific metric.

<p align="center">
<img src="/documentation/images/CoursesMockDark.png" alt="image of Nexus' courses page" width="750">
&nbsp;
 </p>
 &nbsp;
 
 ### Events Page 

Our Events page features upcoming events from organizations registered with Nexus. Here, users can see all events and their info all in one place.

<p align="center">
<img src="/documentation/images/EventsMockLight.png" alt="image of Nexus' events page" width="750">
&nbsp;
</p>
&nbsp;

### Organization Page 

Our Organization page features organizations registered with Nexus. Upcoming functionality that will be implemented includes allowing users to become members of organizations and enroll in event notifications.

<p align="center">
<img src="/documentation/images/OrganizationsMockLight.png" alt="image of Nexus' organization page" width="750">
&nbsp;
</p>
&nbsp;

### Login Sequence Diagram 

The login sequence is structured to be smooth for the user so as to provide ease of use when first trying our app. They are directly sent to log in via Google OAuth and then once they complete the login sequence, will be redirected to their profile page. There they can view all their posts and navigate to any other page.

<p align="center">
<img src="/documentation/images/Login_Sequence_Diagram.jpg" alt="image of login sequence diagram" width="750">
  </p>
&nbsp;

### New Post Sequence Diagram 

Users are able to create new posts via the `/reviews` page. Once they input all their information, it will be sent via a secured API and stored in our database. Our clever design allows for near instant, live updates to the page so users have a quick confirmation that their post can be seen by everyone. All data sent to the database is locked via Next-Auth api protection and fetched onto the frontend via SWR.

<p align="center">
<img src="/documentation/images/New_Post_Sequence_Diagram.jpg" alt="image of new post sequence diagram" width="750">
  </p>
&nbsp;

> More screenshots to come.

### Frontend Structure

Overall System Diagram

```bash
├── master
│   ├── components
│   │   ├── Header.js
│   │   ├── Layout.js
│   │   ├── ...
│   ├── pages
│   │   ├── index.js
│   │   ├── _app.js
│   │   ├── _document.js
│   │   ├── api
│   │   │   ├── auth
│   │   │   ├── ...
│   │   ├── ...
│   ├── lib
│   │   ├── mongodb.js
│   │   ├── ...
│   ├── styles
│   │   ├── global.css
│   │   ├── header.module.css
│   │   ├── layout.module.css
│   │   ├── ...
│   ├── ...
├── staging
│   │   ├── pages
│   │   ├── components
│   │   ├── lib
│   │   ├── styles
│   ├── ...
└── .gitignore
```

## Stack and Dependencies

### Notable Libraries and Packages

- Next-Auth
- SWR
- CSS Modules
- Framer Motion
- react-hot-toast
