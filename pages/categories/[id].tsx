import client from "@/Apollo/client";
import { gql } from "@apollo/client";
import Link from "next/link";

const CATEGORIES = {
  query: gql`
   query getCategories {
      categories {
        data {
          id
        }
      }
    } 
  `
};

export const getStaticPaths = async () => {
  const { data } = await client.query(CATEGORIES);
  const paths = data.categories.data.map((param) => {
    return {
      params: {
        id: param.id.toString()
      }
    };
  });

  return {
    paths: paths,
    fallback: false
  };
};

export const getStaticProps = async (paths) => {
  const id = paths.params.id;
  const CATEGORY = {
    query: gql`
      query getCategory($id: ID!) {
        category(id: $id) {
          data {
            id
            attributes {
              name
              reviews {
                data {
                  id
                  attributes {
                    title
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
          }
        }
      } 
    `,
    variables: {
      id: id
    } 
  };

  try {
    const { data } = await client.query(CATEGORY);

    return {
      props: {
        getCategory: data.category
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

  const data  = props.getCategory.data;
  if (!data) return <div>Loading....</div>

  const data2 = props.getCategory.data.attributes.reviews.data;

  return (
    <div>
      <h1>Category: {data.attributes.name}</h1>
      {data2.map((doc) => (
        <div key={doc.id}>
          <Link href={`/${doc.id}`}><a>{doc.attributes.title}</a></Link>
        </div>
      ))}
    </div>
  );
}

export default Details;