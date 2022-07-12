import { SAVE_USER, CLEAR_USER } from "./action_types";

export const saveUser = (user_json) => ({
  type: SAVE_USER,
  payload: user_json,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});