import express from 'express';
import * as articleController from '../controllers/articleController';

const router = express.Router();

router.get('/', articleController.listArticles);
router.get('/:id', articleController.getArticle);
router.post('/', articleController.createArticle);
router.get('/:id/comments', articleController.listComments);
router.post('/:id/comments', articleController.createComment);
router.post('/:id/comments/:commentId', articleController.createCommentOnComment);

export default router;
