import { Route, Routes } from 'react-router-dom';
import SimpleCard from '../components/login';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<SimpleCard />} />
      <Route path="editor" />
      <Route path="*" />
    </Routes>
  );
}
export default Router;
