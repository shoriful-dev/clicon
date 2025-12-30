const SingleVariant = ({ data, handleAddtoCart }) => {
  
  const handleSingleVariantAddtoCart = () => {
    const cartPayload = {
      user: null,
      guestId: localStorage.getItem("guestId"),
      productId: data._id,
      variantId: null,
      color: data.color,
      size: data.size,
      quantity: 1,
    };
    handleAddtoCart(cartPayload)
   
    
  };
  return (
    <div>
      <div className="flex flex-wrap -mx-4">
        {/* LEFT: IMAGES */}
        <div className="w-full md:w-1/2 px-4 mb-8">
          <img
            src={data?.image[0]}
            alt={data?.image[0]}
            className="w-full h-auto rounded-lg shadow-md mb-4"
          />

          {/* Thumbnails */}
          <div className="flex gap-4 py-4 justify-center overflow-x-auto customscrollbar">
            {data?.image.map((img, index) => (
              <img
                key={index}
                src={img}
                className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition"
              />
            ))}
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div className="w-full md:w-1/2 px-4">
          <h2 className="heading2 mb-2">{data?.name}</h2>
          <p className="text-gray_600 mb-1">SKU: {data?.sku}</p>

          {/* Price */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl font-semibold text-primary">
              ${data?.retailPrice}
            </span>
          </div>

          {/* Stock */}

          <p
            className={`mb-4 text-sm ${
              data?.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            Stock: {data?.stock}
          </p>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-6">
            {data?.description}
          </p>

          {/* Add to Cart */}
          <button
            className="bg-black text-white px-6 py-3 rounded-lg text-lg shadow hover:bg-primary/80 transition mb-6 cursor-pointer"
            onClick={handleSingleVariantAddtoCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleVariant;
