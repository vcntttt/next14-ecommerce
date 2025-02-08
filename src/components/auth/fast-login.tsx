"use client";
import { signInWithCredentials } from "@/actions/auth/login";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export const FastLogin = () => {
  async function handleSignInWithCredentials(data: {
    email: string;
    password: string;
  }) {
    try {
      await signInWithCredentials(data);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Card className="max-w-sm md:absolute md:bottom-0 md:right-5 md:top-0 h-fit my-auto">
      <CardHeader>
        <CardTitle>Acceso rapido</CardTitle>
        <CardDescription>
          Accede directamente con cuentas de prueba para explorar la aplicación.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button
          onClick={() =>
            handleSignInWithCredentials({
              email: "admin@shop.com",
              password: "123456",
            })
          }
        >
          Ingresar como administrador
        </Button>
        <Button
          onClick={() =>
            handleSignInWithCredentials({
              email: "user@shop.com",
              password: "123456",
            })
          }
        >
          Ingresar como cliente
        </Button>
      </CardContent>
      <CardFooter>
        <CardDescription>
          Si tienes tiempo, por favor,{" "}
          <Link className="underline" href="/auth/register">
            crea una cuenta
          </Link>{" "}
          y prueba la experiencia real de autenticación.
        </CardDescription>
      </CardFooter>
    </Card>
  );
};
