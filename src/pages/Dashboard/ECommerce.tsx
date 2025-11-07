import React, { useEffect } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCaetgories, fetchOrders, fetchProducts, fetchUsers } from '../../store/dataSlice';

const ECommerce: React.FC = () => {
const {orders,products,users,categories} = useAppSelector((state)=>state.datas)
const dispatch = useAppDispatch()
const counts = { 
  ordersCount : orders.length, 
  usersCount : users.length, 
  productsCount: products.length,
  categoriesCount : categories.length
}

  useEffect(() => {
    dispatch(fetchCaetgories());
    dispatch(fetchUsers());
    dispatch(fetchProducts());
    dispatch(fetchOrders());
  }, [dispatch]);


  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total orders" total={counts.ordersCount} levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z"
              fill=""
            />
            <path
              d="M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z"
              fill=""
            />
            <path
              d="M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C14.2281 14.7812 15.3281 13.8187 15.5 12.5469L16.9437 2.26874C16.9437 2.19999 17.0125 2.16562 17.0812 2.16562H18.9375C19.35 2.16562 19.7281 1.82187 19.7281 1.37499C19.7281 0.928119 19.4187 0.618744 19.0062 0.618744ZM14.0219 12.3062C13.9531 12.8219 13.5062 13.2 12.9906 13.2H3.7781L1.92185 7.56249H14.7094L14.0219 12.3062Z"
              fill=""
            />
          </svg>

        </CardDataStats>
        <CardDataStats title="Total Users" total={counts.usersCount}  levelUp>
        <svg
          className="fill-primary dark:fill-white"
          width="20"
          height="22"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3s-1.33-3-2.99-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V20h6v-3.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>

        </CardDataStats>
        <CardDataStats title="Total Products" total={counts.productsCount} levelUp>
        <svg
          className="fill-primary dark:fill-white"
          width="20"
          height="22"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21 16V8a1 1 0 00-.553-.894l-8-4a1 1 0 00-.894 0l-8 4A1 1 0 003 8v8a1 1 0 00.553.894l8 4a1 1 0 00.894 0l8-4A1 1 0 0021 16zm-9 3.618L5 15.382V9.618l7 4.236v5.764zm1-5.764l7-4.236v5.764l-7 4.236V13.854zM12 12L5 7.764l7-3.5 7 3.5L12 12z"/>
        </svg>

        </CardDataStats>
        <CardDataStats title="Total Categoris" total={counts.categoriesCount} levelUp>
        <svg
          className="fill-primary dark:fill-white"
          width="20"
          height="22"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 4h8v8H3V4m0 10h8v6H3v-6m10-10h8v4h-8V4m0 6h8v10h-8V10z"/>
        </svg>

        </CardDataStats>
   
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
