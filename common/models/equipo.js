'use strict';

module.exports = function(Equipo) {
    Equipo.asignarSede = (users) => {
        console.log(users);
        

    }

    Equipo.remoteMethod('asignarSede', {
        http: {
            path: '/asignar-sede',
            verb: 'post'
        },
        accepts: [
            { arg: 'users', type: 'array' }
        ]
    })

};

