import React from 'react'
import Banner from './Banner'
import AboutUs from './AboutUs'
import UpcomingProject from './UpcomingProject'
import PastProgram from './PastProgram'
import Vision from './Vision'
import Message from './Message'
import RecentProject from './RecentProject'
import News from './News'


const Home = () => {
  return (
    <>
        <Banner />
        <AboutUs />
        <RecentProject sectionHeading='running program'/>
        <UpcomingProject sectionHeading='upcoming program'/>
        <PastProgram sectionHeading='past program' />
        <News />
    </>
  )
}

export default Home