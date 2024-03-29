const Mascota = require('../models/mascotas');
const { response, request } = require('express');

const mascotasGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, mascotas] = await Promise.all([
        Mascota.countDocuments(query),
        Mascota.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        mascotas
    });
}

const getMascotaById = async (req, res) => {
    const { id } = req.params;
    const mascota = await Mascota.findOne({ _id: id });

    res.status(200).json({
        mascota
    });
}

const putMascotas = async (req, res = response) => {
    const {id} = req.params;
    const {_id, nombreMascota, especie, lugarCrianza, ...resto} = req.body;

    const mascota = await Mascota.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Mascota actualizada exitosamente',
        mascota
    });
}

const mascotasDelete= async (req, res) => {
    const {id} = req.params;
    const mascota = await Mascota.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({
        msg: 'Mascota eliminada exitosamente',
        mascota
    });
}

const mascotasPost = async (req, res) => {
    const { nombreMascota, especie, edad, tamaño, peso, estadoAdopcion, lugarCrianza } = req.body;
    const mascota = new Mascota({ nombreMascota, especie, edad, tamaño, peso, estadoAdopcion, lugarCrianza });

    await mascota.save();
    res.status(202).json({
        mascota
    })
}

module.exports = {
    mascotasGet,
    getMascotaById,
    putMascotas,
    mascotasDelete,
    mascotasPost
}