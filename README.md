# learn-nodejs

Project structure

```
project
├── server.ts
├── config
│   ├── db.ts
│   ├── env.ts
│   └── express.ts
├── modules
│   └──[module_name]
│       ├── [module_name].types.ts
│       ├── [module_name].constants.ts
│       ├── [module_name].controller.ts
│       ├── [module_name].model.ts
│       └── [module_name].route.ts
├── public
│   ├── css
│   │   └── style.css
│   └── js
├── views
│   └── [view_name].ejs
├── package.json
├── package-lock.json
└──README.md
```