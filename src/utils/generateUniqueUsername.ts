import { generateFromEmail } from "unique-username-generator";

export const generateUniqueUsername = (email: string) => {
  return generateFromEmail(email);
};
