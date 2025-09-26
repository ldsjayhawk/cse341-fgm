const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['draftPlayers']
    try{
        const result = await mongodb.getDb().collection('fgm_draft_players').find();
    
        result.toArray().then((draftPlayers) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(draftPlayers);
        }); 

    } catch(err) {
        console.error(err);
        res.status(500).json({message: 'Error occurred while retrieving player list.  Please try again.'})
    }
}

const getDraftPlayer = async (req, res) => {
    //#swagger.tags=['draftPlayers']
    try {
        const draftPlayerId = new ObjectId(req.params.id)
        const result = await mongodb.getDb().collection('fgm_draft_players').find({_id: draftPlayerId});
        result.toArray().then((draftPlayers) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(draftPlayers[0]);
    })
    
    } catch(err) {
        console.error(err);
        res.status(500).json({message: 'Error occurred while retrieving player.  Please try again.'})
    }
};

const addDraftPlayer = async (req,res) => {
    //#swagger.tags=['draftPlayers']
    try {
        const rank = req.body.rank ? Number(req.body.rank):undefined;
        const draftPlayer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            position: req.body.position,
            rank: rank,
            fgm_team: req.body.fgm_team
        };
    
        const response = await mongodb.getDb().collection('fgm_draft_players').insertOne(draftPlayer);
        if (response.acknowledged) {
            res.status(200).json(response.message || 'Player added');
        } else {
            res.status(400).json(response.error || 'Missing Required Fields');
        }
        
    } catch(err) {
        console.error(err);
        res.status(500).json({message: 'Error occurred while adding player. Please try again.'})
    }
}


const updateDraftPlayer = async (req,res) => {
    //#swagger.tags=['draftPlayers']
    try {
    console.log('Body:', req.body);

    const draftPlayerId = new ObjectId(req.params.id);
    const draftPlayer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        position: req.body.position,
        rank: req.body.rank,
        fgm_team: req.body.fgm_team
    };

    const response = await mongodb.getDb().collection('fgm_draft_players').replaceOne({ _id: draftPlayerId }, draftPlayer);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(404).json(response.error || 'Player not found');
    }

    } catch(err) {
        console.error(err);
        res.status(500).json({message: 'Error occurred while updating player.  Please try again.'})
    }
}

const deleteDraftPlayer = async (req,res) => {
    //#swagger.tags=['draftPlayers']
    try {
        const draftPlayerId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().collection('fgm_draft_players').deleteOne({ _id: draftPlayerId });
        
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json(response.error || 'Player not found');
        }
      
    } catch(err) {
        console.error(err);
        res.status(500).json({message: 'Error occurred while deleting player.  Please try again.'})
    }
    
}

module.exports = {getAll, getDraftPlayer, addDraftPlayer, updateDraftPlayer, deleteDraftPlayer}