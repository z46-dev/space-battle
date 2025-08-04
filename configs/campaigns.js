import { FactionConfig } from "./baseFactions.js";
import { createSafeLinks } from "./createRoutes.js";
import { firstOrder, resistance } from "./factions/cannonNewRepublic.js";
import { cis, republic } from "./factions/cloneWars.js";
import { hutts } from "./factions/criminals.js";
import { empire, eoth, eriaduAuthority, maldrood, pentastarAlignment, zsinj } from "./factions/imperial.js";
import { independentCloneWars, independentPostEndor } from "./factions/independent.js";
import { hapesConsortium, newRepublic } from "./factions/rebelHapan.js";
import { ancientHutts, mandalorians, oldRepublic, sithEmpire } from "./factions/sithWars.js";
import { PlanetConfig, planets } from "./planets.js";

export class CampaignConfig {
    static campaignID = 0;

    constructor(name) {
        this.id = CampaignConfig.campaignID++;
        this.name = name;

        /** @type {FactionConfig[]} */
        this.factions = [];

        /** @type {PlanetConfig[]} */
        this.planets = [];

        /** @type {FactionConfig | null} */
        this.independentForces = null;
    }

    addFaction(faction) {
        if (faction instanceof FactionConfig) {
            this.factions.push(faction);
        } else {
            throw new Error("Invalid faction type");
        }

        return this;
    }

    addIndependentForces(faction) {
        if (faction instanceof FactionConfig) {
            this.independentForces = faction;
        } else {
            throw new Error("Invalid independent forces type");
        }

        return this;
    }

    compile() {
        if (this.factions.length === 0) {
            throw new Error("Campaign must have at least one faction");
        }

        const planetSet = new Set();
        for (const faction of this.factions) {
            for (const planet of faction.planets) {
                if (planetSet.has(planet)) {
                    throw new Error(`Planet ${planet} is duplicated in the campaign`);
                }
                planetSet.add(planet);
            }
        }

        if (this.independentForces) {
            if (this.independentForces.planets.length === 0) {
                throw new Error("Independent forces must have at least one planet defined");
            }

            for (const planet of this.independentForces.planets) {
                if (planetSet.has(planet)) {
                    throw new Error(`Planet ${planet} is duplicated in the campaign with independent forces`);
                }

                planetSet.add(planet);
            }
        }

        for (const faction of this.factions) {
            if (!faction.capital) {
                throw new Error(`Faction ${faction.name} must have a capital planet defined`);
            }
        }

        // Build up planets and links
        this.planets = Array.from(planetSet).map(planetName => {
            const cfg = planets.find(p => p.name === planetName);

            if (!cfg) {
                throw new Error(`Planet ${planetName} not found in the predefined planets list`);
            }

            return structuredClone(Object.assign(new PlanetConfig(), cfg));
        });

        console.log("Starting to create links for planets in campaign:", this.name);
        createSafeLinks(this.planets).forEach(link => {
            const from = this.planets.find(p => p.name === link.from);
            const to = this.planets.find(p => p.name === link.to);

            if (!from || !to) {
                throw new Error(`Link from ${link.from} to ${link.to} references an undefined planet`);
            }

            from.connections.push(to.name);
            to.connections.push(from.name);
        });
        console.log("Finished creating links for planets in campaign:", this.name);

        return this;
    }
}

