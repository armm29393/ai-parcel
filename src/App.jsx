import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import MenuAppBar from "./components/AppBar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App = () => {
  // const [isLoggedIn, _] = useState(() => !!localStorage.getItem("token"));
  return (
    <div className="App">
      <MenuAppBar title="AI Parcel" />
      <Container maxWidth="md" sx={{ p: "1rem" }}>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          {/* <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginFlow />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/order"
            element={isLoggedIn ? <Order /> : <Navigate to="/login" />}
          />
          <Route
            path="/order_qr"
            element={isLoggedIn ? <OrderQR /> : <Navigate to="/login" />}
          />
          <Route
            path="/payplus"
            element={isLoggedIn ? <PayPlus /> : <Navigate to="/login" />}
          />
          <Route
            path="/passcode"
            element={isLoggedIn ? <Passcode /> : <Navigate to="/login" />}
          /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
