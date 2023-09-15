import { Command } from '../../structures/index.js';
export default class Karaoke extends Command {
    constructor(client) {
        super(client, {
            name: 'karaoke',
            description: {
                content: 'on/off the karaoke filter',
                examples: ['karaoke'],
                usage: 'karaoke',
            },
            category: 'filters',
            aliases: ['kk'],
            cooldown: 3,
            args: false,
            player: {
                voice: false,
                dj: true,
                active: false,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: [],
            },
            slashCommand: true,
            options: [],
        });
    }
    async run(client, ctx, args) {
        const player = client.queue.get(ctx.guild.id);
        if (player.filters.includes('karaoke')) {
            player.player.setKaraoke();
            player.filters.splice(player.filters.indexOf('karaoke'), 1);
            ctx.sendMessage({
                embeds: [
                    {
                        description: 'Karaoke filter has been disabled',
                        color: client.color.main,
                    },
                ],
            });
        }
        else {
            player.player.setKaraoke({
                level: 1,
                monoLevel: 1,
                filterBand: 220,
                filterWidth: 100,
            });
            player.filters.push('karaoke');
            ctx.sendMessage({
                embeds: [
                    {
                        description: 'Karaoke filter has been enabled',
                        color: client.color.main,
                    },
                ],
            });
        }
    }
}
