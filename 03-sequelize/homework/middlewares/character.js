const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
    const { code, name, hp, mana } = req.body
    if (!code || !name || !hp || !mana) 
        return res.status(404).send("Falta enviar datos obligatorios")
    
    try {
        const character = await Character.create(req.body)
        return res.status(201).json(character)
    } catch (error) {
        return res.status(404).send('Error en alguno de los datos provistos')
    }
    })
    
    router.get('/', async (req, res) => {
        const { race, name, hp } = req.query
    try{
        if (race) {
            const character = await Character.findAll({
                where: { race }
            })  
            return res.status(200).json(character);
        }
       if (name && hp){
            const character = await Character.findAll({
                attributes: ['name', 'hp']
            })
            return res.status(200).json(character)
        }
        
           const character = await Character.findAll() 
        return res.status(200).json(character)
        
    }catch(e){
        return res.status(404).send('El código FIFTH no corresponde a un personaje existente')
    }
    }) 
    
    module.exports = router;
    
   /* GET /character
Debe retornar todos los personajes que se encuentren creados en la base de datos. Además este endpoint debe aceptar por query un valor de una raza para filtrar los resultados, por ejemplo: GET /character?race=human

Adicionalmente pueden hacer que reciba por query los atributos que quiera devolver en el caso de no querer todos, por ejemplo: GET /character?name=true&hp=true

GET /character/:code
Debe retornar aquel personaje que coincida con el código enviado. En el caso de no encontrarlo debe responder con status code 404 y el mensaje "El código ${codigo} no corresponde a un personaje existente" */
