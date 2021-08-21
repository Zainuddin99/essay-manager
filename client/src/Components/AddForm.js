import React, { useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import {useGlobalContext} from '../context'
import Loader from './Loader'

function AddForm() {
    const {inputs, handleInputs, handleSubmit, setEditValue, setInputToInitialValue, loading} = useGlobalContext()
    const {id} = useParams()

    useEffect(()=>{
        if(id){
            setEditValue(id)
        }else{
            setInputToInitialValue()
        }
    }, [])

    if(loading && id) return <Loader />

    const {title, author, body} = inputs
    return (
        <Container className="add-essay-form">
            <h3>{id ? 'Edit your Essay' : 'Add new Essay'}</h3> 
            <hr />
            <form onSubmit={(e)=>{
                if(id){
                    return handleSubmit(e, id)
                }
                return handleSubmit(e)
            }}>
                <div>
                        <input type='text' name='title' required value={title} onChange={handleInputs} placeholder="Enter The title of Essay *"/>
                        <input type='text' name='author' required value={author} onChange={handleInputs} placeholder="Enter the author name *"/>
                </div>
                <div>
                    <textarea type='text' rows="20" name='body' required value={body} onChange={handleInputs} placeholder="Write your Essay here *"/>
                </div>
                <div className="btn-conatiner">
                <Button variant="primary" type="submit" disabled={loading ? true : false}>{loading ? 'Saving' : 'Submit'}</Button>
                </div>

            </form>
        </Container>
    )
}

export default AddForm
