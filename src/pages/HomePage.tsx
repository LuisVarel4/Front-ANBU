import HeaderHero from '../features/HeaderHero';
import Traitors from '../features/Traitors';
import Footer from '../features/Footer';
import CustomBr from '../components/CustomBr'

const HomePage: React.FC = () => {
  return <>
    <HeaderHero />
    <CustomBr />
    <Traitors />
    <CustomBr />
    <Footer />
  </>
};

export default HomePage;