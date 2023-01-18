const { Client, GatewayIntentBits, channelLink, InteractionCollector, DiscordAPIError, Partials, ChannelType, PermissionFlagsBits } = require('discord.js')
const { token } = require('./config.json');
const Discord = require('discord.js');
const { TextChannel } = require ('discord.js');



const client = new Client({ intents: [
    
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    ], 
    partials: [Partials.Channel],
});

client.once('ready', () => {
    console.log(`Запущен под учеткой ${client.user.tag}`);
})

const { EmbedBuilder } = require('discord.js');
const { ButtonBuilder, ButtonStyle } = require('discord.js');
const { ActionRow } = require('discord.js');
const { InteractionType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SelectMenuBuilder } = require('discord.js');
const {ComponentType} = require('discord.js');
const { TextInputComponent } = require('discord.js');
const fs = require("fs");
const { Embed } = require('discord.js');
const { channel } = require('diagnostics_channel');
const { typesetttext, cleanrainbow, cleanbw, english, redactor, betaread, soundbw,soundrainbow, koreist,chinese, anketa } = require('./embedstext.js');
const cron = require('cron');
client.setMaxListeners(Infinity);

client.on("messageCreate", async message => {
	if (message.content.toLowerCase().includes('месси с какао')) {
		message.channel.send('https://tenor.com/view/trollszn123-ronaldo-gif-18268194')
	};
	
	if (message.author.id === "276257562519666689") {
		if (message.content.toLowerCase().includes('кано')) {
			message.channel.send('Кано момент...')
		}
	}
});

client.on("channelCreate", async channel => {
	if (channel.parentId === "1042796605373431879") return
	if (channel.name.toLowerCase().includes("ticket-") || channel.name.toLowerCase().includes("⚪-")) {
		const buttonembed = new EmbedBuilder()
			.setColor('b21f00')
			.setTitle(`1️⃣ Вы подали заявку!`)
			.setDescription(`Для продолжения, нужно её заполнить и затем выбрать специальность, на которую вы претендуете.\n\n**Для того чтобы начать, нажми кнопку ниже.**`)

		const startbutton = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('start')
					.setLabel('👉 Заполнить заявку 👈')
					.setStyle(ButtonStyle.Primary)
			);
		function sendmessage() {
			channel.send({ embeds: [buttonembed], components: [startbutton] })
		}
		setTimeout(sendmessage, 3000);
	};
});

