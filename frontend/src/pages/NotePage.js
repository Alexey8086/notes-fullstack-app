import React, { useEffect, useRef, useCallback, useContext, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { Context } from '../index'
import { createReactEditorJS } from 'react-editor-js'
import '../styles/createNote/createNote.css'
import { TOOLS } from '../utils/editorTools'
import { getOneNote, updataNote, deleteOneNote } from '../http/noteAPI'
import { HOME_PG_ROUTE } from '../utils/consts'
import PuffLoader from "react-spinners/BarLoader"

import config from '../config'

const NotePage = observer(() => {

  const { user, note } = useContext(Context)
  const [blocks, setBlocks] = useState()
  const navigate = useNavigate()
  let { noteId } = useParams()


  let userId
  user.user.id ? userId = user.user.id : userId = user.user.data?.user.id

  useEffect(() => {
    // componentWillMount
    const root = document.getElementById('root')
    root.classList.add('home-root-container')

    return () => {
      // componentWillUnmount
      root.classList.remove('home-root-container')
    }
   }, [])

  useEffect(() => {
    const fetchData = async () => {
      const responce = await getOneNote(noteId)

      setBlocks(responce?.data?.data)
    }

    fetchData()
  }, [])


  const ReactEditorJS = createReactEditorJS()
  const editorCore = useRef(null)

  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance
  }, [])

  const handleUpdate = useCallback(async () => {
    const DATA = await editorCore.current.save()
    const res = await updataNote(DATA, noteId)

    if (config.show_logs) console.log('SAVED DATA from editorJS -------- > ', DATA)
    if (config.show_logs) console.log('RESPONSE FROM SERVER -------- > ', res)

    navigate(HOME_PG_ROUTE)
  }, [])

  const handleDelete = useCallback(async () => {
    const res = await deleteOneNote(noteId)

    if (config.show_logs) console.log('RESPONSE FROM SERVER -------- > ', res)
    navigate(HOME_PG_ROUTE)
  }, [])



  return (
    <>
      <div id="parent_container">
        <div id="empty_left_column"></div>
      
          <div id="workspace_container">
          { blocks ?
              <ReactEditorJS
                onInitialize={ handleInitialize }
                defaultValue = { blocks }
                tools = { TOOLS }
                holder = "editor"
                data = { blocks }
              >
              <div id="editor" />
              </ReactEditorJS>
                    :
              <PuffLoader color = { '#837DFE' } loading = { true } size = { 150 } />
          }
          </div>
      
          <div id="empty_right_column"></div>
      </div>

      <div id='createNotePage__btn-container'>
        <button id='btn-save' onClick={ handleUpdate }>СОХРАНИТЬ</button>
        <button id='btn-delete' onClick={ handleDelete }>УДАЛИТЬ</button>
      </div>
    </>
  )
})

export default NotePage

