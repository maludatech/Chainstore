"use  lient"

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LandingPageModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of steps for the guide
  const slides = [
    <div className="text-center" key="step-1">
      <h2 className="text-lg font-bold">Step 1: Access the Website</h2>
      <p>
        - Visit the ChainLink site. <br />
        - Navigate to the top of the page, where you will find the <strong>"Connect Wallet"</strong> button in the navbar.
      </p>
    </div>,
    <div className="text-center" key="step-2">
      <h2 className="text-lg font-bold">Step 2: Generate a Wallet</h2>
      <p>
        - Click on <strong>"Connect Wallet"</strong>. <br />
        - Choose an option to generate a wallet using your <strong>email</strong> or <strong>Apple device</strong>.<br />
        - Follow the prompts to complete the wallet creation process.
      </p>
    </div>,
    <div className="text-center" key="step-3">
      <h2 className="text-lg font-bold">Step 3: Get Your Wallet Address</h2>
      <p>
        - After generating the wallet, locate the button on the <strong>top right edge of the navbar</strong>.<br />
        - Click on it to copy your <strong>wallet address</strong> to your clipboard.
      </p>
    </div>,
    <div className="text-center" key="step-4">
      <h2 className="text-lg font-bold">Step 4: Add Faucet Funds</h2>
      <p>
        - Open <Link className="text-blue-500" href="https://faucets.chain.link/sepolia">Chainlink faucet</Link> and claim sepolia Eth.<br />
        - Then, you go to <Link className="text-blue-500" href="https://sepolia-bridge.lisk.com/bridge/lisk-sepolia-testnet">Lisk sepolia bridge</Link> and bridge the sepolia Eth to Lisk sepolia Eth.<br />
        - Request funds and the faucet will send them to your wallet within a few minutes.
      </p>
    </div>,
    <div className="text-center" key="step-5">
      <h2 className="text-lg font-bold">Step 5: Make a Purchase</h2>
      <p>
        - Once the faucet funds are in your wallet, return to the e-commerce site.<br />
        - Browse the available products and proceed to purchase your chosen items.<br />
        - Confirm the purchase using your wallet.
      </p>
    </div>,
    <div className="text-center" key="step-6">
      <h2 className="text-lg font-bold">Step 6: Receive NFT</h2>
      <p>
        - After a successful purchase, the product will be sent to you as an <strong>NFT</strong> (non-fungible token) in your wallet.
      </p>
    </div>,
  ];

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm z-50">
      <div className="bg-gradient-to-r from-[#008080] to-black p-6 rounded shadow-lg text-white w-96 h-96 relative flex flex-col items-center justify-center">
        {/* Close button (X-mark) */}
        <button className="absolute top-4 left-4 text-white" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} size="2x" />
        </button>

        {/* Carousel Content */}
        <div className="w-full h-full flex flex-col items-center justify-center">
          {slides[currentSlide]}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -left-6 transform -translate-y-1/2">
          <button onClick={prevSlide} className="text-white">
            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
          </button>
        </div>
        <div className="absolute top-1/2 -right-6 transform -translate-y-1/2">
          <button onClick={nextSlide} className="text-white">
            <FontAwesomeIcon icon={faArrowRight} size="2x" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPageModal;
