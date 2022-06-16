import client from "@/Apollo/client";
import { gql } from "@apollo/client"

const REVIEW = gql`
    mutation createUser(
    $username: String!
    $email: String!
    $password: String!
    $confirmed: Boolean
  ) {
    createUsersPermissionsUser(
      data: {
        username: $username
        email: $email
        password: $password
        confirmed: $confirmed
      }
    ) {
        data {
          attributes {
            username
            email
            confirmed
          }
        }
      }
    }
  `

const Home = () => {
  return (
    <div>
      <button
        onClick={(e) => {
          client
          .mutate({
            mutation: REVIEW,
            variables: {
              username: "Hell",
              email: "helly@gmail.com",
              password: "123456",
              confirmed: true 
            }
          })
          .then((result) => {
            console.log("hello")
          })
          .catch((err) => {
            console.log(err.message);
          });
        }}
      >
        Hell Post
      </button>
    </div>
  );
}

export default Home;