import React  from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faRemove } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react';


// Create a Function to get the Data from Local Storage :
const getTodosFromLS = () =>
{
    const data = localStorage.getItem('Todos');

    if(data)
    {
        return JSON.parse(data)
    }
    else
    {
        return [];
    }
}





function Form()
{

    //useState for inputField :
    const [todoValue ,setTodoValue] = useState('');

    // Another UseState for storing all the Input Values :
    const [todos,setTodos]=useState(getTodosFromLS())
    // console.log(todos)


    //form Submit button :
    const handleSubmit = (e) =>
    {
        e.preventDefault();

        //Create a ID ( it holds time and date) for every Todo task :
        const date = new Date();
        const time = date.getTime();

        //we will store all the todo-task in seperate Object:
        let todoObject = {
                            ID:time,
                            TodoValue:todoValue,
                            completed:false
                         }

        //Updating todos State :
        setTodos([...todos,todoObject]);  
        
        //To Clear Input Fields :
        setTodoValue('')
    }

    // To Store Data(Array of Objects into Local Storeage ) :
    useEffect(()=>
    {
        localStorage.setItem('Todos',JSON.stringify(todos))
    },[todos])

    //To Delete Spicific Task : 
    const handleDelete = (id) => 
    {
        const shouldDelete = window.confirm('Are you sure you want to delete this task?');
        
        if (shouldDelete) {
          const filtered = todos.filter((todo) => {
            return todo.ID !== id;
          });
          setTodos(filtered);
        }
      }

     // To Update/Edit the Data :
     //UseState to Edit the Form :
     const [editForm,setEditForm]=useState(false);
     // id State :
     const[id,setId]=useState();
     //when user click on  Edit ICON button :
     const handleEdit=(todo,index)=>
     {
        setEditForm(true);
        setId(index);
        setTodoValue(todo.TodoValue);
     }
     const handleEditSubmit = (e) =>
     {
        e.preventDefault();

        let updatedTodos=[...todos];

        updatedTodos[id]={
            ...updatedTodos[id],
            TodoValue:todoValue,
            completed:false,
        }
        setTodos(updatedTodos);

        setTodoValue('')
        setEditForm(false);
     } 
     //handle Checkbox :
     const handleCheckbox=(id)=>
     {
        let todoArray=[]

        todos.forEach((todo)=>
        {
          if(todo.ID===id)
          {      
            if(todo.completed===false)
            {
                todo.completed=true;
            }
            else if(todo.completed===true)
            {
                todo.completed=false;
            }
        }
        todoArray.push(todo)
        setTodos(todoArray)
    })
    }
     
    


    //------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------
    return(
            <>
                {/* FORM : ONE */}

                {editForm===false && (

                <div className="form">
                    <form autoComplete="off" onSubmit={handleSubmit}>

                            <div className="input-and-button">
                                    
                                    <input onChange={(e)=>setTodoValue(e.target.value)}
                                     value={todoValue} 
                                     type='text' 
                                     placeholder="Add an Item" required />
                                    
                                    <div className="button">
                                    <button type='submit'>
                                    <FontAwesomeIcon icon={faPlus}  size={'2x'}  />         
                                    </button>
                                    </div>

                            </div>

                    </form>
                    </div>
                    )}

                    {/* FORM : ONE COMPLETED */}
                    
                    {/* FORM : TWO : DISPLAY WHEN USER CLICK ON EDIT BUTTON */}
                    {/* FORM : TWO : DISPLAY WHEN USER CLICK ON EDIT BUTTON */}

                     {/* FORM : ONE */}

                {editForm===true && (

                <div className="form">
                    <form autoComplete="off" onSubmit={handleEditSubmit}>

                            <div className="input-and-button">
                                    
                                    <input onChange={(e)=>setTodoValue(e.target.value)}
                                    value={todoValue} 
                                    type='text' 
                                    placeholder="Add an Item" required />
                                    
                                    <div className="button edit">
                                    <button type='submit'>
                                    UPDATE        
                                    </button>
                                    </div>

                            </div>

                    </form>
                    </div>
                    )}   

                    {/* ------------------------------------------------------------------- */}
                    {/* ------------------------------------------------------------------- */}
                    {/* ------------------------------------------------------------------- */}

                    {/* in below code : we will Render/Retrive the Local Stoage Data and Display here : */}

                    {
                        todos.length>0 && (
                            <>

                               {todos.map((individualTodo,index)=>(

                                    <div className="todo" key={individualTodo.ID}>
                                        
                                        
                                        {/* CheckBox */}
                                        <div>
                                            {editForm===false&&(<input type='checkbox'
                                            checked={individualTodo.completed}
                                            onChange={()=>handleCheckbox(individualTodo.ID)} />)}
                                            <span style={individualTodo.completed===true ? 
                                            {textDecoration:'line-through'}:
                                            {textDecoration:'none'}}>
                                                {individualTodo.TodoValue}
                                            </span>
                                        </div>
                                        {/* Edit/Delete Button */}

                                        {editForm===false&&(
                                         <div className="edit-and-delete">

                                            <div onClick={()=>handleEdit(individualTodo,index)} style={{marginRight:7+'px'}}>
                                                <FontAwesomeIcon icon={faEdit}    />
                                            </div>

                                            <div onClick={()=>handleDelete(individualTodo.ID)}>
                                                <FontAwesomeIcon icon={faRemove}    />
                                            </div>

                                         </div> 
                                         )}  
                                    
                                    </div>

                               ))} 

                               {/* BUTTON TO DELETE ALL THE TODO's : */}

                               <div style={{display:'flex',justifyContent:'flex-end'}}>

                                    <button onClick={()=>setTodos([])} className="delete-all">
                                        DELETE ALL
                                    </button>

                               </div>

                            </>
                        )
                    }

                

                
            </>

              
          )
}

export default Form