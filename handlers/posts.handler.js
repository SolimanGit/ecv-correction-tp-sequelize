const { Post, Comment } = require('../models');
const createError = require('http-errors')

const createPost = async (req, res) => {
  const { title, content, date, author_id } = req.body;
  const post = await Post.create({
    title,
    content,
    date,
    authorId: author_id,
  });
  return post ? res.json(post) : next(createError(500))
  // return res.json(post);
}

const updatePost = async (req, res) => {

  const updateSuccess = await Post.update({
    ...req.body
  }, {
    where: {
      id: req.params.id
    }
  });

  if(updateSuccess) {

    const post = await Post.findByPk(req.params.id);
    return res.json(post);

  } else {
    return next(createError(500))
    // res
    // .status(500)
    // .json({
    //   status: 500,
    //   message: 'Server error',
    // });
  }

}

const deletePost = async (req, res) => {

  const deleteSuccess = await Post.destroy({
    where: {
      id: req.params.id
    }
  });

  if(deleteSuccess) {

    return res.status(204).json();

  } else {
    return next(createError(500))
    // res
    // .status(500)
    // .json({
    //   status: 500,
    //   message: 'Server error',
    // });
  }

}

const getOnePost = async (req, res) => {

  let post = null;

  if(req.query.displayComments) {
    post = await Post.findByPk(req.params.id, {
      include: {
        model: Comment
      }
    });
  } else {
    post = await Post.findByPk(req.params.id);
  }


  if(!post) {
    return next(createError(404))
    // return res.status(404).json({
    //   status: 404,
    //   message: 'Resource not found',
    // })
  }

  return res.json(post);
}

const getManyPosts = async (req, res) => {
  const posts = await Post.findAll();
  return posts ? res.json(posts) : next(createError(500))
  // return res.json(posts);
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getOnePost,
  getManyPosts,
}
