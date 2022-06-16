import { atom } from "recoil";

export const ReviewState = atom({
  key: "review-state",
  default: {
    id: "",
    attributes: {
      title: "",
      rating: 0,
      body: ""
    }
  }
});