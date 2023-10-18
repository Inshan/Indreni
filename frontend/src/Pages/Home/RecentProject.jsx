import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import projectData from '../../Data/ProjectData'

const RecentProject = (props) => {

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
                    (item) => item.status === "Publish" && item.page_type === "Recent Project"
                );
                setData(DocumentData); // Assuming you want to slice the filtered data
            }
            if (response.data) {
                const DocumentData = response.data.filter(
                    (item) => item.status === "Publish" && item.page_type === "Running Program Data"
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

    // let myProject = projectData.filter((a) => a.projectCategory == props.sectionHeading)
    return (
        <>
            <div className='bg-lightblue py-4 xl:py-16'>
                <div className='container'>
                    <div className='flex justify-start items-center'>
                        <h1 className='text-2xl font-semibold border-b border-blue md:pb-2 text-black uppercase md:text-3xl'>{props.sectionHeading}</h1>
                    </div>

                    <div className='flex flex-col gap-4 md:gap-10 py-2  md:py-10 xl:flex-row'>
                        {data1.map((item) => (
                            <Link className='group' to={`/runningprogram/${item.id}`}>
                                <div className='w-full bg-gray-200'>
                                    <div className='relative w-full h-60 overflow-hidden'>
                                        <img src={item.slider_image} alt="" className='absolute w-full h-full object-cover transition duration-300 group-hover:scale-110' />
                                    </div>
                                    <div className='w-full text-xl ps-4 pt-4 font-semibold border-b'>
                                        <p>{item.name}</p>
                                    </div>
                                    <div className='w-full ps-4 pb-4 text-sm md:text-base'>
                                        <p dangerouslySetInnerHTML={{ __html: item.short_desc }}></p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className='w-full flex justify-center items-start pt-4'>
                        <Link to='/runningprogram' className='bg-blue py-2 px-6 text-white transition duration-300 hover:bg-secondaryblue hover:text-blue'>Load More</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecentProject