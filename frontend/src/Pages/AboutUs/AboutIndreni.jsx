import React, {useEffect, useState} from 'react'
import axios from 'axios'
import AboutImage from '../../assets/about_Indreni_Image/aboutindreniImage.jpeg'
import Image1 from '../../assets/about_Indreni_Image/image1.jpeg'
import SideNotice from './SideNotice'
import Message from '../Home/Message'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from '@chakra-ui/react'

const AboutIndreni = () => {

    const [data, setData] = useState([]);

    const AboutData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            // Filter the response data by status and page_type
            if (response.data) {
                const DocumentData = response.data.filter(
                    (item) => item.status === "Publish" && item.page_type === "AboutIndreni"
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
                <img src={AboutImage} alt="" className='absolute w-full h-full object-cover' />
                <div className='absolute w-full h-full bg-black opacity-70'></div>
                
                <div className='w-full text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pt-12 xl:pt-10'>
                    <h3 className='text-3xl tracking-wider text-white md:text-4xl'>{data.name}</h3>
                    <Breadcrumb className='text-gray-400 flex justify-center'>
                        <BreadcrumbItem>
                            <BreadcrumbLink className=' text-xs  md:text-sm'>{data.caption}</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink className=' text-xs md:text-sm'>{data.title}</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink className=' text-xs md:text-sm'>{data.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>

            <div className='container py-4 xl:py-16'>
                <div className='flex flex-col gap-10 xl:flex-row'>
                    <div className='flex xl:w-2/3 flex-col bg-gray-100 md:p-6'>
                        <div className='relative w-full h-96 order-2 md:order-1'>
                            <img src={Image1} alt="" className='absolute w-full h-full' />
                        </div>
                        <div className='order-1 md:order-2'>
                            <p className='py-4' dangerouslySetInnerHTML={{ __html: data.short_desc }}>
                                {/* <span className='font-semibold'>इन्द्रेणीको परिचय <br /></span>
                                इन्द्रेणी “सामाजिक न्याय स्थापनाका लागि संस्था” (An Institution for Social justice) भन्ने अभियानका साथमा भुमि तथा खाद्य अधिकार (जीविकोपार्जन अधिकार) महिला अधिकार, शिक्षा अधिकार, स्वास्थ्य अधिकार र जल अधिकारका क्षेत्रमा कार्यरत संस्था हो। यसले समुदायका अधिकारवालाहरुको न्याय स्थापनाकालागि सम्बन्धित निकायहरुमा पैरवी गर्ने क्षमता अभिबृद्धि गर्दै सहजिकरणको भूमिका निर्वाह गर्दै आईरहेको छ। समुदाय परिचालन गरी दीगो सामाजिक विकास सम्भव हुन्छ भन्ने मान्यताद्वारा यो संस्थाले सवालगत जनसंगठनहरुसंगको सहकार्यमा आफ्ना कार्यहरुलाई अगाडी सारेको छ। यो संस्था २०४३ साल कार्तिक २२ गते स्थापना भई २०४८ साल जिल्ला प्रशासन कार्यालय नवलापरासीमा इन्द्रेणी युवा क्लबको नामले दर्ता भएको थियो। एउटा गाउँको सानो समुदायमा आधारित क्लबबाट गैर सरकारी सामाजिक विकास संस्थाको रुपमा परिचित एवं स्थापित हुँदै समय सापेक्ष आफू र आफ्ना कामहरुलाई परिमार्जन गर्दै २०५९ सालमा 'इन्द्रेणी सामाजिक विकास मञ्चु' नामाकरण भई समुदायमा विद्यमान गरिबी विरुद्धको लडाईमा पूर्णरुपले समर्पित छ।
                                संस्था स्थापना आफैमा ठुलो कुरा होइन रहेछ, त्यसलाई हुर्काउन, बढाउन र संस्थागत विकास गरी जीवन्तता प्रदान गर्न ज्यादै कठिन एवं चुनौतिपूर्ण कार्य रहेछ भन्ने यस संस्थाको सिकाइ रहेको छ। इन्दे्रणीले २३ वर्षको उमेर विभिन्न आरोह अवरोह पार गर्दै आएको छ जुन कालखण्डहरुलाई चार चरणको रुपमा लिइएको छ। ती हुन् :  पूर्व प्रारम्भिक अवस्था, प्ररम्भिक अवस्था, संस्थागत विकासको अवस्था र व्यवसायिक दक्षतातर्फ उन्मुख अवस्था।
                            </p> */}

                            {/* <p className='pb-4'>
                                <span className='font-semibold'>पूर्व प्रारम्भिक चरण :<br /></span>
                                यस संस्थाको २०३६ देखि २०४३ सम्मको अवस्थालाई पूर्व प्रारम्भिक अवस्था मानिएको छ। २०३६ मा स्थापना भएको गाउँले युवा क्लब र २०३७ मा स्थापना भएको  भानुदय युवा क्लबको एकिकृत अवस्था हो इन्द्रेणी। यस समयमा विभिन्न सामाजिक एवं कल्याणकारी कामहरु जस्तैः– सांस्कृतिक कार्यक्रम, देउसी–भैलो, राहत, उद्धार र फुटवल खेल मुख्य क्रियाकलाप सञ्चालित थिए। स्थानीय यूवा, समाजसेवी, शिक्षक, व्यपारी, राजिनितिक व्यक्तित्वको सामुहिक चिन्तन र सहयोग पश्चात २०३८ सालमा इन्द्रेणी पुस्तकालयको नाममा संस्थाको भवन शिलान्यास गरी फउण्डेशन निर्माण गर्ने कार्य सम्पन्न भएको थियो र सो भवनको सञ्चालन २०४३ सालमा भयो। यसरी २०४३ मा दुवै संस्थाको कार्यगत एकताको आधारमा नै इन्द्रेणी युवा क्लबु को जन्म भएको थियो।
                            </p>

                            <p className='pb-4'>
                                <span className='font-semibold'>प्रारम्भिक चरण :<br /></span>
                                संस्थाको प्रारम्भिक अवस्था भन्नाले २०४३ देखि २०४८ सालसम्मको समयावधिलाई मानिएको छ। यस समयमा विभिन्न सामाजिक एवं कल्याणकारी कार्यक्रमहरु जस्तै बाटो मर्मत, रक्तदान, प्राकृतिक तथा अन्य प्रकोपमा राहत सङ्कलन, साँस्कृतिक कार्यक्रम, देउसी भैलो, वृक्षारोपण, आदि जस्ता कार्यक्रम सञ्चालन भएका थिए जसबाट सीप विकास हुन गई संस्थालाई वाह्य क्षेत्रसँग चिनारी गराउन र आन्तरिक श्रोत वृद्धि गर्न सहयोग मिलेको थियो। कार्यक्रमहरुमा आफ्नो सीपको विकास गरी स्थापित भएको थियो। यस्ता कार्यक्रमहरु नै प्रमुख आम्दानीको स्रोतको रुपमा भए पनि स्थानिय वुद्धिजीवी, शिक्षक, व्यपारी राजनतिककर्मी, समाजसेवी सवैको सहयोग वाट ३ कोठाको जस्ताले छाएको पक्की भवनको निमार्ण कार्य पनि यही अवधिमा सम्पन्न भएको थियो। यस परिवेशमा संस्थाले साँस्कृतिक कार्यक्रम र खेलकुदलाई विशेष चासोको क्षेत्रका रुपमा लिई रुपन्देही, पाल्पा र कपिल्वस्तुमा समेत आफ्ना कार्यक्रमहरु सञ्चालन गरी कर्यक्रमको व्यापकता र आर्थिक स्रोत जुटाउन क्रियाशील रहेको थियो।
                                सस्थागत विकासको चरण : –
                                २०४९ देखि २०५८ साल सम्मको समयलाई संस्थागत विकासको अवस्थाको रुपमा मान्न सकिन्छ। यस अवस्थामा संस्थाले मानवीय स्रोत, संस्थाको भौतिक पूर्वधारको विकास एवं कार्यक्रमा विषयगत सीपहरु हासिल गरेको छ। यस अवधिमा अनौपचारिक शिक्षा, बचत समूह गठन तथा प्रवर्धन, बाल समूह गठन तथा प्रवर्धन गरी संस्थागत विकास तर्फ उन्मुख गराउने खालका ससाना परियोजनाहरु सम्पन्न भएको थियो। यस अवधिमा संस्था सहकारी संस्था प्रवर्धनको क्षेत्रमा  अगाडि बढेको पाइन्छ र यस समयमा संस्थाले संस्थागत विकासको पक्षमा परिकल्पना ध्येय तय गरेको छ। */}

                            </p>
                        </div>
                    </div>
                    <div className='xl:w-1/3 flex flex-col gap-4 md:gap-10'>
                        <Message />
                        <SideNotice />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutIndreni