/**
 * Contact Controller
 */
const contactService = require('../utils/contactService');

exports.fetchContact = async (req, res) => {

    try {
        // get the random contact from the https://rest.gohighlevel.com/v1/contacts/
    const contact = await contactService.fetchContact();
    // console.log('RESPONSE ', response);
    let message = 'DFS Booking Zoom Link not found, so customField value is not updated';

    // console.log(response.customField.length);
    
        // if customField length is zero, then no updation
        if (contact.customField.length == 0) {
            message = 'Custom Field Length is zero, so no updation is required';
            return res.status(200).send({
                data: contact,
                message: message
            });
        }
            // Iterate through all the customFields
            for(const field of contact.customField) {
            const customFieldResponse = await contactService.fetchCustomFieldData(field.id);
            // console.log('CUSTOM FIELD DETAILS', customFieldResponse);

            // if customField name is 'DFS Booking Zoom Link' then update contact value
            if (customFieldResponse.name === 'DFS Booking Zoom Link') {
                // console.log('Found');
        
                // update the contact
                field.value = 'TEST';
                
                // updating the contact and sending it to the server
                const { status, statusText } = await contactService.updateContact(contact.id, contact);
                if (status == 200) {
                    message = 'DFS Booking Zoom Link found, so customField value is updated with TEST Successfully';
                    return res.status(status).send({data: contact, message: message});
                } else {
                    return res.status(status).send({data: contact, message: statusText});
                }
            }
            
            // not updation so, returning the actual contact
            return res.status(200).send({data: contact, message: message});;
        }
    } catch(err) {
        console.log(err.message);
        return res.status(500).send( {
            message: 'Some interval error',
        });
    }
}
