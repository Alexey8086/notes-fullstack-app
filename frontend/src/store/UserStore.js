import {makeAutoObservable, toJS} from 'mobx'

export default class UserStore {
  constructor () {
    // should be false
    this._isAuth = false
    this._user = {}
    this._setTheme = {}
    makeAutoObservable(this)
  }

  setIsAuth (bool) {
    this._isAuth = bool
  }

  setUser (user) {
    this._user = user
  }

  setSetTheme (setTheme) {
    this._setTheme = setTheme
  }

  get isAuth () {
    return this._isAuth
  }

  get user () {
    return toJS(this._user)
  }

  get setTheme () {
    return toJS(this._setTheme)
  }
}