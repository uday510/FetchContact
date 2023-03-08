const contactController = require('../controllers/contact.controller');

module.exports = (app) => {
    // end point : 127.0.0.1/api/v1/contacts
    app.get('/api/v1/contacts', contactController.fetchContact);
}