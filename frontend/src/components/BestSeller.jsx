import React, { useContext, useMemo } from "react";
import { shopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { product } = useContext(shopContext);

  // optimized + safe derived data
  const bestSeller = useMemo(() => {
    if (!Array.isArray(product)) return [];

    return product
      .filter((item) => item.bestSeller)
      .slice(0, 5);
  }, [product]);

  return (
    <div className="my-10">
      {/* Heading */}
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />

        <p className="w-3/4 mx-auto text-xs sm:text-base text-gray-600">
          Discover our most popular and highly rated products chosen by customers.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.length > 0 ? (
          bestSeller.map((item) => (
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
            No best sellers found
          </p>
        )}
      </div>
    </div>
  );
};

export default BestSeller;