import "./Gallery.css";
import { useState } from "react";
import Slider from "react-slick";

const NextBtn = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="glide__arrow glide__arrow--right"
      data-glide-dir=">"
      style={{
        zIndex: "2",
      }}>
      <i className="bi bi-chevron-right"></i>
    </button>
  );
};

const PrevBtn = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="glide__arrow glide__arrow--left"
      data-glide-dir="<"
      style={{
        zIndex: "2",
      }}>
      <i className="bi bi-chevron-left"></i>
    </button>
  );
};

const Gallery = ({singleProduct}) => {
  const [activeImg, setActiveImg] = useState({
    img: singleProduct.img[0],
    imgIndex: 0,
  });

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
  };
  //  console.log(singleProduct);


  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <img src={`${activeImg.img}`} id="single-image" alt="" />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol className="gallery-thumbs glide__slides">
            <Slider {...sliderSettings}>
              {singleProduct.img.map((item, index) => {
                return (
                  <li
                    onClick={() => {
                      setActiveImg({
                        img: item,
                        imgIndex: index,
                      });
                    }}
                    className="glide__slide glide__slide--active"
                    key={index}>
                    <img
                      src={`${item}`}
                      alt=""
                      className={`img-fluid ${
                        activeImg.imgIndex === index ? "active" : ""
                      }`}
                    />
                  </li>
                );
              })}
            </Slider>    
          </ol>
        </div>
        <div className="glide__arrows" data-glide-el="controls"></div>
      </div>
    </div>
  );
};

export default Gallery;
