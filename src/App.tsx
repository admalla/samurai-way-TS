import React, { lazy, Suspense, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import NavBar from "./components/Navbar/NavBar";
import Profile from "./components/Profile/Profile";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Users } from "components/Users/Users";
import { Login } from "components/Login/Login";
import { useAppDispatch, useAppSelector } from "Redux/redux-store";
import Preloader from "common/Preloader/Preloader";
import { initializeTC } from "Redux/app-reducer";

const Dialogs = lazy(() => import("./components/Dialogs/Dialogs"));

function App() {
  const initialized = useAppSelector((state) => state.app.initialized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeTC());
  }, []);

  if (!initialized) {
    return <Preloader />;
  }

  return (
    <HashRouter>
      <div className="App">
        <Header />
        <NavBar />
        <div className="App-content">
          <Routes>
            <Route path="/profile/:id?" element={<Profile />} />
            <Route
              path="/dialogs"
              element={
                <Suspense fallback={<Preloader />}>
                  <Dialogs />
                </Suspense>
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
