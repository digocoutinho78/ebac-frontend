
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); //sass precisa ser importado e chamado dessa forma -
//  gulpsass vai chamar a funcao sass e requise vai chamar o sass em si, que vai transformar o arquivo sass em css
const soucemaps = require('gulp-sourcemaps'); //cria um mapa de origem para o arquivo css, dessa forma ele 
// indica para o navegador onde o arquivo original está, facilitando a depuração, inclusive indicando a linha do arquivo original
// que gerou o arquivo css

function compilarSass(){
    return gulp.src('./source/styles/main.scss') // recebe o arquivo sass
    .pipe(soucemaps.init()) //inicia o mapa de origem
    .pipe(sass({
        outputStyle: "compressed" // transforma o codigo sass em um arquivo compactado
    })) // chama a funcao sass para compilar o arquivo
    .pipe(soucemaps.write('./build/styles/maps')) // escreve o mapa de origem no arquivo sass
    .pipe(gulp.dest('build/styles')); // salva o arquivo compilado na pasta dist/css
}

//tarefas publicas - exportadas - que podem ser chamdas por linha de comando.
//tarefas privadas nao usam exports e nao podem ser chamadas por linha de comando
//tarefas exportadas precisam de um callback para rodar, pois o gulp precisa saber quando a tarefa terminou

//callback é necessario para rodar uma tarefa exportada
function funcaoPadrao(callback){
    
    console.log("Executando via gulp");
    callback();
}

function dizOi(callback){
    console.log("Olá, mundo!");
    dizTchau();
    callback();
}


//tarefa privada - n exportada e importada acima -  não precisa de callback
function dizTchau(){
    console.log("Tchau, gulp!");
}

// //npm run gulp  - quando a tarefa é default nao precisa nomear se for rodar esta funcao
// exports.default = funcaoPadrao;

// quando não é default, precisa nomear a tarefa
//npm run gulp funcaoPadrao



// exports.default = gulp.series(funcaoPadrao, dizOi);
//dessa forma, todas as funcoes chamadas dentro do series serão executadas em sequencia



exports.default = gulp.parallel(funcaoPadrao, dizOi);
//dessa forma, todas as funcoes chamadas dentro do series serão executadas em paralelo, ao mesmo tempo, porem aguarda todos terminarem para finalizar.
//  interessante para tarefas pesadas e independentes. ex: Comprimir imagens é mais demorada que compilar o SASS, logo essas duas tarefas que não estão
//  relacionadas podem ser executadas de forma paralela.




//npm run gulp dizOi - chama somente este funcao
exports.dizOi = dizOi;
exports.sass = compilarSass; //exporta a funcao compilarSass para ser chamada por linha de comando
exports.watch = function(){
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilarSass));
} //chama a funcao compilarSass toda vez que um arquivo .scss for modificado na pasta source/styles
//neste caso, rodar npm run gulp watch para ativar o watch
//o parametro ignoreInitial: false faz com que o gulp compile o arquivo sass na primeira execução, mesmo que ele não tenha sido modificado