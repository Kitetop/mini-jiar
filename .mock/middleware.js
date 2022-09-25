module.exports = (request, response, next) => {
  if (request.method === 'POST' && request.path === '/login') {
    console.log(request.body, 'kkk');
    if (request.body.username === 'Kitetop' && request.body.password === '123456' ) {
      return response.status(200).json({
        user: {
          token: '123',
          id: '10000'
        }
      })
    } else {
      return response.status(400).json({
        message: '用户名密码错误'
      })
    }
  }
  next();
}