"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Navbar = () => {
  const { data: session } = useSession();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetchProviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="promptopia logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promtopia</p>
      </Link>
      {/* Desktop navigation*/}
      <div className="sm:flex hidden gap-4">
        {session?.user ? (
          <>
            <Link href="/create-prompt" className="black_btn">
              Create
            </Link>

            <button className="outline_btn" type="button" onClick={signOut}>
              SignOut
            </button>

            <Link href="/profile">
              <Image
                src={session?.user?.image}
                width={37}
                height={37}
                className="object-contain rounded-full"
                alt="profile logo"
              />
            </Link>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    SignIn
                  </button>
                );
              })}
          </>
        )}
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <>
            <Image
              src={session?.user?.image}
              alt="promptopia logo"
              width={30}
              height={30}
              className="object-contain rounded-full"
              onClick={() => setToggleMenu((prevState) => !prevState)}
            />
            {toggleMenu && (
              <div className="dropdown flex flex-col items-center">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleMenu(false)}
                >
                  Profile
                </Link>

                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleMenu(false)}
                >
                  Create prompt
                </Link>

                <button className="black_btn mt-5 w-full">Sign Out</button>
              </div>
            )}
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    SignIn
                  </button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
