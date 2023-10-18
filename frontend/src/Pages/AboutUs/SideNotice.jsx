import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SideNotice = () => {

    const [data, setData] = useState([]);

    const AboutData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            // Filter the response data by status and page_type
            if (response.data) {
                const DocumentData = response.data.filter(
                    (item) => item.status === "Publish" && item.page_type === "Side Notice"
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
            <div className='w-full flex flex-col gap-10'>
                <div className='w-full bg-gray-100 p-6' dangerouslySetInnerHTML={{ __html: data.short_desc }}>
                    {/* <div className='flex'>
                        <h1 className='text-2xl uppercase border-b border-blue'>Notice & Announcements</h1>
                    </div>
                    <div className='pt-4 flex flex-col gap-4'>
                        <div className='flex gap-4'>
                            <div>
                                <i className="fa-solid fa-circle text-blue text-sm"></i>
                            </div>
                            <div>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti labore.</p>
                            </div>
                        </div>

                        <div className='flex gap-4'>
                            <div>
                                <i className="fa-solid fa-circle text-blue text-sm"></i>
                            </div>
                            <div>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti labore, delectus libero odio qui.</p>
                            </div>
                        </div>
                    </div> */}
                </div>

                <div className='w-full bg-gray-100 p-6' dangerouslySetInnerHTML={{ __html: data.desc }}>
                    {/* <div className='flex'>
                        <h1 className='text-2xl uppercase border-b border-blue'> Recent News & Events</h1>
                    </div>
                    <div className='pt-4 flex flex-col gap-4'>
                        <div className='flex gap-4'>
                            <div>
                                <i className="fa-solid fa-circle text-blue text-sm"></i>
                            </div>
                            <div>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti labore.</p>
                            </div>
                        </div>

                        <div className='flex gap-4'>
                            <div>
                                <i className="fa-solid fa-circle text-blue text-sm"></i>
                            </div>
                            <div>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti labore, delectus libero odio qui.</p>
                            </div>
                        </div>

                        <div className='flex gap-4'>
                            <div>
                                <i className="fa-solid fa-circle text-blue text-sm"></i>
                            </div>
                            <div>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti labore, delectus libero odio qui.</p>
                            </div>
                        </div>

                        <div className='flex gap-4'>
                            <div>
                                <i className="fa-solid fa-circle text-blue text-sm"></i>
                            </div>
                            <div>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti labore, delectus libero odio qui.</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default SideNotice