export interface DashboardPresentiInterni {
    id: number;
    nome: string;
    cognome: string;
    divisione: string;
    oraIngresso: string;
}

export interface DashboardPresentiEsterni {
    id: number;
    nome: string;
    cognome: string;
    azienda: string;
    oraIngresso: string;
}

export interface DashboardBadge {
    id: number;
    codice: string;
    oraPrestito: string;
    nominativoPrestito: string;
}

export interface DashboardChiavi {
    id: number;
    codice: string;
    oraPrestito: string;
    nominativoPrestito: string;
}

export interface DashboardAccessi {
    id: number;
    nome: string;
    cognome: string;
    aziendaDivisione: string;
    oraIngresso: string;
    oraUscita: string;
}