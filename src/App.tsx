import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Suspense, lazy } from 'react';
import Loading from './components/loading';
import theme from './style/CustomTheme';
import { ErrorBoundary } from 'react-error-boundary';

const Router = lazy(() => import('./routes/route'));

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <ErrorBoundary
              fallback={
                <div>
                  <h1>Sorry.. there was an error</h1>
                </div>
              }
            >
              <Router />
            </ErrorBoundary>
          </BrowserRouter>
        </Suspense>
      </ChakraProvider>
    </>
  );
}

export default App;
