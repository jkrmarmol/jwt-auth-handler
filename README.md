# jwt-auth-handler
These repository uses reactjs, nodejs, expressjs, mongodb,  passport-jwt and JWT to handle authentication.
For more library I used. visit `package.json`


# How to use ? 

## There are only 5 route I defined on FrontEnd

/login - to login your account

/register - code it on your own

/dashboard - it automatically redirect you from dashboard if you have a valid token

/products - same as /dashboard


## In backend there are only 3 endpoint

POST /login - uses body to login your account `{username: <username>, password: <password>}`

POST /register - uses body to registered your account `{username: <username>, password: <password>}`

GET /protected - once you have loged in,  it throw you access token and you should use it to authenticate this endpoint. Add this to your header `'Authorization': 'Bearer <token>'`

TAKE NOTE: the endpoint would start with `/api`. For example you want to access `/protected` your path would be `/api/protected`. POST request mandatory to use `Content-Type: 'application/json'`.
