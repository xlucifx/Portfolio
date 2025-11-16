import { useState, useEffect } from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import SquareContent from "./components/Square";
import Footer from "./components/Footer";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import './styles/styles.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState("portfolio");
  const [isPageTransition, setIsPageTransition] = useState(false);

  const handlePageChange = (page: string) => {
    if (page !== currentPage) {
      setIsPageTransition(true);
      setTimeout(() => {
        setCurrentPage(page);
        setIsPageTransition(false);
      }, 300);
    }
  };

  return (
    <div className="app-root">
      <Header />
      <Menu currentPage={currentPage} setCurrentPage={handlePageChange} />

    
      <div className="center-area">
        <SquareContent>
          {!isPageTransition && (
            currentPage === "portfolio" ? <Portfolio /> : <About />
          )}
        </SquareContent>
      </div>

      <Footer />
    </div>
  );
}