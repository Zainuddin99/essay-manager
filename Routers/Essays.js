const router = require('express').Router()
const { getAllEssays, addEssay, deleteEssay, updateEssay, getEssay } = require('../Contollers/Essays')

router.route('/').get(getAllEssays).post(addEssay)
router.route('/:id').delete(deleteEssay).patch(updateEssay).get(getEssay)

module.exports = router