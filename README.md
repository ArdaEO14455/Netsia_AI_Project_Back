# Netsia AI Project Back End

This AI application is designed to work as a development tool for company developers. Sharing many of its components and concepts with chatGPT, it serves as a conversation platform to interact with the AI.

## Prerequisites

Ensure that you have the following software installed:

    Node.js (version 16.x or later)
    npm (version 7.x or later) or yarn (version 1.x or later)
    Python 3.x (for virtual environment setup)

Once you've cloned the repository, change directory to the parent of 'my-app'. Ensure that you have the following software installed:

    Node.js (version 16.x or later)
    npm (version 7.x or later) or yarn (version 1.x or later)
    Python 3.x (for virtual environment setup)check that node and npm are installed:


### Virtual Environment Activation:

then activate the virtual environment in your terminal:
 - **On Windows:**

        ```bash
        nodeenv env
        .\env\Scripts\activate
        ```

    - **On macOS/Linux:**

        ```bash
        nodeenv env
        source env/bin/activate
        ```

### Libraries
Ensure that you are in the Back_End directory, and install dependencies within the virtual environment:

    npm install

Use check that depenencies are installed in the terminal: 

    npm list

check that you have the following libraries:

bcryptjs@2.4.3
cors@2.8.5
dotenv@16.4.5
express@4.19.2
jsonwebtoken@9.0.2
mongodb@6.8.0
mongoose@8.5.3
node-fetch@3.3.2
nodemon@3.1.4

## Important Libraries:

#### Mongoose: 
Mongoose is a Object Data Modelling (Library) that provides structured methods to interact with MongoDB. it allows for the creation of object schemas, including field types, validation rules and data sanitisation .

#### Cors: 
Controls how resources on your server are shared across different domains. By default, web browsers block requests from different origins (domains) for security reasons. The cors library allows you to specify which origins (domains) are allowed to make requests to your server.

#### Node-Fetch: 
Allows fetch requests to be made to the python webserver to communicate with AI

#### Dotenv
Mainly for development in a virtual environment, dotenv loads environment variables from a .env file into process.env. This is useful for storing sensitive information like database connection strings, API keys, or any configuration that should not be hardcoded in your source code.

#### Express
Provides the core framework for building your server and API. Express is a lightweight and flexible Node.js framework that simplifies building web applications and APIs. It handles routing, middleware, and server-side logic.

#### Bcrypt
Facilitates password encryption, decryption and comparison during login.

#### Jsonwebtoken
allows for the creation & signing of JSON Web tokens, which are then passed to the front-end, stored locally, and presented to the API for authentication.

#### Nodemon

Purely for development purposes, this library allows changes to be made to the source code to be reflected without having to restart the server. if you are using nodemon, make sure the following is added to your scripts in package.json:

"dev": "nodemon src/index.js"

you should be able to activate the server with:

npm run dev
(if you are using nodemon)

or

npm start

Your development server should be http://localhost:8000, remember to add this to your front end as the REACT_APP_API_KEY in your environmental variables.

## Other Dependencies & Environmental Variables

As this application is in development, it requires two other repositories to be utilized:

Node.js API: https://github.com/ArdaEO14455/Netsia_AI_Project_Front
Python Webserver (AI): https://github.com/atabahr/Flask

Set up the React Frontend using the README in that repository. Ensure that the your API's URI is added to the env in the front-end repository under REACT_APP_API_KEY

You will also need to set up the Python Webserver in a local development, and place the URI into the Node.js environmental variables under PYTHON_WEBSERVER_URL

You must also define the JWT_SECRET variable in the .env file in order to authenticate & provide tokens. Note that any long string can be applied here.


## PlantUML Sequence Diagram:
![PlantUML Sequence Diagram](/docs/plantuml_sequence_diagram.png)