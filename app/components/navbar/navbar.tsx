import Image from "next/image";
import { useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { QRModal } from "../QRModal/qrModal";
import { OmAppen } from "./components/omAppen/omAppen";
import "./navbar.css";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav>
        <figure>
          <Image
            width={50}
            height={50}
            src={"/qrKodeLogo.png"}
            alt="qr-kode-logo"
          />
        </figure>

        <button onClick={() => setIsOpen(true)}>
          <AiFillInfoCircle />
          Om Appen
        </button>
        <QRModal
          closeButton={true}
          contentClassName={"modal-content-om-app"}
          noContentClassName={false}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <OmAppen />
        </QRModal>
      </nav>
    </>
  );
};
