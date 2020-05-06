const express = require('express');
const router  = express.Router();
const moment = require('moment');

module.exports = (db) => {

  const getSingleResource = function(resourceID) {
    let queryString = `
    SELECT resources.*, AVG(resource_reviews.rating) AS rating, COUNT(resource_reviews.liking) AS likes, resource_reviews.comment AS comments
    FROM resources
    FULL OUTER JOIN resource_reviews ON resource_id = resources.id
    WHERE resources.id = 1 AND resources.category = 'Food'
    GROUP BY resources.id, comments;
    `
    return db
    .query(queryString, [resourceID])
    .then(res => console.log('this is res:', res.rows))
    .then(res => res.rows)
    .catch((err) => console.error(err));
  }

  router.get("/category/:id", (req, res) => {
    console.log("N point hit");
    let id = req.params.id;
    console.log(req.params)
    getSingleResource(id)
    .then (resources => {
      console.log(resources);
      res.render('resource', {resources})
    })
    .catch((err) => (res.status(500).send(err)));
  })

  return router;


  const addLike = function(resourceID) {
    let queryString =`
    UPDATE resource_reviews
    SET liking = TRUE
    WHERE id = $1
    `
  }

  const addComment = function(comment, resourceID) {
    let queryString = `
    UPDATE resource_reviews
    SET comment = $1
    WHERE id = $2
    `
  }

  const addRating = function(rating, resourceID) {
    let queryString = `
    UPDATE resource_reviews
    SET rating = $1
    WHERE id = $2
    `
  }

}

//
