'use strict';
var app = require('../../server/server');
const fetch = require('node-fetch');

module.exports = function(Equipo) {
    Equipo.asignarSede = async function (users, juntos) {
        let API_KEY = ''
        let origins = '';
        let destinations = '';
        

        let Sede = app.models.Sede;
        let sedes = await Sede.find({})

        users.forEach(user => {
            origins += `${user.latitud},${user.longitud}|`
        });

        sedes.forEach(sede => {
            destinations += `${sede.latitud},${sede.longitud}|`
        })

        origins = origins.slice(0, -1);
        destinations = destinations.slice(0, -1);

        const query = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origins}&destinations=${destinations}&key=${API_KEY}`

        fetch(query)
            .then(checkStatus)
            .then(res => {console.log(`will not get here... ${res}`) 
                console.log(res)
            })
            .catch(err => console.log(err))

        } 
        

    }

    Equipo.remoteMethod('asignarSede', {
        http: {
            path: '/asignar',
            verb: 'post'
        },
        accepts: [
            { arg: 'users', type: 'array' },
            {arg: 'juntos', type: 'string'}
        ],
        returns: [{arg: 'jeje', type: 'string'}]
    })

};

function checkStatus(res) {
    if (res.ok) { // res.status >= 200 && res.status < 300
        return res;
    } else {
        throw Error(res);
    }
}