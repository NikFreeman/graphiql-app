import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Suspense, lazy } from 'react';
import Loading from './components/loading';
import theme from './style/CustomTheme';
import { ErrorBoundary } from './utils/errorBoundary';
import { ErrorBoundaryContext } from 'react-use-error-boundary';

const Router = lazy(() => import('./routes/route'));

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <ErrorBoundaryContext>
              <ErrorBoundary>
                <Router />
              </ErrorBoundary>
            </ErrorBoundaryContext>
          </BrowserRouter>
        </Suspense>
      </ChakraProvider>
    </>
  );
}

export default App;
