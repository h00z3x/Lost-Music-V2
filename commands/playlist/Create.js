import { ApplicationCommandOptionType } from "discord.js";
import { Command } from "../../structures/index.js";
export default class Create extends Command {
    constructor(client) {
        super(client, {
            name: "create",
            description: {
                content: "Creates a playlist",
                examples: ["create <name>"],
                usage: "create <name>"
            },
            category: "playlist",
            aliases: ["create"],
            cooldown: 3,
            args: true,
            player: {
                voice: false,
                dj: false,
                active: false,
                djPerm: null
            },
            permissions: {
                dev: false,
                client: ["SendMessages", "ViewChannel", "EmbedLinks"],
                user: []
            },
            slashCommand: true,
            options: [
                {
                    name: "name",
                    description: "The name of the playlist",
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        });
    }
    async run(client, ctx, args) {
        const name = args.join(" ").replace(/\s/g, "");
        if (name.length > 50)
            return ctx.sendMessage({
                embeds: [{
                        description: "Playlist names can only be 50 characters long",
                        color: client.color.red
                    }]
            });
        const user = await client.prisma.user.findFirst({
            where: {
                userId: ctx.author.id
            }
        })
        if (!user)
            await client.prisma.user.create({
                data: {
                    userId: ctx.author.id
                }
            })
        const playlist = await client.prisma.playlist.findFirst({
            where: {
                userId: ctx.author.id,
                name: name
            }
        });
        if (playlist)
            return ctx.sendMessage({
                embeds: [{
                        description: "A playlist with that name already exists",
                        color: client.color.main
                    }]
            });
        const emptyArray = [];
        await client.prisma.playlist.create({
            data: {
                name: name,
                userId: ctx.author.id,
                songs: JSON.stringify(emptyArray)
            }
        });
        return ctx.sendMessage({
            embeds: [{
                    description: `Playlist **${name}** has been created`,
                    color: client.color.main
                }]
        });
    }
}
