import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product-list/components/ProductList";

function Home() {
  return (
    <Navbar>
      <ProductList></ProductList>
    </Navbar>
  );
}

export default Home;
