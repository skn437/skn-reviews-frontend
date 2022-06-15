import { UserStates } from "@/Recoil/atoms/UserStates";
import axios from "axios";
import { useRecoilState, useResetRecoilState } from "recoil";

const mutate = async (un, em, ps, cf) => {
  const uri = "http://localhost:1337/graphql";

  const body = {
    query: `
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
    `,
    variables: {
      username: un,
      email: em,
      password: ps,
      confirmed: cf
    }
  };
  
  const options = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const data = await axios.post(uri, body, options);
};

const create = () => {
  const [states, setStates] = useRecoilState(UserStates);
  const resetCount = useResetRecoilState(UserStates);

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await mutate(states.username, states.email, states.password, true);
          resetCount();
        }}
      >

        <label htmlFor="username">Enter Username: </label>
        <input 
          className="username"
          type="text" 
          value={states.username} 
          placeholder="enter username..."
          onChange={(e) => {
            setStates({
              ...states,
              username: e.target.value
            });
          }}
        ></input><br/>

        <label htmlFor="email">Enter Email: </label>
        <input 
          className="email"
          type="email" 
          value={states.email} 
          placeholder="enter email..."
          onChange={(e) => {
            setStates({
              ...states,
              email: e.target.value
            });
          }}
        ></input><br/>

        <label htmlFor="password">Enter Password: </label>
        <input 
          className="password"
          type="password" 
          value={states.password} 
          placeholder="enter password..."
          onChange={(e) => {
            setStates({
              ...states,
              password: e.target.value
            });
          }}
        ></input><br/>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default create;