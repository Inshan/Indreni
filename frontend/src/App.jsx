import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Components/Header'
import Footer from './Components/Footer'

const App = () => {
  const [data, setData] = useState();

  const headerData = async () => {

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/globals/');
      // Handle the response data here
      response.data && setData(response.data[0]);
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    // Axios GET request to fetch data
    headerData();
  }, []);


  return (
    <>
      <div className="container hidden md:block">
        <div className='w-full py-1 flex flex-col justify-between items-center md:flex-row'>
          <div className='flex flex-col gap-2 text-white md:flex-row'>
            <div className='flex items-center gap-1'>
              <div className='w-6 h-6 bg-white rounded-full flex justify-center items-center'>
                <i className="fa-solid fa-phone text-blue"></i>
              </div>
              <p className='text-sm text-black'>{data && data.Sitecontact}</p>
            </div>
            <div className='flex items-center gap-1 text-white'>
              <div className='w-6 h-6 bg-white rounded-full flex justify-center items-center'>
                <i className="fa-regular fa-paper-plane text-blue"></i>
              </div>
              <p className='text-sm text-black'>{data && data.Siteemail}</p>s
            </div>
          </div>

          <div className=' gap-2 hidden md:flex'>
            <div className='w-6 h-6 bg-white rounded-full flex justify-center items-center'>
              <a href={data && data.Sitefacebooklink}><i className="fa-brands fa-facebook-f text-blue"></i></a>
            </div>
            <div className='w-6 h-6 bg-white rounded-full flex justify-center items-center'>
              <a href={data && data.Siteyoutubelink}><i className="fa-brands fa-youtube text-blue"></i></a>
            </div>
            <div className='w-6 h-6 bg-white rounded-full flex justify-center items-center'>
              <a href={data && data.Sitelink1}><i className="fa-brands fa-twitter text-blue"></i></a>
            </div>
          </div>

        </div>
      </div >
      <Header />
      <Footer />
    </>
  )
}

export default App