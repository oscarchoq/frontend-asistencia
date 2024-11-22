import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import { Toaster } from "@/components/ui/sonner";

import LoginPage from "./app/pages/login/LoginPage";
import Home from "./app/pages/Home";
import LayoutAdmin from "./app/layouts/LayoutAdmin";
import EstudiantePage from "./app/pages/estudiante/EstudiantePage";
// import FormPersona from "./app/pages/persona1/FormPersona";
import UpdatePersona from "./app/pages/persona1/UpdatePersona";
// import { ThemeProvider } from "./components/theme-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { DataTableDemo } from "./app/pages/DataTableDemo";
import TableDemo from "./app/pages/TableDemo";

import FormPersona from "./app/pages/persona/FormPersona";
function App() {
  return (
    <>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/table" element={<TableDemo />} />
          </Routes>
        </Router>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<LayoutAdmin />}>
                <Route index element={<Home />} />
                <Route path="/estudiante" element={<EstudiantePage />} />
                {/* <Route path="/estudiante" element={<EstudiantePage />} /> */}
                <Route path="/estudiante/registrar" element={<FormPersona />} />
                {/* <Route
                  path="/estudiante/ver/:id"
                  element={<UpdatePersona action={1} />}
                />
                <Route
                  path="/estudiante/editar/:id"
                  element={<UpdatePersona action={2} />}
                /> */}
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
