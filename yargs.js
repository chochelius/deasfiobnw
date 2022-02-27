//para iniciar escribir en consola: node yargs acceso -u=admin -p=1234

const yargs = require('yargs')
const child = require('child_process')
const user = 'admin'
const pasw = 1234
const argv = yargs

 .command(
    'acceso',
    'Comando de acceso a servidor Black&White',
    {
        user: {
            describe: 'Usuario',
            demand: true,
            alias: 'u',
        },
        pasw: {
            describe: 'Contraseña',
            demand: true,
            alias: 'p',
        },
    },
    (args) => {
        args.user == user && args.pasw == pasw ? child.exec('nodemon app.js', (err, stdout) => {
            err ? console.log(err) : console.log(stdout)
        }) : console.log('Credenciales incorrectas')
    }
)
.help().argv

