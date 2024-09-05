"use client"
import ExploreProduct from "../components/Explore";
import Services from "../components/Services";
import Navbar from "../components/Navbar";
import {useActiveAccount } from "thirdweb/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";

const marketPlace = () => {
     const [isLoading, setIsLoading] = useState(false);
     const router = useRouter();
     const pathname = usePathname();
     const account: any = useActiveAccount?.();

           useEffect(() => {
             if (pathname.startsWith("/market-place") && !account) {
               setIsLoading(true);
               router.push("/");
             }
           }, [account, router, pathname]);

      if (isLoading) {
        return <Loading />;
      }

  return (
    <section className="relative w-full">
      <Navbar />
    
      <div className="w-full h-full pt-28 p-5">
        <ExploreProduct />
        <Services />
      </div>
    </section>
  );
}

export default marketPlace