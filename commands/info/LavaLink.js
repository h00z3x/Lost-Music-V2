import { Command } from '../../structures/index.js';
export default class LavaLink extends Command {
    constructor(client) {
        super(client, {
            name: 'lavalink',
            description: {
                content: 'Shows the current Lavalink stats',
                examples: ['lavalink'],
                usage: 'lavalink',
            },
            category: 'info',
            aliases: ['ll'],
            cooldown: 3,
            args: false,
            player: {
                voice: false,
                dj: false,
                active: false,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: [],
            },
            slashCommand: true,
        });
    }
    async run(client, ctx) {
        let nodes = [];
        client.shoukaku.nodes.forEach((node) => {
            try {
                nodes.push([
                    { name: "Name", value: `${node.name} (${node.stats ? "🟢" : "🔴"})` },
                    { name: "Player", value: `${node.stats.players}` },
                    { name: "Playing Players", value: `${node.stats.playingPlayers}` },
                    { name: "Uptime", value: `${client.utils.formatTime(node.stats.uptime)}` },
                    { name: "Cores", value: `${node.stats.cpu.cores + " Core(s)"}` },
                    { name: "Memory Usage", value: `${client.utils.formatBytes(node.stats.memory.used)}/${client.utils.formatBytes(node.stats.memory.reservable)}` },
                    { name: "System Load", value: `${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%` },
                    { name: "Lavalink Load", value: `${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%` },
                ]);
            }
            catch (e) {
                console.log(e);
            }
        });

        let fields = [];

        for (let i = 0; i < nodes.length; i+=3) {
            nodes[i+2]?fields.push([...nodes[i], ...nodes[i+1], ...nodes[i+2]]):
                nodes[i+1]?fields.push([...nodes[i], ...nodes[i+1]]):
                    fields.push(...nodes[i]);
        }

        for (const field of fields) {
            const embed = this.client.embed();
            embed.setTitle("Lavalink Stats");
            embed.setColor(this.client.color.main);
            embed.setThumbnail(this.client.user.avatarURL({}));
            embed.setTimestamp();
            for (let x of field) {
                embed.addFields(x);
            }
            await ctx.sendMessage({ embeds: [embed] })
        }
    }
}
