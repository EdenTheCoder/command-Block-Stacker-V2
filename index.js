//Html Elemnts

//Cords
cordX = document.getElementById("cordX");
cordY = document.getElementById("cordY");
cordZ = document.getElementById("cordZ");
//Command
command = document.getElementById("Command");

//Command Types
commandType = document.getElementById("cBlockType");
// auto and conditinal

auto = document.getElementById("auto");
cond = document.getElementById("cond");

// dir
diraction = document.getElementById("CblockDir");
class CommandBlock {
	constructor(
		command,
		LocX,
		LocY,
		LocZ,
		BlockType,
		iscommandblock,
		oriantation,
		auto,
		cond
	) {
		this.command = command;
		this.LocX = LocX;
		this.LocY = LocY;
		this.LocZ = LocZ;
		this.BlockType = BlockType;
		this.iscommandblock = iscommandblock;
		this.oriantation = oriantation;
		this.auto = auto;
		this.cond = cond;
	}
}

let Everyblock = [];
let daCarts = [];
function AddnormalBlock() {
	let temp = new CommandBlock();
	temp.iscommandblock = false;
	temp.BlockType = document.getElementById("Block").value;
	temp.LocX = cordX.value;
	temp.LocY = cordY.value;
	temp.LocZ = cordZ.value;
	temp.oriantation = diraction.value;
	Everyblock.push(temp);
}
function AddcomandBlock() {
	let temp = new CommandBlock();
	temp.iscommandblock = true;
	temp.auto = auto.checked;
	temp.cond = cond.checked;
	temp.BlockType = commandType.value;
	temp.command = command.value.replaceAll('"', '\\"');
	temp.LocX = cordX.value;
	temp.LocY = cordY.value;
	temp.LocZ = cordZ.value;
	temp.oriantation = diraction.value;
	Everyblock.push(temp);
}
function GenCommand() {
	daCarts = [];
	let Fullcommand =
		'/summon minecraft:falling_block ~ ~ ~ {BlockState:{Name:"activator_rail"},Passengers:[]}';
	let charpos = 86;
	for (let itaration = 0; itaration < Everyblock.length; itaration++) {
		let i = Everyblock[itaration];
		let cart =
			"{id:'minecraft:command_block_minecart',Command:'setblock ~" +
			i.LocX +
			" ~" +
			i.LocY +
			" ~" +
			i.LocZ +
			" " +
			i.BlockType;
		//setblock ~1 ~2 ~-3 minecraft:command_block
		if (i.iscommandblock) {
			cart = cart + "[facing=" + i.oriantation + ",conditional=" + i.cond + "]"; //[facing=up,conditional=false]
			cart = cart + "{Command:'" + i.command + "',auto:" + i.auto + "}"; //{Command:"say Hello",auto:true}
		}

		cart = cart + '"}';
		console.log(cart);
		daCarts.push(cart);
	}
	Fullcommand =
		'/summon minecraft:falling_block ~ ~1 ~ {BlockState:{Name:"activator_rail"},Passengers:[' +
		daCarts.join(",") +
		"]}";
	document.getElementById("output").innerText = Fullcommand;
}
