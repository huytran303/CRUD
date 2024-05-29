const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const connection = require('../config/database');
const bodyParser = require('body-parser');
const createUser = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        let email = req.body.email;
        let name = req.body.name;
        let city = req.body.city;

        let image;
        if (req.file) {
            let tempPath = req.file.path;
            image = tempPath.replace('uploads\\', '');
        } else {
            image = null; 
        }
        let [results, fields] = await connection.query(
            'INSERT INTO Users (email, name, city, image) values (?, ?, ?, ?)', [email, name, city, image]);
        res.redirect('/home');
    });
}

const getAllUsers = async () => { 
    let [results, fields] = await connection.query('SELECT * FROM Users');
    return results;
}

const updateUser = async (email, name, city, id, image) => {  
    let [results, fields] = await connection.query(
        `UPDATE Users SET email = ?, name = ?, city = ?, image = ? WHERE id = ?`, 
        [email, name, city, image, id]
    );  
}

const editUser = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        let email = req.body.email;
        let name = req.body.name;
        let city = req.body.city;
        let id = req.params.id;
        let image;
        if (req.file) {
            let tempPath = req.file.path;
            image = tempPath.replace('uploads\\', '');
        } else {
            image = null; 
        }
        console.log(">>> check image: ", image);
        console.log(">>> check email: ", email);
        console.log(">>> check name: ", name);
        console.log(">>> check id at edit: ", req.params.id);
        updateUser(email, name, city, id, image);
        res.redirect('/home');
    });
}

const deleteUser = async (req, res) => {
    let id = req.params.id;
    console.log(">>> check id: ", id);
    let [results, fields] = await connection.query('DELETE FROM Users WHERE id = ?', [id]);
    res.redirect('/home');
}
module.exports = {
    getAllUsers,
    deleteUser,
    createUser,
    editUser
}