import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import NewsData from '../../Data/NewsData.jsx'

const News = () => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);

    const AboutData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            if (response.data) {
                const DocumentData = response.data.filter(
                    (item) => item.status === "Publish" && item.page_type === "News Detail"
                );
                setData(DocumentData); // Assuming you want to slice the filtered data
            }
            if (response.data) {
                const DocumentData1 = response.data.filter(
                    (item) => item.status === "Publish" && item.page_type === "News Detail Data"
                );
                setData1(DocumentData1); // Assuming you want to slice the filtered data
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
                <div className='container'>
                    <div className='flex justify-center items-center'>
                        <h1 className='text-2xl font-semibold border-b border-blue md:pb-2 text-black md:text-3xl'>{data.title}</h1>
                    </div>

                    <div className='flex gap-4 xl:gap-10 md:gap-2 md:py-10 py-2 flex-wrap'>
                        {data1.slice(0, 1).map((item) => (
                            <>
                                <Link to={`/newsdetail/${item.id}`} className='xl:w-[816px] md:w-[736px] lg:w-full w-full'>
                                    <div className='relative w-full xl:h-96 overflow-hidden h-40'>
                                        <img src={item.slider_image} alt="" className='absolute w-full h-full object-cover' />
                                        <div className='absolute top-0 left-0 w-full h-96 bg-black opacity-60'></div>
                                        <div className='absolute bottom-5 left-5 flex flex-col'>
                                            <div className='flex'>
                                                <p className='text-white text-lg font-semibold border-b border-yellow'><i className="fa-regular fa-calendar pe-4"></i> {item.photodate}</p>
                                            </div>
                                            <p className='text-gray-200 text-lg'>{item.title}</p>
                                        </div>
                                    </div>
                                </Link>
                            </>
                        ))}
                        {data1.slice(1, 5).map((item) => (
                            <>
                                <Link to={`/newsdetail/${item.id}`} className='xl:w-[389px] md:w-[364px] lg:w-[492px] w-full bg-gray-200 flex-col md:flex-row'>
                                    <div className='relative w-full xl:h-96 overflow-hidden h-40'>
                                        <img src={item.slider_image} alt="" className='absolute w-full h-full object-cover' />
                                        <div className='absolute top-0 left-0 w-full h-96 bg-black opacity-40'></div>
                                        <div className='absolute bottom-5 left-5 flex flex-col'>
                                            <div className='flex'>
                                                <p className='text-white text-lg font-semibold border-b border-yellow'><i className="fa-regular fa-calendar pe-4"></i> {item.photodate} </p>
                                            </div>
                                            <p className='text-gray-200 text-lg'>{item.title}</p>
                                        </div>
                                    </div>
                                </Link>
                            </>
                        ))}
                    </div>
                
                </div>
            </div>
        </>
    )
}

export default News