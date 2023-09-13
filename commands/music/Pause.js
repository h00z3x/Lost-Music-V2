import { Command } from '../../structures/index.js';
export default class Pause extends Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            description: {
                content: 'Pauses the current song',
                examples: ['pause'],
                usage: 'pause',
            },
            category: 'music',
            aliases: [],
            cooldown: 3,
            args: false,
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
            options: [],
        });
    }
    async run(client, ctx, args) {
        const player = client.queue.get(ctx.guild.id);
        const embed = this.client.embed();
        if (!player.paused) {
            player.pause();
            return ctx.sendMessage({
                embeds: [embed.setColor(this.client.color.main).setDescription(`Paused the song`)],
            });
        }
        else {
            return ctx.sendMessage({
                embeds: [embed.setColor(this.client.color.red).setDescription(`The song is already paused`)],
            });
        }
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
