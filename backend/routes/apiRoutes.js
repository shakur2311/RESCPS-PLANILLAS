const express = require('express');
const router = express.Router();
const trabajadorController = require('../controllers/trabajadorController');
const planillaController = require('../controllers/planillaController');
const authController = require('../controllers/authController');
const registropagoController = require('../controllers/registropagoController');
const load = require('../models/input'); 
const registropago = require('../models/registropago');

//routes

/* router.get('/',(req,res)=>{
    res.render('./admin/index.ejs');
}) */



router.get('/obtener-planillas',planillaController.obtenerPlanillas);
router.get('/obtenerRegistrosPagosDetallado/:id_planilla',planillaController.obtenerRegistrosPagosDetalladoXPlanilla);
router.get('/obtenerRegistrosPagosConsolidado/:id_planilla',planillaController.obtenerRegistrosPagosConsolidadoXPlanilla);
router.post('/nueva-planilla',planillaController.nuevaPlanilla)

router.get('/obtenerTrabajadores',trabajadorController.index);
router.get('/obtenerTrabajador/:idTrabajador',trabajadorController.obtenerTrabajador);
router.get('/obtenerTrabajadoresXRL/:idRL',trabajadorController.obtenerTrabajadoresXRL);
router.get('/obtenerTrabajadoresXFacultad/:id',trabajadorController.obtenerTrabajadoresXFacultad);
router.post('/nuevoTrabajador',trabajadorController.nuevoTrabajador);
router.post('/verificarMontoTope',registropagoController.verificarMontoTope)


router.post('/registradorPago',registropagoController.guardarNuevoRegistroPago);
router.post('/editarRegistroPago',registropagoController.editarRegistroPago);
router.get('/obtenerRegistroPago/:idRegistroPago',registropagoController.obtenerRegistroPago)
router.get('/eliminarRegistroPago/:idRegistroPago',registropagoController.eliminarRegistroPago)

module.exports = router;