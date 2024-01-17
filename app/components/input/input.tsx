import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { HiCursorClick } from "react-icons/hi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Select from "react-select";

import "./input.css";

export const CustomInput = ({
  valueToConvert,
  imageAdded,
  saveAsZip,
  resetKey,
  whiteBorder,
  include3DModel,
  formData,
  qrCodeType,

  setWhiteBorder,
  setValueToConvert,
  setImageAdded,
  setImageSrc,
  setSaveAsZip,
  setInclude3DModel,
  handleInputChange,
  handleQRCodeTypeChange,
}: {
  valueToConvert: string;
  imageAdded: boolean;
  saveAsZip: boolean;
  whiteBorder: boolean;
  resetKey: number;
  include3DModel: boolean;
  qrCodeType: QRcodeSelectOptionType;
  formData: QRFormData;
  setValueToConvert: Dispatch<SetStateAction<string>>;
  setImageSrc: Dispatch<SetStateAction<string | undefined>>;
  setImageAdded: Dispatch<SetStateAction<boolean>>;
  setSaveAsZip: Dispatch<SetStateAction<boolean>>;
  setWhiteBorder: Dispatch<SetStateAction<boolean>>;
  setInclude3DModel: Dispatch<SetStateAction<boolean>>;
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleQRCodeTypeChange: (newValue: any) => void;
}) => {
  console.log("formData", formData);
  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file && file.type.startsWith("image/")) {
      const src = URL.createObjectURL(file);
      setImageAdded(true);
      setImageSrc(src);
    }
  };

  const handleSaveAsZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaveAsZip(!saveAsZip);
  };
  const handleWhiteBorderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhiteBorder(!whiteBorder);
  };
  const handleInclude3dModelChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInclude3DModel(!include3DModel);
  };
  return (
    <>
      <section className="inputs">
        <Select
          value={qrCodeTypeOptions.filter(
            (qrType) => formData && formData.qrCodeType.value === qrType.value
          )}
          onChange={handleQRCodeTypeChange}
          options={qrCodeTypeOptions}
          className="qr-code-type-select"
          backspaceRemovesValue={true}
          blurInputOnSelect={true}
          hideSelectedOptions={true}
          placeholder="Velg QR kode type (URL er standard)"
        />

        {/*  == WIFI INPUT  */}
        {formData.qrCodeType.value === "WiFi" && (
          <>
            <input
              name="wifiSSID"
              type="text"
              placeholder="Network SSID"
              value={formData.wifiSSID || ""}
              onChange={handleInputChange}
            />
            <input
              name="wifiPassword"
              type="text"
              placeholder="Network Password"
              value={formData.wifiPassword || ""}
              onChange={handleInputChange}
            />

            <select
              name="wifiEncryption"
              value={formData.wifiEncryption || "WPA"} // Default to the most common encryption type
              onChange={handleInputChange}
              style={{ color: "black" }}
            >
              <option value="WEP">WEP</option>
              <option value="WPA">WPA/WPA2</option>
              <option value="nopass">No Password</option>
            </select>
          </>
        )}

        {/*  == URL INPUT  */}
        {(formData.qrCodeType.value === undefined ||
          formData.qrCodeType.value === "URL") && (
          <>
            <label className="input_label">Skriv inn tekst eller URL</label>
            <input
              value={valueToConvert}
              onChange={(e) => setValueToConvert(e.target.value)}
            />
          </>
        )}
        <div className="logo">
          {imageAdded && (
            <>
              <div className="icon-container">
                <IoIosCheckmarkCircle />
                <div className="iconBg" />
              </div>
            </>
          )}

          <label
            htmlFor="imageInput"
            className={imageAdded ? "label-added" : "add-image-label"}
          >
            {!imageAdded && (
              <div className="icon-container">
                <HiCursorClick />
              </div>
            )}
            {imageAdded ? "Logo er lagt til" : "Vil du ha med logo?"}
          </label>
        </div>

        <input
          key={resetKey}
          id="imageInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleLogoUpload}
        />
        <div className="save-as-zip-option">
          <label>
            <input
              type="checkbox"
              checked={saveAsZip}
              onChange={handleSaveAsZipChange}
            />
            Lagre bildene i en .zip mappe?
          </label>
        </div>
        <div className="save-as-zip-option">
          <label>
            <input
              type="checkbox"
              checked={whiteBorder}
              onChange={handleWhiteBorderChange}
            />
            Hvit kant rundt qr-koden?
          </label>
        </div>
        <div className="save-as-zip-option">
          <label>
            <input
              type="checkbox"
              checked={include3DModel}
              onChange={handleInclude3dModelChange}
            />
            Vil du ha med 3D modell?
          </label>
        </div>
      </section>
    </>
  );
};

export const qrCodeTypeOptions = [
  { value: "URL", label: "URL" },
  { value: "WiFi", label: "Wi-Fi" },
  { value: "vCard", label: "Contact (vCard)" },
  { value: "Geo", label: "Geolocation" },
  { value: "Event", label: "Event" },
];

export type QRFormData = {
  qrCodeType: QRcodeSelectOptionType;
  wifiSSID?: string;
  wifiPassword?: string;
  wifiEncryption?: "WEP" | "WPA" | "nopass";
  vCardName?: string;
  vCardPhone?: string;
  vCardEmail?: string;
  vCardAddress?: string;
  geoLatitude?: string;
  geoLongitude?: string;
  eventTitle?: string;
  eventStart?: string;
  eventEnd?: string;
  eventLocation?: string;
};

// export type QRCodeType = SingleValue<
//   "URL" | "WiFi" | "vCard" | "Geo" | "Event"
// >;

export interface QRcodeSelectOptionType {
  value: string | undefined;
  label: string | undefined;
}
// const handleOnSelectChange = async (event: any) => {
//     if (event.value !== 'default') {
//         const newSelectedProfile = waveformProfiles.find((option: any) => option.value === event.value)
//         if (newSelectedProfile) {
//             setSelectedProfile(newSelectedProfile)
//             setWavesurferOptionsToSave(newSelectedProfile.waveformOptions)
//             await saveUserData(userID, { artistProfile: { activeWaveformProfile: newSelectedProfile.value } })
//             toast.success(`Waveform profile changed to ${newSelectedProfile.value}`)
//         }
//     } else {
//         setSelectedProfile(defaultProfile)
//         setWavesurferOptionsToSave(defaultProfile.waveformOptions)
//         await saveUserData(userID, { artistProfile: { activeWaveformProfile: 'default' } })
//         toast.success('Waveform profile set to default \nRemember to turn on custom waveform in preferences 🌊')
//     }
//     const artistSongsQueryKey: string[] = userID ? ['artistPage-songsList-with-user', user.artistNameLowerCase, userID] : ['artistPage-songsList', user.artistNameLowerCase]
//     const artistQuery = [`artistDetails-${user.artistNameLowerCase}`]

//     await queryClient.invalidateQueries({ queryKey: artistSongsQueryKey })
//     await queryClient.invalidateQueries({ queryKey: artistQuery })
//     await updateUserDetails(userID)
// }
