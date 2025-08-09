import axios from "axios";

//Save or update user in database
export const saveUserInDB = async (user) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/user`,
    user
  );
  console.log(data);
};
