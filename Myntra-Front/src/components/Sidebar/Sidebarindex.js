import React from 'react'
import { SidebarContainer,Icon, CloseIcon,SidebarWrapper,SidebarMenu,SidebarLink,SidebarVideoLink} from './SidebarElements'

const Sidebar = ({isOpen, toggle}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="/">
                        Men
                    </SidebarLink>
                    <SidebarLink to="/">
                        Women
                    </SidebarLink>
                    <SidebarLink to="/">
                        Kids
                    </SidebarLink>
                    <SidebarLink to="/">
                        Home & Living
                    </SidebarLink>
                    <SidebarLink to="/">
                        Profile
                    </SidebarLink>
                    <SidebarLink to="/">
                        WishList
                    </SidebarLink>
                    <SidebarLink to="/">
                        Bag
                    </SidebarLink>
                    <SidebarVideoLink href="https://myntra-meet.web.app" target="_blank">
                        <i class="small material-icons">video_call
                            </i> Myntra Meet
                    </SidebarVideoLink>
                </SidebarMenu>

            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar