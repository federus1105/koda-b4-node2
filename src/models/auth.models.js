let users = [
    { email: 'federus@gmail.com', username: 'federus', password: 'password123'},
];

function findUser(email) {
    return users.find(user => user.email === email);
}

export default {
    findUser, 
    users};