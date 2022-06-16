import client from "@/Apollo/client";
import { gql } from "@apollo/client";
import { useState } from "react";

const DELETE_REVIEW = gql`
  mutation gqlDeleteReview(
    $id: ID!
  ) {
    deleteReview(
      id: $id
    ) {
        data {
          id
          attributes {
            title
          }
        }
    }
  }
`;

const deleteR = () => {
  const [idd, setIDD] = useState("");
  return (
    <div>
      <label htmlFor="delete">Enter ID: </label>
      <input
        type="text"
        id="delete"
        value={idd}
        onChange={(e) => {
          setIDD(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          client
            .mutate({
              mutation: DELETE_REVIEW,
              variables: {
                id: idd
              }
            })
            .then(() => {
              console.log(`Deleting...`);
            })
            .catch((err) => {
              console.log(`Error: `, err.message);
            })
            .finally(() => {
              console.log(`Process finished`);
            });
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default deleteR;