import {makeAutoObservable, toJS} from 'mobx'

export default class NoteStore {
  constructor () {
    this._id = 1
    this._data = []

    makeAutoObservable(this)
  }

  setData (data) {
    this._data = data
  }

  setId (id) {
    this._id = id
  }

  get Data () {
    return toJS(this._data)
  }

  get id () {
    return toJS(this._id)
  }
}