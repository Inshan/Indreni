import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import AboutData from '../../Data/AboutUsData'

const AboutUs = () => {
    const [data, setData] = useState([]);

    const AboutData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            // Filter the response data by status and page_type
            if (response.data) {
                const DocumentData = response.data.filter(
                    (item) => item.status === "Publish" && item.page_type === "Aboutus"
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
            <div className='py-4 xl:py-16'>
                    <div className="container flex flex-col gap-4 md:gap-10 md:flex-row">
                        <div className='md:w-1/2 flex flex-col'>
                            <div className='flex '>
                                <h1 className='text-2xl font-semibold border-b border-blue pb-2 md:text-3xl'>{data.name}</h1>
                            </div>
                            <p className='pt-4 text-gray-600 text-sm md:text-base' dangerouslySetInnerHTML={{ __html: data.short_desc }}></p>
                            <div className='w-full pt-4 flex items-start md:pt-8'>
                                <Link to='/aboutindreni' className='bg-blue py-2 px-6 text-white transition duration-300 hover:bg-secondaryblue hover:text-blue'>{data.caption}</Link>
                            </div>
                        </div>
                        <div className='md:w-1/2'>
                            <div className='relative w-full h-96 overflow-hidden'>
                                <img src={data.slider_image} alt="" className='absolute w-full h-full object-cover' />
                            </div>
                        </div>
                    </div>

            </div>
        </>
    )
}

export default AboutUs