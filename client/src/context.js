import { createContext, useContext, useEffect, useState } from "react";
import { addEssayAPI, deleteEssayAPI, getAllEssayAPI, getSingleEssayAPI, updateEssayAPI } from "./api";
import {useHistory} from 'react-router-dom'

const appContext = createContext()
const initialInputs = {title: '', author: '', body: ''}

const AppProvider = ({children}) =>{
    const [inputs, setInputs] = useState(initialInputs)
    const [loading, setLoading] = useState(false)
    const [errorState, setErrorState] = useState({isError: false, message: ''})
    const [allEssays, setAllEssays] = useState([])
    const [pageCurrentEssay, setPageCurrentEssay] = useState({})
    const history = useHistory()

    useEffect(()=>{
        fetchEssays()
    }, [])

    const handleInputs = (e) =>{
        setInputs((prev)=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    useEffect(()=>{
        const timer = setTimeout(()=>setErrorState({isError: false, message:''}), 3000)

        return ()=>clearTimeout(timer)
    }, [errorState])

    const handleSubmit = async(e, id) =>{
        e.preventDefault()
        setLoading(true)
        try{
            if(id){
                await updateEssayAPI(id, inputs)
            }else{
            await addEssayAPI(inputs)
            }
            setLoading(false)
            setInputs(initialInputs)
            window.location.href="/"
        }catch(err){
            setLoading(false)
            setErrorState({isError: true, message: 'Something went wrong'})
        }
    }

    const fetchEssays = async() =>{
        setLoading(true)
        try {
            const response = await getAllEssayAPI()
            setAllEssays(response.data.result)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setErrorState({isError: true, message: 'Something went wrong'})
        }
    }

    const getSingleEssay = async(id) =>{
        setLoading(true)
        try{
        const response = await getSingleEssayAPI(id)
        setPageCurrentEssay(response.data.result)
        setLoading(false)
        }catch(err){
            setLoading(false)
            setErrorState({isError: true, message: 'Something went wrong'})
        }
    }

    const deleteEssay = async(id) =>{
        const filteredEssays = allEssays.filter((item)=>item._id !== id)
        setAllEssays(filteredEssays)
        try{
        await deleteEssayAPI(id)
        }catch(err){
        Window.location.reload()
        setErrorState({isError: true, message: 'Something went wrong'})
        }
    }

    const setEditValue = async(id) =>{
        setLoading(true)
        try{
        const response = await getSingleEssayAPI(id)
        setLoading(false)
        const {title, author, body} = response.data.result
        setInputs({title, author, body})
        }catch(err){
        setLoading(false)
        setErrorState({isError: true, message: 'Something went wrong'})
        }
    }

    const setInputToInitialValue = () =>{
        setInputs(initialInputs)
    }

    return <appContext.Provider value={{inputs, handleInputs, handleSubmit, allEssays, getSingleEssay, pageCurrentEssay,loading, deleteEssay, setEditValue, setInputToInitialValue, errorState}}>
        {children}
    </appContext.Provider>
}

const useGlobalContext = () =>{
    return useContext(appContext)
}

export {useGlobalContext, AppProvider}