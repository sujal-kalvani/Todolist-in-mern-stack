import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import SummaryApi from '../api'
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2'

const Todos = ({ setTitle, setUpdate, setId, check }) => {
  const [todos, setTodos] = useState([])

  const fetch_todos = async () => {
    try {
      const response = await fetch(SummaryApi.GetTodos.url, {
        method: SummaryApi.GetTodos.method,
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
      })

      const result = await response.json()

      if (response.ok) {
        setTodos(result)
      }
    } catch (error) {
      toast.error("Failed to fetch Todos")
    }
  }

  useEffect(() => {
    fetch_todos()
  }, [])

  const edit_todos = async (id) => {
    try {
      const response = await fetch(`${SummaryApi.EditTodos.url}/${id}`, {
        method: SummaryApi.EditTodos.method,
        headers: { "Content-Type": "application/json" },
      })

      const result = await response.json()

      setTitle(result.title)
      setUpdate(true)
      setId(id)

    } catch (error) {
      toast.error(error)
    }
  }

  const drop_todos = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#008000",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        const response = await fetch(`${SummaryApi.DeleteTodos.url}/${id}`, {
          method: SummaryApi.DeleteTodos.method,
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to delete todo");

        Swal.fire({
          title: "Deleted!",
          text: "Todo has been successfully deleted.",
          icon: "success",
        });

        fetch_todos(); // refresh todos after deletion
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    });
  }

  const toggleCompleted = async (id) => {
    try {
      const updatedTodos = todos.map(todo =>
        todo._id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
      setTodos(updatedTodos);

      // Optionally update the backend too
      await fetch(`${SummaryApi.UpdateTodosStatus.url}/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: !todos.find(t => t._id === id).isCompleted })
      });
    } catch (err) {
      toast.error("Failed to update status");
    }
  }

  return (
    <div className="Todos text-xl font-semibold">
      Your Todos
      {
        todos.map((e) => {
          const shouldShow = check ? e.isCompleted : !e.isCompleted;
          return shouldShow ? (
            <div className='flex justify-between items-center' key={e._id}>
              <div
                className="showFinished flex items-center gap-2 text-sm cursor-pointer pt-2"
                onClick={() => toggleCompleted(e._id)}
              >
                {e.isCompleted
                  ? <MdCheckBox size={20} />
                  : <MdCheckBoxOutlineBlank size={20} />}
                <span className={`${e.isCompleted ? 'line-through text-gray-400' : ''}`}>
                  {e.title}
                </span>
              </div>

              <div className="edit-delete flex gap-1.5">
                <LiaEdit className='cursor-pointer' onClick={() => edit_todos(e._id)} />
                <MdDelete className='cursor-pointer' onClick={() => drop_todos(e._id)} />
              </div>
            </div>
          ) : null;
        })
      }
    </div>
  )
}

export default Todos
