import { useState, useEffect } from "react";
import "./App.css";
import ProductCard from "./ProductCard";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Count has changed:", count);
  }, [count]);

  useEffect(() => {
    const fetchingdata = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) throw new Error("Failed to fetch data");
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchingdata();
  }, []);

  return (
    <div className="container">
      <div className="count">Count: {count}</div>
      <button className="btn" onClick={() => setCount(count + 1)}>
        Increment
      </button>

      {loading && <div className="data-block">Loading products...</div>}
      {error && (
        <div className="data-block" style={{ color: "red" }}>
          Error: {error}
        </div>
      )}

      {!loading && !error && data && (
        <div className="products-grid">
          {data.products &&
            data.products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
