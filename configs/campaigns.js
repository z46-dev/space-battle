import { FactionConfig } from "./baseFactions.js";
import { createSafeLinks } from "./createRoutes.js";
import { cis, republic } from "./factions/cloneWars.js";
import { hutts } from "./factions/criminals.js";
import { empire, eoth, eriaduAuthority, maldrood, pentastarAlignment, zsinj } from "./factions/imperial.js";
import { independentCloneWars, independentPostEndor } from "./factions/independent.js";
import { hapesConsortium, newRepublic } from "./factions/rebelHapan.js";
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

        createSafeLinks(this.planets).forEach(link => {
            const from = this.planets.find(p => p.name === link.from);
            const to = this.planets.find(p => p.name === link.to);

            if (!from || !to) {
                throw new Error(`Link from ${link.from} to ${link.to} references an undefined planet`);
            }

            from.connections.push(to.name);
            to.connections.push(from.name);
        });

        return this;
    }
}

export const splinteredEmpire = new CampaignConfig("Splintered Empire")
    .addFaction(empire.clone()
        .addPlanets("Coruscant", "Chandrila", "Kuat", "Balmorra", "Duro", "Commenor", "Borleias", "Odik", "Bilbringi", "Ord Mantell", "Carida", "Corsin")
        .setCapital("Coruscant", 40, 1500)
        .addHero("AdmiralPellaeon", "Coruscant")
        .addHero("GrandAdmiralThrawn", "Coruscant")
        .addHero("CapBrandei", "Kuat")
    )
    .addFaction(maldrood.clone()
        .addPlanets("Centares", "Ryvester", "Metalorn", "Roche", "Lantillies", "Thanos", "Bimmisaari")
        .setCapital("Centares", 40, 2000)
        .addHero("TreutenTeradoc", "Centares")
        .addHero("KoshTeradoc", "Centares")
    )
    .addFaction(pentastarAlignment.clone()
        .addPlanets("Entralla", "Bastion", "Muunilinst", "Mygeeto", "Yaga Minor", "Borosk", "Anx Minor", "Generis")
        .setCapital("Entralla", 40, 1200)
        .addHero("ArdusKaine", "Entralla")
    )
    .addFaction(zsinj.clone()
        .addPlanets("Dathomir", "Selaggis", "Taris", "Sifkric", "Axxila", "Celanon", "Feriae Junction", "Tangrene", "Serenno", "Yavin", "Maridun", "Stenos", "Elom", "Desevro", "Begeren")
        .setCapital("Dathomir", 40, 1800)
        .addHero("Zsinj", "Dathomir")
        .addHero("ApwarTrigit", "Tangrene")
    )
    .addFaction(eriaduAuthority.clone()
        .addPlanets("Eriadu", "Sluis Van", "Belsavis", "Eiattu", "Sanrafsix", "Svivren", "Vondarc", "YagDhul")
        .setCapital("Eriadu", 40, 1600)
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
    .addFaction(newRepublic.clone()
        .addPlanets("Mon Calamari", "Endor", "Bespin", "Sullust", "Ton Falk", "Minntooine", "Abridon", "Saijo", "Tibrin")
        .setCapital("Mon Calamari", 55, 1400)
        .addHero("AdmiralAckbar", "Mon Calamari")
        .addHero("WedgeAntilles", "Bespin")
        .addHero("HanAndChewie", "Endor")
        .addHero("GeneralLeiaOrganaSolo", "Sullust")
    )
    .addFaction(hapesConsortium.clone()
        .addPlanets("Hapes", "Relephon", "Transitory Mists I", "Charubah", "Terephon", "Gallinore", "Transitory Mists II", "Transitory Mists III")
        .setCapital("Hapes", 40, 1300)
        .addHero("Ereneda", "Hapes")
        .addHero("TenelKaDjo", "Hapes")
        .addHero("AlesonGray", "Relephon")
        .addHero("Alyssia", "Transitory Mists I")
    )
    .addFaction(eoth.clone()
        .addPlanets("Nirauan", "Teptixii", "Troukree", "Oristrom", "Kariek", "Syca", "Rapacc", "Solitair")
        .setCapital("Nirauan", 40, 1300)
        .addHero("JaggedFel", "Nirauan")
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

export const playableCampaigns = [
    splinteredEmpire,
    theCloneWars
];

console.log(theCloneWars);