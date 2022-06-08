const Project = require('../models/Project')
const Client = require('../models/Client')

const {GraphQLInputObjectType, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} = require('graphql')


//client type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString}
    })
});

//project type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(p,a) {
                return Client.findById(p.clientID);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: GraphQLList(ClientType),
            resolve(p,a) {
                return Project.find();
            }
        },
        client: {
            type: ClientType,
            args: { id: {type: GraphQLID} },
            resolve(p, a) {
                return Project.findById(a.id);
            }

        },
        projects: {
            type: GraphQLList(ProjectType),
            resolve(p,a) {
                return Client.find();
            }
        },
        project: {
            type: ProjectType,
            args: { id: {type: GraphQLID} },
            resolve(p, a) {
                return Client.findById(a.id);
            }

        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})