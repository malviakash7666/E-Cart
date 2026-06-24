import React, { useContext, useMemo, useState } from "react";
import { shopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { useNavigate } from "react-router-dom";

const Collection = () => {
  const { product, search, showSearch, isAuthenticated } = useContext(shopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [sortType, setSortType] = useState("relevant");

  const [category, setCategory] = useState([]);
  const [subCategory, setsubCategory] = useState([]);

  const navigate = useNavigate();

  // ===============================
  // CATEGORY TOGGLE
  // ===============================
  const toggleCategory = (e) => {
    const value = e.target.value;

    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  // ===============================
  // SUBCATEGORY TOGGLE
  // ===============================
  const toggleSubcategory = (e) => {
    const value = e.target.value;

    if (subCategory.includes(value)) {
      setsubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setsubCategory((prev) => [...prev, value]);
    }
  };

  // ===============================
  // FILTER + SEARCH (OPTIMIZED)
  // ===============================
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(product)) return [];

    let temp = [...product];

    // search filter
    if (search && showSearch) {
      temp = temp.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // category filter
    if (category.length > 0) {
      temp = temp.filter((item) =>
        category.includes(item.category)
      );
    }

    // subcategory filter
    if (subCategory.length > 0) {
      temp = temp.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // sorting
    switch (sortType) {
      case "low-high":
        temp.sort((a, b) => a.price - b.price);
        break;

      case "high-low":
        temp.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }

    return temp;
  }, [product, search, showSearch, category, subCategory, sortType]);

  // ===============================
  // PRODUCT CLICK → LOGIN CHECK
  // ===============================
  const handleProductClick = (id) => {
    if (isAuthenticated) {
      navigate(`/product/${id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* FILTERS */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${
              showFilter ? "rotate-90" : ""
            }`}
            alt=""
          />
        </p>

        {/* CATEGORY */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <label className="flex gap-2">
              <input
                type="checkbox"
                value="Men"
                onChange={toggleCategory}
              />
              MEN
            </label>

            <label className="flex gap-2">
              <input
                type="checkbox"
                value="Women"
                onChange={toggleCategory}
              />
              WOMEN
            </label>

            <label className="flex gap-2">
              <input
                type="checkbox"
                value="Kids"
                onChange={toggleCategory}
              />
              KIDS
            </label>
          </div>
        </div>

        {/* SUBCATEGORY */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <label className="flex gap-2">
              <input
                type="checkbox"
                value="Topwear"
                onChange={toggleSubcategory}
              />
              Topwear
            </label>

            <label className="flex gap-2">
              <input
                type="checkbox"
                value="Bottomwear"
                onChange={toggleSubcategory}
              />
              Bottomwear
            </label>

            <label className="flex gap-2">
              <input
                type="checkbox"
                value="Winterwear"
                onChange={toggleSubcategory}
              />
              Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.map((item) => (
            <div
              key={item._id}
              onClick={() => handleProductClick(item._id)}
              className="cursor-pointer"
            >
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;