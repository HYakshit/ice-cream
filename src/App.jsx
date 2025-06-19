import "./App.css";
import Card from "./components/common/Card";
import Navbar from "./components/Navbar";
import products from "./data/products";


function App() {
  const links = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "About", path: "/about" },
    { label: "Login", path: "/login" },
  ];

  return (
    <>
      <Navbar links={links} />
   
      {products.map((product) => (
        <Card
        product={product}
        key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          description={product.description}
          category={product.category}></Card>
      ))}

    </>
  );
}

export default App;
