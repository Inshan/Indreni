import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import AboutImage from '../../assets/about_Indreni_Image/image4.jpeg'
// import Image2 from '../../assets/about_Indreni_Image/image2.jpeg'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink
} from '@chakra-ui/react'

const Contact = () => {

    const [data, setData] = useState([]);
    const [contact, setContact] = useState([])
    const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
    const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false); // State for displaying the error message

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        message: "",

    });

    // const [successMessage, setSuccessMessage] = useState("");

    const showSuccessMessage = () => {
        setIsSuccessMessageVisible(true);
        // Set a timeout to hide the success message after 5 seconds (adjust as needed)
        setTimeout(() => {
            setIsSuccessMessageVisible(false);
        }, 5000);
    };

    const showErrorMessage = () => {
        setIsErrorMessageVisible(true);
        // Set a timeout to hide the error message after 5 seconds (adjust as needed)
        setTimeout(() => {
            setIsErrorMessageVisible(false);
        }, 5000);
    };

    const AboutData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );


            // Filter the response data by status and page_type
            if (response.data) {
                const DocumentData = response.data.filter(
                    (item) => item.status === "Publish" && item.page_type === "Contact"
                );
                setData(DocumentData[0]); // Assuming you want to slice the filtered data
            }

            const response1 = await axios.get('http://127.0.0.1:8000/api/globals/');
            // Handle the response data here
            response1.data && setContact(response1.data[0]);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.name && formData.email && formData.number && formData.message) {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/contacts/",
                    formData
                );

                if (response.status === 201) {
                    // Show a success message to the user
                    showSuccessMessage(); // Call the function to show the success message
                    // Optionally, reset the form fields
                    setFormData({
                        name: "",
                        email: "",
                        number: "",
                        message: "",
                    });
                } else {
                    console.error("Form submission failed with status:", response.status);
                    // Display a user-friendly error message here if needed
                }
            } catch (error) {
                console.error("Error submitting form:", error);

                if (error.response && error.response.status === 400) {

                    console.log("Validation errors:", error.response.data);

                }
                else {
                }
            }
        }
        else {
            showErrorMessage();
        }
    }

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


            <div className='container py-4 md:py-16'>
                <div className='flex gap-10 drop-shadow-xl'>
                    <div className='flex w-full flex-col bg-gray-100 md:p-6'>
                        <div className='relative w-full h-96'>
                            <img src={data.slider_image} alt="" className='absolute w-full h-full object-cover' />
                        </div>

                        <div>
                            <div className='w-full py-16'>
                                <div className='container'>
                                    <div className='w-full flex justify-between flex-col gap-10 xl:flex-row md:flex-row'>
                                        <div className='flex flex-row items-center gap-4 xl:flex-col md:flex-col xl:w-1/3'>
                                            <div className='w-10 h-10 flex justify-center items-center rounded-full xl:w-16 xl:h-16 bg-red'>
                                                <div className='w-12 h-12 rounded-full md:bg-white flex justify-center items-center'>
                                                    <i className="fa-solid fa-phone text-2xl text-blue"></i>
                                                </div>
                                            </div>
                                            <p className='text-gray-900 text-lg'>+{contact.Sitecontactdetail}</p>
                                        </div>
                                        <div className='flex flex-row items-center gap-4 xl:flex-col md:flex-col xl:w-1/3'>
                                            <div className='w-10 h-10 flex justify-center items-center rounded-full xl:w-16 xl:h-16 bg-red'>
                                                <div className='w-12 h-12 rounded-full md:bg-white flex justify-center items-center'>
                                                    <i className="fa-solid fa-envelope text-2xl text-blue"></i>
                                                </div>
                                            </div>
                                            <p className='text-gray-900 text-lg'>{contact.Siteaddress1}</p>
                                        </div>
                                        <div className='flex flex-row items-center gap-4 xl:flex-col md:flex-col xl:w-1/3'>
                                            <div className='w-10 h-10 flex justify-center items-center rounded-full xl:w-16 xl:h-16 bg-red'>
                                                <div className='w-12 h-12 rounded-full md:bg-white flex justify-center items-center'>
                                                    <i className="fa-solid fa-location-dot text-2xl text-blue"></i>
                                                </div>
                                            </div>
                                            <p className='w-60 text-gray-900 text-lg xl:w-full'>{contact.Siteaddress}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full pb-16 md:pb-16 xl:pt-16'>
                            <div className='w-full flex justify-center text-4xl font-semibold pb-4 text-blue'>
                                <h3>{data.title}</h3>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className='container flex justify-center drop-shadow-lg'>
                                    <div className='w-full md:w-3/5 flex flex-col gap-2 md:gap-8'>
                                        <div>
                                            <label><b>Name</b></label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Your Name"
                                                className='w-full p-4 border'
                                                value={formData.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label><b>Email</b></label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Your Email"
                                                className='w-full p-4 border'
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label><b>Number</b></label>
                                            <input
                                                type="text"
                                                name="number"
                                                placeholder="Your Number"
                                                className='w-full p-4 border'
                                                value={formData.number}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label><b>Message</b></label>
                                            <textarea
                                                type="text"
                                                name="message"
                                                rows="5"
                                                placeholder="Your Message"
                                                className='w-full p-4 border'
                                                value={formData.message}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='pt-4 text-center'>
                                            <button className='bg-blue text-white px-4 py-2 tracking-wide font-semibold transition duration-300'>SEND NOW</button>
                                        </div>
                                    </div>
                                </div>
                                {/* Display the error message */}
                                {isErrorMessageVisible && (
                                    <div className="text-red mt-4 text-center">
                                        All fields must be filled.
                                    </div>
                                )}

                                {/* Display the success message */}
                                {isSuccessMessageVisible && (
                                    <div className="text-green-600 mt-4 text-center">
                                        Submitted successfully! {/* Display your success message here */}
                                    </div>
                                )}
                            </form>
                        </div>
                        <div>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14148.803528381271!2d83.73804108715821!3d27.55627540000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399425007e6b641f%3A0xec393cd39c4f09f1!2sIndreni%20social%20development%20forum!5e0!3m2!1sen!2snp!4v1696173765063!5m2!1sen!2snp" className='w-full h-96' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact