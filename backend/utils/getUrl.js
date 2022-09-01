const axios = require('axios')

const getUrl = async() => {
    const {data} = await axios.get('https://randomuser.me/api/?inc=name')
    const name = data.results[0].name.first
    const url = `https://avatars.dicebear.com/api/avataaars/${name}.svg?background=%23F9F0FF`
    
    return url
}

module.exports = getUrl