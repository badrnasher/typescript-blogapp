import { Request, Response } from 'express';
import { Article } from '../models/article';
import { Comment } from '../models/comment';

export const listArticles = async (req: Request, res: Response) => {
    // Implement logic to list articles
    const articles: Article[] = [
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
          creationDate: new Date(),}]

    res.json(articles);
};

export const getArticle = async (req: Request, res: Response) => {
  // Implement logic to get an article
};

export const createArticle = async (req: Request, res: Response) => {
  // Implement logic to create an article
};

export const listComments = async (req: Request, res: Response) => {
  // Implement logic to list comments on an article
};

export const createComment = async (req: Request, res: Response) => {
  // Implement logic to create a comment on an article
};

export const createCommentOnComment = async (req: Request, res: Response) => {
  // Implement logic to create a comment on a comment
};
