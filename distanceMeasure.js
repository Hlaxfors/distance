input();




// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://api.opencagedata.com/geocode/v1/json?q=' + city1 + '&key=df5553c20cd8431fa69cb5bd77ba054e', true);

request.onload = function () {
  // Begin accessing JSON data here
  }
}

// Send request
request.send();














// (latitude/Y axis, longitude/X axis)
var pointA = [-33.865143, 151.209900];
var pointB = [-37.815018, 144.946014];

console.log(calcDist(pointA, pointB));

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
    return d;
}


function input() {
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
        } else {
            stdout.write('Your second point is ' + keys);
            stdin.pause();
        }
    }


    stdin.on('data', keys => respondToInput(keys));
}