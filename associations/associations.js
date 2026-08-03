
import { CategoriaModel } from "../models/CategoriaModel.js";
import { EspacioModel } from "../models/EspacioModel.js";
import { OrganizadorModel } from "../models/OrganizadorModel.js";
import { PonenteModel } from "../models/PonenteModel.js";
import { TipoEventoModel } from "../models/TipoEventoModel.js";
import { EstadoEventoModel } from "../models/EstadoEventoModel.js";
import { EstadoEspacioModel } from "../models/EstadoEspacioModel.js";
import { TipoParticipanteModel } from "../models/TipoParticipanteModel.js";
import { EstadoInscripcionModel } from "../models/EstadoInscripcionModel.js";
import { EventoModel } from "../models/EventoModel.js";
import { ParticipanteModel } from "../models/ParticipanteModel.js";
import { InscripcionModel } from "../models/InscripcionModel.js";
import { ParticipacionPonenteModel } from "../models/ParticipacionPonenteModel.js";

// Evento pertenece a Categoria, Espacio, Organizador, TipoEvento y EstadoEvento
CategoriaModel.hasMany(EventoModel, { foreignKey: "id_categoria" });
EventoModel.belongsTo(CategoriaModel, { foreignKey: "id_categoria" });

EspacioModel.hasMany(EventoModel, { foreignKey: "id_espacio" });
EventoModel.belongsTo(EspacioModel, { foreignKey: "id_espacio" });

OrganizadorModel.hasMany(EventoModel, { foreignKey: "id_organizador" });
EventoModel.belongsTo(OrganizadorModel, { foreignKey: "id_organizador" });

TipoEventoModel.hasMany(EventoModel, { foreignKey: "id_tipo_evento" });
EventoModel.belongsTo(TipoEventoModel, { foreignKey: "id_tipo_evento" });

EstadoEventoModel.hasMany(EventoModel, { foreignKey: "id_estado_evento" });
EventoModel.belongsTo(EstadoEventoModel, { foreignKey: "id_estado_evento" });

// Espacio pertenece a EstadoEspacio
EstadoEspacioModel.hasMany(EspacioModel, { foreignKey: "id_estado_espacio" });
EspacioModel.belongsTo(EstadoEspacioModel, { foreignKey: "id_estado_espacio" });

// Participante pertenece a TipoParticipante
TipoParticipanteModel.hasMany(ParticipanteModel, { foreignKey: "id_tipo_participante" });
ParticipanteModel.belongsTo(TipoParticipanteModel, { foreignKey: "id_tipo_participante" });

// Inscripcion pertenece a Evento, Participante y EstadoInscripcion
EventoModel.hasMany(InscripcionModel, { foreignKey: "id_evento" });
InscripcionModel.belongsTo(EventoModel, { foreignKey: "id_evento" });

ParticipanteModel.hasMany(InscripcionModel, { foreignKey: "id_participante" });
InscripcionModel.belongsTo(ParticipanteModel, { foreignKey: "id_participante" });

EstadoInscripcionModel.hasMany(InscripcionModel, { foreignKey: "id_estado_inscripcion" });
InscripcionModel.belongsTo(EstadoInscripcionModel, { foreignKey: "id_estado_inscripcion" });

// ParticipacionPonente pertenece a Evento y Ponente
EventoModel.hasMany(ParticipacionPonenteModel, { foreignKey: "id_evento" });
ParticipacionPonenteModel.belongsTo(EventoModel, { foreignKey: "id_evento" });

PonenteModel.hasMany(ParticipacionPonenteModel, { foreignKey: "id_ponente" });
ParticipacionPonenteModel.belongsTo(PonenteModel, { foreignKey: "id_ponente" });
