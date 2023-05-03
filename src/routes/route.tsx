import { Route, Routes } from 'react-router-dom';
import SimpleCard from '../components/login';
import NotFound from '../pages/NotFound';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<SimpleCard />} />
      <Route path="editor" />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default Router;
