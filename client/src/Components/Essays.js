import React from 'react'
import { Alert, Container } from 'react-bootstrap'
import { useGlobalContext } from '../context'
import EachEssay from './EachEssay'
import Loader from './Loader'

function Essays() {
    const {allEssays, loading} = useGlobalContext()

    if(loading) return <Loader />

    if(allEssays.length === 0) return <Alert className='warning' variant="warning">No Essays are avalilable</Alert>

    return (
        <Container className='essays-container'>
            {
                allEssays.map((item)=><EachEssay key={item._id} data={item}/>)
            }
        </Container>
    )
}

export default Essays
