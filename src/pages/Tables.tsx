import { useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableFour from '../components/Tables/TableFour';
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/TableThree';
import TableTwo from '../components/Tables/TableTwo';
import { useLocation } from 'react-router-dom';

const Tables = () => {
  const location = useLocation()
  
  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) el.scrollIntoView({ behavior: "auto",block: "center" }); // instant jump
    }
  }, [location]);

 
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <div id='top-products'><TableTwo /></div>
        <div id='orders'><TableThree /></div>
        <div id='categories'><TableFour /></div>
      </div>
    </>
  );
};

export default Tables;
