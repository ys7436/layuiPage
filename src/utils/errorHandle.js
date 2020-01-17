const errorHandle = (err) => {
  if (err.message.includes('timeout')) {
    console.log('已经超时！！！')
  }
  console.log(err)
}
export default errorHandle
