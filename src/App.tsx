import { Route, Routes } from "react-router-dom";
import Header from "./components/nav/Header";
import Home from "./pages/Home";
import Bookmarks from "./pages/Bookmarks";
import PersonDetails from "./pages/PersonDetails";
import Footer from "./components/Footer";
import DiscoverPage from "./pages/DiscoverPage";
import MediaDetailsPage from "./pages/MediaDetailsPage";

function App() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-text-primary">
      <Header />
      <div className="flex-grow p-4 md:p-6 overflow-auto max-w-7xl mx-auto mt-8 w-full">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/movies" element={<DiscoverPage mediaType="movie" />} />
          <Route path="/serials" element={<DiscoverPage mediaType="tv" />} />
          <Route path="/bookmarks" element={<Bookmarks />} />

          <Route path="/movie/:id" element={<MediaDetailsPage mediaType="movie" />} />
          <Route path="/tv/:id" element={<MediaDetailsPage mediaType="tv" />} />
          <Route path="/person/:id" element={<PersonDetails />} />
        </Routes>
      </div>
      <Footer />
    </main>
  );
}

export default App;
