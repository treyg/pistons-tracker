import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./Navbar";
import NbaToday from "./NbaToday";
import Stats from "./Stats";
import Home from "./Home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <div className="dark:bg-gray-700">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nba" element={<NbaToday />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
