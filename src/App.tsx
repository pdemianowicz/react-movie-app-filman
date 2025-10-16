import { Route, Routes } from "react-router-dom";
import Header from "./components/nav/Header";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Serials from "./pages/Serials";
import Bookmarks from "./pages/Bookmarks";
import MovieDetails from "./pages/MovieDetails";
import TvDetails from "./pages/TvDetails";
import PersonDetails from "./pages/PersonDetails";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-text-primary">
      <Header />
      <div className="flex-grow p-4 md:p-6 overflow-auto max-w-7xl mx-auto mt-8 w-full">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/serials" element={<Serials />} />
          <Route path="/bookmarks" element={<Bookmarks />} />

          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tv/:id" element={<TvDetails />} />
          <Route path="/person/:id" element={<PersonDetails />} />
        </Routes>
      </div>
      <Footer />
    </main>
  );
}

export default App;
