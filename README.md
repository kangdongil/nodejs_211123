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
    - install & configure Babel
	  - `npm i --save-dev @babel/core @babel/preset-env`
	  - babel.config.json `{"preset": ["@babel/preset-env"]}`
	- install Nodemon & modify `dev` script
	  - `npm i --save-dev @babel/node nodemon`
	  - `"dev": "nodemon --exec babel-node src/init.js`
  - Install Express & configure inline server
    - touch `src/server.js`
    - install express
	  - `npm i express`
	- create express application
	  - `import express from "express";`
	  - `const app = express();`
	- connect `server.js` to `init.js`
	  - `export default app;`(server.js)
	  - `import app from "./server";`(init.js)
	- init.js: listen to PORT and handle callback on `app`
	  - `app.listen(PORT, [CALLBACK]);`
	  - `const PORT = 4000;`
	  - [CALLBACK]: `() => {console.log(`[LOCALHOST_URL]`)}`
	- server.js: GET request and response "/" URL
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
 
# 5.0-5.10 Template using Basic Pug
  - install & configure pug
    - `npm i pug`
	- mkdir `/src/views`
	- `app.set("view engine", "pug");`
	- `app.set("views", process.cwd() + "/src/views");`
	- `app.disable("x-powered-by");`
  - render "home.pug"
    - create `home.pug` in views folder
	  - touch `/src/views/home.pug`
    - render pug from controller
	  - `res.render("[PUG_FILE]");`
	- write pug file(make sure indent)
	  - ```
	  	doctype html
	  	html
	  	head
	  	title [PAGE_NAME] | [PROJECT]
		link(rel="stylesheet" href="https://unpkg.com/mvp.css")
	  	body
	  	header
		h1 [PAGE_NAME]
		main
		footer &copy; [YEAR] [PROJECT]
  - create footer/nav partial
    - mkdir `/src/views/partials`
    - touch `footer.pug`
    - include partial
	  - include partials/[FOOTER]
	- show year with javascript
	  - `#{new Date().getFullYear()}`
  - create base
    - rename `home` to `base`
	- use variable `pageTitle` in `<title>`
	  - #{pageTitle}
	- add variables in controller
	  - `res.render("[VIEW]", {[VAR]: [VALUE]});`
	- add `block [NAME]`
	  - `block content`
	- create home.pug again
	- extends base and fill block
	  - `extends base`
	  - indent from `block content`
	- create pug file for every controller
  - create mixins for video list
    - create makeshift videos array(video as object)
	- render videos array as variable
    - mkdir `/src/views/mixins`
	- touch `[MIXIN].pug`
	  - `video.pug`
	- write mixin
	  - ```
	  	mixin [NAME]([OBJ])
	  	div
		h4=[OBJ].title
		ul
		li #{[OBJ.~]}
		li #{[OBJ.~]}
		li #{[OBJ.~]}
		...
     - include mixin and use it
	   - `include mixins/[MIXIN]`
	   - `+[MIXIN]([OBJ])`
	 - `each` statement to list video
	   - ```
		each [ITEM] in [ARRAY]
		[MIXIN]
		else
		li [EMPTY_MSG]
		
# 6.0-6.6 configuring makeshift CRUD using Array DB
  - watch [R]
	- watch:controller
	  - get id value from parameters
	  - get video from videos using id
	  - pageTitle as `video.title`
	  - send video as variable
	- watch:template
	  - show video detail
	  - "Edit Video" button
  - edit [U]
    - getEdit:controller
	  - get id value from parameters
	  - get video from videos using id
	  - pageTitle as `video.title`
	  - send video as variable
	- getEdit:template
	  - create `<form>`, textbox, submit btn(required)
	  - textbox should have default value
	- edit:router
	  - `app.route("[ROUTE]").get([CONT]).post([CONT])`
	- postEdit:template
	  - add `name` attribute to textbox
	  - enable import form data to `req.body`(in front of Routers)
	  : `app.use(express.urlencoded({ extended: true }));`
	- postEdit:controller
	  - redirect to watch page
	  - replace data to new one
	  : `const { [DATA] } = req.body;`
	  : `[OBJ].[DATA] = [NEW_DATA];`
  - upload [C]
    - upload:router
	  - `app.route("[ROUTE]").get([CONT]).post([CONT])`
	- getUpload:controller
	  - res.render "upload" pug file
	- getUpload:template
	  - create `<form>`, textbox, submit btn
	- postUpload:template
	  - add `name` attribute to textbox
	- postUpload:controller
	  - load form value
	  - create new object
	  - push object into array
	  - res.redirect to `/`

# 6.0-6.7 Start MongoDB
  - how to run MongoDB in IDE
    - open new terminals(`[Alt]+[Shift]+T`)
	- type each as `mongod`(connect DB) and `mongo(shell)`
  - touch `src/db.js` and import in `init.js`
  - install and configure mongoose
    - `npm i mongoose`
	- db.js
	  - `import mongoose from "mongoose";`
	  - `mongoose.connect("mongodb://[SERVER]/[PROJECT_NAME]")`
  - add Mongoose event handlers
    - DB Connection
	  - `mongoose.connection.once("open", [CALLBACK])`
	- DB Error
	  - `mongoose.connection.on("error", [CALLBACK](error))`

# 6.0-6.7 Mongoose Setup
  - change router's parameter regExp
    - `\\d+` >> `[0-9a-f]{24}`
  - touch `404.pug`
  - create schema and model
    - mkdir `src/models`
    - touch `[Model].js`
	- import mongoose
    - schema
	  - const name as `[data_name]Schema`
	  - `new mongoose.Schema({~});`
	  - `{~}`: `[ENTRY]: { type: [Type], [PROP], ...};`
	- schema type
	  - String / Number / Boolean / Date
	- schema options
	  - input by user
	  : trim / required / unique / 
	  maxlength / minlength / uppercase / lowercase
	  - default
	- model
	  - const name as `[Model]`
	  - `mongoose.model("[Name]", [SCHEMA]);`
	- export default `[Model]`
	- import model in `init.js` after `db`
  - Example: Video Model
    - String: title / description / createdAt / hashtags / views(meta) / rating(meta)
  - Example: User Model
    - email / username / password / noPasswordAccount(Boolean) / avatarUrl / name / location

# 6.8 Mongoose CRUD
  - 
    - import model, when controller use it
  - Create(C) Document
    - View
	  - create inputs and add `name` attribute()
	  - add more attribute according to schema options
	  : (required / maxlength / minlength)
	- Router
	- Controller(POST):
  	  - get form data from `req.body`
	  - create `Instance`(async / await)
	  - redirect
	- Method 1: new [Model] / [Document].save()
	  - const as `new [Model]({~});`(async / await)
	  - [Document].save()
	- Method 2: [Model].create
	  - const as `[Model].create({~})`(async / await)
	  - `try / catch(err)`
	  - send errMsg `err._message`
	  - if errMsg, show errMsg
  - Read(R) Document
  
  - Update(U) Document
  - Search Document
  - Delete(D) Document