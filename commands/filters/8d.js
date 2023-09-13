import { Command } from '../../structures/index.js';
export default class _8d extends Command {
    constructor(client) {
        super(client, {
            name: '8d',
            description: {
                content: 'on/off 8d filter',
                examples: ['8d'],
                usage: '8d',
            },
            category: 'filters',
            aliases: ['3d'],
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
        if (!player)
            return;
        if (player.filters.includes('8D')) {
            player.player.setRotation();
            player.filters.splice(player.filters.indexOf('8D'), 1);
            ctx.sendMessage({
                embeds: [
                    {
                        description: '8D filter has been disabled',
                        color: client.color.main,
                    },
                ],
            });
        }
        else {
            player.player.setRotation({ rotationHz: 0.2 });
            player.filters.push('8D');
            ctx.sendMessage({
                embeds: [
                    {
                        description: '8D filter has been enabled',
                        color: client.color.main,
                    },
                ],
            });
        }
    }
}
