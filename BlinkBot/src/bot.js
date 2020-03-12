const Discord = require("discord.js");

const Client = new Discord.Client();

const Token = "NjYxMzIyMjY0MjgwNTYzNzEy.Xgpvaw.sR2eCZw9USfleHLtG59j_esWQX0";

const Numeral = require("numeral");

const keyv = require("keyv");

const KEY_USER = "root";
const KEY_PASS = "";

const KEY_HOST = "localhost";
const KEY_DBNM = "blinkbot";

const Keyv = new keyv(`mysql://${KEY_USER}:${KEY_PASS}@${KEY_HOST}/${KEY_DBNM}`);


const PREFIX = "!";


const UsedLibraries = ["Discord.js", "keyv", "@keyv/mysql", "numberal"];


Array.prototype.contains = function(element) {

	return this.indexOf(element) > -1;

}

Client.on("ready", () => {
	console.log("Hello.");
});


Client.on('message', async (Message) => {

	if(Message.author.bot) return;

	let Content = Message.content;
	let Channel = Message.channel;
	let Author = Message.author;
	let Guild = Message.guild;

	let ServerId = Message.guild.id;
	let AuthorId = Message.author.id;

	const withoutPrefix = Content.slice(PREFIX.length);
	const split = withoutPrefix.split(/ +/);
	const cmd = split[0];
	const Args = split.slice(1);

	const Command = cmd.toLowerCase();

	// START MODERATION COMMANDS

	if(Command == "purge") {

		if(Message.member.hasPermissions("MANAGE_MESSAGES")) {

			if(Args[0]) {
				
				Channel.bulkDelete(Number(Args[0])).then(messages => {console.log(`Bulk Deleted ${messages.size} messages`); Channel.send(`Deleted ${messages.size} messages!`)}).catch(console.error);
			
			} else {

				Channel.send("You need to specify an amount of messages to delete!");

			}

		} else {

			Channel.send("You must have the 'Delete Messages' permission!");

		}

	}

	if(Command == "kick") {

		if(Message.member.hasPermission("KICK_MEMBERS")) {

			if(Message.mentions.members.first()) {

				let Member = Message.mentions.members.first();

				let Reason = Args.splice(1).join(" ");

				Member.kick(Reason).then(Member => {
					Channel.send(`${Message.author} has **kicked** user ${Member.user.tag} for Reason: ${Reason}`);
				}).catch(() => {
					Channel.send("Error!");
				});



			} else {

				Channel.send("You must mention a user to kick!");

			}

		} else {

			Channel.send("You must have the 'Kick Members' permission!");

		}

	}

	if(Command == "ban") {

		if(Message.member.hasPermission("BAN_MEMBERS")) {

			if(Message.mentions.members.first()) {

				let Member = Message.mentions.members.first();

				let Reason = Args.splice(1).join(" ");

				Member.ban(Reason).then(Member => {

					Channel.send(`${Message.author} has **banned** user ${Member.user.tag} for Reason: ${Reason}`);

				}).catch(() => {

					Channel.send("Error!");

				});

			} else {

				Channel.send("You must mention a user to do this!");

			}

		} else {

			Channel.send("You must have the 'Ban Members' permission!");

		}

	}

	if(Command == "warn") {

		if(Message.member.hasPermission("ADMINISTRATOR")) {

			if(Message.mentions.members.first()) {

				let User = Message.mentions.members.first();

				let UserId = User.id;

				let CurrentWarns = await Keyv.get(`Warns_${ServerId}-${UserId}`);

				var CurrentWarns2 = [];

				if(CurrentWarns) {

					CurrentWarns2 = CurrentWarns;

				}

				let CurrentArray = CurrentWarns2

				let Reason = Args.splice(1).join(" ");

				let NewObject = {
					Reason: Reason,
					Author: Message.author.tag
				}

				CurrentArray.push(NewObject);

				await Keyv.set(`Warns_${ServerId}-${UserId}`, CurrentArray);


			} else {

				Channel.send("You must mention a user to do this!");

			}

		} else {

			Channel.send("You must have the 'Administrator' permission!");

		}

	}

	if(Command == "warnings") {

		if(Message.mentions.members.first()) {

			let User = Message.mentions.members.first();

			let UserId = User.id;

			let CurrentWarns = await Keyv.get(`Warns_${ServerId}-${UserId}`);

			let CurrentWarns2 = CurrentWarns;

			if(!CurrentWarns) {
				CurrentWarns2 = [];
			}

			let Decoded = CurrentWarns2;

			var CombinedString = `${User.user.tag}'s Warnings: \n\n`;

			if(Decoded.length <= 0) {

				Channel.send(`${User.user.tag} has no warnings!`);
				return;

			}

			for(let i = 0; i != Decoded.length; i++) {

				if(i == undefined) break;

				CombinedString += "```" + `Reason: ${Decoded[i].Reason} [-] Author: ${Decoded[i].Author}` + "```";

			}

			Channel.send(CombinedString);

		} else {

			let CurrentWarns = await Keyv.get(`Warns_${ServerId}-${Message.author.id}`);

			let CurrentWarns2 = CurrentWarns

			if(!CurrentWarns) {

				CurrentWarns2 = [];

			}

			let Decoded = CurrentWarns2

			var CombinedString = `${Message.author.tag}'s Warnings: \n\n`;

			if(Decoded.length <= 0) {

				Channel.send(`${Message.author.tag} has no warnings!`);
				return;

			}

			for(let i = 0;  i != Decoded.length; i++) {

				if(i == undefined) break;

				CombinedString += "```" + `Reason: ${Decoded[i].Reason} [-] Author: ${Decoded[i].Author}` + "```";

			}

			Channel.send(CombinedString);

		}

	}

	if(Command == "clearwarnings") {

		if(Message.member.hasPermission("ADMINISTRATOR")) {

			if(Message.mentions.members.first()) {

				let User = Message.mentions.members.first();

				let UserId = User.id;

				await Keyv.set(`Warns_${ServerId}-${UserId}`, []);

				Channel.send(`Cleared Warnings For User ${User.user.tag}`);

			} else {

				let User = Message.author;

				let UserId = User.id;

				await Keyv.set(`Warns_${ServerId}-${Message.author.id}`, []);

				Channel.send(`Cleared Warnings For User ${User.user.tag}`);

			}

		} else {

			Channel.send("You must have the 'Administrator' permission!");

		}

	}

	// END MODERATION COMMANDS



	// START ECONOMY COMMANDS


	if(Command == "bal" || Command == "balance") {

		if(Message.mentions.members.first()) {

			let User = Message.mentions.members.first();

			let UserId = User.id;


			if(!await Keyv.get(`Balance_${ServerId}-${UserId}`)) {

				await Keyv.set(`Balance_${ServerId}-${UserId}`, 0);

				Message.reply("Balance: $0");

				return;

			}

			let RecievedNumber = Number(await Keyv.get(`Balance_${ServerId}-${AuthorId}`));

			let Formatted = Numeral(RecievedNumber).format("0,0.00");

			Message.reply(`${User.user.tag}'s Balance: $${Formatted}`);


		} else {

			if(!await Keyv.get(`Balance_${ServerId}-${AuthorId}`)) {

				await Keyv.set(`Balance_${ServerId}-${AuthorId}`, 0);

				Message.reply("Balance: $0");

			} else {

				let ReceivedNumber = Number(await Keyv.get(`Balance_${ServerId}-${AuthorId}`));

				let Formatted = Numeral(ReceivedNumber).format("0,0.00");

				Message.reply(`Balance: $${Formatted}`);

			}
		}
	}

	if(Command == "setbal") {

		if(Args[0]) {

			let Formatted = Numeral(Number(Args[0])).format("0,0.00");

			if(Formatted == "NaN" || Formatted == NaN) {
				Message.reply("BOII U BETTA NOT!\n\n(Balance set to $0 cuz you tried to get lots of money) (Original Amount: " + await Keyv.get(`Balance_${ServerId}-${AuthorId}`) + ")");
				await Keyv.set(`Balance_${ServerId}-${AuthorId}`, 0);
				return;
			}

			await Keyv.set(`Balance_${ServerId}-${AuthorId}`, Args[0]);

			Message.reply(`New Balance: $${Formatted}`);

			console.log(`Author(${AuthorId}) Bal Set To ${Formatted}`);

		}

	}

	if(Command == "pay") {

		if(Message.mentions.members.first()) {

			let User = Message.mentions.members.first();

			let UserId = User.id;

			let UserAmount = Number(await Keyv.get(`Balance_${ServerId}-${UserId}`));

			if(!UserAmount) {

				UserAmount = 0;

				await Keyv.set(`Balance_${ServerId}-${UserId}`, 0);

			}

			let AuthorAmount = Number(await Keyv.get(`Balance_${ServerId}-${Message.author.id}`));

			if(!AuthorAmount) {

				AuthorAmount = 0;

				await Keyv.set(`Balance_${ServerId}-${Message.author.id}`, 0);

			}

			if(Number(Args[1]) <= AuthorAmount) {

				await Keyv.set(`Balance_${ServerId}-${UserId}`, UserAmount + Number(Args[1]));

				await Keyv.set(`Balance_${ServerId}-${Message.author.id}`, AuthorAmount - Number(Args[1]));

				Message.reply(`You sent $${Number(Args[1])} to ${User.user.tag}!`);

			} else {

				Message.reply(`You can't send ${Number(Args[1])} to ${User.user.tag}!  You have $${AuthorAmount}!`);

			}

		} else {

			Message.reply("You must mention the user you want to pay!");

		}

	}

	// END ECONOMY COMMANDS


	// START EXTRA COMMANDS

	if(Command == "libraries") {

		let Combined = UsedLibraries.join(", ");

		Message.reply(`Used Libraries: \n\n**${Combined}**.`);

	}

	// END EXTRA COMMANDS

	if(Command == "help" || Command == "cmds" || Command == "?") {

		let Embed = new Discord.RichEmbed()
			.setColor("#0099ff")
			.setTitle("Commands")
			.setAuthor(Message.member.user.tag, Message.author.avatarURL)

			.addField(`${PREFIX}help`, "Shows this.");

		Message.reply(Embed);

	}

});

Client.login(Token);