const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['players']
    const result = await mongodb.getDb().collection('fgm_draft_players').find();
    result.toArray().then((players) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(players);
    }); //.catch(err);
}

const getPlayer = async (req, res) => {
    //#swagger.tags=['players']
    const playerId = new ObjectId(req.params.id)
    const result = await mongodb.getDb().collection('fgm_draft_players').find({_id: playerId});
    result.toArray().then((players) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(players[0]);
    }); //.catch(err);
};

const addPlayer = async (req,res) => {
    //#swagger.tags=['players']
    const player = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDb().collection('fgm_draft_players').insertOne(player);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occurred while adding player');
    }
}


const updatePlayer = async (req,res) => {
    //#swagger.tags=['players']
    console.log('Body:', req.body);

    const playerId = new ObjectId(req.params.id);
    const player = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDb().collection('fgm_draft_players').replaceOne({ _id: playerId }, player);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occurred while updating player');
    }
}

const deletePlayer = async (req,res) => {
    //#swagger.tags=['players']
    const playerId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('fgm_draft_players').deleteOne({ _id: playerId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occurred while deleting player');
    }
}

module.exports = {getAll, getPlayer, addPlayer, updatePlayer, deletePlayer}