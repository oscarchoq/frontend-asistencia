import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

import Home from "./app/pages/Home";
import LayoutAdmin from "./app/layouts/LayoutAdmin";
import LoginPage from "./app/pages/login/LoginPage";
import HomePersona from "./app/pages/persona/HomePersona";
import FormPersona from "./app/pages/persona/FormPersona";
function App() {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<LayoutAdmin />}>
                <Route index element={<Home />} />
                {/* ESTUDIANTE */}
                <Route
                  path="/estudiante"
                  element={<HomePersona typePerson={1} />}
                />
                <Route
                  path="/estudiante/registrar"
                  element={<FormPersona typeForm={1} typePerson={1} />}
                />
                <Route
                  path="/estudiante/editar/:id"
                  element={<FormPersona typeForm={2} typePerson={1} />}
                />

                {/* DOCENTE */}
                <Route
                  path="/docente"
                  element={<HomePersona typePerson={2} />}
                />
                <Route
                  path="/docente/registrar"
                  element={<FormPersona typeForm={1} typePerson={2} />}
                />
                <Route
                  path="/docente/editar/:id"
                  element={<FormPersona typeForm={2} typePerson={2} />}
                />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>

      <Toaster />
    </>
  );
}

export default App;
