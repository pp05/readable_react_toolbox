const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const fetchPostsFromServer = () =>
  fetch(`${api}/posts`,  { headers })
  	.then(data => data.json())

  	
export const fetchCategoriesFromServer = () =>
  fetch(`${api}/categories`,  { headers })
  	.then(data => data.json())

// Add new post
export const addPostInDB = data =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json())

// Edit post
export const editPostInDB = (data, id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json())
