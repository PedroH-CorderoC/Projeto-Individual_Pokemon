function Dicas() {
    resetar()
    Dicas_quiz.style.color = 'white'
    Dicas_quiz.style.background = 'blue'
    Dicas_quiz.style.boxShadow = 'none'

    TelaGrande.innerHTML = `<h1>Selecione o Ginasio que deseja conhecer sobre</h1><br><div class="Tipos-Quiz" id='TipoQuiz'></div>`

    TelaBaixa.innerHTML = `<div class="Home-Pequeno"><h4>Os Ginasios Estão te esperando Treinador</h4><br> Selecione quem deseja conhecer</div>`;

   fetch(`/quiz/listar`, {
            method: "GET"
        }).then(function (resultado) {
            console.log("ESTOU NO THEN DO Listar()!")

            if (resultado.ok) {
                console.log(resultado);

                resultado.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    for (let contador = 0; contador < json.length; contador++) {
                    document.getElementById("TipoQuiz").innerHTML +=
                    `<div class='Card-Quiz ${json[contador].Categoria}_Quiz' onclick="Mostrar_dicas_${json[contador].idQuiz}()">
                        <h3>${json[contador].Categoria}</h3>
                        <p>${json[contador].Descricao}</p>
                    </div>`;   
                    }
                });

            } else {
                console.log("Houve um erro ao buscar o perfil!");

                resultado.text().then(texto => {
                    console.error(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })
}


function Mostrar_dicas_1() {

            TelaGrande.innerHTML = `
                <div class='Card-Quiz Kanto_Quiz'>
                <div class='Dicas-Card'>
                    <h1>Dicas do Ginásio Kanto</h1><br>
                    <div class="Card-Dica">
                    <p>
                        A jornada de todo fã de Pokémon costuma começar pelo mesmo lugar: a região de Kanto, o berço onde tudo começou nos jogos clássicos de Game Boy. 
                        É lá que o Professor Oak entrega a novatos o seu primeiro companheiro de jornada. Quem escolhe o caminho da coragem geralmente parte com o clássico Charmander, 
                        o lagarto de fogo cuja cauda chamejante reflete sua energia vital. Conforme o treinador explora as rotas, ele cruza com dezenas de criaturas marcantes, como o famoso Pikachu, 
                        catalogado oficialmente como o número 025 na Pokédex Nacional, e o assustadoramente poderoso Mew, a criatura número 151 que encerra a primeira lista oficial. 
                        Pelo caminho, os aventureiros enfrentam líderes de ginásio locais sendo o severo Brock o primeiro guardião de pedra em Pewter City, 
                        e a especialista em água Misty comandando as correntes em Cerulean City. Para quem persiste e evolui seus companheiros, 
                        monstros inicialmente frágeis como Magikarp revelam um potencial destruidor ao se transformarem no imponente Gyarados. 
                        E para aqueles dias em que a jornada exige um empurrãozinho tecnológico, usar uma Pedra do Trovão é o segredo para fazer o fiel Pikachu atingir novos patamares. 
                        No total, os aspirantes a Mestre Pokémon precisam desafiar 8 ginásios oficiais antes de carimbarem seu passaporte para a Liga.
                    </p></div>
                </div>
                </div>`;

            TelaBaixa.innerHTML = `
                <div class="Sem-Cadastro">
                    <p>Deseja conhecer outros Ginasios?</p>
                    <p>Clique no Botão e Descubra mais sobre os desafios</p>
                    <button class='botao' onclick="Dicas()">Ver Outras Dicas</button>
                </div>`;
}

function Mostrar_dicas_2() {

            TelaGrande.innerHTML = `
                <div class='Card-Quiz Tipos_Quiz'>
                <div class='Dicas-Card'>
                    <h1>Dicas do Ginásio Tipos</h1><br>
                    <div class="Card-Dica">
                    <p>
                        O sistema de combate de Pokémon é baseado em uma intrincada rede de forças e fraquezas elementares que decide batalhas em segundos. 
                        Dominar a tabela de tipos é essencial: um ataque do tipo Água, por exemplo, é altamente eficaz e considerado Fogo do adversário, causando dano dobrado. 
                        Por outro lado, a física do jogo impõe regras rígidas de imunidade: golpes Elétricos não afetam absolutamente nada quando usados contra o tipo Terra, 
                        assim como ataques Normais simplesmente atravessam o corpo de criaturas do tipo Fantasma sem arranhá-las. 
                        A evolução do jogo trouxe novos equilíbrios estratégicos ao longo dos anos; a segunda geração introduziu o tipo Sombrio (junto com o Aço) para conter o domínio dos psíquicos, 
                        enquanto a sexta geração trouxe o gracioso e poderoso tipo Fada para equilibrar a força avassaladora dos dragões
                        embora, irônica e diretamente, ataques do tipo Dragão continuem sendo a única resposta superefetiva para ferir outros Dragões. 
                        No fim, criaturas podem acumular afinidades, como o temido Gyarados, que carrega a dupla identidade de Água e Voador.
                    </p></div>
                </div>
                </div>`;

            TelaBaixa.innerHTML = `
                <div class="Sem-Cadastro">
                    <p>Deseja conhecer outros Ginasios?</p>
                    <p>Clique no Botão e Descubra mais sobre os desafios</p>
                    <button class='botao' onclick="Dicas()">Ver Outras Dicas</button>
                </div>`;
}

function Mostrar_dicas_3() {

            TelaGrande.innerHTML = `
                <div class='Card-Quiz Lendários_Quiz'>
                <div class='Dicas-Card'>
                    <h1>Dicas do Ginásio Lendários</h1><br>
                    <div class="Card-Dica">
                    <p>
                        Escondidos nos recantos mais profundos do mundo Pokémon, habitam seres de poder imensurável que desafiam as leis da natureza e estrelam as lendas de cada região. 
                        Na mítica Kanto, o céu é vigiado pelas chamadas três aves lendárias: Articuno, Zapdos e Moltres. Conforme os jogos expandiram seus horizontes geográficos, 
                        novas divindades assumiram o posto de mascotes das capas dos cartuchos, como o majestoso Lugia, que estampa a versão Silver, e o colossal Kyogre, guardião das profundezas oceânicas em Sapphire. 
                        Muitas dessas lendas carregam origines científicas ou cósmicas profundas: o infame clone Mewtwo, por exemplo, foi geneticamente engenheirado a partir do DNA extraído do raro Mew. 
                        Em Johto, o solo é abençoado pelos galopes velozes das feras lendárias, grupo do qual faz parte o feroz Entei. Quando forças primordiais entram em rota de colisão 
                        como a briga eterna entre Groudon e Kyogre, é preciso a intervenção do guardião supremo dos céus, Rayquaza, para cessar o caos. No tecido da própria realidade, 
                        entidades cósmicas controlam conceitos fundamentais do universo; é o caso de Dialga, cuja soberania absoluta governa o fluxo do Tempo. 
                        Já nas metrópoles industriais de Unova, o fogo da verdade brilha através do imponente Reshiram, mascote da edição Black.
                    </p></div>
                </div>
                </div>`;

            TelaBaixa.innerHTML = `
                <div class="Sem-Cadastro">
                    <p>Deseja conhecer outros Ginasios?</p>
                    <p>Clique no Botão e Descubra mais sobre os desafios</p>
                    <button class='botao' onclick="Dicas()">Ver Outras Dicas</button>
                </div>`;
}

function Mostrar_dicas_4() {

            TelaGrande.innerHTML = `
                <div class='Card-Quiz Evoluções_Quiz'>
                <div class='Dicas-Card'>
                    <h1>Dicas do Ginásio Evoluções</h1><br>
                    <div class="Card-Dica">
                    <p>
                        Poucas coisas são tão gratificantes na jornada quanto ver um Pokémon crescer, mudar de forma e ficar mais forte. 
                        O processo de desenvolvimento varia drasticamente dependendo da espécie. Alguns iniciam sua linhagem de forma humilde, a exemplo do Bulbasaur, 
                        que dá seu primeiro passo rumo à maturidade ao evoluir para Ivysaur tentando atingir sua forma final Venusaur. Outros possuem caminhos incrivelmente ramificados, 
                        como o instigante Eevee, famoso por alcançar até 8 evoluções distintas dependendo de estímulos externos. O fator nível é o gatilho mais comum: 
                        é exatamente ao atingir o nível 16 que o impulsivo Charmander ganha mais maturidade como Charmeleon, e é preciso paciência até o nível 20 para que o 
                        inútil Magikarp finalmente se transforme no gigante Gyarados. Contudo, a força bruta nem sempre basta; alguns parceiros exigem laços afetivos profundos, 
                        fazendo com que o adorável bebê Pichu evolua para Pikachu estritamente através do sistema de Felicidade. Há também criaturas que dependem de interações sociais e comerciais para desbloquear seu potencial máximo, 
                        como o místico Kadabra, que salta para sua forma final, Alakazam, unicamente através de uma Troca entre treinadores. No fim da linha evolutiva dos iniciais de água de Kanto, 
                        o robusto Squirtle encontra seu ápice na força titânica de Blastoise. E para quem deseja explorar as ramificações do Eevee rumo ao lado místico e gracioso,
                        a elegante Sylveon coroa esse caminho como representante do tipo Fada.
                    </p></div>
                </div>
                </div>`;

            TelaBaixa.innerHTML = `
                <div class="Sem-Cadastro">
                    <p>Deseja conhecer outros Ginasios?</p>
                    <p>Clique no Botão e Descubra mais sobre os desafios</p>
                    <button class='botao' onclick="Dicas()">Ver Outras Dicas</button>
                </div>`;
}

function Mostrar_dicas_5() {

            TelaGrande.innerHTML = `
                <div class='Card-Quiz Anime_Quiz'>
                <div class='Dicas-Card'>
                    <h1>Dicas do Ginásio Anime</h1><br>
                    <div class="Card-Dica">
                    <p>
                        Para quem conheceu a franquia através da televisão, o universo Pokémon é sinônimo de amizade, descobertas e muitas gargalhadas proporcionadas por figuras inesquecíveis. 
                        A odisseia de Ash Ketchum começou oficialmente na pacata Pallet Town, quando o garoto recebeu das mãos do Professor Oak o seu inseparável e teimoso parceiro, Pikachu, 
                        marcando o início de sua longa carreira. Pelas estradas do mundo, o jovem herói não andava sozinho: na primeira fase de suas aventuras, ele formou uma dupla icônica ao lado de Misty e Brock. 
                        A rotina do grupo, no entanto, raramente era tranquila, pois eles eram constantemente perseguidos pelo trio mais atrapalhado do crime: 
                        Jessie e James, que integravam as operações da Equipe Rocket sempre acompanhados de seu falante e espirituoso Meowth, um dos raros Pokémon capazes de se comunicar abertamente usando a linguagem humana. 
                        Pelo caminho, surpresas nasciam nos lugares mais improváveis, como o misterioso ovo que Misty cuidou com carinho até ver nascer o brincalhão Togepi. 
                        Anos de dedicação, suor e incontáveis batalhas moldaram a trajetória de Ash até o dia histórico em que ele finalmente conquistou o topo do pódio, 
                        erguendo o troféu de campeão da Liga pela primeira vez na tropical região de Alola.
                    </p></div>
                </div>
                </div>`;

            TelaBaixa.innerHTML = `
                <div class="Sem-Cadastro">
                    <p>Deseja conhecer outros Ginasios?</p>
                    <p>Clique no Botão e Descubra mais sobre os desafios</p>
                    <button class='botao' onclick="Dicas()">Ver Outras Dicas</button>
                </div>`;
}

function Mostrar_dicas_6() {

            TelaGrande.innerHTML = `
                <div class='Card-Quiz Jogos_Quiz'>
                <div class='Dicas-Card'>
                    <h1>Dicas do Ginásio Jogos</h1><br>
                    <div class="Card-Dica">
                    <p>
                        O fenômeno cultural que parou o mundo começou discretamente no Japão no ano de 1996, quando as primeiras versões dos jogos viram a luz do dia e revolucionaram a indústria dos portáteis, 
                        encontrando seu lar perfeito no clássico console Game Boy. O sucesso estrondoso pavimentou o caminho para continuações brilhantes ambientadas em novos horizontes, como a charmosa Johto em Gold e Silver, 
                        ou a fria e montanhosa região de Sinnoh em Diamond e Pearl. Com o avanço tecnológico para o Game Boy Advance, a franquia deu um salto técnico gigantesco em Ruby e Sapphire, 
                        jogos que marcaram a história ao introduzirem as mecânicas de habilidades passivas e as eletrizantes batalhas duplas. Para organizar o caos de centenas de novas descobertas, 
                        a comunidade científica do jogo adotou uma numeração padrão encabeçada pelo clássico Bulbasaur, o guardião oficial do registro número 001 na Pokédex Nacional. 
                        Décadas mais tarde, a febre migrou das telas dos consoles tradicionais para as ruas com o lançamento em 2016 do revolucionário aplicativo de realidade aumentada Pokémon GO, 
                        transformando calçadas do mundo todo em zonas de captura. A linha do tempo principal continuou a expandir suas fronteiras geográficas nas gerações seguintes, 
                        levando os jogadores a explorar cenários inspirados no mundo real, como a industrial e moderna Unova em Black e White.
                    </p></div>
                </div>
                </div>`;

            TelaBaixa.innerHTML = `
                <div class="Sem-Cadastro">
                    <p>Deseja conhecer outros Ginasios?</p>
                    <p>Clique no Botão e Descubra mais sobre os desafios</p>
                    <button class='botao' onclick="Dicas()">Ver Outras Dicas</button>
                </div>`;
}