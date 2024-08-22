# Netsia_AI_Project_Back

check that node and npm are installed:

node -v
npm -v

install nodeenv, then create & initialise the virtual environment:

pip install nodeenv
nodeenv env
source env/bin/activate


## Important Libraries:

### Mongoose:
npm install mongoose

### Cors: 
Controls how resources on your server are shared across different domains. By default, web browsers block requests from different origins (domains) for security reasons. The cors library allows you to specify which origins (domains) are allowed to make requests to your server.

npm instal cors

### Dotenv
Mainly for development in a virtual environment, dotenv loads environment variables from a .env file into process.env. This is useful for storing sensitive information like database connection strings, API keys, or any configuration that should not be hardcoded in your source code.
npm install dotenv

### Express
Provides the core framework for building your server and API. Express is a lightweight and flexible Node.js framework that simplifies building web applications and APIs. It handles routing, middleware, and server-side logic.
npm install express

### MongoDB
npm install mongodb

### Mongoose
Provides a schema-based solution to model your MongoDB data. Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It allows you to define schemas for your MongoDB collections and provides a straightforward API for querying and manipulating the data.

npm install mongoose



you should be able to activate the server with:

npm start

