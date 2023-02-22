const { Post } = require('../models')
const cloudinary = require('cloudinary').v2

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

module.exports = { create, addPhoto }
