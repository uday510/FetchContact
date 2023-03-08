/**
 * Logic to make a GET call to the public API Repo
 */
const serverConfig = require('../server.config');
const axios = require('axios');
let url;
const config = {
         headers: {
             "Content-type": "application/json",
              "Authorization": `Bearer ${serverConfig.APIKEY}`,
         },
    };

exports.fetchContact = async () => {

    try {
        url = "https://rest.gohighlevel.com/v1/contacts";
 
        const response = await axios.get(url, config);
        const contacts = response.data.contacts;

        // get random contact from the returned contacts list.
        const randomIndex = Math.floor(Math.random() * contacts.length);

        return contacts[randomIndex];
    } catch (error) {
        console.log(error.message);
    }
}

exports.fetchCustomFieldData = async (id) => {
   try{
     url = "https://rest.gohighlevel.com/v1/custom-fields/";

    url += id; // add id to url
    const response = await axios.get(url, config);

    return response.data;
   } catch(error){
    console.log(error.message);
   }

}

exports.updateContact = async (id, contact) => {
    try {
        url = "https://rest.gohighlevel.com/v1/contacts/"

    url += id; // add id to url
    // console.log('URL', url);
    const response = await axios.put(url, contact, config);

    // console.log('response', response);
    // console.log('response from put', response.status);

    return {status: response.status, statusText: response.statusText};

    } catch(error) {
        console.log(error.message);
    }
}