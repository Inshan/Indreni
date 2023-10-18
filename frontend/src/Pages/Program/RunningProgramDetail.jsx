import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
// import AboutImage from '../../assets/about_Indreni_Image/image4.jpeg'
// import projectData from '../../Data/ProjectData'
import SideNotice from '../AboutUs/SideNotice'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from '@chakra-ui/react'

const RunningProgramDetail = () => {
    const {id} = useParams()
    // const filteredRunningProgram = projectData.find((item) => item.title == id)

    const Id = parseInt(id);
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
                    (item) => item.status === "Publish" && item.page_type === "Running Program"
                );
                setData(DocumentData[0]); // Assuming you want to slice the filtered data
            }
                const Document1Data = response.data.filter(
                    (item) => item.status === "Publish" && item.page_type === "Running Program Data"
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

 
    return (
        <>
            <div className='relative w-full h-40 md:h-96 overflow-hidden'>
                <img src={data.bannerimage} alt="" className='absolute w-full h-full object-cover' />
                <div className='absolute w-full h-full bg-black opacity-70'></div>
                
                <div className='w-full text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 '>
                    <h3 className='text-3xl tracking-wider text-white md:text-4xl'> {data1.name}</h3>
                    <Breadcrumb className='text-gray-400 flex justify-center'>
                        <BreadcrumbItem>
                            <BreadcrumbLink className=' text-xs  md:text-sm'>{data1.caption}</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink className=' text-xs  md:text-sm'>{data1.title}</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink className=' text-xs md:text-sm'> {data1.name} </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>


            <div className='container py-4 md:py-16'>
                <div className='flex gap-10'>
                    <div className='flex md:w-2/3 flex-col bg-gray-100 md:p-6'>
                        <div className='relative w-full h-96'>
                            <img src={data1.slider_image} alt="" className='absolute w-full h-full object-cover' />
                        </div>
                        <div>
                            <p dangerouslySetInnerHTML={{ __html: data1.short_desc }}></p>
                        </div>
                    </div>
                    <div className='w-1/3  flex-col gap-10 md:flex hidden'>
                        <SideNotice />
                    </div>
                </div>
            </div>
        </>
    )
}

export default RunningProgramDetail