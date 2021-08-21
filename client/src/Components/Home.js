import React from 'react'
import {Button, Container} from 'react-bootstrap'
import {FcAddRow} from 'react-icons/fc'
import { Link } from 'react-router-dom';
import Essays from './Essays';

function Home() {
    return (
        <Container>
            <div className="add-btn-container">
                <Link to='/add-essay' ><button className='btn-add' variant="light">ADD ESSAY <FcAddRow/></button></Link>
            </div>

            <Essays/>

        </Container>
    )
}

export default Home
