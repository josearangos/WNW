'use strict';

module.exports = function(Equipo) {
    Equipo.asignarSede = function (users) {
        console.log(users);
        const office = users[0].equipoId
        

    }

    Equipo.remoteMethod('asignarSede', {
        http: {
            path: '/asignar',
            verb: 'post'
        },
        accepts: [
            { arg: 'users', type: 'array' }
        ],
        returns: [{arg: 'jeje', type: 'string'}]
    })

};

