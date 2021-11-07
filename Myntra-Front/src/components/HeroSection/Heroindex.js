import React, {Component}from 'react'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import banner1 from '../../images/banner-1.gif';
import banner2 from '../../images/banner-2.webp';
import banner3 from '../../images/banner-3.webp';
import banner4 from '../../images/banner-4.webp';

class HeroSection extends Component {

componentDidMount() {
    const options = {
        fullWidth: true,
        indicators: true,
        duration: 300
    };
    M.Carousel.init(this.Carousel, options);
    let instance = M.Carousel.getInstance(this.Carousel);
    setInterval(()=>{
      instance.next(1);
    },6000)
    }


    render() {
        return (
            <div
            ref={Carousel => {
                this.Carousel = Carousel;
            }}
            className="carousel carousel-slider center"
            >
            <div className="carousel-item " href="#one!">
                <img src={banner1} alt="" />
            </div>
            <div className="carousel-item" href="#two!">
                <img src={banner2} alt="" />
            </div>
            <div className="carousel-item" href="#three!">
                <img src={banner3} alt="" />
            </div>
            <div className="carousel-item " href="#four!">
                <img src={banner4} alt="" />
            </div>
            </div>
        );
    }
}

export default HeroSection;
