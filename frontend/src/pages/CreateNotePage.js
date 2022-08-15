import React, { useEffect, useRef, useCallback } from 'react'
import { createReactEditorJS } from 'react-editor-js'
import '../styles/createNote/createNote.css'
import { TOOLS } from '../utils/editorTools'



const NotePage = () => {

  useEffect(() => {
    // componentWillMount
    const root = document.getElementById('root')
    const btnsContainer = document.getElementById('createNotePage__btn-container')
    const workspaceContainer = document.getElementById('workspace_container')

    root.classList.add('home-root-container')

    btnsContainer.style.width = `${workspaceContainer.offsetWidth * 0.9}px`
    btnsContainer.style.left = `${(window.innerWidth - btnsContainer.offsetWidth)/2}px`

    window.addEventListener('resize', e => {
      btnsContainer.style.width = `${workspaceContainer.offsetWidth * 0.9}px`
      btnsContainer.style.left = `${(window.innerWidth - btnsContainer.offsetWidth)/2}px`
    })



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
    console.log('SAVED DATA from editorJS -------- > ', DATA)
  }, [])

  const handleDelete = useCallback(async () => {
    const DATA = await editorCore.current.save()
    console.log('SAVED DATA from editorJS -------- > ', DATA)
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
        <button id='btn-delete' onClick={ handleDelete }>УДАЛИТЬ</button>
      </div>
    </>
  )
}

export default NotePage

