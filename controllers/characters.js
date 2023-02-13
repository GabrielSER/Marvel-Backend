const {charactersModel} = require ("../models")
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
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
const getItem = async (req, res) =>{try{
    const data = await charactersModel.findById(req.params.id);    
    res.send({data});
} catch (e) {
  handleHttpError(res, e);
}
};
const getPowers = async (req, res) =>{
    const data = await charactersModel.find({id: req.params.id}).populate("powers");
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
const updateItem = async (req, res) =>{ 
    try {
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true };
  
        const result = await charactersModel.findByIdAndUpdate(id, updates, options);
        if (!result) {
          throw createError(404, 'Character does not exist');
        }
        res.send(result);
      } catch (error) {
        console.log(error.message);
      }
};
/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) =>{try {
    const id = req.params.id;
    const data = await charactersModel.findByIdAndDelete(id);
    // console.log(result);
    if (!data) {
      throw createError(404, 'Product does not exist.');
    }
    res.send(data);
  } catch (e) {
    handleHttpError(res, e);
  }};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, getPowers };