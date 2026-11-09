var Cores_Linha = {
    'Kanto': '#ff6b6b',
    'Tipos': '#5aa0ff',
    'Lendários': '#b48cf0',
    'Evoluções': '#4cc784',
    'Anime': '#f4c20d',
    'Jogos': '#9fb3c8'
};

function Dash() {
    resetar()
    dash.style.color = 'white'
    dash.style.background = 'blue'
    dash.style.boxShadow = 'none'

    if (Email_Usuario == '') {
        TelaGrande.innerHTML = `<div class="Sem-Cadastro"><h1>Faça login para ver seu progresso</h1></div>`;
        TelaBaixa.innerHTML = `<div class="Sem-Cadastro">
            <button class='botao' onclick="Login()">Entrar ou cadastrar</button></div>`;
    } else {

    TelaGrande.innerHTML = `
        <h3>Acertos por ginásio</h3>
        <div class="Grafico-Dash"><canvas id="graficoEvolucao"></canvas></div>
        <h3 id="legendaPizza"></h3>
        <div class="Grafico-Pizza"><canvas id="graficoAcertos"></canvas></div>`;
    TelaBaixa.innerHTML = `
        <div class="Dash-Baixo">
        <div class="Kpis-Dash">
            <div class="Kpi"><span id="kpiTentativas">-</span><small>Tentativas</small></div>
            <div class="Kpi"><span id="kpiPerfeitos">-</span><small>Ginásios 100%</small></div>
            <div class="Kpi"><span id="kpiUltima">-</span><small>Última vez</small></div>
        </div>
        <h4>Melhor tentativa por ginásio</h4>
        <div class="Melhores-Dash" id="listaMelhores"></div>
    </div>`;

    carregarEvolucao();
    carregarResumoQuizzes();
    carregarUltima();
    carregarAcertosErros()
}
}

function carregarUltima() {
    fetch(`/quiz/ultima-tentativa/${Email_Usuario}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                let u = document.getElementById("kpiUltima");
                if (u == null) return;
                u.innerHTML = json.ultimaTentativa ?? '-';
            });
        }
    }).catch(function (erro) { console.log(erro); });
}

function carregarEvolucao() {
    fetch(`/quiz/evolucao/${Email_Usuario}`).then(function (resposta) {
        let canvas = document.getElementById("graficoEvolucao");
        if (canvas == null) return;                   

        if (resposta.status !== 200) {
            canvas.parentElement.innerHTML = "<p>Você ainda não enfrentou nenhum ginásio.</p>";
            return;
        }

        resposta.json().then(json => {
            let porCategoria = {};
            let maiorQtd = 0;
            for (let contador = 0; contador < json.length; contador++) {
                let cat = json[contador].Categoria;
                if (porCategoria[cat] == undefined) {
                    porCategoria[cat] = [];
                }
                porCategoria[cat].push(json[contador].acertos);
                if (porCategoria[cat].length > maiorQtd) {
                    maiorQtd = porCategoria[cat].length;
                }
            }

            let labels = [];
            for (let n = 1; n <= maiorQtd; n++) {
                labels.push(`${n}ª`);
            }

            let datasets = [];
            for (let cat in porCategoria) {
                datasets.push({
                    label: cat,
                    data: porCategoria[cat],
                    borderColor: Cores_Linha[cat] || '#ffffff',
                    backgroundColor: Cores_Linha[cat] || '#ffffff',
                    tension: 0.25,
                    pointRadius: 4
                });
            }

            new Chart(canvas, {
                type: 'line',
                data: { labels: labels, datasets: datasets },
                options: {
                    maintainAspectRatio: false,
                    scales: {
                        x: { ticks: { color: '#e9f5ff' }, grid: { color: 'rgba(255,255,255,0.12)' },
                             title: { display: true, text: 'Tentativa', color: '#e9f5ff' } },
                        y: { beginAtZero: true, suggestedMax: 8,
                             ticks: { color: '#e9f5ff', stepSize: 1 }, grid: { color: 'rgba(255,255,255,0.12)' } }
                    },
                    plugins: { legend: { labels: { color: '#e9f5ff', boxWidth: 12 } } }
                }
            });
        });
    }).catch(function (erro) { console.log(erro); });
}

function carregarResumoQuizzes() {
    fetch(`/quiz/resumo/${Email_Usuario}`).then(function (resposta) {
        if (!resposta.ok) return;

        resposta.json().then(json => {
            let lista = document.getElementById("listaMelhores");
            if (lista == null) return;

            let totalTentativas = 0;
            let qtdPerfeitos = 0;
            let htmlMelhores = '';

            for (let contador = 0; contador < json.length; contador++) {
                let q = json[contador];
                let percentual = q.melhor * 100 / q.totalPerguntas;

                totalTentativas += q.tentativas;

                if (q.tentativas > 0 && q.melhor == q.totalPerguntas) {
                    qtdPerfeitos++;
                }

                htmlMelhores += `
                    <div class="Melhor-Linha">
                        <b>${q.Categoria}</b>
                        <div class="Barra"><div class="Barra-Preenchida ${q.Categoria}_Quiz" style="width:${percentual}%"></div></div>
                        <span>${q.melhor}/${q.totalPerguntas}</span>
                    </div>`;
            }

            lista.innerHTML = htmlMelhores;
            document.getElementById("kpiTentativas").innerHTML = totalTentativas;
            document.getElementById("kpiPerfeitos").innerHTML = `${qtdPerfeitos}/${json.length}`;
        });
    }).catch(function (erro) { console.log(erro); });
}

function carregarAcertosErros() {
    fetch(`/quiz/acertos-erros/${Email_Usuario}`).then(function (resposta) {
        let canvas = document.getElementById("graficoAcertos");
        if (canvas == null) return;

        if (resposta.status === 200) {
            resposta.json().then(json => {
                new Chart(canvas, {
                    type: 'doughnut',
                    data: {
                        labels: ['Acertos', 'Erros'],
                        datasets: [{ data: [json.acertos, json.erros], backgroundColor: ['#2e9e5b', '#d63c3c'] }]
                    },
                    options: {
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } }
                    }
                });

                document.getElementById("legendaPizza").innerHTML =
                    `Última tentativa: ${json.acertos} acertos e ${json.erros} erros`;
            });
        } else {
            canvas.parentElement.innerHTML = "<span>-</span>";
        }
    }).catch(function (erro) { console.log(erro); });
}