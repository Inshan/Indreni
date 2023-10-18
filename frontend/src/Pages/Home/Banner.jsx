import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import BannerImage from '../../assets/banner1.jpg'
// import BannerImage2 from '../../assets/project1.jpeg'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "none" }}
            onClick={onClick}
        />
    );
}
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "none" }}
            onClick={onClick}
        />
    );
}

const Banner = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        speed: 3000,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    // infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                }
            }
        ],
    };

    const [data, setData] = useState([]);

    const AboutData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            // Filter the response data by status and page_type
            if (response.data) {
                const DocumentData = response.data.filter(
                    (item) => item.status === "Publish" && item.page_type === "Banner"
                );
                setData(DocumentData); // Assuming you want to slice the filtered data
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
            <div className='relative'>

                <Slider {...settings}>
                    {data.map((item, z) => (

                        <div key={z} className='relative w-full h-[680px] md:h-[738px] overflow-hidden'>
                            <div className='absolute w-full h-[680px] md:h-[738px] bg-black opacity-40 z-10'></div>
                            <img src={item.slider_image} alt="" className='absolute w-full h-full object-cover' />
                            {/* <div className='absolute bottom-20 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20'>
                            <p className='text-white text-xl'>"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel dignissimos reprehenderit architecto, mollitia odio eius quas fugiat asperiores modi quaerat voluptate iusto totam."</p>
                        </div> */}

                        </div>

                        // <div className='relative w-full h-[680px] md:h-[738px] overflow-hidden'>
                        //     <div className='absolute w-full h-[680px] md:h-[738px] bg-black opacity-40 z-10'></div>
                        //     <img src={BannerImage2} alt="" className='absolute w-full h-full object-cover' />
                        //     {/* <div className='absolute bottom-20 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20'>
                        //         <p className='text-white text-xl'>"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel dignissimos reprehenderit architecto, mollitia odio eius quas fugiat asperiores mm."</p>
                        //     </div> */}
                        // </div>
                    ))}
                </Slider>
            </div>
        </>
    )
}

export default Banner