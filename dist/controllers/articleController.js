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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentOnComment = exports.createComment = exports.listComments = exports.createArticle = exports.getArticle = exports.listArticles = void 0;
const listArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement logic to list articles
    const articles = [
        {
            id: 1,
            nickname: 'John Doe',
            title: 'My first article',
            content: 'This is my first article',
            creationDate: new Date(),
        },
        {
            id: 2,
            nickname: 'Jane Doe',
            title: 'My second article',
            content: 'This is my second article',
            creationDate: new Date(),
        }
    ];
    res.json(articles);
});
exports.listArticles = listArticles;
const getArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement logic to get an article
});
exports.getArticle = getArticle;
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement logic to create an article
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
