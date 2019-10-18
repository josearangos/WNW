'use strict';
var app = require('../../server/server');
const fetch = require('node-fetch');

const calcularDistancia = (origen, destino) => {
    const R = 6378;
    
    let deltaLat = destino.latitud - origen.latitud;
    let deltaLong = destino.longitud - origen.longitud;
}


module.exports = function(Equipo) {
    Equipo.asignarSede = async function (users, juntos, callback) {
        let API_KEY = 'AIzaSyBFsf5rZfPbS1_i_8CmwTJLYCFzTo_yLDo';
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

        let distances = await fetch(query)
        distances = await distances.json()
        let rows = distances.rows

        let _rows = rows.length
        let mejoresSedes = [];
        
        if (juntos === 'false') {
            
            for (let i = 0; i < _rows; i++) {
                let row = rows[i].elements;
                let _columns = row.length;

                let minDistance = row[0].distance.value
                let minIndex = 0;
                console.log(minDistance)

                for (let j = 0; j < _columns; j++) {
                    let actualDistance = row[i].distance.value;
                    if (actualDistance < minDistance) {
                        minDistance = actualDistance;
                        minIndex = j;
                    }
                }
                mejoresSedes.push(minIndex)
            } 

            console.log(mejoresSedes)

            let myRes = []

            for (let i = 0; i < mejoresSedes.length; i++) {
                myRes.push(distances.destination_addresses[mejoresSedes[i]])
            }

            callback(null, myRes)
        }

        // fetch(query).then((res) => {
        //     return res.json();
            
        // }).then((myJSON) => {
        //     console.log(myJSON.rows);
            
        // })

        // console.log(distances)
        
        

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
        returns: {arg: 'response', type: 'string'}
    })

};

function checkStatus(res) {
    if (res.ok) { // res.status >= 200 && res.status < 300
        return res;
    } else {
        throw Error(res);
    }
}