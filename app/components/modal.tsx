// Modal.tsx
import Link from "next/link";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex font-orbitron items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gradient-to-r from-[#008080] bg-opacity-10 to-black p-6 rounded shadow-lg text-white w-96 h-72 flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold pb-2">Purchase Successful!!</h2>
        <p className="text-center">
          Your purchase is successful and an NFT has been sent to your wallet address.
        </p>
        <div className="flex gap-2 items-center mt-4">
          <Link
            href={"/market-place"}
            className="hover:underline hover:underline-offset-1 text-blue-500"
          >
            Go to Marketplace
          </Link>
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
