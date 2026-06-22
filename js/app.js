let linguagemAtual = "js";
let funcionalidadeAtual = "calculadora";

const actionRegistry = {};

/* ======================
   REGISTRY DE AÇÕES
====================== */

function registrarAcao(nome, fn) {
    actionRegistry[nome] = fn;
}

function executar(acao) {
    const fn = actionRegistry[acao];

    if (!fn) {
        console.warn("Ação não encontrada:", acao);
        return;
    }

    fn();
}

/* ======================
   INPUTS (ROBUSTO)
====================== */

function obterInputs(inputs) {

    const data = {};

    (inputs || []).forEach(input => {
        const raw = document.getElementById(input.id)?.value;

        // evita bug de string vazia virar 0 silencioso
        data[input.id] = raw === "" ? null : Number(raw);
    });

    return data;
}

/* ======================
   RENDER UI
====================== */

function renderInputs(inputs) {
    return (inputs || []).map(input => `
        <input
            id="${input.id}"
            type="${input.type || "text"}"
            placeholder="${input.placeholder || ""}"
        >
    `).join("");
}

function renderActions(actions) {
    return `
        <div class="buttons">
            ${(actions || []).map(btn => `
                <button data-action="${btn.action}">
                    ${btn.label}
                </button>
            `).join("")}
        </div>
    `;
}

/* ======================
   FUNCIONALIDADES
====================== */

