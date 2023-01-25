import { validate } from "email-validator";

export const validateEmail = (email: string) => validate(email);
