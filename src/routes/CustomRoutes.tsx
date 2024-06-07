import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Protected from "./ProtectedRoute";
const LoginPage = lazy(() => import("@pages/Login/login-page"));
const RegisterPage = lazy(() => import("@pages/Register/register-page"));
const SuccessPage = lazy(() => import("@pages/Sucess/success-page"));

const CustomRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Suspense fallback={<h2>Loading</h2>}>
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<h2>Loading</h2>}>
            <RegisterPage />
          </Suspense>
        }
      />
      <Route element={<Protected />}>
        <Route
          path="/success"
          element={
            <Suspense fallback={<h2>Loading</h2>}>
              <SuccessPage />
            </Suspense>
          }
        />
        <Route
          path="/*"
          element={
            <Suspense fallback={<h2>Loading</h2>}>
              <Navigate to={"/success"} />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default CustomRoutes;
