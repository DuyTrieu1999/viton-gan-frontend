const BASE_API = 'http://localhost:3000'
export default class HTTPService {
  static postData (path, data = {}, url = BASE_API) {
    return fetch(url + path, {
      method: 'POST',
      mode: 'cors',
      body: JSON.Stringify(data)
    })
      .then(response => response.json())
      .catch(error => console.error(`Fetch Error =\n`, error))
  }
  static getData (path, data = {}, url = BASE_API) {
    return fetch(url + path).then(res => res.json())
  }
}
