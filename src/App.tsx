import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
// import SignIn from './pages/Authentication/SignIn';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormLayout from './pages/Form/FormLayout';
// import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import AddCategory from './pages/Form/AddCategory';
import SingleOrder from './pages/SingleOrder';
import {io} from 'socket.io-client'
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import Login2 from './pages/Authentication/SignIn2';

// import LoginProtectedRoute from './pages/Authentication/LoginProtectedRoute';



export const socket = io("https://ecommerce-platform-2sjj.onrender.com/",{
  auth : {
    token : localStorage.getItem('token')
  }
})

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();





  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (

    
     <>
      <Toaster position="top-center" />
      <Routes>
      <Route
        index
        element={
                    
          <ProtectedRoute>
          <DefaultLayout>
              <PageTitle title="e-Commerce Dashboard" />
              <ECommerce />
            </DefaultLayout>
          </ProtectedRoute>
       
        }
      />
      <Route
        path="/calendar"
        element={
          
            
            <ProtectedRoute>
              <DefaultLayout>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
              </DefaultLayout>
            </ProtectedRoute>
         
        }
      />
      {/* <Route
        path="/profile"
        element={
          <ProtectedRoute>
          <DefaultLayout>
            <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Profile />
          </DefaultLayout>
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="/forms/form-layout"
        element={
          
            
            <ProtectedRoute>
              <DefaultLayout>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
              </DefaultLayout>
            </ProtectedRoute>
          
        }
      />

      <Route
        path="/forms/add-category"
        element={
          
            
            <ProtectedRoute>
              <DefaultLayout>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AddCategory />
              </DefaultLayout>
            </ProtectedRoute>
          
        }
      />
      <Route
        path="/tables"
        element={
         
            
          <ProtectedRoute>
          <DefaultLayout>
            <PageTitle title="Tables" />
            <Tables />
            </DefaultLayout>
          </ProtectedRoute>
          
        }
      />
      <Route
        path="/order/:id"
        element={
          
            
            <ProtectedRoute>
            <DefaultLayout>
            <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <SingleOrder />
            </DefaultLayout>
            </ProtectedRoute>
          
        }
      />
      <Route
        path="/settings"
        element={
          
            <ProtectedRoute>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </ProtectedRoute>
          
        }
      />
      <Route
        path="/chart"
        element={
        
          <ProtectedRoute>
            <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Chart />
          </ProtectedRoute>
          
        }
      />
      <Route
        path="/ui/alerts"
        element={
          
            <ProtectedRoute>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </ProtectedRoute>
          
        }
      />
      <Route
        path="/ui/buttons"
        element={
          
            <ProtectedRoute>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </ProtectedRoute>
        
        }
      />
     
      <Route
        path="/login"
        element={
          <>
            <PageTitle title="Admin Login" />
            <Login2 />
          </>
        }
      />


      </Routes>
     </>
     

  );
}

export default App;