client.on("interactionCreate", async i => {

	const startmodal = new ModalBuilder()
		.setCustomId('startmodal')
		.setTitle('Заявка в команду')

	const nickname = new TextInputBuilder()
		.setCustomId('nickname')
		.setLabel('Ваше имя и ник (Name/Nickname)')
		.setStyle(TextInputStyle.Short)
		.setRequired(true)
		.setPlaceholder('Ваше имя и ник (Name/Nickname)')

	const ages = new TextInputBuilder()
		.setCustomId('age')
		.setLabel('Ваш возраст')
		.setStyle(TextInputStyle.Short)
		.setRequired(true)
		.setPlaceholder('18 лет')

	const social = new TextInputBuilder()
		.setCustomId('social')
		.setLabel('Ваши сильные и слабые стороны')
		.setStyle(TextInputStyle.Paragraph)
		.setRequired(true)
		.setPlaceholder('Я силён в... | У меня не получается в...')

	const asking = new TextInputBuilder()
		.setCustomId('asking')
		.setLabel('Состоите ли вы где нибудь ещё?')
		.setStyle(TextInputStyle.Short)
		.setRequired(true)
		.setPlaceholder('Я состою в DIT... | нигде не состою')
		
	const about = new TextInputBuilder()
		.setCustomId('about')
		.setLabel('Расскажите о себе')
		.setStyle(TextInputStyle.Paragraph)
		.setRequired(true)
		.setPlaceholder('Люблю читать мангу и работать в фотошопе...')

	const nicknamerow = new ActionRowBuilder().addComponents(nickname);
	const agesrow = new ActionRowBuilder().addComponents(ages);
	const socialrow = new ActionRowBuilder().addComponents(social);
	const askingrow = new ActionRowBuilder().addComponents(asking);
	const aboutrow = new ActionRowBuilder().addComponents(about);

	startmodal.addComponents(nicknamerow, agesrow, socialrow, askingrow, aboutrow);

	if (i.customId === "start") {
		if (i.guild.channels.cache.get(i.channel.id).parentId==='943206789573390456' //тайперы
			   || i.guild.channels.cache.get(i.channel.id).parentId==='943207045488857088' //чб-клинеры
			   || i.guild.channels.cache.get(i.channel.id).parentId==='1051540198443462736' //цвет-клинеры
			   || i.guild.channels.cache.get(i.channel.id).parentId==='943207090330173510' //переводчики
			   || i.guild.channels.cache.get(i.channel.id).parentId==='943207121305075732' //редакторы
			   || i.guild.channels.cache.get(i.channel.id).parentId==='941668436151525436' //беты
			   || i.guild.channels.cache.get(i.channel.id).parentId==='971490776695590965') {
			i.channel.send(`<@${i.user.id}>, вы уже заполнини анкету, нет смысла заполнять её второй раз.`)
		} else {
		await i.showModal(startmodal);
		}
	}
	
	menu = new ActionRowBuilder()
			.addComponents(
				new Discord.SelectMenuBuilder()
					.setCustomId('choose')
					.setPlaceholder('Я хочу быть...')
					.addOptions(
						{
							label: '🔴 Тайпер',
							description: 'Вставляет текст в баблы',
							value: 'typesett',
						},
						{
							label: '🟠 ЧБ-Клинер',
							description: 'Очищает ЧБ баблы и звуки от текста',
							value: 'cleanbw',
						},
						{
							label: '🟡 ЦВЕТ-Клинер',
							description: 'Очищает ЦВЕТ баблы и звуки от текста',
							value: 'cleanrnbw',
						},
						{
							label: '🟢 Англист',
							description: 'Переводит текст с Английского',
							value: 'english',
						},
						{
							label: '🟢 Кореист',
							description: 'Переводит текст с Корейского',
							value: 'korean',
						},
						{
							label: '🟢 Китаист',
							description: 'Переводит текст с Китайского',
							value: 'chinese',
						},
						{
							label: '🔵 Редактор',
							description: 'Исправляет ошибки при переводе',
							value: 'redactor',
						},
						{
							label: '🟣 Бета-ридер',
							description: 'Придирчивый читатель, контроль перед выкладкой',
							value: 'betaread',
						},
						{
							label: '🔶 ЧБ-Звуковик',
							description: 'Отрисовка звуков в ЧБ-тайтлах',
							value: 'soundbw',
						},
						{
							label: '🔷 ЦВЕТ-Звуковик',
							description: 'Отрисовка звуков в ЦВЕТ-тайтлах',
							value: 'soundrnbw',
						},
						
					)
							
			)
	
		if (i.customId === "startmodal") {
		
		const nicknameresult = i.fields.getTextInputValue('nickname');
		const agesresult = i.fields.getTextInputValue('age');
		const aboutresult = i.fields.getTextInputValue('about');
		const socialresult = i.fields.getTextInputValue('social');
		const askingresult = i.fields.getTextInputValue('asking');
		
		const portfolio = new EmbedBuilder()
			.setColor('b21f00')
			.setTitle('2️⃣ И ещё кое что!')
			.setDescription('**Если у вас есть примеры ваших работ, обязательно пришлите их, помогает нам узнать ваш опыт работы! Если же нет, тогда просто выберите специальность.**')
		
		const resultembed = new EmbedBuilder()
			.setColor('b21f00')
			.setTitle('Ваша заявка')
			.setDescription(`1) ${nicknameresult}\n2) ${agesresult}\n3) ${socialresult}\n4) ${askingresult}\n5) ${aboutresult}\n\nВаш ник в дискорде: <@${i.user.id}>`)
			.setFooter({ text: `Отлично, осталось выбрать специальность!` })
			
		const embedgetrole = new EmbedBuilder()
			.setColor('b21f00')
			.setTitle('3️⃣ Выберите специальность')
			.setDescription('Можно выбирать только одну специальность за каждый сданный тест!')
			.setFooter({text: `Просто нажмите на меню "Я хочу быть..." и далее выберите то, что вас интересует`})
		
		await i.reply({ ephemeral: false, content: `<@${i.user.id}>, ваша заполненная заявка`, embeds: [resultembed] }).catch(e => {console.log(`Заполненная заявка не отправилась \n ${e}`)});
		await i.channel.send({content: `<@${i.user.id}>`, embeds: [portfolio]});
		await i.channel.send({embeds: [embedgetrole], components: [menu]});
	}
	
});

