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

## About The Project
The motivation behind building a health and wellness social networking platform is to provide a platform for individuals who are interested in health and wellness to connect with others who share similar interests, share tips and advice, and find local resources and events related to health and wellness.

By providing a space for users to connect with others, the platform can help to create a supportive community that can offer encouragement, motivation, and guidance.

This app basically have 2 different parts

#### 1. Frontend
The frontend is built with <strong>React JS</strong> and <strong>Typescript</strong> 

#### 2. Backend
The backend is built with <strong>Node JS</strong> and <strong>Typescript</strong> 

### Built With

- [React JS](https://reactjs.org/)
- [Node JS](https://nodejs.org/en/)

### Features

- Login and Registering new users to the app
- Sharing posts,bulding community via creating groups and adding events,resources
- Like and comment on other users post
- Connect with other users by sending them connection request
- Receive real time notifications of various activities related to user
- Real time private chat as well as group chat using messanger
- Beautiful UI with dark and light mode toggler
- Search various users,events,groups,posts,resources,etc.

### Screenshots

#### 1. Landing Page
<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677359546/fit-fiesta/screenshots/landing-page_ljx1dn.png" title="FitFiesta" alt="FitFiesta"/>
</p>

#### 2. Login and Register Pages
<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677360078/fit-fiesta/screenshots/login-page_njve3k.png" title="FitFiesta" alt="FitFiesta"/>
</p>

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677360077/fit-fiesta/screenshots/register-page_z5fva1.png" title="FitFiesta" alt="FitFiesta"/>
</p>

#### 3. Modals for adding posts,events,resources as well as creating groups

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408777/fit-fiesta/screenshots/add-post_t4tso4.png" title="FitFiesta" alt="FitFiesta"/>
</p>

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408777/fit-fiesta/screenshots/add-event_s5npsp.png" title="FitFiesta" alt="FitFiesta"/>
</p>

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408776/fit-fiesta/screenshots/add-resource_ekorcv.png" title="FitFiesta" alt="FitFiesta"/>
</p>

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408776/fit-fiesta/screenshots/create-group_eigjr5.png" title="FitFiesta" alt="FitFiesta"/>
</p>

#### 4. User Profile Page

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408776/fit-fiesta/screenshots/profile-page_igt03x.png" title="FitFiesta" alt="FitFiesta"/>
</p>

#### 5. Modals to edit user profile

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408776/fit-fiesta/screenshots/edit-profile-1_q5dt3z.png" title="FitFiesta" alt="FitFiesta"/>
</p>

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408776/fit-fiesta/screenshots/edit-profile-3_kzyxtf.png" title="FitFiesta" alt="FitFiesta"/>
</p>

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408776/fit-fiesta/screenshots/edit-profile-2_luogji.png" title="FitFiesta" alt="FitFiesta"/>
</p>

#### 6. Resources Page

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408285/fit-fiesta/screenshots/resources-page_qlnoil.png" title="FitFiesta" alt="FitFiesta"/>
</p

#### 7. Events Page

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408283/fit-fiesta/screenshots/events-page_nuplxz.png" title="FitFiesta" alt="FitFiesta"/>
</p>

#### 8. My Network Page

##### 8.1 Invitations

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408282/fit-fiesta/screenshots/my-network-4_irsjgh.png" title="FitFiesta" alt="FitFiesta"/>
</p>

##### 8.2 Connections

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408283/fit-fiesta/screenshots/my-network-3_hkr1mq.png" title="FitFiesta" alt="FitFiesta"/>
</p>

##### 8.3 Sent Requests

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408283/fit-fiesta/screenshots/my-network-2_luhgqm.png" title="FitFiesta" alt="FitFiesta"/>
</p>

##### 8.4 People

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408283/fit-fiesta/screenshots/my-network-1_ba9kxu.png" title="FitFiesta" alt="FitFiesta"/>
</p>

##### 8.5 Received Group Requests

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408282/fit-fiesta/screenshots/my-network-6_icauwl.png" title="FitFiesta" alt="FitFiesta"/>
</p>

##### 8.6 Sent Group Requests

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408282/fit-fiesta/screenshots/my-network-5_gdex4l.png" title="FitFiesta" alt="FitFiesta"/>
</p>

#### 9. Searching 

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408282/fit-fiesta/screenshots/search-1_ljh4eu.png" title="FitFiesta" alt="FitFiesta"/>
</p>


<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408283/fit-fiesta/screenshots/search-2_fjowdd.png" title="FitFiesta" alt="FitFiesta"/>
</p>

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408282/fit-fiesta/screenshots/search-3_gidlod.png" title="FitFiesta" alt="FitFiesta"/>
</p>

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408282/fit-fiesta/screenshots/search-4_fdhe4q.png" title="FitFiesta" alt="FitFiesta"/>
</p>

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408281/fit-fiesta/screenshots/search-5_tlydgu.png" title="FitFiesta" alt="FitFiesta"/>
</p>

#### 10. Notifications 

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408282/fit-fiesta/screenshots/notifications-1_xqykma.png" title="FitFiesta" alt="FitFiesta"/>
</p>

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677408282/fit-fiesta/screenshots/notifications-2_lvjbs9.png" title="FitFiesta" alt="FitFiesta"/>
</p>

#### 11. Messanger 

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677439950/fit-fiesta/screenshots/messanger-1_jugpnl.png" title="FitFiesta" alt="FitFiesta"/>
</p>

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677439949/fit-fiesta/screenshots/messanger-2_bb7hyf.png" title="FitFiesta" alt="FitFiesta"/>
</p>

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677439950/fit-fiesta/screenshots/messanger-4_ywjdly.png" title="FitFiesta" alt="FitFiesta"/>
</p>

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677439949/fit-fiesta/screenshots/messanger-3_nkkmcl.png" title="FitFiesta" alt="FitFiesta"/>
</p>

#### 12. Group Details Page 

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677439949/fit-fiesta/screenshots/group-details-page_kiaft8.png" title="FitFiesta" alt="FitFiesta"/>
</p>

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677439949/fit-fiesta/screenshots/group-details-page-2_bfj6tm.png" title="FitFiesta" alt="FitFiesta"/>
</p>

#### 13. Color Mode Toggler 

<p align="center">
<img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1677439949/fit-fiesta/screenshots/color-mode_nlxrpl.png" title="FitFiesta" alt="FitFiesta"/>
</p>

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

 
- NPM

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/satishnaikawadi2011/fit-fiesta
```

2. Install NPM packages for client

```sh
cd client

npm install
```

3. Install NPM packages for server

```sh
cd server

npm install
```

4. Define following environment variables with .env file for server

```sh
MONGO_URI
JWT_SECRET
CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

5. Start server application

```sh
cd server

npm run dev
```

6. Start Client application

```sh
cd client

npm run dev
```


## Usage

The primary goal of this project is to connect and motivate fitness enthusiasts to lead a healthy lifestyle.Users can share their fitness journeys, and connect with like-minded individuals to support and encourage one another.


## Roadmap

See the [open issues](https://github.com/satishnaikawadi2011/fit-fiesta/issues) for a list of proposed features (and known issues).

## Maintainer
Important decisions regarding the project are taken by the following maintainer.

| Satish        |
| :-------------: |
| <img  height="100" width="100" src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1650221859/github-profile/me-github_yumapj.jpg">      |
| [@satishnaikawadi2011](https://github.com/satishnaikawadi2011)      |
## Support

<a href="https://www.buymeacoffee.com/satishnaikawadi" target="_blank">
  <img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1649760399/repopup/bmc-button_bridqp.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" >
</a>

## License

**FitFiesta** is licensed under the [MIT License](https://github.com/satishnaikawadi2011/fit-fiesta/blob/main/LICENSE).
