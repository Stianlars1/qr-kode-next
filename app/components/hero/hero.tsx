import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { QRModal } from "../QRModal/qrModal";
import { GenerateButton } from "../buttons/buttons";
import { GeneratedQRCode } from "../generateQRCode/generateQRCode";
import { CustomInput } from "../input/input";
import "./hero.css";
import {
  updateAddedLogo,
  updateDownloadCount,
  updateGeneratedCount,
} from "./utils";

export const Hero = () => {
  const queryClient = useQueryClient();
  const [valueToConvert, setValueToConvert] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [inputResetKey, setInputResetKey] = useState(0); // New state for input reset key

  const [imageAdded, setImageAdded] = useState<boolean>(false);

  const [generateQR, setGenerateQR] = useState(false);

  const [onSuccess, setOnSuccess] = useState(false);

  const [showDisabledMessage, setShowDisabledMessage] = useState(false);

  const [saveAsZip, setSaveAsZip] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [hasBeenDownloaded, setHasBeenDownloaded] = useState(false);
  const [whiteBorder, setWhiteBorder] = useState(true);
  const [include3DModel, setInclude3DModel] = useState(false);
  const isDisabled =
    !valueToConvert ||
    valueToConvert.length === 0 ||
    (imageAdded && !valueToConvert) ||
    (imageAdded && valueToConvert.length === 0);
  const hasBeenDownloadedRef = useRef(hasBeenDownloaded);

  useEffect(() => {
    hasBeenDownloadedRef.current = hasBeenDownloaded;
  }, [hasBeenDownloaded]);

  const handleGenerateQR = async () => {
    setIsLoading(true);
    await updateGeneratedCount();
    if (imageAdded) {
      await updateAddedLogo();
    }
    queryClient.invalidateQueries({ queryKey: ["insights"] });
    setIsLoading(false);
    setGenerateQR(true);
  };
  const handleClose = async () => {
    if (hasBeenDownloadedRef.current) {
      toast.remove();
      toast.success("QR kode lastet ned", { duration: 5000 });
      await updateDownloadCount();
      queryClient.invalidateQueries({ queryKey: ["insights"] });
    }

    setOnSuccess(true);
    setGenerateQR(false);
    setImageSrc(undefined);
    setValueToConvert("");
    setGenerateQR(false);
    setOnSuccess(false);
    setImageAdded(false);
    setShowDisabledMessage(false);
    setSaveAsZip(true);
    setWhiteBorder(true);
    setInclude3DModel(false);
    setHasBeenDownloaded(false);
    setInputResetKey((prevKey) => prevKey + 1); // Increment the reset key

    return;
  };

  const handleMouseEnter = () => {
    if (isDisabled) {
      setShowDisabledMessage(true);
    }
  };

  const handleMouseLeave = () => {
    if (isDisabled) {
      setShowDisabledMessage(false);
    }
  };

  return (
    <>
      <div className="hero">
        <CustomInput
          valueToConvert={valueToConvert}
          setValueToConvert={setValueToConvert}
          setImageSrc={setImageSrc}
          imageAdded={imageAdded}
          setImageAdded={setImageAdded}
          saveAsZip={saveAsZip}
          setSaveAsZip={setSaveAsZip}
          resetKey={inputResetKey}
          whiteBorder={whiteBorder}
          setWhiteBorder={setWhiteBorder}
          setInclude3DModel={setInclude3DModel}
          include3DModel={include3DModel}
        />

        <GenerateButton
          title={onSuccess ? "restart" : "Lag QR kode"}
          isLoading={isLoading}
          props={{
            onClick: onSuccess ? () => window.history.go(0) : handleGenerateQR,
            disabled: isDisabled,
            onMouseOver: handleMouseEnter,
            onMouseOut: handleMouseLeave,
          }}
        />
        {showDisabledMessage && (
          <p className="disabled-message">
            Du må skrive inn en verdi før du kan generere en QR kode
          </p>
        )}
        <QRModal
          whiteBorder={whiteBorder}
          isOpen={generateQR}
          onClose={handleClose}
        >
          <GeneratedQRCode
            include3DModel={include3DModel}
            whiteBorder={whiteBorder}
            saveAsZip={saveAsZip}
            valueToConvert={valueToConvert}
            logo={imageSrc}
            setHasBeenDownloaded={() => setHasBeenDownloaded(true)}
            handleClose={() => handleClose()}
          />
        </QRModal>
      </div>
    </>
  );
};
