 import { useState } from "react";

 const App = () => {
  const [img,setImg] =useState("");
  const [loading,setLoading] = useState(false);
  const [qrData,setQrData]= useState("https://www.youtube.com/");
  const [qrSize,setQrSize] = useState("");

  async function generateQR() {
    setLoading(true);
    try{
      const url =`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`; 
      //data=${encodeURIComponent(qrData)}: The data to encode in the QR code. encodeURIComponent ensures that any special characters (like . , : in the url) in qrData are properly encoded for inclusion in the URL.
      setImg(url);
    }catch(error){
      console.error("Error generating QR code",error);
    }finally{
      setLoading(false);
      //Purpose: Resets the loading state to false after the QR code generation attempt, regardless of whether it was successful or not.
      //Effect: This ensures that the loading indicator is hidden once the QR code generation process completes.
    }
  }
  function downloadQR() {
    fetch(img)
    .then((response)=>response.blob()) //Once the image is fetched, this line converts  the image response to a Blob so you can handle it like a file.
    .then((blob)=>{
      const link = document.createElement("a");
      link.href =URL.createObjectURL(blob); //creates a temporary URL for the Blob, allowing it to be used as a file download or image source.
      link.download="qrcode.png";  //the image will get downloaded in this name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); //Cleaning up the temporary link from the DOM.
    })
    .catch((error)=>{
      console.error("Error downloading QR code",error);
    });

  }


  return (
    <div className="app-container">
      <h1>QR code Generator</h1>
      {/* message to display when the qr code is not getting displayed */}
      {loading && <p>Please wait...</p>}  
      {img && <img src={img} className="qr-code-image"/>}
      
      <div>
        <label htmlFor="dataInput" className="input-label">Data for QR code:</label>
        <input type="text" value={qrData} id="dataInput" placeholder="Enter data for QR code" onChange={(e)=>setQrData(e.target.value)}/>

        <label htmlFor="sizeInput"  className="input-label">Image size (e.g., 150):</label>
        <input type="text" value={qrSize} id="sizeInput" placeholder="Enter image size" onChange={(e)=>setQrSize(e.target.value)} />
        
        <button className="generate-button" disabled={loading} onClick={generateQR}>Generate QR Code</button>
        <button className="download-button" onClick={downloadQR}>Download QR Code</button>

        </div>

        <p className="footer">Designed By <a href='/'></a>Nathisha</p>
       </div>
  );
};

export default App;
