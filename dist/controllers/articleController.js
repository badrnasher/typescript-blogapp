"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentOnComment = exports.createComment = exports.listComments = exports.createArticle = exports.getArticle = exports.listArticles = void 0;
const db_1 = require("../config/db");
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = 'Article';
const listArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let query = 'SELECT * FROM articles';
    (0, db_1.Connect)()
        .then((connection) => {
        (0, db_1.Query)(connection, query)
            .then((results) => {
            logging_1.default.info(NAMESPACE, 'Retrieved articles: ', results);
            return res.status(200).json({
                results
            });
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, error.message, error);
            return res.status(200).json({
                message: error.message,
                error
            });
        })
            .finally(() => {
            logging_1.default.info(NAMESPACE, 'Closing connection.');
            connection.end();
        });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, error.message, error);
        return res.status(200).json({
            message: error.message,
            error
        });
    });
});
exports.listArticles = listArticles;
const getArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logging_1.default.info(NAMESPACE, 'Getting article by ID');
        const articleId = req.params.id; // Assuming the article ID is passed as a route parameter
        // Create the query to get the article by ID
        const query = `SELECT * FROM articles WHERE id = ${articleId}`;
        const values = [articleId];
        // Connect to the database
        (0, db_1.Connect)()
            .then((connection) => {
            // Execute the query
            connection.query(query, values, (error, results) => {
                connection.end(); // Close the connection
                if (error) {
                    logging_1.default.error(NAMESPACE, 'Error getting article by ID:', error);
                    return res.status(500).json({ message: 'Error getting article by ID', error });
                }
                // Check if an article with the given ID exists
                if (results.length === 0) {
                    return res.status(404).json({ message: 'Article not found' });
                }
                logging_1.default.info(NAMESPACE, 'Retrieved article by ID:', results[0]);
                return res.status(200).json({ article: results[0] });
            });
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, 'Error connecting to database:', error);
            return res.status(500).json({ message: 'Error connecting to database', error });
        });
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, 'Error getting article by ID:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
});
exports.getArticle = getArticle;
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Inserting article.');
    let { nickname, title, content } = req.body;
    let query = `INSERT INTO articles (nickname, title, content, creationDate) VALUES ("${nickname}","${title}", "${content}", "${new Date().toISOString().slice(0, 19).replace('T', ' ')}"`;
    (0, db_1.Connect)()
        .then((connection) => {
        (0, db_1.Query)(connection, query)
            .then((result) => {
            logging_1.default.info(NAMESPACE, 'Article created: ', result);
            return res.status(200).json({
                result
            });
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, error.message, error);
            return res.status(200).json({
                message: error.message,
                error
            });
        })
            .finally(() => {
            logging_1.default.info(NAMESPACE, 'Closing connection.');
            connection.end();
        });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, error.message, error);
        return res.status(200).json({
            message: error.message,
            error
        });
    });
});
exports.createArticle = createArticle;
const listComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement logic to list comments on an article
});
exports.listComments = listComments;
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement logic to create a comment on an article
});
exports.createComment = createComment;
const createCommentOnComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement logic to create a comment on a comment
});
exports.createCommentOnComment = createCommentOnComment;
