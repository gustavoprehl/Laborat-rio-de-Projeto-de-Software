-- SCHEMA: public

-- DROP SCHEMA IF EXISTS public ;

CREATE SCHEMA IF NOT EXISTS public
    AUTHORIZATION pg_database_owner;

COMMENT ON SCHEMA public
    IS 'standard public schema';

GRANT USAGE ON SCHEMA public TO PUBLIC;

GRANT ALL ON SCHEMA public TO pg_database_owner;
-- Criação das tabelas do banco de dados

CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipousuario VARCHAR(50) NOT NULL
);

CREATE TABLE Instituicao (
    instituicao_id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE Aluno (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    endereco VARCHAR(255),
    curso VARCHAR(100),
    instituicao_id INT REFERENCES Instituicao(instituicao_id),
    usuario_id INT REFERENCES Usuario(id)
);

CREATE TABLE Professor (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    saldomoedas DOUBLE PRECISION DEFAULT 0,
    cpf VARCHAR(14) NOT NULL,
    departamento VARCHAR(100),
    instituicao_id INT REFERENCES Instituicao(instituicao_id),
    usuario_id INT REFERENCES Usuario(id)
);

CREATE TABLE Empresa (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18) NOT NULL,
    usuario_id INT REFERENCES Usuario(id),
    usuario VARCHAR(255)
);

CREATE TABLE Moeda (
    moeda_id SERIAL PRIMARY KEY,
    data DATE NOT NULL
);

CREATE TABLE CodigoResgate (
    codigoresgate_id SERIAL PRIMARY KEY,
    datageracao DATE NOT NULL,
    moeda_id INT REFERENCES Moeda(moeda_id)
);

CREATE TABLE Transacao (
    transacao_id SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    moeda_id INT REFERENCES Moeda(moeda_id),
    tipo VARCHAR(50),
    quantidade INT
);

CREATE TABLE Vantagem (
    vantagem_id SERIAL PRIMARY KEY,
    descricao VARCHAR(255),
    custo DOUBLE PRECISION
);

CREATE TABLE Relatorio (
    relatorio_id SERIAL PRIMARY KEY,
    datainicio DATE NOT NULL,
    datafim DATE NOT NULL,
    instituicao_id INT REFERENCES Instituicao(instituicao_id),
    transacao_id INT REFERENCES Transacao(transacao_id)
);
