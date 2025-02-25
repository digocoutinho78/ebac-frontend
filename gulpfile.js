const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); //sass precisa ser importado e chamado dessa forma -
//  gulpsass vai chamar a funcao sass e requise vai chamar o sass em si, que vai transformar o arquivo sass em css
const soucemaps = require('gulp-sourcemaps'); //cria um mapa de origem para o arquivo css, dessa forma ele 
// indica para o navegador onde o arquivo original está, facilitando a depuração, inclusive indicando a linha do arquivo original
// que gerou o arquivo css
const uglify = require('gulp-uglify'); //comprime o arquivo javascript
const imagemin = require('gulp-imagemin'); //comprime o arquivo de imagem

const obfuscate = require('gulp-obfuscate'); //obfusca o arquivo javascript, dificultando a leitura do código

function comprimeImagens(){
    return gulp.src('./source/images/**/*') // ** procura em todas as subpastas
    .pipe(imagemin()) // comprime o arquivo de imagem
    .pipe(gulp.dest('build/images')); // salva o arquivo comprimido na pasta dist/images
}

function comprimeJavascript(){
    return gulp.src('./source/scripts/**/*.js') // ** procura em todas as subpastas
    .pipe(uglify()) // comprime o arquivo javascript
    .pipe(obfuscate()) // obfusca o arquivo javascript
        .pipe(gulp.dest('build/scripts')); // salva o arquivo comprimido na pasta dist/js
    }

function compilarSass(){
    return gulp.src('./source/styles/main.scss') // recebe o arquivo sass
    .pipe(soucemaps.init()) //inicia o mapa de origem
    .pipe(sass({
        outputStyle: "compressed" // transforma o codigo sass em um arquivo compactado
    })) // chama a funcao sass para compilar o arquivo
    .pipe(soucemaps.write('./build/styles/maps')) // escreve o mapa de origem no arquivo sass
    .pipe(gulp.dest('build/styles')); // salva o arquivo compilado na pasta dist/css
}


exports.default = function(){
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilarSass));
    gulp.watch('./source/scripts/*.js', { ignoreInitial: false }, gulp.series(comprimeJavascript));
    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(comprimeImagens));
} //chama a funcao compilarSass toda vez que um arquivo .scss for modificado na pasta source/styles
//neste caso, rodar npm run gulp watch para ativar o watch
//o parametro ignoreInitial: false faz com que o gulp compile o arquivo sass na primeira execução, mesmo que ele não tenha sido modificado

// rodar com npm run gulp