const express = require("express")
const auth = require("../middleware/auth");
const isAdmin = require('../middleware/role')("Admin")
const {create, allDocs, singleDoc, update, remove} = require("../controllers/document");
const router = express.Router()


router.use(auth)

router.post('/',create)
router.get('/',allDocs)
router.get('/:id',singleDoc)
router.put('/:id',update)
router.delete('/:id',isAdmin,remove)

module.exports = router