export const splinteredEmpire = new CampaignConfig("Splintered Empire")
    .addFaction(empire.clone()
        .addPlanets("Coruscant", "Chandrila", "Kuat", "Balmorra", "Duro", "Commenor", "Borleias", "Odik", "Bilbringi", "Ord Mantell", "Carida", "Corsin")
        .setCapital("Coruscant", 50, 1500)
        .addHero("AdmiralPellaeon", "Coruscant")
        .addHero("GrandAdmiralThrawn", "Coruscant")
        .addHero("CapBrandei", "Kuat")
        .addHero("BlitzerHarrsk", "Bilbringi")
        .addHero("CarnorJax", "Ord Mantell")
        .addHero("IshinIlRaz", "Commenor")
        .addHero("JosefGrunger", "Balmorra")
        .addHero("MaarekStele", "Ord Mantell")
        .addHero("MartioBatch", "Carida")
        .addHero("NialDeclann", "Kuat")
        // .addHero("PalpatineClone", "Coruscant")
        .addHero("YsanneIsard", "Odik")
        .addHero("SatePestage", "Ord Mantell")
    )
    .addFaction(maldrood.clone()
        .addPlanets("Centares", "Ryvester", "Metalorn", "Roche", "Lantillies", "Thanos", "Bimmisaari")
        .setCapital("Centares", 50, 2000)
        .addHero("TreutenTeradoc", "Centares")
        .addHero("KoshTeradoc", "Centares")
        .addHero("BarseNeomen", "Ryvester")
        .addHero("GarrikTrier", "Metalorn")
        .addHero("Larm", "Metalorn")
        .addHero("LeoniaTavira", "Ryvester")
        .addHero("ParLankin", "Roche")
        .addHero("PeccatiSyn", "Roche")
        .addHero("PhanRiizolo", "Thanos")
        .addHero("RalchioNervi", "Thanos")
        .addHero("RodinHlianVerpalion", "Thanos")
        .addHero("Therbon", "Bimmisaari")
    )
    .addFaction(pentastarAlignment.clone()
        .addPlanets("Entralla", "Bastion", "Muunilinst", "Mygeeto", "Yaga Minor", "Borosk", "Anx Minor", "Generis")
        .setCapital("Entralla", 50, 1200)
        .addHero("ArdusKaine", "Entralla")
        .addHero("Coross", "Bastion")
        .addHero("DorReder", "Muunilinst")
        .addHero("EdricDarius", "Mygeeto")
        .addHero("EltaBesk", "Yaga Minor")
        .addHero("IbDekeet", "Borosk")
        .addHero("MoxSlosin", "Yaga Minor")
        .addHero("NiclaraVarnillian", "Generis")
        .addHero("OctavianGrant", "Muunilinst")
        .addHero("PurdyMTrico", "Generis")
        .addHero("Torpin", "Entralla")
        .addHero("WyrnOtro", "Anx Minor")
    )
    .addFaction(zsinj.clone()
        .addPlanets("Dathomir", "Selaggis", "Taris", "Sifkric", "Axxila", "Celanon", "Feriae Junction", "Tangrene", "Serenno", "Yavin", "Maridun", "Stenos", "Elom", "Desevro", "Begeren")
        .setCapital("Dathomir", 50, 1800)
        .addHero("Zsinj", "Dathomir")
        .addHero("ApwarTrigit", "Tangrene")
        .addHero("BockNabyl", "Stenos")
        .addHero("Joshi", "Axxila")
        .addHero("LlonBanjeer", "Axxila")
        .addHero("MalfklaYzu", "Desevro")
        .addHero("TerrinaldScreed", "Axxila")
        .addHero("TurrPhennir", "Dathomir")
        .addHero("ZurelDarillian", "Tangrene")
        .addHero("Cronal", "Desevro")
    )
    .addFaction(eriaduAuthority.clone()
        .addPlanets("Eriadu", "Sluis Van", "Belsavis", "Eiattu", "Sanrafsix", "Svivren", "Vondarc", "YagDhul")
        .setCapital("Eriadu", 50, 1600)
        .addHero("Kedler", "Eriadu")
        .addHero("LobaxResuun", "Sluis Van")
        .addHero("QuarshPanaka", "Belsavis")
        .addHero("Sahreel", "Eiattu")
        .addHero("SebastianParnell", "Sanrafsix")
        .addHero("SheaHublin", "Eriadu")
        .addHero("TandaPryl", "Sluis Van")
        .addHero("Touler", "Vondarc")
        .addHero("Lumiya", "YagDhul")
        .addHero("NatasiDaala", "Eriadu")
        .addHero("GeneralDelvarus", "Eriadu")
    )
    .addFaction(hutts.clone()
        .addPlanets("Nal Hutta", "Nar Shaddaa", "Da Soocha", "Ylesia", "Sleheyron", "Ubrikkia", "Klatooine", "Delacrix")
        .setCapital("Nal Hutta", 50, 1000)
        .addHero("Jabba The Hutt", "Nal Hutta")
        .addHero("Gorga The Hutt", "Nar Shaddaa")
        .addHero("Marlo The Hutt", "Ubrikkia")
        .addHero("Oruba The Hutt", "Da Soocha")
        .addHero("Ziro The Hutt", "Sleheyron")
    )
    .addFaction(newRepublic.clone()
        .addPlanets("Mon Calamari", "Endor", "Bespin", "Sullust", "Ton Falk", "Minntooine", "Abridon", "Saijo", "Tibrin")
        .setCapital("Mon Calamari", 50, 1400)
        .addHero("AdmiralAckbar", "Mon Calamari")
        .addHero("WedgeAntilles", "Bespin")
        .addHero("HanAndChewie", "Endor")
        .addHero("GeneralLeiaOrganaSolo", "Sullust")
        .addHero("AdmiralRaddus", "Mon Calamari")
        .addHero("GarmBelIblis", "Ton Falk")
        .addHero("GeneralDodonna", "Ton Falk")
        .addHero("JunSato", "Sullust")
        .addHero("AdmriralTallon", "Endor")
        .addHero("IdenVersio", "Mon Calamari")
    )
    .addFaction(hapesConsortium.clone()
        .addPlanets("Hapes", "Relephon", "Transitory Mists I", "Charubah", "Terephon", "Gallinore", "Transitory Mists II", "Transitory Mists III")
        .setCapital("Hapes", 50, 1300)
        .addHero("Ereneda", "Hapes")
        .addHero("TenelKaDjo", "Hapes")
        .addHero("AlesonGray", "Relephon")
        .addHero("Alyssia", "Transitory Mists I")
        .addHero("Astarta", "Transitory Mists II")
        .addHero("Chelik", "Transitory Mists III")
        .addHero("HeshaLovett", "Gallinore")
        .addHero("Isolder", "Charubah")
        .addHero("TaAChume", "Hapes")
    )
    .addFaction(eoth.clone()
        .addPlanets("Nirauan", "Teptixii", "Troukree", "Oristrom", "Kariek", "Syca", "Rapacc", "Solitair")
        .setCapital("Nirauan", 50, 1300)
        .addHero("JaggedFel", "Nirauan")
        .addHero("Ar-Alani", "Nirauan")
        .addHero("DagonNiriz", "Nirauan")
        .addHero("Ferob", "Teptixii")
        .addHero("KresTenTarthi", "Teptixii")
        .addHero("Siath", "Troukree")
        .addHero("ThrawnClone", "Nirauan")
        .addHero("VossParck", "Oristrom")
    )
    .addIndependentForces(independentPostEndor.clone()
        .addPlanets("Tatooine", "Ryloth", "Kessel", "Lothal", "Jakku", "Batuu", "Saleucami", "Dantooine", "Mustafar", "Geonosis")
        .addPlanets("Kashyyyk", "Felucia", "Corellia", "Lothal", "Jakku", "Batuu", "Primea", "Naporar", "Csilla", "Bogo Rai", "Rhigar")
        .addPlanets("Kilji", "Tulpaa", "Rhand", "Shree", "Kammia", "Bakura", "Rintonne", "Glom Tho", "Hypori", "Kessel", "Lianna", "Murkhana", "Myrkr", "Wayland")
    ).compile();

