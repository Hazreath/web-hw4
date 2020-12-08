const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize');
const PostModel = require('../models/PostModel');


router.get('/', authorize, (request, response) => {

    // Endpoint to get posts of people that currently logged in user follows or their own posts

    PostModel.getAllForUser(request.currentUser.id, (postIds) => {

        if (postIds.length) {
            PostModel.getByIds(postIds, request.currentUser.id, (posts) => {
                response.status(201).json(posts)
            });
            return;
        }
        response.json([])

    })

});

router.post('/', authorize,  (request, response) => {
    const params = {
        userId: request.currentUser.id,
        text: request.body.text,
        media: {
            type: request.body.media.type,
            url: request.body.media.url,
        },
    }
    /**
     * Task#1 - 5 points
     * https://sites.google.com/view/wad20-hw4/#h.qzvyq0stf1wp
     */
    // Endpoint to create a new post
    PostModel.create(params, (post) => {
        return response.status(201).json(post)
    })
});


router.put('/:postId/likes', authorize, (request, response) => {
    /**
     * Task#2 - 3 points
     * https://sites.google.com/view/wad20-hw4/#h.q1b61xoqi58l
     */
    // Endpoint for current user to like a post
    PostModel.like(request.currentUser.id, request.params.postId, (r) => {
        return response.status(201).json(r)
    })
});

router.delete('/:postId/likes', authorize, (request, response) => {
     /**
     * Task#3 - 2 points
     * https://sites.google.com/view/wad20-hw4/#h.n695yevfo1uz
     */
    // Endpoint for current user to unlike a post
    PostModel.unlike(request.currentUser.id, request.params.postId, (r) => {
        return response.status(201).json(r)
    })
});

module.exports = router;
