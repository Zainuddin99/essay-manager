import React from 'react'
import { Link } from 'react-router-dom'
import {MdDeleteSweep} from 'react-icons/md'
import {BiEdit} from 'react-icons/bi'
import {AiOutlineFolderView} from 'react-icons/ai'
import { useGlobalContext } from '../context'
import { checkUpdatedTime } from '../utils'

function EachEssay({data}) {
    const {_id, title, author, body, createdAt, updatedAt} = data 
    const {deleteEssay} = useGlobalContext()

    return (
        <div className='essay'>
            <div className="basic-detail">
                <p><span>Title:</span> {title}</p>
                <p><span>Author:</span> {author}</p>
            </div>
            <p className="essay-body">
                {body}
            </p>
            <div className="time-stamp">
                <p><span>Created At:</span> {new Date(createdAt).toLocaleDateString()}</p>
                <p><span>Updated At:</span> {checkUpdatedTime(createdAt, updatedAt)}</p>
            </div>
            <div className="down-bar">
                <button><Link to={`essays/${_id}`}><AiOutlineFolderView/></Link></button> 
                <button><Link to={`edit-essay/${_id}`}><BiEdit/></Link></button>
                <button onClick={()=>deleteEssay(_id)}><MdDeleteSweep/></button>
            </div>
        </div>
    )
}

export default EachEssay
