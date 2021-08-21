import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { checkUpdatedTime } from '../utils'
import Loader from './Loader'

function EssayPage() {
    const {id} = useParams()
    const {getSingleEssay, pageCurrentEssay, loading} = useGlobalContext()

    useEffect(()=>{
        getSingleEssay(id)
    }, [])

    if(loading) return <Loader />

    const {_id, title, author, body, createdAt, updatedAt} = pageCurrentEssay
    return (
        <Container className="essay-page">
            <h1>{title}</h1>
            <p className="author"><span>Author: </span>{author}</p>
            <div className="time-stamp">
                <p><span>Created At: </span>{new Date(createdAt).toLocaleDateString()}</p>
                <p><span>Updated At: </span>{checkUpdatedTime(createdAt, updatedAt)}</p>
            </div>
            <hr />
            <p className="body">{body}</p>
        </Container>
    )
}

export default EssayPage
