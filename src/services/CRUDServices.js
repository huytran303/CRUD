const connection = require('../config/database');

const createUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let [results, fields] = await connection.query(
        'INSERT INTO Users (email, name, city) values (?, ?, ?)', [email, name, city]);
    res.redirect('/home');
}

const getAllUsers = async () => { 
    let [results, fields] = await connection.query('SELECT * FROM Users');
    return results;
}

const updateUser = async (email, name, city, id) => {  
    console.log(">>> check id: ", id);
    console.log(">>> check email: ", email);
    let [results, fields] = await connection.query(
        `UPDATE Users SET email = ?, name = ?, city = ? WHERE id = ?`, 
        [email, name, city, id]
    );  
}

const deleteUser = async (req, res) => {
    let id = req.params.id;
    console.log(">>> check id: ", id);
    let [results, fields] = await connection.query('DELETE FROM Users WHERE id = ?', [id]);
    res.redirect('/home');
}

module.exports = {
    getAllUsers,
    updateUser,
    deleteUser,
    createUser
}