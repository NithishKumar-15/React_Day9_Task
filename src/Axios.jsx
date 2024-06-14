import {React,useState,useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./profile.css"

const Axios = () => {
    const[data,setData]=useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const[id,setId]=useState();
    const[editBtn,setEditBtn]=useState(false);
    const itemsPerPage=4;

    //States for form
    const[name,setName]=useState("");
    const[userName,setuserName]=useState("");
    const[email,setEmail]=useState("");
    const[phoneNumber,setphoneNumber]=useState("");
    const[street,setstreet]=useState("");
    const[city,setcity]=useState("");
    const[zipCode,setzipCode]=useState("");
    const[website,setwebsite]=useState("");
    const[companyName,setcompanyName]=useState("");
    const[catchphrase,setcatchphrase]=useState("");
    
    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/users").then((response)=>{
            setData(response.data);
        }).catch((e)=>{
            console.log(e);
        })
    },[])

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePrevClick = () => {
        setCurrentPage(currentPage => currentPage - 1);
    };

    const handleNextClick = () => {
        setCurrentPage(currentPage => currentPage + 1);
    };

    //Edit data
    function edit(id){
      data.forEach((val)=>{
        val.id===id&&
        setName(val.name);
        setuserName(val.username);
        setEmail(val.email);
        setphoneNumber(val.phone);
        setstreet(val.address.street);
        setcity(val.address.city);
        setzipCode(val.address.zipcode);
        setwebsite(val.website);
        setcompanyName(val.company.name);
        setcatchphrase(val.company.catchPhrase);
        setEditBtn(true)
        setId(id);
      })
    }

    //Delete data
    function deleteData(id){
      const list=data.map((val)=>(val.id!=id&&{...val}))
      setData(list);
      axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`).then((res)=>{
        console.log(res.status);
      })
    }

    function submit(e){
        e.preventDefault();
        if(id!=undefined){
          const list=data.map((val)=>(
            val.id===id?{...val,name:name,username:userName,email:email,
              address:{street:street,city:city,zipcode:zipCode},
              website:website,
              company:{
              name:companyName,
              catchPhrase:catchphrase
            }}:val
          ))
          setData(list)
          const obj={
            "id": id,
            "name": name,
            "username":userName,
            "email": email,
            "address": {
            "street": street,
            "suite": "Apt. 556",
            "city": city,
            "zipcode":zipCode,
            "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
            }
            },
            "phone": phoneNumber,
            "website": website,
            "company": {
            "name": companyName,
            "catchPhrase": catchphrase,
            "bs": "harness real-time e-markets"
            }
          }
          axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,obj).then((response)=>{
            console.log(response.status);
          })
        setName("");
        setuserName("");
        setEmail("");
        setphoneNumber("");
        setstreet("");
        setcity("");
        setzipCode("");
        setwebsite("");
        setcompanyName("");
        setcatchphrase("");
        setId();
        setEditBtn(false)
          }
          else{
            const obj={
              "id": data.length+1,
              "name": name,
              "username":userName,
              "email": email,
              "address": {
              "street": street,
              "suite": "Apt. 556",
              "city": city,
              "zipcode":zipCode,
              "geo": {
              "lat": "-37.3159",
              "lng": "81.1496"
              }
              },
              "phone": phoneNumber,
              "website": website,
              "company": {
              "name": companyName,
              "catchPhrase": catchphrase,
              "bs": "harness real-time e-markets"
              }
            }
            axios.post("https://jsonplaceholder.typicode.com/users",obj).then((res)=>{
              console.log(res.status);
            })
            setData([...data,obj]);
            setName("");
        setuserName("");
        setEmail("");
        setphoneNumber("");
        setstreet("");
        setcity("");
        setzipCode("");
        setwebsite("");
        setcompanyName("");
        setcatchphrase("");
          }
        }


    const renderTableRows = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex).map((item, index) => (
          item&&
            <div className='content rounded text-white' key={item.id}>

      <div className='edit'>
      <i className="bi bi-trash"></i><button className="deleteBtn" onClick={()=>deleteData(item.id)}>Delete</button>
        <div>
          <i className="bi bi-pencil-square"></i><button className='editBtn' onClick={()=>edit(item.id)}>Edit</button>
        </div>
      </div>

      <div className='nameph'>
        <h5>{item.name}</h5>
        <p>{item.username}</p>
      </div>

      <hr></hr>

      <div>
        <i className="bi bi-envelope"></i><span style={{paddingLeft:"3px"}}>{item.email}</span><br></br>
        <i className="bi bi-telephone"></i><span style={{paddingLeft:"3px"}}>{item.phone}</span><br></br>
        <i className="bi bi-geo-alt"></i><span style={{paddingLeft:"3px"}}>Address:-</span><br></br>
        <div>
          <p><span>Street:</span><span style={{paddingLeft:"3px"}}>{item.address.street}</span></p>
          <p><span>City:</span><span style={{paddingLeft:"3px"}}>{item.address.city}</span></p>
          <p><span>ZipCode:</span><span style={{paddingLeft:"3px"}}>{item.address.zipcode}</span></p>
        </div>
      </div>
      <hr></hr>

      <div>
        <p><span>WebSite:</span><span style={{paddingLeft:"3px"}}>{item.website}</span></p>
        <div>
          <span>Company:-</span>
          <p><span>Company Name:</span><span style={{paddingLeft:"3px"}}>{item.company.name}</span></p>
          <p><span>catchPhrase :</span><span style={{paddingLeft:"3px"}}>{item.company.catchPhrase}</span></p>
        </div>
      </div>
      
    </div>
        ));
    };


  return (
    <>
   <div className='d-flex'> 
    {renderTableRows()}
    </div> 
    <div className='prevnextbtn'>
        <button onClick={handlePrevClick} disabled={currentPage === 0} className='pagnavg'>Previous</button>
        <span>Page {currentPage + 1} of {totalPages}</span>
        <button onClick={handleNextClick} disabled={currentPage === totalPages - 1} className='pagnavg'>Next</button>
    </div>
    <br></br>
   
    <div id='formdiv'>
      <h4 className='text-center'>Form</h4>
    <form action="post" className='d-flex flex-column' onSubmit={(e)=>submit(e)}>
        <label>Name:</label>
        <input type={"text"} value={name} onChange={(e)=>setName(e.target.value)}></input>

        <label>user Name:</label>
        <input type={"text"} value={userName} onChange={(e)=>setuserName(e.target.value)}></input>

        <label>Email:</label>
        <input type={"email"} value={email} onChange={(e)=>setEmail(e.target.value)}></input>

        <label>Phoe Number:</label>
        <input type={"text"} value={phoneNumber} onChange={(e)=>setphoneNumber(e.target.value)}></input>

        <label>Address:-</label>
        Street:<input type={"text"} value={street} onChange={(e)=>setstreet(e.target.value)}></input>
        City:<input type={"text"} value={city} onChange={(e)=>setcity(e.target.value)}></input>
        Zip Code:<input type={"text"} value={zipCode} onChange={(e)=>setzipCode(e.target.value)}></input>

        <label>WebSite:</label>
        <input type={"text"} value={website} onChange={(e)=>setwebsite(e.target.value)}></input>

        <label>Company:-</label>
        Company Name:<input type={"text"} value={companyName} onChange={(e)=>setcompanyName(e.target.value)}></input>
        catchPhrase:<input type={"text"} value={catchphrase} onChange={(e)=>setcatchphrase(e.target.value)}></input><br></br>
        {editBtn?<input type={"submit"} value={"Edit"}></input>:<input type={"submit"} value={"Create"}></input>}
        
    </form>
    </div>

    </>
  )
}

export default  Axios


