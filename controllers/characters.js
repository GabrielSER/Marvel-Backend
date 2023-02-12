const {charactersModel} = require ("../models")
/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) =>{
    const data = await charactersModel.find({});
    res.send({data})
};
/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) =>{
    const data = await charactersModel.find({name: req.params.name});
    res.send({data})};

const getPowers = async (req, res) =>{
    const data = await charactersModel.find({name: req.params.name}).populate("powers");
    res.send({data})};
/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) =>{
    const { body } = req
    console.log(body)
    const data = await charactersModel.create(body)
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

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, getPowers };