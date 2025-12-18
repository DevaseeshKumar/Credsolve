import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Users from "./pages/Users";
import Groups from "./pages/Groups";
import Expenses from "./pages/Expenses";
import Settle from "./pages/Settle";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/settle" element={<Settle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
