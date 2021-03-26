import { Client, Collection } from "discord.js";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

export class CobaltClient extends Client {
    constructor(options: any) {
        super(options);        
    };

    this.config = dotenv.config();
    this.commands = new Collection();
    this.aliases = new Collection();
    this.cooldowns = new Collection();

    loadCommands = () => {
        const categories = fs.readdirSync('./commands/').filter(file => fs.statSync(path.join('./commands/', file)).isDirectory());

        categories.forEach(c => {
            fs.readdir(`./commands/${c}/`, async (err, files) => {
                if (err) throw err;
                console.log(`[Commands]\tLoaded ${files.length} commands of category ${c}`);
                files.forEach(f => {
                    const props = require(`./commands/${c}/${f}`);
                    this.commands.set(props.help.name, props);
                    props.conf.aliases.forEach(alias => {
                        this.aliases.set(alias, props.help.name);
                    });
                });
            });
        });
    };

    loadEvents = () => {
        fs.readdir('./events/', async (err, files) => {
            if (err) return console.error;
            console.log(`[Event]\tLoaded a total amount ${files.length} Events`);
            files.forEach(file => {
                if (!file.endsWith('.js')) return;
                const evt = require(`./events/${file}`);
                let evtName = file.split('.')[0];
                this.on(evtName, evt.bind(null, this))
            });
        });
    };
};