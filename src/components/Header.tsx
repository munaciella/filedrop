import Image from "next/image"
import Link from "next/link"
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { ThemeToggle } from "./ThemeToggle"

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <div className="bg-[#0160FE] w-fit">
          <Image
            src="https://www.shareicon.net/download/2016/07/13/606936_dropbox_2048x2048.png"
            alt="logo"
            className="invert"
            height={50}
            width={50} 
          />
        </div>
        <h1 className="font-bold text-xl">Filedrop</h1>
      </Link>

      <div className="px-5 flex space-x-2 items-center">
        <ThemeToggle />

        <UserButton />

        <SignedOut>
          <SignInButton 
            forceRedirectUrl="/dashboard" // ✅ Always redirects to /dashboard after signing in
            fallbackRedirectUrl="/"       // ✅ If no previous URL exists, redirect to homepage
            mode="modal" 
          />
        </SignedOut>
      </div>
    </header>
  )
}

export default Header;
