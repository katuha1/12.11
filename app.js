const express = require('express')
const app = express()
const handlebars = require('express-handlebars')

const faker = require('@faker-js/faker/locale/ru')

const host = '127.0.0.1'
const port = 7000
const Users = [];

app.engine(
  'handlebars',
  handlebars.engine({ defaultLayout: 'main' })
)
app.set('views', './views')
app.set('view engine', 'handlebars')

function createRandomUser() {
    return {
        firstname: faker.faker['name'].firstName(),
        lastname: faker.faker['name'].lastName(),
        city: faker.faker['address'].cityName(),
        car: faker.faker['vehicle'].vehicle(),
        phone: faker.faker['phone'].phoneNumber(),
    };
}

Array.from({ length: 100 }).forEach(() => {
    Users.push(createRandomUser());
});

app.get('/user', (req, res) => {
    res.render('home', { users: JSON.stringify(Users) })
})

app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`)
})