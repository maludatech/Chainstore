"use client";

import Image from "next/image";
import Navbar from "../../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import LoadingSkeleton from "@/app/components/LoadingSkeleton";
import Modal from "@/app/components/modal";
import { prepareContractCall, toWei } from "thirdweb";
import { CONTRACT } from "@/app/utils/constant";
import { useActiveAccount } from "thirdweb/react";
import { TransactionButton} from "thirdweb/react";

interface ProductParams {
  product_name: string;
  product_id: string;
  image: string;
  price: number;
  id: string;
}

interface NFT{
  _tokenURI: string;
  _price: number;
}
interface Ionic {
  amount: number;
  price: number;
}

const checkOut = ({ params }: { params: ProductParams }) => {



  const Id = params?.id || "";

  // State management
  const [amount, setAmount] = useState<Ionic["amount"]>(1);
  const [price, setPrice] = useState<Ionic["price"]>(0.0005);
  const [product, setProduct] = useState({} as ProductParams);
  const [totalAmount, setTotalAmount] = useState(0);
  const [tokenUri , setTokenUri] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
    const account = useActiveAccount?.();


  const fetchProductById = async () => {
    try {
      const response = await fetch(
        `https://chainstore-backend.onrender.com/api/v1/ecommerce/products/detail/${Id}`
      );
      console.log("Response object:", response);
      if (response.ok) {
        const result = await response.json();
        console.log("Fetched Data:", result);
        console.log("Response object:", result.responseData);
        setProduct(result.responseData); 
        console.log(product);// Set the responseData array as the state
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  
  useEffect(() => {
    console.log("Updated product state:", product);
  }, [product]);

  const convertGoogleDriveUrl = (url: string | undefined) => {
    if (!url) {
      return "";
    }
    const fileId = url.match(/[-\w]{25,}/);
    return fileId
      ? `https://drive.google.com/uc?export=view&id=${fileId[0]}`
      : url;
  };
  useEffect(() => {
    setTotalAmount(amount * product.price);
  }, [amount, product.price]);
useEffect(() => {
  const uri =
    product.product_name === "iPhone 14 pro max"
      ? "https://ipfs.io/ipfs/QmTxYoNbeDbdhzHURTF8z2MCx3wyRWxdVRn6JjHQDSFEbP"
      : product.product_name === "Black watch"
      ? "https://ipfs.io/ipfs/QmTynNrbJrecLy1sjRmPNDnz1RaijpeeJw6eXGT1KDH3SJ"
      : product.product_name === "Samsung curved monitor"
      ? "https://ipfs.io/ipfs/QmZqTRozbyZrts3Z66JPyPUk3DZbW5V3Xbxqk55wiShaqm"
      : product.product_name === "Alienware M15 R6 Laptop"
      ? "https://ipfs.io/ipfs/QmQnjC6w96po2fbuJcT1biEgQDjdjdgabTtSaQmNwTnmmq"
      : product.product_name === "Starlink"
      ? "https://ipfs.io/ipfs/QmW3BnbAakw8wdp7QnJsgf1opSwiRTotmBJj8UwWAwnx46"
      : "https://ipfs.io/ipfs/Qmb2gBuhWTsgBXSHXoREXDNCcm1evH38uwp6reiT85CALY";

  setTokenUri(uri);
  console.log("URI", uri);
}, [product]);

  // Increment and Decrement functions
  const incrementAmount = () => {
    setAmount((prevAmount) => prevAmount + 1);
  };

  const decrementAmount = () => {
    setAmount((prevAmount) => Math.max(prevAmount - 1, 1));
  };

  useEffect(() => {
    fetchProductById();
  }, []);

  

  const checkout = async () => {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/ecommerce/order/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wallet_address: account?.address,
            product_id: product.id,
            total_price: product.price * amount,
            quantity: amount

          }),
        }
      );
    }

  const handleBuyNowClick = () => {
    // Handle the purchase logic here (e.g., API call)

    setIsModalOpen(true); // Open the modal after a successful purchase
    checkout();
  };

  return (
    <section>
      <Navbar />
      <div className="w-full h-full pt-28 p-10 px-20 bg-gradient-to-b from-[#008080] to-black font-orbitron">
        {product ? (
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="w-full sm:w-1/2">
              {product?.image ? (
                <Image
                  src={convertGoogleDriveUrl(product?.image)}
                  width={500}
                  height={500}
                  alt={product.product_name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="bg-[#1ba6a6d5] animate-pulse rounded-md w-full h-full"></div>
              )}
            </div>
            <div className="flex flex-col gap-2 font-poppins w-full sm:w-1/2 self-center">
              {/* Product name */}
              <h1 className="first-letter:uppercase text-2xl">
                {product.product_name}
              </h1>
              <div className="flex gap-1 items-center">
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-sm text-yellow-400"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-sm text-yellow-400"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-sm text-yellow-400"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-sm text-yellow-400"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-sm text-slate-400"
                />
                <p className="text-gray-500">
                  (150 Reviews) |{" "}
                  <span className="text-[#00FF66]">in Stock</span>
                </p>
              </div>
              {/* Product price */}
              <h2 className="text-slate-200 text-lg">
                {(totalAmount).toFixed(4)} ETH
              </h2>
              <p>
                PlayStation 5 Controller Skin High quality vinyl with air
                channel adhesive for easy bubble free install & mess free
                removal Pressure sensitive.
              </p>
              <div className="flex gap-4 items-center mt-4">
                <div className="flex items-center justify-between space-x-10 border-2 border-black w-fit">
                  <button
                    onClick={decrementAmount}
                    className="text-white text-xl font-semibold hover:cursor-pointer border-r-2 border-black px-3 py-1"
                  >
                    -
                  </button>
                  <h3 className="text-xl">{amount}</h3>
                  <button
                    onClick={incrementAmount}
                    className="text-white px-3 py-1 hover:cursor-pointer font-semibold bg-[#008080]"
                  >
                    +
                  </button>
                </div>
                <div>
                  <TransactionButton
                    transaction={() => { return prepareContractCall({
                      contract: CONTRACT,
                      method: "buyProduct",
                      params: [
                       tokenUri,
                        BigInt(toWei(totalAmount.toString())),
                      ],
                      value: BigInt(toWei(totalAmount.toString())),
                    });}}
                    onError={(err) => window.alert(err)}
                    onTransactionConfirmed={() => handleBuyNowClick()}
                    style={{ backgroundColor: "#008080", color: "#ffffff" }}
                    className="bg-primary text-white p-3 rounded-full"
                  >
                    Buy now
                  </TransactionButton>
             
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex gap-2 mt-4 items-center">
                  <Image
                    src={"/assets/images/icon-delivery.svg"}
                    height={50}
                    width={50}
                    alt="icon-delivery"
                    className="object-contain"
                  />
                  <div className="flex flex-col">
                    <h4 className="">Free Delivery</h4>
                    <p>Enter your postal code for Delivery Availability</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 items-center">
                  <Image
                    src={"/assets/images/icon-return.svg"}
                    height={50}
                    width={50}
                    alt="icon-return"
                    className="object-contain"
                  />
                  <div className="flex flex-col">
                    <h4 className="">Return Delivery</h4>
                    <p>Free 30 Days Delivery Returns. Details</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <LoadingSkeleton />
        )}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </section>
  );
};

export default checkOut;
