# learn-nodejs

Project structure

```
project
├── app.ts
├── docker-compose.yaml
├── config
│   ├── database
│   │   ├── database-wrapper.ts
│   │   └── [database_name]-database.ts
│   ├── env.ts
│   └── express
        └── express-wrapper.ts
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