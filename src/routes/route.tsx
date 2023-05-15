import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Editor from '../pages/Editor';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import { WelcomePage } from '../pages/WelcomePage';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
// import ProtectedRoute from '../components/protectedRoute';

function Router() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="editor"
          element={
            // <ProtectedRoute>
            <Editor />
            // </ProtectedRoute>
          }
        />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
export default Router;
