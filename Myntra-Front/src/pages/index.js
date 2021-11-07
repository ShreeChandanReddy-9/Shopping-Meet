import React, {useState} from 'react'
import DealOfTheDay from '../components/Deal/Dealindex';
import HeroSection from '../components/HeroSection/Heroindex';
import Navbar from '../components/Navbar/Navbarindex'
import Sidebar from '../components/Sidebar/Sidebarindex'
const Home = () => {
    const [isOpen, setisOpen] = useState(false);

const toggle = ()=>{
    console.log('toggle');
    setisOpen(!isOpen);
};

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle}/>
            <Navbar toggle={toggle}/>
            <HeroSection/>
            <DealOfTheDay/>
        </>
    )
}

export default Home