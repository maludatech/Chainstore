import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"


const Footer = () => {
  return (
    <div className="p-6 font-poppins">
        <div className="flex justify-between gap-2 flex-col sm:flex-row sm:px-10">
            <Image
                src={"/assets/images/chainStore.svg"}
                height={200}
                width={200}
                alt="chain store logo"
            />
            <div className="flex flex-col pt-4 sm:pt-0 gap-4">
                <div className="flex gap-4 items-center">
                    <FontAwesomeIcon icon={faLocationDot} className="text-lg"/>
                    <p className="text-sm">345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345</p>
                </div>
                <div className="flex gap-4 items-center">
                    <FontAwesomeIcon icon={faPhone} className="text-lg"/>
                    <p className="text-sm">(+234) 816-388-7385</p>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Footer