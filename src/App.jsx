import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import { Toaster } from "@/components/ui/sonner";

import LoginPage from "./app/pages/login/LoginPage";
import Home from "./app/pages/Home";
import LayoutAdmin from "./app/layouts/LayoutAdmin";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LayoutAdmin />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default App;
