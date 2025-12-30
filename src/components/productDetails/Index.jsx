import { useAddToCart, usesingleproduct } from "@/hooks/useapi";
import { useParams } from "react-router";
import { BreadCrumb } from "../commonComponents/BreadCrumb";
import MultipleVariant from "./MultipleVariant";
import SingleVariant from "./SingleVariant";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { data, isPending } = usesingleproduct(id);
  const addToCart =  useAddToCart()

  if (isPending) return <h1>loading ...</h1>;

  const handleAddtoCart = (cartItem) => {
    // console.log(cartItem);
    addToCart.mutate(cartItem)
  };

  return (
    <div>
      <BreadCrumb />

      <div className="bg-gray_50 py-10">
        <div className="container mx-auto px-4">
          {data.data.data.variantType == "multipleVariant" ? (
            <MultipleVariant
              data={data.data.data}
              handleAddtoCart={handleAddtoCart}
            />
          ) : (
            <SingleVariant
              data={data.data.data}
              handleAddtoCart={handleAddtoCart}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
