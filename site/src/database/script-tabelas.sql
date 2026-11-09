drop database if exists PokeDS;
create database PokeDS character set utf8mb4;
use PokeDS;

-- ------------------------------------------------------------
-- Tabela Usuario
-- ------------------------------------------------------------
create table Usuario (
    idUsuario int primary key auto_increment,
    Nome varchar(45) not null,
    Email varchar(45) not null unique,
    Senha varchar(45) not null,
    Cor_console varchar(45) default 'gold',
    Foto_perfil varchar(45) default 'eevee.png',
    Data_cadastro datetime default current_timestamp
);

-- ------------------------------------------------------------
-- Tabela Quiz
-- ------------------------------------------------------------
create table Quiz (
    idQuiz int primary key auto_increment,
    Categoria varchar(45) not null,
    Descricao varchar(45) not null
);

-- ------------------------------------------------------------
-- Tabela Perguntas (cada pergunta pertence a um Quiz)
-- Correta guarda a letra da alternativa certa: a, b, c ou d
-- ------------------------------------------------------------
create table Perguntas (
    idPerguntas int primary key auto_increment,
    Peergunta varchar(150) not null,
    Alternativa_a varchar(80) not null,
    Alternativa_b varchar(80) not null,
    Alternativa_c varchar(80) not null,
    Alternativa_d varchar(80) not null,
    Correta char(1) not null,
    FkQuiz int not null,
    constraint fk_perguntas_quiz foreign key (FkQuiz) references Quiz (idQuiz)
);

-- ------------------------------------------------------------
-- Tabela tentativas (associativa entre Usuario e Quiz)
-- idTentativa e contado por usuario e por quiz (1, 2, 3...)
-- ------------------------------------------------------------
create table tentativas (
    FkUsuario int,
    FkQuiz int,
    idTentativa int,
    data_realizacao datetime default current_timestamp,
    acertos int not null,
    primary key (FkUsuario, FkQuiz, idTentativa),
    constraint fk_tentativas_usuario foreign key (FkUsuario) references Usuario (idUsuario),
    constraint fk_tentativas_quiz foreign key (FkQuiz) references Quiz (idQuiz)
);

-- ------------------------------------------------------------
-- QUIZZES (6 categorias)
-- ------------------------------------------------------------
insert into Quiz (Categoria, Descricao) values
('Kanto',     'Perguntas sobre a primeira geração'),
('Tipos',     'Vantagens e fraquezas entre tipos'),
('Lendários', 'Pokémon lendários e místicos'),
('Evoluções', 'Como e quando cada Pokémon evolui'),
('Anime',     'Ash, Pikachu e a Equipe Rocket'),
('Jogos',     'História e curiosidades dos jogos');

-- ------------------------------------------------------------
-- PERGUNTAS (8 por quiz)
-- ------------------------------------------------------------
insert into Perguntas (Peergunta, Alternativa_a, Alternativa_b, Alternativa_c, Alternativa_d, Correta, FkQuiz) values

-- ===== KANTO =====
('Qual é o Pokémon inicial do tipo Fogo em Kanto?', 'Squirtle', 'Bulbasaur', 'Charmander', 'Pikachu', 'c', 1),
('Quem é o líder do ginásio de Pewter City?', 'Brock', 'Misty', 'Erika', 'Sabrina', 'a', 1),
('Qual Pokémon é o número 025 da Pokédex?', 'Raichu', 'Pikachu', 'Pichu', 'Meowth', 'b', 1),
('Qual é a evolução de Magikarp?', 'Dragonite', 'Lapras', 'Gyarados', 'Seadra', 'c', 1),
('Em qual cidade fica o ginásio de Misty?', 'Cerulean City', 'Vermilion City', 'Fuchsia City', 'Saffron City', 'a', 1),
('Qual Pokémon é o número 151 da Pokédex?', 'Mewtwo', 'Mew', 'Celebi', 'Ditto', 'b', 1),
('Qual item evolui Pikachu em Raichu?', 'Pedra do Fogo', 'Pedra da Água', 'Pedra do Trovão', 'Pedra da Folha', 'c', 1),
('Quantos ginásios existem em Kanto nos jogos principais?', '6', '8', '10', '12', 'b', 1),

-- ===== TIPOS =====
('O tipo Água é super efetivo contra qual tipo?', 'Planta', 'Elétrico', 'Fogo', 'Voador', 'c', 2),
('Ataques Elétricos não causam dano em qual tipo?', 'Pedra', 'Terra', 'Aço', 'Gelo', 'b', 2),
('Qual tipo é fraco contra ataques de Fogo?', 'Planta', 'Água', 'Pedra', 'Dragão', 'a', 2),
('Ataques Normais não causam dano em qual tipo?', 'Fantasma', 'Psíquico', 'Sombrio', 'Lutador', 'a', 2),
('Qual tipo surgiu na segunda geração junto com o tipo Aço?', 'Fada', 'Sombrio', 'Dragão', 'Gelo', 'b', 2),
('Qual tipo foi introduzido na sexta geração?', 'Aço', 'Sombrio', 'Fada', 'Gelo', 'c', 2),
('Ataques de Dragão são super efetivos contra qual tipo?', 'Gelo', 'Fada', 'Dragão', 'Aço', 'c', 2),
('Quais são os tipos de Gyarados?', 'Água e Dragão', 'Água e Voador', 'Água e Sombrio', 'Dragão e Voador', 'b', 2),

