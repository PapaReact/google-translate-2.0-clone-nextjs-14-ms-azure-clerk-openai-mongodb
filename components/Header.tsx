import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const { userId } = auth();

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

      {userId ? (
        <div className="relative flex items-center">
          <UserButton />
        </div>
      ) : (
        <SignInButton afterSignInUrl="/translate" mode="modal" />
      )}
    </header>
  );
}

export default Header;
