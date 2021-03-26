import { Intents } from "discord.js";
import { CobaltClient } from "./utils/cobaltClient";

const cobalt = new CobaltClient({ ws: {intents: Intents.ALL }, partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER']});