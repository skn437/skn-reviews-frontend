import client from "@/Apollo/client";
import { gql } from "@apollo/client";
import { useRecoilState, useResetRecoilState } from "recoil";
import { UserStates } from "@/Recoil/atoms/UserStates";

const CREATE_USER = gql`
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
`;

const create = () => {
  const [states, setStates] = useRecoilState(UserStates);
  const resetStates = useResetRecoilState(UserStates);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          client
            .mutate({
              mutation: CREATE_USER,
              variables: {
                username: states.username,
                email: states.email,
                password: states.password,
                confirmed: true
              }
            })
            .then(() => {
              console.log(`Mutating....`);
            })
            .catch((err) => {
              console.log(`Error: `, err.message);
            })
            .finally(() => {
              console.log(`Process done`);
            });
            resetStates();
        }}
      >
        <h1>Create User</h1>

        <label htmlFor="username">Enter Username: </label>
        <input
          type="text"
          id="username"
          placeholder="type username..."
          value={states.username}
          onChange={(e) => {
            setStates({
              ...states,
              username: e.target.value
            });
          }}
        ></input>
        <br/><br/>

        <label htmlFor="email">Enter Email: </label>
        <input
          type="email"
          id="email"
          placeholder="type email..."
          value={states.email}
          onChange={(e) => {
            setStates({
              ...states,
              email: e.target.value
            });
          }}
        ></input>
        <br/><br/>

        <label htmlFor="password">Enter Password: </label>
        <input
          type="password"
          id="password"
          placeholder="type password..."
          value={states.password}
          onChange={(e) => {
            setStates({
              ...states,
              password: e.target.value
            });
          }}
        ></input>
        <br/><br/>

        <button>Create User</button>
      </form>
    </div>
  );
}

export default create;