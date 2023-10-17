import { Event } from '../../structures/index.js';
import { ChannelType } from 'discord.js';
import { updateSetup } from '../../utils/SetupSystem.js';
export default class VoiceStateUpdate extends Event {
    constructor(client, file) {
        super(client, file, {
            name: 'voiceStateUpdate',
        });
    }
    async run(oldState, newState) {
        const guildId = newState.guild.id;
        if (!guildId)
            return;
        const player = this.client.queue.get(guildId);
        if (!player)
            return;
        if (newState.guild.members.cache.get(this.client.user.id) &&
            !newState.guild.members.cache.get(this.client.user.id).voice.channelId) {
            if (player) {
                await updateSetup(this.client, newState.guild);
                return player.destroy();
            }
        }
        if (newState.id === this.client.user.id &&
            newState.channelId &&
            newState.channel.type == ChannelType.GuildStageVoice &&
            newState.guild.members.me.voice.suppress) {
            if (newState.guild.members.me.permissions.has(['Connect', 'Speak']) ||
                newState.channel.permissionsFor(newState.guild.members.me).has('MuteMembers')) {
                await newState.guild.members.me.voice.setSuppressed(false).catch(() => { });
            }
        }
        if (newState.id == this.client.user.id)
            return;
        const vc = newState.guild.channels.cache.get(player.player.connection.channelId);
        if (newState.id === this.client.user.id &&
            !newState.serverDeaf &&
            vc &&
            vc.permissionsFor(newState.guild.member.me).has('DeafenMembers'))
            await newState.setDeaf(true);
        if (newState.id === this.client.user.id && newState.serverMute && !player.paused)
            player.pause();
        if (newState.id === this.client.user.id && !newState.serverMute && player.paused)
            player.pause();
        let voiceChannel = newState.guild.channels.cache.get(player.player.connection.channelId);
        if (newState.id === this.client.user.id && newState.channelId === null)
            return;
        if (!voiceChannel)
            return;
        if (voiceChannel.members.filter((x) => !x.user.bot).size <= 0) {
            const server = await this.client.prisma.stay.findFirst({
                where: { guildId: newState.guild.id },
            });
            if (!server) {
                setTimeout(async () => {
                    const playerVoiceChannel = newState.guild.channels.cache.get(player.player.connection.channelId);
                    if (player && playerVoiceChannel && playerVoiceChannel.members.filter((x) => !x.user.bot).size <= 0) {
                        if (player) {
                            await updateSetup(this.client, newState.guild);
                            player.destroy();
                        }
                    }
                }, 5000);
            }
            else {
                if (server)
                    return;
                setTimeout(async () => {
                    const playerVoiceChannel = newState.guild.channels.cache.get(player.player.connection.channelId);
                    if (player && playerVoiceChannel && playerVoiceChannel.members.filter((x) => !x.user.bot).size <= 0) {
                        if (player) {
                            await updateSetup(this.client, newState.guild);
                            player.destroy();
                        }
                    }
                }, 5000);
            }
        }
    }
}
