import React, { useEffect, useContext, useState } from 'react'
import { observer } from "mobx-react-lite"
import { Context } from '../index'
import { useNavigate, useParams, useRouteMatch } from 'react-router-dom'
import { getOneNote } from '../http/noteAPI'
import { SETTINGS_PG_ROUTE, NOTE_PG_ROUTE } from '../utils/consts'
import '../styles/item/item.css'


const Note = observer((props) => {

  const { note } = useContext(Context)
  const [overflow, setOverflow] = useState(true)
  const [heading, setHeading] = useState('Название отсутсутсвует')
  const [content, setContent] = useState('Похоже заметка пустая')


  const navigate = useNavigate()
  
  const onClickHandler = async (noteId) => {
    const { data } = await getOneNote(noteId)
    note.setData(data?.data)
    note.setId(noteId)
    navigate(`${NOTE_PG_ROUTE}/${noteId}`)
  }
  
  const dateObject = new Date(props.time)

  useEffect(() => {
    const head = props.blocks[0]?.data.text
    if (props.blocks[0]?.data.text) setHeading(props.blocks[0]?.data.text)
    if (props.blocks[1]?.data.text) setContent(props.blocks[1]?.data.text)
    if (props.blocks[0]?.data.text.length < 20) setOverflow(false)

  }, [])

  return (

    <div onClick={ () => onClickHandler(props.noteId) } className='item'>
    <div className='item__title'>
      {
        overflow ? 
        <marquee behavior="scroll" direction="left" bgcolor="transparent">
        { heading }
        </marquee>
        : heading
      }

      {/* { props.blocks[0]?.data.text ? props.blocks[0].data.text : 'Название отсутсутсвует' } */}
    </div>
    <div className='item__text'>
      { content }
    </div>
    <div className='item__date'>{ dateObject.toLocaleString() }</div>
  </div>

  )

})

export default Note