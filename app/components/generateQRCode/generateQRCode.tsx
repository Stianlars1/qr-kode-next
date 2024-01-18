import { saveAs } from "file-saver";
import JSZip from "jszip";
import { QRCodeSVG } from "qrcode.react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

import * as THREE from "three";

import { STLExporter, SVGLoader } from "three/examples/jsm/Addons.js";
import "./generateQRCode.css";

export const GeneratedQRCode = ({
  valueToConvert,
  logo,
  saveAsZip,
  whiteBorder,
  include3DModel,
  handleClose,
  setHasBeenDownloaded,
}: {
  valueToConvert: string;
  logo: string | undefined;
  saveAsZip: boolean;
  whiteBorder: boolean;
  include3DModel: boolean;
  handleClose: () => void;
  setHasBeenDownloaded: () => void;
}) => {
  /*  ###  useRefs  ###  */
  const qrRef = useRef<HTMLDivElement>(null);
  const qrTransparentRef = useRef<HTMLDivElement>(null);
  const qr3dRef = useRef<HTMLDivElement>(null);

  const qrRefCurrent = qrRef.current;
  const qrTransparentRefCurrent = qrTransparentRef.current;
  const qr3dRefCurrent = qr3dRef.current;

  /*  ###  useStates  ###  */
  /**  --  default stuff  ---  **/
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  /**  --  .zip content  ---  **/
  const [downloadContent, setDownloadContent] = useState<Blob | null>(null);

  /**  --  images  ---  **/
  const [png, setPNG] = useState<Blob | null>(null);
  const [svg, setSVG] = useState<Blob | null>(null);
  const [transparentPNG, setTransparentPNG] = useState<Blob | null>(null);
  const [transparentSVG, setTransparentSVG] = useState<Blob | null>(null);

  /**  --  disable state  ---  **/
  const isDisabled =
    (saveAsZip && !downloadContent && !logo) ||
    (!saveAsZip && !png && !svg && !transparentSVG);

  /**  --  3d Model  ---  **/
  const [ThreeDModel, set3DModel] = useState<Blob | null>(null);

  /*  ###  Initial QR code props  ###  */
  const initialThreeDeQRcodeProps = {
    value: valueToConvert,
    size: 300,
    level: "M",
    includeMargin: whiteBorder ? true : false,
    bgColor: "transparent",
  };

  const initialQRCodeProps = {
    value: valueToConvert,
    size: 300,
    level: "M",
    includeMargin: whiteBorder ? true : false,
    bgColor: "white",
  };

  const initialTransparentProps = {
    value: valueToConvert,
    size: 256,
    level: "M",
    includeMargin: whiteBorder ? true : false,
    bgColor: "transparent",
  };

  /*  ###  Initial QR code states  ###  */
  const [threeDeQRCodeProps, setThreeDeQRCodeProps] = useState<QRProps>(
    initialThreeDeQRcodeProps
  );
  const [qrCodeProps, setQRCodeProps] = useState<QRProps>(initialQRCodeProps);
  const [transparentQRCodeProps, setTransparentQRCodeProps] = useState<QRProps>(
    initialTransparentProps
  );

  /*  ###  useEffect for generating QR codes needed  ###  */
  useEffect(() => {
    const updateQRCodeProps = async () => {
      const propsDefault = await getQRcodeProps(
        logo,
        valueToConvert,
        whiteBorder,
        false
      );
      const propsTransparent = await getQRcodeProps(
        logo,
        valueToConvert,
        whiteBorder,
        true
      );
      const props3D = await getQRcodeProps(
        undefined,
        valueToConvert,
        whiteBorder,
        true
      );
      setQRCodeProps(propsDefault);
      setTransparentQRCodeProps(propsTransparent);
      setThreeDeQRCodeProps(props3D);

      if (!qrRefCurrent || !qrTransparentRefCurrent || !qr3dRefCurrent) return;

      // Generate regular SVG and PNG
      const { svgBlob, pngBlob } = await generateQRCode(
        qrRefCurrent,
        "image/png",
        whiteBorder
      );
      setSVG(svgBlob);
      setPNG(pngBlob);

      // Generate transparent SVG and PNG
      const { svgBlob: svgTransparentBlob, pngBlob: pngTransparentBlob } =
        await generateQRCode(qrTransparentRefCurrent, "image/png", whiteBorder);
      setTransparentSVG(svgTransparentBlob);
      setTransparentPNG(pngTransparentBlob);

      // Generate transparent SVG for 3D model
      const { svgBlob: svg3dBlob, pngBlob: notInUse } = await generateQRCode(
        qr3dRefCurrent,
        "image/png",
        whiteBorder
      );

      // Generate 3D model
      const threeDModel = await convertSVGToSTL(svg3dBlob);
      set3DModel(threeDModel);

      if (saveAsZip) {
        const zip = new JSZip();
        zip.file("qr-kode.svg", svgBlob);
        zip.file("qr-kode.png", pngBlob);
        zip.file("qr-kode-transparent.svg", svgTransparentBlob);
        zip.file("qr-kode-transparent.png", pngTransparentBlob);
        if (include3DModel && threeDModel) {
          zip.file("qr-kode-3d-model.stl", threeDModel);
        }
        const content = await zip.generateAsync({
          type: "blob",
          mimeType: "application/zip",
        });
        setDownloadContent(content);
      }

      setIsLoading(false);
    };

    updateQRCodeProps();
  }, [
    logo,
    valueToConvert,
    saveAsZip,
    include3DModel,
    whiteBorder,
    qrRefCurrent,
    qrTransparentRefCurrent,
    qr3dRefCurrent,
  ]);

  /*  ###  handle Download Button click  ###  */
  const handleDownload = async () => {
    const download = await new Promise((resolve, reject) => {
      setIsDownloading(true);
      if (saveAsZip) {
        downloadContent && saveAs(downloadContent, "qr-kode.zip");
      } else {
        // png
        png && saveAs(png, "qr-kode.png");
        transparentPNG && saveAs(transparentPNG, "qr-kode-transparent.png");

        // svg
        svg && saveAs(svg, "qr-kode.svg");
        transparentSVG && saveAs(transparentSVG, "qr-kode-transparent.svg");

        if (include3DModel && ThreeDModel) {
          saveAs(ThreeDModel, "qr-kode-3d-model.stl");
        }
      }
      setHasBeenDownloaded();
      toast.remove();
      toast.loading(
        "Sjekk om du trenger å tillate nedlastingen i nettleseren din",
        { duration: 6000 }
      );
      resolve(true);
    });
    return Promise.all([download]).then(() => {
      setTimeout(() => {
        handleClose();
      }, 10000);
    });
  };

  return (
    <>
      {!isDownloading && (
        <>
          {isLoading && <ClipLoader color="#bf29e7" />}
          <div
            className="no-border-svg"
            style={{
              opacity: isLoading ? "0" : "1",
              transition: "opacity 0.3s ease",
            }}
            ref={qrRef}
          >
            {<QRCodeSVG {...qrCodeProps} />}
          </div>
          <div
            className="no-border-svg"
            style={{ display: "none" }}
            ref={qrTransparentRef}
          >
            {<QRCodeSVG {...transparentQRCodeProps} />}
          </div>
          <div
            className="no-border-svg"
            style={{ display: "none" }}
            ref={qr3dRef}
          >
            {<QRCodeSVG {...threeDeQRCodeProps} />}
          </div>
          <button
            className="button"
            onClick={handleDownload}
            disabled={isDisabled}
          >
            Last ned
          </button>
          <p className="info">
            Det blir generert 2 bilder i formatene (.png & .svg)
          </p>
        </>
      )}

      {isDownloading && (
        <div className="warning-container">
          <p className="warning">
            <mark>
              <span style={{ color: "black", margin: "0 8px" }}>Viktig</span>
            </mark>
            : Når du laster ned QR-koden, kan nettleseren din be om bekreftelse
            for å forsikre at nedlastingen er trygg.
          </p>

          <p className="warning">
            Vennligst tillat nedlastingen for å motta dine QR-bilder i (.png &
            .svg) formatene. Alle filer fra oss er sikre og trygge.
          </p>
        </div>
      )}
    </>
  );
};

