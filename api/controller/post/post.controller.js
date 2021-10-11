const { createPostQueue } = require("../../routes/posts");
const Post = require("../../models/Post");
const User = require("../../models/User");



const createPost = (post) => {
    return new Promise( async (resolve, reject) => {
        try{
            const newPost = new Post(post);
            const savedPost =  await newPost.save();
            resolve(savedPost);
        }
        catch(err){
            console.log(err);
            reject(err);
        }
    })
} 

module.exports={
    createPost
}