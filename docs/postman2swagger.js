import { transpile } from "postman2openapi";
import collection from './Products.postman_collection.json'assert { type: 'json' };


// node postman2swagger.js > swagger.json
// Returns a JavaScript object representation of the OpenAPI definition.
const openapi = transpile(collection);

console.log(JSON.stringify(openapi, null, 2));