interface MenuProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Menu({ currentPage, setCurrentPage }: MenuProps) {
  return (
    <nav className="site-menu">
      <button
        onClick={() => setCurrentPage("portfolio")}
        className={`menu-button ${currentPage === "portfolio" ? "active" : ""}`}
      >
        Portfolio
      </button>
      <button
        onClick={() => setCurrentPage("about")}
        className={`menu-button ${currentPage === "about" ? "active" : ""}`}
      >
        About Me
      </button>
    </nav>
  );
}
