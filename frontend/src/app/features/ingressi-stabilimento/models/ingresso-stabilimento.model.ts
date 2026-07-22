export interface IngressoStabilimento {
    id: number;
    nome: string;
    cognome: string;
    idBadge: number;
    badge: string;
    targa: string | null;
    dataIngresso: string;
    dataUscita: string | null;
    idCategoria: number;
    categoria: string;
    idPersonaRiferimento: number;
    personaRiferimento: string;
    idAzienda: number;
    azienda: string;
    idDivisione: number;
    divisione: string;
}