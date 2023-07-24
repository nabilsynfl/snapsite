import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Articles from "./pages/admin/Articles";
import LoginPage from "./pages/login/Login";
import AddUsers from "./pages/admin/AddUsers";
import EditUsers from "./pages/admin/EditUsers";
import AddArticles from "./pages/admin/AddArticles";
import EditArticles from "./pages/admin/EditArticles";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/edit/:id" element={<EditUsers />} />
          <Route path="/users/add" element={<AddUsers />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/add" element={<AddArticles />} />
          <Route path="/articles/edit/:id" element={<EditArticles />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
