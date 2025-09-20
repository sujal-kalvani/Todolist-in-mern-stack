import React, { useState } from 'react';
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import Todos from '../components/Todos';
import { toast } from 'react-toastify';
import SummaryApi from '../api';

const Home = () => {
  const [check, setCheck] = useState(false)
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [update, setUpdate] = useState(false)
  const [Id,setId]=useState(null)

  const validate = () => {
    if (!title.trim()) {
      setError('This field is required');
      return false;
    }
    setError('');
    return true;
  }

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const response = await fetch(SummaryApi.AddTodos.url, {
          method: SummaryApi.AddTodos.method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: title, isCompleted: false }),
          credentials: "include"
        })
        const result = await response.json()

        if (response.ok) {
          setTitle("")
          toast.success("Todo added!");
          window.location.reload();
        }
        else {
          toast.error(result.message || "something wrong")
        }
      } catch (error) {
        toast.error(error)
      }
    }
  }
const handleUpdate=async()=>{
  // console.log("update",Id);

  const response=await fetch(`${SummaryApi.UpdateTodos.url}/${Id}`,{
    method:SummaryApi.UpdateTodos.method,
    headers: { "Content-Type": "application/json" },
    body:JSON.stringify({title:title})
  })

  if(response.ok)
  {
    toast.success('Todo Updated Successfully')
    window.location.reload();
  }
  else
  {
    toast.error('Todo Not Updated')
  }
}

  return (
    <div className='bg-pink-100 min-h-[92vh] flex justify-center items-start pt-4 max-w-screen pl-5 pr-5'>
      <div className="todos bg-purple-200 min-h-[560px] w-[570px] rounded-xl p-6 flex flex-col gap-4">
        <h1 className='text-2xl text-center font-bold'>iTask - Manage your todos at one place</h1>
        <label className='text-xl font-semibold' htmlFor='todos'>Add a Todo</label>

        <div className='flex flex-col gap-1'>
          <div className='flex h-9 gap-2.5'>
            <input
              type="text"
              name="todos"
              id="todos"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='bg-white w-[90%] rounded-2xl pl-3 focus:outline-none'
            />

            <input
              type="button"
              value={update ? "Update" : "Save"}
              className='bg-purple-600 text-white font-bold w-[20%] rounded-2xl'
              onClick={update ? handleUpdate : handleSubmit}
            />


          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="showFinished flex items-center gap-2 text-sm cursor-pointer" onClick={() => setCheck(!check)}>
          {check ? <MdCheckBox size={20} /> : <MdCheckBoxOutlineBlank size={20} />}
          Show Finished
        </div>

        <hr className='ml-2 mr-2' />

        <Todos setTitle={setTitle} setUpdate={setUpdate} setId={setId} check={check} />
      </div>
    </div>
  )
}

export default Home;
