const {Router} = require('express');
const SuperheroController = require('../controllers/superhero.controller');
const {getSuperheroInstance} = require('../middlewares/getSuperheroInstance');
const {pagination} = require('../middlewares/pagination');
const {addSuperpower} = require('../middlewares/addSuperpower');
const multer = require('multer');
const path = require('path');

const imagePath = path.resolve(__dirname, '../public/images');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, imagePath)
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}.${file.originalname}`)
    }
})

const upload = multer({ storage });

const superheroRouter = Router();

superheroRouter.post('/', upload.single('heroImage'), addSuperpower, SuperheroController.createSuperhero);
superheroRouter.get('/:heroId', getSuperheroInstance, SuperheroController.getOneSuperhero);
superheroRouter.get('/', pagination, SuperheroController.getAllSuperheroes);
superheroRouter.put('/:heroId', upload.single('heroImage'), addSuperpower, SuperheroController.updateSuperhero);
superheroRouter.delete('/:heroId', getSuperheroInstance, SuperheroController.deleteSuperhero);

// superheroRouter.patch('/:heroId', upload.single('heroImage'), SuperheroController.createHeroImage);


module.exports = superheroRouter;