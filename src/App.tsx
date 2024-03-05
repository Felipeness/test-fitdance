import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DataTable from "./components/Table/DataTable";
import "./styles/global.scss";
import { Toaster } from "sonner";

function App() {
  return (
    <div>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<DataTable />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
