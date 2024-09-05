"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import LoadingSkeleton from "./LoadingSkeleton";
import { useRouter } from "next/navigation";

interface Product {
  product_name: string;
  product_id: string;
  image: string;
  price: number;
}

const ExploreProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  const fetchImageData = async () => {
    console.log("Fetching image data");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/ecommerce/products/get`
      );
      console.log("Response object:", response);
      if (response.ok) {
        const result = await response.json();
        console.log("Fetched Data:", result);
        setProducts(result.responseData); // Set the responseData array as the state
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const convertGoogleDriveUrl = (url: string) => {
    const fileId = url.match(/[-\w]{25,}/);
    return fileId ? `https://drive.google.com/uc?export=view&id=${fileId[0]}` : url;
  };

  useEffect(() => {
    fetchImageData();
  }, []);

  const handleBuy = (id: string) => {
    router.push(`/market-place/checkout/${id}`);
  }

  return (
    <div className="p-6">
      <Image
        src="/assets/images/product.svg"
        width={100}
        height={200}
        alt="category"
      />
      <div className="flex justify-between pt-2">
        <h1 className="font-orbitron text-3xl">Explore Our Products</h1>
      </div>
      <div className="p-6 px-10">
        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
            {products.map((product) => (
              <div key={product.product_id} className="rounded-md shadow-lg p-4">
                <Image
                  src={convertGoogleDriveUrl(product.image)}
                  width={300}
                  height={300}
                  alt={product.product_name}
                  className="rounded-md w-[18.75rem] h-[13.2125rem] object-cover"
                />
                <h2 className="text-xl text-center font-bold mt-4">{product.product_name}</h2>
                <p className="text-lg text-gray-500 text-center">Price: {product.price} ETH</p>
                <div className="flex gap-1 justify-center">
                  <FontAwesomeIcon icon={faStar} className="text-sm text-yellow-400" />
                  <FontAwesomeIcon icon={faStar} className="text-sm text-yellow-400" />
                  <FontAwesomeIcon icon={faStar} className="text-sm text-yellow-400" />
                  <FontAwesomeIcon icon={faStar} className="text-sm text-yellow-400" />
                  <FontAwesomeIcon icon={faStar} className="text-sm text-yellow-400" />
                  <p className="text-gray-500">(65)</p>
                </div>
                <div className="flex items-center justify-center pt-2">
                  <button className="bg-[#008080] hover:opacity-80 ease-in-out duration-100 text-white p-2 rounded-sm self-center font-orbitron" onClick={()=>handleBuy(product.product_id)}>
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <LoadingSkeleton />
        )}
        <div className="flex items-center justify-center pt-10 pb-4">
          <button className="bg-[#008080] text-white hover:opacity-80 ease-in-out duration-100 p-4 px-10 rounded-sm self-center font-orbitron">
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExploreProduct;
