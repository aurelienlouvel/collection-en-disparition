import journal from "@/assets/models/map/JournalProjectMuseum.glb";
import maison from "@/assets/models/map/CanvasMuseumLa_Maison_Bernot.glb";
import chanel from "@/assets/models/map/CanvasMuseumPortrait_de_Mademoiselle_Chanel.glb";
import paul from "@/assets/models/map/CanvasMuseumPaullGuillaume.glb";
import domenica from "@/assets/models/map/CanvasMuseumDomenica.glb";

const checkpoints = [
  {
    x: 44.5,
    y: 7.6,
    model: journal,
  },
  {
    x: 67.75,
    y: 17.75,
    model: maison,
  },
  {
    x: 70,
    y: 45,
    model: chanel,
  },
  {
    x: 45,
    y: 56,
    model: paul,
  },
  {
    x: 13.75,
    y: 99,
    model: domenica,
  },
];

export default checkpoints;
