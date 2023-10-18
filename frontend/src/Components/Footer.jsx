import React, {useEffect, useState} from 'react'
import axios from 'axios'
// import SampleLogo from '../assets/sample-logo.png'
const Footer = () => {
  const [data, setData] = useState()

  const headerData = async () =>{
      try {
          const response = await axios.get('http://127.0.0.1:8000/api/globals/');
          // Handle the response data here
          response.data && setData(response.data[0]);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  }
  useEffect(() => {
      // Axios GET request to fetch data
      headerData();
  
  }, []);

  return (
    <>
      <div className='bg-gray-800 py-4 md:py-8'>
        <div className='container'>
          <div className='flex flex-col gap-4 md:gap-10 items-center border-b md:pb-16 md:flex-row'>

            <div className='md:w-1/2'>
              <div className='relative w-full h-20'>
                {data && <h1 className='text-2xl md:text-3xl text-white'>{data.Sitename}</h1>}
                {/* <img src={SampleLogo} alt="" className='absolute w-full h-full' /> */}
              </div>
            </div>

            <div className='md:w-1/2'>
              {data && <p className='text-gray-100 text-sm pb-8 md:pb-0 md:text-base '>
                {data.Sitedescription}
              </p>}
            </div>
          </div>

          <div className='flex flex-col gap-4 md:gap-10 md:items-start md:py-8 md:flex-row'>

            <div className='md:w-1/2 flex flex-col '>
              {data && <h1 className='text-white text-2xl font-semibold pb-5 hidden md:block'>{data.Sitename}</h1>}
              {data && <p className='text-white border-b py-2 text-sm md:text-base'>Address: {data.Siteaddress}</p>}
              {data && <p className='text-white border-b py-2 text-sm md:text-base'>Phone No.: {data.Sitecontact}</p>}
              {data && <p className='text-white py-2 text-sm md:text-base'>E-mail: {data.Siteemail}</p>}
            </div>

            <div className='md:w-1/2'>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3537.2007296508013!2d83.75452057640958!3d27.55628013213639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399425007e6b641f%3A0xec393cd39c4f09f1!2sIndreni%20social%20development%20forum!5e0!3m2!1sen!2snp!4v1694418735133!5m2!1sen!2snp" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className='w-full'></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className=' bg-blue'>
        <div className='container flex justify-center py-2'>
          <p className='text-sm text-white'>Copyright © 2023 Indreni Nepal All Rights Reserved. Developed By <span className='text-yellow'>Radiant Infotech Nepal</span></p>
        </div>

      </div>
    </>
  )
}

export default Footer