"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import LoadingSkeleton from "./LoadingSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface Product {
  product_name: string;
  product_id: string;
  image: string;
  price: number;
}

const BestProduct = () => {

  const [imageData, setImageData] = useState<Product[]>([]);

  const fetchImageData = async () => {
    console.log("Fetching image data");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/ecommerce/products/get`
      );
      console.log("Response object:", response);
      if (response.ok) {
        const result = await response.json();
        console.log("Fetched Data:", result); // Inspect the fetched data
        setImageData(result.responseData); // Set the responseData array as the state
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    console.log("Fetching end");
  };

  const convertGoogleDriveUrl = (url: string) => {
    const fileId = url.match(/[-\w]{25,}/);
    return fileId ? `https://drive.google.com/uc?export=view&id=${fileId[0]}` : url;
  };

  useEffect(() => {
    fetchImageData();
  }, []);

  console.log("Image Data State:", imageData); // Inspect the state after fetch

  return (
    <div className="p-6">
      <Image
        src="/assets/images/month.svg"
        width={100}
        height={200}
        alt="category"
      />
      <div className="flex pt-4">
        <h1 className="font-orbitron text-3xl">Best Selling Products</h1>
      </div>
      {imageData && imageData.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
          {imageData.map((product) => (
            <div className="rounded-md shadow-lg p-4">
            <Image
              key={product.product_id}
              src={convertGoogleDriveUrl(product.image)}
              width={300}
              height={300}
              alt={product.product_name}
              className="rounded-md w-[18.75rem] h-[13.2125rem] object-cover"
            />
            <h2 className="text-xl font-bold mt-4">{product.product_name}</h2>
            <p className="text-lg text-gray-500">Price: {product.price} ETH</p>
            <div className="flex gap-1">
              <FontAwesomeIcon icon={faStar} className="text-sm text-yellow-400"/>
              <FontAwesomeIcon icon={faStar} className="text-sm text-yellow-400"/>
              <FontAwesomeIcon icon={faStar} className="text-sm text-yellow-400"/>
              <FontAwesomeIcon icon={faStar} className="text-sm text-yellow-400"/>
              <FontAwesomeIcon icon={faStar} className="text-sm text-yellow-400"/>
              <p className="text-gray-500">(65)</p>
            </div>
            </div>
          ))}
        </div>
      ) : (
        <LoadingSkeleton/>
        )}
    </div>
  );
};

export default BestProduct;
