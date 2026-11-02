import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";

const products = [
  {
    id: 1,
    name: "Nike Air Max",
    price: 129,
    color: "Black",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Adidas Runner",
    price: 99,
    color: "White",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Puma Street",
    price: 110,
    color: "Blue",
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "New Balance Flow",
    price: 140,
    color: "Gray",
    image:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Under Armour Elite",
    price: 150,
    color: "Red",
    image:
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Vans Classic",
    price: 85,
    color: "Brown",
    image:
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=800&q=80",
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(200);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesPrice = product.price <= maxPrice;

    return matchesSearch && matchesPrice;
  });

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.flatMap((item) => {
        if (item.id !== productId) {
          return [item];
        }

        if (item.quantity === 1) {
          return [];
        }

        return [{ ...item, quantity: item.quantity - 1 }];
      })
    );
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="app">
      <Header title="SoleMate" />

      <main className="shop">
        <section className="products">
          <h2>Featured Shoes</h2>

          <div className="filters">
            <input
              type="text"
              placeholder="Search shoes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <label>
              Max price:
              <input
                type="range"
                min="50"
                max="200"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <span> $ {maxPrice}</span>
            </label>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="no-results">No shoes match your filters.</p>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}
        </section>

        <Cart
          items={cart}
          onRemoveFromCart={removeFromCart}
          onIncreaseQuantity={increaseQuantity}
          onDecreaseQuantity={decreaseQuantity}
          totalItems={totalItems}
          totalPrice={totalPrice}
        />
      </main>
    </div>
  );
}

export default App;