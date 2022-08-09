import {makeAutoObservable} from 'mobx'

export default class NoteStore {
  constructor () {
    this._id = 1
    this._data = [
      {
        time: 1659181537264,
        blocks: [
          {
            id: 'nPmqjwzF6_',
            type: 'header',
            data: {
              text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
              level: 2
            }
          },
          {
            id: '3dWSL1qCqi',
            type: 'paragraph',
            data: {
              text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.'
            }
          }
        ]
      },
      {
        time: 1659181537264,
        blocks: [
          {
            id: 'nPmqjwzF6_',
            type: 'header',
            data: {
              text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
              level: 2
            }
          },
          {
            id: '3dWSL1qCqi',
            type: 'paragraph',
            data: {
              text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.'
            }
          }
        ]
      },
      {
        time: 1659181537264,
        blocks: [
          {
            id: 'nPmqjwzF6_',
            type: 'header',
            data: {
              text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
              level: 2
            }
          },
          {
            id: '3dWSL1qCqi',
            type: 'paragraph',
            data: {
              text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.'
            }
          }
        ]
      }
    ]

    makeAutoObservable(this)
  }

  setData (data) {
    this._data = data
  }

  setNId (id) {
    this._id = id
  }

  get Data () {
    return this._data
  }

  get Nid () {
    return this._id
  }
}