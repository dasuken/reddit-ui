const translate = async (text) => {
  try {
    const baseUrl = process.env.VUE_APP_TRANSLATE_ENDPOINT
    const url = `${baseUrl}/translate?text=${text}`
    const res = await fetch(url, {
      headers: {
        accept: 'application/json;charset=utf-8'
      }
    })
    const data = await res.text()
    return data
  } catch (error) {
    console.log(error)
  }
}

export default translate