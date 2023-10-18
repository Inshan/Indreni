import React, {useState, useEffect} from 'react'
import axios from 'axios'
import AboutImage from '../../assets/about_Indreni_Image/image4.jpeg'
import projectData from '../../Data/ProjectData'
import { Link } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from '@chakra-ui/react'

const UpcomingProgram = () => {
    // const upcomigProject = projectData.filter((item) => item.projectCategory == 'upcoming program')
     
    const [data, setData] = useState([]);
    const [data1, setData1]=useState([])
    const AboutData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            // Filter the response data by status and page_type
            if (response.data) {
                const DocumentData = response.data.filter(
                    (item) => item.status === "Publish" && item.page_type === "Upcoming Program"
                );
                setData(DocumentData[0]); // Assuming you want to slice the filtered data
            }

            if (response.data) {
                const Document1Data= response.data.filter(
                    (item) => item.status === "Publish" && item.page_type === "Upcoming Program Data"
                );
                setData1(Document1Data); // Assuming you want to slice the filtered data
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
                <img src={data.bannerimage} alt="" className='absolute w-full h-full object-cover' />
                <div className='absolute w-full h-full bg-black opacity-70'></div>
                
                <div className='w-full text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 '>
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

            <div className='container py-4 md:py-16 flex flex-col gap-8'>
                {data1.map((item) => (
                    <Link className='group' to={`/upcomingprogram/${item.id}`}>
                        <div className='w-full flex flex-col md:flex-row items-center bg-gray-200'>
                            <div className='relative w-full h-60 overflow-hidden'>
                                <img src={item.slider_image} alt="" className='absolute w-full h-full object-cover' />
                            </div>
                            <div className='md:w-2/3 md:p-10'>
                                <div className='w-full text-xl ps-4 pt-4 font-semibold flex'>
                                    <p className='border-b border-blue pb-1'>{item.name}</p>
                                </div>
                                <div className='w-full ps-4 py-4 text-sm md:text-base'>
                                    <p dangerouslySetInnerHTML={{ __html: item.short_desc }}></p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default UpcomingProgram