client.on('messageCreate', async message => {
	if (message.content.toLowerCase().includes('ваша заполненная заявка') && message.author.id === "829349664507166751") {
		message.pin();
	}
});

//Переименовывание канала в белый кружок
client.on("channelCreate", async channel => {

	if (channel.name.toLowerCase().startsWith('ticket-')) {
		chna = channel.name;
		chna = chna.replace('ticket-', '');
		channel.setName(`⚪-`+chna);
	};

});

//Отказаться от прохождения теста
client.on("messageCreate", async message => {
	
	embedset = new EmbedBuilder()
		.setColor('b21f00')
		.setTitle('Выбери, кем ты хочешь быть в команде.')
		.setDescription('Можно выбрать только одну роль за каждый сданный тест!')
	
	menu = new ActionRowBuilder()
			.addComponents(
				new Discord.SelectMenuBuilder()
					.setCustomId('choose')
					.setPlaceholder('Я хочу быть...')
					.addOptions(
						{
							label: '🔴 Тайпер',
							description: 'Вставляет текст в баблы',
							value: 'typesett',
						},
						{
							label: '🟠 ЧБ-Клинер',
							description: 'Очищает ЧБ баблы и звуки от текста',
							value: 'cleanbw',
						},
						{
							label: '🟡 ЦВЕТ-Клинер',
							description: 'Очищает ЦВЕТ баблы и звуки от текста',
							value: 'cleanrnbw',
						},
						{
							label: '🟢 Англист',
							description: 'Переводит текст с Английского',
							value: 'english',
						},
						{
							label: '🟢 Кореист',
							description: 'Переводит текст с Корейского',
							value: 'korean',
						},
						{
							label: '🟢 Китаист',
							description: 'Переводит текст с Китайского',
							value: 'chinese',
						},
						{
							label: '🔵 Редактор',
							description: 'Исправляет ошибки при переводе',
							value: 'redactor',
						},
						{
							label: '🟣 Бета-ридер',
							description: 'Придирчивый читатель, контроль перед выкладкой',
							value: 'betaread',
						},
						{
							label: '🔶 ЧБ-Звуковик',
							description: 'Отрисовка звуков в ЧБ-тайтлах',
							value: 'soundbw',
						},
						{
							label: '🔷 ЦВЕТ-Звуковик',
							description: 'Отрисовка звуков в ЦВЕТ-тайтлах',
							value: 'soundrnbw',
						},
						
					)
					
			)
	
	if (message.content.toLowerCase().startsWith('dit!я передумал') || message.content.toLowerCase().startsWith('dit!отказаться от теста')) {
		var n = 0;
		const userroles = ['776419385555681301', '1043183218498748516', '764158111388139580', '821877453084950576', '824370693562957934', '964968644486520903', '1023659545156931646', '880920185740070942', '955439462307999814', '955439462307999814', '861411342586347530', '964967880284311592']
		while (n != 10) {
			var role = message.guild.roles.cache.find(role => role.id = userroles[n]);
			var user = message.guild.members.cache.get(message.author.id);
			user.roles.remove(role);
			n += 1;
		}

		message.channel.send('**Вы отказались от теста!** Сейчас сниму с вас роль новичка и пришлю на выбор другие специльности...\n\n*Не времените с выбором!*');
		function setnew() {
			//message.channel.setName(`⚪-${message.author.username}`).catch(e => {`Канала не существует \n ${e}`});
			message.channel.setParent('812507835027292191', {lockPermissions: false}).catch(e => {`Канала не существует \n ${e}`});
			message.channel.send({content: `Выберите другой тест <@${message.author.id}>`, embeds: [embedset], ephemeral: false, components: [menu]}).catch((e) => {console.log(`Сообщение с выбором роли не отправилось: \n ${e}`)});
		}
		setTimeout(setnew, 5000);
	}

});

