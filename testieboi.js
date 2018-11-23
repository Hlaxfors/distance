a = input();

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
            return keys;
        }
    }


    stdin.on('data', keys => respondToInput(keys));
}

console.log(a);
