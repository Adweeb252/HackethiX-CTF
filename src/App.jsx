import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Submit from "./pages/Submit";
import Leaderboard from "./pages/Leaderboard";
import { FormDataProvider } from "./Context/formContext";

function App() {
  return (
    <FormDataProvider>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        >
          <Route
            index
            element={<Home />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/Submit"
            element={<Submit />}
          />
          <Route
            path="/Leaderboard"
            element={<Leaderboard />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
      </Routes>
    </FormDataProvider>
  );
}

export default App;
