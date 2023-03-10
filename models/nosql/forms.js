const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FormScheme = new Schema(
    {
        name: {
            type: String
        },
        image: {
            type: String,
            validate: {
                validator: (req) => {
                    return true
                },
                message: 'ERROR_URL',
            },
        },
        stats: {
            strength: {
                type: Number
            },
            intelligence: {
                type: Number
            },
            durability: {
                type: Number
            },
            agility: {
                type: Number
            },
            wisdom: {
                type: Number
            },
            charisma: {
                type: Number
            },
            perception: {
                type: Number
            },
            hp: {
                type: Number
            },
            power: {
                type: Number
            },
            defense: {
                type: Number
            },
            melee: {
                type: Number
            },
            energyprojection: {
                type: Number
            },
            speed: {
                type: Number
            },
            luck: {
                type: Number
            },
        },
        skills: {
            acrobatics: {
                type: Number
            },
            accuracy: {
                type: Number
            },
            athletics: {
                type: Number
            },
            aerialPiloting: {
                type: Number
            },
            bikePiloting: {
                type: Number
            },
            heavyEquipmentPiloting: {
                type: Number
            },
            lockpicking: {
                type: Number
            },
            meleeWeapons: {
                type: Number
            },
            motorVehiclePiloting: {
                type: Number
            },
            pickpocket: {
                type: Number
            },
            rangedWeapons: {
                type: Number
            },
            stealth: {
                type: Number
            },
            throw: {
                type: Number
            },
            underwater: {
                type: Number
            },
            waterPiloting: {
                type: Number
            },
            animalHandling: {
                type: Number
            },
            deception: {
                type: Number
            },
            espionage: {
                type: Number
            },
            etiquette: {
                type: Number
            },
            explosives: {
                type: Number
            },
            firstAid: {
                type: Number
            },
            firearms: {
                type: Number
            },
            electronicsKnowledge: {
                type: Number
            },
            historyKnowledge: {
                type: Number
            },
            intimidation: {
                type: Number
            },
            intuition: {
                type: Number
            },
            investigation: {
                type: Number
            },
            marksman: {
                type: Number
            },
            mechanic: {
                type: Number
            },
            medicine: {
                type: Number
            },
            naturalSciencesKnowledge: {
                type: Number
            },
            persuasion: {
                type: Number
            },
            religion: {
                type: Number
            },
            softwareKnowledge: {
                type: Number
            },
            survivalist: {
                type: Number
            },
            tracking: {
                type: Number
            },
        },
        specialSkills: {
            willpower: {
                type: Number
            },
            bodyStretching: {
                type: Number
            },
            enviromentalAwareness: {
                type: Number
            },
            flight: {
                type: Number
            },
            magic: {
                type: Number
            },
            chiControl: {
                type: Number
            },
            magnetism: {
                type: Number
            },
            telepathy: {
                type: Number
            },
            pyrokinesis: {
                type: Number
            },
            electrokinesis: {
                type: Number
            },
            cryokinesis: {
                type: Number
            },
            gravitokinesis: {
                type: Number
            },
            hydrokinesis: {
                type: Number
            },
            aerokinesis: {
                type: Number
            },
            seismokinesis: {
                type: Number
            },
            terrakinesis: {
                type: Number
            },
            thermokinesis: {
                type: Number
            },
            powerCosmic: {
                type: Number
            },
            spiritualAffinity: {
                type: Number
            },
            weatherControl: {
                type: Number
            },
            wallCrawling: {
                type: Number
            },
            special1: {
                type: Number
            },
            special2: {
                type: Number
            },
            special3: {
                type: Number
            },
            special4: {
                type: Number
            },
        },
        abilities: [{
            type: String
        }],
        weaknesses: [{
            type: String
        }],
        powers: [{
            type: String
        }],
        type: {
            type: ['normal', 'alternate', 'armor'],
            default: 'hero'
        },
        character: {
            type: String
        }
    },
    {
        timestamps: true, //TODO cratedAt, updatedAt
        versionKey: false
    }
)

module.exports = mongoose.model('forms', FormScheme)