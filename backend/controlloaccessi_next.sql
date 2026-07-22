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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


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
    FOREIGN KEY (ruolo_id) REFERENCES ruoli(id),
    UNIQUE (utente_id, ruolo_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


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

    FOREIGN KEY (ruolo_id) REFERENCES ruoli(id),
    FOREIGN KEY (permesso_id) REFERENCES permessi(id),
    UNIQUE (ruolo_id, permesso_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- DIVISIONI

DROP TABLE IF EXISTS divisioni;
CREATE TABLE divisioni (
    id int unsigned PRIMARY KEY AUTO_INCREMENT,
    sede int unsigned NOT NULL,
    nome varchar(100) NOT NULL,

    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by int unsigned NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by int unsigned NOT NULL,
    is_active boolean NOT NULL DEFAULT TRUE,

    UNIQUE (sede,nome),
    FOREIGN KEY (sede) REFERENCES sedi(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- PERSONE_INTERNE

DROP TABLE IF EXISTS persone_interne;
CREATE TABLE persone_interne (
    id int unsigned PRIMARY KEY AUTO_INCREMENT,
    nome varchar(100) NOT NULL,
    cognome varchar(100) NOT NULL DEFAULT '',
    telefono varchar(30) NOT NULL,
    email varchar(100) DEFAULT NULL,
    divisione int unsigned DEFAULT NOT NULL,      -- divisione ha sede quindi ricavo sede attraverso this
    is_di_riferimento boolean DEFAULT false,

    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by int unsigned NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by int unsigned NOT NULL,
    is_active boolean NOT NULL DEFAULT TRUE,

    FOREIGN KEY (divisione) REFERENCES divisioni(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- INGRESSI_AUTORIZZATI_INTERNI

DROP TABLE IF EXISTS ingressi_autorizzati_interni;
CREATE TABLE ingressi_autorizzati_interni (
    id int unsigned PRIMARY KEY AUTO_INCREMENT,
    persona int unsigned NOT NULL,
    data_scadenza date DEFAULT NULL,

    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by int unsigned NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by int unsigned NOT NULL,
    is_active boolean NOT NULL DEFAULT TRUE,

    FOREIGN KEY (persona) REFERENCES persone_interne(id),
    UNIQUE (persona)    -- una sola riga per persona
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- AZIENDE

DROP TABLE IF EXISTS aziende;
CREATE TABLE aziende (
    id int unsigned PRIMARY KEY AUTO_INCREMENT,
    ragione_sociale varchar(100) NOT NULL,
    codice_fiscale varchar(30) NOT NULL,
    partita_iva varchar(100) NOT NULL,

    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by int unsigned NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by int unsigned NOT NULL,
    is_active boolean NOT NULL DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- TIPI_AZIENDA

DROP TABLE IF EXISTS tipi_azienda;
CREATE TABLE tipi_azienda (
    id int unsigned PRIMARY KEY AUTO_INCREMENT,
    codice varchar(30) NOT NULL,    -- ad esempio: TRASPORTATORE, VISITATORE, FORNITORE...
    descrizione varchar(200) DEFAULT '',

    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by int unsigned NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by int unsigned NOT NULL,
    is_active boolean NOT NULL DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- AZIENDE_TIPI

DROP TABLE IF EXISTS aziende_tipi;
CREATE TABLE aziende_tipi (
    id_azienda int unsigned,
    id_tipo_azienda int unsigned,

    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by int unsigned NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by int unsigned NOT NULL,
    is_active boolean NOT NULL DEFAULT TRUE,

    PRIMARY KEY (id_azienda, id_tipo_azienda),
    FOREIGN KEY (id_azienda) REFERENCES aziende(id),
    FOREIGN KEY (id_tipo_azienda) REFERENCES tipi_azienda(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- INGRESSI_AUTORIZZATI_ESTERNI

DROP TABLE IF EXISTS ingressi_autorizzati_esterni;
CREATE TABLE ingressi_autorizzati_esterni (
    id int unsigned PRIMARY KEY AUTO_INCREMENT,
    sede int unsigned NOT NULL,         -- sede di ingresso
    cognome varchar(100) NOT NULL,      -- persona esterna
    nome varchar(100) NOT NULL,
    azienda int unsigned NOT NULL,    -- azienda di provenienza di questa persona
    data_scadenza datetime DEFAULT NULL,
    persona_riferimento int unsigned NOT NULL,  -- persona interna di riferimento

    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by int unsigned NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by int unsigned NOT NULL,
    is_active boolean NOT NULL DEFAULT TRUE,

    UNIQUE (sede, cognome, nome, azienda, data_scadenza),
    FOREIGN KEY (sede) REFERENCES sedi(id),
    FOREIGN KEY (persona_riferimento) REFERENCES persone_interne(id),
    FOREIGN KEY (azienda) REFERENCES aziende(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- CATEGORIE

DROP TABLE IF EXISTS categorie;
CREATE TABLE categorie (
    id int unsigned PRIMARY KEY AUTO_INCREMENT,
    codice varchar(30) NOT NULL,

    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by int unsigned NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by int unsigned NOT NULL,
    is_active boolean NOT NULL DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- BADGE

DROP TABLE IF EXISTS badge;
CREATE TABLE badge (
    id int unsigned PRIMARY KEY AUTO_INCREMENT,
    sede int unsigned NOT NULL,
    codice char(10) NOT NULL,

    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by int unsigned NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by int unsigned NOT NULL,
    is_active boolean NOT NULL DEFAULT TRUE,

    UNIQUE (sede,codice),
    FOREIGN KEY (sede) REFERENCES sedi(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- INGRESSI_STABILIMENTO

DROP TABLE IF EXISTS ingressi_stabilimento;
CREATE TABLE ingressi_stabilimento (
    id int unsigned PRIMARY KEY AUTO_INCREMENT,
    nome varchar(100) NOT NULL,
    cognome varchar(100) NOT NULL,
    badge int unsigned NOT NULL,
    targa varchar(30) DEFAULT NULL,
    data_ingresso datetime NOT NULL,
    data_uscita datetime DEFAULT NULL,
    categoria int unsigned NOT NULL,
    persona_riferimento int unsigned NOT NULL,  -- sono sempre esterni?
    azienda int unsigned NOT NULL,      -- azienda di provenienza
    divisione_destinazione int unsigned NOT NULL,   -- divisione interna dove vanno

    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by int unsigned NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by int unsigned NOT NULL,
    is_active boolean NOT NULL DEFAULT TRUE,

    UNIQUE (nome,cognome,data_ingresso),
    FOREIGN KEY (badge) REFERENCES badge(id),
    FOREIGN KEY (categoria) REFERENCES categorie(id),
    FOREIGN KEY (persona_riferimento) REFERENCES persone_interne(id),
    FOREIGN KEY (azienda) REFERENCES aziende(id),
    FOREIGN KEY (divisione_destinazione) REFERENCES divisioni(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;