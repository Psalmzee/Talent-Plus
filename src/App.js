import React, { useEffect, useState } from "react";


import "./App.css"

const App = () => {
     const baseURL = "http://localhost:9002/api";
   
     const [getResult, setGetResult] = useState(false);

    const [info , setInfo] = useState(null)

     const getDATa = async() => {

      const res = await fetch(`${baseURL}/texts`);
      const baseData = await res.json()
      console.log(baseData.data)

      setInfo(baseData.data)
      

     }

     useEffect( () => {

getDATa()


     }, [])

     const handleApi = () => {

      setGetResult(true)
     }

     



   
     const fortmatResponse = (res) => {
       return JSON.stringify(res, null, 2);
     }
   
     async function getAllData() {
       try {
         const res = await fetch(`${baseURL}/texts`);
   
         if (!res.ok) {
           const message = `An error has occured: ${res.status} - ${res.statusText}`;
           throw new Error(message);
         }
   
         const data = await res.json();

         console.log(data);
   
         const result = {
           status: res.status + "-" + res.statusText,
           headers: {
             "Content-Type": res.headers.get("Content-Type"),
             "Content-Length": res.headers.get("Content-Length"),
           },
           length: res.headers.get("Content-Length"),
           data: data,
         };
   
         setGetResult(fortmatResponse(result));
       } catch (err) {
         setGetResult(err.message);
       }
     }

return (



<div className=""> 

<div className="card">
      <div className="card-header">TALENT PLUS MICROSERVICES</div>
      <div className="card-body">
        <div className="input-group input-group-sm">
          <button className="btn btn-sm btn-primary" onClick={handleApi}>Get TALENT PLUS</button>

        { getResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{getResult}</pre></div> }
      </div>

   
    </div>
    </div> 


    <>
    
    {getResult  &&   <>   <div  className="centerInfo">
   
   {info ? 
   
   <div>
     {info.map( item => (
        <h1> {item.title}</h1>
     ))}
</div> 

: <h1>  is loading </h1>}

</div> </>}
    </>




</div>

   );
};

export default App;