import { titleFont } from "@/components/typography/fonts";
import { genders } from "@/lib/genders";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { Cart } from "./shopping-cart";
import { SidebarButton } from "./sidebar-button";
import { companyName } from "@/config";

export const Header = async () => {
  return (
    <nav className="py-4 sticky top-0 z-10 bg-white px-4 md:px-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className={`${titleFont} text-xl font-bold`}>
          {companyName}
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
        </div>
      </div>
    </nav>
  );
};