//РАБОТА С ТИКЕТАМИ
client.on('interactionCreate', async i => {
	
	if (!i.isSelectMenu()) return;
	
	async function tickethelp(roleid, ticktest, tickparent, movetick, whotick, rolecolor, colorchoose, testlink) {
		
		check = i.guild.channels.cache.get(i.channel.id).name.includes("⚪") || i.guild.channels.cache.get(i.channel.id).name.includes("ticket");
		

		if (      i.guild.channels.cache.get(i.channel.id).parentId==='943206789573390456' //тайперы
			   || i.guild.channels.cache.get(i.channel.id).parentId==='943207045488857088' //чб-клинеры
			   || i.guild.channels.cache.get(i.channel.id).parentId==='1051540198443462736' //цвет-клинеры
			   || i.guild.channels.cache.get(i.channel.id).parentId==='943207090330173510' //переводчики
			   || i.guild.channels.cache.get(i.channel.id).parentId==='943207121305075732' //редакторы
			   || i.guild.channels.cache.get(i.channel.id).parentId==='941668436151525436' //беты
			   || i.guild.channels.cache.get(i.channel.id).parentId==='971490776695590965') { //звуковики) {
			i.channel.send(`<@${i.user.id}>, вы не можете выбрать больше одного теста на выполнение, пожалуйста завершите для начала этот, а уже затем приступайте к следующему. \n\n *Если вы передумали сдавать этот тест, пропишите \`dit!я передумал\` или \`dit!отказаться от теста\`*`);
			return;
		}



			//Выдача роли на сервере для собеседований
			var role = i.guild.roles.cache.find(role => role.id = roleid);
			var user = i.guild.members.cache.get(i.user.id);
			user.roles.add(role);
			
			//Ссылка на тест
			const testlinkbutton = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('✨ Ссылка на тест ✨')
					.setURL(testlink)
					.setStyle(ButtonStyle.Link),
			);
			
			//Эмбед с тестом
			const embedwithtest = new EmbedBuilder()
			   .setTitle(`4️⃣ Тест на ${whotick}`)
			   .setColor(colorchoose)
			   .setDescription(ticktest)
			
			
			//Отсылает тест в чат
			i.channel.send({
				content: `<@${i.user.id}>`,
				embeds: [embedwithtest],
				components: [testlinkbutton],
				ephemeral: false,
			});

			//Отсылает тест в лс юзеру
			const userdm = await client.users.fetch(i.user.id);
			userdm.send(`__**Вы подали заявку в Dead Inside Team**__\n\nВаш тест: \n${ticktest}`).catch((e) => {console.log(`У пользователя закрыто ЛС, сообщение не отправлено. \n ${e}`)});

			//Сообщает о том что передвижение прошло успешно
			i.channel.setParent(tickparent, {lockPermissions: false}) && i.channel.send(`Передвинул твой тикет в категорию с ${movetick}`)

			//Переименовывает канал
			String.prototype.replaceAt = function(index, replacement) {
				return this.substring(0, index) + replacement + this.substring(index + 1);
			}

			let chname = i.guild.channels.cache.get(i.channel.id).name;
			function setName() {
				i.channel.setName(`${chname.replaceAt(0, rolecolor)}`);
			}
			setTimeout(setName, 2550);
		

			//Отсылает в логи информацию о действии
			i.guild.channels.cache.get('1024324318232064081').send({
				content: `Пользователь <@${i.user.id}> запросил(а) тест на **${whotick}** в канале <#${i.channel.id}>`,
				ephemeral: false,
			});	
		
	}
	
	let memory = (i.guild.channels.cache.get(i.channel.id).parentId === '812507835027292191' // собеседование
			   || i.guild.channels.cache.get(i.channel.id).parentId==='943206789573390456' //тайперы
			   || i.guild.channels.cache.get(i.channel.id).parentId==='943207045488857088' //чб-клинеры
			   || i.guild.channels.cache.get(i.channel.id).parentId==='1051540198443462736' //цвет-клинеры
			   || i.guild.channels.cache.get(i.channel.id).parentId==='943207090330173510' //переводчики
			   || i.guild.channels.cache.get(i.channel.id).parentId==='943207121305075732' //редакторы
			   || i.guild.channels.cache.get(i.channel.id).parentId==='941668436151525436' //беты
			   || i.guild.channels.cache.get(i.channel.id).parentId==='971490776695590965'); //звуковики
    if (!memory) {
        i.reply({content:'Ты не находишься в канале тикета', ephemeral: true});
    } else {
		
		if (i.customId === "choose") {
			let check = i.values[0];
			
			if (check === "typesett") {
				tickethelp('776419385555681301', typesetttext, '943206789573390456', 'Тайперами', 'Тайпера', '🔴', 'e81224', 'https://discord.com/channels/662758924545687554/1017804591213068358/1017806674028929086')//.catch((e) => {console.log(`Тест на Тайперов не отправилася \n ${e}`)});
			}
			
			if (check === "cleanbw") {
				tickethelp('764158111388139580', cleanbw, '943207045488857088', 'ЧБ-Клинерами', 'ЧБ-Клинера', '🟠', 'f7630c', 'https://docs.google.com/document/d/1ZYKRJeR_4afMxdgCxTybmBLFFU8CFdtNhW6iPXaW4a0/edit?usp=sharing').catch((e) => {console.log(`Тест на ЧБ-Клинеров не отправился \n ${e}`)});
			}
			
			if (check === "cleanrnbw") {
				tickethelp('821877453084950576', cleanrainbow, '1051540198443462736', 'ЦВЕТ-Клинерами', 'ЦВЕТ-Клинера', '🟡', 'fff100', 'https://cdn.discordapp.com/attachments/866657284645584916/987019798007414794/947540138211291138.png').catch((e) => {console.log(`Тест на ЦВЕТ-Клинера не отправился \n ${e}`)});			
			}
			
			if (check === "english") {
				tickethelp('824370693562957934', english, '943207090330173510', 'Переводчиками', 'Англиста', '🟢', '16c60c', 'https://drive.google.com/drive/folders/13UPKn1TJtj_jhUm66UVh5rEEzc-cWV6x').catch((e) => {console.log(`Тест на Англиста не отправился \n ${e}`)}); 
				
			}
			
			if (check === "korean") {
				tickethelp('964968644486520903', koreist, '943207090330173510', 'Переводчиками', 'Кореиста', '🟢', '16c60c', 'https://drive.google.com/drive/folders/17NgniovVSoANUB9QH0CAqPti6ODZkTfv?usp=sharing').catch((e) => {console.log(`Тест на Кореиста не отправился \n ${e}`)}); 
				function setpos() {
					var korech = i.guild.channels.cache.get('1022501560145690664').position;
					i.channel.setPosition(korech + 0);
				}
				setTimeout(setpos, 2500);
			}
			
			
			if (check === "chinese") {
				tickethelp('1023659545156931646', chinese, '943207090330173510', 'Переводчиками', 'Китаиста', '🟢', '16c60c', 'https://drive.google.com/drive/folders/1j1ks6a8MvyJ2OlwZV8bgXFz8l35fNMIE?usp=sharing').catch((e) => {console.log(`Тест на Китаиста не отправился \n ${e}`)}); 
				function setpos() {
					var chich = i.guild.channels.cache.get('1023659183607914626').position;
					i.channel.setPosition(chich + 0);
				}
				setTimeout(setpos, 2500);
			}
			
			if (check === "redactor") {
				tickethelp('880920185740070942', redactor, '943207121305075732', 'Редакторами', 'Редактора', '🔵', '0078d7', 'https://docs.google.com/document/d/1chHWJZNPm9fk6O-wQzgrDR_XWnxvEqcs07nlHPYfhUM/edit').catch((e) => {console.log(`Тест на Редактора не отправился \n ${e}`)}); 
			}
			
			if (check === "betaread") {
				tickethelp('955439462307999814', betaread, '941668436151525436', 'Бета-ридерами', 'Бета-ридера', '🟣', '886ce4', 'https://drive.google.com/drive/folders/1--eyTyGX8rCOVDX1Yh-vHCPSeEG9fUM8?usp=sharing').catch((e) => {console.log(`Тест на Бета-ридера не отправился \n ${e}`)}); 
			}
			
			if (check === "soundbw") {
				tickethelp('861411342586347530', soundbw, '971490776695590965', 'Звуковиками', 'ЧБ-Звуковика', '🔶', 'f7630c', 'https://drive.google.com/drive/folders/1Tuq_-0sR6qppljvDbb5Rk2eRzLSoS_I6?usp=sharing').catch((e) => {console.log(`Тест на ЧБ-Звуковика не отправился \n ${e}`)}); 
				function setpos() {
					var soundchb = i.guild.channels.cache.get('971491181546590248').position;
					i.channel.setPosition(soundchb + 0);
				}
				setTimeout(setpos, 2500);
			}
			
			if (check === "soundrnbw") {
				tickethelp('964967880284311592', soundrainbow, '971490776695590965', 'Звуковиками', 'ЦВЕТ-Звуковика', '🔷', '0078d7', 'https://drive.google.com/drive/folders/1rgdJ6w4oNWUwDNet-XFXm5CcjEjrD9aA?usp=sharing').catch((e) => {console.log(`Тест на ЦВЕТ-Звуковика не отправился \n ${e}`)}); 
				function setpos() {
					var soundrainbw = i.guild.channels.cache.get('971491326220722236').position;
					i.channel.setPosition(soundrainbw + 0);
				}
				setTimeout(setpos, 2500);
			}
			
		};
	}
});
//РАБОТА С ИДЕЯМИ И ЖАЛОБАМИ
var useridfor;
client.on("interactionCreate", async i => {
	
	if (i.commandName === "ответить") {
		const userid = i.options.getUser('участник');
		const textansw = i.options.getString('ответ');
		const userdm = await client.users.fetch(userid);
		userdm.send(`${textansw}\n\n Не отвечайте на этот ответ в ЛС бота. Если хочешь пообщаться на эту тему, пиши <@${i.user.id}> на сервере`).catch((e) => {console.log(`У пользователя закрыто ЛС, не могу отправить сообщение \n ${e}`)});
		i.reply({content:`Сообщение отправлено!\nТекст сообщения:\n${textansw}\n\nПолучатель: ${userid}`, ephemeral: true})
		i.guild.channels.cache.get('1024324318232064081').send({
			content:`Пользователь <@${i.user.id}> ответил на идею или жалобу сообщением: \n ${textansw} \n\n Участнику ${userid}\nВ канале <#${i.channel.id}>`,
			ephemeral: false,
		})
	};
});

