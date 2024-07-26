import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Grid from "./pages/Grid";
import NoPage from "./pages/NoPage";
function App() {
  return (
    <div className="h-screen  flex justify-center items-center">
      <h1>Hello World</h1>

      <Routes>
        <Route index element={<Home />} />
        <Route path="grid" element={<Grid />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default App;
