var city1, city2;
var lock = 0;
var stdin  = process.stdin;
var stdout = process.stdout;
stdin.resume();
stdin.setEncoding('utf8');


stdout.write('Enter your first point: ');


function respondToInput(keys) {
    if (lock == 0) {
        stdout.write('Your first point is ' + keys);
        lock = 1;
        stdout.write('Enter your second point: ');
        city1 = keys;
    } else {
        stdout.write('Your second point is ' + keys);
        stdin.pause();
        city2 = keys;
        
        
        const https = require('https');
        https.get('https://api.opencagedata.com/geocode/v1/json?q=' + city1 + '&key=df5553c20cd8431fa69cb5bd77ba054e', (resp) => {
            let data = '';
    
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
        
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                const city1Info = JSON.parse(data).results[0];

                // console.log(city1Info.geometry.lat);
                // console.log(city1Info.geometry.lng);
                
                
                https.get('https://api.opencagedata.com/geocode/v1/json?q=' + city2 + '&key=df5553c20cd8431fa69cb5bd77ba054e', (resp) => {
                    let data = '';
            
                    // A chunk of data has been recieved.
                    resp.on('data', (chunk) => {
                        data += chunk;
                    })
                
                    // The whole response has been received. Print out the result.
                    resp.on('end', () => {
                        const city2Info = JSON.parse(data).results[0];

                        // console.log(city2Info.geometry.lat);
                        // console.log(city2Info.geometry.lng);
                        
                        // (latitude/Y axis, longitude/X axis)
                        var pointA = [city1Info.geometry.lat, city1Info.geometry.lng];
                        var pointB = [city2Info.geometry.lat, city2Info.geometry.lng];
                        
                        console.log('\x1b[36m%s\x1b[0m', 'The distance from ' + city1Info.formatted + ' to ' + city2Info.formatted + ' is ' + calcDist(pointA, pointB) + 'km');
                        
                        /**
                         * take 2 lat/long points and calculate the distence in meters
                         * 
                         * @param {Array<number>} coord1 first point
                         * @param {Array<number>} coord2 second point
                         * @returns {number} distence in meters
                         */
                        function calcDist(coord1, coord2) {

                            var R = 6371e3; // metres
                            var lat1 = coord1[0]* Math.PI / 180;
                            var lat2 = coord2[0]* Math.PI / 180;
                            var Δlat = (coord2[0]-coord1[0])* Math.PI / 180;
                            var Δlon = (coord2[1]-coord1[1])* Math.PI / 180;

                            var a = Math.sin(Δlat/2) * Math.sin(Δlat/2) +
                                    Math.cos(lat1) * Math.cos(lat2) *
                                    Math.sin(Δlon/2) * Math.sin(Δlon/2);
                            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

                            var d = R * c;
                            return (d / 1000).toFixed(2);
                        }
        
                    });

                });

            });

        }

    )}

}
stdin.on('data', keys => respondToInput(keys));