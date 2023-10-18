import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
// import AboutImage from '../../assets/about_Indreni_Image/aboutindreniImage.jpeg'
// import Image1 from '../../assets/about_Indreni_Image/image1.jpeg'
import NewsData from '../../Data/NewsData.jsx'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from '@chakra-ui/react'

const NewsDetail = () => {
    const { id } = useParams();
    const Id = parseInt(id);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);

    const AboutData = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/navigations/`
            );

            const DocumentData = response.data.filter(
                (item) => item.status === "Publish" && item.page_type === "News Detail"
            );
            setData(DocumentData[0]); // Assuming you want to slice the filtered data
            // }
            // if (response.data) {
            const Document1Data = response.data.filter(
                (item) => item.status === "Publish" && item.page_type === "News Detail Data"
            );
            setData1(Document1Data.find(data => data.id === Id));

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        // Axios GET request to fetch data
        AboutData();
    }, []);
    console.log(data1)

    return (
        <>
            <div className='relative w-full h-40 md:h-96 overflow-hidden'>
                <img src={data.bannerimage} alt="" className='absolute w-full h-full object-cover' />
                <div className='absolute w-full h-full bg-black opacity-70'></div>

                <div className='w-full text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pt-12 md:pt-0'>
                    <h3 className='text-3xl tracking-wider text-white md:text-4xl'>{data.name}</h3>
                    <Breadcrumb className='text-gray-400 flex justify-center'>
                        <BreadcrumbItem>
                            <BreadcrumbLink className=' text-xs  md:text-sm'>{data.caption}</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink className=' text-xs md:text-sm'> {data.name} </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>

            <div className='container py-4 md:py-16'>
                <div className='flex flex-col gap-10 md:flex-row'>
                    <div className='flex md:w-full flex-col bg-gray-100 md:p-6'>
                        <div className='relative w-full h-96 order-2 md:order-1'>
                            <img src={data1 && data1.slider_image} alt="" className='absolute w-full h-full object-cover' />
                        </div>
                        <div className='order-1 md:order-2'>
                            <p className='py-4'>
                                <span className='font-semibold text-xl'>{data1 && data1.title}</span>
                            </p>
                        </div>
                        <div className='order-1 md:order-2'>
                            <p className='py-4'>
                                <span className='font-semibold' dangerouslySetInnerHTML={{ __html: data1 && data1.short_desc }}></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewsDetail