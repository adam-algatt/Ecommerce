const router = require('express').Router();
const { where } = require('sequelize/types');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  let $ = req.body; 
Category.findAll({
include: [
  {
    model: Product
  }
]
})
  // be sure to include its associated Products
})
.then(dbCategoryData => {
  if (!dbCategoryData) {
    res.status(404).json({
      message: 'Categories not found'
    });
  }
 return res.json(dbCategoryData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findAll({
    where: {
    id: req.params.id
    },
    include: [
      {
        model: Product
      }, 
    ]
    })
      // be sure to include its associated Products
    })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({
          message: 'Category not found'
        });
      }
     return res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

router.post('/', (req, res) => {
  // create a new category
  let $ = req.body; 
Category.create({
  product_name: $.product_name,
  price: $.price,
  stock: $.stock,
  category_id: $.category_id
})
.then(dbCategoryData => {
  if (!dbCategoryData) {
    res.status(404).json({
      message: 'Category not found'
    });
  }
 return res.json(dbCategoryData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
  let $ = req.body; 
  Category.update({
    where: {
      id: $.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({
        message: 'Category not found'
      });
    }
   return res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  let $ = req.params; 

  Category.destroy({
where: {
  id: $.id
}
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({
        message: 'No category found with supplied ID.'
      });
    }
   return res.json(`${dbCategoryData} has been deleted.`);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})


module.exports = router;
