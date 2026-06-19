let linguagemAtual = "js";
let funcionalidadeAtual = "calculadora";

const funcionalidades = {

    calculadora: {

        titulo: "Calculadora",

        descricao:
            "Realiza operações matemáticas básicas entre dois números.",

        renderizarInputs() {

            return `
                <input
                    type="number"
                    id="num1"
                    placeholder="Primeiro número"
                >

                <input
                    type="number"
                    id="num2"
                    placeholder="Segundo número"
                >
            `;
        },

        renderizarAcoes() {

            return `
                <div class="buttons">

                    <button onclick="somar()">
                        +
                    </button>

                    <button onclick="subtrair()">
                        -
                    </button>

                    <button onclick="multiplicar()">
                        *
                    </button>

                    <button onclick="dividir()">
                        /
                    </button>

                </div>
            `;
        },

        codigos: {

            js: `function somar(a, b){
    return a + b;
}`,

            java: `public static int somar(int a, int b){
    return a + b;
}`,

            python: `def somar(a, b):
    return a + b`
        }
    },

    fatorial: {

        titulo: "Fatorial",

        descricao:
            "Calcula o fatorial de um número.",

        renderizarInputs() {

            return `
                <input
                    type="number"
                    id="numero"
                    placeholder="Digite um número"
                >
            `;
        },

        renderizarAcoes() {

            return `
                <div class="buttons">

                    <button onclick="calcularFatorial()">
                        Calcular
                    </button>

                </div>
            `;
        },

        codigos: {

            js: `function fatorial(n){

    let resultado = 1;

    for(let i = 2; i <= n; i++){
        resultado *= i;
    }

    return resultado;
}`,

            java: `public static int fatorial(int n){

    int resultado = 1;

    for(int i = 2; i <= n; i++){
        resultado *= i;
    }

    return resultado;
}`,

            python: `def fatorial(n):

    resultado = 1

    for i in range(2, n + 1):
        resultado *= i

    return resultado`
        }
    },

    fibonacci: {

        titulo: "Fibonacci",

        descricao:
            "Retorna o termo N da sequência de Fibonacci.",

        renderizarInputs() {

            return `
                <input
                    type="number"
                    id="numero"
                    placeholder="Digite o termo"
                >
            `;
        },

        renderizarAcoes() {

            return `
                <div class="buttons">

                    <button onclick="calcularFibonacci()">
                        Calcular
                    </button>

                </div>
            `;
        },

        codigos: {

            js: `function fibonacci(n){

    let a = 0;
    let b = 1;

    for(let i = 0; i < n; i++){

        let temp = a;

        a = b;
        b = temp + b;
    }

    return a;
}`,

            java: `public static int fibonacci(int n){

    int a = 0;
    int b = 1;

    for(int i = 0; i < n; i++){

        int temp = a;

        a = b;
        b = temp + b;
    }

    return a;
}`,

            python: `def fibonacci(n):

    a = 0
    b = 1

    for i in range(n):

        temp = a

        a = b
        b = temp + b

    return a`
        }
    }
};

function carregarFuncao(nome, botao = null) {

    funcionalidadeAtual = nome;

    const funcao = funcionalidades[nome];

    document.getElementById(
        "titulo-funcao"
    ).textContent = funcao.titulo;

    document.getElementById(
        "descricao-funcao"
    ).textContent = funcao.descricao;

    document.getElementById(
        "inputs-container"
    ).innerHTML = funcao.renderizarInputs();

    document.getElementById(
        "actions-container"
    ).innerHTML = funcao.renderizarAcoes();

    document.getElementById(
        "resultado"
    ).textContent = "Resultado aparecerá aqui";

    mostrarCodigo();

    if (botao) {

        document
            .querySelectorAll(".feature-btn")
            .forEach(btn =>
                btn.classList.remove(
                    "active-feature"
                )
            );

        botao.classList.add(
            "active-feature"
        );
    }
}

function trocarLinguagem(
    linguagem,
    botao
) {

    linguagemAtual = linguagem;

    document
        .querySelectorAll(".tab")
        .forEach(tab =>
            tab.classList.remove("active")
        );

    botao.classList.add("active");

    mostrarCodigo();
}

function mostrarCodigo() {

    document.getElementById(
        "codigo"
    ).textContent =
        funcionalidades[
            funcionalidadeAtual
        ].codigos[
            linguagemAtual
        ];
}

function mostrarResultado(valor) {

    document.getElementById(
        "resultado"
    ).textContent =
        `Resultado: ${valor}`;
}

/* ======================
   CALCULADORA
====================== */

function obterValores() {

    return {

        a: Number(
            document.getElementById(
                "num1"
            ).value
        ),

        b: Number(
            document.getElementById(
                "num2"
            ).value
        )
    };
}

function somar() {

    const { a, b } =
        obterValores();

    mostrarResultado(a + b);
}

function subtrair() {

    const { a, b } =
        obterValores();

    mostrarResultado(a - b);
}

function multiplicar() {

    const { a, b } =
        obterValores();

    mostrarResultado(a * b);
}

function dividir() {

    const { a, b } =
        obterValores();

    if (b === 0) {

        mostrarResultado(
            "Não é possível dividir por zero"
        );

        return;
    }

    mostrarResultado(a / b);
}

/* ======================
   FATORIAL
====================== */

function calcularFatorial() {

    const numero = Number(
        document.getElementById(
            "numero"
        ).value
    );

    let resultado = 1;

    for (
        let i = 2;
        i <= numero;
        i++
    ) {
        resultado *= i;
    }

    mostrarResultado(resultado);
}

/* ======================
   FIBONACCI
====================== */

function calcularFibonacci() {

    const numero = Number(
        document.getElementById(
            "numero"
        ).value
    );

    let a = 0;
    let b = 1;

    for (
        let i = 0;
        i < numero;
        i++
    ) {

        const temp = a;

        a = b;
        b = temp + b;
    }

    mostrarResultado(a);
}

/* ======================
   INIT
====================== */

window.onload = () => {

    carregarFuncao(
        "calculadora"
    );
};

/* ======================
   MATRIX
====================== */

function toggleMatrixMode(button){

    const body = document.body;
    const code = document.querySelector(".code");

    body.classList.toggle("matrix-mode");
    code.classList.toggle("matrix-mode");

    const ativo = body.classList.contains("matrix-mode");

    button.textContent = ativo ? "Matrix: ON" : "Matrix: OFF";
}