client.on("interactionCreate", async i => {
	if (!i.isButton) return;
	
	useridfor = i.user.id;
	
	if (i.customId === "idea") {
		
		const ideamodal = new ModalBuilder()
			.setCustomId('ideamodal')
			.setTitle('Подать идею')
		
		const ideafor = new TextInputBuilder()
			.setCustomId('ideafor')
			.setLabel('Идея для сервера, бота или команды')
			.setPlaceholder('У меня есть идея для...')
			.setStyle(TextInputStyle.Paragraph);
			
		const ideaforrow = new ActionRowBuilder().addComponents(ideafor);
		ideamodal.addComponents(ideaforrow);
		
		await i.showModal(ideamodal);
	}
	
	if (i.customId === "bad") {
		
		const badmodal = new ModalBuilder()
			.setCustomId('badmodal')
			.setTitle('Подать жалобу')
		
		const badfor = new TextInputBuilder()
			.setCustomId('badfor')
			.setLabel('Участник, мук или ситуация на сервере')
			.setPlaceholder('Хочу пожаловаться на...')
			.setStyle(TextInputStyle.Paragraph);
			
		const badforrow = new ActionRowBuilder().addComponents(badfor);
		badmodal.addComponents(badforrow);
		
		await i.showModal(badmodal);
	}
	
});

