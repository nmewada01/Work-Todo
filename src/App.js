import { Container } from "@chakra-ui/react";
import "./App.css";
import MainRoutes from "./Pages/MainRoutes";

function App() {
  return (
    <Container minWidth="6xl" bgImage="linear-gradient(#2193b0 ,#6dd5ed)" fontFamily="cursive" >
      <MainRoutes />
    </Container>
  );
}

export default App;
