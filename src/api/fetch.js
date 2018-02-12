import axios from 'axios'

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        if (response) {
          resolve(response.data);
        }
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params})
      .then(response => {
        if (response) {
          resolve(response.data);
        }
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}
