import { QRFormData } from "../../input/input";

export const formatQRCodeData = (
  formData: QRFormData,
  urlValue: string
): string => {
  switch (formData.qrCodeType.value) {
    case "WiFi":
      // Example format: WIFI:S:<SSID>;T:<WPA|WEP|>;P:<password>;H:<hidden>;
      const { wifiSSID, wifiPassword, wifiEncryption } = formData;
      return `WIFI:S:${wifiSSID};T:${wifiEncryption};P:${wifiPassword};`;

    case "vCard":
      // Example format: BEGIN:VCARD\nVERSION:3.0\nN:<name>\nTEL:<phone>\nEMAIL:<email>\nADR:<address>\nEND:VCARD
      const { vCardName, vCardPhone, vCardEmail, vCardAddress } = formData;
      return `BEGIN:VCARD\nVERSION:3.0\nN:${vCardName}\nTEL:${vCardPhone}\nEMAIL:${vCardEmail}\nADR:${vCardAddress}\nEND:VCARD`;

    case "Geo":
      // Example format: geo:<latitude>,<longitude>
      const { geoLatitude, geoLongitude } = formData;
      return `geo:${geoLatitude},${geoLongitude}`;

    case "Event":
      // Example format: BEGIN:VEVENT\nSUMMARY:<eventTitle>\nDTSTART:<eventStart>\nDTEND:<eventEnd>\nLOCATION:<eventLocation>\nEND:VEVENT
      const { eventTitle, eventStart, eventEnd, eventLocation } = formData;
      return `BEGIN:VEVENT\nSUMMARY:${eventTitle}\nDTSTART:${eventStart}\nDTEND:${eventEnd}\nLOCATION:${eventLocation}\nEND:VEVENT`;

    default:
      return urlValue || "";
  }
};
