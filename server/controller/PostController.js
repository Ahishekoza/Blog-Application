import postSchema from "../models/postSchema.js";

export const postBlog = async (req, res) => {

  if (req.user.username === req.body.username) {
    const post = new postSchema({
      title: req.body.title,
      desc: req.body.desc,
      blogPost: '',
      username: req.body.username,
    });

    if(req.file && req.file.path){
        post.blogPost = req.file.path
    }

    await post
      .save()
      .then((response) => {
        res.status(200).json({
          message: "Blog post saved successfully",
          BlogPost: response,
        });
      })
      .catch((err) => {
        res.status(404).json({
          message: `Error saving post ${err.message}`,
        });
      });
  } else {
    res.status(500).json({
      message: "You are not authorized to save the post",
    });
  }
};

export const editBlogPost = async (req, res) => {
  if (req.user.username === req.body.username) {
    const existingBlog = await postSchema.findById(req.params.id);

    if(req.body.title){
        existingBlog.title = req.body.title;
    }

    if(req.body.desc){
        existingBlog.desc = req.body.desc;
    }

    if ( req.file && req.file.path ) {
      existingBlog.blogPost = req.file.path;
    }

    const updatedBlog = await existingBlog.save({timestamps:true},{new:true})

    if(updatedBlog){
        res.status(200).json({
            message:'Blog updated successfully',
            BlogPost: updatedBlog
        })
    }

    else{
        res.status(500).json({
            message:`Error updating blog`,
        })
    }
   
  } else {
    res.status(500).json({
      message: "You are not authorized to save the post",
    });
  }
};

export const getBlogById = async (req, res) => {
  await postSchema
    .findById(req.params.id)
    .then((reponse) => {
      res.status(200).json({
        BlogPost: reponse,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Blog Post not found ${err.message}`,
      });
    });
};

export const getAllBlogPosts  = async (req, res) => {
  // console.log(req.user.username === req.body.username);
  // if(req.user.username === req.body.username){
    await postSchema.find().limit(5).then((response)=>{
      res.status(200).json({
        BlogPosts: response
      })
    }).catch((err) => {
      res.status(404).json({
        message:`Blog Posts not found ${err.message}`,
      })
    })
  // }
  // else{
  //   res.status(401).json({
  //     message:'You are unauthorized to access this blog posts'
  //   })
  // }
}