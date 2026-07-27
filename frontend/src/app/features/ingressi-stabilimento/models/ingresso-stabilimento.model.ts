export interface IngressoStabilimento {
    id: number;
    persona: number;
    nome: string;
    cognome: string;
    idBadge: number;
    badge: string;
    targa: string | null;
    dataIngresso: string;
    oraIngresso: string;
    dataUscita: string | null;
    oraUscita: string | null;
    idCategoria: number;
    categoria: string;
    idPersonaRiferimento: number | null;
    personaRiferimento: string;
    azienda: string;
    idDivisione: number;
    divisione: string;
}