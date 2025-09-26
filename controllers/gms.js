const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllGms = async (req, res) => {
    //#swagger.tags=['gms']
    try {
        const result = await mongodb.getDb().collection('fgm_gms').find();
        
        result.toArray().then((gms) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(gms);
        }); 

    } catch(err) {
        console.error(err);
        res.status(500).json({message: 'Error occurred while retrieving GM list. Please try again.'})
    }
}

const getGm = async (req, res) => {
    //#swagger.tags=['gms']
    try {
        const gmId = new ObjectId(req.params.id)
        const result = await mongodb.getDb().collection('fgm_gms').find({_id: gmId});
        result.toArray().then((gms) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(gms[0]);
        }); 

    } catch(err) {
        console.error(err);
        res.status(500).json({message: 'Error occurred while retrieving GM. Please try again.'})
    }
};

const addGm = async (req,res) => {
    //#swagger.tags=['gms']
    try {
        const current = req.body.current !== undefined ? Number(req.body.current):undefined;
        const gmNumber = req.body.gmNumber !== undefined ? Number(req.body.gmNumber):undefined;
        const gm = {
            gmName: req.body.gmName,
            gmNumber: gmNumber,
            profslId: req.body.profslId,
            fantraxId: req.body.fantraxId,
            teamCode: req.body.teamCode,
            joinDate: req.body.joinDate,
            current: current
        };
    
        const response = await mongodb.getDb().collection('fgm_gms').insertOne(gm);
        if (response.acknowledged) {
            res.status(201).json(`${gm.gmName} added successfully`);
        } else {
            res.status(400).json(response.error || 'Missing Required Fields');
        }
        
    } catch(err) {
        console.error(err);
        res.status(500).json({message: 'Error occurred while adding GM. Please try again.'})
    }
}


const updateGm = async (req,res) => {
    //#swagger.tags=['gms']
    console.log('Body:', req.body);

    try { 
        const gmId = new ObjectId(req.params.id);
        const gm = {
            gmName: req.body.gmName,
            gmNumber: req.body.gmNumber,
            profslId: req.body.profslId,
            fantraxId: req.body.fantraxId,
            teamCode: req.body.teamCode,
            joinDate: req.body.joinDate,
            current: req.body.current
        };
    
        const response = await mongodb.getDb().collection('fgm_gms').replaceOne({ _id: gmId }, gm);
        if (response.modifiedCount > 0) {
            res.status(200).json(response.message || 'GM updated');
        } else {
            res.status(404).json(response.error || 'GM not found');
        };

    } catch(err) {
        console.error(err);
        res.status(500).json({message: 'Error occurred while updating GM.  Please try again.'})
    };
};


const deleteGm = async (req,res) => {
    //#swagger.tags=['gms']
    try{ 
        const gmId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().collection('fgm_gms').deleteOne({ _id: gmId });
        
        if (response.deletedCount > 0) {
            res.status(200).json(response.message || 'GM deleted');
        } else {
            res.status(404).json(response.error || 'GM not found');
        }
      
    } catch(err) {
        console.error(err);
        res.status(500).json({message: 'Error occurred while deleting GM.  Please try again.'})
    }
}

module.exports = { getAllGms, getGm, addGm, updateGm, deleteGm }