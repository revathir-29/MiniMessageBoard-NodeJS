const express = require('express');
const router = express.Router();

//sample messages array with IDs
let messageIdCounter = 2;
const messages = [
    {id: 1, text: "Hi there!" , user: "Amando" , added: new Date()},
    {id: 2, text: "Hello World!" , user: "Charles" , added: new Date()}
];

//index route to display messages
router.get('/' , (req, res) =>{
    res.render('index' , {title: 'Mini Message Board' , messages});
});

//route to display the new messages form
router.get('/new' , (req, res) => {
    res.render('form' , {title: 'New Message' });
});

//POST route to handle new message submission
router.post('/new' , (req, res) => {
    const { messageText, messageUser } = req.body;
    messageIdCounter++;
    messages.push({id: messageIdCounter, text: messageText, user: messageUser, added: new Date() });
    res.redirect('/');
});

//Route to display the handle message edits
router.get('/edit/:id' , (req, res) => {
    const messageId = parseInt(req.params.id, 10);
    const messageToEdit = messages.find(msg => msg.id === messageId);

    if(messageToEdit) {
        res.render('edit' , {title: 'Edit Message' , message: messageToEdit});
    } else {
        res.status(404).send('Message not found');
    }
});

//POST route to handle message edits
router.post('/edit/:id' , (req,res) => {
    const messageId = parseInt(req.params.id, 10);
    const {messageText, messageUser} = req.body;

    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if(messageIndex !== -1) {
        //Update the message
        messages[messageIndex] = {
            id: messageId,
            text: messageText,
            user: messageUser,
            added: new Date()
        };
        res.redirect('/');
    } else {
        res.status(404).send('Message not found');
    }
});

//POST route to handle deleting a message
router.post('/delete/:id' , (req,res) => {
    const messageId = parseInt(req.params.id, 10);
    const messageIndex = messages.findIndex(msg => msg.id === messageId);

    if(messageIndex !== -1) {
        //Remove the message from the array
        messages.splice(messageIndex, 1);
    }
    res.redirect('/');
});
module.exports = router;