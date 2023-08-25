import { BaseController, Utils } from "@landra_sistemas/lisco"


export default class HomeController extends BaseController {
    routes = {
        "/": {
            get: this.home.bind(this),
        },
    };
    
    home(req, res) {

        //Check this: https://github.com/preactjs/preact-render-to-string/

        //We can use preact in serverside rendering without packing or anything
        res.render("home", {
            showTitle: true,

            // También se pueden especificar y sobreescribir helpers directamente en el render de cada vista.
            helpers: {
                foo() {
                    return "foo.";
                },
            },
        });
    }
}
