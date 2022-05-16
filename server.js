var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    cars: [Car]
  }

  type Mutation {
    createCar(input: CreateCarInput): Car
  }

  input CreateCarInput {
    year: String
    model: String
    make: String
  }

  type Car {
    year: String
    model: String
    make: String
  }
`);

const cars = [];

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  cars: () => {
    return cars;
  },
  createCar: (input) => {
    cars.push(input.input);
    return input.input;
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4001);
console.log('Running a GraphQL API server at http://localhost:4001/graphql');
