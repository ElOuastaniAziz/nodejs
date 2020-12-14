const express = require('express');
const router = express.Router();
const Post = require('../modelos/Post');

//const insert = require('../modelos/insertar');






//usamos el metodo get devuelve todos los posts
router.get('/', async(req,res)=>{
    //res.send('We are on posts');
    try{
        const posts = await Post.find()
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});

router.get('/specific',(req,res)=>{
    res.send('We are on Specific post')
});


router.post('/user',(req,res)=>{
      //const insertar = new Insert()
      //insert.insercion();
});

//este 

/*router.post('/',(req,res)=>{
    //console.log(req.body); //muestra el resultado de post
    //console.log(req.body.title);
  //Creamos un objeto del post que hemos importado arriba
    const post = new Post({
      title:req.body.title,
      description:req.body.description  
    });
  //lo guardamos en  la base de datos y devuelve un response
    post.save()
        .then(data=>{
              res.json(data);
    }).catch(err=>res.json({message:err}));

});*/


//Este un post igual que el de arriba pero usamos el async y wait
router.post('/', async(req,res)=>{
    const post = new Post({
        title:req.body.title,
        description:req.body.description
    });

    try{
        const savedPost= await post.save();
        res.json(savedPost);
    }catch(err){
        res.json({message:err});
    }
});

//le especificamos el id
router.get('/:postId',async(req,res)=>{ //https://azizelouas.glitch.me/posts/15
    //console.log(req.params.postId); //15
    try{
        const post= await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({message:err});
    }
});

//Delete one post
router.delete('/:postId', async(req,res)=>{
    try{
        const removedPost = await Post.remove({_id:req.params.postId});
        res.json(removedPost);
    }catch(err){
        res.json({message:err});
    }
});
/*
METHOD:DELETE
https://azizelouas.glitch.me/posts/5fd78ed51ca8da6fa977ad23139 */

//UPDATE A POST
router.patch('/:postId', async(req,res)=>{
    try{
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId},
            {$set:{title:req.body.title}});
        res.json(updatedPost);
    }catch(err){
        res.json({message:err});
    }
});
/*
METHOD:PATCH
https://azizelouas.glitch.me/posts/5fd78ed51ca8da6fa977adf9
{
    "title": "titulo actualizado correctamente"
} */

module.exports=router;


// fetch('https://azizelouas.glitch.me/posts')
// .then(res=>{
//   return res.json();
// }).then(data=>{
//   console.log(data);
// })