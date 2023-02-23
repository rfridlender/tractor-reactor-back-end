const { Post, Profile } = require('../models')
const cloudinary = require('cloudinary').v2

async function index(req, res) {
  try {
    const posts = await Post.findAll({ include: { model: Profile, as: 'author' } })
    res.status(200).json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

async function create(req, res) {
  try {
    req.body.authorId = req.user.profile.id
    const post = await Post.create(req.body)
    res.status(200).json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

async function update(req, res) {
  try {
    const post = await Post.update(req.body, { where: { id: req.params.id }, returning: true })
    res.status(200).json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

async function deletePost(req, res) {
  try {
    const numberOfRowsRemoved = await Post.destroy({ where: { id: req.params.id } })
    res.status(200).json(numberOfRowsRemoved)
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const post = await Post.findByPk(req.params.id)
    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    post.photo = image.url
    await post.save()
    res.status(201).json(post.photo)
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

module.exports = { index, create, update, delete: deletePost, addPhoto }
