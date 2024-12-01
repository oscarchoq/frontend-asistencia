import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

import Home from "./app/pages/Home";
import LayoutAdmin from "./app/layouts/LayoutAdmin";
import LoginPage from "./app/pages/login/LoginPage";
import HomePersona from "./app/pages/persona/HomePersona";
import FormPersona from "./app/pages/persona/FormPersona";
import { ListarPeriodo } from "./app/pages/academico/periodo/Page";
import { ListarCursos } from "./app/pages/academico/apertura-curso/curso/Page";
import Page from "./app/pages/academico/apertura-curso/Page";
import { ListarDocentes } from "./app/pages/academico/apertura-curso/docente/Page";
import ClasePage from "./app/pages/academico/clases/Page";
import Info from "./app/pages/academico/clases/Info";
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

                {/* PERIODO ACADEMICO */}
                <Route path="/periodoacademico" element={<ListarPeriodo />} />
                <Route path="/aperturacurso" element={<Page />} />
                <Route path="/clases" element={<ClasePage />} />
                <Route path="/clases/detalle" element={<Info />} />
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
