const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['draftPlayers']
    const result = await mongodb.getDb().collection('fgm_draft_players').find();

    result.toArray().then((draftPlayers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(draftPlayers);
    }); //.catch(err);
}

const getDraftPlayer = async (req, res) => {
    //#swagger.tags=['draftPlayers']
    const draftPlayerId = new ObjectId(req.params.id)
    const result = await mongodb.getDb().collection('fgm_draft_players').find({_id: draftPlayerId});
    result.toArray().then((draftPlayers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(draftPlayers[0]);
    }); //.catch(err);
};

const addDraftPlayer = async (req,res) => {
    //#swagger.tags=['draftPlayers']
    const draftPlayer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDb().collection('fgm_draft_players').insertOne(draftPlayer);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occurred while adding draftPlayer');
    }
}


const updateDraftPlayer = async (req,res) => {
    //#swagger.tags=['draftPlayers']
    console.log('Body:', req.body);

    const draftPlayerId = new ObjectId(req.params.id);
    const draftPlayer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDb().collection('fgm_draft_players').replaceOne({ _id: draftPlayerId }, draftPlayer);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occurred while updating draftPlayer');
    }
}

const deleteDraftPlayer = async (req,res) => {
    //#swagger.tags=['draftPlayers']
    const draftPlayerId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('fgm_draft_players').deleteOne({ _id: draftPlayerId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occurred while deleting draftPlayer');
    }
}

module.exports = {getAll, getDraftPlayer, addDraftPlayer, updateDraftPlayer, deleteDraftPlayer}