import { Route, Routes } from "react-router-dom";
import Header from "./components/nav/Header";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Serials from "./pages/Serials";
import Bookmarks from "./pages/Bookmarks";

function App() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-text-primary">
      <Header />
      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="serials" element={<Serials />} />
          <Route path="bookmarks" element={<Bookmarks />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
