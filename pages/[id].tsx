import client from "@/Apollo/client";
import { gql } from "@apollo/client";

const REVIEW_ID = {
  query: gql`
    query getReview {
      reviews {
        data {
          id
        }
      }
    }
  `,
};

export const getStaticPaths = async () => {
  const { data } = await client.query(REVIEW_ID);
  //const params = [...data.reviews.data];
  const paths = data.reviews.data.map((param) => {
    return {
      params: { id: param.id.toString() }
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const REVIEW = {
    query: gql`
      query getReview($id: ID!) {
        review(id: $id) {
          data {
            id
            attributes {
              title
              rating
            }
          }
        }
      }
    `,
    variables: {
      id: id
    },
  };

  try {
    const { data } = await client.query(REVIEW);

    return {
      props: {
        getReview: data.review
      }
    };

  } catch (err) {
      return {
        props: {
          error: err.message
        }
      };
    }
};

const Details = (props) => {
  if (props.error) return <div>{props.error}</div>

  const { data } = props.getReview;

  if (!data) return <div>Loading....</div>

  return (
    <div>
      <p>Title: {data.attributes.title}</p>
      <p>Rating: {data.attributes.rating}</p>
    </div>
  );
};

export default Details;