export const theCloneWars = new CampaignConfig("The Clone Wars")
    .addFaction(republic.clone()
        .addPlanets("Coruscant", "Anaxes", "Kaikielius", "Arkania", "Alderaan", "Carida", "Kuat", "Rendili", "Humbarine", "Qiilura", "Arkania", "Rhen Var", "Belderone", "Aargonar")
        .addPlanets("Ord Cestus", "Bestine", "Malastare", "Naboo", "Praesitlyn", )
        .setCapital("Coruscant", 100, 2500)
        .addHero("Yularen", "Coruscant")
        .addHero("CapPellaeon", "Anaxes")
        .addHero("AdarTallon", "Kuat")
        .addHero("AdmiralWieler", "Rendili")
        .addHero("AdmiralCorburnCW", "Arkania")
        .addHero("CWTarkin", "Naboo")
    )
    .addFaction(cis.clone()
        .addPlanets("Geonosis", "Mygeeto", "Muunilinst", "Dantooine", "Scipio", "Serenno", "Yavin", "Ringo Vinda", "Quell", "Lola Sayu")
        .addPlanets("Jabiim", "Raxus", "Raxus Secundus", "Minntooine", "Pammant", "Mandalore", "Dathomir", "Cato Neimoidia", "Deko Neimoidia")
        .addPlanets("Koru Neimoidia")
        .setCapital("Geonosis", 50, 1500)
        .addHero("TI-99", "Mygeeto")
        .addHero("TF-1726", "Scipio")
        .addHero("AdmiralTrench", "Raxus Secundus")
        .addHero("NuteGunray", "Cato Neimoidia")
        .addHero("Aut-0", "Deko Neimoidia")
        .addHero("General Kalani", "Dathomir")
        .addHero("Grievous", "Geonosis")
        .addHero("Dooku", "Serenno")
        .addHero("Ventress", "Raxus")
        .addHero("WatTambor", "Muunilinst")
        .addHero("LokDurd", "Lola Sayu")
        .addHero("MarTuuk", "Jabiim")
    )
    .addFaction(hutts.clone()
        .addPlanets("Nal Hutta", "Nar Shaddaa", "Da Soocha", "Ylesia", "Sleheyron", "Ubrikkia", "Klatooine", "Delacrix")
        .setCapital("Nal Hutta", 40, 1000)
        .addHero("Jabba The Hutt", "Nal Hutta")
        .addHero("Gorga The Hutt", "Nar Shaddaa")
        .addHero("Marlo The Hutt", "Ubrikkia")
        .addHero("Oruba The Hutt", "Da Soocha")
        .addHero("Ziro The Hutt", "Sleheyron")
    )
    .addIndependentForces(independentCloneWars.clone()
        .addPlanets("Maridun", "Florrum", "Iego", "Zanbar", "Agamar", "Foerost", "Fondor", "Sluis Van", "Tibrin", "Mustafar", "Sullust", "Utapau", "Rodia", "Ryloth", "Hypori")
    ).compile();

