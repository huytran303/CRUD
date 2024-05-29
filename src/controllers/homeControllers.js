const connection = require('../config/database');
const {getAllUsers, deleteUser, updateUser} = require('../services/CRUDServices');

const getIndexPages = (req, res) => {
    res.render('sample.ejs');
}

const getHomepages = async (req, res) => {
    try {
        let results = await getAllUsers();
        console.log(">>> check connection to db: ", "Connected!");
        res.render('home' ,{ listUsers: results });
        var length = results.length;
        console.log(">>> check results: ", results[length-1]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const getAboutPages = (req, res) => {
    let users = [];
    connection.query('SELECT * FROM Users', (error, results, fields) => {
        users = results;
        console.log(">>> check users: ", users);
        res.send(JSON.stringify(users));
    });
    
}


function getSignUpPage(req, res) {
    res.render('sign-up.ejs');
}

const getEditPage = async (req, res) => {
    let id = req.params.id;
    let [results, fields] = await connection.query('SELECT * FROM Users where id = ?', [id]);
    let user = results && results.length > 0 ? results[0] : {};
    res.render('edit.ejs', {user: user});
    console.log(">>> check userId: ", id);
}
module.exports = {
    getHomepages,
    getAboutPages,
    getIndexPages,
    getSignUpPage,
    getEditPage

}