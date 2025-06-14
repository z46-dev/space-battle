import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.VERGEBUIR_CORVETTE_MANDO = {
	name: "Vergebuir Corvette",
	asset: "VERGEBUIR_CORVETTE.png",
	classification: shipTypes.Corvette,
	population: 2,
	size: 95,
	cost: 350,
	speed: 10,
	turnSpeed: .04,
	shield: 300,
	shieldRegen: .3,
	hardpoints: [{
		x: -.149,
		y: .827,
		weapon: weapons.BLUE_LASER_CANNON,
		shotsAtOnce: 2,
		shotDelay: 300
	}, {
		x: .187,
		y: .471,
		weapon: weapons.BLUE_RAPID_LASER_CANNON,
		shotsAtOnce: 2,
		shotDelay: 150
	}, {
		x: .148,
		y: -.631,
		weapon: weapons.BLUE_ANTI_FIGHTER_LASER_CANNON,
		shotsAtOnce: 2,
		shotDelay: 80
	}]
};

ships.AKAANAR_CORVETTE_MANDO = {
	name: "Akaa'nar Corvette",
	asset: "AKAA-NAR_CORVETTE.png",
	classification: shipTypes.Corvette,
	population: 3,
	size: 120,
	cost: 400,
	speed: 9,
	turnSpeed: .04,
	shield: 200,
	shieldRegen: .2,
	hardpoints: [{
		x: -.257,
		y: .678,
		weapon: weapons.BLUE_DOUBLE_LASER_CANNON
	}, {
		x: .257,
		y: .678,
		weapon: weapons.BLUE_DOUBLE_LASER_CANNON
	}, {
		x: .487,
		y: -.762,
		weapon: weapons.DOUBLE_ION_CANNON
	}, {
		x: -.471,
		y: -.770,
		weapon: weapons.DOUBLE_ION_CANNON
	}]
};

export default ships;