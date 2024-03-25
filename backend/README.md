This folder shoudl contain the backend code with Express.
It should have it's own package.json and node_modules folder.

This is example BE project, you can follow the lab 5 to set this up
https://github.com/vsb-js/template-lab-05-2023w/tree/main

You can run `npm run dev` to start the server in "DEV" mode where you don't have to restart it to make changes.

If you find this error:

```
SyntaxError: Cannot use import statement outside a module
```

Check that you have in package.json

```
  "type": "module",
```

Notice that we are starting our server on port 3001
`dev.db` is file which you want to commit too! It's your DB so you can seed it with some data.

Notice the instalation of "cors" package. 
https://expressjs.com/en/resources/middleware/cors.html