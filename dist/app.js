"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const articleRoutes_1 = __importDefault(require("./routes/articleRoutes"));
// import logging from './config/logging';
const config_1 = __importDefault(require("./config/config"));
const app = (0, express_1.default)();
const NAMESPACE = 'Server';
const port = 3000;
app.use(express_1.default.json());
// Routes
app.use('/articles', articleRoutes_1.default);
/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});
app.listen(config_1.default.server.port, () => console.log(`Server is running ${config_1.default.server.hostname}:${config_1.default.server.port}`));
exports.default = app;
