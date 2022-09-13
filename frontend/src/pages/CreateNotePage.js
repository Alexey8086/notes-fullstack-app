import React, { useEffect, useRef, useCallback, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { Context } from '../index'
import { createReactEditorJS } from 'react-editor-js'
import '../styles/createNote/createNote.css'
import { TOOLS } from '../utils/editorTools'
import { HOME_PG_ROUTE } from '../utils/consts'
import { createNote } from '../http/noteAPI'

import config from '../config'


const NotePage = observer(() => {

  const { user } = useContext(Context)
  const navigate = useNavigate()


  useEffect(() => {
    // componentWillMount
    const root = document.getElementById('root')

    root.classList.add('home-root-container')

    return () => {
      // componentWillUnmount
      root.classList.remove('home-root-container')
    }
   }, [])


  const ReactEditorJS = createReactEditorJS()
  const blocks = {}

  const editorCore = useRef(null)

  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance
  }, [])

  const handleSave = useCallback(async () => {
    const DATA = await editorCore.current.save()
    const res = await createNote(DATA)

    if (config.show_logs) {
      console.log('SAVED DATA from editorJS -------- > ', DATA)
      console.log('RESPONSE FROM SERVER -------- > ', res)
    }

    navigate(HOME_PG_ROUTE)
  }, [])
   

  return (
    <>
      <div id="parent_container">
        <div id="empty_left_column"></div>
      
          <div id="workspace_container">
            <ReactEditorJS
              onInitialize={ handleInitialize }
              defaultValue = { blocks }
              tools = { TOOLS }
              holder = "editor"
            >
              <div id="editor" />
            </ReactEditorJS>
          </div>
      
          <div id="empty_right_column"></div>
      </div>

      <div id='createNotePage__btn-container'>
        <button id='btn-save' onClick={ handleSave }>СОХРАНИТЬ</button>
      </div>
    </>
  )
})

export default NotePage

