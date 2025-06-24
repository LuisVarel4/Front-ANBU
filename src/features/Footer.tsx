import FooterQuote from "../components/footer/FooterQuote";
import FooterLogo from "../components/footer/FooterLogo";
import FooterLegal from "../components/footer/FooterLegal";
import AnbuLogo from "../assets/logos/anbu-letras.png";

function Footer() {
  return (
    <footer className="bg-black-anbu align-center flex w-full items-center justify-around">
      <div className="flex flex-col items-center">
        <FooterLogo logoAnbu={AnbuLogo} />
        <FooterLegal />
      </div>
      <FooterQuote />
    </footer>
  );
}

export default Footer;