export const sithWars = new CampaignConfig("Sith Wars")
    .addFaction(oldRepublic.clone()
        .addPlanets("Coruscant", "Foerost", "Alsakan", "Alderaan", "Rendili", "Corellia", "Arkania", "Lianna", "Quermia", "Telos", "Axxila", "Taris", "Vanquo")
        .addPlanets("Nouane", "Onderon", "Arkania")
        .setCapital("Coruscant", 50, 2500)
    )
    .addFaction(sithEmpire.clone()
        .addPlanets("Korriban", "Prakith", "Had Abbadon", "Randon", "Raxus", "Rhen Var", "Vjun", "Yavin", "Thule", "Begeren", "Rhelg", "Ord Radama")
        .addPlanets("Lonnaw", "Phaeda", "Generis", "Iridonia", "Malachor")
        .setCapital("Korriban", 50, 2500)
    )
    .addFaction(mandalorians.clone()
        .addPlanets("Mandalore", "Concord Dawn", "Phindar", "Fenel", "Mandallia", "Zanbar", "Ordo", "Quell", "Ixtlar", "Basilisk", "Serenno", "Feswe Prime")
        .addPlanets("Celanon", "Shadren", "Ryvester", "Althir")
        .setCapital("Mandalore", 75, 3000)
    )
    .addFaction(hapesConsortium.clone()
        .addPlanets("Hapes", "Vena")
        .setCapital("Hapes", 150, 3000)
    )
    .addFaction(ancientHutts.clone()
        .addPlanets("Nal Hutta", "Nar Shaddaa", "Kwenn", "Sleheyron", "Ubrikkia", "Klatooine", "Boonta")
        .setCapital("Nal Hutta", 75, 3000)
    )
    .addIndependentForces(independentCloneWars.clone()
        .addPlanets("Manaan", "Kashyyyk", "Dantooine", "Ryloth", "Ulda Frav", "Ailon", "Chazwa", "Ord Mantell", "Ord Biniir", "Florrum", "Ghorman", "Ziost")
        .addPlanets("Orion", "Belderone", "Abhean", "Garos", "Eres")
    )
    .compile();

