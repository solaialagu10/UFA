import './ResultsComponent.css';
import { useState } from 'react';
import Select from 'react-select';
import ImagesComponent from './ImagesComponent';
import mainLogo from'../images/undraw-not-found-60-pq-2.png'
function ResultsComponent(props) {    

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: 150
    }),
    control: (base, state) => ({
      ...base,
      border: state.isFocused ? 0 : 0,
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': {
         border: state.isFocused ? 0 : 0
      }
  }),
  option: (provided, state) => {
    return {
      ...provided,
      backgroundColor: state.isFocused ? "#d3d3d3" : null,
        '&:hover': {
          backgroundColor: state.isFocused ? "#d3d3d3" : null,
      },
      color: "#333333"
    };
  }
    
  }  
  const options = [
    { value: 'grid', label: 'Grid' },
    { value: 'slider1', label: 'Slider-1' },
    { value: 'slider2', label: 'Slider-2' }
  ]
  const selectedImages =props.images ;
  const uploadedImage = props.uploadedImage;
  const imge =props.imge;
  const [view, setView] = useState("grid");


  function onChange(value) {
  setView(value.value);
  }
    return (
                selectedImages.length > 0 ? 
                <div className="image-container">    
                <div style={{display:"inline-block",width:"100%",paddingTop:"10px"}}> 
                    <div  className ="resultImages" >                      
                      <img src={imge}  style={{width:"10vW"}}/>  
                      <div style={{float:"right",display:"inline-block",transform: "translate(75px,10px)"}}>{uploadedImage.length > 0 ? `5 results found for uploaded image`:""}</div>                       
                      </div>               
                      <div style={{float:"right",display:"inline-block",marginRight:"6%",marginTop:"1%"}}>
                        <Select
                        styles={customStyles}
                          defaultValue={options[0]}
                          label="Single select"
                          options={options}   
                          onChange={onChange}                      
                          /></div>
                         
                </div> 
                
                <ImagesComponent view={view} selectedImages={selectedImages}/>  
      </div> : <img style={{width:"30%", transform:"translateY(110px)"}} src={mainLogo} />
    );  
   
}

export default ResultsComponent;
