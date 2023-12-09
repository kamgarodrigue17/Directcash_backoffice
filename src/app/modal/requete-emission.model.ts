import { Agent } from "./agent";

export class RequeteEmission {
  id_requete!: number
  id_top_agent!: string;
  id_creer_par!: number;
  id_traiter_par!: number;
  creer_le!: String;
  traiter_le!: String;
  statut!: string;
  montant!: number;
}
