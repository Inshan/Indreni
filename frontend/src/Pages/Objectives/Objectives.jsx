import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AboutImage from '../../assets/about_Indreni_Image/aboutindreniImage.jpeg'
import Image1 from '../../assets/about_Indreni_Image/image1.jpeg'
import SideNotice from '../AboutUs/SideNotice'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from '@chakra-ui/react'

const Objectives = () => {

    const [data, setData] = useState([]);

    const AboutData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            // Filter the response data by status and page_type
            if (response.data) {
                const DocumentData = response.data.filter(
                    (item) => item.status === "Publish" && item.page_type === "Objectives"
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
            <div className='relative w-full h-40 xl:h-96 md:h-60 overflow-hidden'>
                <img src={data.bannerimage} alt="" className='absolute w-full h-full object-cover' />
                <div className='absolute w-full h-full bg-black opacity-70'></div>

                <div className='w-full text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 md:pt-12 xl:pt-0'>
                    <h3 className='text-3xl tracking-wider text-white md:text-4xl'> {data.name}</h3>
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

            <div className='container py-4 xl:py-16'>
                <div className='flex flex-col gap-10 xl:flex-row'>
                    <div className='flex xl:w-2/3 flex-col bg-gray-100 md:p-6'>
                        <div className='relative w-full h-96 order-2 md:order-1'>
                            <img src={data.slider_image} alt="" className='absolute w-full h-full' />
                        </div>
                        <div className='order-1 md:order-2'>
                            <p className='py-4' dangerouslySetInnerHTML={{ __html: data.short_desc }}>
                            </p>
                        </div>
                    </div>
                    <div className='xl:w-1/3  flex-col gap-4 md:gap-10 md:flex hidden'>
                        <SideNotice />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Objectives