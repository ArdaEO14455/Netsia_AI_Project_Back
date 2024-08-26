## Netsia AI Project Back End

This AI application is designed to work as a development tool for company developers. Sharing many of its components and concepts with chatGPT, it serves as a conversation platform to interact with the AI.

### Prerequisites

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
        nodeenv venv
        .\venv\Scripts\activate
        ```

    - **On macOS/Linux:**

        ```bash
        nodeenv venv
        source venv/bin/activate
        ```

Ensure that you are in the my-app directory, and install dependencies within the virtual environment:

    npm install

Use check that depenencies are installed in the terminal: 

    npm list

check that you have the following libraries:

cors@2.8.5  
dotenv@16.4.5  
express@4.19.2  
mongodb@6.8.0  
mongoose@8.5.3  

## Important Libraries:

#### Mongoose: 
Mongoose is a Object Data Modelling (Library) that provides structured methods to interact with MongoDB. it allows for the creation of object schemas, including field types, validation rules and data sanitisation .

#### Cors: 
Controls how resources on your server are shared across different domains. By default, web browsers block requests from different origins (domains) for security reasons. The cors library allows you to specify which origins (domains) are allowed to make requests to your server.


#### Dotenv
Mainly for development in a virtual environment, dotenv loads environment variables from a .env file into process.env. This is useful for storing sensitive information like database connection strings, API keys, or any configuration that should not be hardcoded in your source code.
npm install dotenv

#### Express
Provides the core framework for building your server and API. Express is a lightweight and flexible Node.js framework that simplifies building web applications and APIs. It handles routing, middleware, and server-side logic.
npm install express

you should be able to activate the server with:

npm start

Your development server should be http://localhost:8000, remember to add this to your front end as the REACT_APP_API_KEY in your environmental variables for development.