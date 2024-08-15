"use server";

export const getUserStatus = async () => {
  const response = await fetch(process.env.API_URI as string);
  console.log(response);
};
