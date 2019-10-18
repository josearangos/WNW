'use strict';

module.exports = function(Equipo) {
    Equipo.asignarSede = function (users) {
        console.log(users);
        

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

