const client = axios.create({
    baseURL: 'http://172.18.2.2:3010/api/',
    timeout: 20000
  })
  
  let result = await client.get('/fetchMeSomething', {
    onDownloadProgress: progressEvent => {
      const total = parseFloat(progressEvent.currentTarget.responseHeaders['Content-Length'])
      const current = progressEvent.currentTarget.response.length
  
      let percentCompleted = Math.floor(current / total * 100)
      console.log('completed: ', percentCompleted)
    }
  })
  .then(res => {
    console.log("All DONE: ", res.headers)
    return res.data
  })


  export default client 