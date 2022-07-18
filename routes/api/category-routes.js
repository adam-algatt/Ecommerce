const router = require('express').Router();
// const { where } = require('sequelize/types');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
Category.findAll({
 // associated Products
  include: [Product],
})
 .then((categories) => res.json(categories))
.catch((err) => res.status(500).json(err));
})

  // find one category by its `id` value
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
    id: req.params.id
    },
    include: [Product],
    })
    // rtn category by id, if err rtn err
    .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json(err));
    })
  
router.post('/', (req, res) => {
  // create a new category
  let $ = req.body; 
Category.create({
  product_name: $.product_name,
  price: $.price,
  stock: $.stock,
  category_id: $.category_id
})
.then((categories) => res.json(categories))
.catch((err) => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  let $ = req.body; 
  Category.update({
    where: {
      id: $.id
    },
  })
  .then((categories) => res.json(categories))
  .catch((err) => res.status(500).json(err));
})

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  let $ = req.params; 
  Category.destroy({
where: {
  id: $.id
},
  })
  .then((category) => res.status(200).json(category))
  .catch((err) => res.status(400).json(err));
  });

module.exports = router;
