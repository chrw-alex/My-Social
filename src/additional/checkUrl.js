const checkUrl = (url) => {
  if (url.startsWith('https://')) {
    return url
  } else {
    return 'https://' + url
  }
}

export default checkUrl;