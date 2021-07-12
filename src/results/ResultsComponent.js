import './ResultsComponent.css';
import { useState } from 'react';
import Select from 'react-select';
import ImagesComponent from './ImagesComponent';
import mainLogo from'../images/undraw-not-found-60-pq-2.png'
import '../mediaquery/mediaquery.css'
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
    { value: 'slider', label: 'Slider' }
  ]
  const selectedImages =props.images ;
  const uploadedImage = props.uploadedImage;
  const imge =props.imge;
  const errorFlag = props.errorFlag
  const [view, setView] = useState("grid");


  function onChange(value) {
  setView(value.value);
  }
    return (
      <div>
       {errorFlag ? <div className="errorClass"> Unable to process the request, Please try again later
          </div> :""}
     
               { selectedImages.length > 0 ? 
                <div className="image-container">                  
                <div style={{display:"inline-block",width:"100%",paddingTop:"10px"}}> 
                    <div  className ="result-images" >                
                      <img src={imge}/>
                      <div  className ="result-text">{uploadedImage.length > 0 ? `Visually similar items in our catalog`:""}</div>                       
                      </div>               
                      <div className ="dropdown-class" >
                        <Select
                        styles={customStyles}
                          defaultValue={options[0]}
                          label="Single select"
                          options={options}   
                          onChange={onChange}                      
                          /></div>
                         
                </div> 
                
                <ImagesComponent view={view} selectedImages={selectedImages}/>  
      </div> : <div><img className="default-image-class" src={mainLogo} /></div>}
      </div>
    );  
   
}

export default ResultsComponent;

