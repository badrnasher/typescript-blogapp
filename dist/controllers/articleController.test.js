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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app")); // Assuming your Express app is exported from app.ts
describe('Article Controller', () => {
    it('should return list of articles', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/articles');
        expect(response.status).toBe(200);
        // Add more assertions based on your expected response
    }));
    it('should return a specific article', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/articles/1');
        expect(response.status).toBe(200);
        // Add more assertions based on your expected response
    }));
    it('should create a new article', () => __awaiter(void 0, void 0, void 0, function* () {
        const newArticle = {
            nickname: 'JohnDoe',
            title: 'New Article',
            content: 'This is the content of the new article'
        };
        const response = yield (0, supertest_1.default)(app_1.default).post('/articles').send(newArticle);
        expect(response.status).toBe(201);
        // Add more assertions based on your expected response
    }));
});
describe('Comment Controller', () => {
    it('should return list of comments for an article', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/comments/1');
        expect(response.status).toBe(200);
        // Add more assertions based on your expected response
    }));
    it('should create a new comment for an article', () => __awaiter(void 0, void 0, void 0, function* () {
        const newComment = {
            articleId: 1,
            content: 'This is a new comment'
        };
        const response = yield (0, supertest_1.default)(app_1.default).post('/comments').send(newComment);
        expect(response.status).toBe(201);
        // Add more assertions based on your expected response
    }));
    it('should create a new comment on a comment', () => __awaiter(void 0, void 0, void 0, function* () {
        const newCommentOnComment = {
            commentId: 1,
            content: 'This is a new comment on a comment'
        };
        const response = yield (0, supertest_1.default)(app_1.default).post('/comments/comment').send(newCommentOnComment);
        expect(response.status).toBe(201);
        // Add more assertions based on your expected response
    }));
});
