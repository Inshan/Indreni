import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import AboutIndreni from '../Pages/AboutUs/AboutIndreni'
import OurHistory from '../Pages/AboutUs/OurHistory'
import OurMission from '../Pages/AboutUs/OurMission'
import UniquenessIndreni from '../Pages/AboutUs/UniquenessIndreni'
import OrganizationalProcess from '../Pages/AboutUs/OrganizationalProcess'
import GuidelinePrinciple from '../Pages/AboutUs/GuidelinePrinciple'
import Services from '../Pages/AboutUs/Services'
import Objectives from '../Pages/Objectives/Objectives'
import Vision from '../Pages/Vision/Vision'
import Achievements from '../Pages/Achievements/Achievements'
import Feedback from '../Pages/Feedback/Feedback'
import Faq from '../Pages/FAQ/Faq'
import Contact from '../Pages/Contact/Contact'
import Membership from '../Pages/Downloads/Membership'
import JobVacancy from '../Pages/Downloads/JobVacancy'
import LifeMember from '../Pages/Downloads/LifeMember'
import RunningProgram from '../Pages/Program/RunningProgram'
import UpcomingProgram from '../Pages/Program/UpcomingProgram'
import PastProgram from '../Pages/Program/PastProgram'
import RunningProgramDetail from '../Pages/Program/RunningProgramDetail'
import UpcomingProgramDetail from '../Pages/Program/UpcomingProgramDetail'
import PastProgramDetail from '../Pages/Program/PastProgramDetail'
import MessageFromPresident from '../Pages/Messages/MessageFromPresident'
import BoardGovernance from '../Pages/Messages/BoardGovernance'
import NewsDetail from '../Pages/NewsDetail/NewsDetail'

