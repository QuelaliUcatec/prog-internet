import { BrowserRouter, Routes, Route } from "react-router-dom";
import MetodoGet from "./pages/MetodoGet";
import MetodoPost from "./pages/MetodoPost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MetodoGet />} />
        <Route path="/get" element={<MetodoGet />} />
        <Route path="/post" element={<MetodoPost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
