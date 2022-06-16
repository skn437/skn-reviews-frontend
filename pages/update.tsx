import client from "@/Apollo/client";
import { ReviewState } from "@/Recoil/atoms/ReviewState";
import { gql } from "@apollo/client";
import { useState } from "react";
import { useRecoilState } from "recoil";

const UPDATE_REVIEW = gql`
  mutation gqlUpdateReview(
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
          id
          attributes {
            title
            rating
            body
          }
        }
    }
  } 
`;

const GET_REVIEW = gql`
  query gqlGetReview(
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
`;

const update = () => {
  const [states, setStates] = useRecoilState(ReviewState);
 
  const getInfo = async (r_id) => {
    const {data} = await client.query({
      query: GET_REVIEW,
      variables: {
        id: r_id
      }
    });
    return data.review;
  };

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await getInfo(states.id);
          const data = await res.data
          setStates({
            id: states.id,
            attributes: {
              title: data.attributes.title,
              rating: data.attributes.rating,
              body: data.attributes.body
            }
          });
        }}
      >
        <label htmlFor="test_id">Enter ID: </label>
        <input
          type="text"
          id="test_id"
          value={states.id}
          onChange={(e) => {
            setStates({
              ...states,
              id: e.target.value
            });
          }}
        ></input>

        <button>Get Info</button>
      </form>
      
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await client.mutate({
            mutation: UPDATE_REVIEW,
            variables: {
              id: states.id,
              title: states.attributes.title,
              rating: states.attributes.rating,
              body: states.attributes.body
            }
          });
        }}
      >
        <h1>Update Form: </h1>

        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          value={states.attributes.title}
          onChange={(e) => {
            setStates({
              ...states,
              attributes: {
                ...states.attributes,
                title: e.target.value
              }
            });
          }}
        ></input>
        <p>Title: {states.attributes.title}</p>
        <br/>

        <label htmlFor="rating">Rating: </label>
        <input
          type="number"
          id="rating"
          value={states.attributes.rating}
          /*onChange={(e) => {
            setStates({
              ...states,
              attributes: {
                ...states.attributes,
                rating: e.target.value
              }
            });
          }}*/
        ></input>
        <p>Rating: {states.attributes.rating}</p>
        <br/>

        
        <label htmlFor="body">Rating: </label>
        <input
          type="text"
          id="body"
          value={states.attributes.body}
          onChange={(e) => {
            setStates({
              ...states,
              attributes: {
                ...states.attributes,
                body: e.target.value
              }
            });
          }}
        ></input>
        <p>Body: {states.attributes.body}</p>
        <br/>
        
        <button>Update Info</button>
      </form>

    </div>
  );
}

export default update;