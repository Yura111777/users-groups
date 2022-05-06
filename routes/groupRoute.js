const express = require('express');
const groupController = require('../controllers/groupContoller');

const router = express.Router();

router.route('/')
    .post(groupController.createGroup)
    .get(groupController.getAllGroups);
router.patch('/update/:id', groupController.updateGroup);
router.delete('/delete/:id', groupController.deleteGroup);

module.exports = router;