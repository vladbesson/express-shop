const fs = require('fs').promises;
const { createReadStream } = require('fs');
const path = require('path');
const router = require('express').Router();

const pathToProducts = path.join(__dirname, '../data/products.json');

router.get('/', (req, res) => {
  // fs.readFile(pathToProducts, 'utf8')
  //   .then((products) => {
  //     res.send(products);
  //   })
  //   .catch(() => {
  //     res.status('500').send({ Error: 'tra-ta-ta' });
  //   });

  const reader = createReadStream(pathToProducts, { encoding: 'utf8' });

  reader.on('error', () => {
    res.status('500').send({ Error: 'tra-ta-ta' });
  });

  reader.on('open', () => {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    reader.pipe(res);
  });
});

router.get('/:id', (req, res) => {
  fs.readFile(pathToProducts, 'utf8')
    .then((products) => {
      const findProd = JSON.parse(products).find((product) => product.id === Number(req.params.id));

      if (!findProd) {
        res.status(404).send({ Error: 'This product is not exist' });
        return;
      }

      res.send(findProd);
    })
    .catch(() => {
      res.status('500').send({ Error: 'tra-ta-ta' });
    });
});

module.exports = router;
