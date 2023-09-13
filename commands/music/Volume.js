import { Command } from '../../structures/index.js';
export default class Volume extends Command {
    constructor(client) {
        super(client, {
            name: 'volume',
            description: {
                content: 'Sets the volume of the player',
                examples: ['volume 100'],
                usage: 'volume <number>',
            },
            category: 'music',
            aliases: ['vol'],
            cooldown: 3,
            args: true,
            player: {
                voice: true,
                dj: true,
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
                    name: 'number',
                    description: 'The volume you want to set',
                    type: 4,
                    required: true,
                },
            ],
        });
    }
    async run(client, ctx, args) {
        const player = client.queue.get(ctx.guild.id);
        const embed = this.client.embed();
        const number = Number(args[0]);
        if (isNaN(number))
            return ctx.sendMessage({
                embeds: [embed.setColor(this.client.color.red).setDescription('Please provide a valid number.')],
            });
        if (number > 200)
            return ctx.sendMessage({
                embeds: [embed.setColor(this.client.color.red).setDescription("The volume can't be higher than 200.")],
            });
        if (number < 0)
            return ctx.sendMessage({
                embeds: [embed.setColor(this.client.color.red).setDescription("The volume can't be lower than 0.")],
            });
        player.player.setVolume(number / 100);
        return ctx.sendMessage({
            embeds: [
                embed.setColor(this.client.color.main).setDescription(`Set the volume to ${(player.volume * 100).toFixed()}`),
            ],
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
