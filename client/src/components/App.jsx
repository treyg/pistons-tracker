import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./Navbar";
import NbaToday from "./NbaToday";
//import Podcasts from "./Podcasts";
import Stats from "./Stats";
import Home from "./Home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <div className="dark:bg-[#1e1e24]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nba" element={<NbaToday />} />
          <Route path="/stats" element={<Stats />} />
          {/* <Route path="/podcasts" element={<Podcasts />} /> */}
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