client.on("interactionCreate", async i => {
	if (!i.isModalSubmit()) return;
	try {
		
		if (i.customId === "ideamodal") {
			
			const ideatext = i.fields.getTextInputValue('ideafor');
			const getembed = new EmbedBuilder()
				.setColor('b21f00')
				.setTitle('Отправлена Идея')
				.setDescription(ideatext)
			await i.reply({content: 'Спасибо за идею! Мы прислушаемся к вам!', ephemeral: true});
			
			await i.guild.channels.cache.get('1022147804853981264').send({content: `<@${useridfor}>, отправил идею:`, embeds:[getembed]});
			await i.guild.channels.cache.get('1024324318232064081').send({content: `Пользователь <@${i.user.id}> отправил идею в канале <#${i.channel.id}>, проверяй <#1022147804853981264>`, ephemeral:false});
			
		};
		
		if(i.customId === "badmodal") {
			
			const badtext = i.fields.getTextInputValue('badfor');
			const getembed2 = new EmbedBuilder()
            .setColor('b21f00')
            .setTitle('Отправлена Жалоба')
            .setDescription(badtext)
            await i.reply({content:'Спасибо за обращение! Надеюсь, мы сможем решить вашу проблему.',ephemeral:true})
			
			await i.guild.channels.cache.get('1022147804853981264').send({content: `<@${useridfor}>, отправил жалобу:`, embeds:[getembed2]});
			await i.guild.channels.cache.get('1024324318232064081').send({content: `Пользователь <@${i.user.id}> отправил жалобу в канале <#${i.channel.id}>, проверяй <#1022147804853981264>`, ephemeral:false})
    }
		
		
	} catch (err) {console.log(`Идея или жалоба не отправилися \n ${err}`)}
	
	
});

