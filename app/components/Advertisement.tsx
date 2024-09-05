import Image from "next/image";

const Advertisement = () => {

  return (
    <div className="p-6">
        <div className="bg-[#FEDB07] w-full p-4 rounded-md flex sm:flex-row flex-col justify-between">
            <div className="flex flex-col py-10 text-black pl-10 w-full font-orbitron">
                <h1 className="text-3xl pb-2">
                    Shop with Crypto and 
                </h1>
                <h1 className="text-3xl">
                    Get Exclusive Discounts!
                </h1>
                <p className="pt-5 text-lg block">
                    Enjoy secure, fast, and transparent payments with our blockchain technology. Start saving today with exclusive crypto deals on your favorite products!
                </p>
                <button className="p-2 px-10 bg-black mt-8 w-fit rounded-sm text-white">Start Shopping Now!</button>
            </div>
            <div className="w-full">
                <Image
                    src={"/assets/images/ad.svg"}
                    width={500}
                    height={500}
                    alt="Advertisement Image"
                />
            </div>
        </div>
    </div>
  );
};

export default Advertisement;
