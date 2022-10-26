import axios from "config";

export const login = (credentials) => axios.post("/users/sign_in", credentials);
