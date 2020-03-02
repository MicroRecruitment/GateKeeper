# GateKeeper
## [The project wiki](https://microrecruitment.github.io/)
The GateKeeper is the front end of the application. It handles client requests.

## Installing
The application is built and run though [NPM](https://www.npmjs.com/). Run the following command to install the service:

npm install

After installing copy env.json.example to env.json and change the variables to be unique for your application. 

## Running
To start the application run the following command. Make sure that you start the other services as well.

npm start

## Code
The application starts executing in [app.js](https://github.com/MicroRecruitment/GateKeeper/app.js).

### Client code
The views and css codes are located in the /public directory. The views use [nunjucks](https://mozilla.github.io/nunjucks/) to render and inherit from the [layout.njk](https://github.com/MicroRecruitment/GateKeeper/public/views/layout.njk) template.

### Routing 
We are usng [express router](https://expressjs.com/en/guide/routing.html) for routing the clients requests. The routes are available in the [/routes](https://github.com/MicroRecruitment/GateKeeper/routes) directory.

### Queues
The application is using [RabbitMQ](https://www.rabbitmq.com/) for inter-service communication. Comfiguration is done in [/MQ/AMPQ.js](https://github.com/MicroRecruitment/GateKeeper/MQ/AMPQ.js)
