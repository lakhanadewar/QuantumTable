export interface ElementData {
  name: string;
  atomic_mass: number;
  boil: number | null;
  category: string;
  density: number | null;
  discovered_by: string | null;
  melt: number | null;
  molar_heat: number | null;
  named_by: string | null;
  number: number;
  period: number;
  group: number;
  phase: string;
  summary: string;
  symbol: string;
  xpos: number;
  ypos: number;
  shells: number | number[];
  electron_configuration: string;
  electron_affinity: number | null;
  electronegativity_pauling: number | null;
  ionization_energies: number | (number | null)[] | null;
  cpkHex: string | null;
  bohr_model_image: string | null;
  bohr_model_3d: string | null;
  fun_fact: string;
}
