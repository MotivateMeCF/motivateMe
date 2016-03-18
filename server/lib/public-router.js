const router = require('express').Router();
const Projects = require('../models/Project');
const Comments = require('../models/Comment');

//GET all projects
router.get('/', (req, res, next) => {
  Projects.find()
      .populate('author progress')
      .lean()
      .exec((err, projects) => {
          if(err) {
            return res.status(500).send(err[0]);
          }
          res.send(projects);
        });
});

router.get('/:id', (req, res, next) => {
  Projects.find({_id: req.params.id})
          .populate('author progress')
          .lean()
          .exec((err, project) => {
            if(err) {
              return res.status(500).send(err);
            }
            Comments.find({'project': req.params.id})
                    .populate('author votes')
                    .lean()
                    .exec((err, comments) => {
                      if(err) {
                        return res.status(500).send(err);
                      }
                      project[0].comments = comments;
                      res.send(project);
                    });

          });
});

module.exports = router;


