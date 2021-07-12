import './UploadComponent.css';
import { useState } from 'react';
import images from './images';
import recommendations_data from '../json/recommendations_data.json';
import ResultsComponent from '../results/ResultsComponent';
import Loader from "react-loader-spinner";
function UploadComponent() {
  const [selectedImages, setSelectedImages] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [imge, setImge] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sample, setSample] = useState("");
  const [loaderFlag,setLoaderFlag]= useState("");
  const [errorFlag,setErrorFlag]= useState(false);
  const onFileUpload = (event) => {     
    if(event.target.files[0] !== undefined)
    { 
      readURL(event.target);          
    }
  }; 

  function readURL(input) {
    const file = input.files[0];
    const reader = new FileReader();  
    let inputJson = {};
   
   reader.onload = (event) =>{     
    setErrorFlag(false);
    setLoaderFlag(true);
    inputJson.emailId = 'abc@tcs.com';
    let result =event.target.result ;
    result = result.substring(result.indexOf(",")+1,result.length)
    inputJson.byteArrayOutput =result;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputJson)
     };
      fetch('https://ufapython.azurewebsites.net/processjson', requestOptions)
        .then(response => response.json())
        .then(data =>{                 
                  const images1 = [];
                    for (let key in data.recommendations) {
                        if (data.recommendations.hasOwnProperty(key)) {    
                          let byteArray  = data.recommendations[key].recommendation_img_byte_array;      
                            let val = {description:data.recommendations[key].recommendation_img_name,
                                        url:byteArray.substring(2,byteArray.length-1)}
                            images1.push(val);
                        }
                      }
                      setLoaderFlag(false);
                      setImge(URL.createObjectURL(file));
                      setUploadedImage(file.name);   
                      setSelectedImages(images1); 
              
        }).catch(error => {
          console.log("error");
          setErrorFlag(true);
          setLoaderFlag(false);
      });
        
   }
   reader.readAsDataURL(file);
}
   
    return (
      <div className="Upload" >        
         <div className="Upload-content" >
              <label className="uploadText">
                Bring your own picture and get outfit recommendations
              </label>
              <div className="buttonWrap">
                          {/* <input type="file" onChange={onFileChange} /> 
                        <button onClick={onFileUpload}> 
                          Upload
                        </button>   */}
                          <label className ="newButton" for="upload" > Upload Image</label>
                          <input id="upload" type="file" onChange={onFileUpload} style={{display:"none"}}/> 
                          
              </div>              
          </div>
          <div>        
            { loaderFlag ? <div style={{backgroundColor:"#fff",opacity:"0.5",position:"fixed",width:"100%",height:"100%"}}><Loader
              type="ThreeDots"
              color="#172d48"
              visible={loaderFlag}
              style={{left:"50%",top:"50%",position:"fixed"}}
              /></div> :""}
              <ResultsComponent images={selectedImages} uploadedImage={uploadedImage} imge={imge} errorFlag={errorFlag}/>            
          </div>
      </div>
    );  
   
}

export default UploadComponent;