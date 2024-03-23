const app = require('../app')
const port = process.env.PORT || 3001

// if (process.env.NODE_ENV != 'test') {
    
//   }

app.listen(port, () => {
    console.log("TEST")
    console.log(`Example app listening on port ${port}`)
  })