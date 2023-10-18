import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import AboutImage from '../../assets/about_Indreni_Image/image4.jpeg'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from '@chakra-ui/react'

const Faq = () => {
    const [data, setData] = useState([]);
    const AboutData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            // Filter the response data by status and page_type
            if (response.data) {
                const DocumentData = response.data.filter(
                    (item) => item.status === "Publish" && item.page_type === "Job Vacancy"
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
                            <BreadcrumbLink className=' text-xs md:text-sm'> {data.title} </BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink className=' text-xs md:text-sm'> {data.name} </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>

            <div className='container py-16'>

            </div>
        </>
    )
}

export default Faq