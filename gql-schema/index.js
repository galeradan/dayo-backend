// GraphQL dependencies.

const {
    GraphQLSchema
} = require('graphql')

// Schema export.

module.exports = new GraphQLSchema({
    query: require('./queries'),
    mutation: require('./mutations')
})