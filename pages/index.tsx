import type { NextPage } from "next";
import client from "@/Apollo/client";
import { useEffect, useRef } from "react";
import { gql } from "@apollo/client";

const REVIEWS = {
  query: gql`
    query getReviews {
      reviews {
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
  `,
};

export const getStaticProps = async (context) => {
  try {
    const { data } = await client.query(REVIEWS);

    return {
      props: {
        getReviews: data.reviews
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

const Home = (props) => {
  const renderCount = useRef(0);
  useEffect(()=> {
    renderCount.current = renderCount.current + 1;
  });
	if (props.error) return <div>{props.error}</div>;

  const { data } = props.getReviews;
  //console.log(data);
	if (!data) return <div>Loading....</div>;

	return (
		<div>
      <h1>This page rendered {renderCount.current} times</h1>
			{data.map((doc) => (
				<div key={doc.id}>
					<p>{doc.attributes.title}</p>
          <p>{doc.attributes.rating}</p>
				</div>
			))}
		</div>
	);
};

export default Home;

