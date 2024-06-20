CREATE TABLE IF NOT EXISTS clientes (
    cliente_id SERIAL PRIMARY KEY,
    nome VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    senha VARCHAR NOT NULL,
    telefone VARCHAR NOT NULL,
    endereco VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS autores (
    autor_id SERIAL PRIMARY KEY,
    nome VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    telefone VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS livros (
    livro_id SERIAL PRIMARY KEY,
    nome VARCHAR NOT NULL,
    valor NUMERIC NOT NULL,
    estoque INT NOT NULL,
    autor_id INT REFERENCES autores(autor_id)
);

CREATE TABLE IF NOT EXISTS vendas (
    venda_id SERIAL PRIMARY KEY,
    valor NUMERIC NOT NULL,
    data DATE NOT NULL,
    cliente_id INT REFERENCES clientes(cliente_id),
    livro_id INT REFERENCES livros(livro_id)
);

-- Inserts iniciais
INSERT INTO clientes (nome, email, senha, telefone, endereco) VALUES
('Giovana Betina Barbosa', 'giovanabetinabarbosa@gmail.com', 'ZjRxDsNQt4', '27998835914', 'Rua Tancredo Neves 639, Serra-ES'),
('Gael Geraldo da Conceição', 'ggconceicao@gmail.com', 'MRalkmBOJq', '69994235684', 'Rua Modigliani 148, Porto Velho-RO'),
('Francisca Isabel Vieira', 'franvieira@gmail.com', 'kW1bnjci70', '85827093319', 'Rua Dom Henrique 182, São Luís-MA'),
('Sarah Carolina da Conceição', 'ssarahcarolinadaconceicao@gmail.com', '54bOsJjloe', '71387384988', 'Rua Poeta Evaristo de Souza 460, Natal-RN'),
('Vitor Martin Pinto', 'vvitormartinpinto@gmail.com', 'GGh0SmQ5Wo', '13720467392', 'Rua Quarenta e Nove 356, São Luís-MA');

INSERT INTO autores (nome, email, telefone) VALUES
('Carolina Milena Almada', 'ccarolinamilenaalmada@gmail.com', '83996565550'),
('Yago Raul da Rocha', 'yyagorauldarocha@gmail.com', '63987932013'),
('César Lucca Alves', 'cesarluccaalv@gmail.com', '63998823896');

INSERT INTO livros (nome, valor, estoque, autor_id) VALUES
('APIs em Node.js', 90, 25, 1),
('JavaScript Moderno', 60, 5, 1),
('Express na Prática', 45, 35, 1),
('Bancos de Dados Relacionais', 130, 15, 2),
('Bancos de Dados NoSQL', 110, 2, 3),
('Autenticação e Autorização em APIs', 70, 60, 3);

INSERT INTO vendas (valor, data, cliente_id, livro_id) VALUES
(90, '2000-08-10', 1, 1),
(60, '2000-10-20', 1, 2),
(130, '2000-10-12', 1, 4),
(60, '2000-01-6', 2, 2),
(45, '2000-03-2', 2, 3),
(110, '2000-04-9', 2, 5),
(90, '2000-02-11', 3, 1),
(60, '2000-04-15', 3, 2),
(45, '2000-05-14', 3, 3),
(130, '2000-06-12', 3, 4),
(110, '2000-09-19', 3, 5),
(70, '2000-12-20', 3, 6),
(110, '2000-11-2', 4, 5),
(70, '2000-11-9', 4, 6),
(45, '2000-12-14', 5, 3);
