const express = require('express')
var bodyParser = require('body-parser')
const {response} = require("express");
const app = express();
const puerto = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let proveedores = [
    {id: 1, nombreEmpresa: "Proveedor 1", nombreContacto: "Contacto 1", telefono: "123456789", email: "test@test.com"},
    {id: 2, nombreEmpresa: "Proveedor 2", nombreContacto: "Contacto 2", telefono: "123456789", email: "test2@test.com"},
    {id: 3, nombreEmpresa: "Proveedor 3", nombreContacto: "Contacto 3", telefono: "123456789", email: "test3@test.com"},
    {id: 4, nombreEmpresa: "Proveedor 4", nombreContacto: "Contacto 4", telefono: "123456789", email: "test4@test.com"},
    {id: 5, nombreEmpresa: "Proveedor 5", nombreContacto: "Contacto 5", telefono: "123456789", email: "test5@test.com"},
    {id: 6, nombreEmpresa: "Proveedor 6", nombreContacto: "Contacto 6", telefono: "123456789", email: "test6@test.com"},
    {id: 7, nombreEmpresa: "Proveedor 7", nombreContacto: "Contacto 7", telefono: "123456789", email: "test7@test.com"},
    {id: 8, nombreEmpresa: "Proveedor 8", nombreContacto: "Contacto 8", telefono: "123456789", email: "test8@test.com"},
    {id: 9, nombreEmpresa: "Proveedor 9", nombreContacto: "Contacto 9", telefono: "123456789", email: "test9@test.com"},
    {id: 10, nombreEmpresa: "Proveedor 10", nombreContacto: "Contacto 10", telefono: "123456789", email: "test10@test.com"}
]
app.get('/proveedores', (req, res) => {
    res.send(proveedores);
})
app.get('/proveedores/:id', (req, res) => {
    const id = req.params.id;
    const proveedor = proveedores.find(proveedor => proveedor.id == id);
    if (proveedor) {
        res.send(proveedor);
    }else {
        res.status(404).send({error: 'Proveedor no encontrado'});
    }
})
app.post('/proveedores', (req, res) => {
    const {nombreEmpresa, nombreContacto, telefono, email} = req.body;
    const id = proveedores.length + 1;
    if (nombreEmpresa == null || nombreContacto == null || telefono == null || email == null) {
        res.status(400).send({error: 'Faltan datos'});

    }else {
        const proveedor = {
            id: id,
            nombreEmpresa: nombreEmpresa,
            nombreContacto: nombreContacto,
            telefono: telefono,
            email: email
        };
        const longitudInicial = proveedores.length;
        proveedores.push(proveedor);
        if (proveedores.length > longitudInicial) {
            res.status(201).send(proveedor);

        } else {
            res.status(400).send({error: 'No se ha podido crear el proveedor'});
        }
    }
})

app.put('/proveedores/:id', (req, res) => {
   const {id} = req.params;
    const {nombreEmpresa, nombreContacto, telefono, email} = req.body;
    if (nombreEmpresa == undefined || nombreContacto == undefined || telefono == undefined || email == undefined) {
        res.status(400).send({error: 'Faltan datos'});

    } else {
        const proveedor = proveedores.find(proveedor => proveedor.id == id);
        if (proveedor) {
            proveedor.nombreEmpresa = nombreEmpresa;
            proveedor.nombreContacto = nombreContacto;
            proveedor.telefono = telefono;
            proveedor.email = email;
            res.status(200).send(proveedor);
        }else {
            res.status(404).send({error: 'Proveedor no encontrado'});
        }
    }
} )

app.delete('/proveedores/:id', (req, res) => {
    const id = req.params.id;
    const proveedor = proveedores.find(proveedor => proveedor.id == id);
    if (proveedor) {
        const index = proveedores.indexOf(proveedor);
        proveedores.splice(index, 1);
        res.status(200).send(proveedor);
    }else {
        res.status(404).send({error: 'Proveedor no encontrado'});
    }

})


app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
})