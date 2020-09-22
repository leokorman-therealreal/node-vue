require = require ("esm")(module, { 
    cjs: true, 
    mode: 'auto' });

const express = require ('express');
const bodyParser = require ('body-parser');
const fs = require ('fs');
const path = require ('path');
const config = require ('../vue.config');
const Handlebars = require ('handlebars');
const propertiesReader = require ('properties-reader');

const { loadUsers } = require ('./api/users');
const { loadRoles } = require ('./api/roles');
const vueConfig = require ('../vue.config');

const moduleAlias = require ('module-alias');
moduleAlias.addAlias('Global', path.resolve(__dirname, '../global'));

const properties = propertiesReader(path.resolve(__dirname, './ini/services.ini'));

const app = express();
app.use (express.json());
app.set('view engine', 'ejs');

app.use (`${config.publicPath}public`, express.static (path.resolve(path.join(__dirname, './../dist'))));
app.use (`${config.publicPath}css`, express.static (path.resolve(path.join(__dirname, './../dist/css'))));
app.use (`${config.publicPath}img`, express.static (path.resolve(path.join(__dirname, './../dist/img'))));
app.use (`${config.publicPath}js`, express.static (path.resolve(path.join(__dirname, './../dist/js'))));

app.use (function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Cache-Control', 'no-cache');
    next();
});

/* 
* API routes
*/
const apiRouter = express.Router();
apiRouter.use (bodyParser.json());

apiRouter.get ('/loadUsers', async (req, res, next) => {
    try{
        const ret = await loadUsers (req.query.page, req.query.size);
        res.json(ret.data);
    }catch(err) {
        next(err);
    }     
});

apiRouter.get ('/loadRoles', async (req, res, next) => {
    try{
        const ret = await loadRoles();
        res.json(ret.data);
    }catch(err) {
        next(err);
    }     
});
app.use (`${config.publicPath}api`, apiRouter);

/*
* Pre-fetch routes
*/
const prefetchRouter = express.Router();
prefetchRouter.use (bodyParser.json());

prefetchRouter.get ('/users', async function (req, res, next) {
    console.log ('About to pre-fetch user roles.')
    try{
        const ret = await loadRoles();
        res.locals.roles = ret.data;
    }catch(err) {
        next(err);
    } 
    next();    
});
app.use (config.publicPath, prefetchRouter);

/*
*   Public template route
*/
Handlebars.registerHelper ('json', 
    (obj) => new Handlebars.SafeString (JSON.stringify(obj)));

app.get(`${config.publicPath}*`, (req, res) => {
    const templatePath = path.resolve (path.join (__dirname, './../dist/index.html'));
    const template = fs.readFileSync (templatePath); 
    const jsonInsert = {
        BASE_URL: `${config.publicPath}public/`,
        CONTEXT: {
            roles: res.locals.roles,
            store: properties.get('server.store')
        }
    };
    const templateHydrated = Handlebars.compile (template.toString())(jsonInsert);
    fs.writeFileSync (templatePath, templateHydrated);
    res.sendFile (templatePath);
});

app.get ('*', function (req, res) {
    res.statusCode = 404;
    res.end('<html><body>Not found</body></html>');
})

app.listen(3030, () => {
    console.log('Server is started on 3030');
  }
);
