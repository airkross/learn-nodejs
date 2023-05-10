# learn-nodejs

Project structure

```
project
├── config
│   ├── database
│   │   ├── database-wrapper.ts
│   │   └── [database_name]-database.ts
│   ├── env.ts
│   └── express
│       └── express-wrapper.ts
├── containers
│   └── [container-name]
├── modules
│   └──[module_name]
│       ├── index.ts
│       ├── [module_name].types.ts
│       ├── [module_name].constants.ts
│       ├── [module_name].controller.ts
│       ├── [module_name].model.ts
│       └── [module_name].router.ts
├── public
│   ├── css
│   │   └── style.css
│   └── js
├── views
│   └── [view_name].ejs
└──app.ts
```