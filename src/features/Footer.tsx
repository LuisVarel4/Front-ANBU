import FooterQuote from '../components/footer/FooterQuote';
import FooterLogo from '../components/footer/FooterLogo';
import FooterLegal from '../components/footer/FooterLegal';
import AnbuLogo from '../assets/logos/anbu-letras.png';

function Footer() {
  return (
    <footer className="bg-black-anbu w-full flex align-center justify-around items-center">
    <div className="flex flex-col items-center">      
        <FooterLogo logoAnbu={AnbuLogo}/>
        <FooterLegal />
      </div>
    <FooterQuote />

    </footer>
  );
}

export default Footer; 