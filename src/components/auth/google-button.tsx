import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/icons/google";

export const GoogleButton = () => {
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => {
        signIn("google", { redirectTo: "/" });
      }}
    >
      <GoogleIcon />
      Login with Google
    </Button>
  );
};
