import { useEffect, useState } from "react";

const MultipleVariant = ({ data, handleAddtoCart }) => {
  if (!data) return null;
  const [mainImage, setmainImage] = useState("");
  const [allImage, setallimage] = useState([]);
  const [EachVariant, setEachVariant] = useState(data.variant[0] || {});
  const [size, setsize] = useState("");

 

  useEffect(() => {
    if (data) {
      setmainImage(data.variant[0].image[0]);

      // get all image into variant
      let imageArr = [];
      data.variant.map((item) => {
        imageArr.push(item.image);
      });

      const all = imageArr.flatMap((item) => item);
      setallimage(all);
    }
    
  }, [data]);

  // handleVariant
  const handleVariant = (variant) => {

    setEachVariant(variant);
  };

  const handleMutipleVariantAddtoCart = () => {
    const varinatAddTocartPayload = {
      user: null,
      guestId: localStorage.getItem("guestId"),
      productId: null,
      variantId: EachVariant._id,
      color: EachVariant.color,
      size: size,
      quantity: 1,
    };

    handleAddtoCart(varinatAddTocartPayload)
  
  };

  return (
    <div>
      <div>
        <div className="flex flex-wrap -mx-4">
          {/* LEFT: IMAGES */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            {/* Main Image */}
            <img
              src={mainImage}
              alt={mainImage}
              className="w-full h-auto rounded-lg shadow-md mb-4"
            />

            {/* Thumbnails */}
            <div className="flex gap-4 py-4 justify-center overflow-x-auto customscrollbar">
              {allImage.map((img, index) => (
                <img
                  onClick={() => setmainImage(img)}
                  key={index}
                  src={
                    img ||
                    "https://backend.micloglobal.com/uploads/all/RCMti3K4xUevxJFo7g5WI2vVw9US6KvXKb9dHvGg.png"
                  }
                  className="size-16 w-20 h-20 sm:size-20 object-cover rounded-md opacity-60 hover:opacity-100 transition cursor-default"
                />
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div>
            <h2>{data?.name}</h2>
            <h2>{data?.sku}</h2>
            {/* variant info */}
            <div>
              <h2>{EachVariant.variantName}</h2>
              <div>
                {data?.variant?.map((v) => (
                  <div
                    className="flex gap-x-3 shadow-lg"
                    onClick={() => handleVariant(v)}
                  >
                    {v.image.map((img) => (
                      <img
                        src={img}
                        alt=""
                        className="w-20 h-20 object-cover"
                      />
                    ))}
                  </div>
                ))}
              </div>
              {/* size */}
              <h2> This Size{EachVariant.size} Available </h2>

              {/* all sizes */}
              <div className="flex gap-x-4 cursor-pointer">
                {EachVariant.sizes?.map((size) => (
                  <div
                    className="p-5 bg-gray-400/40 text-black"
                    onClick={() => setsize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
              {/* price */}
              <h2>{EachVariant.retailPrice} Tk</h2>
            </div>

            {/* add to cart */}
            <button
              className="px-3 py-2 bg-black text-white"
              onClick={handleMutipleVariantAddtoCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleVariant;
