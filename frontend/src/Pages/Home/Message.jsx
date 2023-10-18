import React, {useState, useEffect} from 'react'
import axios from 'axios'
// import VisionImage from '../../assets/visionImage.jpeg'
// import MDMessageImage from '../../assets/mdmessage.jpeg'
import { Link } from 'react-router-dom'
import MessageFromPresident from '../Messages/MessageFromPresident'

const Message = () => {
    const [data, setData] = useState([]);

    const AboutData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            // Filter the response data by status and page_type
            if (response.data) {
                const DocumentData = response.data.filter(
                    (item) => item.status === "Publish" && item.page_type === "MessageHome"
                );
                setData(DocumentData[0]); // Assuming you want to slice the filtered data
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        // Axios GET request to fetch data
        AboutData();
    }, []);

    return (
        <>
            <div className='w-full flex flex-col xl:flex-col xl:gap-10 md:gap-4'>
                <Link to='/messagefrompresident' className='w-full h-96 bg-red-400 overflow-hidden group' onClick={() => handleActiveLink(1)}>
                    <div className='relative w-full h-96'>
                        <img src={data.bannerimage} alt="" className='absolute w-full h-full object-cover transition duration-300 group-hover:scale-105' />
                        <div className='absolute w-full h-96 bg-black z-10 opacity-20'></div>
                        <div className='absolute w-full bottom-0 left-0 bg-gray-100 text-center py-4 z-10'>
                            <h1 className='text-xl text-black font-semibold'>{data.title}</h1>
                        </div>
                    </div>
                </Link>
                <Link to='/boardgovernance' className='w-full h-96 bg-red-400 overflow-hidden group' onClick={() => handleActiveLink(1)}>
                    <div className='relative w-full h-96 overflow-hidden'>
                        <img src={data.slider_image} alt="" className='absolute w-full h-full object-cover  transition duration-300 group-hover:scale-105' />
                        <div className='absolute w-full h-96 bg-black z-10 opacity-20'></div>
                        <div className='absolute w-full bottom-0 left-0 bg-gray-100 text-center py-4 z-10'>
                            <h1 className='text-xl text-black font-semibold'>{data.meta_title}</h1>
                        </div>
                    </div>
                </Link>

            </div>
        </>
    )
}

export default Message