# 1.0-3.11 Express
  - git initial setup
    - `git init`
	- `.gitignore`
	  - /node_modules
  - nodejs initial setup
    - `npm init`
	- `package.json`
	  - script; "dev": "node index.js"
	  - `npm run dev`
	- mkdir `/src` & touch `src/init.js`
  - configure Babel & Nodemon
    - Install & Configure Babel
	  - `npm i --save-dev @babel/core @babel/preset-env`
	  - babel.config.json `{"preset": ["@babel/preset-env"]}`
	- Install Nodemon & modify `dev` script
	  - `npm i --save-dev @babel/node nodemon`
	  - `"dev": "nodemon --exec babel-node src/init.js`
  - Install Express & configure inline server
    - install express
	  - `npm i express`
	- touch `src/server.js` and create express application
	  - `import express from "express";`
	  - `const app = express();`
	- connect `server.js` to `init.js`
	- listen to PORT and handle callback on `app`
	  - `app.listen(PORT, [CALLBACK]);`
	  - `const PORT = 4000;`
	  - [CALLBACK]: `() => {console.log(`[LOCALHOST_URL]`)}`
	- GET request and response "/" URL
	  - ROUTE: `app.get("/", [CONT])`
	  - CONTROLLER:
	    ```
		const [CONT] = (req, res) => {
		  return res.send("~");
		}
		```
	- install and use morgan as middleware
	  - `npm i morgan`
	  - `import morgan from "morgan";`
	  - `const logger = morgan("dev");`
	  - `app.use(logger);`

# 4.0-4.8 Router & Controller
  - `server.js`
    - import routers
	  - `import [ROUTER_FILE] from "./router/[ROUTER_FILE]";`
	- set router to URL
	  - `app.use("[PATH]", [ROUTER]);`
  - `/router/~Router.js`
    - import express
	- import controllers
	  - `import {[CONST]s} from "../controllers/[CONT_FILE]";`
	- declare router
	  - `const [ROUTER] = express.Router();`
	- set route to URL in detail
	  - `[ROUTER].get("[URL]", [CONT])`
	- export default router
	  - `export default [ROUTER];`
  - `/controller/~Controller.js`
    - export controller
	  - `export const [CONT] = (req, res) => res.send("~");`
	- (optional) read value of params and send it
	  - `res.send(`${req.params.[NAME]}`)`

## Plan Router & Controller
  - what kind of domain do you need for the project?
    - video
	- user
  - what functionality do you need for each domain?
    - user
	  - join(C)
	  - login / logout
	  - view(R) / edit(U) / delete(D)
	- video
	  - upload(C)
	  - watch(R) / edit(U) / delete(D)
  - which route would need `:id` and does it restricted?
    - user
	  - view(\\d+)
	- video
	  - watch(\\d+) / edit(\\d+) / delete(\\d+)
