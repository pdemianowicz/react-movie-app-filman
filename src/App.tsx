import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/nav/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import LoadingSpinner from "./components/LoadingSpinner";
import DiscoverPageSkeleton from "./components/skeletons/DiscoverPageSkeleton";
import { BookmarksSkeleton } from "./components/skeletons/BookmarksSkeleton";
import MediaDetailsSkeleton from "./components/skeletons/MediaDetailsSkeleton";
import PersonDetailskeleton from "./components/skeletons/PersonDetailsSkeleton";

const RouteBasedSuspense = () => {
  const location = useLocation();
  const pathname = location.pathname;

  if (pathname.includes("/movies") || pathname.includes("/serials")) return <DiscoverPageSkeleton />;
  if (pathname.includes("/bookmarks")) return <BookmarksSkeleton />;
  if (pathname.includes("/movie/") || pathname.includes("/tv/")) return <MediaDetailsSkeleton />;
  if (pathname.includes("/person/")) return <PersonDetailskeleton />;
  return <LoadingSpinner />;
};

const DiscoverPage = lazy(() => import("./pages/DiscoverPage"));
const BookmarksPage = lazy(() => import("./pages/Bookmarks"));
const MediaDetailsPage = lazy(() => import("./pages/MediaDetailsPage"));
const PersonDetailsPage = lazy(() => import("./pages/PersonDetails"));

function App() {
  const location = useLocation();

  return (
    <main className="flex flex-col min-h-screen bg-background text-text-primary">
      <Header />
      <div className="flex-grow p-4 md:p-6 overflow-hidden max-w-7xl mx-auto mt-8 w-full">
        <AnimatePresence mode="wait">
          <Suspense fallback={<RouteBasedSuspense />}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}>
              <Routes location={location}>
                <Route index element={<Home />} />
                <Route path="/movies" element={<DiscoverPage mediaType="movie" />} />
                <Route path="/serials" element={<DiscoverPage mediaType="tv" />} />
                <Route path="/bookmarks" element={<BookmarksPage />} />
                <Route path="/movie/:id" element={<MediaDetailsPage mediaType="movie" />} />
                <Route path="/tv/:id" element={<MediaDetailsPage mediaType="tv" />} />
                <Route path="/person/:id" element={<PersonDetailsPage />} />
              </Routes>
            </motion.div>
          </Suspense>
        </AnimatePresence>
      </div>
      <Footer />
    </main>
  );
}

export default App;
