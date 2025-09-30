import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import { useAuthStore } from "./store/useAuthStore";

import { Toaster } from "react-hot-toast";
import { PATHS } from "./lib/path";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("CHECK APP: ", authUser);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      <Routes>
        <Route
          path={PATHS?.HOME}
          element={authUser ? <ChatPage /> : <Navigate to={PATHS?.LOGIN} />}
        />
        <Route
          path={PATHS?.LOGIN}
          element={!authUser ? <LoginPage /> : <Navigate to={PATHS?.HOME} />}
        />
        <Route
          path={PATHS?.SIGNUP}
          element={!authUser ? <SignUp /> : <Navigate to={PATHS?.HOME} />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
