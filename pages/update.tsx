import axios from "axios";

const mutate = async (id, tl, rt, bd) => {
  const url = "http://localhost:1337/graphql"

  const body = {
    query: `
      mutation graphqlUpdateReview(
        $id: ID!
        $title: String!
        $rating: Int!
        $body: String!
      ) {
        updateReview(
          id: $id
          data: {
            title: $title
            rating: $rating
            body: $body
          }
        ) {
            data {
              attributes {
                title
                rating
                body
              }
            }
        }
      }
    `,
    variables: {
      id: id,
      title: tl,
      rating: rt,
      body: bd
    }
  };

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  await axios.post(url, body, config);
};

const query = async (id) => {
  const url = "http://localhost:1337/graphql"

  const body = {
    query: `
      query graphqlGetReview(
        $id: ID!
      ) {
        review(
          id: $id
        ) {
            data {
              attributes {
                title
                rating
                body
              }
            }
        }
      }
    `,
    variables: {
      id: id
    }
  };

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  await axios.post(url, body, config);
};

const update = () => {
  return (
    <div>
      <form>
        <h1>Get Info</h1>
        <label htmlFor="id">Type ID: </label>
        <input 
          type="text" 
          placeholder="type id"
          id="id"
        ></input>

        <button>Get</button>
      </form>
    </div>
  );
}

export default update;