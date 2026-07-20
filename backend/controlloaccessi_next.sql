-- UTENTI

DROP TABLE IF EXISTS utenti;
CREATE TABLE utenti (
    id int unsigned PRIMARY KEY AUTO_INCREMENT,
    account_dominio varchar(100) NOT NULL UNIQUE,
    nome varchar(100) NOT NULL,
    cognome varchar(100) NOT NULL DEFAULT '',

    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by int unsigned NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by int unsigned NOT NULL,
    is_active boolean NOT NULL DEFAULT TRUE
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;


-- RUOLI

DROP TABLE IF EXISTS ruoli;
CREATE TABLE ruoli (
    id int unsigned PRIMARY KEY AUTO_INCREMENT,
    codice varchar(100) NOT NULL UNIQUE,
    descrizione varchar(100) NOT NULL DEFAULT '',

    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by int unsigned NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by int unsigned NOT NULL,
    is_active boolean NOT NULL DEFAULT TRUE
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;


-- PERMESSI

DROP TABLE IF EXISTS permessi;
CREATE TABLE permessi (
    id int unsigned PRIMARY KEY AUTO_INCREMENT,
    codice varchar(100) NOT NULL UNIQUE,
    descrizione varchar(100) NOT NULL DEFAULT '',

    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by int unsigned NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by int unsigned NOT NULL,
    is_active boolean NOT NULL DEFAULT TRUE
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;


-- UTENTI_RUOLI

DROP TABLE IF EXISTS utenti_ruoli;
CREATE TABLE utenti_ruoli (
    id int unsigned PRIMARY KEY AUTO_INCREMENT,
    utente_id int unsigned NOT NULL,
    ruolo_id int unsigned NOT NULL,

    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by int unsigned NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by int unsigned NOT NULL,
    is_active boolean NOT NULL DEFAULT TRUE,

    FOREIGN KEY (utente_id) REFERENCES utenti(id) ON DELETE CASCADE,
    FOREIGN KEY (ruolo_id) REFERENCES ruoli(id) ON DELETE CASCADE,
    UNIQUE (utente_id, ruolo_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;


-- RUOLI_PERMESSI

DROP TABLE IF EXISTS ruoli_permessi;
CREATE TABLE ruoli_permessi (
    id int unsigned PRIMARY KEY AUTO_INCREMENT,
    ruolo_id int unsigned NOT NULL,
    permesso_id int unsigned NOT NULL,

    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by int unsigned NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by int unsigned NOT NULL,
    is_active boolean NOT NULL DEFAULT TRUE,

    FOREIGN KEY (ruolo_id) REFERENCES ruoli(id) ON DELETE CASCADE,
    FOREIGN KEY (permesso_id) REFERENCES permessi(id) ON DELETE CASCADE,
    UNIQUE (ruolo_id, permesso_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;



------------------ TABELLE EFFETTIVE ---------------

-- SEDI

DROP TABLE IF EXISTS sedi;
CREATE TABLE sedi (
    id int unsigned PRIMARY KEY AUTO_INCREMENT,
    sede varchar(100) NOT NULL UNIQUE,
    ufficio varchar(100) NOT NULL DEFAULT '',

    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by int unsigned NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by int unsigned NOT NULL,
    is_active boolean NOT NULL DEFAULT TRUE
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;


-- OPERATORI

DROP TABLE IF EXISTS operatori;
CREATE TABLE operatori (
    id int unsigned PRIMARY KEY AUTO_INCREMENT,
    nome varchar(100) NOT NULL,
    cognome varchar(100) NOT NULL DEFAULT '',
    sede int unsigned NOT NULL,

    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by int unsigned NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by int unsigned NOT NULL,
    is_active boolean NOT NULL DEFAULT TRUE,
    UNIQUE (nome,cognome),
    FOREIGN KEY (sede) REFERENCES sedi(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;