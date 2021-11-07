import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
export const SingleProduct = styled.div `
    margin-top: 80px;
    max-width: 1080px;
    margin: auto;
    padding-left: 25px;
    padding-right: 25px;
`
export const Smallimgrow = styled.div `
    display: flex;
    justify-content: space-between;
`
export const Smallimgcol = styled.div `
    flex-basis: 24%;
    cursor: pointer;
`
export const Pimg = styled.img `
    height:35rem !important;
    width: auto;
`
export const priceh4 = styled.h4 `
    margin: 20px 0;
    /* font-size: 22px; */
    font-weight: bold;
`
export const Pselect = styled.select `
    display: block;
    padding: 10px;
    margin-top: 20px;
`
export const SmallImg = styled.img `
    cursor: pointer;
    &:hover{
        transform: translateY(-5px);
    }
`
export const Row = styled.div `
    border: 2px solid black;
    padding: 25px;
`
export const ProductName = styled.h1 `
    color: #535665;
    padding: 5px 20px 14px 0;
    font-size: 20px;
    opacity: .8;
    font-weight: 700;
    letter-spacing: .2rem;
`
export const ProductCompany = styled.h1 `
    color: #282c3f;
    padding: 0 20px 0 0;
    font-size: 44px;
    font-weight: 800;
    line-height: 1;
`
export const Price = styled.strong `
    color: #282c3f;
    font-size: 2rem;
    font-weight: 500;
`
export const btc = styled.a `
    /* background: red; */
    
`