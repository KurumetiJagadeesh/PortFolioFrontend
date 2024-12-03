import React from 'react'
import Header from '../../components/Header'
import Intro from './Intro'
import About from './About'
import Experiences from './Experiences'
import Projets from './Projets'
import Contact from './Contacts'
import Footer from './Footer'
import LeftSider from './LeftSider'
import { useSelector } from 'react-redux'

function Home() {
  const { portfolioData } = useSelector((state) => state.root);
  return (
    <div>
      <Header />
      {portfolioData &&(
        <div className='bg-primary px-40 sm:px-5'>
        <Intro />
        <About />
        <Experiences />
        <Projets />
        <Contact />
        <Footer />
        <LeftSider />
        </div>
      )};
    </div>
  )
} 

export default Home
