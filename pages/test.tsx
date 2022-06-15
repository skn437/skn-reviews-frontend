import axios from "axios";
import { useRouter } from "next/router";

const uri = "http://localhost:1337/graphql";
const body = {
  query: `
    mutation createReview(
      $title: String!
      $rating: Int!
      $body: String!
      $categories: [ID]
    ) {
      createReview(
        data: {
          title: $title
          rating: $rating
          body: $body
          categories: $categories
        }
      ) {
          data {
            attributes {
              title
              rating
              body
              categories {
                data {
                  attributes {
                    name
                  }
                }
              }
            }
          }    
      }
    }
  `,
  variables: {
    title: "Prapti Prapti",
    rating: 10,
    body: "I don't know",
    categories: [3]
  }
};

const options = {
  headers: {
    "Content-Type": "application/json"
  }
};

const mutate = async () => {
  const data = await axios.post(uri, body, options);
};

const test = () => {
  const router = useRouter();

  return (
    <div>
      <button
        onClick={async () => {
          await mutate();
          router.push("/");
        }}
      >
        Post
      </button>
    </div>
  );
}



export default test;