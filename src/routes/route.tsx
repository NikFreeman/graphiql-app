import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Editor from '../pages/Editor';
import Welcome from '../pages/Welcome';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="editor" element={<Editor />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default Router;
