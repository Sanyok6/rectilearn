// run this using node sh.mjs [OPTIONAL_ARGS]

import { spawn } from 'child_process';

let cmd = "python3";

if (process.platform.toLowerCase() === "win32") {
    cmd = "python";
} else if (process.platform.toLowerCase() ===  "android") {
    console.log('no android users are allowed');
    process.exit(1);
}

const pySession = spawn(cmd, [process.argv[2].split(" ")]);

pySession.stdout.on('data', function (data) {
    console.log('stdout: ' + data.toString());
});
  
pySession.stderr.on('data', function (data) {
    console.log('stderr: ' + data.toString());
});
  
pySession.on('exit', function (code) {
    console.log('Python process exited with code ' + code.toString());
});