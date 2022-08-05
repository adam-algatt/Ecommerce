const router = require('express').Router();
const { Model } = require('sequelize/types');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: {model: Product, ProductTag }
    })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({
          message: 'Tags not found'
        });
      }
     return res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  
  })
  // be sure to include its associated Product data


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    }, 
      // associated Product data
    include: {
      model: Product
    }
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err)
  })
});


router.post('/', (req, res) => {
  // create a new tag
  let $ = req.params;
  Tag.create({
tag_name: $.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err)
  })
});

  // update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  let $ = req.params;
  Tag.update({
    where: {
      id: $.id
    }
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

  // delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
