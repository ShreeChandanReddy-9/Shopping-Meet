import React from 'react'
import { DealContainer, DealText, Name} from './DealElements'
import deal1 from '../../images/deal-1.webp'
import deal2 from '../../images/deal-2.webp'
import deal3 from '../../images/deal-3.webp'
import deal4 from '../../images/deal-4.webp'
import deal5 from '../../images/deal-5.webp'
import deal6 from '../../images/deal-6.webp'
import deal7 from '../../images/deal-7.webp'
import deal8 from '../../images/deal-8.webp'
import deal9 from '../../images/deal-9.webp'
import deal10 from '../../images/deal-10.webp'
import deal11 from '../../images/deal-11.webp'
import deal12 from '../../images/deal-12.webp'
import deal13 from '../../images/deal-13.webp'
import deal14 from '../../images/deal-14.webp'
import deal15 from '../../images/deal-15.webp'
import deal16 from '../../images/deal-16.webp'
import prod1 from '../../images/product-1.jpg'
import prod2 from '../../images/product-2.webp'
import prod3 from '../../images/product-3.webp'
import prod4 from '../../images/product-4.jpg'
import prod5 from '../../images/product-5.webp'
import prod6 from '../../images/product-6.jpg'
import prod7 from '../../images/product-7.webp'
import prod8 from '../../images/product-8.webp'
import prod9 from '../../images/product-9.jpg'
import prod10 from '../../images/product-10.webp'
import prod11 from '../../images/product-11.webp'
import prod12 from '../../images/product-12.webp'
import prod13 from '../../images/product-13.webp'
import prod14 from '../../images/product-14.webp'
import { Link } from 'react-router-dom'
const DealOfTheDay = () => {
    return (
            <DealContainer>
                <DealText>
                    Deal Of The Day
                </DealText>
                <div className="row">
                    <div className="col s6 m6 l3 deal">
                        <img src={deal1} alt="" className="responsive-img"/>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <img src={deal2} alt="" className="responsive-img"/>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <img src={deal3} alt="" className="responsive-img"/>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <img src={deal4} alt="" className="responsive-img"/>
                    </div>
                </div>
                <br>
                </br>
                <DealText>
                    BIGGEST DEALS ON TOP BRANDS
                </DealText>
                <div className="row">
                    <div className="col s6 m6 l3 deal">
                        <img src={deal14} alt="" className="responsive-img"/>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <img src={deal6} alt="" className="responsive-img"/>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <img src={deal10} alt="" className="responsive-img"/>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <img src={deal8} alt="" className="responsive-img"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6 m6 l3 deal">
                        <img src={deal5} alt="" className="responsive-img"/>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <img src={deal7} alt="" className="responsive-img"/>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <img src={deal11} alt="" className="responsive-img"/>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <img src={deal12} alt="" className="responsive-img"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6 m6 l3 deal">
                        <img src={deal13} alt="" className="responsive-img"/>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <img src={deal9} alt="" className="responsive-img"/>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <img src={deal15} alt="" className="responsive-img"/>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <img src={deal16} alt="" className="responsive-img"/>
                    </div>
                </div>
                <DealText>
                    Featured products
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
                    </div>
                    <div className="row">
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
                    <div className="col s6 m6 l3 deal">
                        <Link to='/prod6'><img src={prod6} className="responsive-img" alt=""/></Link>
                        <Name>WROGN Black Printed Hooded Sweatshirt</Name>
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
                        <Link to='/prod13'><img src={prod13} className="responsive-img" alt=""/></Link>
                        <Name>Fab Turquoise Blue & Pink Lehenga</Name>
                        <div class="rating">
                            <span>4 </span>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star-o"></i>
                        </div>
                        <p>&#8377;3359</p>
                    </div>
                </div>
                <div className="row">
                <div className="row">
                    <div className="col s6 m6 l3 deal">
                        <Link to='/prod14'><img src={prod14} className="responsive-img" alt=""/></Link>
                        <Name>Roadster White Jacket</Name>
                        <div class="rating">
                            <span>4.1 </span>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star-o"></i>
                        </div>
                        <p>&#8377;1304</p>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <Link to='/prod8'><img src={prod8} className="responsive-img" alt=""/></Link>
                        <Name>Harpa White Solid Top</Name>
                        <div class="rating">
                            <span>4 </span>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star-o"></i>
                        </div>
                        <p>&#8377;629</p>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <Link to='/prod10'><img src={prod10} className="responsive-img" alt=""/></Link>
                        <Name>Ahalyaa floral Printed Kurta</Name>
                        <div class="rating">
                            <span>4 </span>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star-o"></i>
                        </div>
                        <p>&#8377;839</p>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <Link to='/prod9'><img src={prod9} className="responsive-img" alt=""/></Link>
                        <Name>M&H Juniors Casual Shirt</Name>
                        <div class="rating">
                            <span>4.6 </span>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star-half-o"></i>
                        </div>
                        <p>&#8377;839</p>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col s6 m6 l3 deal">
                        <Link to='/prod11'><img src={prod11} className="responsive-img" alt=""/></Link>
                        <Name>all about you Printed Kurti</Name>
                        <div class="rating">
                            <span>4.5 </span>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star-half-o"></i>
                        </div>
                        <p>&#8377;899</p>
                    </div>
                    <div className="col s6 m6 l3 deal">
                        <Link to='/prod12'><img src={prod12} className="responsive-img" alt=""/></Link>
                        <Name>Cutiekins Navy Blue Top</Name>
                        <div class="rating">
                            <span>4 </span>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star-o"></i>
                        </div>
                        <p>&#8377;417</p>
                    </div>
                    </div>
                </div>
                </div>
            </DealContainer>
    )
}

export default DealOfTheDay
