const { SlashCommandBuilder, Routes } = require('discord.js');
const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	
    new SlashCommandBuilder().setName('выдатьроль').setDescription('Выдать роль участнику')
    .addUserOption(option => option.setName('участник').setDescription('Выбрать участника'))
    .addRoleOption(option => option.setName('роль').setDescription('Выбрать роль')),
    new SlashCommandBuilder().setName('снятьроль').setDescription('Снять роль участнику')
    .addUserOption(option => option.setName('участник').setDescription('Выбрать участника'))
    .addRoleOption(option => option.setName('роль').setDescription('Выбрать роль')),
	
	
	
	
    new SlashCommandBuilder().setName('погладить').setDescription('Погладить участника')
    .addSubcommand(subcommand => subcommand
        .setName('участника')
        .setDescription('Выбрать участника')
        .addUserOption(option => option.setName('выбрать').setDescription('Выбор участника'))),
        new SlashCommandBuilder().setName('поцеловать').setDescription('Поцеловать участника')
    .addSubcommand(subcommand => subcommand
        .setName('участника')
        .setDescription('Выбрать участника')
        .addUserOption(option => option.setName('выбрать').setDescription('Выбор участника'))),
    new SlashCommandBuilder().setName('ударить').setDescription('Ударить участника')
    .addSubcommand(subcommand => subcommand
        .setName('участника')
        .setDescription('Выбрать участника')
        .addUserOption(option => option.setName('выбрать').setDescription('Выбор участника'))),
    new SlashCommandBuilder().setName('обозвать').setDescription('Обозвать участника')
    .addSubcommand(subcommand => subcommand
        .setName('участника')
        .setDescription('Выбрать участника')
        .addUserOption(option => option.setName('выбрать').setDescription('Выбор участника'))),
    new SlashCommandBuilder().setName('обнять').setDescription('Обнять участника')
    .addSubcommand(subcommand => subcommand
        .setName('участника')
        .setDescription('Выбрать участника')
        .addUserOption(option => option.setName('выбрать').setDescription('Выбор участника'))),
    
    
]
    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Успешно зарегистрировал команду'))
    .catch(console.error);