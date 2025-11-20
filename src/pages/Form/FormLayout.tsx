import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { AddProduct, addProduct, fetchCaetgories, resetStatus } from "../../store/dataSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Status } from "../../types/status";
import toast from "react-hot-toast";

// interface Category {
//   id: string;
//   categoryName: string;
// }

const FormLayout = () => {
  const dispatch = useAppDispatch();
  const { status,categories } = useAppSelector((state) => state.datas);
  const navigate = useNavigate();

  // const [categories, setCategories] = useState<Category[]>([]);
  const [data, setData] = useState<AddProduct>({
    productName: "",
    categoryId: "",
    imageUrl: null,
    description: "",
    price: 0,
    stockQty: 0,
  });

  // const fetchCategories = async () => {
  //   const response = await API.get("admin/category");
  //   if (response.status === 200) {
  //     setCategories(response.data.data);
  //   }
  // };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setData({
      ...data,
      [name]: name === "image" ? files?.[0] : value,
    });
  };
  
  const [productSubmitted, setProductSubmitted] = useState(false)
  const handleSubmit =  (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.productName.trim() || data.price == 0 || data.stockQty == 0 || !data.description.trim() || !data.categoryId.trim()) return toast.error("Please fill in all the input fields.");
    dispatch(addProduct(data));
    setProductSubmitted(true)
  };

  useEffect(() => {
    dispatch(fetchCaetgories())
  }, [dispatch]);
  useEffect(()=>{
    if(productSubmitted && status === Status.SUCCESS){
      toast.success("New Product addded successfully");
      navigate("/tables",{state: {scrollTo:"top-products"}})
      dispatch(resetStatus())
      setProductSubmitted(false)
    }
  },[productSubmitted,status,navigate,dispatch])

  return (
    <>
      <Breadcrumb pageName="Add New Product" />

      <div className="flex justify-center py-12">
        <div className="bg-white dark:bg-gray-800 w-full max-w-4xl shadow-xl rounded-2xl p-8 transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 border-b pb-3">
            🛒 Add Product Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Product Name
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="productName"
                id="productName"
                placeholder="Enter product name"
                className="w-full rounded-lg border border-gray-300 dark:border-blue-700  dark:bg-black p-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Product Description */}
            <div>
              <label
                htmlFor="productDescription"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Product Description
              </label>
              <textarea
                onChange={handleChange}
                name="description"
                id="productDescription"
                rows={4}
                placeholder="Describe your product"
                className="w-full rounded-lg border border-gray-300 dark:border-blue-700 bg-gray-50 dark:bg-black p-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>

            {/* Row: Price and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Price (Rs)
                </label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Enter price"
                  className="w-full rounded-lg border border-gray-300 dark:border-blue-700 bg-gray-50 dark:bg-black p-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="stockQty"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Stock Quantity
                </label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="stockQty"
                  id="stockQty"
                  placeholder="Enter stock quantity"
                  className="w-full rounded-lg border border-gray-300 dark:border-blue-700 bg-gray-50 dark:bg-black p-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Category Dropdown */}
            <div>
              <label
                htmlFor="categoryId"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Product Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 dark:border-blue-700 bg-gray-50 dark:bg-black p-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Product Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                // accept="image/*"
                onChange={handleChange}
                className="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-700 file:text-white hover:file:bg-yellow-900 transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-fit  p-3  rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-lg shadow-md hover:opacity-90 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              ➕ Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormLayout;
