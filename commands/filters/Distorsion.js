import { Command } from '../../structures/index.js';
export default class Distorsion extends Command {
    constructor(client) {
        super(client, {
            name: 'distorsion',
            description: {
                content: 'on/off distorsion filter',
                examples: ['distorsion'],
                usage: 'distorsion',
            },
            category: 'filters',
            aliases: ['distorsion'],
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
        if (player.filters.includes('distorsion')) {
            player.player.setDistortion({});
            player.filters.splice(player.filters.indexOf('distorsion'), 1);
            ctx.sendMessage({
                embeds: [
                    {
                        description: 'Distorsion filter has been disabled',
                        color: client.color.main,
                    },
                ],
            });
        }
        else {
            player.player.setDistortion({
                sinOffset: 0,
                sinScale: 1,
                cosOffset: 0,
                cosScale: 1,
                tanOffset: 0,
                tanScale: 1,
                offset: 0,
                scale: 1,
            });
            player.filters.push('distorsion');
            ctx.sendMessage({
                embeds: [
                    {
                        description: 'Distorsion filter has been enabled',
                        color: client.color.main,
                    },
                ],
            });
        }
    }
}
