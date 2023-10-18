import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import AboutImage from '../../assets/about_Indreni_Image/image4.jpeg'
// import {
//     FormControl,
//     FormLabel,
//     FormErrorMessage,
//     FormHelperText,
// } from '@chakra-ui/react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from '@chakra-ui/react'

const Faq = () => {

    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        gender: "",
        dateofbirth: "",
        mobileno: "",
        education: "",
        prof: "",
        courselevel: "",
        nationality: "",
    });

    const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
    const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false); // State for displaying the error message


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
                    (item) => item.status === "Publish" && item.page_type === "Membership"
                );
                setData(DocumentData[0]); // Assuming you want to slice the filtered data
            }
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
        // Check if any required field is empty
        if (
            formData.name === "" ||
            formData.address === "" ||
            formData.gender === "" ||
            formData.dateofbirth === "" ||
            formData.mobileno === "" ||
            formData.email === "" ||
            formData.education === "" ||
            formData.profession === "" ||
            formData.courselevel === "" ||
            formData.nationality === ""
        ) {
            // Fields are missing, display an error message
            showErrorMessage();
            return; // Do not proceed with form submission
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/courses/",
                formData
            );

            if (response.status === 201) {
                // Show a success message to the user
                showSuccessMessage(); // Call the function to show the success message

                // Optionally, reset the form fields
                setFormData({
                    name: "",
                    address: "",
                    gender: "",
                    dateofbirth: "",
                    mobileno: "",
                    email: "",
                    education: "",
                    prof: "",
                    courselevel: "",
                    nationality: ""
                });
            } else {
                console.error("Form submission failed with status:", response.status);
                // Display a user-friendly error message here if needed
            }
        } catch (error) {
            console.error("Error submitting form:", error);

            if (error.response && error.response.status === 400) {
                // Handle validation errors from the server
                // You can access the error response data for more details
                console.log("Validation errors:", error.response.data);
                // Display validation error messages to the user
                // For example, you can set error messages in the state to display to the user
            } else {
                // Handle other types of errors (network, server issues, etc.)
                // You can display a generic error message to the user
                // or log the error for debugging
            }
        }
    };


    useEffect(() => {
        // Axios GET request to fetch data
        AboutData();
    }, []);

    return (
        <>
            <div className='relative w-full h-40 xl:h-96 md:h-60 overflow-hidden'>
                <img src={data.slider_image} alt="" className='absolute w-full h-full object-cover' />
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
            <div className='container py-4 md:py-16'>
                <div className='flex gap-10'>
                    <div className='flex w-full flex-col bg-gray-100 md:p-10'>
                        <form className='flex flex-col w-full bg-white p-8 drop-shadow-xl border' onSubmit={handleSubmit}>
                            <div className=' flex flex-col gap-4 md:gap-20 md:flex-row'>
                                <div className='md:w-1/2'>
                                    <label><b>Name</b></label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Full Name"
                                        className="h-10 border w-full rounded-md"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className='md:w-1/2'>
                                    <label><b>Address</b></label>
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Your Address"
                                        className="h-10 border w-full rounded-md"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />

                                </div>
                            </div>

                            <div className=' flex flex-col gap-4 md:gap-20 pt-4 md:flex-row'>
                                <div className='md:w-1/2'>
                                    <label><b>Gender</b></label>
                                    <select
                                        name="gender"
                                        className="h-10 border w-full rounded-md"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className='md:w-1/2'>
                                    <label><b>Date of Birth</b></label>
                                    <input
                                        type="date"
                                        name="dateofbirth"
                                        placeholder="Your Date of Birth"
                                        className="h-10 border w-full rounded-md"
                                        value={formData.dateofbirth}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className=' flex flex-col gap-4 md:gap-20 pt-4 md:flex-row'>
                                <div className='md:w-1/2'>
                                    <label><b>Mobile No</b></label>
                                    <input
                                        type="text"
                                        name="mobileno"
                                        placeholder="Your Mobile Number"
                                        className='h-10 border w-full rounded-md'
                                        value={formData.mobileno}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className='md:w-1/2'>
                                    <label><b>Email</b></label>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Your Email"
                                        className='h-10 border w-full rounded-md'
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className=' flex flex-col gap-4 md:gap-20 pt-4 md:flex-row'>
                                <div className='md:w-1/2'>
                                    <label><b>Education</b></label>
                                    <input
                                        type="text"
                                        name="education"
                                        placeholder="Your Education"
                                        className='h-10 border w-full rounded-md'
                                        value={formData.education}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className='md:w-1/2'>
                                    <label><b>Profession</b></label>
                                    <input
                                        type="text"
                                        name="prof"
                                        placeholder="Your Profession"
                                        className='h-10 border w-full rounded-md'
                                        value={formData.prof}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className=' flex flex-col gap-4 md:gap-20 pt-4 md:flex-row'>
                                <div className='md:w-1/2'>
                                    <label><b>Course Level</b></label>
                                    <select
                                        name="courselevel"
                                        className="h-10 border w-full rounded-md"
                                        value={formData.courselevel}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Course-Level</option>
                                        <option value="Basics">Basics</option>
                                        <option value="Advance">Advance</option>
                                        <option value="Karmakanda">Karmakanda</option>
                                        <option value="Vastu">Vastu</option>
                                        <option value="Hastarekha">Hastarekha</option>
                                    </select>
                                </div>
                                <div className='md:w-1/2'>
                                    <label><b>Nationality</b></label>
                                    <input
                                        type="text"
                                        name="nationality"
                                        placeholder="Your Nationality"
                                        className='h-10 border w-full rounded-md'
                                        value={formData.nationality}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='mt-10'>
                                <button className='bg-blue px-6 py-2  text-white text-xl'>Submit</button>
                            </div>

                            {/* Display the error message if isErrorMessageVisible is true */}
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

                </div>
            </div>
        </>
    )
}

export default Faq