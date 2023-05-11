import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Suspense, lazy } from 'react';
import Loading from './components/loading';
import { Provider } from 'react-redux';
import { store } from './store';
import theme from './style/CustomTheme';

const Router = lazy(() => import('./routes/route'));

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Provider store={store}>
              <Router />
            </Provider>
          </BrowserRouter>
        </Suspense>
      </ChakraProvider>
    </>
  );
}

export default App;
