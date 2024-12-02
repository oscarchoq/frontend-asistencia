import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
import NotFound from "./app/pages/NotFound";
import PrivateRoute from "./app/layouts/PrivateRoute";
import { ClaseDocente } from "./app/pages/academico/clases/docente/Page";
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
                  element={
                    <PrivateRoute allowedRoles={[1]}>
                      <HomePersona typePerson={1} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/estudiante/registrar"
                  element={
                    <PrivateRoute allowedRoles={[1]}>
                      <FormPersona typeForm={1} typePerson={1} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/estudiante/editar/:id"
                  element={
                    <PrivateRoute allowedRoles={[1]}>
                      <FormPersona typeForm={2} typePerson={1} />
                    </PrivateRoute>
                  }
                />

                {/* DOCENTE */}
                <Route
                  path="/docente"
                  element={
                    <PrivateRoute allowedRoles={[1]}>
                      <HomePersona typePerson={2} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/docente/registrar"
                  element={
                    <PrivateRoute allowedRoles={[1]}>
                      <FormPersona typeForm={1} typePerson={2} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/docente/editar/:id"
                  element={
                    <PrivateRoute allowedRoles={[1]}>
                      <FormPersona typeForm={2} typePerson={2} />
                    </PrivateRoute>
                  }
                />

                {/* PERIODO ACADEMICO */}
                <Route
                  path="/periodoacademico"
                  element={
                    <PrivateRoute allowedRoles={[1]}>
                      <ListarPeriodo />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/aperturacurso"
                  element={
                    <PrivateRoute allowedRoles={[1]}>
                      <Page />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/clases"
                  element={
                    <PrivateRoute allowedRoles={[1, 2, 3]}>
                      <ClasePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/clases/detalle"
                  element={
                    <PrivateRoute allowedRoles={[1, 2, 3]}>
                      <Info />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/clase/:id"
                  element={
                    <PrivateRoute allowedRoles={[1, 2, 3]}>
                      <ClaseDocente />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route path="/404" element={<NotFound />} />
              <Route path="/*" element={<Navigate to={"/404"} />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>

      <Toaster />
    </>
  );
}

export default App;
