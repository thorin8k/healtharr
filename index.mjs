import { config } from "dotenv-defaults";
import { App, KnexConnector } from "@landra_sistemas/lisco"
import HomeController from "./controllers/HomeController.mjs";

import knexfile from "./knexfile.js";
import LibraryController from "./controllers/LibraryController.mjs";

import { create } from "express-handlebars";

//Configure dotenv
config();

const main = async () => {
    App.runtime();

    App.statics = {
        "/temp": "/temp",
    };
    App.routes = [new HomeController(), new LibraryController()];
    App.customizeExpress = (app) => {
        const hbs = create({
            // Estos helpers pueden ser funciones que se llamen posteriormente desde nuestras vistas para renderizar contenido.
            helpers: {
                foo() {
                    return "FOO!";
                },
                bar() {
                    return "BAR!";
                },
            },
        });
        app.engine("handlebars", hbs.engine);
        app.set("view engine", "handlebars");
        app.set("views", "./views");
    };
    
    KnexConnector.init(knexfile[process.env.NODE_ENV]);
    await KnexConnector.test();

    await App.init({
        helmet: {
            frameguard: {
                action: "sameorigin",
            },
        },
        socketio: false,
        disableI18nWatcher: true
    });

    await App.start();
    App.server.on("listening", () => {
        console.log("listening");
    });
};

//Launch!
main();

//Capturar errores perdidos
process.on("uncaughtException", (err) => {
    // handle the error safely
    console.error(`Error: ${err || err.stack || err.message}`);
});
//Capturar promises perdidos
process.on("unhandledPromiseException", (err) => {
    // handle the error safely
    console.error(`Error: ${err || err.stack || err.message}`);
});