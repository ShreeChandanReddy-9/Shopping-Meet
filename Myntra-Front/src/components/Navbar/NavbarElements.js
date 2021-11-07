import styled from 'styled-components'
import {Link as LinkR} from 'react-router-dom'

export const Nav = styled.nav`
    background: #fff;
    height:80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;

    @media screen and (max-width:960px){
        transition: 0.8s all ease;
    }
`
export const NavbarContainer= styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1100px;
`
export const NavLogo = styled(LinkR) `
    justify-self: flex-start;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 24px;
    text-decoration: none;
`
export const MobileIcon = styled.div `
    display: none;

    @media screen and (max-width:760px){
        display: block;
        position: absolute;
        top:0;
        right: 0;
        margin-top: -20px;
        transform: translate(-100%,60%);
        font-size:1.8rem;
        cursor: pointer;
        color:#0d0d0d;
    }
`
export const NavMenu = styled.ul `
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-right: -22px;

    
    @media screen and (max-width:760px){
        display: none;
    }
`
export const NavItem = styled.li `
    height: 80px;
`
export const NavLinks = styled(LinkR) `
    color: black;
    display: flex;
    align-items: center;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &:hover{
        border-bottom: 5px solid #F13AB1;
    }
`;

export const VideoLink = styled.a `
    color: black;
    display: flex;
    align-items: center;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &:hover{
        border-bottom: 5px solid #F13AB1;
    }
`