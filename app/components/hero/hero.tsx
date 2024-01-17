import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { QRModal } from "../QRModal/qrModal";
import { GenerateButton } from "../buttons/buttons";
import { GeneratedQRCode } from "../generateQRCode/generateQRCode";
import { CustomInput, QRFormData } from "../input/input";
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
  const [formData, setFormData] = useState<QRFormData>({
    qrCodeType: { value: undefined, label: undefined },
  });

  const isDisabled =
    (!valueToConvert && !Object.values(formData)) ||
    (imageAdded && !valueToConvert && !Object.values(formData));

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleQRCodeTypeChange = (newValue: any) => {
    console.log("newValue", newValue);
    // Logic to handle QR code type change
    setFormData({ qrCodeType: newValue });
  };

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
    setOnSuccess(true);
    setGenerateQR(false);

    if (hasBeenDownloaded) {
      toast.remove();
      toast.success("QR kode lastet ned", { duration: 5000 });
    }

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

    await updateDownloadCount();
    queryClient.invalidateQueries({ queryKey: ["insights"] });
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
          formData={formData}
          handleInputChange={handleInputChange}
          handleQRCodeTypeChange={handleQRCodeTypeChange}
          qrCodeType={formData.qrCodeType}
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
            setHasBeenDownloaded={setHasBeenDownloaded}
            handleClose={() => handleClose()}
            formData={formData}
          />
        </QRModal>
      </div>
    </>
  );
};
