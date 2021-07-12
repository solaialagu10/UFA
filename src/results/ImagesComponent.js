import './ResultsComponent.css';
import Modal from 'react-modal';
import { useState } from 'react';
import SimpleImageSlider from "react-simple-image-slider";
import Carousel from 'react-grid-carousel';
import '../mediaquery/mediaquery.css'
function ImagesComponent(props) {    
  const view =props.view ;
    const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: 150
    })    
  }  
  const selectedImages =props.selectedImages ;
  const [modalImage, setModalImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleShowDialog = () => {
    setIsOpen(!isOpen);    
  };
  function selectedImage(imageUrl){
     setModalImage(imageUrl);
    setIsOpen(!isOpen);    
  };

    return (
      <div style={{display:"inline-block",width:"100%",marginBottom:"50px"}}>
               
                {(view === 'grid' && selectedImages) ?
                      Object.keys(selectedImages).map(key => (
                        <div className="image">                   
                          <img src={`data:image/jpeg;base64,${selectedImages[key].url}`} alt={selectedImages[key].description} 
                          />
                        </div>
                      )) :
                      (view === 'slider1' && selectedImages) ? <SimpleImageSlider
                      style={{ margin: '10px auto', width: '40%' }}
                                width={500}
                                height={450}
                                images={selectedImages}
                                slideDuration={0.5}
                                navStyle={1}
                                showNavs={true}
                                showBullets={true}
                                bgColor={"#f8f8f8"}
                              />:
                              (view === 'slider' && selectedImages) && <Carousel 
                              className="carosuelClass"
                              cols={2} rows={1} gap={10} loop 
                              mobileBreakpoint= {275}
                              responsiveLayout= {[
                                {
                                  breakpoint: 800,
                                  cols: 1,
                                  rows: 1,
                                  gap: 10,
                                  loop: true
                                }
                              ]}
                              showDots={true} containerStyle= {{background: '#f8f8f8',height:'100%',margin:'10px 80px 10px 10px'}}> 
                              {Object.keys(selectedImages).map(key => (
                                              <Carousel.Item>
                                              <img width="80%" src={`data:image/png;base64,${selectedImages[key].url}`} alt={selectedImages[key].description}/>
                                            </Carousel.Item>
                                            
                                            ))}
                                  </Carousel>
              }
                <Modal
                className="dialog"      
                isOpen={isOpen}
                onRequestClose={handleShowDialog}
              >
                <img
                  className="expanded-image"
                  src={modalImage}
                  alt="no image"
                />
              </Modal> 
  </div>
    )
}

export default ImagesComponent;

