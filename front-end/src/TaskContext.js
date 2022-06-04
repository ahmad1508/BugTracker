import React, { useState} from 'react'
const TaskContext = React.createContext();
export default TaskContext;
export const Provider = ({ children }) => {
    const [todo, setToDo] = useState([])
    const [doing, setDoing] = useState([])
    const [done, setDone] = useState([])
    const [openTodo, setOpenTodo] = useState(false)
    const [openDoing, setOpenDoing] = useState(false)
    const [openDone, setOpenDone] = useState(false)
    const [newTodo, setNewTodo] = useState('')
    const [newDoing, setNewDoing] = useState('')
    const [newDone, setNewDone] = useState('')
    const [openEditTodo, setOpenEditTodo] = useState(false)
    const [openEditDoing, setOpenEditDoing] = useState(false)
    const [openEditDone, setOpenEditDone] = useState(false)
    const [editTodo, setEditTodo] = useState(false)
    const [editDoing, setEditDoing] = useState(false)
    const [editDone, setEditDone] = useState(false)
    const [editedTodoID, setEditTodoID] = useState('')
    const [editedDoingID, setEditDoingID] = useState('')
    const [editedDoneID, setEditDoneID] = useState('')
    const [sortType,setSortType] = useState('none')

    return (
        <TaskContext.Provider
            value={{
                todo: todo,
                doing: doing,
                done: done,
                setToDo: setToDo,
                setDoing: setDoing,
                setDone: setDone,
                openTodo: openTodo,
                openDoing: openDoing,
                openDone: openDone,
                setOpenTodo: setOpenTodo,
                setOpenDoing: setOpenDoing,
                setOpenDone: setOpenDone,
                newTodo: newTodo,
                newDoing: newDoing,
                newDone: newDone,
                setNewTodo: setNewTodo,
                setNewDoing: setNewDoing,
                setNewDone: setNewDone,
                openEditTodo: openEditTodo,
                openEditDoing: openEditDoing,
                openEditDone: openEditDone,
                setOpenEditTodo: setOpenEditTodo,
                setOpenEditDoing: setOpenEditDoing,
                setOpenEditDone: setOpenEditDone,
                editTodo: editTodo,
                editDoing: editDoing,
                editDone: editDone,
                setEditTodo: setEditTodo,
                setEditDoing: setEditDoing,
                setEditDone: setEditDone,
                editedTodoID: editedTodoID,
                editedDoingID: editedDoingID,
                editedDoneID: editedDoneID,
                setEditTodoID: setEditTodoID,
                setEditDoingID: setEditDoingID,
                setEditDoneID: setEditDoneID,
                sortType:sortType,
                setSortType:setSortType
            }}
        >
            {children}
        </TaskContext.Provider >
    )
}
