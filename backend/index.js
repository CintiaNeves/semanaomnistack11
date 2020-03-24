const express = require('express');

const app = express();

app.get('/', (request, response) => {
    return response.json({
        evento: 'Semana OminiStack',
        aluno: 'Maria Cíntia'
    });
})

app.listen(3333);