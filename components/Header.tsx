import {
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between px-8 border-b mb-5">
      <div className="flex items-center h-20 overflow-hidden">
        <Link href="/">
          <Image
            src="https://links.papareact.com/xgu"
            alt="logo"
            width={200}
            height={100}
            className="object-contain h-32 cursor-pointer"
          />
        </Link>
      </div>

      <SignedOut>
        <SignInButton afterSignInUrl="/translate" />
      </SignedOut>

      <div className="relative flex items-center">
        <UserButton />
      </div>
    </header>
  );
}

export default Header;
