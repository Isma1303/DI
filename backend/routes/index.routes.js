const express = require("express");
const path = require("path");
const { addContactInfo } = require("../../frontend/public/src/scripts/db.js");

const router = express.Router();


router.get("/", (req, res) => res.render("index"));
router.get("/about", (req, res) => res.render("about"));
router.get("/history", (req, res) => res.render("history"));
router.get("/importance", (req, res) => res.render("importance"));
router.get("/contact", (req, res) => res.render("contact", { query: req.query }));

router.post("/send-message", express.json(), express.urlencoded({ extended: true }), async (req, res) => {
    try {
        console.log('Recibido formulario de contacto:', req.body);
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            console.error('Datos incompletos:', { name, email, message });
            return res.redirect('/contact?error=incomplete');
        }
        
        console.log('Intentando guardar en la base de datos:', { name, email, message });
        const result = await addContactInfo(name, email, message);
        console.log('Resultado de guardar en la base de datos:', result);
        
        if (result.success) {
            res.redirect('/contact?success=true');
        } else {
            console.error('Error al guardar en la base de datos:', result.error);
            res.redirect('/contact?error=true');
        }
    } catch (error) {
        console.error('Error procesando formulario de contacto:', error);
        res.redirect('/contact?error=true');
    }
});

module.exports = router;
