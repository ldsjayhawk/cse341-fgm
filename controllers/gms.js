const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllGms = async (req, res) => {
    //#swagger.tags=['gms']
    const result = await mongodb.getDb().collection('fgm_gms').find();
    
    result.toArray().then((gms) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(gms);
    }); //.catch(err);
}

const getGm = async (req, res) => {
    //#swagger.tags=['gms']
    const gmId = new ObjectId(req.params.id)
    const result = await mongodb.getDb().collection('fgm_gms').find({_id: gmId});
    result.toArray().then((gms) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(gms[0]);
    }); //.catch(err);
};

const addGm = async (req,res) => {
    //#swagger.tags=['gms']
    const gm = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDb().collection('fgm_gms').insertOne(gm);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occurred while adding gm');
    }
}


const updateGm = async (req,res) => {
    //#swagger.tags=['gms']
    console.log('Body:', req.body);

    const gmId = new ObjectId(req.params.id);
    const gm = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDb().collection('fgm_gms').replaceOne({ _id: gmId }, gm);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occurred while updating gm');
    }
}

const deleteGm = async (req,res) => {
    //#swagger.tags=['gms']
    const gmId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('fgm_gms').deleteOne({ _id: gmId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occurred while deleting gm');
    }
}

module.exports = { getAllGms, getGm, addGm, updateGm, deleteGm }