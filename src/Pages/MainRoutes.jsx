import { Stack } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import PrivateRoute from "../PrivateRoute/PrivateR";
import Editpage from "./Editpage";
import Homepage from "./Homepage";
import Login from "./Login";
import Signup from "./Signup";

const MainRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Stack direction="row">
              <Sidebar />
              <Homepage />
            </Stack>
          </PrivateRoute>
        }
      />
      <Route
        path="/task/:id"
        element={
          <Stack direction="row">
            <Sidebar />
            <Editpage />
          </Stack>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default MainRoutes;
