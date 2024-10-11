"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const search_1 = __importDefault(require("./src/routes/search"));
const tables_1 = require("./src/routes/tables");
const auth_1 = __importDefault(require("./src/routes/auth"));
const insider_1 = __importDefault(require("./src/routes/insider"));
const cors_1 = __importDefault(require("cors"));
const stockdetail_1 = __importDefault(require("./src/routes/stockdetail"));
const body_parser_1 = __importDefault(require("body-parser"));
// configures dotenv to work in your application
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST'],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.get("/", (request, response) => {
    response.status(200).send("Hello World");
});
app.use(stockdetail_1.default);
app.use("/tables", tables_1.router);
app.use(auth_1.default);
app.use(search_1.default);
app.use('/insider', insider_1.default);
app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
});
//# sourceMappingURL=index.js.map