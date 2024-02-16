const express = require('express');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Data
const users = [
    {
        id: 1,
        name: "John",
    },
    {
        id: 2,
        name: "Smith",
    },
    {
        id: 3,
        name: "Bob",
    },
];

// Endpoints
// 1. GET: /users endpoint ini bertugas untuk memberikan list data users
app.get('/users', (req, res) => {
    res.json(users);
});

// 2. GET: /users/:name endpoint ini bertugas memberikan data user sesuai dengan permintaan client.
// :name pada url adalah data dinamis. 
app.get('/users/:name', (req, res) => {
    const { name } = req.params;
    const user = users.find(user => user.name.toLowerCase() === name.toLowerCase());
    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "Data tidak ditemukan",
        });
    }
    res.json(user);
});

// Middleware untuk penanganan Routing 404
app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        message: "Resource tidak ditemukan",
    });
});

// Middleware untuk penanganan error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: "error",
        message: "Terjadi kesalahan pada server",
    });
});

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
