const authInfo = () => {
  const authStore = {
    tokens: JSON.parse(localStorage.getItem('animatly_token')),
    user: JSON.parse(localStorage.getItem('animatly_user')),
  }
  return authStore
}

const authClear = () => {
  localStorage.removeItem('animatly_token')
  localStorage.removeItem('animatly_user')
  localStorage.removeItem('animatly_selected_lottie')
}

const isCookie = () => {
  const cookie = JSON.parse(localStorage.getItem('animatly_cookie'))
  return cookie
}
export {
  authInfo,
  authClear,
  isCookie,
}