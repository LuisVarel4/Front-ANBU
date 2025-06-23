import Welcome from '../features/Welcome';
import Traitors from '../features/Traitors';
import Footer from '../features/Footer';
import CustomBr from '../components/CustomBr'
import background from '../assets/ilustrations/itachi_bg.svg';

const HomePage: React.FC = () => {
  return <>
    <Welcome background={background} />
    <CustomBr />
    <Traitors />
    <CustomBr />
    <Footer />
  </>
};

export default HomePage;