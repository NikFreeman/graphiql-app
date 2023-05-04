import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Suspense, lazy } from 'react';
import Loading from './components/loading';

const Router = lazy(() => import('./routes/route'));

function App() {
  return (
    <>
      <ChakraProvider>
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Suspense>
      </ChakraProvider>
    </>
  );
}

export default App;
