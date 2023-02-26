<p align="center">
  <a href="#" target="_blank">
    <img 
      src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677358851/fit-fiesta/placeholders/FITFIESTA-removebg-preview_bzf3ww.png"
      alt="FitFiesta"
      title="FitFiesta"
      width="500"
    />
    <br/>
  </a>
</p>

<h1 align="center">FitFiesta</h1>
 <p align="center">
   FitFiesta is a social network platform designed to connect and motivate fitness enthusiasts to lead a healthy lifestyle. Users can share their fitness journeys,  and connect with like-minded individuals to support and encourage one another.
    <br />
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="https://github.com/satishnaikawadi2011/fit-fiesta/issues">Report Bug</a>
    ·
    <a href="https://github.com/satishnaikawadi2011/fit-fiesta/issues">Request Feature</a>
  </p>

  <p align="center">
  <a href="#" target="_blank">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677359546/fit-fiesta/screenshots/landing-page_ljx1dn.png" title="FitFiesta" alt="FitFiesta"
/>
</a>
</p>

## Table of Contents
- [Project Breakdown](#project-breakdown)
- [About the Project](#about-the-project)
  - [Built With](#built-with)
  - [Features](#features)
  - [Screenshots](#screenshots)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contact](#maintainer)
- [Support](#support)
- [License](#license)
- [Deployment](#deployment)

## Project Breakdown
- ### `client`
    - #### `public` - This folder holds static files used in this project like favicons,etc. 
    - #### `src`
        - #### `api` - This folder holds API configuration and endpoints for communicating to server 
        - #### `app` - This folder holds global react state of the application created with redux toolkit
        - #### `assets` - This folder holds assets such as images, JSON Data and fonts
        - #### `components` - This folder holds all of the different components that will make up views of the application
        - #### `constants` - This folder holds constant variables used throughout the client application
        - #### `hooks` - This folder holds the custom react hooks used in the projects
        - #### `icons` - This folder holds all of the different custom svg icons as react components
        - #### `pages` - This folder holds different pages in the appliction as react components
        - #### `routes` - This folder holds different routes in application created with react-router-dom and categorized as AuthenticatedRoutes,UnauthenticatedRoutes.
        - #### `services` - This folder holds the different custom and  3rd party service APIs
        - #### `socket` - This folder holds the client side setup for socket-io library
        - #### `style` - This folder holds the files related to theme of the application and some custom changes to it.
        - #### `types` - This folder holds the different type definitions and interfaces to define structure of some entities in the application
        - #### `utils` - This folder holds some of the custom utility functions used
        - #### `App.css` - This file has some global styling code used in the application
        - #### `App.tsx` - This is what renders all of our browser routes and different pages
        - #### `main.tsx` - This is what renders the react app by rendering App.tsx, should not change
        - #### `gobal.d.ts` - This file helps project to maintain type safety for npm dependencies which doesn't have type declarations
    - #### `index.html` - This file holds the html code of our single page react application
    - #### `package.json` - Defines npm behaviors and packages for the client
    - #### `tsconfig.json` - Specifies the root files and the compiler options required to compile the project.
- ### `server`
    - #### `constants` - This folder holds constant variables used throughout the server application
    - #### `controllers` - This folder holds different controller functions written to control business logic of api routes
    - #### `middlewares` - This folder holds different middlewares used in server application such as authentication,error handling,etc.
    - #### `models` - This folder holds different database schemas used in the entire application.
    - #### `routes` - This folder holds different api routes in the server application
    - #### `utils` - This folder holds some of the custom utility functions used
    - #### `validation` - This folder holds some of the custom validation functions written to validate body of the request sent by the user and give proper feedback
    - #### `app.ts` - This file is what runs when our appication starts and holds whole server application together
    - #### `package.json` - Defines npm behaviors and packages for the server application
- #### 🙈`.gitignore` - Tells git which files to ignore
- #### 🔐 `LICENSE` - This file outlines the terms and conditions for using and distributing the software.
- #### 📝README.md - This file!
