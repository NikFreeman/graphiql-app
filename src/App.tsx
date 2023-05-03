import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { WelcomePage } from './pages/WelcomePage';

function App() {
  return (
    <>
      <Header />
      <WelcomePage />
      <Footer />
    </>
  );
}

export default App;
