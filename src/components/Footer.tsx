export default function Footer() {
  return (
    <footer className="text-center text-sm font-medium text-text-secondary p-4">
      <a
        href="https://developers.themoviedb.org/3/getting-started/introduction"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TMDB link"
        title="TMDB link">
        Powered by
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
          alt="TMDB"
          className="w-40 mx-auto"
        />
      </a>
    </footer>
  );
}
