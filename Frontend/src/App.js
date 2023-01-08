import "./App.css";
import Home from "./Pages/Home";
import Table from "./Pages/Table";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Table />} />
      </Routes>
    </div>
  );
}

export default App;
