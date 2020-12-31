import Forum from "../models/forum.js";

const createForum = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a forum",
    });
  }

  const forum = new Forum(body);

  if (!forum) {
    return res.status(400).json({ success: false, error: err });
  }

  forum
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: forum._id,
        forum: "forum created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        forum: "forum not created!",
      });
    });
};

const updateForum = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Forum.findOne({ _id: req.params.id }, (err, forum) => {
    if (err) {
      return res.status(404).json({
        err,
        forum: "forum not found!",
      });
    }
    forum.title = body.title;
    forum.user_id = body.user_id;
    forum.content = body.content;
    forum.comment = body.comment;
    // forum.comment.user_id = body.comment.user_id;
    forum
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: forum._id,
          forum: "forum updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          forum: "forum not updated!",
        });
      }); 
  });
};

const deleteForum = async (req, res) => {
  await Forum.findOneAndDelete({ _id: req.params.id }, (err, forum) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!forum) {
      return res
        .status(404)
        .json({ success: false, error: `forum not found` });
    }

    return res.status(200).json({ success: true, data: forum });
  }).catch((err) => console.log(err));
};

const getForumById = async (req, res) => {
  await Forum.findOne({ _id: req.params.id }, (err, forum) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!forum) {
      return res
        .status(404)
        .json({ success: false, error: `forum not found` });
    }
    return res.status(200).json({ success: true, data: forum });
  }).catch((err) => console.log(err));
};

const getForums = async (req, res) => {
  await Forum.find({}, (err, forums) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!forums.length) {
      return res
        .status(404)
        .json({ success: false, error: `forum not found` });
    }
    return res.status(200).json({ success: true, data: forums });
  }).catch((err) => console.log(err));
};

export default {
  createForum,
  updateForum,
  deleteForum,
  getForums,
  getForumById,
};
