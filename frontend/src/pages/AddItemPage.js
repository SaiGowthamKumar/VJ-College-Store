import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

export default function AddItemPage(){
    const [item,setItem]= useState('');
    const [description,setDescription] = useState('');
    const [content,setContent] = useState('');
    const [files,setFiles] = useState('');
    const navigate = useNavigate();

    async function addItem(ev){
        const data = new FormData();
        data.append('item',item);
        data.append('description',description);
        data.append('content',content);
        data.append('file',files[0]);
        ev.preventDefault();
        const response = await fetch('http://localhost:4001/addItem',{
          method:"POST",
          body:data,
          credentials:'include'
        });
        
        if(response.ok){
            alert("Item Added Succesfully");
            navigate("/",{state:{isLogin:true}});
        }else{
            alert("Item Not Added");
            navigate("/");
        }
      }
  

    return(
        <div className='register login'>
            <h1>Add Item</h1>
            <form className='register-content' onSubmit={addItem}>
                <div className='input-field-container'>
                    <label htmlFor="item">Item Name</label>
                    <input id="item" value={item} placeholder="Enter Item Name"
                        onChange={ev=>setItem(ev.target.value)}
                    />
                </div>
                <div className='input-field-container'>
                    <label htmlFor="description">Description</label>
                    <input id="description" value={description} placeholder="Enter Description"
                        onChange={ev=>setDescription(ev.target.value)}
                    />
                </div>
                <div className='input-field-container'>
                    <label htmlFor="contact">Contact</label>
                    <input id="contact" value={content} placeholder="Enter Contact Details"
                        onChange={ev=>setContent(ev.target.value)}
                    />
                </div>
                <input type="file" onChange={ev=>setFiles(ev.target.files)}/>
                <button type="submit">Add the Item</button>
            </form>
            <Link to="/">Home</Link>
        </div>
    )
}