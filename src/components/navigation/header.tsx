import { titleFont } from "@/components/typography/fonts";
import { genders } from "@/lib/genders";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { Cart } from "./shopping-cart";
import { SidebarButton } from "./sidebar-button";
import { LogIn, LogOut } from "lucide-react";
import { auth, signOut } from "@/auth";
import { Button } from "../ui/button";

export const Header = async () => {
  const session = await auth();

  return (
    <nav className=" p-4 sticky top-0 z-10 bg-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className={`${titleFont} text-xl font-bold`}>
          Teslo Shop
        </Link>

        <ul className="hidden md:flex space-x-6">
          {genders.map((gender) => (
            <li key={gender.url}>
              <Link
                href={`/gender/${gender.url}`}
                className="hover:underline cursor-pointer transition-all duration-300"
              >
                {gender.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <Cart />
          <SearchIcon />
          <SidebarButton />

          {/* TEMPORAL */}
          {session?.user ? (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button variant="destructive">
                <LogOut />
              </Button>
            </form>
          ) : (
            <Button asChild>
              <Link href={"/api/auth/signin"}>
                <LogIn />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
