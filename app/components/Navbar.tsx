"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from "next/navigation";

import { ConnectButton, useActiveAccount, lightTheme } from "thirdweb/react";
import { client, chain } from "../utils/constant";

const Navbar = () => {
    const router = useRouter();
    const pathName = usePathname();
    const [isActive, setIsActive] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
     const account: any = useActiveAccount?.();


    useEffect(() => {
        setIsActive(pathName === "/" || pathName.includes("/market-place"));
    }, [pathName]);
// 
    return (
      <section className="flex bg-black z-10 shadow-lg justify-between h-[4rem] items-center fixed top-0 w-full max-w-[1300px] mx-auto py-2 md:py-4 px-4 md:px-10 font-orbitron">
        <div className="flex items-center">
          <Image
            src={"/assets/images/chainStore.svg"}
            width={150}
            height={150}
            className="p-1"
            alt="chain store logo"
          />
        </div>
        <div className="hidden md:flex gap-4">
          <Link
            href={"/"}
            className={
              pathName === "/"
                ? "text-[#69F5F5] underline-offset-2 font-semibold underline"
                : "text-white font-semibold"
            }
          >
            Home
          </Link>
          <Link
            href={"/market-place"}
            className={
              pathName === "/market-place"
                ? "text-[#69F5F5] font-semibold underline underline-offset-2"
                : "text-white font-semibold"
            }
          >
            Marketplace
          </Link>
        </div>
        <div className="hidden md:flex gap-4 items-center">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-xl text-[#00FFFF]"
          />
          {account != undefined ? (
            <div className="h-fit w-fit">
              <ConnectButton
                client={client}
                chain={chain}
                theme={lightTheme({
                  colors: {
                    modalBg: "#008080",
                    borderColor: "#008080",
                    accentText: "#000000",
                    primaryButtonBg: "#008080",
                    secondaryText: "#000000",
                    primaryText: "#000000",
                    primaryButtonText: "#000000",
                    secondaryIconColor: "#000000",
                  },
                })}
                connectButton={{
                  label: "Generate Wallet",
                }}
                connectModal={{
                  title: "Chainstore",
                  showThirdwebBranding: false,
                }}
              />
            </div>
          ) : (
            <button
              className="mt-2 py-2 px-4 w-full rounded-[1.25rem] text-sm text-white border-2 border-[#008080]"
              onClick={() => router.push("/login")}
            >
              Connect Wallet
            </button>
          )}
        </div>
        <div className="md:hidden">
          <FontAwesomeIcon
            icon={faBars}
            className="text-xl text-[#00FFFF] cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
        {isMenuOpen && (
          <div className="absolute top-[4rem] left-0 w-full bg-black p-4 md:hidden">
            <Link
              href={"/"}
              className={
                pathName === "/"
                  ? "block py-2 text-[#69F5F5] underline-offset-2 font-semibold underline"
                  : "block py-2 text-white font-semibold"
              }
            >
              Home
            </Link>
            <Link
              href={"/market-place"}
              className={
                pathName === "/market-place"
                  ? "block py-2 text-[#69F5F5] font-semibold underline underline-offset-2"
                  : "block py-2 text-white font-semibold"
              }
            >
              Marketplace
            </Link>
            {account != undefined ? (
              <div className="h-fit w-fit">
                <ConnectButton
                  client={client}
                  chain={chain}
                  theme={lightTheme({
                    colors: {
                      modalBg: "#008080",
                      borderColor: "#008080",
                      accentText: "#000000",
                      primaryButtonBg: "#008080",
                      secondaryText: "#000000",
                      primaryText: "#000000",
                      primaryButtonText: "#000000",
                      secondaryIconColor: "#000000",
                    },
                  })}
                  connectButton={{
                    label: "Generate Wallet",
                  }}
                  connectModal={{
                    title: "Chainstore",
                    showThirdwebBranding: false,
                  }}
                />
              </div>
            ) : (
              <button
                className="mt-2 py-2 px-4 w-full rounded-[1.25rem] text-sm text-white border-2 border-[#008080]"
                onClick={() => router.push("/login")}
              >
                Connect Wallet
              </button>
            )}
          </div>
        )}
      </section>
    );
}

export default Navbar;