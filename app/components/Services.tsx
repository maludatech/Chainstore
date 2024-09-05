import Image from "next/image";

const Services = () => {
  return (
    <div className="flex flex-col gap-4 px-10 py-5">
      <div className="flex flex-col gap-2 sm:gap-1 sm:flex-row  justify-between items-center">
        <div className="flex flex-col gap-2 items-center w-full">
          <Image
            src="/assets/images/service/Services1.svg"
            width={50}
            height={50}
            alt="service_1"
          />
          <h1>FREE AND FAST DELIVERY</h1>
          <p>Free delivery for all orders over $140</p>
        </div>
        <div className="flex flex-col gap-2 items-center w-full pt-6 sm:pt-0">
          <Image
            src="/assets/images/service/Services2.svg"
            width={50}
            height={50}
            alt="service_2"
          />
          <h1>24/7 CUSTOMER SERVICE</h1>
          <p>Friendly 24/7 customer support</p>
        </div>
        <div className="flex flex-col gap-2 items-center w-full pt-6 sm:pt-0">
          <Image
            src="/assets/images/service/Services3.svg"
            width={50}
            height={50}
            alt="service_3"
          />
          <h1>MONEY BACK GUARANTEE</h1>
          <p>We return money within 30 days</p>
        </div>
      </div>
      <div className="border-[1px] border-[#008080] mt-8" />
    </div>
  );
};

export default Services;
