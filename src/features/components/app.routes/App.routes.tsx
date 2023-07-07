import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Register = lazy(() => import("../register/Register"));
const Login = lazy(() => import("../login/Login"));
const List = lazy(() => import("../list/List"));
const Home = lazy(() => import("../home/Home"));
const FilmDetail = lazy(() => import("../film.detail/FilmDetail"));
const ErrorPage = lazy(() => import("../error.page/ErrorPage"));
const CreateFilm = lazy(() => import("../create.film/Create.film"));

export function AppRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/list" element={<List></List>}></Route>
        <Route path="/detail/:id" element={<FilmDetail></FilmDetail>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/create" element={<CreateFilm></CreateFilm>}></Route>
        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </Suspense>
  );
}
