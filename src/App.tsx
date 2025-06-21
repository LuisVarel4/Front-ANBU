import './App.css'
import HeaderHero from './features/HeaderHero.tsx'
import Traitors from './features/Traitors.tsx'  
import Footer from './features/Footer.tsx'	
import CustomBr from './components/CustomBr.tsx'

function App() {
  return (
    <>
      <HeaderHero/>
      <CustomBr />
      <Traitors />
      <CustomBr />
      <Footer />
    </>
  )
}

export default App
