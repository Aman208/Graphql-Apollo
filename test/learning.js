const {
    ApolloServer,
    gql
  } = require('apollo-server');

  var product_list = [{ 
    id : 1 ,
    name : "Apple" ,
    description : "Apple des"
} ,
{ 
    id : 2 ,
    name : "Banana" ,
    description : "Banana des"
} ,
{ 
    id : 3 ,
    name : "Grapes" ,
    description : "Grapes des"
}
];

  const typeDefs = gql`

  type Query {
    products: [Product]
    product(id: Int!): Product
  }

  type Product {
    id: Int
    name: String
    description: String
  }

 
  
  input PostAndMediaInput {
    name: String
    description: String
  }
 

  type Mutation {
    login(email: String  , password : String ): String
    createProduct(name : String  , description : String): Product
    createPost(post: PostAndMediaInput): Product
  }
`;



const getProducts =  () => {
    return Promise.resolve(product_list);
  }

  const getProductById = ({ productId }) => {
    return Promise.resolve(product_list.find(p => p.id === productId));
  }

  const createProduct = ({ name , description }) => {

    const newId = product_list.length === 0 ? 1: product_list[product_list.length-1].id + 1;
    product_list = [  ...product_list, { name ,description, id: newId}];
    return Promise.resolve(product_list.find(p => p.id === newId));
  }

  const createPost =  ({post} ) => {

    const newId = product_list.length === 0 ? 1: product_list[product_list.length-1].id + 1;
    product_list = [  ...product_list, { ...post , id: newId}];

    return Promise.resolve(product_list.find(p => p.id === newId));


  }

const resolvers = {
    Query: {
    products: async () => getProducts() ,
    product: async ( _ , { id }) => getProductById({ productId: id })
  },
  Mutation: {
    createProduct: async (_, { name , description }) => createProduct({name , description }) ,
    createPost :  async ( _ , {post}) => createPost({post})
  }

}


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});