import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: process.env.APOLLO_URI,
	cache: new InMemoryCache(),
	headers: {
		authorization: process.env.APOLLO_TOKEN
	}
});

export default client;
