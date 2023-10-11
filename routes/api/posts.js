const express = require('express');
const router = express.Router();

//posts model

const Posts = require('../../models/Posts');

// @routes Get api/posts
// @desc Get all posts

router.get('/', async(req, res)=>{
    /*res.setHeader('Access-Control-Allow-Origin', '*');*/
    try{
        const posts = await Posts.find();
        if(!posts) throw Error("No Items");
        res.status(200).json(posts);
    } catch(err){
        res.status(400).json({msg : err});
    }
});

// @routes Get api/posts/:id
// @desc Get a single post

router.get('/:id', async(req, res)=>{
    try{
        const post = await Posts.findById(req.params.id);
        if(!post) throw Error("No Items");
        res.status(200).json(post);
    } catch(err){
        res.status(400).json({msg : err});
    }
});


// routes POST api/posts
// @desc Create an post

router.post('/', async (req,res) =>{
    const newPost = new Posts(req.body);

    try {
        const post = await newPost.save();
        if (!post) throw Error('Something went wrong');

        res.status(200).json(post);
    }catch(err) {
        res.status(400).json({msg : err})
    }

});


// @routes Update api/posts/:id
// @desc Update a post

router.patch('/:id', async (req,res) => {
    try{
        const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
        if(!post) throw Error("Something went wrong while updating!!!");
        res.status(200).json({success : true});
    } catch(err) {
        res.status(400).json({msg : err})
    }
});


// @routes Delete api/posts/:id
// @desc Delete a post

router.delete('/:id', async(req, res)=>{
   try{
    const post = await Posts.findByIdAndDelete(req.params.id);
    if(!post) throw Error('No Posts Found');

    res.status(200).json({success:true});
   }catch(err){
    res.status(400).json({msg : err})
   }
});

module.exports = router;