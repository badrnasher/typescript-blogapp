import { Request, Response } from 'express';
import { Connect,Query } from '../config/db';
import logging from '../config/logging';

const NAMESPACE = 'Article';

export const listArticles = async (req: Request, res: Response) => {

  let query = 'SELECT * FROM articles';

  Connect()
      .then((connection) => {
          Query(connection, query)
              .then((results) => {
                  logging.info(NAMESPACE, 'Retrieved articles: ', results);

                  return res.status(200).json({
                      results
                  });
              })
              .catch((error) => {
                  logging.error(NAMESPACE, error.message, error);

                  return res.status(500).json({
                      message: error.message,
                      error
                  });
              })
              .finally(() => {
                  logging.info(NAMESPACE, 'Closing connection.');
                  connection.end();
              });
      })
      .catch((error) => {
          logging.error(NAMESPACE, error.message, error);

          return res.status(500).json({
              message: error.message,
              error
          });
      });

};

export const getArticle = async (req: Request, res: Response) => {
    try {
        logging.info(NAMESPACE, 'Getting article by ID');

        const articleId = req.params.id; // Assuming the article ID is passed as a route parameter

        // Create the query to get the article by ID
        const query = `SELECT * FROM articles WHERE id = ${articleId}`;
        const values = [articleId];

        // Connect to the database
        Connect()
            .then((connection) => {
                // Execute the query
                connection.query(query, values, (error, results) => {
                    connection.end(); // Close the connection

                    if (error) {
                        logging.error(NAMESPACE, 'Error getting article by ID:', error);
                        return res.status(500).json({ message: 'Error getting article by ID', error });
                    }

                    // Check if an article with the given ID exists
                    if (results.length === 0) {
                        return res.status(404).json({ message: 'Article not found' });
                    }

                    logging.info(NAMESPACE, 'Retrieved article by ID:', results[0]);
                    return res.status(200).json({ article: results[0] });
                });
            })
            .catch((error) => {
                logging.error(NAMESPACE, 'Error connecting to database:', error);
                return res.status(500).json({ message: 'Error connecting to database', error });
            });
    } catch (error) {
        logging.error(NAMESPACE, 'Error getting article by ID:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

export const createArticle = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, 'Inserting article.');

  let { nickname, title, content } = req.body;

  let query = `INSERT INTO articles (nickname, title, content, creationDate) VALUES ("${nickname}","${title}", "${content}", "${new Date().toISOString().slice(0, 19).replace('T', ' ')}")`;

  Connect()
      .then((connection) => {
          Query(connection, query)
              .then((result) => {
                  logging.info(NAMESPACE, 'Article created: ', result);

                  return res.status(201).json({
                      result
                  });
              })
              .catch((error) => {
                  logging.error(NAMESPACE, error.message, error);

                  return res.status(500).json({
                      message: error.message,
                      error
                  });
              })
              .finally(() => {
                  logging.info(NAMESPACE, 'Closing connection.');
                  connection.end();
              });
      })
      .catch((error) => {
          logging.error(NAMESPACE, error.message, error);

          return res.status(500).json({
              message: error.message,
              error
          });
      });
};

export const listComments = async (req: Request, res: Response) => {
    const NAMESPACE = 'Comment Controller';

    try {
        logging.info(NAMESPACE, 'Listing comments on an article');

        const articleId = req.params.id; 

        // Create the query to list comments on the article
        const query = `SELECT * FROM comments WHERE articleId = ${articleId}`;
        const values = [articleId];

        // Connect to the database
        Connect()
            .then((connection) => {
                // Execute the query
                connection.query(query, values, (error, results) => {
                    connection.end(); 

                    if (error) {
                        logging.error(NAMESPACE, 'Error listing comments:', error);
                        return res.status(500).json({ message: 'Error listing comments', error });
                    }

                    logging.info(NAMESPACE, 'Listed comments:', results);
                    return res.status(200).json({ comments: results });
                });
            })
            .catch((error) => {
                logging.error(NAMESPACE, 'Error connecting to database:', error);
                return res.status(500).json({ message: 'Error connecting to database', error });
            });
    } catch (error) {
        logging.error(NAMESPACE, 'Error listing comments:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

export const createComment = async (req: Request, res: Response) => {
    const NAMESPACE = 'Comment Controller';

    try {
        logging.info(NAMESPACE, 'Creating a comment.');

        const { articleId, content } = req.body;

        // Check if required fields are present
        if (!articleId || !content) {
            return res.status(400).json({ message: 'Article ID, and content are required' });
        }

        // Create the query to insert the comment
        const query = `INSERT INTO comments (articleId, content, creationDate) VALUES ("${articleId}", "${content}", "${new Date().toISOString().slice(0, 19).replace('T', ' ')}")`;

        // Connect to the database
        Connect()
            .then((connection) => {
                // Execute the query
                connection.query(query, (error, result) => {
                    connection.end(); // Close the connection

                    if (error) {
                        logging.error(NAMESPACE, 'Error creating comment:', error);
                        return res.status(500).json({ message: 'Error creating comment', error });
                    }

                    logging.info(NAMESPACE, 'Comment created:', result);
                    return res.status(201).json({ message: 'Comment created successfully', result });
                });
            })
            .catch((error) => {
                logging.error(NAMESPACE, 'Error connecting to database:', error);
                return res.status(500).json({ message: 'Error connecting to database', error });
            });
    } catch (error) {
        logging.error(NAMESPACE, 'Error creating comment:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};


export const createCommentOnComment = async (req: Request, res: Response) => {
    const NAMESPACE = 'Comment Controller';

    try {
        logging.info(NAMESPACE, 'Creating a comment on a comment.');

        const { commentId, content } = req.body;

        // Check if required fields are present
        if (!commentId || !content) {
            return res.status(400).json({ message: 'Comment ID and content are required' });
        }

        // Create the query to insert the comment on a comment
        const query = `INSERT INTO comments (parentCommentId, content, creationDate) VALUES ("${commentId}", "${content}", "${new Date().toISOString().slice(0, 19).replace('T', ' ')}")`;

        // Connect to the database
        Connect()
            .then((connection) => {
                // Execute the query
                connection.query(query, (error, result) => {
                    connection.end(); // Close the connection

                    if (error) {
                        logging.error(NAMESPACE, 'Error creating comment on comment:', error);
                        return res.status(500).json({ message: 'Error creating comment on comment', error });
                    }

                    logging.info(NAMESPACE, 'Comment on comment created:', result);
                    return res.status(201).json({ message: 'Comment on comment created successfully', result });
                });
            })
            .catch((error) => {
                logging.error(NAMESPACE, 'Error connecting to database:', error);
                return res.status(500).json({ message: 'Error connecting to database', error });
            });
    } catch (error) {
        logging.error(NAMESPACE, 'Error creating comment on comment:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};
