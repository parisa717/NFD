import logo from '../../assets/img/logo/logo.png';
import moment from "jalali-moment";

const Menu = () => {
  let todayJalali = moment().locale('fa').format('D  MMMM  YYYY');

  return (
    <header id="page-topbar">
     <div className='container'>
     <div className="flex justify-between items-center  h-[100%] ">
         <div>

           <img className='w-[150px]' src={logo}/>
         </div>
         <div>
          <p className='text-[#fff] text-[20px]'>      امروز {todayJalali}</p>

         </div>
       </div>
     </div>
    </header>
  )
}

export default Menu