//КОМАНДА "ВЫДАТЬРОЛЬ"

client.on("interactionCreate", async i => {
	
	if (i.commandName === "выдатьроль") {
		try {
			const rolese = i.options.getRole('роль');
			const userse = i.options.getUser('участник');
			var role = i.guild.roles.cache.find(role => role.id === rolese.id);
			var user = i.guild.members.cache.get(userse.id);
		
			if (!rolese.editable) {
				await i.reply({content: "Не могу выдать роль выше своей.", ephemeral: true});
			} else {
			
				user.roles.add(role);
			
				await i.reply({content: `Выдал роль <@&${role.id}>, <@${userse.id}>`, ephemeral:true,}) &&
				await i.guild.channels.cache.get('1024324318232064081').send({content: `Пользователь <@${i.user.id}> выдал роль <@&${role.id}> участнику <@${userse.id}>, в канале <#${i.channel.id}>`, ephemeral:false});
			
			}
		} catch (err) {
			console.log(`Роль не выдалась \n ${err}`)
		}
	}
	
	if (i.commandName === "снятьроль") {
		try {
			const rolese = i.options.getRole('роль');
			const userse = i.options.getUser('участник');
			var role = i.guild.roles.cache.find(role => role.id === rolese.id);
			var user = i.guild.members.cache.get(userse.id);
		
			if (!rolese.editable) {
				await i.reply({content: "Не могу снять роль выше своей.", ephemeral: true});
			} else {
			
				user.roles.remove(role);
			
				await i.reply({content: `Снял роль <@&${role.id}>, <@${userse.id}>`, ephemeral:true,}) &&
				await i.guild.channels.cache.get('1024324318232064081').send({content: `Пользователь <@${i.user.id}> снял роль <@&${role.id}> участнику <@${userse.id}>, в канале <#${i.channel.id}>`, ephemeral:false});
			
			}
		} catch (err) {
			console.log(`Роль не снялась \n ${err}`)
		}
	}
	
});
//РАЗВЛЕКАТЕЛЬНАЯ ЧАСТЬ БОТА
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    
    if (interaction.commandName === 'поцеловать') {
        const gifs = [
            "https://c.tenor.com/dn_KuOESmUYAAAAC/engage-kiss-anime-kiss.gif",
            "https://c.tenor.com/jnndDmOm5wMAAAAC/kiss.gif",
            "https://c.tenor.com/bM6UK1pmoRQAAAAC/kiss-anime.gif",
            "https://c.tenor.com/A4D3Mk-Y2h4AAAAC/chuunibyou-anime.gif",
            "https://c.tenor.com/jN35LrknUpkAAAAC/test.gif",
        ];
        try {
            const random = Math.floor(Math.random() * gifs.length);
            const userkiss = interaction.options.getMember('выбрать');
            const embedhug = new EmbedBuilder()
				.setColor('#b21f00')
				.setTitle('Поцелуйчик!')
				.setImage(gifs[random])
            console.log('Кто-то отослал эту гифку с поцелуем:' + gifs[random]);
            interaction.reply({ephermal:false, embeds:[embedhug], content: `<@${interaction.user.id}>, поцеловал(а) <@${userkiss.id}>`});
        } catch (err) {
            interaction.reply('Неверно введены данные или что-то пошло не так.');
        }
    }

    if (interaction.commandName === 'погладить') {
        const gifs = [
            "https://c.tenor.com/E6fMkQRZBdIAAAAC/kanna-kamui-pat.gif",
            "https://c.tenor.com/wLqFGYigJuIAAAAC/mai-sakurajima.gif",
            "https://c.tenor.com/rZRQ6gSf128AAAAC/anime-good-girl.gif",
            "https://c.tenor.com/o_E-CURRMwYAAAAd/anya-forger-loid-forger.gif",
            "https://c.tenor.com/079CvbmFPe8AAAAC/qualidea-code-head-pat.gif",
            "https://c.tenor.com/u_LI3wFaRwYAAAAC/bebe-rub.gif",
        ];
        try {
			const random = Math.floor(Math.random() * gifs.length);
            const userpat = interaction.options.getMember('выбрать');
            const embedhug = new EmbedBuilder()
				.setColor('#b21f00')
				.setTitle('МЕГАХАРОШ!')
				.setImage(gifs[random])
            console.log('Кто-то отослал эту гифку с поглаживанием:' + gifs[random]);
            interaction.reply({ephermal:false, embeds:[embedhug], content: `<@${interaction.user.id}>, погладил(а) <@${userpat.id}>`});
        } catch (err) {
            interaction.reply('Неверно введены данные или что-то пошло не так.');
        }
    }
    
    if (interaction.commandName === 'ударить') {
        const gifs = [
                    "https://c.tenor.com/zPoV7oxWt-IAAAAd/slap-chopalah.gif", 
                    "https://c.tenor.com/z-bP0d5aYnMAAAAC/golpe-anime.gif", 
                    "https://c.tenor.com/pHCT4ynbGIUAAAAC/anime-girl.gif", 
                    "https://c.tenor.com/SwMgGqBirvcAAAAC/saki-saki-kanojo-mo-kanojo.gif", 
                    "https://c.tenor.com/p_mMicg1pgUAAAAC/anya-forger-damian-spy-x-family.gif",
                    "https://c.tenor.com/VrWzG0RWmRQAAAAC/anime-punch.gif"
        ];
        try {
			const random = Math.floor(Math.random() * gifs.length);
			const userchapolah = interaction.options.getMember('выбрать');
			const embedhug = new EmbedBuilder()
				.setColor('#b21f00')
				.setTitle('АДСКИЙ ЧОПАЛАХ ТЕБЕ!')
				.setImage(gifs[random])
			console.log('Кто-то отослал эту гифку с ударом:' + gifs[random]);
			interaction.reply({ephermal:false, embeds:[embedhug], content: `<@${interaction.user.id}>, прописал(а) адский чопалах <@${userchapolah.id}>`});
		} catch (err) {
            interaction.reply('Неверно введены данные или что-то пошло не так.');
        }
        
    }

	if (interaction.commandName === 'обнять') {
		const gifs = [
					"https://c.tenor.com/fVzK5G68cYcAAAAC/hugs-cuddle.gif", 
					"https://c.tenor.com/jU9c9w82GKAAAAAC/love.gif", 
					"https://c.tenor.com/W-R9sPkk_IMAAAAC/come-here-hugs.gif", 
					"https://c.tenor.com/kCZjTqCKiggAAAAC/hug.gif", 
					"https://c.tenor.com/h9222Kcym9MAAAAd/cat-bagel.gif"
		];
	
		try {
			const random = Math.floor(Math.random() * gifs.length);
			const userhug = interaction.options.getMember('выбрать');
			const embedhug = new EmbedBuilder()
				.setColor('#b21f00')
				.setTitle('Обнимашки!')
				.setImage(gifs[random])
			console.log('someone send this hug gif:' + gifs[random]);
			interaction.reply({ephermal:false, embeds:[embedhug], content: `<@${interaction.user.id}>, обнял(а) <@${userhug.id}>`});
		} catch (err) {
			interaction.reply('Неверно введены данные или что-то пошло не так.');
		}
    
	}

	if (interaction.commandName === 'обозвать') {
		const gifs = [
			"https://c.tenor.com/Xcr8fHyf84gAAAAC/baka-anime.gif",
			"https://c.tenor.com/9hpTx40GEKsAAAAC/baka-idiot.gif",
			"https://c.tenor.com/bd5bGRCMdwwAAAAd/among-us-sussy-baka-sus-check.gif",
			"https://c.tenor.com/-nd5gZ0KwZwAAAAC/sussy-baka.gif",
			"https://c.tenor.com/rBro6BqK5igAAAAC/sophie-twilight.gif",
		];
		try {
			const random = Math.floor(Math.random() * gifs.length);
			const userbaka = interaction.options.getMember('выбрать');
			const embedbaka = new EmbedBuilder()
				.setColor('#b21f00')
				.setTitle('Бака!')
				.setImage(gifs[random])
			console.log('someone send this baka gif:' + gifs[random]);
			interaction.reply({ephermal:false, embeds:[embedbaka], content: `<@${interaction.user.id}>, обозвал(а) бакой <@${userbaka.id}>`});
		} catch (err) {
			interaction.reply('Неверно введены данные или что-то пошло не так');
		}
	};
    

});

client.login(token);