import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { addCategory, resetStatus } from '../../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Status } from '../../types/status';
import { Tag } from 'lucide-react'; // icon for a modern touch
import {toast} from 'react-hot-toast';


const AddCategory = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.datas);
  const navigate = useNavigate();

  const [data, setData] = useState({
    categoryName: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.categoryName.trim()) return toast.error("Category name cannot be empty");
    dispatch(addCategory(data));
    setSubmitted(true);
  };
  
  useEffect(() => {
    if (submitted && status === Status.SUCCESS) {
      toast.success("New category added successfully!");
      navigate("/tables");
      dispatch(resetStatus());
      setSubmitted(false); // prevent multiple triggers
    }
  }, [submitted, status, navigate, dispatch]);
  
  
  
  

  return (
    <>
      <Breadcrumb pageName="Add Category" />

      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 ">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300 ">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
            Add New Category
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input field */}
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="categoryName"
                id="categoryName"
                value={data.categoryName}
                onChange={handleChange}
                placeholder="Enter category name"
                className="w-full pl-10 pr-4 py-3 dark:bg-black  border-gray-300 dark:border-blue-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none  text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-lgfont-medium py-3 rounded-lg shadow-md hover:opacity-90  transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Add Category
            </button>

            {/* Status Message */}
            {status === Status.LOADING && (
              <p className="text-center text-yellow-600 mt-2 animate-pulse">
                Adding category...
              </p>
            )}
            {status === Status.ERROR && (
              <p className="text-center text-red-600 mt-2">
                Failed to add category. Try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
