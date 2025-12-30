import { useState } from "react";
import { FaCross } from "react-icons/fa";

import { BreadCrumb } from "@/components/commonComponents/BreadCrumb";
import Container from "@/components/commonComponents/Container";
import Product from "@/components/commonComponents/Product";
import SearchTab from "@/components/Shop/Right/SearchTab";
import { useallproduct } from "@/hooks/useapi";

// ------------------------------------------------------
// STATIC UI DUMMY DATA (No API required anymore)
// ------------------------------------------------------

const dummyCategories = [
  { id: 1, title: "Electronics" },
  { id: 2, title: "Clothing" },
  { id: 3, title: "Gaming" },
  { id: 4, title: "Shoes" },
];

const dummyProducts = {
  data: {
    products: [
      {
        id: 1,
        title: "Wireless Headphones",
        price: 99,
        thumbnail: "https://via.placeholder.com/300",
      },
      {
        id: 2,
        title: "Smartphone",
        price: 299,
        thumbnail: "https://via.placeholder.com/300",
      },
      {
        id: 3,
        title: "Gaming Mouse",
        price: 49,
        thumbnail: "https://via.placeholder.com/300",
      },
      {
        id: 4,
        title: "Running Shoes",
        price: 120,
        thumbnail: "https://via.placeholder.com/300",
      },
    ],
  },
};

const dummyTags = [
  { id: 1, name: "Apple", checked: false },
  { id: 2, name: "Samsung", checked: false },
  { id: 3, name: "Sony", checked: false },
  { id: 4, name: "Nike", checked: false },
];

const Shop = () => {
  const [categories] = useState(dummyCategories);
  const [products, setProducts] = useState(dummyProducts);
  const [tags, setTags] = useState(dummyTags);

  const { data  ,isPending} = useallproduct();
  if(isPending) return <h1>loading ..</h1>


  return (
    <div>
      <BreadCrumb />

      <Container>
        <div className="grid grid-cols-[20%80%] gap-x-5">
          {/* LEFT SIDE */}
          <div className="h-full py-10">
            {/* TAG FILTER (BRANDS) */}
            <div className="p-4 bg-white rounded shadow mt-4">
              <h3 className="font-semibold mb-3">Popular Brands</h3>

              <div className="flex flex-col gap-2">
                {tags.map((tag) => (
                  <label
                    key={tag.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={tag.checked}
                      onChange={() => toggleTag(tag.id)}
                    />
                    <span>{tag.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="py-10 h-full">
            <SearchTab />

            {/* ACTIVE FILTERS */}
            <div className="bg-gray_50 py-4 my-4 flex justify-between px-4 items-center">
              <div className="flex items-center gap-x-4">
                <span>Active Filters:</span>

                <div className="flex items-center gap-x-3">
                  {["Electronics"].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-x-2 px-2 py-1 bg-white shadow rounded"
                    >
                      <span>{item}</span>
                      <FaCross className="cursor-pointer" />
                    </div>
                  ))}
                </div>
              </div>

              <span>{products.data.products.length} Results found.</span>
            </div>

            {/* PRODUCT GRID */}
            <Product
              productInfo={data.data.data}
              isloading={isPending}
              isError={null}
              productWidth="255"
              paritalItemLoad={30}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