export const ageOfResistance = new CampaignConfig("Age of Resistance")
    .addFaction(resistance.clone()
        .addPlanets("Coruscant", "Chandrila", "Kuat", "Balmorra", "Duro", "Commenor", "Borleias", "Odik", "Bilbringi", "Ord Mantell", "Carida", "Corsin")
        .addPlanets("Mon Calamari", "Endor", "Bespin", "Sullust", "Ton Falk", "Minntooine", "Abridon", "Saijo", "Tibrin")
        .setCapital("Coruscant", 50, 1500)
    )
    .addFaction(firstOrder.clone()
        .addPlanets("Entralla", "Bastion", "Muunilinst", "Mygeeto", "Yaga Minor", "Borosk", "Anx Minor", "Generis")
        .addPlanets("Nirauan", "Teptixii", "Troukree", "Oristrom", "Kariek", "Syca", "Rapacc", "Solitair")
        .setCapital("Entralla", 50, 1500)
    )
    .addFaction(hutts.clone()
        .addPlanets("Nal Hutta", "Nar Shaddaa", "Da Soocha", "Ylesia", "Sleheyron", "Ubrikkia", "Klatooine", "Delacrix")
        .setCapital("Nal Hutta", 50, 1000)
        .addHero("Jabba The Hutt", "Nal Hutta")
        .addHero("Gorga The Hutt", "Nar Shaddaa")
        .addHero("Marlo The Hutt", "Ubrikkia")
        .addHero("Oruba The Hutt", "Da Soocha")
        .addHero("Ziro The Hutt", "Sleheyron")
    )
    .addFaction(hapesConsortium.clone()
        .addPlanets("Hapes", "Relephon", "Transitory Mists I", "Charubah", "Terephon", "Gallinore", "Transitory Mists II", "Transitory Mists III")
        .setCapital("Hapes", 50, 1300)
        .addHero("Ereneda", "Hapes")
        .addHero("TenelKaDjo", "Hapes")
        .addHero("AlesonGray", "Relephon")
        .addHero("Alyssia", "Transitory Mists I")
        .addHero("Astarta", "Transitory Mists II")
        .addHero("Chelik", "Transitory Mists III")
        .addHero("HeshaLovett", "Gallinore")
        .addHero("Isolder", "Charubah")
        .addHero("TaAChume", "Hapes")
    )
    .addIndependentForces(independentPostEndor.clone()
        .addPlanets("Tatooine", "Ryloth", "Kessel", "Lothal", "Jakku", "Batuu", "Saleucami", "Dantooine", "Mustafar", "Geonosis")
        .addPlanets("Kashyyyk", "Felucia", "Corellia", "Lothal", "Jakku", "Batuu", "Primea", "Naporar", "Csilla", "Bogo Rai", "Rhigar")
        .addPlanets("Kilji", "Tulpaa", "Rhand", "Shree", "Kammia", "Bakura", "Rintonne", "Glom Tho", "Hypori", "Kessel", "Lianna", "Murkhana", "Myrkr", "Wayland")
        .addPlanets("Centares", "Ryvester", "Metalorn", "Roche", "Lantillies", "Thanos", "Bimmisaari")
        .addPlanets("Dathomir", "Selaggis", "Taris", "Sifkric", "Axxila", "Celanon", "Feriae Junction", "Tangrene", "Serenno", "Yavin", "Maridun", "Stenos", "Elom", "Desevro", "Begeren")
        .addPlanets("Eriadu", "Sluis Van", "Belsavis", "Eiattu", "Sanrafsix", "Svivren", "Vondarc", "YagDhul")
    ).compile();

export const playableCampaigns = [
    splinteredEmpire,
    theCloneWars,
    sithWars,
    ageOfResistance
];