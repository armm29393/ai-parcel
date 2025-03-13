import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import MenuAppBar from "./components/AppBar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import GetINV from "./pages/GetINV";

const App = () => {
  return (
    <div className="App">
      <MenuAppBar title="AI Parcel" />
      <Container maxWidth="md" sx={{ p: "1rem" }}>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/inv"
            element={<GetINV />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
