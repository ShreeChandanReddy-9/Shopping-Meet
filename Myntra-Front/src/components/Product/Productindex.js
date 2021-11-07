import React,{useState,useEffect} from 'react'
import { DealText } from '../Deal/DealElements'
import {Pselect, SmallImg,ProductName, ProductCompany,Price,btc } from './ProductElements'
import Sidebar from '../Sidebar/Sidebarindex'
import { Link } from 'react-router-dom'
import { Name } from '../Deal/DealElements'
import prod1 from '../../images/product-1.jpg'
import prod2 from '../../images/product-2.webp'
import prod3 from '../../images/product-3.webp'
import prod4 from '../../images/product-4.jpg'
import prod5 from '../../images/product-5.webp'
import prod6 from '../../images/product-6.jpg'
import prod7 from '../../images/product-7.webp'
import Navbar from '../Navbar/Navbarindex'
import M from "materialize-css";
const Product = ({name,description,gal1,gal2,gal3,gal4,title,id,price,ra}) => {
    const [prodimg, setprodimg] = useState(gal1);
    useEffect(() => {
        setprodimg(gal1);
    }, [id])
    useEffect(() => {
        var elems = document.querySelectorAll(".materialboxed");
        M.Materialbox.init(elems);
    }, []);
    const [isOpen, setisOpen] = useState(false);
    const toggle = ()=>{
        console.log('toggle');
        setisOpen(!isOpen);
    };
    return (
        <div>
           <Sidebar isOpen={isOpen} toggle={toggle}/>
            <Navbar toggle={toggle}/>
            <div className="container product" id={id}>
                <div className="row">
                    <div className="col s12 m6">
                        <div className="row">
                        <div className="col s1 m2">
                            <div className="row">
                                <SmallImg src={gal1} className="responsive-img dp" onClick={()=>{setprodimg(gal1)}}></SmallImg>
                            </div>
                            <div className="row">
                                <SmallImg src={gal2} className="responsive-img dp" onClick={()=>{setprodimg(gal2)}}></SmallImg>
                            </div>
                            <div className="row">
                                <SmallImg src={gal3}className="responsive-img dp" onClick={()=>{setprodimg(gal3)}}></SmallImg>
                            </div>
                            <div className="row">
                                <SmallImg src={gal4}className="responsive-img dp" onClick={()=>{setprodimg(gal4)}}></SmallImg>
                            </div>
                        </div>
                        <div className="col s10">
                            <img src={prodimg} alt="" className="responsive-img materialboxed" id="prodimg"/>
                        </div>
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <ProductCompany>{name}</ProductCompany>
                        <ProductName>{title}</ProductName>
                        <div className="rating">
                            <ProductName>{ra}<i class="fa fa-star"></i> </ProductName>
                        </div>
                        <div class="divider"></div>
                        <Price>{price}</Price>
                        <br/>
                        <Pselect>
                            <option>Select Size</option>
                            <option>XXL</option>
                            <option>XL</option>
                            <option>L</option>
                            <option>Medium</option>
                            <option>Small</option>
                        </Pselect>
                        <a class="btn pink"><span class="white-text text-darken-2">Add to Cart</span></a>
                        <h5>Product Details <i class="fa fa-indent"></i></h5>
                        <br />
                        <p>{description}</p>
                    </div>
                </div>
            </div>
            <DealText>
                
                People also searched for....
            </DealText>
            <div className="container">
            <div className="row">
                                    <div className="col s6 m6 l3 deal">
                        <Link to='/prod1'><img src={prod1} className="responsive-img" alt=""/></Link>
                        <Name>PUMA Jacket</Name>
                        <div class="rating">
                            <span>4.3 </span>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star-o"></i>
                        </div>
                        <p>&#8377;5999</p>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <Link to='/prod2'><img src={prod2} className="responsive-img" alt=""/></Link>
                        <Name>HRX Sporty Jacket</Name>
                        <div class="rating">
                            <span>4.5 </span>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star-half-o"></i>
                        </div>
                        <p>&#8377;1199</p>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <Link to='/prod4'><img src={prod4} className="responsive-img" alt=""/></Link>
                        <Name>ADIDAS Training Jacket</Name>
                        <div class="rating">
                            <span>4.7 </span>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star-half-o"></i>
                        </div>
                        <p>&#8377;3009</p>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <Link to='/prod3'><img src={prod3} className="responsive-img" alt=""/></Link>
                        <Name>Reebok Training TRACKSUIT</Name>
                        <div class="rating">
                            <span>4.4 </span>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star-o"></i>
                        </div>
                        <p>&#8377;3999</p>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <Link to='/prod5'><img src={prod5} className="responsive-img" alt=""/></Link>
                        <Name>Allen Solly Slim Fit Solid Casual Shirt</Name>
                        <div class="rating">
                            <span>4.8 </span>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star-half-o"></i>
                        </div>
                        <p>&#8377;1499</p>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <Link to='/prod6'><img src={prod6} className="responsive-img" alt=""/></Link>
                        <Name>WROGN Black Printed Sweatshirt</Name>
                        <div class="rating">
                            <span>4.2 </span>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star-o"></i>
                        </div>
                        <p>&#8377;1199</p>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <Link to='/prod7'><img src={prod7} className="responsive-img" alt=""/></Link>
                        <Name>Azira Ethnic Motifs Print Bell Sleeves</Name>
                        <div class="rating">
                            <span>4.2 </span>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star-o"></i>
                        </div>
                        <p>&#8377;695</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
