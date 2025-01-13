"use server";

import { signIn } from "@/auth";

export async function signInWithCredentials(credentials: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
    }, { redirectTo: "/" }, );

    return true;
  } catch (error) {
    console.log(error);
  }
}