const getQRcodeProps = async (
  logo: string | undefined,
  valueToConvert: string,
  whiteBorder: boolean,
  transparent: boolean
): Promise<QRProps> => {
  if (!logo) {
    return {
      value: valueToConvert,
      level: "M",
      includeMargin: whiteBorder ? true : false,
      size: 300,
      bgColor: transparent ? "transparent" : "white",
    };
  }

  const imageSource = await convertImageToBase64(logo);
  return {
    value: valueToConvert,
    size: 300,
    level: "Q",
    includeMargin: whiteBorder ? true : false,
    bgColor: transparent ? "transparent" : undefined,
    imageSettings: {
      src: imageSource as string,
      x: undefined,
      y: undefined,
      height: 50,
      width: 50,
      excavate: true,
    },
  };
};

const convertImageToBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const preprocessSVGData = (svgData: any) => {
  return svgData.replace(/fill="transparent"/g, 'fill="white"');
};

// Helper function to filter black shapes
const isBlack = (style: any) =>
  style.fill === "#000000" || style.fill === "black";

// Function to convert SVG to STL
const convertSVGToSTL = async (svgBlob: Blob): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        if (e.target !== null && typeof e.target.result === "string") {
          const svgData = e.target.result;
          const preprocessedSVGData = preprocessSVGData(svgData); // Preprocess the SVG data
          const svgLoader = new SVGLoader();
          const svg = svgLoader.parse(preprocessedSVGData); // Use the preprocessed data

          // Filter out the paths that are not black
          const blackPaths = svg.paths.filter((path) =>
            isBlack(path.userData?.style)
          );
          const shapes = blackPaths.flatMap((path) => path.toShapes(true));

          // Create extruded geometry from the black shapes
          const geometry = new THREE.ExtrudeGeometry(shapes, {
            depth: 2, // Adjust depth for the QR code
            bevelEnabled: false,
          });

          const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
          const mesh = new THREE.Mesh(geometry, material);
          const exporter = new STLExporter();
          const stlString = exporter.parse(mesh);
          const stlBlob = new Blob([stlString], { type: "application/sla" });
          resolve(stlBlob);
        } else {
          throw new Error("FileReader did not return a string.");
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(svgBlob);
  });
};

const generateQRCode = async (
  qrElement: HTMLDivElement,
  format: string,
  includeMargin: boolean
): Promise<QRCodeResult> => {
  const svgElement = qrElement.querySelector("svg");
  if (!svgElement) throw new Error("SVG element not found");

  const svgData = new XMLSerializer().serializeToString(svgElement);
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to get canvas context");

  const img = new Image();
  img.src = "data:image/svg+xml;base64," + btoa(svgData);
  await new Promise((resolve, reject) => {
    img.onload = () => resolve(true);
    img.onerror = reject;
  });

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  const pngBlob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Failed to create PNG blob"));
    }, format);
  });

  return { svgBlob, pngBlob };
};

interface QRCodeResult {
  svgBlob: Blob;
  pngBlob: Blob;
}

interface ImageSettings {
  src: string;
  height: number;
  width: number;
  excavate: boolean;
  x?: number;
  y?: number;
}
interface QRProps {
  value: string;
  size?: number;
  level?: string;
  bgColor?: string;
  fgColor?: string;
  style?: CSSProperties;
  includeMargin?: boolean;
  imageSettings?: ImageSettings;
}
