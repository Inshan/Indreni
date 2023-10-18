import React from 'react'
import VisionImage from '../../assets/visionImage.png'
const Vision = () => {
    return (
        <>
            <div className='relative w-full h-[450px]'>
                <img src={VisionImage} alt="" className='absolute w-full h-[450px] object-cover opacity-90' />
                <div className='absolute w-full h-[450px] bg-black opacity-50'></div>
                <div className='container'>
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <div className='flex justify-center'>
                            <h1 className='text-3xl font-semibold border-b border-blue pb-2 text-white'>OUR VISION</h1>
                        </div>
                        <div className='flex py-4'>
                            <div className='px-2 text-center text-white'>
                                <p> Indreni believes that there should be equal rights and access to each natural resource and that the activities of Indreni have given emphasis on land and water rights for the concerned rights holders.  Providing free and compulsory basic education is the responsibility of the state and the state must not refrain from this responsibility. Receiving primary health rights are the fundamental rights of a citizen. Due to this fact, accessible, effective and quality health services should be provided to the citizen by the state. </p>
                            </div>
                        </div>
                        <div className='w-full flex justify-center items-start pt-4'>
                            <button className='bg-blue py-2 px-6 text-white'>Read More</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Vision