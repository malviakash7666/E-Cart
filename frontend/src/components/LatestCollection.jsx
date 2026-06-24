import React, { useContext, useMemo } from "react";

import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { shopContext } from "../context/ShopContext";

const LatestCollection = () => {
  const { product } = useContext(shopContext);

  // safer + optimized (no extra state)
  const latestProduct = useMemo(() => {
    if (!Array.isArray(product)) return [];
    return product.slice(0, 10);
  }, [product]);

  return (
    <div className="my-10">
      {/* Header */}
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />

        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our latest arrivals curated just for you. Fresh styles,
          trending products and best picks of the season.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProduct.length > 0 ? (
          latestProduct.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products available
          </p>
        )}
      </div>
    </div>
  );
};

export default LatestCollection;