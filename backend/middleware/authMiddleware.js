//middleware, который закрывает доступ к странице для неавторизованных пользователей
//данный middleware перенаправляет всех неавторизованных пользователей на страницу входа в систему

module.exports = function (req, res, next) {
  if (!req.session.isAuthenticated) {
    // return res.redirect('/user/login')
    return res.json('Пользователь не авторизован')
  }

  next()
}