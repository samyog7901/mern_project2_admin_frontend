import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addBulkProducts, fetchProducts, resetStatus } from "../../store/dataSlice";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import toast from "react-hot-toast";

const BulkUpload = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.datas);

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a CSV file");
    dispatch(addBulkProducts(file));
  };
  

  useEffect(() => {
    if (status === "success") {
      toast.success("Bulk products uploaded successfully!");
      dispatch(fetchProducts()); // refresh product list
      dispatch(resetStatus());
      navigate("/tables", { state: { scrollTo: "top-products" } });
    }
    if (status === "error") {
      toast.error("Bulk upload failed!");
      dispatch(resetStatus());
    }
  }, [status, dispatch, navigate]);

  return (
    <>
      <Breadcrumb pageName="Bulk Upload Products" />
      <div className="flex justify-center py-12">
        <div className="bg-white dark:bg-gray-800 w-full max-w-3xl shadow-xl rounded-2xl p-8 transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 border-b pb-3">
            📄 Upload CSV File
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                CSV File (with image URLs)
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-800 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-fit p-3 rounded-lg bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold text-lg shadow-md hover:opacity-90 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Upload CSV
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BulkUpload;
