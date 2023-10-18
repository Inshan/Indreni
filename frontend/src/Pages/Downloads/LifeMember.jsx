import React, {useState, useEffect} from 'react'
import axios from 'axios'
import AboutImage from '../../assets/about_Indreni_Image/image4.jpeg'
// import LifeMemberData from '../../Data/LifeMemberData'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from '@chakra-ui/react'

const LifeMember = () => {

    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);

    const AboutData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            // Filter the response data by status and page_type
            if (response.data) {
                const DocumentData = response.data.filter(
                    (item) => item.status === "Publish" && item.page_type === "Life Member"
                );
                setData(DocumentData[0]); // Assuming you want to slice the filtered data
            }
            if (response.data) {
                const DocumentData = response.data.filter(
                    (item) => item.status === "Publish" && item.page_type === "Life Member Data"
                );
                setData1(DocumentData); // Assuming you want to slice the filtered data
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
            <div className='relative w-full h-40 md:h-96 overflow-hidden'>
                <img src={data.slider_image} alt="" className='absolute w-full h-full object-cover' />
                <div className='absolute w-full h-full bg-black opacity-70'></div>
                
                <div className='w-full text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 '>
                    <h3 className='text-3xl tracking-wider text-white md:text-4xl'> {data.name} </h3>
                    <Breadcrumb className='text-gray-400 flex justify-center'>
                        <BreadcrumbItem>
                            <BreadcrumbLink className=' text-xs  md:text-sm'>{data.caption}</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink className=' text-xs  md:text-sm'>{data.title}</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink className=' text-xs md:text-sm'> {data.name} </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>

            <div className='container py-4 md:py-16'>
                <div className='w-full flex gap-10 flex-wrap'>
                    {data1.map((item) => (
                        <div className='border  w-full md:w-[282px] flex flex-col gap-2 items-center p-4 rounded-sm'>
                            <div className='w-32 h-32 rounded-full overflow-hidden border relative'>
                                <img src={item.slider_image} alt="" className='absolute w-full h-full' />
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <h1 className='text-xl font-medium'>{item.name}</h1>
                                <h1 className='text-xl font-normal'>{item.caption}</h1>
                                <h1 className='text-base font-normal'>{item.meta_keyword}</h1>
                            </div>
                            <div className='w-full h-10 bg-gray-200'>

                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default LifeMember