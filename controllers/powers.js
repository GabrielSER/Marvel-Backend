const {powersModel} = require ("../models")
/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) =>{
    const data = await powersModel.find({});
    res.send({data})
};
/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) =>{
    const data = await powersModel.find({name: req.params.name});
    res.send({data})};

/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) =>{
    const { body } = req
    console.log(body)
    const data = await powersModel.create(body)
    res.send({data})
};
/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = (req, res) =>{};
/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = (req, res) =>{};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };