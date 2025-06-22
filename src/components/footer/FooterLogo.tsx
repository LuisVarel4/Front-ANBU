interface FooterLogoProps {
    logoAnbu: string;
  }
  
  function FooterLogo({ logoAnbu }: FooterLogoProps) {
    return (
      <div className="flex flex-col justify-end items-center">
        <img src={logoAnbu} alt="ANBU logo" className="w-28 sm:w-50 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" /> 
      </div>
    );
  }
  export default FooterLogo;