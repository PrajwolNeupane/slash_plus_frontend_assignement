import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Protected from "./ProtectedRoute";
import AuthenticatedRoute from "./AuthenticateRoute";
import { ScreenLoader } from "@components/shared";
const LoginPage = lazy(
  () => import(/* webpackChunkName: "login-page" */ "@pages/Login/login-page")
);
const RegisterPage = lazy(
  () =>
    import(
      /* webpackChunkName: "register-page" */ "@pages/Register/register-page"
    )
);
const SuccessPage = lazy(
  () =>
    import(/* webpackChunkName: "success-page" */ "@pages/Sucess/success-page")
);

const CustomRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthenticatedRoute />}>
        <Route
          path="/login"
          element={
            <Suspense fallback={<ScreenLoader />}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<ScreenLoader />}>
              <RegisterPage />
            </Suspense>
          }
        />
      </Route>

      <Route element={<Protected />}>
        <Route
          path="/success"
          element={
            <Suspense fallback={<ScreenLoader />}>
              <SuccessPage />
            </Suspense>
          }
        />
        <Route
          path="/*"
          element={
            <Suspense fallback={<ScreenLoader />}>
              <Navigate to={"/success"} />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default CustomRoutes;
