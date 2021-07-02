import './UploadComponent.css';
import { useState } from 'react';
import images from './images';
import recommendations_data from '../json/recommendations_data.json';
import ResultsComponent from '../results/ResultsComponent';
function UploadComponent() {
  const [selectedImages, setSelectedImages] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [imge, setImge] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sample, setSample] = useState("");
  
  const onFileUpload = (event) => {     
    const formData = new FormData();
    const images1 = [];
    for (let key in recommendations_data.recommendations) {
        if (recommendations_data.recommendations.hasOwnProperty(key)) {          
            let val = {description:recommendations_data.recommendations[key].recommendation_img_name,
                         url:recommendations_data.recommendations[key].recommendation_img_byte_array.substring(2,recommendations_data.recommendations[key].recommendation_img_byte_array.length-1)}
            images1.push(val);
         }
      }
      setSelectedImages(images1);      
    if(event.target.files[0] !== undefined)
    {

      readURL(event.target);
      setImge(URL.createObjectURL(event.target.files[0]));
      setUploadedImage(event.target.files[0].name);         
    }
    // console.log(event.target.files[0]);    
    // setSelectedImages(images);
    // axios.post("api/uploadfile", formData); 
  }; 

  function readURL(input) {
    const file = input.files[0];
    const reader = new FileReader();  
    let inputJson = {};
   
   reader.onload = (event) =>{
    inputJson.emailId = 'abc@tcs.com';
    let result =event.target.result ;
    result = result.substring(result.indexOf(",")+1,result.length)
    console.log("<><> >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>. "+result);
    inputJson.byteArrayOutput =result;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputJson)
     };
      fetch('https://ufapython.azurewebsites.net/processjson', requestOptions)
        .then(response => response.json())
        .then(data =>{
                  console.log(JSON.stringify(data))
                  const images1 = [];
                    for (let key in data.recommendations) {
                        if (data.recommendations.hasOwnProperty(key)) {          
                            let val = {description:data.recommendations[key].recommendation_img_name,
                                        url:data.recommendations[key].recommendation_img_byte_array.substring(2,recommendations_data.recommendations[key].recommendation_img_byte_array.length-1)}
                            images1.push(val);
                        }
                      }
              setSelectedImages(images1); 
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
          <ResultsComponent images={selectedImages} uploadedImage={uploadedImage} imge={imge} />
          </div>
      </div>
    );  
   
}

export default UploadComponent;

