import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

function FilterableProductTable() {
  const [itemFilter, setItemFilter] = useState("");
  const [showInStock, setShowInStock] = useState(false);

  const filteredProducts = PRODUCTS.filter((product) => {
    if (showInStock && !product.stocked) {
      return;
    }
    return product.name.toLowerCase().includes(itemFilter.toLowerCase());
  });

  function handleFilterChange(e) {
    setItemFilter(e.target.value);
  }

  function handleShowStocked(e) {
    setShowInStock(e.target.checked);
  }

  return (
    <main>
      <FilterMenu
        onFilterChange={handleFilterChange}
        onShowStocked={handleShowStocked}
      />
      <Separator />
      <ProductTable products={filteredProducts} />
    </main>
  );
}

function FilterMenu({ onFilterChange, onShowStocked }) {
  return (
    <section className="filter-menu">
      <input
        type="search"
        name="itemFilter"
        id="itemFilter"
        placeholder="Search..."
        className="search-box"
        onChange={(e) => onFilterChange(e)}
      />
      <div>
        <input
          type="checkbox"
          name="showInStock"
          id="showInStock"
          onChange={(e) => onShowStocked(e)}
        />
        <label htmlFor="showInStock">Only show products in stock</label>
      </div>
    </section>
  );
}

function ProductTable({ products }) {
  const fruits = [];
  const vegetables = [];

  products.forEach((product) => {
    // if product belongs to fruits, push to fruits array,
    // else push to vegetables since we only have two categories
    product.category === "Fruits"
      ? fruits.push(product)
      : vegetables.push(product);
  });

  return (
    <section>
      <table className="product-table">
        <thead>
          {/* Headings */}
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <SubTable category="Fruits" products={fruits} />
          <SubTable category="Vegetables" products={vegetables} />
        </tbody>
      </table>
    </section>
  );
}

function SubTable({ category, products }) {
  if (products.length === 0) {
    return;
  }

  const productList = products.map((product) => {
    const rowClassName = product.stocked ? "" : "no-stock";

    return (
      <tr key={product.name} className={rowClassName}>
        <td>{product.name}</td>
        <td>{product.price}</td>
      </tr>
    );
  });

  return (
    <>
      <tr className="category-row">
        <th colSpan={2}>{category}</th>
      </tr>

      {/* RENDER ALL ITEMS IN THE CATEGORY */}
      {productList}
    </>
  );
}

function Separator() {
  return <div className="separator"></div>;
}

export default function App() {
  return <FilterableProductTable />;
}
