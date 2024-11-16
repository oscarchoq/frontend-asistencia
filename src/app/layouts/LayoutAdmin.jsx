import Sidebar from "./Sidebar";
import Header from "./Header";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const LayoutAdmin = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <></>;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6 bg-background">
      <Sidebar />
      <div className="xl:col-span-5">
        <Header />
        <div className="h-[90vh] overflow-y-scroll p-4 md:p-8">
          {/* Your app content */}
          <main>
            <div className="w-full min-h-[calc(100vh-230px)]">
              <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-8 dark:bg-slate-950">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
