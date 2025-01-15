# My Money Stats - Backend

## About the project

Codebase for my portfolio.

Fullstack application:  
&nbsp;&nbsp;&nbsp;&nbsp;-Frontend> UI> React.js (./dist)  
&nbsp;&nbsp;&nbsp;&nbsp;-Backend> Server-side logic> Node.js with Express. (Handling HTTP requests, interacting with database, authentication, data processing)  
&nbsp;&nbsp;&nbsp;&nbsp;-Database: MongoDB.

## About the application

A financial control app. Designed to help manage and monitor their finances efficiently. This app allow you to organize income, expenses, budgets, investments, and debts, offering a clear view of your financial status in real time. Its main goal is to help you make informed financial decisions, improve planning, and avoid financial mistakes.

Link to my online application:

https://mymoneystats-backend.onrender.com

## Requirements

-   Node.js >= 22.x
-   npm or yarn
-   Git

## Table of contents

- [My Money Stats - Backend](#my-money-stats-backend)
  - [About the project](#about-the-project)
  - [About the application](#about-the-application)
  - [Table of contents](#table-of-contents)
  - [First steps](#first-steps)
  - [Technologies](#technologies)
  - [Developer](#developer)

  ## First steps

> [!NOTE]
> The project connects to a MongoDB database. To deploy the project locally, you can either choose to connect to a local MongoDB database (using MongoDB Community Edition) and manage the database yourself, or you can opt to connect the project to an online MongoDB Cluster.  
In either case, it is important to define environment variables before deploying the project ('.env'):  
&nbsp;&nbsp;&nbsp;&nbsp;-MONGODB_URI  
&nbsp;&nbsp;&nbsp;&nbsp;-PORT (define the listening port: 3001 or another)  

1. Clone the repository

```bash
git clone https://github.com/cana2302/MyMoneyStats_Backend
```

2. Enter to project folder

```bash
cd MyMoneyStats_Backend
```

3. Install dependencies

```bash
npm install
```

4. Local deploy of the project as developer:

```bash
npm run dev
```

5. Insert in the browser http://localhost:3001/

## Technologies

This project use React.js as frontend.  
At backend using Node.js with Express, Mongoose, CORS, Dotenv and ESlint for maintain good practices and standards.  

Se utiliza la libreria bcrypt para almacenar los hash en la base de datos.  
Se utiliza la libreria jwt para generar token para la autenticacion de los usuarios.  

## Developer

- Franco Ariel Canavese

## License

This project is licensed under the [MIT License](LICENSE).