-- ===== LENDÁRIOS =====
('Quais são as três aves lendárias de Kanto?', 'Articuno, Zapdos e Moltres', 'Lugia, Ho-Oh e Celebi', 'Raikou, Entei e Suicune', 'Latias, Latios e Rayquaza', 'a', 3),
('Qual lendário é o mascote de Pokémon Silver?', 'Ho-Oh', 'Lugia', 'Celebi', 'Suicune', 'b', 3),
('Qual lendário é o mascote de Pokémon Sapphire?', 'Groudon', 'Rayquaza', 'Kyogre', 'Latios', 'c', 3),
('Mewtwo foi criado a partir do DNA de qual Pokémon?', 'Mew', 'Ditto', 'Celebi', 'Jirachi', 'a', 3),
('Qual destes é uma das feras lendárias de Johto?', 'Regice', 'Entei', 'Cobalion', 'Azelf', 'b', 3),
('Qual lendário para a luta entre Groudon e Kyogre?', 'Latios', 'Rayquaza', 'Deoxys', 'Dialga', 'b', 3),
('Dialga tem poder sobre qual conceito?', 'Espaço', 'Antimatéria', 'Tempo', 'Gravidade', 'c', 3),
('Qual lendário é o mascote de Pokémon Black?', 'Reshiram', 'Zekrom', 'Kyurem', 'Victini', 'a', 3),

-- ===== EVOLUÇÕES =====
('Para qual Pokémon Bulbasaur evolui primeiro?', 'Venusaur', 'Ivysaur', 'Oddish', 'Bellsprout', 'b', 4),
('Quantas evoluções diferentes o Eevee possui?', '5', '6', '8', '10', 'c', 4),
('Em qual nível Charmander evolui para Charmeleon?', '12', '16', '20', '36', 'b', 4),
('Kadabra evolui para Alakazam por meio de quê?', 'Pedra', 'Troca', 'Nível 36', 'Felicidade', 'b', 4),
('Em qual nível Magikarp evolui para Gyarados?', '10', '15', '20', '25', 'c', 4),
('Pichu evolui para Pikachu por meio de quê?', 'Felicidade', 'Pedra do Trovão', 'Nível 20', 'Troca', 'a', 4),
('Qual é a evolução final de Squirtle?', 'Wartortle', 'Blastoise', 'Gyarados', 'Golduck', 'b', 4),
('Qual evolução do Eevee é do tipo Fada?', 'Umbreon', 'Glaceon', 'Espeon', 'Sylveon', 'd', 4),

-- ===== ANIME =====
('Qual foi o primeiro Pokémon de Ash no anime?', 'Charmander', 'Pikachu', 'Bulbasaur', 'Squirtle', 'b', 5),
('Qual é a cidade natal de Ash?', 'Pallet Town', 'Viridian City', 'Cerulean City', 'Lavender Town', 'a', 5),
('Qual dupla acompanha o Meowth na Equipe Rocket?', 'Jessie e James', 'Archie e Maxie', 'Giovanni e Proton', 'Cyrus e Mars', 'a', 5),
('Qual é o nome do professor Pokémon de Pallet Town?', 'Elm', 'Oak', 'Birch', 'Rowan', 'b', 5),
('Quais amigos viajam com Ash na primeira temporada?', 'May e Max', 'Dawn e Brock', 'Misty e Brock', 'Iris e Cilan', 'c', 5),
('Qual Pokémon nasceu do ovo que Misty recebeu?', 'Psyduck', 'Staryu', 'Horsea', 'Togepi', 'd', 5),
('Em qual região Ash venceu pela primeira vez uma Liga Pokémon?', 'Kanto', 'Johto', 'Alola', 'Unova', 'c', 5),
('Qual Pokémon da Equipe Rocket sabe falar como humano?', 'Persian', 'Meowth', 'Wobbuffet', 'Arbok', 'b', 5),

-- ===== JOGOS =====
('Em que ano Pokémon Red e Green foram lançados no Japão?', '1994', '1998', '1996', '2000', 'c', 6),
('Em qual console foram lançados Pokémon Red e Blue?', 'Game Boy', 'Nintendo 64', 'Game Boy Advance', 'Nintendo DS', 'a', 6),
('Qual é a região de Pokémon Gold e Silver?', 'Hoenn', 'Sinnoh', 'Johto', 'Kanto', 'c', 6),
('Qual é a região de Pokémon Diamond e Pearl?', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'a', 6),
('Quais jogos introduziram habilidades e batalhas duplas?', 'Gold e Silver', 'Ruby e Sapphire', 'Red e Blue', 'Black e White', 'b', 6),
('Qual é o Pokémon número 001 da Pokédex Nacional?', 'Caterpie', 'Pikachu', 'Mew', 'Bulbasaur', 'd', 6),
('Qual jogo de realidade aumentada fez sucesso em 2016?', 'Pokémon GO', 'Pokémon Café', 'Pokémon Quest', 'Pokémon Masters', 'a', 6),
('Qual é a região de Pokémon Black e White?', 'Unova', 'Kalos', 'Paldea', 'Galar', 'a', 6);


select * from tentativas;

select * from usuario;