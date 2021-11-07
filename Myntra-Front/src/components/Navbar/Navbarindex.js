import React from 'react'
import { Nav,MobileIcon, NavMenu,NavbarContainer,NavLogo, NavItem, NavLinks, VideoLink} from './NavbarElements'
import {FaBars} from 'react-icons/fa'
import im from '../../images/logo.svg'
import VideoCall from '../VideoCall/Header'
const Navbar = ({toggle}) => {
    return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavLogo to="/">
                        <img src={im} alt="" width="125px" height="80px"/>
                    </NavLogo>
                    
                    <MobileIcon onClick={toggle}>
                        <FaBars/>
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                        <NavLinks to="/">Men</NavLinks>
                        </NavItem>
                    <NavItem>
                        <NavLinks to="/">Women</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="/">Kids</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="/">Home & Living</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="/">Beauty</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="/">
                            <i class="large material-icons">person_outline</i>
                            <br />
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="/">
                            <i class="large material-icons">favorite_border</i>
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="/">
                            <i class="large material-icons">work_outline</i>
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="/video-call" target="_blank">
                            <i class="large material-icons">video_call
                            </i>
                            <i class="large material-icons">emoji_people</i>
                        </NavLinks>
                        {/* <VideoLink href="https://myntra-meet.web.app" target="_blank">
                            
                            {/* <i class="large material-icons">man
                            </i> */}
                        {/* </VideoLink> */}
                    </NavItem>
                </NavMenu>
                
                </NavbarContainer>
            </Nav>  
        </>
    )
}

export default Navbar
