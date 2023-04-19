/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */

const path = require("path");
const PORT = process.env.PORT || 52074;

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false,
});

// Setup our static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

// Formbody lets us parse incoming forms
fastify.register(require("@fastify/formbody"));

// View is a templating manager for fastify
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

/**
 * Our home page route
 *
 * Returns src/pages/index.hbs with data built into it
 */
fastify.get("/", function (request, reply) {
  let meals = require("./src/meals.json");
  let params = {
    meals: meals.meals,
    date: "Tuesday March 23",
  };

  return reply.view("/src/pages/index.hbs", params);
});

/**
 * Meal details page
 *
 * Returns src/pages/meal.hbs with data built into it
 */
fastify.get("/meal", function (request, reply) {
  let mealID = request.query.id;
  const meals = require("./src/meals.json");
  let params = { meal: meals.meals.find((m) => m.id.toString() === mealID) };

  return reply.view("/src/pages/meal.hbs", params);
});

/**
 * checkout page
 *
 * Returns src/pages/form.hbs with data built into it
 */
fastify.get("/checkout", function (request, reply) {
  let mealID = request.query.id;
  const meals = require("./src/meals.json");
  let params = { meal: meals.meals.find((m) => m.id.toString() === mealID) };

  return reply.view("/src/pages/checkout.hbs", params);
});

/**
 * Our POST route to handle and react to form submissions
 *
 * Accepts body data indicating the user choice
 */
fastify.post("/checkout", function (request, reply) {
  // Build the params object to pass to the template
  let params = { pickup: request.body.pickup, money: request.body.total };

  // The Handlebars template will use the parameter values to update the page with the chosen color
  return reply.view("/src/pages/thank_you.hbs", params);
});

/**
 * Playground page
 *
 * Returns src/pages/playground.hbs with data built into it
 */
fastify.get("/playground", function (request, reply) {
  let params = { foo: "bar" };

  return reply.view("/src/pages/playground.hbs", params);
});

// Run the server and report out to the logs
fastify.listen({ port: PORT, host: "127.0.0.1" }, function (err, address) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
});
