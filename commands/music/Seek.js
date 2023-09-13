import { Command } from '../../structures/index.js';
export default class Seek extends Command {
    constructor(client) {
        super(client, {
            name: 'seek',
            description: {
                content: 'Seeks to a certain time in the song',
                examples: ['seek 1m, seek 1h 30m'],
                usage: 'seek <time>',
            },
            category: 'music',
            aliases: ['s'],
            cooldown: 3,
            args: true,
            player: {
                voice: true,
                dj: false,
                active: true,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: [],
            },
            slashCommand: true,
            options: [
                {
                    name: 'time',
                    description: 'The time to seek to',
                    type: 3,
                    required: true,
                }
            ]
        });
    }
    async run(client, ctx, args) {
        const player = client.queue.get(ctx.guild.id);
        const embed = this.client.embed();
        const time = client.utils.parseTime(args[0]);
        if (!time)
            return ctx.sendMessage({
                embeds: [embed.setColor(this.client.color.red).setDescription('Invalid time format.')],
            });
        player.seek(time);
        return ctx.sendMessage({
            embeds: [embed.setColor(this.client.color.main).setDescription(`Seeked to ${args[0]}`)],
        });
    }
}
/**
 * Project: lavamusic
 * Author: Blacky
 * Company: Coders
 * Copyright (c) 2023. All rights reserved.
 * This code is the property of Coder and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/ns8CTk9J3e
 */
