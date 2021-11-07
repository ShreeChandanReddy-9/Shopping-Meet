import styled from 'styled-components'
import {FaTimes} from 'react-icons/fa'
import { Link as LinkR } from 'react-router-dom'

export const SidebarContainer = styled.aside `
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: #fff;
    display: grid;
    align-items: center;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
    opacity: ${({isOpen}) =>(isOpen ? '100%' : '0')};
    top: ${({isOpen}) =>(isOpen ? '0' : '-100%')};
`
export const CloseIcon = styled(FaTimes) `
    color: #0d0d0d;
    &:hover{
        color: #F13AB1;
    }
`
export const SidebarMenu = styled.ul `
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 80px);
    text-align: center;

    @media screen and (max-width:480px){
        grid-template-rows: repeat(6,60px);
    }
`

export const Icon = styled.div `
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
`
export const SidebarWrapper = styled.div `
    color: #0d0d0d;
`
export const SidebarLink = styled(LinkR) `
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    text-decoration: none;
    list-style: none;
    transition: 0ms.2s ease-in-out;
    text-decoration: none;
    color: #0d0d0d;
    font-weight: 600;
    cursor: pointer;

    &:hover{
        color: #F13AB1;
        transition: 0.2s ease-in-out;
    }
`
export const SidebarVideoLink = styled.a `
    display: flex;
    margin-top: 2rem;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    text-decoration: none;
    list-style: none;
    transition: 0ms.2s ease-in-out;
    text-decoration: none;
    color: #0d0d0d;
    font-weight: 600;
    cursor: pointer;

    &:hover{
        color: #F13AB1;
        transition: 0.2s ease-in-out;
    }
`