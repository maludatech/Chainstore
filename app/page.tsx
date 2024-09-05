"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActiveAccount, ConnectButton, lightTheme } from "thirdweb/react";
import { client, chain } from "./utils/constant";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import BestProduct from "./components/BestProduct";
import Advertisement from "./components/Advertisement";
import Services from "./components/Services";
import Footer from "./components/Footer";
import LandingPageModal from "./components/LandingPageModal";

export default function Home() {
  const router = useRouter();
  const account: any = useActiveAccount?.();

  // State to handle the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Open the modal on the first load
    setIsModalOpen(true);
  }, []);

  return (
    <section className="w-full relative">
      {/* Render the modal */}
      <LandingPageModal isOpen={isModalOpen} onClose={closeModal} />

      {account && (
        <div className="fixed top-[5rem] right-6 h-fit w-fit">
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
      )}

      <Navbar />

      <section className="w-full h-fit sm:h-full pt-24">
        {/* Page content */}
        <div className="p-4">
          <div
            className="w-full flex flex-col gap-4 h-[430px] rounded-md bg-gradient-to-r opacity-85 from-[#008080] via-black to-[rgb(0,26,26)]"
            style={{
              backgroundImage: 'url("/assets/images/bgconical.svg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h1 className="text-4xl sm:text-5xl flex gap-2 justify-center sm:pl-80">
              Shop{" "}
              <span className="bg-gradient-to-r from-[#008080] to-[#69F5F5] bg-clip-text text-transparent">
                Smarter
              </span>{" "}
              with{" "}
              <span className="bg-gradient-to-r from-[#008080] to-[#69F5F5] bg-clip-text text-transparent">
                Web3
              </span>
            </h1>
            <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row-reverse sm:justify-center">
              <h1 className="text-4xl bg-gradient-to-r from-[#008080] to-[#69F5F5] bg-clip-text text-transparent pl-4 sm:pl-0 sm:text-5xl">
                Technology
              </h1>

              <div className="flex flex-col gap-3">
                <Image
                  src="/assets/images/Frame560.svg"
                  width={600}
                  height={600}
                  alt="image_1"
                  className="object-contain"
                />
                <div className="flex gap-4 pt-4">
                  <button className="text-white py-2 px-[1.75rem] rounded-[1.25rem] bg-black text-sm border-2 border-[#008080] font-medium font-orbitron">
                    Learn More
                  </button>
                  <button
                    className="text-white py-2 px-[1.75rem] rounded-[1.25rem] text-sm bg-[#008080] font-medium font-orbitron"
                    onClick={() => router.push("/market-place")}
                  >
                    Shop now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Categories />
        <BestProduct />
        <Advertisement />
        <Services />
        <Footer />
      </section>
    </section>
  );
}
