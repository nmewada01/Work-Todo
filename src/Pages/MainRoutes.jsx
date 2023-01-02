import { Container, Flex, Spinner, Stack } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import PrivateRoute from "../PrivateRoute/PrivateR";
import Editpage from "./Editpage";
import Homepage from "./Homepage";
import Login from "./Login";
import Signup from "./Signup";
import { useSelector } from "react-redux";

const MainRoutes = () => {
  const loading = useSelector((state) => state?.AppReducer?.isLoading);
  const loadings = useSelector((state) => state?.AuthReducer?.isLoading);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            {!loading ? (
              <Stack direction="row">
                <Sidebar />
                <Homepage />
              </Stack>
            ) : (
              loader()
            )}
          </PrivateRoute>
        }
      />
      <Route
        path="/task/:id"
        element={
          <>
            {!loading ? (
              <Stack direction="row">
                <Sidebar />
                <Editpage />
              </Stack>
            ) : (
              loader()
            )}
          </>
        }
      />
      <Route path="/login" element={<>{!loadings ? <Login /> : loader()}</>} />
      <Route
        path="/signup"
        element={<>{!loadings ? <Signup /> : loader()}</>}
      />
    </Routes>
  );
};

export default MainRoutes;

export const loader = () => {
  return (
    <Container
      as={Flex}
      alignContent={"center"}
      alignItems={"center"}
      height={"100vh"}
      w={"100%"}
    >
      <Spinner thickness="5rem" margin={"auto"} size={"25xl"} speed="0.65s" />
    </Container>
  );
};
