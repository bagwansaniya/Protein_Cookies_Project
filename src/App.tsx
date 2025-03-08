import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Cart } from "./pages/Cart";
import { About } from "./pages/About";

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <Shop />
                  <About />
                </>
              }
            />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
