import {
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

function Header() {
  return (
    <header>
      <SignedOut>
        <SignInButton afterSignInUrl="/translate" />
      </SignedOut>

      <UserButton />
    </header>
  );
}

export default Header;
