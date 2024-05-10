import request from 'supertest';
import app from '../app'; 

describe('Article Controller', () => {
  it('should return list of articles', async () => {
    const response = await request(app).get('/articles');
    expect(response.status).toBe(200);
  });

  it('should return a specific article', async () => {
    const response = await request(app).get('/articles/1');
    expect(response.status).toBe(200);
  });

  it('should create a new article', async () => {
    const newArticle = {
      nickname: 'JohnDoe',
      title: 'New Article',
      content: 'This is the content of the new article'
    };
    const response = await request(app).post('/articles').send(newArticle);
    expect(response.status).toBe(201);
  });
});

describe('Comment Controller', () => {
  it('should return list of comments for an article', async () => {
    const response = await request(app).get('/articles/3/comments');
    expect(response.status).toBe(200);
  });

  it('should create a new comment for an article', async () => {
    const newComment = {
      articleId: 1,
      content: 'This is a new comment'
    };
    const response = await request(app).post('/articles/3/comments').send(newComment);
    expect(response.status).toBe(201);
    
  });

  it('should create a new comment on a comment', async () => {
    const newCommentOnComment = {
      commentId: 1,
      content: 'This is a new comment on a comment'
    };
    const response = await request(app).post('/articles/3/comments/2').send(newCommentOnComment);
    expect(response.status).toBe(201);

  });
});
