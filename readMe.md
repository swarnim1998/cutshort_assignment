# cutshort code challenge

Hosted link:- https://dbbe-2401-4900-1c08-2a47-a4de-6753-9ab0-9500.ngrok.io
Completed tasks:- 
1. SignUp and SignIn api's using jwt token.
2. Refresh Token task.
3. ToDo list api's with the same requirement mentioned in document.
4. Post and comments api's with the same requirement mentioned in document.

Instructions:-
1. Run npm install command 
2. To run the server in local run bellow command
   npm run local
3. Call the api's in the same format mentioned below or use the postman api
   
Apis:- 
// Authentication apis
1. SignUp:-
request:- {
  'method': 'POST',
  'url': 'http://localhost:3002/api/user/signUp',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "email": "abc3@gmail.com",
    "user": "danish",
    "password": "abc123"
  })
}   
  
2. SignIn:- 
request:- {
  'method': 'POST',
  'url': 'http://localhost:3002/api/user/signIn',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "key": "danish",
    "password": "abc123"
  })
}

3. Refresh-token:- 
request:- {
  'method': 'POST',
  'url': 'http://localhost:3002/api/user/reIssueToken',
  'headers': {
    'refresh-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZGFuaXNoIiwiaWF0IjoxNjgwNDIzODg2LCJleHAiOjE2ODgxNjk2MDB9.YaeG8cK7NgHfoGkK1Wr-x8cYRkk7fggRJU62JjAC-7I'
  }
}
   
response:- {
    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZGFuaXNoIiwiaWF0IjoxNjgwNDIzODg2LCJleHAiOjE2ODA0ODAwMDB9.sodjLSBTxKQlrSpPZQTfNRPhUqnWj__lALDHN8-EQl0",

    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZGFuaXNoIiwiaWF0IjoxNjgwNDIzODg2LCJleHAiOjE2ODgxNjk2MDB9.YaeG8cK7NgHfoGkK1Wr-x8cYRkk7fggRJU62JjAC-7I"
}


// ToDo list apis
1. Create ToDo List
request:- {
  'method': 'POST',
  'url': 'http://localhost:3002/api/todo',
  'headers': {
    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicmFqIiwiaWF0IjoxNjgwNDE1NzU2LCJleHAiOjE2ODA0ODAwMDB9.5Imz1Uyvcq7kkQpB4Yh2UcE2jUPZydJ3YphWuvUueEk',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "title": "danish 1nd to do"
  })
} 

2. fetch ToDo lists
//To get all the todos remove userId from url query
request:-  {
  'method': 'GET',
  'url': 'http://localhost:3002/api/todo?userId=6427ddcd343e21071e3bc737&page=1',
  'headers': {
    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicmFqIiwiaWF0IjoxNjgwNDE1NzU2LCJleHAiOjE2ODA0ODAwMDB9.5Imz1Uyvcq7kkQpB4Yh2UcE2jUPZydJ3YphWuvUueEk',
    'Content-Type': 'application/json'
  },
}

response:-  {
    "content": [
        {
            "_id": "6427de30173f3509bbc0dde4",
            "id": "6427de30173f3509bbc0dde4",
            "title": "first to do",
            "completed": true,
            "createdBy": "raj",
            "editable": true,
            "lastUpdate": "2023-04-01T07:33:04.683Z"
        }
    ]
}        

3. Update ToDo List
request:- {
  'method': 'PATCH',
  'url': 'http://localhost:3002/api/todo/${id}',
  'headers': {
    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicmFqIiwiaWF0IjoxNjgwNDE1NzU2LCJleHAiOjE2ODA0ODAwMDB9.5Imz1Uyvcq7kkQpB4Yh2UcE2jUPZydJ3YphWuvUueEk',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "title": "danish 1nd to do"
  })
} 

4. Delete ToDo List
request:- {
  'method': 'DELETE',
  'url': 'http://localhost:3002/api/todo/${id}',
  'headers': {
    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicmFqIiwiaWF0IjoxNjgwNDE1NzU2LCJleHAiOjE2ODA0ODAwMDB9.5Imz1Uyvcq7kkQpB4Yh2UcE2jUPZydJ3YphWuvUueEk',
    'Content-Type': 'application/json'
  }
} 

// post and comment api's

1. Create Post
request:- {
  'method': 'POST',
  'url': 'http://localhost:3002/api/post',
  'headers': {
    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicmFqIiwiaWF0IjoxNjgwNDE1NzU2LCJleHAiOjE2ODA0ODAwMDB9.5Imz1Uyvcq7kkQpB4Yh2UcE2jUPZydJ3YphWuvUueEk',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "title": "danish 1nd to do",
    "body": "hdkad"
  })
} 

2. Fetch Posts
request:- {
  'method': 'GET',
  'url': 'http://localhost:3002/api/post?page=1',
  'headers': {
    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicmFqIiwiaWF0IjoxNjgwNDE1NzU2LCJleHAiOjE2ODA0ODAwMDB9.5Imz1Uyvcq7kkQpB4Yh2UcE2jUPZydJ3YphWuvUueEk',
    'Content-Type': 'application/json'
  }
}
 
3. Update posts
request:- {
  'method': 'PATCH',
  'url': 'http://localhost:3002/api/post/${id}',
  'headers': {
    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicmFqIiwiaWF0IjoxNjgwNDE1NzU2LCJleHAiOjE2ODA0ODAwMDB9.5Imz1Uyvcq7kkQpB4Yh2UcE2jUPZydJ3YphWuvUueEk',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "title": "danish 1nd to do",
    "body": "hdkad"
  })
} 

4. Add Comment on post
request:- {
  'method': 'POST',
  'url': 'http://localhost:3002/api/post/comment?id=64291f39a24710b51107c6f6',
  'headers': {
    'auth-token': 'ksadlsaldsmsdsm',
    'Content-Type': 'application/json'
  },    
  body: JSON.stringify({
    "body": "5th comment from raj"
  })
}

5. Fetch comments of a post
request:- {
  'method': 'GET',
  'url': 'http://localhost:3002/api/post/comment?id=64291f39a24710b51107c6f6&page=1',
  'headers': {
    'auth-token': 'sdsadsad',
    'Content-Type': 'application/json'
  }
}

