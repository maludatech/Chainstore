"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ConnectButton, useActiveAccount, lightTheme } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { client, chain } from "../utils/constant";
import { getUserEmail } from "thirdweb/wallets/in-app";
import { useEffect, useState } from "react";
import Loading from "./loading";

const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "apple"],
    },
  }),
];

const Login = () => {
  const [accountConnected, setAccountConnected] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const account = useActiveAccount?.();

  useEffect(() => {
    const signUp = async () => {
      setIsLoading(true); 

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/ecommerce/user/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wallet_address: accountConnected,
            email,
          }),
        }
      );

      const data = await response.json();

      if (data?.status) {
        setIsSuccess(true);
        router.push("/market-place");
      } else {
        setIsError(true);
      }

    };

    if (account?.address) {
      signUp();
    }
  }, [account, accountConnected, email, router]);

  useEffect(() => {
    setAccountConnected(account?.address || "");

    async function getEmail() {
      const userEmail = await getUserEmail({ client });
      setEmail(userEmail || "");
    }

    if (account?.address) {
      getEmail();
    }
  }, [account]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full">
      <div
        className="w-full flex flex-col sm:flex-row min-h-screen rounded-md opacity-80 bg-gradient-to-r opacity-85 from-[#008080] via-black to-[#001A1A] relative"
        style={{
          backgroundImage: 'url("/assets/images/bgconical.svg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* First half */}
        <div className="w-full sm:w-1/2 flex flex-col justify-center items-center">
          <div className="bg-gradient-to-b w-full h-full from-[#008080] to-black p-10 font-orbitron">
            <Image
              src={"/assets/images/arrow-down-icon.svg"}
              width={50}
              height={50}
              alt="icon"
              onClick={() => router.push("/")}
              className="hover:cursor-pointer"
            />
            <Image
              src={"/assets/images/people.svg"}
              width={500}
              height={500}
              alt="people_icon"
            />
            <h1 className="text-3xl">
              Welcome{" "}
              <span className="bg-gradient-to-r from-[#008080] to-[#69F5F5] bg-clip-text text-transparent">
                Back!
              </span>{" "}
              Securely Log In to Your{" "}
              <span className="bg-gradient-to-r from-[#008080] to-[#69F5F5] bg-clip-text text-transparent">
                Account
              </span>
            </h1>
            <p className="text-sm pt-6">
              Access your account and enjoy seamless shopping with secure
              blockchain payments.
            </p>
          </div>
        </div>

        {/* Second half */}
        <div className="w-full sm:w-1/2 flex p-3 sm:p-20 justify-center items-center">
          <div className="border-2 border-[#008080] p-5 w-full h-full rounded-xl flex flex-col font-orbitron gap-2 backdrop-blur-md bg-[#00000094] items-center">
            <Image
              src={"/assets/images/chainStore.svg"}
              width={300}
              height={300}
              alt="people_icon"
            />
            <h1 className="text-3xl">Log In</h1>
            <p className="font-medium font-poppins">
              Please login to continue to your account.
            </p>
            <div className="items-center justify-center pt-10">
              <ConnectButton
                client={client}
                chain={chain}
                wallets={wallets}
                theme={lightTheme({
                  colors: {
                    modalBg: "#008080",
                    borderColor: "#008080",
                    accentText: "#ffffff",
                    primaryButtonBg: "#008080",
                    secondaryText: "#ffffff",
                    primaryText: "#ffffff",
                    primaryButtonText: "#ffffff",
                    secondaryIconColor: "#ffffff",
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
