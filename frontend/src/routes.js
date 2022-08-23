import MainPage from "./pages/MainPage"
import AuthPage from "./pages/AuthPage"
import HomePage from "./pages/HomePage"
import CreateNotePage from "./pages/CreateNotePage"
import NotePage from "./pages/NotePage"
import NotFoundPage from "./pages/404"
import SettingsPage from "./pages/SettingsPage"
import { AUTH_PG_ROUTE, HOME_PG_ROUTE, MAIN_PG_ROUTE, NOTE_PG_ROUTE, NOTFOUND_PG_ROUTE, SETTINGS_PG_ROUTE } from "./utils/consts"

export const privateRoutes = [
  {
    path: HOME_PG_ROUTE,
    Component: HomePage
  },
  {
    path: NOTE_PG_ROUTE,
    Component: CreateNotePage
  },
  {
    path: NOTE_PG_ROUTE + '/:noteId',
    Component: NotePage
  },
  {
    path: SETTINGS_PG_ROUTE + '/:id',
    Component: SettingsPage
  },
]

export const publicRoutes = [
  {
    path: MAIN_PG_ROUTE,
    Component: MainPage
  },
  {
    path: AUTH_PG_ROUTE,
    Component: AuthPage
  },
  {
    path: AUTH_PG_ROUTE + '/:tab',
    Component: AuthPage
  },
  {
    path: NOTFOUND_PG_ROUTE,
    Component: NotFoundPage
  }
]