const funcionalidades = {

    calculadora: {

        titulo: "Calculadora",
        descricao: "Realiza operações matemáticas básicas entre dois números.",

        inputs: [
            { id: "num1", type: "number", placeholder: "Primeiro número" },
            { id: "num2", type: "number", placeholder: "Segundo número" }
        ],

        actions: [
            {
                label: "+",
                action: "somar",
                logic: ({ num1, num2 }) => num1 + num2
            },
            {
                label: "-",
                action: "subtrair",
                logic: ({ num1, num2 }) => num1 - num2
            },
            {
                label: "*",
                action: "multiplicar",
                logic: ({ num1, num2 }) => num1 * num2
            },
            {
                label: "/",
                action: "dividir",
                logic: ({ num1, num2 }) => {
                    if (num1 == null || num2 == null) return "Preencha os campos";
                    if (num2 === 0) return "Erro: divisão por zero";
                    return num1 / num2;
                }
            }
        ],

        codigos: {
            js: `function somar(a, b){ return a + b; }`,
            java: `public static int somar(int a, int b){ return a + b; }`,
            python: `def somar(a, b): return a + b`
        }
    },

    fatorial: {

        titulo: "Fatorial",
        descricao: "Calcula o fatorial de um número.",

        inputs: [
            { id: "numero", type: "number", placeholder: "Digite um número" }
        ],

        actions: [
            {
                label: "Calcular",
                action: "calcularFatorial",
                logic: ({ numero }) => {
                    if (numero == null) return "Informe um número";

                    let r = 1;
                    for (let i = 2; i <= numero; i++) r *= i;
                    return r;
                }
            }
        ],

        codigos: {
            js: `function fatorial(n){ let r=1; for(let i=2;i<=n;i++) r*=i; return r; }`,
            java: `public static int fatorial(int n){ int r=1; for(int i=2;i<=n;i++) r*=i; return r; }`,
            python: `def fatorial(n): r=1; [r:=r*i for i in range(2,n+1)]; return r`
        }
    },

    fibonacci: {

        titulo: "Fibonacci",
        descricao: "Retorna o termo N da sequência de Fibonacci.",

        inputs: [
            { id: "numero", type: "number", placeholder: "Digite o termo" }
        ],

        actions: [
            {
                label: "Calcular",
                action: "calcularFibonacci",
                logic: ({ numero }) => {
                    if (numero == null) return "Informe o termo";

                    let a = 0, b = 1;

                    for (let i = 0; i < numero; i++) {
                        [a, b] = [b, a + b];
                    }

                    return a;
                }
            }
        ],

        codigos: {
            js: `function fibonacci(n){ let a=0,b=1; for(let i=0;i<n;i++){let t=a;a=b;b=t+b;} return a; }`,
            java: `public static int fibonacci(int n){ int a=0,b=1; for(int i=0;i<n;i++){int t=a;a=b;b=t+b;} return a; }`,
            python: `def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a`
        }
    },

    palindromo: {

        titulo: "Palíndromo",
        descricao: "Verifica se uma palavra ou frase é igual quando lida de trás para frente.",

        inputs: [
            { id: "texto", type: "text", placeholder: "Digite uma palavra" }
        ],

        actions: [
            {
                label: "Verificar",
                action: "isPalindrome",
                logic: ({ texto }) => {

                    const normalizado = texto
                        .toLowerCase()
                        .replace(/\s/g, "");

                    const reverso = normalizado
                        .split("")
                        .reverse()
                        .join("");

                    return normalizado === reverso;
                }
            }
        ],

        codigos: {
            js: `function isPalindrome(str){
        str = str.toLowerCase().replace(/\\s/g,"");
        return str === str.split("").reverse().join("");
    }`,

            java: `public static boolean isPalindrome(String str){
        str = str.toLowerCase().replace(" ", "");
        String rev = new StringBuilder(str).reverse().toString();
        return str.equals(rev);
    }`,

            python: `def is_palindrome(s):
        s = s.lower().replace(" ", "")
        return s == s[::-1]`
        }
    },

    reverseString: {

        titulo: "Reverter String",
        descricao: "Inverte os caracteres de uma string.",

        inputs: [
            { id: "texto", type: "text", placeholder: "Digite um texto" }
        ],

        actions: [
            {
                label: "Reverter",
                action: "reverseString",
                logic: ({ texto }) => {

                    return texto
                        .split("")
                        .reverse()
                        .join("");
                }
            }
        ],

        codigos: {
            js: `function reverseString(str){
        return str.split("").reverse().join("");
    }`,

            java: `public static String reverseString(String str){
        return new StringBuilder(str).reverse().toString();
    }`,

            python: `def reverse_string(s):
        return s[::-1]`
        }
    },

    contarVogais: {

    titulo: "Contar Vogais",
    descricao: "Conta quantas vogais existem em uma string.",

    inputs: [
        { id: "texto", type: "text", placeholder: "Digite um texto" }
    ],

    actions: [
        {
            label: "Contar",
            action: "countVowels",
            logic: ({ texto }) => {

                const vogais = "aeiouAEIOU";

                return texto
                    .split("")
                    .filter(char => vogais.includes(char))
                    .length;
            }
        }
    ],

    codigos: {
        js: `function countVowels(str){
    const v = "aeiouAEIOU";
    return str.split("").filter(c => v.includes(c)).length;
}`,

        java: `public static int countVowels(String str){
    String v = "aeiouAEIOU";
    int count = 0;
    for(char c : str.toCharArray()){
        if(v.indexOf(c) != -1) count++;
    }
    return count;
}`,

        python: `def count_vowels(s):
    return sum(1 for c in s if c.lower() in "aeiou")`
    }
},

capitalizar: {

    titulo: "Capitalizar Palavras",
    descricao: "Coloca a primeira letra de cada palavra em maiúsculo.",

    inputs: [
        { id: "texto", type: "text", placeholder: "Digite uma frase" }
    ],

    actions: [
        {
            label: "Capitalizar",
            action: "capitalizeWords",
            logic: ({ texto }) => {

                return texto
                    .split(" ")
                    .map(word =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ");
            }
        }
    ],

    codigos: {
        js: `function capitalizeWords(str){
    return str
        .split(" ")
        .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
}`,

        java: `public static String capitalizeWords(String str){
    String[] parts = str.split(" ");
    StringBuilder sb = new StringBuilder();

    for(String p : parts){
        sb.append(
            p.substring(0,1).toUpperCase() +
            p.substring(1).toLowerCase()
        ).append(" ");
    }

    return sb.toString().trim();
}`,

        python: `def capitalize_words(s):
    return " ".join(w.capitalize() for w in s.split())`
    }
},

};

/* ======================
   INIT ACTIONS
====================== */

function inicializarAcoes() {

    Object.values(funcionalidades).forEach(func => {

        (func.actions || []).forEach(action => {

            registrarAcao(action.action, () => {

                const inputs = obterInputs(func.inputs);
                const resultado = action.logic(inputs);

                mostrarResultado(resultado);
            });

        });

    });
}

/* ======================
   LOAD FUNCTION
====================== */

function carregarFuncao(nome) {

    funcionalidadeAtual = nome;

    const funcao = funcionalidades[nome];

    document.getElementById("titulo-funcao").textContent = funcao.titulo;
    document.getElementById("descricao-funcao").textContent = funcao.descricao;

    document.getElementById("inputs-container").innerHTML =
        renderInputs(funcao.inputs);

    document.getElementById("actions-container").innerHTML =
        renderActions(funcao.actions);

    document.getElementById("resultado").textContent =
        "Resultado aparecerá aqui";

    mostrarCodigo();

    document.querySelectorAll(".feature-btn")
        .forEach(btn => btn.classList.remove("active-feature"));

    const ativo = document.querySelector(
        `.feature-btn[data-funcao="${nome}"]`
    );

    if (ativo) {
        ativo.classList.add("active-feature");
    }
}

/* ======================
   UI CONTROLS
====================== */

function trocarLinguagem(linguagem, botao) {

    linguagemAtual = linguagem;

    document.querySelectorAll(".tab")
        .forEach(tab => tab.classList.remove("active"));

    botao.classList.add("active");

    mostrarCodigo();
}

function mostrarCodigo() {
    document.getElementById("codigo").textContent =
        funcionalidades[funcionalidadeAtual].codigos[linguagemAtual];
}

function mostrarResultado(valor) {
    document.getElementById("resultado").textContent = `Resultado: ${valor}`;
}

/* ======================
   SIDEBAR
====================== */

function renderSidebar() {

    const container = document.getElementById("menu-funcoes");

    container.innerHTML = Object.entries(funcionalidades).map(([key, func]) => {

        return `
            <button
                class="feature-btn"
                data-funcao="${key}"
                onclick="carregarFuncao('${key}')"
            >
                ▸ ${func.titulo}
            </button>
        `;
    }).join("");
}

/* ======================
   BOOT
====================== */

window.onload = () => {
    inicializarAcoes();
    renderSidebar();
    carregarFuncao("calculadora");
};

/* ======================
   EVENT DELEGATION
====================== */

document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    executar(btn.dataset.action);
});

/* ======================
   MATRIX MODE
====================== */

function toggleMatrixMode(button) {

    const body = document.body;
    const code = document.querySelector(".code");

    body.classList.toggle("matrix-mode");
    code.classList.toggle("matrix-mode");

    const ativo = body.classList.contains("matrix-mode");

    button.textContent = ativo ? "Matrix: ON" : "Matrix: OFF";
}