const Header = () => {
    const [activeLink, setActiveLink] = useState(0)
    const [aboutUs, setAboutUs] = useState(false)
    const [download, setDownload] = useState(false)
    const [program, setProgram] = useState(false)
    const location = useLocation();
    const [parentId, setParentId] = useState(null);
    const [data, setData] = useState([])
    const [navigation, setNavigation] = useState([]);

    useEffect(() => {
        const determineActiveLink = () => {
            const path = location.pathname;
            if (path === "/" || path.startsWith("/newsDetail/:id")) {
                return 0;
            }
            else if (path.startsWith("/aboutindreni") || path.startsWith("/ourhistory") || path.startsWith("/ourmission") || path.startsWith("/uniquenessIndreni") || path.startsWith("/organizationalprocess") || path.startsWith("/guidelinePrinciple") || path.startsWith("/services") || path.startsWith("/messagefrompresident") || path.startsWith("/boardgovernance")) {
                return 1;
            }
            else if (path === "/objectives") {
                return 2;
            }
            else if (path === "/vision") {
                return 3;
            }
            else if (path.startsWith("/runningprogram") || path.startsWith("/upcomingprogram") || path.startsWith("/pastprogram")) {
                return 4;
            }
            else if (path === "/achievements") {
                return 5;
            }
            else if (path.startsWith("/membership") || path.startsWith("/jobvacancy") || path.startsWith("/lifemember")) {
                return 6;
            }
            else if (path === "/feedback") {
                return 7;
            }
            else if (path === "/contact") {
                return 8;
            }

        };
        setActiveLink(determineActiveLink());
    }, [location.pathname]);

    const handleActiveLink = (index) => {
        setActiveLink(index)
    }

    const [nav, setNav] = useState(false)
    const handleNav = () => {
        setNav(!nav)
    }
    const toggleAboutUs = () => {
        if (aboutUs == true) {
            setAboutUs(false)
        } else {
            setAboutUs(true)
            setDownload(false)
            setProgram(false)
        }
    }
    const toggleDownload = () => {
        if (download == true) {
            setDownload(false)
        } else {
            setDownload(true)
            setAboutUs(false)
            setProgram(false)
        }
    }

    const toggleProgram = () => {
        if (program == true) {
            setProgram(false)
        } else {
            setProgram(true)
            setAboutUs(false)
            setDownload(false)
        }
    }

    const headerData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/globals/');
            // Handle the response data here
            response.data && setData(response.data[0]);

            // Fetch navigation data based on parentId and page_type
            const navigationResponse = await axios.get(
                "http://127.0.0.1:8000/api/navigations/",
                {
                    params: {
                        parent_id: parentId,      // Set the parentId as a parameter
                        page_type: "Group",       // Filter by page_type        
                    }
                }
            );

            if (navigationResponse.data) {
                const navigationData = navigationResponse.data.filter(
                    (item) => item.status === "Publish"
                );
                setNavigation(navigationData);
            }
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        // Axios GET request to fetch data
        headerData();
    }, [parentId]);

    return (
        <>
            <div className='w-full absolute md:top-8 left-0 md:bg-transparent z-20'>
                <nav className='header_nav  xl:block'>
                    <div className='bg-blue h-12 flex justify-center items-center xl:hidden md:block md:h-14 w-full' onClick={handleNav}>
                        <div className="container flex items-center justify-between md:h-14">
                            <h1 className='text-white'>{data.name}</h1>
                            {nav ? <i className="fa-solid fa-xmark text-red text-3xl text-white"></i> : <i className="fa-solid fa-bars text-red text-2xl text-white"></i>}
                        </div>
                    </div>

                    <ul className={`xl:container justify-between text-white relative xl:bg-transparent xl:flex ${nav ? ` px-4  w-full bg-blue flex flex-col gap-4 md:bg-blue md:gap-0 xl:flex-row` : `hidden`}`}>

                        <Link className='group md:py-4 ' onClick={handleNav}>
                            <Link to='/' onClick={() => handleActiveLink(0)}><li className='tracking-wider text-base uppercase' >Home</li></Link>
                            <div className={`${activeLink === 0 ? 'opacity-100' : 'opacity-0'} pt-1 xl:border-b-2 border-yellow transition duration-300 group-hover:opacity-90`}></div>
                        </Link>
                        {navigation.map((nav) => (
                            <React.Fragment key={nav.id} >
                                {nav.id !== 1 && (
                                    <React.Fragment>
                                        {nav.id === 23 && (
                                            <Link
                                                className='group md:py-4'
                                                onMouseEnter={() => setAboutUs(true)}
                                                onMouseLeave={() => setAboutUs(false)}

                                            >
                                                <li className='tracking-wider text-base uppercase aboutUsHover' onClick={toggleAboutUs}>
                                                    {nav.name}
                                                    <i class="fa-solid fa-angle-down"></i></li>
                                                <div className={`${activeLink === 1 ? 'opacity-100' : 'opacity-0'} pt-1 xl:border-b-2 border-yellow transition duration-300 opacity-0 group-hover:opacity-90`}></div>
                                                {aboutUs && (
                                                    <div className='xl:absolute xl:top-[60px] xl:left-[112px] bg-white md:w-60 overflow-hidden p-2  ' onClick={() => handleActiveLink(1)}>
                                                        <ul>
                                                            {navigation[navigation?.findIndex(item => item?.id === 24)] && (
                                                                <Link to='/aboutindreni' onClick={handleNav}><li className='text-black ps-2 py-2 border-b hover:bg-gray-100'>
                                                                    {navigation[navigation?.findIndex(item => item?.id === 24)].name}
                                                                </li>
                                                                </Link>
                                                            )}
                                                            {navigation[navigation?.findIndex(item => item?.id === 25)] && (
                                                                <Link to='/ourhistory' onClick={handleNav}><li className='text-black ps-2 py-2 border-b hover:bg-gray-100'>
                                                                    {navigation[navigation?.findIndex(item => item?.id === 25)].name}
                                                                </li>
                                                                </Link>
                                                            )}
                                                            {navigation[navigation?.findIndex(item => item?.id === 26)] && (
                                                                <Link to='/ourmission' onClick={handleNav}><li className='text-black ps-2 py-2 border-b hover:bg-gray-100'>
                                                                    {navigation[navigation?.findIndex(item => item?.id === 26)].name}
                                                                </li>
                                                                </Link>
                                                            )}
                                                            {navigation[navigation?.findIndex(item => item?.id === 27)] && (
                                                                <Link to='/uniquenessIndreni' onClick={handleNav}><li className='text-black ps-2 py-2 border-b hover:bg-gray-100'>
                                                                    {navigation[navigation?.findIndex(item => item?.id === 27)].name}
                                                                </li>
                                                                </Link>
                                                            )}
                                                            {navigation[navigation?.findIndex(item => item?.id === 28)] && (
                                                                <Link to='/guidelineprinciple' onClick={handleNav}><li className='text-black ps-2 py-2 border-b hover:bg-gray-100'>
                                                                    {navigation[navigation?.findIndex(item => item?.id === 28)].name}
                                                                </li>
                                                                </Link>
                                                            )}
                                                            {navigation[navigation?.findIndex(item => item?.id === 29)] && (
                                                                <Link to='/organizationalprocess' onClick={handleNav}><li className='text-black ps-2 py-2 border-b hover:bg-gray-100'>
                                                                    {navigation[navigation?.findIndex(item => item?.id === 29)].name}
                                                                </li>
                                                                </Link>
                                                            )}
                                                            {navigation[navigation?.findIndex(item => item?.id === 30)] && (
                                                                <Link to='/services' onClick={handleNav}><li className='text-black ps-2 py-2 hover:bg-gray-100'>
                                                                    {navigation[navigation?.findIndex(item => item?.id === 30)].name}
                                                                </li>
                                                                </Link>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </Link>
                                        )}

                                        {nav.id === 32 && (
                                            <Link className='group md:py-4' onClick={() => handleActiveLink(2)}>
                                                <Link to='/objectives' onClick={handleNav}><li className='tracking-wider text-base uppercase'>
                                                    {nav.name}
                                                </li>
                                                </Link>
                                                <div className={`${activeLink === 2 ? 'opacity-100' : 'opacity-0'} pt-1 xl:border-b-2 border-yellow transition duration-300  group-hover:opacity-90`}></div>
                                            </Link>
                                        )}

                                        {nav.id === 33 && (
                                            <Link className='group md:py-4' onClick={() => handleActiveLink(3)}>
                                                <Link to='/vision'><li className='tracking-wider text-base uppercase' onClick={handleNav}>
                                                    {nav.name}
                                                </li>
                                                </Link>
                                                <div className={`${activeLink === 3 ? 'opacity-100' : 'opacity-0'} pt-1 xl:border-b-2 border-yellow transition duration-300  group-hover:opacity-90`}></div>
                                            </Link>
                                        )}

                                        {nav.id === 34 && (
                                            <Link
                                                className='group md:py-4'
                                                onMouseEnter={() => setProgram(true)}
                                                onMouseLeave={() => setProgram(false)}

                                            >
                                                <li className='tracking-wider text-base uppercase' onClick={toggleProgram}>
                                                    {nav.name}
                                                    <i class="fa-solid fa-angle-down"></i></li>
                                                <div className={`${activeLink === 4 ? 'opacity-100' : 'opacity-0'} pt-1 xl:border-b-2 border-yellow transition duration-300  group-hover:opacity-90`}></div>
                                                {program && (
                                                    <div className='xl:absolute xl:top-14 xl:left-[508px] bg-white w-60 p-2 overflow-hidden' onClick={() => handleActiveLink(4)}>
                                                        <ul>
                                                            {navigation[navigation?.findIndex(item => item?.id === 35)] && (
                                                                <Link to='/runningprogram' onClick={handleNav}><li className='text-black ps-2 py-2 border-b hover:bg-gray-100'>
                                                                    {navigation[navigation?.findIndex(item => item?.id === 35)].name}
                                                                </li>
                                                                </Link>
                                                            )}
                                                            {navigation[navigation?.findIndex(item => item?.id === 40)] && (
                                                                <Link to='/upcomingprogram' onClick={handleNav}><li className='text-black ps-2 py-2 border-b hover:bg-gray-100'>
                                                                    {navigation[navigation?.findIndex(item => item?.id === 40)].name}
                                                                </li>
                                                                </Link>
                                                            )}
                                                            {navigation[navigation?.findIndex(item => item?.id === 44)] && (
                                                                <Link to='/pastprogram' onClick={handleNav}><li className='text-black ps-2 py-2  hover:bg-gray-100'>
                                                                    {navigation[navigation?.findIndex(item => item?.id === 44)].name}
                                                                </li>
                                                                </Link>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </Link>
                                        )}

                                        {nav.id === 49 && (
                                            <Link className='group md:py-4' onClick={() => handleActiveLink(5)}>
                                                <Link to='/achievements'><li className='tracking-wider text-base uppercase' onClick={handleNav}>
                                                    {nav.name}
                                                </li>
                                                </Link>
                                                <div className={`${activeLink === 5 ? 'opacity-100' : 'opacity-0'} pt-1 xl:border-b-2 border-yellow transition duration-300 group-hover:opacity-90`}></div>
                                            </Link>
                                        )}

                                        {nav.id === 50 && (
                                            <Link
                                                className='group md:py-4'
                                                onMouseEnter={() => setDownload(true)}
                                                onMouseLeave={() => setDownload(false)}

                                            >
                                                <li className='tracking-wider text-base uppercase' onClick={toggleDownload}>
                                                    {nav.name}
                                                    <i class="fa-solid fa-angle-down"></i></li>
                                                <div className={`${activeLink === 6 ? 'opacity-100' : 'opacity-0'} pt-1 xl:border-b-2 border-yellow transition duration-300 group-hover:opacity-90`}></div>
                                                {download && (
                                                    <div className='xl:absolute xl:top-14 xl:left-[835px] bg-white w-60 p-2 overflow-hidden' onClick={() => handleActiveLink(6)} >
                                                        <ul>

                                                            {navigation[navigation?.findIndex(item => item?.id === 51)] && (
                                                                <Link to='/membership' onClick={handleNav}><li className='text-black ps-2 py-2 border-b hover:bg-gray-100'>
                                                                    {navigation[navigation?.findIndex(item => item?.id === 51)].name}
                                                                </li>
                                                                </Link>
                                                            )}
                                                            {navigation[navigation?.findIndex(item => item?.id === 52)] && (
                                                                <Link to='/jobvacancy' onClick={handleNav}><li className='text-black ps-2 py-2 border-b hover:bg-gray-100'>
                                                                    {navigation[navigation?.findIndex(item => item?.id === 52)].name}
                                                                </li>
                                                                </Link>
                                                            )}
                                                            {navigation[navigation?.findIndex(item => item?.id === 53)] && (
                                                                <Link to='/lifemember' onClick={handleNav}><li className='text-black ps-2 py-2  hover:bg-gray-100'>
                                                                    {navigation[navigation?.findIndex(item => item?.id === 53)].name}
                                                                </li>
                                                                </Link>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </Link>
                                        )}

                                        {nav.id === 60 && (
                                            <Link className='group md:py-4' onClick={() => handleActiveLink(7)}>
                                                <Link to='/feedback'><li className='tracking-wider text-base uppercase' onClick={handleNav}>
                                                    {nav.name}
                                                </li>
                                                </Link>
                                                <div className={`${activeLink === 7 ? 'opacity-100' : 'opacity-0'} pt-1 xl:border-b-2 border-yellow transition duration-300 opacity-0 group-hover:opacity-90`}></div>
                                            </Link>
                                        )}

                                        {nav.id === 61 && (
                                            <Link className='group md:py-4' onClick={() => handleActiveLink(8)}>
                                                <Link to='/contact'><li className='tracking-wider text-base uppercase' onClick={handleNav}>
                                                    {nav.name}
                                                </li>
                                                </Link>
                                                <div className={`${activeLink === 8 ? 'opacity-100' : 'opacity-0'} pt-1 xl:border-b-2 border-yellow transition duration-300 opacity-0 group-hover:opacity-90`}></div>
                                            </Link>
                                        )}
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        ))}
                    </ul>
                </nav>
            </div>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/aboutindreni' element={<AboutIndreni />} />
                <Route path='/messagefrompresident' element={<MessageFromPresident />} />
                <Route path='/boardgovernance' element={<BoardGovernance />} />
                <Route path='/ourhistory' element={<OurHistory />} />
                <Route path='/ourmission' element={<OurMission />} />
                <Route path='/uniquenessIndreni' element={<UniquenessIndreni />} />
                <Route path='/organizationalprocess' element={<OrganizationalProcess />} />
                <Route path='/guidelinePrinciple' element={<GuidelinePrinciple />} />
                <Route path='/services' element={<Services />} />
                <Route path='/objectives' element={<Objectives />} />
                <Route path='/vision' element={<Vision />} />
                <Route path='/achievements' element={<Achievements />} />
                <Route path='/feedback' element={<Feedback />} />
                <Route path='/faq' element={<Faq />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/membership' element={<Membership />} />
                <Route path='/jobvacancy' element={<JobVacancy />} />
                <Route path='/lifemember' element={<LifeMember />} />
                <Route path='/runningprogram' element={<RunningProgram />} />
                <Route path='/runningprogram/:id' element={<RunningProgramDetail />} />
                <Route path='/upcomingprogram' element={<UpcomingProgram />} />
                <Route path='/upcomingprogram/:id' element={<UpcomingProgramDetail />} />
                <Route path='/pastprogram' element={<PastProgram />} />
                <Route path='/pastprogram/:id' element={<PastProgramDetail />} />
                <Route path='/newsdetail/:id' element={<NewsDetail />} />
            </Routes>
        </>
    )
}

export default Header