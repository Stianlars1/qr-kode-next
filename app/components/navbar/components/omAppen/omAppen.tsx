import Image from "next/image";
import { FaEnvelope, FaGithub, FaInstagram } from "react-icons/fa";
import "./omAppen.css";

export const OmAppen = () => {
  return (
    <div className="om-appen">
      <header>
        <Image
          src={"/qrKodeLogo.png"}
          width={30}
          height={30}
          alt="qr-kode-logo"
        />
        <h2>Om QR Kode Appen</h2>
      </header>
      <p>
        Velkommen til QR Kode Generatoren – din norske partner for moderne og
        effektiv deling av informasjon. Med vår brukervennlige plattform kan du
        raskt opprette personlige QR-koder for en rekke formål – helt gratis.
      </p>
      <h3>Funksjoner:</h3>
      <ul>
        <li>
          <strong>Tilpassede QR-koder:</strong> Skriv inn tekst eller en URL og
          generer en unik QR-kode på sekunder.
        </li>
        <li>
          <strong>Logo-integrering:</strong> Gjør QR-kodene dine gjenkjennelige
          ved å legge til din egen logo midt i koden.
        </li>
        <li>
          <strong>Fleksible nedlastingsalternativer:</strong> Last ned QR-kodene
          som enkeltstående .png- eller .svg-filer, eller samlet i en hendig
          .zip-mappe.
        </li>
      </ul>
      <p>
        Vår tjeneste er bygget på pålitelig og åpen tekn ologi, og vi ønsker å
        takke utviklerne bak de åpne kildekodene som gjør dette mulig. En
        spesiell takk går til:
      </p>
      <ul>
        <li>
          Skaperne av{" "}
          <a
            href="https://stuk.github.io/jszip/"
            target="_blank"
            rel="noopener noreferrer"
          >
            JSZip
          </a>{" "}
          for deres fantastiske bibliotek.
        </li>
        <li>
          Utviklerne av{" "}
          <a
            href="https://zpao.github.io/qrcode.react/"
            target="_blank"
            rel="noopener noreferrer"
          >
            qrcode.react
          </a>{" "}
          for QR-kodegenerering.
        </li>
        <li>
          Teamet bak{" "}
          <a
            href="https://eligrey.com/blog/saving-generated-files-on-the-client-side/"
            target="_blank"
            rel="noopener noreferrer"
          >
            FileSaver
          </a>{" "}
          som gjør nedlasting av filer enkelt.
        </li>
      </ul>
      <p>
        Laget med omsorg i Norge, denne tjenesten er her for å støtte din
        bedrift, prosjekt, eller markedsføringsbehov. Om du har spørsmål eller
        tilbakemeldinger, ikke nøl med å kontakte oss.
      </p>
      <p>Takk for at du velger QR Kode Generatoren.</p>

      <h3 className="h3-contact">
        Laget av <span className="created-by">Stian Larsen</span>
      </h3>
      <div className="social-links">
        <a
          href="https://github.com/stianlars1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
          <span>stianlars1</span>
        </a>
        <a
          href="https://instagram.com/stianlarsen"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
          <span>stianlarsen</span>
        </a>
        <a
          href="mailto:stian.larsen@mac.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelope />
          <span>stian.larsen@mac.com</span>
        </a>
      </div>

      <Image
        onClick={() => window.history.go(0)}
        width={128}
        height={128}
        src={"/qrKode.png"}
        alt="qr-kode av nettsiden www.qr-kode.app"
      />
    </div>
  );
};
