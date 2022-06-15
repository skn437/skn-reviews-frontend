import { atom } from "recoil";

export const UserStates = atom({
  key: "user-states",
  default: {
    username: "",
    email: "",
    password: ""
  }
});