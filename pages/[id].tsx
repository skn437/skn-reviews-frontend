import client from "@/Apollo/client";
import { gql } from "@apollo/client";
import ReactMarkdown from "react-markdown";

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
  /* 
  //const params = [...data.reviews.data]; 
  */
  const paths = data.reviews.data.map((param) => {
    return {
      params: { 
        id: param.id.toString()
      }
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (paths) => {
  const id = paths.params.id;
  const REVIEW = {
    query: gql`
      query getReview($id: ID!) {
        review(id: $id) {
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
    },
  };

  try {
    const { data } = await client.query(REVIEW);

    return {
      props: {
        getReview: data.review
      },
      revalidate: 10
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
      <p><strong>Title:</strong> {data.attributes.title}</p>
      <p><strong>Rating:</strong> {data.attributes.rating}</p>
      <ReactMarkdown>{data.attributes.body}</ReactMarkdown>
    </div>
  );
};

export default Details;