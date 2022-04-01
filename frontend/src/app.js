import NavigationBar from './components/nav/nav';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Profile from './components/profile/profile';
import Users from './components/users/users';
import PageNotFound from './components/pageNotFound/pageNotFound';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route
          exact
          path="/"
          element={<Navigate replace to="/user/josueuzj9" />}
        />
        <Route exact path="/userSearch/:name" element={<Users />} />
        <Route exact path="/user/:username" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
