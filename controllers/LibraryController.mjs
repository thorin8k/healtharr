import { BaseController, Utils } from "@landra_sistemas/lisco"
import LibraryService from "../services/LibraryService.mjs";


export default class LibraryController extends BaseController {
    entity = "library";
    service = LibraryService;
    table = "library";
    
    
}
