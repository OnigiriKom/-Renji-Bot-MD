// Creador お Onigiri-san ん⟅ 51907182818
// Exporta la función sendCase que maneja los comandos

import { pinterest } from '@bochilteam/scraper'
import PhoneNumber from 'awesome-phonenumber'
import gtts from 'node-gtts';
import axios from 'axios'
import chalk from 'chalk'
import cheerio from 'cheerio'
import { exec } from 'child_process'
import { createHash } from 'crypto'
import { default as fs, watchFile, unwatchFile, unlinkSync } from 'fs'
import gis from 'g-i-s'
import { sizeFormatter } from 'human-readable'
import moment from 'moment-timezone'
import fetch from 'node-fetch'
import { cpus as _cpus, arch, freemem, hostname, platform, totalmem, type } from 'os'
import path from 'path'
import { performance } from 'perf_hooks'
import now from 'performance-now'
import util from 'util'
import yts from 'yt-search'
import './config.js'
import { generateProfilePicture, overlayImages } from './lib/overlayImages.js'
import ytdl from './lib/ytdl2.js'
import { getBuffer } from './lib/simple.js';
import { YoutTube, dlmp3, dlmp4, fetchBuffer, getVideoID, ytIdRegex } from './lib/ytdlmp.js'

const formatSize = sizeFormatter({ std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B` })

const readMore = String.fromCharCode(8206).repeat(850)
const rwait = '⌛'
const done = '✅'
const error = '❎'
const emoji = {
    publicado: '📆',
    duracion: '⏳',
    link: '🔗',
    title: '📌',
    vistas: '👀'
}
const Menu = (`
╭₊˚꒰ 🤖  連 𝐑ᴇɴᴊɪ 𝚩ᴏᴛ-𝚳𝐃
╰╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶✦

𝚮ᴏʟᴀ %name 👋
𝐒ᴏʏ ᴜɴ ʙᴏᴛ ᴀᴜᴛᴏᴍᴀᴛɪᴢᴀᴅᴏ ᴅᴇ ᴡʜᴀᴛsᴀᴘᴘ ǫᴜᴇ ᴘᴜᴇᴅᴇ ᴀʏᴜᴅᴀʀ ᴀ ʜᴀᴄᴇʀ ᴄᴏsᴀs, ʙᴜsᴄᴀʀ ʏ ᴏʙᴛᴇɴᴇʀ ᴅᴀᴛᴏs ᴏ ɪɴғᴏʀᴍᴀᴄɪᴏɴ ᴀ ᴛʀᴀᴠᴇs ᴅᴇ ᴡʜᴀᴛsᴀᴘᴘ. 🪀

😄 𝐒ɪ ʜᴀʏ ᴘʀᴏʙʟᴇᴍᴀs ᴀʟ ᴜsᴀʀʟᴏ, ᴄᴏᴍᴜɴɪ́ǫᴜᴇsᴇ ᴄᴏɴ ᴇʟ ᴄʀᴇᴀᴅᴏʀ ᴘᴀʀᴀ ᴘʀᴇɢᴜɴᴛᴀʀ */ᴄʀᴇᴀᴅᴏʀ*

╭₊˚꒰ *👤 𝐔 𝐒 𝚬 𝐑  𝚰 𝚴 𝟊 𝚯 📜*
├╶╶╶✦
╵ *🏅 𝚸ʀᴇᴍɪᴜᴍ:* %prem
╵ *💴 𝐂ᴏɪɴsɴs:* %coin
╵ *⚔️ 𝐑ᴏʟ: %rol*
╰ ୨🌟୧─・┈・୨🍙୧・┈・─୨⛩️୧

╭₊˚꒰ *🪀 𝚩 𝚯 𝚻  𝚰 𝚴 𝟊 𝚯 📜*
├╶╶╶✦
╵ *📌 𝚸ʀᴇғɪᴊᴏ ᴜ́ɴɪᴄᴏ:* "/"
╵ *🪀 𝚴ᴀᴍᴇ ʙᴏᴛ:* 連 𝐑ᴇɴᴊɪ 𝚩ᴏᴛ-𝚳𝐃
╵ *⌚ 𝚻ɪᴇᴍᴘᴏ ᴀᴄᴛɪᴠᴏ:* [ ${timeString(process.uptime())} ]
╵ *🤖 𝐕ᴇʀsɪᴏɴ ᴅᴇʟ ʙᴏᴛ:* 3.0.1
╵ *🤴🏻 𝐂ʀᴇᴀᴅᴏʀ:* お Onigiri-san ん⟅
╵ *💬 wa.me/51907182818*
╰ ୨⌨️୧・─・┈・୨🍙୧・┈・─・୨🤖୧
${readMore}
╭₊˚꒰ *📚 𝚳 𝚬 𝚴 𝐔  𝐃 𝚬  𝐋 𝚰 𝐒 𝚻 𝚨 📜*
╰۬╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶✦

╭₊˚꒰ *🤓 𝚨 𝐘 𝐔 𝐃 𝚨  𝚩 𝚯 𝚻 🤖*
├╶╶╶✦
╵⌬ %prefix ʜᴇʟᴘᴇxᴘ
╵⌬ %prefix ʜᴇʟᴘᴄᴏɪɴ
╰ ୨💴୧─・┈・୨🍙୧・┈・─୨🎍୧

╭₊˚꒰ *👥 𝐆 𝐑 𝐔 𝚸 𝚯 📚*
├╶╶╶✦
╵⌬ %prefix ʀᴇᴇɴᴠɪᴀʀ *<ʀᴇᴘᴏɴᴅᴇ ᴀ ᴜɴ sᴍs>*
╵⌬ %prefix ᴇsᴛᴀᴅᴏ
╵⌬ %prefix ᴘʀᴏᴍᴏᴛᴇ *@ᴜsᴇʀ*
╵⌬ %prefix ᴅᴇᴍᴏᴛᴇ *@ᴜsᴇʀ*
╵⌬ %prefix ʙᴀɴ *@ᴜsᴇʀ*
╵⌬ %prefix ᴅᴇʟᴇᴛᴇ *<ᴍᴇɴsᴀᴊᴇ ᴄɪᴛᴀᴅᴏ>*
╵⌬ %prefix ɪɴᴠᴏᴄᴀʀ 
╵⌬ %prefix ʜɪᴅᴇᴛᴀɢ 
╰ ୨🌟୧─・┈・୨🍙୧・┈・─୨⛩️୧

╭₊˚꒰ *🤪 𝐑 𝚨 𝚴 𝐃 𝚯 𝚳 📚*
├╶╶╶✦
╵⌬ %prefix ᴄʀᴇᴀᴅᴏʀ
╵⌬ %prefix ɪɴғᴏ
╵⌬ %prefix ᴏɴɪɢɪʀɪ
╵⌬ %prefix ғᴇᴄʜᴀ
╵⌬ %prefix ᴘɪɴɢ
╵⌬ %prefix ᴠᴏᴢ *<ᴛᴇxᴛᴏ>*
╰ ୨☄️୧─・┈・୨🍙୧・┈・─୨⛩️୧

╭₊˚꒰ *⚙️ 𝚨 𝐉 𝐔 𝐒𝚻 𝚬 𝐒 🪀*
├╶╶╶✦
╵⌬ %prefix ᴇɴᴄᴇɴᴅᴇʀ *<ᴀᴊᴜsᴛᴇ>*
╵⌬ %prefix ᴀᴘᴀɢᴀʀ *<ᴀᴊᴜsᴛᴇ>*
╵⌬ %prefix ɢʀᴜᴘᴏ *<ᴀʙʀɪʀ/ᴄᴇʀʀᴀʀ>*
╰ ୨🪛୧─・┈・୨🍙୧・┈・─୨🍥୧

╭₊˚꒰ *🎮 𝐉 𝐔 𝚬 𝐆 𝚯 𝐒 🎮*
├╶╶╶✦
╵⌬ %prefix ᴘᴇʀғɪʟ
╵⌬ %prefix ʟᴇᴠᴇʟ
╵⌬ %prefix ᴍɪɴᴀʀ
╵⌬ %prefix ᴄʟᴀɪᴍ
╵⌬ %prefix ʀᴏʙᴀʀ *@ᴜsᴇʀ*
╵⌬ %prefix sʟᴏᴛ *sᴜᴇʀᴛᴇ*
╵⌬ %prefix ʙᴜʏ *<ᴄᴀɴᴛɪᴅᴀᴅ>*
╵⌬ %prefix ᴘᴘᴛ *(ᴘɪᴇᴅʀᴀ/ᴘᴀᴘᴇʟ/ᴛɪᴊᴇʀᴀ)*
╰ ୨⛏️୧─・┈・୨🍙୧・┈・─୨💴୧

╭₊˚꒰ *📄 𝐑 𝚬 𝐆 𝚰 𝐒 𝚻 𝐑 𝚯 📚*
├╶╶╶✦
╵⌬ %prefix ʀᴇɢɪsᴛʀᴀʀ *<ᴀᴘᴏᴅᴏ.ᴇᴅᴀᴅ>*
╵⌬ %prefix ɴsᴇʀɪᴇ *<ɴᴜᴍᴇʀᴏ ᴅᴇ sᴇʀɪᴇ>*
╵⌬ %prefix ᴜɴʀᴇɢ *<ɴᴜᴍᴇʀᴏ ᴅᴇ sᴇʀɪᴇ>*
╰ ୨👤୧─・┈・୨🍙୧・┈・─୨📝୧

╭₊˚꒰ *🔍 𝐒 𝚬 𝐑 𝐕 𝚰 𝐂 𝚰 𝚯 🤖*
├╶╶╶✦
╵⌬ %prefix ɪᴀ *<ᴛᴇxᴛᴏ>*
╵⌬ %prefix sᴛɪᴄᴋᴇʀ *<ɪᴍᴀɢᴇɴ/ᴠɪᴅᴇᴏ>*
╵⌬ %prefix ɪᴍᴀɢᴇɴ *<ᴛᴇxᴛᴏ>*
╵⌬ %prefix ᴘʟᴀʏᴍᴘ3 *(ᴛᴇxᴛᴏ) <ᴀᴜᴅɪᴏ>*
╵⌬ %prefix ᴘʟᴀʏᴍᴘ4 *(ᴛᴇxᴛᴏ) <ᴠɪᴅᴇᴏ>*
╵⌬ %prefix ᴘʟᴀʏ *(ᴛᴇxᴛᴏ) <ᴠɪᴅᴇᴏ>*
╵⌬ %prefix ᴀᴜᴅɪᴏ *(ᴛᴇxᴛᴏ) <ᴀᴜᴅɪᴏ>*
╰ ୨🌟୧─・┈・୨🍙୧・┈・─୨⛩️୧

╭₊˚꒰ *📥 𝐃 𝚯 𝐖 𝚴 𝐋 𝚯 𝚨 𝐃 🎥*
├╶╶╶✦
╵⌬ %prefix ɢɪᴛᴄʟᴏɴᴇ *<ʟɪɴᴋ>*
╵⌬ %prefix ᴛɪᴋᴛᴏᴋ *<ʟɪɴᴋ>*
╵⌬ %prefix ʏᴛᴍᴘ3 *<ʟɪɴᴋ>*
╵⌬ %prefix ʏᴛᴍᴘ4 *<ʟɪɴᴋ>*
╰ ୨🔮୧─・┈・୨🍙୧・┈・─୨🔗୧

╭₊˚꒰ *🏮 𝐒 𝚬 𝚨 𝐑 𝐂 𝚮 🔍*
├╶╶╶✦
╵⌬ %prefix ʏᴛsᴇᴀʀᴄʜ *<ᴛᴇxᴛᴏ>*
╵⌬ %prefix ɢɪᴍᴀɢᴇ *<ᴛᴇxᴛᴏ>*
╰ ୨📑୧─・┈・୨🍙୧・┈・─୨🔎୧

╭₊˚꒰ *📤 𝐒 𝚨 𝐕 𝚬 𝐃  𝟊 𝚰 𝐋 𝚬 𝐒 🗂️*
├╶╶╶✦
╵⌬ %prefix sᴀᴠᴇғɪʟᴇ *(ʀᴇᴘᴏɴᴅᴇ ᴀ ᴜɴ sᴍs)*
╵⌬ %prefix sᴇɴᴅғɪʟᴇ *<ᴇᴊ: sᴇɴᴅғɪʟᴇ 1>*
╵⌬ %prefix ᴅᴇʟғɪʟᴇ *<ᴇᴊ: sᴇɴᴅғɪʟᴇ 1>*
╵⌬ %prefix ᴍʏᴄʟᴏᴜᴅ
╵⌬ %prefix ᴇᴅɪᴛғɪʟᴇ
╵⌬ %prefix ᴄʟᴇᴀɴᴄʟᴏᴜᴅ
╰ ୨💾୧─・┈・୨🍙୧・┈・─୨📂୧

╭₊˚꒰  *💎 𝐂 𝐑 𝚬 𝚨 𝐃 𝚯 𝐑 🤴🏻*
├╶╶╶✦
╵⌬ %prefix ᴀᴅᴅxᴘ *@ᴜsᴇʀ <ᴄᴀɴᴛɪᴅᴀᴅ>*
╵⌬ %prefix ᴀᴅᴅᴄᴏɪɴ *@ᴜsᴇʀ <ᴄᴀɴᴛɪᴅᴀᴅ>*
╵⌬ %prefix ᴀᴅᴅᴏᴡɴᴇʀ *@ᴜsᴇʀ*
╵⌬ %prefix ᴅᴇʟᴏᴡɴᴇʀ *@ᴜsᴇʀ*
╵⌬ %prefix ᴀᴅᴅᴍᴏᴅᴇʀᴀᴅᴏʀ *@ᴜsᴇʀ*
╵⌬ %prefix ᴅᴇʟᴍᴏᴅᴇʀᴀᴅᴏʀ *@ᴜsᴇʀ*
╵⌬ %prefix ᴀᴅᴅᴘʀᴇᴍ *@ᴜsᴇʀ*
╵⌬ %prefix ᴅᴇʟᴘʀᴇᴍ *@ᴜsᴇʀ*
╵⌬ %prefix ʙᴀɴᴄʜᴀᴛ *<ɢʀᴜᴘᴏ/ᴄʜᴀᴛ>*
╵⌬ %prefix ᴜɴʙᴀɴᴄʜᴀᴛ *<ɢʀᴜᴘᴏ/ᴄʜᴀᴛ>*
╵⌬ %prefix ʙᴀɴᴇᴀʀ *@ᴜsᴇʀ*
╵⌬ %prefix ᴅᴇsʙᴀɴᴇᴀʀ *@ᴜsᴇʀ*
╵⌬ %prefix ʙᴀɴʟɪsᴛ
╵⌬ %prefix ᴘʀᴇᴍʟɪsᴛ
╵⌬ %prefix ᴍᴏᴅᴇʀᴀᴅᴏʀʟɪsᴛ
╵⌬ %prefix ᴏᴡɴᴇʀʟɪsᴛ
╰ ୨🤴୧─・┈・୨🍙୧・┈・─୨💎୧

╭₊˚꒰  *👤 𝚯 𝐖 𝚴 𝚬 𝐑 🏅*
├╶╶╶✦
╵⌬ %prefix ʙᴀɴᴄʜᴀᴛ *<ɢʀᴜᴘᴏ/ᴄʜᴀᴛ>*
╵⌬ %prefix ᴜɴʙᴀɴᴄʜᴀᴛ *<ɢʀᴜᴘᴏ/ᴄʜᴀᴛ>*
╵⌬ %prefix ʙᴀɴᴇᴀʀ *@ᴜsᴇʀ*
╵⌬ %prefix ᴅᴇsʙᴀɴᴇᴀʀ *@ᴜsᴇʀ*
╵⌬ %prefix ʙᴀɴʟɪsᴛ
╵⌬ %prefix ᴘʀᴇᴍʟɪsᴛ
╵⌬ %prefix ᴍᴏᴅᴇʀᴀᴅᴏʀʟɪsᴛ
╵⌬ %prefix ᴏᴡɴᴇʀʟɪsᴛ
╰ ୨👑୧─・┈・୨🍙୧・┈・─୨⛩️୧

╭₊˚꒰ *🤴🏻 𝚨 𝐕 𝚨 𝚴 𝚭 𝚨 𝐃 𝚯 🤓*
├╶╶╶✦
╵⌬ >
╵⌬ =>
╵⌬ $
╰ ୨⏩୧─・┈・୨🍙୧・┈・─୨🍥୧`)

const settings = (`╭₊˚꒰ *📜 𝐋𝚰𝐒𝚻𝚨 𝐃𝚬 𝚨𝐉𝐔𝐒𝚻𝚬𝐒 ⚙️*
╰╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶✦
${readMore}
╭₊˚꒰ *👋 𝚩 𝚰 𝚬 𝚴 𝐕 𝚬 𝚴 𝚰 𝐃 𝚨 👤*
├╶╶╶✦
╵ 🤖 𝚬ʟ ʙᴏᴛ ᴅᴀʀᴀ́ ʟᴀ ʙɪᴇɴᴠᴇɴɪᴅᴀ ᴀ 
╵ ʟᴏs ɴᴜᴇᴠᴏs ᴘᴀʀᴛɪᴄɪᴘᴀɴᴛᴇs ᴇɴ ᴇʟ 
╵ ɢʀᴜᴘᴏ. 🎉
├╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶✦
╵⌬ *%prefix ᴇɴᴄᴇɴᴅᴇʀ* ʙɪᴇɴᴠᴇɴɪᴅᴀ
╵⌬ *%prefix ᴀᴘᴀɢᴀʀ* ʙɪᴇɴᴠᴇɴɪᴅᴀ
╰ ୨🌸୧─・┈・୨🍙୧・┈・─୨⛩️୧
 
╭₊˚꒰ *⛏️ 𝐉 𝐔 𝚬 𝐆 𝚯 𝐒 🎍*
├╶╶╶✦
╵  🎮 𝐋ᴏs ᴄᴏᴍᴀɴᴅᴏs ʀᴇʟᴀᴄɪᴏɴᴀᴅᴏs 
╵ ᴄᴏɴ ᴊᴜᴇɢᴏs (𝐑𝚸𝐆) sᴇʀᴀ́ɴ 
╵ ᴅᴇsᴀᴄᴛɪᴠᴀᴅᴏs ʏ ɴᴏ 
╵ ᴇsᴛᴀʀᴀ́ɴ ᴅɪsᴘᴏɴɪʙʟᴇs ᴘᴀʀᴀ sᴜ ᴜsᴏ. 
├╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶✦
╵⌬ *%prefix ᴇɴᴄᴇɴᴅᴇʀ* ʀᴘɢ
╵⌬ *%prefix ᴀᴘᴀɢᴀʀ* ʀᴘɢ
╰ ୨👾୧─・┈・୨🍙୧・┈・─୨🌸୧

╭₊˚꒰ *🔗 𝚨 𝚴 𝚻 𝚰  𝐋 𝚰 𝚴 𝚱 ☠️*
├╶╶╶✦
╵ 🤖 𝚬ʟ ʙᴏᴛ ᴇʟɪᴍɪɴᴀʀá ᴀʟ
╵ ᴘᴀʀᴛɪᴄɪᴘᴀɴᴛᴇ ϙᴜᴇ ᴇɴᴠíᴇ ᴜɴ ᴇɴʟᴀᴄᴇ
╵ ᴇɴ ᴇʟ ɢʀᴜᴘᴏ. 🛡️
├╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶✦
╵⌬ *%prefix ᴇɴᴄᴇɴᴅᴇʀ* ᴀɴᴛɪʟɪɴᴋ
╵⌬ *%prefix ᴀᴘᴀɢᴀʀ* ᴀɴᴛɪʟɪɴᴋ
╰ ୨🤐୧─・┈・୨🍙୧・┈・─୨🌸୧

╭₊˚꒰ *☠️ 𝚨 𝚴 𝚻 𝚰  𝚻 𝐑 𝚨 𝚩 𝚨 👾*
├╶╶╶✦
╵ 🤖 𝚬ʟ ʙᴏᴛ ᴇʟɪᴍɪɴᴀʀá ᴀʟ 
╵ ᴘᴀʀᴛɪᴄɪᴘᴀɴᴛᴇ ϙᴜᴇ ᴇɴᴠíᴇ ᴜɴ ꥇ
╵ ᴍᴇɴsᴀᴊᴇ ᴄᴏɴ ᴍás ᴅᴇ ꥇ
╵ 4000 ᴄᴀʀᴀᴄᴛᴇʀᴇs. ❌
├╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶✦
╵⌬ *%prefix ᴇɴᴄᴇɴᴅᴇʀ* ᴀɴᴛɪᴛʀᴀʙᴀ
╵⌬ *%prefix ᴀᴘᴀɢᴀʀ* ᴀɴᴛɪᴛʀᴀʙᴀ
╰ ୨🌸୧─・┈・୨🍙୧・┈・─୨🦠୧

╭₊˚꒰ *🤖 𝐒 𝚬 𝐑 𝐕 𝚰 𝐂 𝚰 𝚯 📥*
├╶╶╶✦
╵ 🤖 𝚻ᴏᴅᴏs ʟᴏs ᴄᴏᴍᴀɴᴅᴏs 
╵ ʀᴇʟᴀᴄɪᴏɴᴀᴅᴏs ᴄᴏɴ ᴇʟ sᴇʀᴠɪᴄɪᴏ ꥇ
╵ sᴇʀᴀ́ɴ ᴅᴇsᴀᴄᴛɪᴠᴀᴅᴏs ʏ ʏᴀ ɴᴏ 
╵ ᴇsᴛᴀʀᴀ́ɴ ᴅɪsᴘᴏɴɪʙʟᴇs. ❌
├╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶✦
╵⌬ *%prefix ᴇɴᴄᴇɴᴅᴇʀ* sᴇʀᴠɪᴄɪᴏ
╵⌬ *%prefix ᴀᴘᴀɢᴀʀ* sᴇʀᴠɪᴄɪᴏ
╰ ୨📂୧─・┈・୨🍙୧・┈・─୨⛩️୧`)

export async function sendCase(conn, m, store) {
    const data = global.db.data

    if (!m.isOwner && data.chats[m.chat].isBanned) return;
    if (!m.isROwner && data.users[m.sender].banned) return;

    const database = (object, m) => global.db.data[object][m]
    const items = (UserXp, xpNecesario) => { let _false = false; if (UserXp < xpNecesario) _false = false; else _false = true; return _false }

    database('users', m.sender).exp += Math.floor(Math.random() * 5) + 1

    /*function balance() {
        let object = false
        const usuario = database('users', sender ? sender : m.sender)
        if (usuario.coin == 0 || usuario.coin < 1) { m.reply(`𝐋ᴀᴍᴇɴᴛᴀʙʟᴇᴍᴇɴᴛᴇ, ᴘᴀʀᴇᴄᴇ ϙᴜᴇ ᴛᴇ ʜᴀs ϙᴜᴇᴅᴀᴅᴏ sɪɴ ᴄᴏɪɴs ᴘᴀʀᴀ ᴜᴛɪʟɪᴢᴀʀ ᴀʟɢᴜɴᴀs ғᴜɴᴄɪᴏɴᴇs 😔. ɴᴏ ᴛᴇ ᴘʀᴇᴏᴄᴜᴘᴇs, ᴘᴜᴇᴅᴇs ᴀᴅϙᴜɪʀɪʀ ᴍás 💴 ᴄᴏɪɴs ᴜᴛɪʟɪᴢᴀɴᴅᴏ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ:\n\n${prefix}ᴄᴏᴍᴘʀᴀʀ <ᴄᴀɴᴛɪᴅᴀᴅ>`); object = true } else if (usuario.coin == 4) m.reply(`📣 *¡𝚨ᴛᴇɴᴄɪóɴ!* sᴏʟᴏ ᴛᴇ ϙᴜᴇᴅᴀɴ 3 💴 ᴄᴏɪɴs. ɴᴏ ᴏʟᴠɪᴅᴇs ϙᴜᴇ ᴘᴜᴇᴅᴇs ᴀᴅϙᴜɪʀɪʀ ᴍás 💴 ᴄᴏɪɴs ᴜᴛɪʟɪᴢᴀɴᴅᴏ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ: *${prefix}ᴄᴏᴍᴘʀᴀʀ <ᴄᴀɴᴛɪᴅᴀᴅ>* ᴘᴏʀ ғᴀᴠᴏʀ, ᴀsᴇɢúʀᴀᴛᴇ ᴅᴇ ᴄᴏɴᴛᴀʀ ᴄᴏɴ sᴜғɪᴄɪᴇɴᴛᴇs 💴 ᴄᴏɪɴs ᴘᴀʀᴀ sᴇɢᴜɪʀ ᴜᴛɪʟɪᴢᴀɴᴅᴏ ᴇsᴛᴇ ʙᴏᴛ. 🤖`)
        return object
    }

    function setcoin(coin = 1) {
        const usuario = database('users', m.sender)
        return usuario.coin = premium(User) ? usuario.coin - 0 : usuario.coin - (coin == true ? 1 : coin)
    }*/

    const coin = (coin = 0) => {
        let coin0 = false
        let igual4 = false
        if (data.users[m.sender].coin == 0 || data.users[m.sender].coin < 1) coin0 = true
        if (data.users[m.sender].coin == 4) igual4 = true
        data.users[m.sender].coin -= m.isPrems ? 0 : coin == true ? 1 : coin
        return { coin: [coin0, `𝐋ᴀᴍᴇɴᴛᴀʙʟᴇᴍᴇɴᴛᴇ, ᴘᴀʀᴇᴄᴇ ϙᴜᴇ ᴛᴇ ʜᴀs ϙᴜᴇᴅᴀᴅᴏ sɪɴ ᴄᴏɪɴs ᴘᴀʀᴀ ᴜᴛɪʟɪᴢᴀʀ ᴀʟɢᴜɴᴀs ғᴜɴᴄɪᴏɴᴇs 😔. ɴᴏ ᴛᴇ ᴘʀᴇᴏᴄᴜᴘᴇs, ᴘᴜᴇᴅᴇs ᴀᴅϙᴜɪʀɪʀ ᴍás 💴 ᴄᴏɪɴs ᴜᴛɪʟɪᴢᴀɴᴅᴏ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ:\n\n${prefix}ᴄᴏᴍᴘʀᴀʀ <ᴄᴀɴᴛɪᴅᴀᴅ>`], igual: [igual4, `📣 *¡𝚨ᴛᴇɴᴄɪóɴ!* sᴏʟᴏ ᴛᴇ ϙᴜᴇᴅᴀɴ 3 💴 ᴄᴏɪɴs. ɴᴏ ᴏʟᴠɪᴅᴇs ϙᴜᴇ ᴘᴜᴇᴅᴇs ᴀᴅϙᴜɪʀɪʀ ᴍás 💴 ᴄᴏɪɴs ᴜᴛɪʟɪᴢᴀɴᴅᴏ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ: *${prefix}ᴄᴏᴍᴘʀᴀʀ <ᴄᴀɴᴛɪᴅᴀᴅ>* ᴘᴏʀ ғᴀᴠᴏʀ, ᴀsᴇɢúʀᴀᴛᴇ ᴅᴇ ᴄᴏɴᴛᴀʀ ᴄᴏɴ sᴜғɪᴄɪᴇɴᴛᴇs 💴 ᴄᴏɪɴs ᴘᴀʀᴀ sᴇɢᴜɪʀ ᴜᴛɪʟɪᴢᴀɴᴅᴏ ᴇsᴛᴇ ʙᴏᴛ. 🤖`] }
    }

    const premium = (sender) => { if (sender) return; const user = data.users[sender]; return user.premium ? true : user.modr ? true : user.owner ? true : user.rowner ? true : false }

    if (!conn.question) { conn.question = {} }

    if (conn.question[m.sender]) {
        const object = conn.question
        const { User, chat, Numeros, setTimeout } = object[m.sender]
        if (!(chat === m.chat)) return;
        if (!(User === m.sender)) return;

        if (m.body.toLowerCase().includes('no')) {
            clearTimeout(setTimeout)
            delete object[m.sender]
            return m.reply('⎔ *𝚨ᴄᴄɪᴏ́ɴ 𝐂ᴀɴᴄᴇʟᴀᴅᴀ ✅')
        }

        if (m.body.toLowerCase().includes('no')) {
            console.log(JSON.stringify(Numeros, undefined, 2))
            for (let i = 0; i < Numeros.length; i++) { await conn.groupParticipantsUpdate(chat, [Numeros[i]], 'remove') }
            await conn.sendMessage(m.chat, { text: `☠️ 𝐒ᴇ ᴇʟɪᴍɪɴᴀʀᴏɴ *${Numeros.length}* ᴘᴀʀᴛɪᴄɪᴘᴀɴᴛᴇs ✅`, mentions: [m.sender] }, { ephemeralExpiration: 24 * 3600, quoted: { key: { participant: '0@s.whatsapp.net' }, message: { documentMessage: { title: `😄 𝚨ᴄᴄɪᴏ́ɴ ᴇᴊᴇᴄᴜᴛᴀᴅᴀ ᴘᴏʀ\n👤 𝐔sᴜᴀʀɪᴏ:: ${m.name}`, jpegThumbnail: null } } } })
            clearTimeout(setTimeout)
            delete object[m.sender]
        }
    }

    if (!conn.transferencia) { conn.transferencia = {} }

    if (conn.transferencia[m.sender]) {
        const objecto = conn.transferencia
        const { User, destino, object, numero, setTimeout } = objecto[m.sender]
        if (!(m.sender == User)) return;

        if (m.body.toLowerCase().includes('no')) {
            clearTimeout(setTimeout)
            delete objecto[m.sender]
            return m.reply('⎔ *𝚻ʀᴀɴsғᴇʀᴇɴᴄɪᴀ ᴄᴀɴᴄᴇʟᴀᴅᴀ ✅*')
        }

        if (m.body.toLowerCase().includes('si')) {
            if (premium(User)) console.log('@User')
            else database('users', User)[object.item] -= object.cantidad
            database('users', destino)[object.item] += object.cantidad

            m.reply(`⎔ *𝚻ʀᴀɴsғᴇʀᴇɴᴄɪᴀ ʀᴇᴀʟɪᴢᴀᴅᴀ ✅*\n\n*⎔ ${object.cantidad} ${object.item}* a @${numero}`)
            clearTimeout(setTimeout)
            delete objecto[m.sender]
        }
    }
    
    ////////////////////////GRUPOS
    switch (m.command) {
        case 'chat': { m.reply('ID: ' + m.chat) } break

        case 'encender': case 'true': case 'apagar': case 'false': {
            if (!m.args[0]) return m.reply(settings.split('%prefix ').join(global.prefix))
            const chat = global.db.data.chats[m.chat]
            const smTrue = `⚙️ 𝚬sᴛᴇ ᴀᴊᴜsᴛᴇ ʏᴀ ᴇsᴛᴜᴠᴏ ᴀᴄᴛɪᴠᴏ ᴇɴ ᴇsᴛᴇ ${m.isGroup ? 'grupo' : 'chat'}`
            const smFalse = `😁 𝚬sᴛᴇ ᴀᴊᴜsᴛᴇ ɴᴏ ᴇsᴛᴜᴠᴏ ᴀᴄᴛɪᴠᴏ ᴇɴ ᴇsᴛᴇ ${m.isGroup ? 'grupo' : 'chat'}`

            if (m.command == 'encender' || m.command == 'true') {
                if (m.args[0] == 'antilink') {
                    if (!m.isGroup) return m.sms('group')
                    if (!m.isBotAdmin) return m.sms('botAdmin')
                    if (!m.isAdmin) return m.sms('admin')
                    if (chat.antiLink) return m.reply(smTrue)
                    try { chat.antiLink = true; m.react(done) } catch { m.react(error) }
                }
                else if (m.args[0] == 'bienvenida') {
                    if (!m.isGroup) return m.sms('group')
                    if (!m.isAdmin) return m.sms('admin')
                    if (chat.welcome) return m.reply(smTrue)
                    try { chat.welcome = true; m.react(done) } catch { m.react(error) }
                }
                else if (m.args[0] == 'detecte') {
                    if (!m.isGroup) return m.sms('group')
                    if (!m.isAdmin) return m.sms('admin')
                    if (chat.detecte) return m.reply(smTrue)
                    try { chat.detecte = true; m.react(done) } catch { m.react(error) }
                }
                else if (m.args[0] == 'antitraba') {
                    if (!m.isGroup) return m.sms('group')
                    if (!m.isBotAdmin) return m.sms('botAdmin')
                    if (!m.isAdmin) return m.sms('admin')
                    if (chat.antiTraba) return m.reply(smTrue)
                    try { chat.antiTraba = true; m.react(done) } catch { m.react(error) }
                }
                else if (m.args[0] == 'rpg') {
                    if (!m.isGroup) return m.sms('group')
                    if (!m.isAdmin) return m.sms('admin')
                    if (chat.commands.rpg) return m.reply(smTrue)
                    try { chat.commands.rpg = true; m.reply('💴 𝚬ʟ ᴜsᴏ ᴅᴇ ᴄᴏɪɴs ʜᴀ sɪᴅᴏ ʀᴇᴀᴄᴛɪᴠᴀᴅᴏ ✅'); m.react(done) } catch { m.react(error) }
                }
                else if (m.args[0] == 'servicio') {
                    if (!m.isGroup) return m.sms('group')
                    if (!m.isAdmin) return m.sms('admin')
                    if (chat.commands.servicio) return m.reply(smTrue)
                    try { chat.commands.servicio = true; m.react(done) } catch { m.react(error) }
                }
                else if (m.args[0] == 'grupos') {
                    if (!m.isGroup) return m.sms('group')
                    if (!m.isAdmin) return m.sms('admin')
                    if (chat.commands.grupos) return m.reply(smTrue)
                    try { chat.commands.grupos = true; m.react(done) } catch { m.react(error) }
                }
                else m.reply(settings.split('%prefix ').join(global.prefix))
            }

            else if (m.command == 'apagar' || m.command == 'false') {
                if (m.args[0] == 'antilink') {
                    if (!m.isGroup) return m.sms('group')
                    if (!m.isBotAdmin) return m.sms('botAdmin')
                    if (!m.isAdmin) return m.sms('admin')
                    if (!chat.antiLink) return m.reply(smFalse)
                    try { chat.antiLink = false; m.react(done) } catch { m.react(error) }
                }
                else if (m.args[0] == 'bienvenida') {
                    if (!m.isGroup) return m.sms('group')
                    if (!m.isAdmin) return m.sms('admin')
                    if (!chat.welcome) return m.reply(smFalse)
                    try { chat.welcome = false; m.react(done) } catch { m.react(error) }
                }
                else if (m.args[0] == 'detecte') {
                    if (!m.isGroup) return m.sms('group')
                    if (!m.isAdmin) return m.sms('admin')
                    if (!chat.detecte) return m.reply(smFalse)
                    try { chat.detecte = false; m.react(done) } catch { m.react(error) }
                }
                else if (m.args[0] == 'antitraba') {
                    if (!m.isGroup) return m.sms('group')
                    if (!m.isBotAdmin) return m.sms('botAdmin')
                    if (!m.isAdmin) return m.sms('admin')
                    if (!chat.antiTraba) return m.reply(smFalse)
                    try { chat.antiTraba = false; m.react(done) } catch { m.react(error) }
                }
                else if (m.args[0] == 'rpg') {
                    if (!m.isGroup) return m.sms('group')
                    if (!m.isAdmin) return m.sms('admin')
                    if (!chat.commands.rpg) return m.reply(smFalse)
                    try { chat.commands.rpg = false; m.reply('💴 𝚬ʟ ᴜsᴏ ᴅᴇ ᴄᴏɪɴs ʜᴀ sɪᴅᴏ ᴅᴇsᴀᴄᴛɪᴠᴀᴅᴏ ❌'); m.react(done) } catch { m.react(error) }
                }
                else if (m.args[0] == 'servicio') {
                    if (!m.isGroup) return m.sms('group')
                    if (!m.isAdmin) return m.sms('admin')
                    if (!chat.commands.servicio) return m.reply(smFalse)
                    try { chat.commands.servicio = false; m.react(done) } catch { m.react(error) }
                }
                else if (m.args[0] == 'grupos') {
                    if (!m.isGroup) return m.sms('group')
                    if (!m.isAdmin) return m.sms('admin')
                    if (!chat.commands.grupos) return m.reply(smFalse)
                    try { chat.commands.grupos = false; m.react(done) } catch { m.react(error) }
                }
                else m.reply(settings.split('%prefix ').join(global.prefix))
            }
        } break
        
        case 'perfil': case 'profile': {
            const sender = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
            if (!(sender in global.db.data.users)) return m.reply(`👤 𝚬ʟ ᴜsᴜᴀʀɪᴏ ɴᴏ sᴇ ᴇɴᴄᴜᴇɴᴛʀᴀ ᴇɴ ᴍɪ ʙᴀsᴇ ᴅᴇ ᴅᴀᴛᴏs 🗄️`)
            let pp = await conn.profilePictureUrl(sender, 'image')
            let { coin, exp, nivel, role, registered, name } = database('users', m.sender)
            let Text = `
╭₊˚꒰  *📄 𝚸 𝚵 𝐑 𝟊 𝚰 𝐋 👤*
├╶╶╶✦
╵ ⎔ ${registered ? name : m.name}
╵ ⎔ @${sender.replace(/@.+/, '')}
╵ 🔢 *𝚴ᴜᴍᴇʀᴏ:* ${PhoneNumber('+' + sender.replace('@s.whatsapp.net', '')).getNumber('international')}
╵ 🔗 *𝐋ɪɴᴋ:* wa.me/${sender.split`@`[0]}
╵ 🏅 *𝚸ʀᴇᴍɪᴜᴍ:* ${m.isPrems ? 'Si' : 'No'}
╵ 💴 *𝐂ᴏɪɴs:* ${m.isPrems ? '∞' : coin}
╵ 🎍 *𝚾𝚸:* ${exp}
╵ 👾 *𝚴ɪᴠᴇʟ :* ${nivel}
╵ ⚔️ *𝐑ᴏʟ :* ${role}
╵ 👤 *𝐑ᴇɢɪsᴛʀᴀᴅᴏ :* ${registered ? '✅' : '❎'}
╰ ୨🌸୧─・┈・୨🍙୧・┈・─୨🍣୧`.trim()

            const { path } = await overlayImages([pp, m.isPrems ? './multimedia/iconos/premium.png' : registered ? './multimedia/iconos/registrado.png' : './multimedia/iconos/user.png'], { tamano: [100, 100], localizacion: ['abajoIzquierda', 30] })

            conn.sendMessage(m.chat, { image: fs.readFileSync(path), caption: Text, contextInfo: { mentionedJid: [...Text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), externalAdReply: { title: registered ? name : m.name, body: '𝚩ʏ お 𝚶ɴɪɢɪʀɪ-sᴀɴ ん⟅ 🍙', thumbnail: fs.readFileSync('./multimedia/imagenes/thumbnail.jpg') } } }, { quoted: m }); m.react(done)
        } break
        
        case 'helpexp': case 'helpxp': {
    const helpExpText = `*🤔 ¿𝐂ᴏᴍᴏ sᴇ ᴄᴏɴsɪɢᴜᴇ 𝚬𝚾𝚸 🎍?* 
𝐋ᴀ ғᴏʀᴍᴀ ᴅᴇ ᴄᴏɴsᴇɢᴜɪʀ 𝚬𝚾𝚸 🎍 ᴇs ᴀ ᴛʀᴀᴠᴇ́s ᴅᴇ ʟᴏs ᴊᴜᴇɢᴏs ᴘʀᴏᴘᴏʀᴄɪᴏɴᴀᴅᴏs ᴘᴏʀ ᴇʟ ʙᴏᴛ, ᴜᴛɪʟɪᴢᴀ ʟᴏs sɪɢᴜɪᴇɴᴛᴇs ᴄᴏᴍᴀɴᴅᴏs ᴘᴀʀᴀ ᴄᴏɴsᴇɢᴜɪʀ 𝚬𝚾𝚸 🎍:

⌬ */ᴘᴘᴛ* <ᴘᴀᴘᴇʟ/ᴘɪᴇᴅʀᴀ/ᴛɪᴊᴇʀᴀ> - 𝐉ᴜᴇɢᴀ ᴘɪᴇᴅʀᴀ, ᴘᴀᴘᴇʟ ᴏ ᴛɪᴊᴇʀᴀ ᴄᴏɴ ᴇʟ ʙᴏᴛ ᴘᴀʀᴀ ᴏʙᴛᴇɴᴇʀ ᴄɪᴇʀᴛᴀs ᴄᴀɴᴛɪᴅᴀᴅᴇs ᴅᴇ 𝚬𝚾𝚸. 𝚬ᴍᴘᴀᴛᴀʀ ᴄᴏɴ ᴇʟ ʙᴏᴛ ᴏᴛᴏʀɢᴀ 𝟸𝟶𝟶 𝚬𝚾𝚸 🎍, ɢᴀɴᴀʀʟᴇ ᴀʟ ʙᴏᴛ ᴏᴛᴏʀɢᴀ 𝟻𝟶𝟶 𝚬𝚾𝚸 🎍 ʏ ᴘᴇʀᴅᴇʀ ᴄᴏɴᴛʀᴀ ᴇʟ ʙᴏᴛ ʀᴇsᴛᴀ 𝟸𝟶𝟶 𝚬𝚾𝚸. 𝐒ᴇ ʀᴇǫᴜɪᴇʀᴇ ᴜɴ ᴍɪ́ɴɪᴍᴏ ᴅᴇ 𝟸𝟶𝟶 𝚬𝚾𝚸 🎍 ᴘᴀʀᴀ ᴊᴜɢᴀʀ.

⌬ */sʟᴏᴛ* - 𝚨ʟ ᴜᴛɪʟɪᴢᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ, sᴇ ᴘᴇʀᴅᴇʀᴀ́ɴ 𝟸𝟶𝟶 𝚬𝚾𝚸 🎍 ʏ sᴇ ɢᴀɴᴀʀᴀ́ɴ 𝟻𝟶𝟶 𝚬𝚾𝚸 🎍, ᴅᴇᴘᴇɴᴅɪᴇɴᴅᴏ ᴅᴇ ʟᴀ sᴜᴇʀᴛᴇ. 𝐒ᴇ ɴᴇᴄᴇsɪᴛᴀ ᴜɴ ᴍɪ́ɴɪᴍᴏ ᴅᴇ 𝟸𝟶𝟶 𝚬𝚾𝚸 🎍 ᴘᴀʀᴀ ᴊᴜɢᴀʀ.

⌬ */ᴍɪɴᴀʀ* - 𝚯ʙᴛᴇɴᴅʀᴀ́s ᴜɴᴀ ᴄɪᴇʀᴛᴀ ᴄᴀɴᴛɪᴅᴀᴅ ᴅᴇ 𝚬𝚾𝚸 🎍, ᴄᴏɴ ᴜɴ ᴍᴀ́xɪᴍᴏ ᴅᴇ 𝟷.𝟻ᴋ ᴅᴇ 𝚬𝚾𝚸 🎍.

⌬ */ᴄʟᴀɪᴍ* - 𝐑ᴇᴄɪʙɪʀᴀ́s ᴛᴜ ʀᴇᴄᴏᴍᴘᴇɴsᴀ ᴅɪᴀʀɪᴀ, ǫᴜᴇ ᴘᴏᴅʀᴀ́s ʀᴇᴄʟᴀᴍᴀʀ ɴᴜᴇᴠᴀᴍᴇɴᴛᴇ ᴅᴇsᴘᴜᴇ́s ᴅᴇ 𝟸𝟺 ʜᴏʀᴀs.

☝️ *¿𝐂ᴏᴍᴏ sᴜʙᴏ ᴅᴇ ɴɪᴠᴇʟ?* ᴘᴀʀᴀ sᴜʙɪʀ ᴅᴇ ɴɪᴠᴇʟ ᴜᴛɪʟɪᴢᴀ ᴇʟ sɪɢᴜɪᴇɴᴛᴇ ᴄᴏᴍᴀɴᴅᴏ:

⌬ */ʟᴇᴠᴇʟᴜᴘ* - 𝐒ᴜʙɪʀᴀ́s ᴅᴇ ʟᴇᴠᴇʟ

🤓 𝚬s ɪᴍᴘᴏʀᴛᴀɴᴛᴇ ᴍᴇɴᴄɪᴏɴᴀʀ ǫᴜᴇ ʟᴀ ᴄᴀɴᴛɪᴅᴀᴅ ᴅᴇ 𝚬𝚾𝚸 🎍 ǫᴜᴇ ᴛᴇɴɢᴀs ᴛᴇ ᴘᴇʀᴍɪᴛɪʀᴀ́ ᴄᴀɴᴊᴇᴀʀʟᴀ ᴘᴏʀ ᴄᴏɪɴs. 𝚸ᴀʀᴀ ʟʟᴇᴠᴀʀ ᴀ ᴄᴀʙᴏ ᴇsᴛᴀ ᴀᴄᴄɪᴏ́ɴ, ᴘᴜᴇᴅᴇs ᴜᴛɪʟɪᴢᴀʀ ʟᴏs sɪɢᴜɪᴇɴᴛᴇs ᴄᴏᴍᴀɴᴅᴏs:

⌬ */ʙᴜʏᴀʟʟ* - 𝐂ᴏᴍᴘʀᴀ ᴛᴏᴅᴀs ʟᴀs ᴄᴏɪɴs ᴘᴏsɪʙʟᴇs, ʟᴏ ǫᴜᴇ sɪɢɴɪғɪᴄᴀ ǫᴜᴇ sᴇ ʀᴇsᴛᴀʀᴀ́ ᴛᴏᴅᴏ ᴛᴜ 𝚬𝚾𝚸 🎍.

⌬ */ʙᴜʏ* <ᴄᴀɴᴛɪᴅᴀᴅ> - 𝚰ɴᴅɪᴄᴀ ʟᴀ ᴄᴀɴᴛɪᴅᴀᴅ ᴅᴇ ᴄᴏɪɴs ǫᴜᴇ ᴅᴇsᴇᴀs ᴄᴏᴍᴘʀᴀʀ, ᴘᴏʀ ᴇᴊᴇᴍᴘʟᴏ: /ʙᴜʏ 𝟹.

🧧 𝐔ᴛɪʟɪᴢᴀ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ */ʜᴇʟᴘᴄᴏɪɴ* ᴘᴀʀᴀ ᴏʙᴛᴇɴᴇʀ ℹ️ ɪɴғᴏʀᴍᴀᴄɪᴏ́ɴ sᴏʙʀᴇ ᴄᴏ́ᴍᴏ ᴜᴛɪʟɪᴢᴀʀ ʟᴀs 💴 ᴄᴏɪɴs.
    `;

    await conn.sendMessage(m.chat, { text: helpExpText, quoted: m });
} break
        
        case 'helpcoin': {
    const helpcoinBotText = `🤔 *¿𝚸ᴀʀᴀ́ ǫᴜᴇ sɪʀᴠᴇɴ ʟᴀs 💴 ᴄᴏɪɴs?* 𝐋ᴀs 💴 ᴄᴏɪɴs sᴏɴ ᴜᴛɪʟɪᴢᴀᴅᴀs ᴘᴀʀᴀ ᴀᴄᴄᴇᴅᴇʀ ᴀ ʟᴏs sᴇʀᴠɪᴄɪᴏs ᴅᴇʟ 🤖 ʙᴏᴛ, ɪɴᴄʟᴜʏᴇɴᴅᴏ 📥 ᴅᴇsᴄᴀʀɢᴀs ᴅᴇ ᴠɪᴅᴇᴏs ʏ ᴀᴜᴅɪᴏ, ᴅᴇsᴄᴀʀɢᴀs ᴅᴇ ᴠɪᴅᴇᴏs ᴅᴇ ᴛɪᴋᴛᴏᴋ, ʙᴜ́sǫᴜᴇᴅᴀ ᴅᴇ ᴠɪᴅᴇᴏs ᴅᴇ 𝐘ᴏᴜ𝚻ᴜʙᴇ, ᴜsᴏ ᴅᴇ ᴄʜᴀᴛɢᴘᴛ, ʙᴜ́sǫᴜᴇᴅᴀ ᴅᴇ ɪᴍᴀ́ɢᴇɴᴇs ᴇɴ 𝐆ᴏᴏɢʟᴇ ʏ ᴅᴇsᴄᴀʀɢᴀs ᴅᴇ 𝐆ɪᴛ𝚮ᴜʙ.

🤔 *¿𝐂ᴏᴍᴏ sᴇ ᴄᴏɴsɪɢᴜᴇɴ ʟᴀs 💴 ᴄᴏɪɴs?* 𝚸ᴀʀᴀ ᴏʙᴛᴇɴᴇʀ 💴 ᴄᴏɪɴs, ᴇs ɴᴇᴄᴇsᴀʀɪᴏ ᴀᴄᴜᴍᴜʟᴀʀ sᴜғɪᴄɪᴇɴᴛᴇ 𝚬𝚾𝚸 ᴇɴ ᴇʟ ɪɴᴠᴇɴᴛᴀʀɪᴏ. 𝐋ᴀ ғᴏʀᴍᴀ ᴅᴇ ᴏʙᴛᴇɴᴇʀ 🎍 𝚬𝚾𝚸 ᴇs ᴀ ᴛʀᴀᴠᴇ́s ᴅᴇ ʟᴏs ᴊᴜᴇɢᴏs ᴘʀᴏᴘᴏʀᴄɪᴏɴᴀᴅᴏs ᴘᴏʀ ᴇʟ 🤖 ʙᴏᴛ, ᴜᴛɪʟɪᴢᴀɴᴅᴏ ʟᴏs sɪɢᴜɪᴇɴᴛᴇs ᴄᴏᴍᴀɴᴅᴏs:

⌬ */ᴘᴘᴛ* <ᴘᴀᴘᴇʟ/ᴘɪᴇᴅʀᴀ/ᴛɪᴊᴇʀᴀ> - 𝐉ᴜᴇɢᴀ ᴘɪᴇᴅʀᴀ, ᴘᴀᴘᴇʟ ᴏ ᴛɪᴊᴇʀᴀ ᴄᴏɴ ᴇʟ ʙᴏᴛ ᴘᴀʀᴀ ᴏʙᴛᴇɴᴇʀ ᴄɪᴇʀᴛᴀs ᴄᴀɴᴛɪᴅᴀᴅᴇs ᴅᴇ 𝚬𝚾𝚸. 𝚬ᴍᴘᴀᴛᴀʀ ᴄᴏɴ ᴇʟ ʙᴏᴛ ᴏᴛᴏʀɢᴀ 𝟸𝟶𝟶 𝚬𝚾𝚸 🎍, ɢᴀɴᴀʀʟᴇ ᴀʟ ʙᴏᴛ ᴏᴛᴏʀɢᴀ 𝟻𝟶𝟶 𝚬𝚾𝚸 🎍 ʏ ᴘᴇʀᴅᴇʀ ᴄᴏɴᴛʀᴀ ᴇʟ ʙᴏᴛ ʀᴇsᴛᴀ 𝟸𝟶𝟶 𝚬𝚾𝚸. 𝐒ᴇ ʀᴇǫᴜɪᴇʀᴇ ᴜɴ ᴍɪ́ɴɪᴍᴏ ᴅᴇ 𝟸𝟶𝟶 𝚬𝚾𝚸 🎍 ᴘᴀʀᴀ ᴊᴜɢᴀʀ.

⌬ */sʟᴏᴛ* - 𝚨ʟ ᴜᴛɪʟɪᴢᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ, sᴇ ᴘᴇʀᴅᴇʀᴀ́ɴ 𝟸𝟶𝟶 𝚬𝚾𝚸 🎍 ʏ sᴇ ɢᴀɴᴀʀᴀ́ɴ 𝟻𝟶𝟶 𝚬𝚾𝚸 🎍, ᴅᴇᴘᴇɴᴅɪᴇɴᴅᴏ ᴅᴇ ʟᴀ sᴜᴇʀᴛᴇ. 𝐒ᴇ ɴᴇᴄᴇsɪᴛᴀ ᴜɴ ᴍɪ́ɴɪᴍᴏ ᴅᴇ 𝟸𝟶𝟶 𝚬𝚾𝚸 🎍 ᴘᴀʀᴀ ᴊᴜɢᴀʀ.

⌬ */ᴍɪɴᴀʀ* - 𝚯ʙᴛᴇɴᴅʀᴀ́s ᴜɴᴀ ᴄɪᴇʀᴛᴀ ᴄᴀɴᴛɪᴅᴀᴅ ᴅᴇ 𝚬𝚾𝚸 🎍, ᴄᴏɴ ᴜɴ ᴍᴀ́xɪᴍᴏ ᴅᴇ 𝟷.𝟻ᴋ ᴅᴇ EXP 🎍.

⌬ */ᴄʟᴀɪᴍ* - 𝐑ᴇᴄɪʙɪʀᴀ́s ᴛᴜ ʀᴇᴄᴏᴍᴘᴇɴsᴀ ᴅɪᴀʀɪᴀ, ǫᴜᴇ ᴘᴏᴅʀᴀ́s ʀᴇᴄʟᴀᴍᴀʀ ɴᴜᴇᴠᴀᴍᴇɴᴛᴇ ᴅᴇsᴘᴜᴇ́s ᴅᴇ 𝟸𝟺 ʜᴏʀᴀs.

🤔 *¿𝐂ᴏᴍᴏ ᴄᴀɴᴊᴇᴏ ᴍɪ 𝚬𝚾𝚸 🎍 ᴘᴏʀ 💴 ᴄᴏɪɴs?* 𝐔ɴᴀ ᴠᴇᴢ ǫᴜᴇ ʜᴀʏᴀs ᴀᴄᴜᴍᴜʟᴀᴅᴏ ʟᴀ ᴄᴀɴᴛɪᴅᴀᴅ ɴᴇᴄᴇsᴀʀɪᴀ ᴅᴇ 𝚬𝚾𝚸, ᴘᴏᴅʀᴀ́s ᴄᴀɴᴊᴇᴀʀʟᴏ ᴘᴏʀ 💴 ᴄᴏɪɴs ᴜᴛɪʟɪᴢᴀɴᴅᴏ ʟᴏs sɪɢᴜɪᴇɴᴛᴇs ᴄᴏᴍᴀɴᴅᴏs:

⌬ /ʙᴜʏᴀʟʟ - 𝐂ᴏᴍᴘʀᴀ ᴛᴏᴅᴀs ʟᴀs ᴄᴏɪɴs ᴘᴏsɪʙʟᴇs, ʟᴏ ǫᴜᴇ sɪɢɴɪғɪᴄᴀ ǫᴜᴇ sᴇ ʀᴇsᴛᴀʀᴀ́ ᴛᴏᴅᴏ ᴛᴜ 𝚬𝚾𝚸 🎍.

⌬ /ʙᴜʏ <ᴄᴀɴᴛɪᴅᴀᴅ> - 𝚰ɴᴅɪᴄᴀ ʟᴀ ᴄᴀɴᴛɪᴅᴀᴅ ᴅᴇ ᴄᴏɪɴs ǫᴜᴇ ᴅᴇsᴇᴀs ᴄᴏᴍᴘʀᴀʀ, ᴘᴏʀ ᴇᴊᴇᴍᴘʟᴏ: /ʙᴜʏ 𝟹.

🧧 𝐔ᴛɪʟɪᴢᴀ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ */ʜᴇʟᴘᴇxᴘ* ᴘᴀʀᴀ ᴏʙᴛᴇɴᴇʀ ℹ️ ɪɴғᴏʀᴍᴀᴄɪᴏ́ɴ sᴏʙʀᴇ ᴄᴏ́ᴍᴏ ᴄᴏɴsᴇɢᴜɪʀ 𝚬𝚾𝚸 🎍.
    `;

    await conn.sendMessage(m.chat, { text: helpcoinBotText, quoted: m });
} break
        
        case 'onigiri': {
    const socialMediaText = "🍥 𝐑ᴇᴅᴇs sᴏᴄɪᴀʟᴇs ᴅᴇ 𝚶ɴɪɢɪʀɪ-sᴀɴ 🍙\n\n🍘 𝚰ɴsᴛᴀɢʀᴀᴍ: https://www.instagram.com/anime_and_onigiri\n🎐 𝚻ᴇʟᴇɢʀᴀᴍ: https://t.me/AnimeAndOnigiri\n🌐 𝟊ᴀᴄᴇʙᴏᴏᴋ: https://www.facebook.com/AnimeAndOnigiri\n\n☺️ ¡𝐒ɪ‌ɢᴜᴇɴᴏs ᴘᴀʀᴀ ᴀᴘᴏʏᴀʀɴᴏs ʏ ᴇsᴛᴀʀ ᴀʟ ᴛᴀɴᴛᴏ ᴅᴇ ʟᴀs ᴜ‌ʟᴛɪᴍᴀs ɴᴏᴛɪᴄɪᴀs ᴀɴɪᴍᴇ! 🎌\n🍙 ¡𝐆ʀᴀᴄɪas ᴘᴏʀ ᴛᴜ ᴀᴘᴏʏᴏ!";

    const image = ('.multimedia/imagenes/logo.png');

    const messageOptions = {
        text: socialMediaText,
        quoted: m,
        media: { url: image, mimetype: ('image/png') }
    };

    await conn.sendMessage(m.chat, messageOptions);
} 
break;

        /*case 'onigirigroup': case 'profilegrupo': case 'onigirisan': {
            if (!m.isGroup) return m.sms('group')
            if (!m.isBotAdmin) return m.sms('botAdmin')
            if (!m.isAdmin) return m.sms('admin')
            if (!m.quoted) return m.reply(`🤔 𝐘 ʟᴀ ɪᴍᴀɢᴇɴ? 🖼️`)
            const type = m.type(m.SMS().mensage)
            if (!type == 'imageMessage') return m.reply('💬 ʀᴇsᴘᴏɴᴅᴀ ᴀ ᴜɴᴀ ɪᴍᴀɢᴇɴ, ɴᴏ sᴇ ᴘᴜᴇᴅᴇ ᴏᴛʀᴏ ᴛɪᴘᴏ ᴅᴇ ᴀʀᴄʜɪᴠᴏ 🗂️')
            const media = await conn.DownloadMedia()
            if (m.args[0] == 'full') {
                var { img } = await generateProfilePicture(media)
                await conn.query({ tag: 'iq', attrs: { to: m.chat, type: 'set', xmlns: 'w:profile:picture' }, content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }] })
                fs.unlinkSync(media)
                m.react(done)
            } else {
                await conn.updateProfilePicture(m.chat, { url: media })
                fs.unlinkSync(media)
                m.react(done)
            }
        } break*/
        
        /*case 'infogrupo': {
            if (!m.isGroup) return m.sms('group')
            let data = await conn.profilePictureUrl(m.chat, 'image').catch(_ => './multimedia/imagenes/avatar.jpg')
            let groupAdmins = m.participants.filter(p => p.admin)
            let listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
            let owner = m.groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
            let sumadmin = m.participants.filter(x => x.admin === 'admin').length + m.participants.filter(x => x.admin === 'superadmin').length

            let text = `*⛩️ 𝚴ᴏᴍʙʀᴇ ᴅᴇʟ ɢʀᴜᴘᴏ:* ${m.groupMetadata.subject}
*👤 𝐂ʀᴇᴀᴅᴏ ᴘᴏʀ:* _${'@' + owner.split('@')[0] ? '@' + owner.split('@')[0] : "🔢 𝚴ᴜ́ᴍᴇʀᴏ ᴅᴇʟ ᴄʀᴇᴀᴅᴏʀ ᴘʀɪɴᴄɪᴘᴀʟ ᴅᴇʟ ⛩️ ɢʀᴜᴘᴏ ɴᴏ ᴇɴᴄᴏɴᴛʀᴀᴅᴏ 😓"}_
*📆 Fᴇᴄʜᴀ ᴅᴇ ᴄʀᴇᴀᴄɪᴏ́ɴ:* ${formatDate(m.groupMetadata.creation * 1000)}
*👥 𝚻ᴏᴛᴀʟ ᴅᴇ ᴘᴀʀᴛɪᴄɪᴘᴀɴᴛᴇs:* ${m.participants.length}
*🛡️ 𝚻ᴏᴛᴀʟ ᴅᴇ ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀᴇs:* ${sumadmin}
${listAdmin}

*🆔 𝚰𝐃 ᴅᴇʟ ɢʀᴜᴘᴏ ⛩️:* ${m.groupMetadata.id}
*🧾 𝐃ᴇsᴄʀɪᴘᴄɪᴏ́ɴ:* \n${readMore}\n${m.groupMetadata.desc?.toString()}`.trim()

            conn.sendMessage(m.chat, { image: { url: data }, caption: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), externalAdReply: { title: `${m.groupMetadata.subject}`, body: 'WhatsApp grupo', thumbnail: fs.readFileSync('./multimedia/imagenes/thumbnail.jpg'), mediaType: 1 } } }, { quoted: m })
        } break*/

        case 'grupo': {
            if (!m.isGroup) return m.sms('group')
            if (!m.isBotAdmin) return m.sms('botAdmin')
            if (!m.isAdmin) return m.sms('admin')
            if (!m.text) return m.reply(`🔑 𝐃ᴇsᴇᴀ ᴀʙʀɪʀ ᴏ ᴄᴇʀʀᴀʀ? 🔒\n📌 𝚬ᴊᴇᴍᴘʟᴏ: /ɢʀᴜᴘᴏ ᴀʙʀɪʀ`)
            if (m.args[0] === 'abrir') {
                m.reply(`*🪀 𝐆 𝐑 𝐔 𝚸 𝚯  𝚨 𝚩 𝚰 𝚬 𝐑 𝚻 𝚯 🔓*`)
                await conn.groupSettingUpdate(m.chat, 'not_announcement')
            }
            else if (m.args[0] === 'cerrar') {
                m.reply(`*🪀 𝐆 𝐑 𝐔 𝚸 𝚯  𝐂 𝚬 𝐑 𝐑 𝚨 𝐃 𝚯 🔒*`)
                await conn.groupSettingUpdate(m.chat, 'announcement')
            }
        } break

        case 'hidetag': case 'notificar': case 'tag': {
            if (!m.isGroup) return m.sms('group')
            if (!m.isAdmin) return m.sms('admin')
            if (!m.text) return m.reply(`*🤔 𝐘 ᴇʟ ᴛᴇxᴛᴏ? 🔠*`)
            conn.sendMessage(m.chat, { text: m.text ? m.text : '', mentions: m.participants.map(a => a.id) }, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 })
        } break

        case 'reenviar': case 'reenv': {
            if (!m.quoted) return m.reply('quoted?')
            await conn.copyNForward(m.args[0] ? m.args[0] : m.chat, m.SMS())
        } break

        case 'delete': case 'del': {
            if (!m.quoted) throw false
            if (!m.isBotAdmin) return m.sms('botAdmin')
            if (!m.isAdmin) return m.sms('admin')
            let delet = m.message.extendedTextMessage.contextInfo.participant
            let bang = m.message.extendedTextMessage.contextInfo.stanzaId
            conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } })
        } break

        case 'ban': case 'kick': {
            if (!m.isGroup) return m.sms('group')
            if (!m.isBotAdmin) return m.sms('botAdmin')
            if (!m.isAdmin) return m.sms('admin')
            if (!(m.mentionedJid[0] || m.quoted)) return m.reply(`🤔 𝚨 ϙᴜɪᴇɴ ϙᴜɪᴇʀᴇs ϙᴜᴇ ᴇʟɪᴍɪɴᴇ? ☠️`);
            if (m.mentionedJid.includes(conn.user.jid)) return;
            const user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
            await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
        } break

        /*case 'kickuser': {
            if (!m.isGroup) return m.sms('group')
            if (!m.isBotAdmin) return m.sms('botAdmin')
            if (!m.isAdmin) return m.sms('admin')
            if (!m.text) return m.reply('🤓 𝚬sᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ᴛɪᴇɴᴇ ʟᴀ ᴄᴀᴘᴀᴄɪᴅᴀᴅ ᴅᴇ ☠️ ᴇʟɪᴍɪɴᴀʀ ᴀ ᴠᴀʀɪᴏs 👥 ᴜsᴜᴀʀɪᴏs sɪᴍᴜʟᴛᴀ́ɴᴇᴀᴍᴇɴᴛᴇ. 𝚸ᴏʀ ғᴀᴠᴏʀ, ᴘʀᴏᴘᴏʀᴄɪᴏɴᴀ ᴜɴᴀ 📜 ʟɪsᴛᴀ ᴅᴇ ʟᴏs ᴜsᴜᴀʀɪᴏs ǫᴜᴇ ᴅᴇsᴇᴀs ᴇʟɪᴍɪɴᴀʀ, ᴀsᴇɢᴜʀᴀ́ɴᴅᴏᴛᴇ ᴅᴇ ᴇᴛɪǫᴜᴇᴛᴀʀ ᴀ ᴄᴀᴅᴀ ᴜɴᴏ ᴅᴇ ᴇʟʟᴏs 👥')

            let numeros = m.text.match(/(@\d+|\b\d+\b)/g)
            numeros = numeros.map(numero => numero.startsWith('@') ? numero.substring(1) + '@s.whatsapp.net' : numero + '@s.whatsapp.net')

            if (numeros.map(owner => owner[0] + '@s.whatsapp.net').includes(conn.user.jid)) return m.reply('𝚬ʟ ɴᴜ́ᴍᴇʀᴏ ᴀsᴏᴄɪᴀᴅᴏ ᴀʟ 🤖 ʙᴏᴛ ɴᴏ ᴅᴇʙᴇ ɪɴᴄʟᴜɪʀsᴇ ᴇɴ ʟᴀ 📜 ʟɪsᴛᴀ ᴅᴇ ᴜsᴜᴀʀɪᴏs ᴀ ☠️ ᴇʟɪᴍɪɴᴀr.')

            conn.question[m.sender] = {
                User: m.sender,
                chat: m.chat,
                Numeros: numeros,
                setTimeout: setTimeout(() => (m.reply('⏰ 𝐒ᴇ ᴀᴄᴀʙᴏ́ ᴇʟ ᴛɪᴇᴍᴘᴏ, ᴇsᴛᴀ ᴀᴄᴄɪᴏ́ɴ ғᴜᴇ ᴄᴀɴᴄᴇʟᴀᴅᴀ ❌'), delete conn.question[m.sender]), 60 * 1000)
            }

            m.reply(`🤔 ¿𝐂ᴏɴғɪʀᴍᴀ ǫᴜᴇ ᴅᴇsᴇᴀ ᴇʟɪᴍɪɴᴀʀ ᴀ ${numeros.length} ᴜsᴜᴀʀɪᴏs? 👥\n\n𝐃ɪsᴘᴏɴᴇ ᴅᴇ *𝟼𝟶* ⏳ sᴇɢᴜɴᴅᴏs ᴘᴀʀᴀ ᴛᴏᴍᴀʀ ᴜɴᴀ ᴅᴇᴄɪsɪᴏ́ɴ. 𝐒ɪ ᴇsᴛᴀ́ ᴅᴇ ᴀᴄᴜᴇʀᴅᴏ ᴄᴏɴ ᴇsᴛᴀ ᴀᴄᴄɪᴏ́ɴ, ʀᴇsᴘᴏɴᴅᴀ ᴄᴏɴ ᴜɴ ‘sɪ́’. 𝚬ɴ ᴄᴀsᴏ ᴄᴏɴᴛʀᴀʀɪᴏ, ᴘᴜᴇᴅᴇ ᴄᴀɴᴄᴇʟᴀʀ ᴇsᴛᴀ ᴀᴄᴄɪᴏ́ɴ ʀᴇsᴘᴏɴᴅɪᴇɴᴅᴏ ᴄᴏɴ ᴜɴ ‘ɴᴏ’.`.trim())
        } break*/

        case 'promote': case 'demote': case 'darpoder': case 'quitarpoder': case 'addadmin': case 'deladmin': {
            if (!m.isGroup) return m.sms('group')
            if (!m.isBotAdmin) return m.sms('botAdmin')
            if (!m.isAdmin) return m.sms('admin')
            let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
            const User = who.slice(0, -15)
            if (!isNaN(User && m.mentionedJid[0] && m.text)) return m.reply('📌 𝚬ᴛɪϙᴜᴇᴛᴀ ᴏ ᴍᴇɴᴄɪᴏɴᴀ ᴀʟ ᴜsᴜᴀʀɪᴏ 👤')

            if (m.command == 'promote' || m.command == 'addadmin' || m.command == 'darpoder') { try { await conn.groupParticipantsUpdate(m.chat, [who], 'promote'); m.react(done) } catch { await m.react(error) } }

            else if (m.command == 'demote' || m.command == 'deladmin' || m.command == 'quitarpoder') { try { await conn.groupParticipantsUpdate(m.chat, [who], 'demote'); m.react(done) } catch { await m.react(error) } }

        } break

        case 'tagall': case 'invocar': case 'todos': {
            if (!m.isGroup) return m.sms('group')
            if (!m.isAdmin) return m.sms('admin')
            const pesan = m.text
            const oi = `💬 𝚳ᴇɴsᴀᴊᴇ: ${pesan}`;
            let teks = `⛩️ ✦ 𝚰 𝚴 𝐕 𝚯 𝐂 𝚨 𝚴 𝐃 𝚯 ✦ 👻\n\n`
            teks += `${oi}\n\n`
            for (let mem of m.participants) {
                teks += `⌬ @${mem.id.split('@')[0]}\n`
            }
            conn.sendMessage(m.chat, { text: teks, mentions: m.participants.map(a => a.id) }, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 })
        } break

        case 'estado': {
            const { isBanned, welcome, antiLink, antiTraba, commands } = database('chats', m.chat)
            let text = (`╭₊˚꒰ ❎ 𝐂𝚯𝚳𝚨𝚴𝐃𝚯𝐒 ✅
├╶╶╶✦
╵ ${antiTraba ? '✅' : '❎'} : 𝚨ɴᴛɪ-𝚻ʀᴀʙᴀ
╵ ${isBanned ? '✅' : '❎'} : 𝚩ᴀɴᴇᴀᴅᴏ
╵ ${welcome ? '✅' : '❎'} : 𝚩ɪᴇɴᴠᴇɴɪᴅᴀ
╵ ${antiLink ? '✅' : '❎'} : 𝚨ɴᴛɪ-𝐋ɪɴᴋ
╵ ${commands.rpg ? '❎' : '✅'} : 𝐂ᴏᴍᴀɴᴅᴏs 𝐑𝚸𝐆
╵ ${commands.servicio ? '❎' : '✅'} : 𝐂ᴏᴍᴀɴᴅᴏs ᴅᴇ ᴅᴇsᴄᴀʀɢᴀs
╰ ୨🌸୧─・┈・୨🍙୧・┈・─୨🍥୧`).trim()
            conn.sendMessage(m.chat, { text: text, mentions: [m.sender] }, { ephemeralExpiration: 24 * 3600, quoted: { key: { participant: '0@s.whatsapp.net' }, message: { documentMessage: { title: `💮 𝚬 𝐒 𝚻 𝚨 𝐃 𝚯  𝚩 𝚯 𝚻 🤖`, jpegThumbnail: fs.readFileSync('./multimedia/imagenes/thumbnail.jpg') } } } })
        } break
    }

    ////////////////////////DESCARGAS
    if (database('chats', m.chat).commands.servicio) {
        switch (m.command) {
            case 'mediafire': case 'mf': {
                if (!m.args[0]) return m.reply('🤔 𝐘 ᴇʟ ʟɪɴᴋ? 🔗')
                const res = await mediafireDl(m.args[0]);
                const { name, size, date, mime, link } = res;
                m.react(rwait)
                const caption = `📥 𝐃 𝐋 / 𝚳 𝚬 𝐃 𝚰 𝚨 𝟊 𝚰 𝐑 𝚬 💠*
      
*⌬ 𝚴ᴏᴍʙʀᴇ:*  ${name}
*⌬ 𝚻ᴀᴍᴀɴ̃ᴏ:* ${size}
*⌬ 𝚬xᴛᴇɴsɪᴏɴ:* ${mime}

📤 𝚬ɴᴠɪᴀɴᴅᴏ ᴀʀᴄʜɪᴠᴏ 📁${readMore}`.trim();
                await m.reply(caption);
                await conn.sendMessage(m.chat, { document: { url: await conn.sendBuffer(link) }, mimetype: 'video/' + mime, fileName: name }, { quoted: m }); m.react(done)
            } break

            case 'play': case 'yta': case 'playmp3': case 'audio': case 'ytv': case 'playmp4': case 'video': {
                if (coin().igual[0]) m.reply(coin().igual[1])
                if (coin().coin[0]) return m.reply(coin().coin[1])

                if (!m.text) return m.reply(`*⛩️ 𝚰ɴɢʀᴇsᴀ ᴇʟ ᴛɪ́ᴛᴜʟᴏ ᴅᴇ ᴜɴᴀ ᴄᴀɴᴄɪᴏ́ɴ 🎧*`)
                const vid = (await yts(m.text)).all[0]
                if (!vid) return m.reply(`😔 𝐒ɪɴ ʀᴇsᴜʟᴛᴀᴅᴏs`)
                const { title, description, thumbnail, videoId, timestamp, views, ago, url } = vid
                const play = `╭₊˚꒰ 🏮 𝐑ᴇɴᴊɪ/𝐃ᴏᴡɴʟᴏᴀᴅ
╰ ${emoji.title} *𝚻ɪᴛᴜʟᴏ:* ${title}\n╭ ${emoji.publicado} *𝚸ᴜʙʟɪᴄᴀᴅᴏ:* ${ago}\n╵ ${emoji.duracion} *𝐃ᴜʀᴀᴄɪóɴ:* ${timestamp}\n╵ ${emoji.vistas} *𝐕ɪsᴛᴀs:* ${views}\n╰ ୨🍥୧─・┈・୨🍙୧・┈・─୨🎐୧\n@Cargando${readMore}\n╭╴╴╴╴╴╴╴╴╴╴╴╴╴✦\n╰₊˚꒰ 🧾 *𝐃ᴇsᴄʀɪᴘᴄɪᴏɴ:* ${description}`.trim()
                const _Url = `https://www.youtube.com/watch?v=${videoId}`

                async function sendMsge(text) {
                    await new Promise(async (resolve, reject) => { try { await conn.sendMessage(m.chat, { text: play.replace('@Cargando', text), contextInfo: { externalAdReply: { title: title, body: description, thumbnailUrl: thumbnail, mediaType: 1, renderLargerThumbnail: true } } }, { quoted: m }); resolve() } catch (error) { console.error(error); await conn.sendMessage(m.chat, { text: play.replace('@Cargando', text), contextInfo: { externalAdReply: { title: title, body: description, thumbnailUrl: thumbnail, mediaType: 1, renderLargerThumbnail: true } } }, { quoted: m }); reject(error) } });
                }

                if (m.command == 'playmp3' || m.command == 'yta' || m.command == 'audio') {
                    try {
                        await sendMsge('📤 𝐂ᴀʀɢᴀɴᴅᴏ ᴀᴜᴅɪᴏ'); m.react(rwait)
                        const mp3 = await dlmp3(_Url)
                        conn.sendMessage(m.chat, { audio: fs.readFileSync(mp3.path), contextInfo: { externalAdReply: { title: title, body: mp3.info.author, previewType: "PHOTO", thumbnail: mp3.info.thumbnail } }, mimetype: "audio/mp4", fileName: `${title}.mp3` }, { quoted: m }); m.react(done); if (database('chats', m.chat).commands.rpg) { coin(true) }; fs.unlinkSync(mp3.path)
                    } catch (e) { m.react(error); return }
                }

                else if (m.command == 'play' || m.command == 'playmp4' || m.command == 'ytv' || m.command == 'video') {
                    try {
                        await sendMsge('📤 𝐂ᴀʀɢᴀɴᴅᴏ ᴠɪᴅᴇᴏ'); m.react(rwait)
                        const { title, thumb, Date, duration, channel, quality, contentLength, description, videoUrl } = await ytdl.mp4(_Url)
                        let cap = `╭₊˚꒰ *📥 𝐃ᴏᴡɴʟᴏᴀᴅ-𝐘ᴏᴜ𝚻ᴜʙᴇ 🏮*\n├╶╶╶✦\n╵📌 *𝚻ɪᴛᴜʟᴏ:* ${title}\n╵👁️ *𝐂ᴀʟɪᴅᴀᴅ:* ${quality}\n╰ ୨🔴୧─・┈・୨🍙୧・┈・─୨🌸୧`.trim()
                        await conn.sendMessage(m.chat, { document: { url: videoUrl }, caption: cap, mimetype: 'video/mp4', fileName: title + `.mp4` }, { quoted: m }); m.react(done); if (database('chats', m.chat).commands.rpg) { coin(true) }
                    } catch { m.react(error); return }
                }

            } break

            case 'ytmp4': case 'ytmp3': {
                if (coin().igual[0]) m.reply(coin().igual[1])
                if (coin().coin[0]) return m.reply(coin().coin[1])
                if (!m.args[0]) return m.reply('*❗𝚰ɴɢʀᴇsᴇ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ ᴊᴜɴᴛᴏ ᴀʟ ʟɪɴᴋ ᴅᴇ 𝐘ᴏᴜ𝚻ᴜʙᴇ 🏮*')
                if (!ytIdRegex.test(m.args[0])) return m.reply(`❌ 𝐋ɪɴᴋ ɪɴᴄᴏʀʀᴇᴄᴛᴏ`)
                if (m.command == 'ytmp3') {
                    const urls = YoutTube(m.text)
                    for (let i = 0; i < urls.length; i++) {
                        try {
                            const mp3 = await dlmp3(urls[i])
                            conn.sendMessage(m.chat, { audio: fs.readFileSync(mp3.path), contextInfo: { externalAdReply: { title: mp3.info.title, body: mp3.info.author, previewType: "PHOTO", thumbnail: mp3.info.thumbnail } }, mimetype: "audio/mp4", fileName: `${mp3.info.title}.mp3` }, { quoted: m }); m.react(done); if (database('chats', m.chat).commands.rpg) { coin(true) }; fs.unlinkSync(mp3.path)
                        } catch { m.react(error) }
                    }
                } else
                    if (m.command == 'ytmp4') {
                        const urls = YoutTube(m.text)
                        for (let i = 0; i < urls.length; i++) {
                            try {
                                const { title, thumb, Date, duration, channel, quality, contentLength, description, videoUrl } = await ytdl.mp4(urls[i])
                                let cap = `╭₊˚꒰ *📥 𝐃ᴏᴡɴʟᴏᴀᴅ-𝐘ᴏᴜ𝚻ᴜʙᴇ 🏮*\n├╶╶╶✦\n╵📌 *𝚻ɪᴛᴜʟᴏ:* ${title}\n╵👁️ *𝐂ᴀʟɪᴅᴀᴅ:* ${quality}\n╰ ୨🔴୧─・┈・୨🍙୧・┈・─୨🌸୧`.trim()
                                await conn.sendMessage(m.chat, { document: { url: videoUrl }, caption: cap, mimetype: 'video/mp4', fileName: title + `.mp4` }, { quoted: m }); m.react(done); if (database('chats', m.chat).commands.rpg) { coin(true) };
                            } catch { m.react(error) }
                        }
                    }

            } break

            case 'yts': case 'ytsearch': {
                if (coin().igual[0]) m.reply(coin().igual[1])
                if (coin().coin[0]) return m.reply(coin().coin[1])
                if (!m.text) return m.reply('🔍 𝐐ᴜᴇ ϙᴜɪᴇʀᴇs ϙᴜᴇ ʙᴜsϙᴜᴇ ᴇɴ 𝐘ᴏᴜ𝚻ᴜʙᴇ?')
                m.react(rwait)
                const vid = (await yts(m.text)).all[0]
                const { thumbnail } = vid
                let results = await yts(m.text)
                let teks = results.all.map(v => {
                    switch (v.type) {
                        case 'video': return `📌 ${v.title}\n🔗 *𝐋ɪɴᴋ:* ${v.url}\n⏳ *𝐃ᴜʀᴀᴄɪᴏ́ɴ:* ${v.timestamp}\n📆 *𝐒ᴜʙɪᴅᴏ:* ${v.ago}\n👀 *𝐕ɪsᴛᴀs:* ${v.views}`.trim()

                        case 'canal': return `⌬ *${v.name}* (${v.url})\n⌬ ${v.subCountLabel} (${v.subCount}) Suscribirse\n⌬ ${v.videoCount} videos`.trim()
                    }
                }).filter(v => v).join('\n\n✦ ୨🔎୧─・┈・୨🍙୧・┈・─୨🔗୧✦\n\n')
                await conn.sendMessage(m.chat, { text: readMore + teks, contextInfo: { externalAdReply: { title: '🤖 連 𝐑ᴇɴᴊɪ 𝚩ᴏᴛ / お 𝚶ɴɪɢɪʀɪ-sᴀɴ ん⟅ 🍙', thumbnailUrl: thumbnail, mediaType: 1, renderLargerThumbnail: true } } }, { quoted: m }); m.react(done); if (database('chats', m.chat).commands.rpg) { coin(true) }
            } break

            case 'tiktok': case 'tt': {
                if (!m.args[0]) return m.reply(`🕶️ 𝚬ᴊᴇᴍᴘʟᴏ:\n/ᴛɪᴋᴛᴏᴋ https://vm.tiktok.com/ZM6Q9XEfg/`)
                m.react(rwait)
                var ktt = await fetchJson(`https://www.tikwm.com/api/?url=${m.text}?hd=1`)
                var p = ktt.data
                try {
                    var musicatiktok = p.music
                    if (p.images) {
                        var url = p.images
                        var cptn = `*📌 𝚻ɪᴛᴜʟᴏ:* ${p.title}\n`
                        cptn += `*👤 𝐔sᴜᴀʀɪᴏ:* ${p.author.nickname}\n`
                        cptn += `*👀 𝐑ᴇᴘʀᴏᴅᴜᴄᴄɪᴏɴᴇs:* ${p.play_count}\n`
                        cptn += `*💬 𝐂ᴏᴍᴇɴᴛᴀʀɪᴏs:* ${p.comment_count}\n`
                        cptn += `*📥 𝐃ᴇsᴄᴀʀɢᴀs:* ${p.download_count}\n`
                        cptn += `*🖼️ 𝚰ᴍᴀɢᴇɴᴇs:* ${url.length}\n`
                        cptn += `\n📤 𝚬ɴᴠɪᴀɴᴅᴏ ᴍᴇᴅɪᴏs`
                        m.reply(cptn)
                        for (let o = 0; o < url.length; o++) { await conn.sendMessage(m.chat, { [(/mp4/.test(url[o])) ? "video" : "image"]: { url: url[o] } }, { quoted: m }) }
                        conn.sendMessage(m.chat, { audio: { url: musicatiktok }, mimetype: 'audio/mpeg' }); m.react(done)
                    } else {
                        var url = p.play
                        var cptn = `*📌 𝚻ɪᴛᴜʟᴏ:* ${p.title}\n`
                        cptn += `*👤 𝐔sᴜᴀʀɪᴏ:* ${p.author.nickname}\n`
                        cptn += `*👀 𝐑ᴇᴘʀᴏᴅᴜᴄᴄɪᴏɴᴇs:* ${p.play_count}\n`
                        cptn += `*💬 𝐂ᴏᴍᴇɴᴛᴀʀɪᴏs:* ${p.comment_count}\n`
                        cptn += `*📥 𝐃ᴇsᴄᴀʀɢᴀs:* ${p.download_count}\n`
                        cptn += `\n📤 𝚬ɴᴠɪᴀɴᴅᴏ ᴠɪᴅᴇᴏ ʏ ᴀᴜᴅɪᴏ 🎧`
                        await conn.sendMessage(m.chat, { video: { url: url }, caption: cptn }, { quoted: m })
                        conn.sendMessage(m.chat, { audio: { url: musicatiktok }, mimetype: 'audio/mpeg' }); m.react(done)
                    }
                } catch (e) { console.log(e); m.react(error) }
            } break

            case 'gitclone': case 'git': case 'clone': {
                const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
                if (coin().igual[0]) m.reply(coin().igual[1])
                if (coin().coin[0]) return m.reply(coin().coin[1])

                if (!m.args[0]) m.reply('🤔 𝐘 ᴇʟ ʟɪɴᴋ? 🔗')
                if (!regex.test(m.args[0])) m.reply(`❌ 𝐋ɪɴᴋ ɪɴᴄᴏʀʀᴇᴄᴛᴏ`)
                let [_, user, repo] = m.args[0].match(regex) || []
                repo = repo.replace(/.git$/, '')
                let url = `https://api.github.com/repos/${user}/${repo}/zipball`
                let filename = (await fetch(url, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
                m.react(rwait)
                try { conn.sendMessage(m.chat, { document: { url: url }, mimetype: 'document/zip', fileName: filename }, { quoted: m }); m.react(done); if (database('chats', m.chat).commands.rpg) { coin(true) } } catch { m.react(error); return }
            } break

            //https://drive.google.com/file/d/1dmHlx1WTbH5yZoNa_ln325q5dxLn1QHU/view*
            case 'gdrive': {
                if (coin().igual[0]) m.reply(coin().igual[1])
                if (coin().coin[0]) return m.reply(coin().coin[1])
                if (!m.args[0]) return m.reply(`🤔 𝐘 ᴇʟ ʟɪɴᴋ? 🔗`)
                try { m.react(rwait); await GDriveDl(args[0]).then(async (res) => { if (!res) return m.reply(res); conn.sendMessage(m.chat, { document: { url: res.downloadUrl }, mimetype: res.mimetype, fileName: `${res}` }, { quoted: m }); if (database('chats', m.chat).commands.rpg) { coin(true) } }) } catch (e) { m.react(error) }
            } break

            case 'pinterest': case 'pin': {
                if (!m.text) return m.reply(`${pushname} Please provide a search term!`);
                m.react(rwait)
                const pintst = await pinterest(m.text)
                const results = []
                const Numero = 5
                for (let i = 0; i < Numero && i < pintst.length; i++) { results.push(pintst[Math.floor(Math.random() * pintst.length)]) }
                for (let i = 0; i < results.length; i++) { conn.sendMessage(m.chat, { image: { url: results[i] } }, { quoted: m }) }
            } break

            case 'gimage': case 'image': case 'imagen': {
                if (coin().igual[0]) m.reply(coin().igual[1])
                if (coin().coin[0]) return m.reply(coin().coin[1])

                if (!m.text) return m.reply("🔗 ¡𝚰ɴɢʀᴇsᴇ ᴜɴ ᴛᴇ́ʀᴍɪɴᴏ ᴅᴇ ʙᴜ́sϙᴜᴇᴅᴀ ᴘᴀʀᴀ ᴏʙᴛᴇɴᴇʀ ᴜɴᴀ ɪᴍᴀɢᴇɴ ᴅᴇ 𝐆ᴏᴏɢʟᴇ! 🍃");
                m.react(rwait)

                try {
                    await gis(m.text, async (error, result) => {
                        if (error) { return m.reply("❌ 𝐒ᴇ ʜᴀ ᴘʀᴏᴅᴜᴄɪᴅᴏ ᴜɴ ᴇʀʀᴏʀ ᴀʟ ʙᴜsᴄᴀʀ ɪᴍᴀ́ɢᴇɴᴇs.") }
                        if (!result || result.length === 0) { return m.reply("❌ 𝚴ᴏ sᴇ ʜᴀɴ ᴇɴᴄᴏɴᴛʀᴀᴅᴏ ɪᴍᴀ́ɢᴇɴᴇs ᴘᴀʀᴀ ᴇʟ ᴛᴇ́ʀᴍɪɴᴏ ᴅᴇ ʙᴜ́sǫᴜᴇᴅᴀ ᴅᴀᴅᴏ.") }
                        const images = result[Math.floor(Math.random() * result.length)].url
                        try { conn.sendMessage(m.chat, { image: { url: images }, caption: `╭₊˚꒰ ☘️ 𝐆𝚯𝚯𝐆𝐋𝚬 🟡\n├╶╶╶✦\n╵⌬ *𝐑ᴇsᴜʟᴛᴀᴅᴏ ᴅᴇ:* ${m.text}\n╵⌬ *𝚩ᴜsᴄᴀᴅᴏʀ: 🔍 𝐆ᴏᴏɢʟᴇ 🍃*\n╰ ୨🔷୧─・┈・୨🍙୧・┈・─୨🔺୧`, }, { quoted: m }); m.react(done); if (database('chats', m.chat).commands.rpg) { coin(true) } } catch { m.react('❌') }

                    });
                } catch { m.react(error) }
            } break

            case 'chatgpt': case 'gpt': case 'ia': case 'renji': {
                if (coin().igual[0]) m.reply(coin().igual[1])
                if (coin().coin[0]) return m.reply(coin().coin[1])
                if (!m.text) return m.reply('🤔 𝐘 ᴇʟ ᴛᴇxᴛᴏ? 💬')
                m.react('\uD83D\uDCAC')
                try {
                    await conn.sendPresenceUpdate('composing', m.chat)
                    const OpenAI = await fetchJson(`https://aemt.me/openai?text=${m.text}`)
                    var Texto = OpenAI.result
                    await m.reply(Texto); if (database('chats', m.chat).commands.rpg) { coin(true) }
                } catch { m.react(error) }
            } break

            case 'voz': {
                if (!m.text) return m.reply('🤔 𝐘 ᴇʟ ᴛᴇxᴛᴏ? 💬')
                const audio = await tts(m.text);
                await conn.sendMessage(m.chat, { audio: audio, fileName: 'error.mp3', mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
            } break

            case 'cleancloud': case 'cloudclean': case 'delfiles': case 'delfile': case 'mycloud': case 'editfile': case 'guardar': case 'savefile': case 'save': case 'savecloud': case 'sendfile': case 'listfile': {
                const saveFiles = global.db.data.cloud[m.sender].saveFiles
                const sms = m.SMS()

                const nLimite = m.isROwner ? 99 : m.isOwner ? 49 : m.isPrems ? 19 : 4
                const sLimite = m.isROwner ? '100' : m.isOwner ? '20' : m.isPrems ? '10' : '5'

                const mtype = ['viewOnceMessageV2']
                if (m.command == 'guardar' || m.command == 'save' || m.command == 'savecloud' || m.command == 'savefile') {
                    if (saveFiles.length > nLimite) return m.reply(`🤓 𝚬ʟ ʟɪᴍɪᴛᴇ ᴇs ᴅᴇ ${sLimite} ᴀʀᴄʜɪᴠᴏs ᴘᴏʀ ᴜsᴜᴀʀɪᴏ.`)
                    let istrue = true
                    mtype.forEach(elemento => {
                        const filesave = { fileName: m.text ? m.text : m.type(sms.message) == 'documentMessage' ? sms.message.documentMessage.fileName : 'My Archive', fecha: moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('DD/MM/YY HH:mm:ss'), fileMessage: sms }
                        if (m.type(sms.message) == elemento) istrue = false
                        if (istrue) { saveFiles.push(filesave); m.react(done); if (database('chats', m.chat).commands.rpg) { coin(true) } } else { m.reply('❌ 𝚬ʟ ᴀʀᴄʜɪᴠᴏ ɴᴏ ᴄᴏɪɴᴄɪᴅᴇ ᴄᴏɴ ʟᴏs ғᴏʀᴍᴀᴛᴏs ᴀᴅᴍɪᴛɪᴅᴏs.'); m.react(error) }
                    })
                }

                const texto = (`╭₊˚꒰ 🗃️ 𝚳𝐘 𝐂𝐋𝚯𝐔𝐃 🪀\n├╶╶╶✦\n╵ 👤 *𝐔sᴇʀ:* @${m.sender.split('@')[0]}\n╵ 🕶️ *𝐔sᴏ:* ${saveFiles.length}/${sLimite}${saveFiles[0] ? '\n├╶╶╶✦\n' + saveFiles.map((objeto, indice) => `╵ ⎔ ${indice + 1} *𝚴ᴀᴍᴇ ғɪʟᴇ:* ${objeto.fileName}\n╵ ⌬ *𝚻ɪᴘᴏ:* ${m.type(objeto.fileMessage.message).split('Message').join('')}\n╰ ୨🌸୧─・┈・୨🍙୧・┈・─୨🗃️୧\n\n╭╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴✦\n╰₊˚꒰ ⌚ *𝐔ʟᴛɪᴍᴀ ᴍᴏᴅɪғɪᴄᴀᴄɪᴏɴ:* ${objeto.fecha}`).join('\n\n') : ''}`)

                if (m.command == 'listfile' || m.command == 'mycloud') return conn.sendMessage(m.chat, { text: saveFiles[0] ? `${texto}\n\n${readMore}⎔ @${m.sender.split('@')[0]} 💻 𝚸ᴜᴇᴅᴇs ᴜᴛɪʟɪᴢᴀʀ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ "/sᴇɴғɪʟᴇ" ʏ, sɪɢᴜɪᴇɴᴅᴏ ᴇʟ ᴏʀᴅᴇɴ ᴅᴇ ɢᴜᴀʀᴅᴀᴅᴏ, ᴇsᴘᴇᴄɪғɪᴄᴀʀ ᴇʟ ɴᴜ́ᴍᴇʀᴏ ᴄᴏʀʀᴇsᴘᴏɴᴅɪᴇɴᴛᴇ ᴘᴀʀᴀ ᴇɴᴠɪᴀʀʟᴏ. 📤\n\n⎔ *𝚬ᴊᴇᴍᴘʟᴏ:* sᴇɴᴅғɪʟᴇ 𝟷` : `${texto}\n\n sɪɴ ᴀʀᴄʜɪᴠᴏs \n\n💬 𝐑ᴇsᴘᴏɴᴅᴀ ᴏ ᴇɴᴠɪᴇ ᴜɴ ᴀʀᴄʜɪᴠᴏ ᴄᴏɴ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ */sᴀᴠᴇғɪʟᴇ* ᴘᴀʀᴀ ɢᴜᴀʀᴅᴀʀʟᴏ. 📥`, contextInfo: { mentionedJid: [...texto.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') } }, { quoted: m })

                if (m.command == 'sendfile') {
                    const regex = /\b(10|[1-9])\b/
                    if (!m.text) return m.reply(`Tienes ${saveFiles.length}/${sLimite}`)
                    const numero = m.text.match(regex);
                    if (!numero) return;
                    const indice = parseInt(numero[0], 10)
                    if (!isNaN(indice) && indice >= 1 && indice <= 10) {
                        const file = saveFiles[indice - 1].fileMessage
                        conn.copyNForward(m.chat, file)
                    } else { m.react(error) }
                }
                if (m.command == 'cleancloud' || m.command == 'cloudclean' || m.command == 'delfiles') {
                    try { saveFiles.splice(0, saveFiles.length); m.react('🗑') } catch { m.react(error) }
                }

                if (m.command == 'delfile') {
                    const regex = /\b(10|[1-9])\b/
                    if (!m.text) return m.reply(`Tienes ${saveFiles.length}/${sLimite}`)
                    const numero = m.text.match(regex);
                    if (!numero) return;
                    const indice = parseInt(numero[0], 10)
                    if (!isNaN(indice) && indice >= 1 && indice <= 10) { saveFiles.splice(indice - 1, 1); m.react(done) } else { m.reply('❌ 𝚰ɴᴅɪᴄᴇ ғᴜᴇʀᴀ ᴅᴇ ʀᴀɴɢᴏ ᴏ ɪɴᴠᴀ́ʟɪᴅᴏ.') }
                }
                if (m.command == 'editfile') {
                    let [array, fileName] = m.text.split`|`
                    const regex = /\b(10|[1-9])\b/
                    if (!array) return m.reply(`🤓 𝐒ᴇᴘᴀʀᴀ ᴇʟ ɴᴜᴍᴇʀᴏ ʏ ᴇʟ ɴᴜᴇᴠᴏ ɴᴏᴍʙʀᴇ ᴄᴏɴ | \n*𝚬ᴊᴇᴍᴘʟᴏ:* /ᴇᴅɪᴛғɪʟᴇ 1 | 𝚳ʏ ᴀʀᴄʜɪᴠᴇ`)
                    if (!fileName) return m.reply(`🤓 𝐒ᴇᴘᴀʀᴀ ᴇʟ ɴᴜᴍᴇʀᴏ ʏ ᴇʟ ɴᴜᴇᴠᴏ ɴᴏᴍʙʀᴇ ᴄᴏɴ | \n*Ejemplo:* /ᴇᴅɪᴛғɪʟᴇ 1 | 𝚳ʏ ᴀʀᴄʜɪᴠᴇ`)
                    const numero = array.match(regex);
                    if (!numero) return;
                    const indice = parseInt(numero[0], 10)
                    if (!isNaN(indice) && indice >= 1 && indice <= 10) {
                        const mensage = saveFiles[indice - 1].fileMessage.message
                        try {
                            saveFiles[indice - 1].fileName = fileName
                            saveFiles[indice - 1].fecha = moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('DD/MM/YY HH:mm:ss')
                            if (m.type(mensage) == 'documentMessage') {
                                const filename = mensage.documentMessage.fileName
                                const Extension = path.extname(filename)
                                saveFiles[indice - 1].fileMessage.message.documentMessage.fileName = fileName + Extension;
                                m.react(done)
                            }
                            m.react(done)
                        } catch { m.react(error) }
                    } else { m.reply('𝚰ɴᴅɪᴄᴇ ғᴜᴇʀᴀ ᴅᴇ ʀᴀɴɢᴏ ᴏ ɪɴᴠᴀ́ʟɪᴅᴏ. ❌') }
                }
            } break

            case 'sticker': case 's': {
                const smsg = m.type(m.SMS().message)
                if (coin().igual[0]) m.reply(coin().igual[1])
                if (coin().coin[0]) return m.reply(coin().coin[1])

                if (smsg == 'imageMessage') {
                    let media = await conn.download()
                    await conn.sendImageAsSticker(m.chat, media, m, { packname: m.args[0] || m.name || 'null', author: '連 𝐑ᴇɴᴊɪ 𝚩ᴏᴛ-𝚳𝐃' }); if (database('chats', m.chat).commands.rpg) { coin(true) }
                } else if (smsg == 'videoMessage') {
                    if (m.SMS().message.seconds > 12) return m.reply('𝚳ᴀ́xɪᴍᴏ 𝟷𝟶 sᴇɢᴜɴᴅᴏs! ⏱️')
                    let media = await conn.download()
                    conn.sendVideoAsSticker(m.chat, media, m, { packname: m.args[0] || m.name || 'null', author: '連 𝐑ᴇɴᴊɪ 𝚩ᴏᴛ-𝚳𝐃' }); if (database('chats', m.chat).commands.rpg) { coin(true) }
                } else {
                    m.reply(`💬 𝐑ᴇsᴘᴏɴᴅᴇ ᴏ ᴇɴᴠɪ́ᴀ ᴜɴ ᴠɪᴅᴇᴏ/ɪᴍᴀɢᴇɴ ᴜᴛɪʟɪᴢᴀɴᴅᴏ ᴇʟ sɪɢᴜɪᴇɴᴛᴇ ᴄᴏᴍᴀɴᴅᴏ: ${m.prefix + m.command}\n𝐃ᴜʀᴀᴄɪᴏ́ɴ ᴅᴇʟ ᴠɪᴅᴇᴏ: 𝟷-𝟿 sᴇɢᴜɴᴅᴏs ⌚`)
                }
            } break
        }
    }

    ////////////////////////RPG
    if (database('chats', m.chat).commands.rpg) {
        switch (m.command) {
            case 'level': case 'nivel': case 'subirnivel': case 'lvl': case 'levelup': {
                if (!(m.sender in global.db.data.users)) return m.reply(`😔 𝚴ᴏ ᴇsᴛᴀs ᴇɴ ᴍɪ ʙᴀsᴇ ᴅᴇ ᴅᴀᴛᴏs 🤖`)
                const User = global.db.data.users[m.sender]
                let nivel = User.nivel
                let Exp = User.exp
                const NivelXp = (level) => { return level * global.rpg.precios.nivel }
                let Texto = ''
                while (Exp >= NivelXp(nivel + 1)) {
                    nivel += 1
                    const ExpB = NivelXp(nivel) * 0.01
                    const Role = global.rpg.role.find(r => r.nivel === (nivel > 99 ? 100 : nivel))
                    User.nivel = nivel
                    User.role = Role ? Role.name : ''
                    User.exp = premium(m.sender) ? User.exp - 0 : items(User.exp, ExpB) ? User.exp - ExpB : 500
                    Texto = (`╭₊˚꒰ *🎉 𝐒𝐔𝚩𝚬𝐒  𝐃𝚬  𝚴𝚰𝐕𝚬𝐋 ⬆️*
├╶╶╶✦\n╵👤 *𝚴ᴏᴍʙʀᴇ:* @${m.sender.split`@`[0]}\n╵✨ 𝚴ɪᴠᴇʟ: *${nivel}*\n╵🛡️ 𝐑ᴀɴɢᴏ: *${User.role}*\n╵ - ${ExpB}🎋 *𝚾𝚸*\n${User.nivel > 99 ? `\n⎔ @${m.sender.split`@`[0]} 🫂 𝐆ʀᴀᴄɪᴀs ᴘᴏʀ ᴜsᴀʀ ᴀ 連 𝐑ᴇɴᴊɪ 𝚩ᴏᴛ-𝚳𝐃 🤖` : '╰ ୨🎍୧─・┈・୨🍙୧・┈・─୨🌸୧\n\n*𝐂ᴜᴀɴᴛᴏ ᴍᴀ́s ɪɴᴛᴇʀᴀᴄᴛᴜ́ᴇs ᴄᴏɴ 連 𝐑ᴇɴᴊɪ 𝚩ᴏᴛ-𝚳𝐃, ᴍᴀʏᴏʀ sᴇʀᴀ́ ᴛᴜ ɴɪᴠᴇʟ ⬆️*'}`)
                }

                if (Texto) return m.reply(Texto)
                else { m.reply(`╭₊˚꒰ *🎋 𝚴𝚰𝐕𝚬𝐋  𝚨𝐂𝚻𝐔𝚨𝐋 🛡️*
├╶╶╶✦\n╵👤 *𝚴ᴏᴍʙʀᴇ:* @${m.sender.split`@`[0]}\n╵✨ 𝚴ɪᴠᴇʟ: *${User.nivel}*\n╵🎋 𝚾𝚸: *${User.exp}/${NivelXp(nivel + 1)}*\n╵🛡️ 𝐑ᴀɴɢᴏ: *${User.role}*\n╰ ୨🔰୧─・┈・୨🍙୧・┈・─୨⛩️୧\n\n╭╶╶╶╶╶╶╶╶╶╶✦
╰₊˚꒰ 😄 𝚻ᴇ ғᴀʟᴛᴀ *${NivelXp(nivel + 1) - Exp}* ᴅᴇ *𝚾𝚸* ᴘᴀʀᴀ sᴜʙɪʀ ᴀʟ ɴɪᴠᴇʟ ${nivel + 1}${User.nivel > 99 ? `\n⎔ @${m.sender.split`@`[0]} 🫂 𝐆ʀᴀᴄɪᴀs ᴘᴏʀ ᴜsᴀʀ ᴀ 連 𝐑ᴇɴᴊɪ 𝚩ᴏᴛ-𝚳𝐃 🤖` : ''}`) }
            } break

            case 'minar': case 'mine': {
                const tiempoEspera = global.rpg.cantidad.tiempoMinera
                let hasil = Math.floor(Math.random() * global.rpg.cantidad.mineria)
                let time = global.db.data.users[m.sender].lastmiming + tiempoEspera
                if (new Date - global.db.data.users[m.sender].lastmiming < tiempoEspera) return m.reply(`⏳ 𝚬sᴘᴇʀᴀ *${msToTime(time - new Date())}* ᴘᴀʀᴀ ʀᴇɢʀᴇsᴀʀ ᴀ ᴍɪɴᴀʀ ⛏️`)
                global.db.data.users[m.sender].exp += hasil
                m.reply(`*🎉 𝟊ᴇʟɪᴄɪᴅᴀᴅᴇs 𝚳ɪɴᴀsᴛᴇ  ⛏️${hasil} 𝚾𝚸 ✨*`)
                global.db.data.users[m.sender].lastmiming = new Date * 1
            } break

            case 'buy': case 'buyall': case 'comprar': {
                const xppercoin = global.rpg.precios.coin
                let count = m.command.replace(/^buy/i, '')
                count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xppercoin) : parseInt(count) : m.args[0] ? parseInt(m.args[0]) : 1
                count = Math.max(1, count)
                if (global.db.data.users[m.sender].exp >= xppercoin * count) {
                    global.db.data.users[m.sender].exp -= xppercoin * count
                    global.db.data.users[m.sender].coin += count
                    m.reply(`\n╭₊˚꒰ 💹 *𝚩𝐔𝐘/𝚩𝐔𝐘𝚨𝐋𝐋* 💰
├╶╶╶✦
╵💰 *𝐂ᴏᴍᴘʀᴀʀ* 🛒: + ${count}💴\n╵🎍 *𝐆ᴀsᴛᴀᴅᴏ*: -${xppercoin * count} 𝚾𝚸
╰ ୨🍥୧─・┈・୨🗼୧・┈・─୨🌸୧`)
                } else m.reply(`😔 𝐋ᴏ sɪᴇɴᴛᴏ, ɴᴏ ᴛɪᴇɴᴇs sᴜғɪᴄɪᴇɴᴛᴇs *𝚾𝚸* ᴘᴀʀᴀ ᴄᴏᴍᴘʀᴀʀ *${count}* ᴄᴏɪɴs / 💴`)

            } break

            case 'robar': case 'rob': {
                const { robar, tiempoRobar } = global.rpg.cantidad
                let time = global.db.data.users[m.sender].lastrob + tiempoRobar
                if (new Date - global.db.data.users[m.sender].lastrob < tiempoRobar) return m.reply(`¡𝚮ᴇʏ! 𝚬sᴘᴇʀᴀ ⌚ *${msToTime(time - new Date())}* ᴘᴀʀᴀ ᴠᴏʟᴠᴇʀ ᴀ ʀᴏʙᴀʀ 👺`)
                let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false

                if (!who) return m.reply(`𝚬ᴛɪǫᴜᴇᴛᴀ ᴀ ᴀʟɢᴜɪᴇɴ ᴘᴀʀᴀ ʀᴏʙᴀʀ 👺`)
                if (!(who in global.db.data.users)) return m.reply(`𝚬ʟ ᴜsᴜᴀʀɪᴏ ɴᴏ sᴇ ᴇɴᴄᴜᴇɴᴛʀᴀ ᴇɴ ᴍɪ ʙᴀsᴇ ᴅᴇ ᴅᴀᴛᴏs 🤖`)
                let users = global.db.data.users[who]
                let rob = Math.floor(Math.random() * robar)

                if (users.exp < rob) return m.reply(`@${who.split`@`[0]} ᴛɪᴇɴᴇ ᴍᴇɴᴏs ᴅᴇ *${robar} 𝚾𝚸*`, null, { mentions: [who] })
                global.db.data.users[m.sender].exp += rob
                global.db.data.users[who].exp -= rob

                m.reply(`*💰 𝐑 𝚯 𝚩 𝚨 𝐒 𝚻 𝚬 👺${rob} 𝚾𝚸* a @${who.split`@`[0]}`, null, { mentions: [who] })
                global.db.data.users[m.sender].lastrob = new Date * 1
            } break

            case 'bal': case 'inventario': case 'coin': case 'balance': {
                let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
                let user = global.db.data.users[who]
                if (!(who in global.db.data.users)) return m.reply(`👤 𝚬ʟ ᴜsᴜᴀʀɪᴏ ɴᴏ sᴇ ᴇɴᴄᴜᴇɴᴛʀᴀ ᴇɴ ᴍɪ ʙᴀsᴇ ᴅᴇ ᴅᴀᴛᴏs 😔`)
                m.reply(`\n╭₊˚꒰ *✨ 𝚩 𝚨 𝐋 𝚨 𝚴 𝐂 𝚬 💰*
├╶╶╶✦\n╵👤 *𝚴ᴏᴍʙʀᴇ:* @${who.split('@')[0]}\n╵💴 *𝐂ᴏɪɴs:* ${m.isPrems ? '∞' : user.coin}\n╵✨ *ɴɪᴠᴇʟ:* ${user.nivel}\n╵⚔️ *𝐑ᴏʟ:* ${user.role}\n╵🎋 *𝚾𝚸:* 𝚻ᴏᴛᴀʟ ${user.exp}\n╰ ୨✨୧─・┈・୨🔮୧・┈・─୨🌸୧\n\n╭╶╶╶╶╶╶╶╶╶✦
╰₊˚꒰ *📄 𝚴𝚯𝚻𝚨:* 𝚸ᴜᴇᴅᴇs ᴄᴏᴍᴘʀᴀʀ 💴 ᴄᴏɪɴs ᴜsᴀɴᴅᴏ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ\n*${prefix}ʙᴜʏ <ᴄᴀɴᴛɪᴅᴀᴅ>*`)
            } break

            case 'diario': case 'claim': case 'reclamar': {
                const { claimFree, claimPrem, TiempoClaim } = global.rpg.cantidad
                const User = global.db.data.users[m.sender]
                let time = User.lastclaim + TiempoClaim
                if (new Date - User.lastclaim < TiempoClaim) return m.reply(`*𝐘ᴀ ʀᴇᴄᴏɢɪsᴛᴇ ᴛᴜ ʀᴇᴄᴏᴍᴘᴇɴsᴀ ᴅɪᴀʀɪᴀ*\n\n🕚 𝐕ᴜᴇʟᴠᴇ ᴇɴ *${msToTime(time - new Date())}*`)
                User.exp += m.isPrems ? claimPrem : claimFree
                m.reply(`\n *💴 𝐑𝚬𝐂𝚯𝚳𝚸𝚬𝚴𝐒𝚨 𝐃𝚰𝚨𝐑𝚰𝚨 🌄*\n\n✨ *𝚮ᴀs ʀᴇᴄɪʙɪᴅᴏ: +${m.isPrems ? claimPrem : claimFree} 𝚾𝚸*`)
                User.lastclaim = new Date * 1
            } break

            case 'slot': {
                const { exp, nivel } = database('users', m.sender)

                if (coin().coin[0]) return m.reply(coin().coin[1])
                if (exp < 300) return m.reply('🤓 𝚬s ɴᴇᴄᴇsᴀʀɪᴏ ᴛᴇɴᴇʀ ᴜɴ ᴍɪ́ɴɪᴍᴏ ᴅᴇ *𝟹𝟶𝟶 ✨ 𝚾𝚸* ᴘᴀʀᴀ ᴘᴏᴅᴇʀ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.')
                if (nivel == 4 || nivel < 5) return m.reply('🤓 𝚸ᴀʀᴀ ᴜᴛɪʟɪᴢᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ, ᴇs ɴᴇᴄᴇsᴀʀɪᴏ ǫᴜᴇ ᴛᴇ ᴇɴᴄᴜᴇɴᴛʀᴇs ᴇɴ ᴇʟ ɴɪᴠᴇʟ 𝟻 ᴏ ᴇɴ ᴜɴᴏ ᴍᴀ́s ᴀᴠᴀɴᴢᴀᴅᴏ..')
                if (coin().igual[0]) m.reply(coin().igual[1])

                const frutas = ['🍥', '🍘', '🍙', '🍣', '🍡', '🍜', '🍶', '🍱']

                let rueda1 = [frutas[Math.floor(Math.random() * frutas.length)], frutas[Math.floor(Math.random() * frutas.length)], frutas[Math.floor(Math.random() * frutas.length)]];
                let rueda2 = [frutas[Math.floor(Math.random() * frutas.length)], frutas[Math.floor(Math.random() * frutas.length)], frutas[Math.floor(Math.random() * frutas.length)]];
                let rueda3 = [frutas[Math.floor(Math.random() * frutas.length)], frutas[Math.floor(Math.random() * frutas.length)], frutas[Math.floor(Math.random() * frutas.length)]];

                let texto = `🎰 ✦ *𝐑ᴇsᴜʟᴛᴀᴅᴏ:*\n\n┌                             ┐\n   ${rueda1[0]} │ ${rueda2[0]} │ ${rueda3[0]}\n   ✦────────✦\n   ${rueda1[1]} │ ${rueda2[1]} │ ${rueda3[1]}\n   ✦────────✦\n   ${rueda1[2]} │ ${rueda2[2]} │ ${rueda3[2]}\n└                             ┘\n\n`

                if (rueda1[1] === rueda2[1] && rueda2[1] === rueda3[1]) {
                    texto += "🎉 *¡𝟊ᴇʟɪᴄɪᴅᴀᴅᴇs!* 𝐋ᴀs ᴛʀᴇs ᴄᴏᴍɪᴅᴀs ᴊᴀᴘᴏɴᴇsᴀs 🎌 ᴅᴇʟ ᴄᴇɴᴛʀᴏ sᴏɴ ɪɢᴜᴀʟᴇs. *𝐆ᴀɴᴀsᴛᴇ 𝟷𝟶𝟶𝟶 𝚾𝚸 ✨*."
                    database('users', m.sender).exp += 1000
                    conn.sendMessage(m.chat, { audio: fs.readFileSync('./multimedia/audios/bara.m4a'), contextInfo: { externalAdReply: { title: `🎉 ¡𝟊ᴇʟɪᴄɪᴅᴀᴅᴇs! +1000 𝚾𝚸 ✨`, body: `𝐔sᴜᴀʀɪᴏ ᴅᴇ 連 𝐑ᴇɴᴊɪ 𝚩ᴏᴛ 𝚳𝐃`, thumbnailUrl: await conn.profilePictureUrl(m.sender, 'image') } }, fileName: `Bot.mp3`, mimetype: 'audio/mpeg', ptt: true }, { quoted: m })

                } else if (rueda1[1] === rueda2[1] || rueda2[1] === rueda3[1] || rueda1[1] === rueda3[1]) {
                    texto += "⌬ 𝐃ᴏs ᴄᴏᴍɪᴅᴀs ᴊᴀᴘᴏɴᴇsᴀs 🎌 ᴅᴇʟ ᴄᴇɴᴛʀᴏ sᴏɴ ɪɢᴜᴀʟᴇs. *𝐆ᴀɴᴀsᴛᴇ 𝟻𝟶𝟶 𝚾𝚸 ✨*."
                    database('users', m.sender).exp += 500
                } else {
                    texto += "⌬ 𝐋ᴀs ᴄᴏᴍɪᴅᴀs ᴊᴀᴘᴏɴᴇsᴀs 🎌 ᴅᴇʟ ᴄᴇɴᴛʀᴏ sᴏɴ ᴅɪғᴇʀᴇɴᴛᴇs. *𝚸ᴇʀᴅɪsᴛᴇ 𝟸𝟶𝟶 𝚾𝚸*. 🤣"
                    database('users', m.sender).exp = premium(m.sender) ? exp - 0 : exp - 200
                }

                m.reply(texto)
            } break

            case 'ppt': {
                const User = database('users', m.sender)
                const Empate = 100
                const ganar = 300
                const perder = 200
                if (User.exp < perder) return m.reply(`🤓 𝚬s ɴᴇᴄᴇsᴀʀɪᴏ ᴛᴇɴᴇʀ ᴜɴ ᴍɪ́ɴɪᴍᴏ ᴅᴇ *${perder} 𝚾𝚸 ✨* ᴘᴀʀᴀ ᴘᴏᴅᴇʀ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.`)
                if (!m.text) m.reply(`☝️Sᴇʟᴇᴄᴄɪᴏɴᴇ ᴘɪᴇᴅʀᴀ/ᴘᴀᴘᴇʟ/ᴛɪᴊᴇʀᴀ\n\n📌 𝚬ᴊᴇᴍᴘʟᴏ: *${prefix + m.command}* ᴘᴀᴘᴇʟ 🧻`)

                const item = ['piedra', 'papel', 'tijera']
                const randItem = item[Math.floor(Math.random() * (item.length))]

                if (randItem == m.text) {
                    User.exp += Empate
                    m.reply(`╭₊˚꒰ 🤝 *𝚬 𝚳 𝚸 𝚨 𝚻 𝚬*
├╶╶╶✦\n╵⎔› 👊 𝚻ú: ${m.text}\n╵⎔› 🤖 𝚩ᴏᴛ: ${randItem}\n├╶╶╶✦\n╵🎁 𝚸ᴜɴᴛᴏs *+${Empate} 𝚾𝚸*\n╰・୨🎍୧・─・┈・୨🍙୧・`)
                } else if (m.text == 'piedra') {
                    if (randItem == 'tijera') {
                        User.exp += ganar
                        m.reply(`╭₊˚꒰ 🎉 *𝐆 𝚨 𝚴 𝚨 𝐒 𝚻 𝚬*
├╶╶╶✦\n╵⎔› 👊 𝚻ú: ${m.text}\n╵⎔› 🤖 𝚩ᴏᴛ: ${randItem}\n├╶╶╶✦\n╵🎁 𝚸ᴜɴᴛᴏs *+${ganar} 𝚾𝚸*\n╰・୨🎍୧・─・┈・୨🍙୧・`)
                    } else {
                        User.exp = premium(m.sender) ? User.exp - 0 : items(User.exp, perder) ? User.exp - perder : 0
                        m.reply(`╭₊˚꒰ 😔 *𝚸 𝚬 𝐑 𝐃 𝚰 𝐒 𝚻 𝚬*
├╶╶╶✦\n╵⎔› 👊 𝚻ú: ${m.text}\n╵⎔› 🤖 𝚩ᴏᴛ: ${randItem}\n├╶╶╶✦\n╵📉 𝚸ᴜɴᴛᴏs *-${perder} 𝚾𝚸*\n╰・୨🎍୧・─・┈・୨🍙୧・`)
                    }
                } else if (m.text == 'tijera') {
                    if (randItem == 'papel') {
                        User.exp += ganar
                        m.reply(`╭₊˚꒰ 🎉 *𝐆 𝚨 𝚴 𝚨 𝐒 𝚻 𝚬*
├╶╶╶✦\n╵⎔› 👊 𝚻ú: ${m.text}\n╵⎔› 🤖 𝚩ᴏᴛ: ${randItem}\n├╶╶╶✦\n╵🎁 𝚸ᴜɴᴛᴏs *+${ganar} 𝚾𝚸*\n╰・୨🎍୧・─・┈・୨🍙୧・`)
                    } else {
                        User.exp = premium(m.sender) ? User.exp - 0 : items(User.exp, perder) ? User.exp - perder : 0
                        m.reply(`╭₊˚꒰ 😔 *𝚸 𝚬 𝐑 𝐃 𝚰 𝐒 𝚻 𝚬*
├╶╶╶✦\n╵⎔› Tú : ${m.text}\n╵⎔› 🤖 𝚩ᴏᴛ: ${randItem}\n├╶╶╶✦\n╵📉 𝚸ᴜɴᴛᴏs *-${perder} 𝚾𝚸*\n╰・୨🎍୧・─・┈・୨🍙୧・`)
                    }
                } else if (m.text == 'papel') {
                    if (randItem == 'piedra') {
                        User.exp += ganar
                        m.reply(`╭₊˚꒰ 🎉 *𝐆 𝚨 𝚴 𝚨 𝐒 𝚻 𝚬*
├╶╶╶✦\n╵⎔› 👊 𝚻ú: ${m.text}\n╵⎔› 🤖 𝚩ᴏᴛ: ${randItem}\n├╶╶╶✦\n╵🎁 𝚸ᴜɴᴛᴏs *+${ganar} 𝚾𝚸*\n╰・୨🎍୧・─・┈・୨🍙୧・`)
                    } else {
                        User.exp = premium(m.sender) ? User.exp - 0 : items(User.exp, perder) ? User.exp - perder : 0
                        m.reply(`╭₊˚꒰ 😔 *𝚸 𝚬 𝐑 𝐃 𝚰 𝐒 𝚻 𝚬*
├╶╶╶✦\n╵⎔› 👊 𝚻ú: ${m.text}\n╵⎔› 🤖 𝚩ᴏᴛ: ${randItem}\n├╶╶╶✦\n╵📉 𝚸ᴜɴᴛᴏs *-${perder} 𝚾𝚸*\n╰・୨🎍୧・─・┈・୨🍙୧・`)
                    }
                } else { m.reply(reseqv) }
            } break

            case 'transferir': {
                if (!m.text) return m.reply(`🤓 𝚸ᴀʀᴀ ᴜᴛɪʟɪᴢᴀʀ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ ᴄᴀᴅᴀ ᴘᴀʀᴛᴇ ᴅᴇ ᴇsᴛᴇ ᴅᴇʙᴇ ᴇsᴛᴀʀ sᴇᴘᴀʀᴀᴅᴀ ᴘᴏʀ “|”. 𝚬sᴘᴇsɪғɪᴄᴀ ᴇʟ ɪᴛᴇᴍ (ᴇᴊᴇᴍᴘʟᴏ ᴄᴏɪɴ, 𝚾𝚸), ʟᴀ ᴄᴀɴᴛɪᴅᴀᴅ ʏ ᴇʟ ᴜsᴜᴀʀɪᴏ ᴅᴇ ᴅᴇsᴛɪɴᴏ. ᴛʀᴀɴsғᴇʀɪʀ <ɪᴛᴇᴍ> | <ᴄᴀɴᴛɪᴅᴀᴅ> | <ᴅᴇsᴛɪɴᴏ>\n\n📌 𝚬ᴊᴇᴍᴘʟᴏ: */ᴛʀᴀɴsғᴇʀɪʀ ᴄᴏɪɴ | 10 | @${m.sender.split`@`[0]}.*`)

                if (conn.transferencia[m.sender]) return m.reply('𝐘ᴀ ᴇsᴛᴀs ʜᴀᴄɪᴇɴᴅᴏ ᴜɴᴀ ᴛʀᴀɴsғᴇʀᴇɴᴄɪᴀ 💳')
                const [objeto, cantidad, destino] = m.text.split('|')
                if (!(objeto && cantidad && destino)) return m.reply(`🤓 𝚸ᴀʀᴀ ᴜᴛɪʟɪᴢᴀʀ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ ᴄᴀᴅᴀ ᴘᴀʀᴛᴇ ᴅᴇ ᴇsᴛᴇ ᴅᴇʙᴇ ᴇsᴛᴀʀ sᴇᴘᴀʀᴀᴅᴀ ᴘᴏʀ “|”. 𝚬sᴘᴇsɪғɪᴄᴀ ᴇʟ ɪᴛᴇᴍ (ᴇᴊᴇᴍᴘʟᴏ ᴄᴏɪɴ, 𝚾𝚸), ʟᴀ ᴄᴀɴᴛɪᴅᴀᴅ ʏ ᴇʟ ᴜsᴜᴀʀɪᴏ ᴅᴇ ᴅᴇsᴛɪɴᴏ. ᴛʀᴀɴsғᴇʀɪʀ <ɪᴛᴇᴍ> | <ᴄᴀɴᴛɪᴅᴀᴅ> | <ᴅᴇsᴛɪɴᴏ>.\n\n⎔ 𝚬ᴊᴇᴍᴘʟᴏ: */ᴛʀᴀɴsғᴇʀɪʀ ᴄᴏɪɴ | 10 |  @${m.sender.split`@`[0]}.*`)

                let UserDestino = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : destino ? (destino.replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''

                if (!(UserDestino in global.db.data.users)) return m.reply(`👤 𝚬ʟ Usᴜᴀʀɪᴏ ɴᴏ ᴇsᴛᴀ́ ᴇɴ ᴍɪ ʙᴀsᴇ ᴅᴇ ᴅᴀᴛᴏs 🤖`)

                const Cantidad = parseInt(cantidad)
                const { exp, coin } = database('users', m.sender)

                let item = false
                if (objeto == 'coin' || objeto == 'coins') {
                    if (m.isPrems && !m.isModr) return m.reply('🥇 𝐂ᴏᴍᴏ ᴜsᴜᴀʀɪᴏ ᴘʀᴇᴍɪᴜᴍ, ᴅɪsᴘᴏɴᴇs ᴅᴇ ᴜɴᴀ ᴄᴀɴᴛɪᴅᴀᴅ ɪʟɪᴍɪᴛᴀᴅᴀ ᴅᴇ 💴 ᴄᴏɪɴs. 𝐒ɪɴ ᴇᴍʙᴀʀɢᴏ, ᴅᴇʙɪᴅᴏ ᴀ ᴇsᴛᴏ ɴᴏ ᴘᴜᴇᴅᴇs ᴄᴏᴍᴘᴀʀᴛɪʀ ɴɪɴɢᴜɴᴀ ᴅᴇ ᴇsᴛᴀs 💴 ᴄᴏɪɴs')

                    if (coin < Cantidad) return m.reply('😔 𝚴ᴏ ᴛɪᴇɴᴇs sᴜғɪᴇɴᴛᴇs 💴 ᴄᴏɪɴs ᴘᴀʀᴀ ᴛʀᴀɴsғᴇʀɪʀ 💳'); item = 'coin'
                } else if (objeto == 'exp' || objeto == 'xp') { if (exp < Cantidad) return m.reply('😔 𝚴ᴏ ᴄᴜᴇɴᴛᴀs ᴄᴏɴ sᴜғɪᴇɴᴛᴇ *𝚾𝚸* ᴘᴀʀᴀ ᴛʀᴀɴsғᴇʀɪʀ 💳'); item = 'exp' }

                if (!item) return m.reply('❌ 𝚬ʟ ɪᴛᴇᴍ ᴀ ᴛʀᴀɴsғᴇʀɪʀ ɴᴏ ᴇxɪsᴛᴇ ᴇɴ ʙᴀsᴇ ᴅᴇ ᴅᴀᴛᴏs 🤖')
                const numero = UserDestino.split`@`[0]

                conn.transferencia[m.sender] = {
                    User: m.sender,
                    destino: UserDestino,
                    numero: numero,
                    object: { item: item, cantidad: Cantidad },
                    message: m.key,
                    setTimeout: setTimeout(() => (m.reply('⏰ 𝐒ᴇ ᴀᴄᴀʙᴏ́ ᴇʟ ᴛɪᴇᴍᴘᴏ, ᴛʀᴀɴsғᴇʀᴇɴᴄɪᴀ ᴄᴀɴᴄᴇʟᴀᴅᴀ ❌'), delete conn.transferencia[m.sender]), 60 * 1000)
                }

                m.reply(`🤔 ¿𝚬sᴛᴀ́ sᴇɢᴜʀᴏ ᴅᴇ ǫᴜᴇ ᴅᴇsᴇᴀ ᴛʀᴀɴsғᴇʀɪʀ *${Cantidad} ${objeto}* a  *@${UserDestino.split('@')[0]}* ?\n\n⌚ 𝚻ɪᴇɴᴇs  *𝟼𝟶* sᴇɢᴜɴᴅᴏs. 𝐂ᴏɴғɪʀᴍᴇ  ǫᴜᴇ ᴅᴇsᴇᴀ ʀᴇᴀʟɪᴢᴀʀ ʟᴀ ᴛʀᴀɴsғᴇʀᴇɴᴄɪᴀ ʀᴇᴘᴏɴᴅɪᴇɴᴅᴏ ᴄᴏɴ ᴜɴ 'sɪ'. 𝐒ɪ ɴᴏ ᴇsᴛᴀ ᴅᴇᴀᴄᴜᴇʀᴅᴏ, ᴘᴜᴇᴅᴇ ʀᴇsᴘᴏɴᴅᴇʀ ᴄᴏɴ ᴜɴ 'ɴᴏ' ᴘᴀʀᴀ ᴄᴀɴᴄᴇʟᴀʀ ᴇsᴛᴀ ᴀᴄᴄɪᴏ́ɴ`.trim())
            } break;

            case 'unreg': {
                const user = database('users', m.sender)
                if (!user.registered) return m.sms('unreg')
                if (!m.args[0]) m.reply(`*🔢 𝚰ɴɢʀᴇsᴇ sᴜ ɴᴜ́ᴍᴇʀᴏ ᴅᴇ sᴇʀɪᴇ*\n𝐕ᴇʀɪғɪǫᴜᴇ sᴜ ɴᴜ́ᴍᴇʀᴏ ᴅᴇ sᴇʀɪᴇ ᴄᴏɴ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ:\n\n*${prefix}ɴsᴇʀɪᴇ*`)
                let NumeroSerie = createHash('md5').update(m.sender).digest('hex')
                if (!(m.args[0] == NumeroSerie)) m.reply('❌ 𝚴ᴜ́ᴍᴇʀᴏ ᴅᴇ sᴇʀɪᴇ ɪɴᴄᴏʀʀᴇᴄᴛᴏ!')
                user.registered = false
                m.reply(`𝐑ᴇɢɪsᴛʀᴏ ᴇʟɪᴍɪɴᴀᴅᴏ ✅`)
            } break

            case 'nserie': case 'sn': case 'mysn': {
                const user = database('users', m.sender)
                if (!user.registered) return m.sms('unreg')
                let NumeroSerie = createHash('md5').update(m.sender).digest('hex')
                m.reply(`\n🔢 *𝐒ᴜ ɴᴜ́ᴍᴇʀᴏ ᴅᴇ sᴇʀɪᴇ ᴇs:* ${NumeroSerie}`.trim())
            } break

            case 'verify': case 'reg': case 'register': case 'registrar': {
                let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
                const user = database('users', m.sender)

                if (user.registered === true) return m.reply(`𝐘ᴀ sᴇ ᴇɴᴄᴜᴇɴᴛʀᴀ ʀᴇɢɪsᴛʀᴀᴅᴏ/ᴀ ✅\n\n🤔 ¿𝐐ᴜɪᴇʀᴇ ᴠᴏʟᴠᴇʀ ᴀ ʀᴇɢɪsᴛʀᴀʀsᴇ?\n\n𝐔sᴇ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ᴘᴀʀᴀ ᴇʟɪᴍɪɴᴀʀ sᴜ ʀᴇɢɪsᴛʀᴏ \n*${prefix}ᴜɴʀᴇɢ* <𝚴ᴜ́ᴍᴇʀᴏ ᴅᴇ sᴇʀɪᴇ>`)

                if (!Reg.test(m.text)) return m.reply(`❌ 𝟊ᴏʀᴍᴀᴛᴏ ɪɴᴄᴏʀʀᴇᴄᴛᴏ\n\n 🤓 𝐔sᴏ ᴅᴇʟ ᴄᴏᴍᴀᴍᴅᴏ: *${prefix + command} 𝚴ᴏᴍʙʀᴇ.ᴇᴅᴀᴅ*\n📌 𝚬ᴊᴇᴍᴘʟᴏ: *${prefix + command}* ${m.name}.16`)

                let [_, name, splitter, age] = m.text.match(Reg)

                if (!name) return m.reply('❌ 𝚬ʟ ɴᴏᴍʙʀᴇ ɴᴏ ᴘᴜᴇᴅᴇ ᴇsᴛᴀʀ ᴠᴀᴄɪ́ᴏ')
                if (!age) return m.reply('❌ 𝐋ᴀ ᴇᴅᴀᴅ ɴᴏ ᴘᴜᴇᴅᴇ ᴇsᴛᴀʀ ᴠᴀᴄɪ́ᴀ')
                if (name.length >= 30) return m.reply('𝚬ʟ ɴᴏᴍʙʀᴇ ᴇs ᴅᴇᴍᴀsɪᴀᴅᴏ ʟᴀʀɢᴏ')
                age = parseInt(age)
                if (age > 100) return m.reply('🤔 𝚳ᴀs ᴅᴇ 𝟷𝟶𝟶 ᴀɴ̃ᴏs, ᴅᴇ ᴠᴇʀᴅᴀᴅ? 👴')
                if (age < 5) return m.reply('🤔 𝚳ᴇɴᴏs ᴅᴇ 𝟻 ᴀɴ̃ᴏs, ᴅᴇ ᴠᴇʀᴅᴀᴅ? 👶')

                user.name = name.trim()
                user.age = age
                user.registered = true

                let NumeroSerie = createHash('md5').update(m.sender).digest('hex')

                m.reply(`╭₊˚꒰ ✅ *𝐑𝚬𝐆𝚰𝐒𝚻𝐑𝚨𝐃𝚯/𝚨*\n├╶╶╶✦\n╵👤 *𝚴ᴏᴍʙʀᴇ:* ${name}\n╵🍙 *𝚬ᴅᴀᴅ:* ${age} años\n╰ ୨🎐୧─・┈・୨🍙୧・┈・─୨🌸୧\n\n╭╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴✦\n╰₊˚꒰ 🔢 *𝚴ᴜᴍᴇʀᴏ ᴅᴇ sᴇʀɪᴇ:*  \n${NumeroSerie}\n\n*${prefix}ʜᴇʟᴘ* ᴘᴀʀᴀ ᴠᴇʀ ᴇʟ 𝚳ᴇɴᴜ`.trim())
            } break
        }
    }

    ////////////////////////RANDOM
    switch (m.command) {
        case 'info': case 'informacion': {
            let format = sizeFormatter({ std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B` })
            const used = process.memoryUsage()
            const cpus = _cpus().map(cpu => { cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0); return cpu })

            const cpu = cpus.reduce((last, cpu, _, { length }) => {
                last.total += cpu.total
                last.speed += cpu.speed / length
                last.times.user += cpu.times.user
                last.times.nice += cpu.times.nice
                last.times.sys += cpu.times.sys
                last.times.idle += cpu.times.idle
                last.times.irq += cpu.times.irq
                return last
            }, { speed: 0, total: 0, times: { user: 0, nice: 0, sys: 0, idle: 0, irq: 0 } })

            const message = m.reply('🆙 𝚯ʙᴛᴇɴɪᴇɴᴅᴏ ɪɴғᴏʀᴍᴀᴄɪᴏ́ɴ ᴅᴇʟ ʙᴏᴛ...')
            let old = performance.now(); await message
            let neww = performance.now()
            let speed = neww - old
            let uptime = timeString(process.uptime())
            var timestamp = now()
            let texto = (`╭₊˚꒰ 📜 *𝚰 𝚴 𝟊 𝚯 / 𝚩 𝚯 𝚻* 🤖
├╶╶╶✦۬${readMore}
╵ *🤖 𝚩ᴏᴛ: (activo)*
╵ *⌚ 𝚻ɪᴇᴍᴘᴏ ᴅᴇ ᴇᴊᴇᴄᴜᴄɪᴏɴ:* [ ${uptime} ]
╵ *🪀 𝚨ᴘᴏᴅᴏ ᴇɴ ᴡʜᴀᴛsᴀᴘᴘ:*
╵ ⎔ ${conn.user.name}
╵ *🤴🏻 𝐂ʀᴇᴀᴅᴏʀ:* お Onigiri-san ん⟅
╵ *💬 𝚴ᴜᴍᴇʀᴏ ᴅᴇ ᴍɪ ᴄʀᴇᴀᴅᴏʀ:*
╵ ⎔ wa.me/51907182818
╵ *⚙️ 𝐕ᴇʀsɪᴏɴ ᴅᴇʟ ʙᴏᴛ:* 3.0.1
╵ *⚡ 𝐕ᴇʟᴏᴄɪᴅᴀᴅ ᴅᴇ ᴘʀᴏᴄᴇsᴀᴍɪᴇɴᴛᴏ:*
╵  ${speed} MLS...
╵ *📡 𝐕ᴇʟᴏᴄɪᴅᴀᴅ ᴅᴇ ᴄᴏɴᴇxɪᴏɴ:*
╵  ${now() - timestamp.toFixed(4)} S...
╵ *💻 𝐑𝚨𝚳: ${format(totalmem() - freemem())} / ${format(totalmem())}*
╵ *🔮 𝚸ʟᴀᴛᴀғᴏʀᴍᴀ:* ${platform()}
╵ *👁️ 𝚩ᴀsᴇ 𝚯𝐒:* ${type()}
╵ *😶 𝚨ʀϙᴜɪᴛᴇᴄᴛᴜʀᴀ : ${arch()}*
╵ *📡 𝚮ᴏsᴛ:*
╵ ${hostname()}
╰ ୨🌸୧─・┈・୨🍙୧・┈・─୨⛩️୧

⎔ *ᴄᴏɴsᴜᴍᴏ́ ᴅᴇ ᴍᴇᴍᴏʀɪᴀ:*
${'```' + Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${format(used[key])}`).join('\n') + '```'}

⎔ ${cpus[0] ? ` *ᴜsᴏ ᴛᴏᴛᴀʟ ᴅᴇ ᴄᴘᴜ*
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}

*CPU Core(s) Usado (${cpus.length} Core CPU)*
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}`)

            await conn.sendMessage(m.chat, { text: texto, contextInfo: { externalAdReply: { title: '連 𝐑ᴇɴᴊɪ 𝚩ᴏᴛ-𝚳𝐃', body: `Activo: ${uptime} / procesamiento : ${speed} milisegundos`, thumbnail: fs.readFileSync('./multimedia/imagenes/thumbnail.jpg'), mediaType: 1, renderLargerThumbnail: true } } }, { quoted: m })
        } break
        
        case 'ping': {
  const start = Date.now();
  const responses = [
    "𝚸ᴏɴɢ! 🎆",
    "𝚸ᴏɴɢ!!! 💥",
    "𝚸ᴏɴɢ! 𝐑ᴇsᴘᴏɴᴅᴇ ᴄᴏɴ ᴜɴ ɢᴏʟᴘᴇ ᴀ 𝟷𝟼𝟶 ᴋᴍʜ 🏎️",
    "𝚸ᴏɴɢ!! 𝐋ᴏ ᴍᴀᴛᴀ ⚰️",
    "💀 𝚸ᴏɴɢ!! 𝐋ᴇ ʀᴏᴍᴘᴇ ᴇʟ ᴄʀᴀɴᴇᴏ 🏓"
  ];
  const response = responses[Math.floor(Math.random() * responses.length)];
  const end = Date.now();
  const timeTaken = (end - start) / 1000;
  const speedMessage = `⚡ Tiempo de respuesta: ${timeTaken.toFixed(2)}s`;

  await m.reply(`${response}\n${speedMessage}`);
  break;
}
        
        case 'fecha': case 'hora': {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/Lima' };
    const formattedDate = currentDate.toLocaleString('es-PE', options);
    const hour = currentDate.getHours();
    const greeting = getGreeting(hour);

    const fechaText = `📅 *𝟊 𝚬 𝐂 𝚮 𝚨  𝐘  𝚮 𝚯 𝐑 𝚨* 🕰️\n\n📆 *𝟊ᴇᴄʜᴀ:* ${formattedDate}\n👋 *𝐒ᴀʟᴜᴅᴏ:* ${greeting}`;

    await conn.sendMessage(m.chat, { text: fechaText, quoted: m });
  }
  break;

function getGreeting(hour) {
  if (hour >= 5 && hour < 12) {
    return 'Buenas tardes 🌤️';
  } else if (hour >= 12 && hour < 19) {
    return 'Buenos días ☀️';
  } else {
    return 'Buenas noches 🌙';
  }
}

        case 'menu': case 'help': case 'comandos': case '#menu': case '.menu': case '#comandos': case '#Menu': case '.Menu': case '📚': {
            const defaultMenu = () => {
                let text = Menu.split('%prefix ').join(global.prefix)
                text = text.replace('%name', `@${m.sender.split`@`[0]}`).replace('%prem', m.isPrems ? 'Si' : 'No').replace('%coin', m.isPrems ? '∞' : database('users', m.sender).coin).replace('%rol', database('users', m.sender).role)
                return text
            }

            const { path } = await overlayImages(['./multimedia/imagenes/logo.png', './multimedia/iconos/nodejs.png'], { tamano: [100, 100], localizacion: ['abajoIzquierda', 50] })

            conn.sendMessage(m.chat, { image: fs.readFileSync(path), caption: defaultMenu(), contextInfo: { mentionedJid: [...defaultMenu().matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), externalAdReply: { title: '連 𝐑ᴇɴᴊɪ 𝚩ᴏᴛ-𝚳𝐃', body: '𝚩ʏ お 𝚶ɴɪɢɪʀɪ-sᴀɴ ん⟅ 🍙', thumbnail: fs.readFileSync('./multimedia/imagenes/thumbnail.jpg'), showAdAttribution: true } }, mentions: [m.sender] }, { quoted: m }); m.react('📚')
        } break
        
        case 'creador': case 'owner': {
            await sendContactArray(conn, m.chat, [[`51907182818`, `${database('users', '51907182818@s.whatsapp.net').name || null}`, `🤴 Creador principal del bot`, null]], { key: { fromMe: false, participant: "0@s.whatsapp.net", ...(m.chat ? { remoteJid: "status@broadcast" } : {}) }, message: { contactMessage: { displayName: '連 𝐑ᴇɴᴊɪ 𝚩ᴏᴛ-𝚳𝐃 𝟸𝟺/𝟽', vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;0,;;;\nFN:0,\nitem1.TEL;waid=${m.sender.split("@")[0]}:${m.sender.split("@")[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD` } } })

            async function sendContactArray(conn, jid, data, quoted, options) {
                if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]; let contacts = []; for (let [number, name, isi, isi1] of data) {
                    number = number.replace(/[^0-9]/g, ''); let njid = number + '@s.whatsapp.net'; let biz = await conn.getBusinessProfile(njid).catch(_ => null) || {}
                    let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:${name.replace(/\n/g, '\\n')}\nitem.ORG:${isi}\nitem1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}\nitem1.X-ABLabel:${isi1}\nEND:VCARD`.trim(); contacts.push({ vcard, displayName: name })
                }; return await conn.sendMessage(jid, { contacts: { displayName: (contacts.length > 1 ? `2013 kontak` : contacts[0].displayName) || null, contacts } }, { quoted, ...options })
            }

            /*let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:Zeppt\nitem.ORG: Creador del Bot\nitem1.TEL;waid=51907182818:+51 907 182 818\nEND:VCARD`
            let a = await conn.sendMessage(m.chat, { contacts: { displayName: '連 𝐑ᴇɴᴊɪ 𝚩ᴏᴛ-𝚳𝐃', contacts: [{ vcard }] } }, { quoted: m })*/
        } break
    }

    ////////////////////////CREADOR
    switch (m.command) {
        case 'addexp': case 'addxp': case 'addcoin': {
            let who
            if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
            else who = m.chat
            if (!(who in global.db.data.users)) return m.reply(`👤 𝚬ʟ ᴜsᴜᴀʀɪᴏ ɴᴏ sᴇ ᴇɴᴄᴜᴇɴᴛʀᴀ ᴇɴ ᴍɪ ʙᴀsᴇ ᴅᴇ ᴅᴀᴛᴏs 😔`)
            if (!m.isROwner ?? !m.isOwner ?? !m.isModr) return m.sms('owner')
            if (!who) return m.reply('𝚻ᴀɢᴜᴇᴀ ᴀʟ ᴜsᴜᴀʀɪᴏ')
            let txt = m.text.replace('@' + who.split`@`[0], '').trim()

            if (m.command == 'addcoin') {
                if (!txt) return m.reply('𝚰ɴɢʀᴇsᴇ ʟᴀ ᴄᴀɴᴛɪᴅᴀᴅ ᴅᴇ *ᴄᴏɪɴs* ǫᴜᴇ ǫᴜɪᴇʀᴇ ᴀɴ̃ᴀᴅɪʀ ✨')
                if (isNaN(txt)) return m.reply('❗𝐒ᴏ́ʟᴏ ɴᴜ́ᴍᴇʀᴏs 🔢')
                let cn = parseInt(txt)
                let coins = cn
                if (coins < 1) return m.reply('😄 𝚳ɪ́ɴɪᴍᴏ ᴇs  *𝟷*')
                let users = global.db.data.users
                users[who].coin += cn
                await m.reply(`╭₊˚꒰ *💴 𝐂ᴏɪɴ 𝚨ɴ̃ᴀᴅɪᴅᴏ ✅*\n├╶╶╶✦\n╵ ⌬ *𝚻ᴏᴛᴀʟ:* ${cn}\n╰ ୨💹୧─・┈・─・┈・─୨🌸୧`)
                m.reply(`╭₊˚꒰ 👤 @${who.split`@`[0]}\n├╶╶╶✦\n╵ ⌬ *𝐑ᴇᴄɪʙɪsᴛᴇ :* +${cn} coins\n╰ ୨🎐୧─・┈・─・┈・─୨💴୧`)
            }

            if (m.command == 'addexp' || m.command == 'addxp') {
                if (!txt) return m.reply('😄 Iɴɢʀᴇsᴇ ʟᴀ ᴄᴀɴᴛɪᴅᴀᴅ ᴅᴇ *𝚾𝚸* ǫᴜᴇ ǫᴜɪᴇʀᴇ ᴀɴ̃ᴀᴅɪʀ')
                if (isNaN(txt)) return m.reply('❗𝐒ᴏ́ʟᴏ ɴᴜ́ᴍᴇʀᴏs 🔢')
                let xp = parseInt(txt)
                let exp = xp
                if (exp < 1) return m.reply('😄 𝚳ɪ́ɴɪᴍᴏ ᴇs  *𝟷*')
                let users = global.db.data.users
                users[who].exp += xp
                await m.reply(`╭₊˚꒰ *🎍 𝚾𝚸 - 𝚨ɴ̃ᴀᴅɪᴅᴏ ✅*\n├╶╶╶✦\n╵ ⌬ *𝚻ᴏᴛᴀʟ:* ${xp}\n╰ ୨🌸୧─・┈・─・┈・─୨✨୧`)
                m.reply(`╭₊˚꒰ 👤 @${who.split`@`[0]}\n├╶╶╶✦\n╵ ⌬ *𝐑ᴇᴄɪʙɪsᴛᴇ :* +${xp} 𝚾𝚸\n╰ ୨🎐୧─・┈・─・┈・─୨🍥୧`)
            }
        } break

        case 'banchat': case 'unbanchat': case 'banear': case 'desbanear': {
            if (!(m.isModr || m.isOwner || m.isROwner)) return m.sms('owner')
            const chat = (object) => m.args[0] ? m.args[0] + '' : object
            const sender = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            if (m.command == 'banchat') {
                data.chats[chat(m.chat)].isBanned = true
                m.reply('𝚨ʜᴏʀᴀ ᴇsᴛᴇ 🤖 𝚩ᴏᴛ ɴᴏ ʀᴇsᴘᴏɴᴅᴇʀᴀ́ ᴀ ʟᴏs ᴄᴏᴍᴀɴᴅᴏs ᴇɴᴠɪᴀᴅᴏs ᴀ ᴇsᴛᴇ ᴄʜᴀᴛ 💬')
            }
            if (m.command == 'unbanchat') {
                data.chats[chat(m.chat)].isBanned = false
                m.reply('𝚨ʜᴏʀᴀ ᴇsᴛᴇ 🤖 𝚩ᴏᴛ ʀᴇsᴘᴏɴᴅᴇʀᴀ́ ᴀ ʟᴏs ᴄᴏᴍᴀɴᴅᴏs ᴇɴᴠɪᴀᴅᴏs ᴀ ᴇsᴛᴇ ᴄʜᴀᴛ 💬')
            }

            if (m.command == 'banear') {
                if (data.users[chat(sender)].banned) m.reply(`👤 𝚬ʟ ᴜsᴜᴀʀɪᴏ ${sender.split`@`[0]} ʏᴀ ᴇsᴛᴜᴠᴏ ʙᴀɴᴇᴀᴅᴏ 🤣`)
                data.users[chat(sender)].banned = true
                data.users[chat(sender)].banActor = m.sender
                m.reply('𝚨ʜᴏʀᴀ ᴇʟ 🤖 𝚩ᴏᴛ ɴᴏ ʀᴇsᴘᴏɴᴅᴇʀᴀ ᴀ ɴɪɴɢᴜɴ ᴄᴏᴍᴀɴᴅᴏ ᴇɴᴠɪᴀᴅᴏ ᴘᴏʀ ᴇsᴛᴇ ᴜsᴜᴀʀɪᴏ 👤')
            }

            if (m.command == 'desbanear') {
                const creador = global.owner.find(o => o[2])?.[0] + '@s.whatsapp.net'
                if (!data.users[chat(sender)].banned) return m.reply(`👤 𝚬ʟ ᴜsᴜᴀʀɪᴏ ${sender.split`@`[0]}, ɴᴏ ᴇsᴛᴀ ʙᴀɴᴇᴀᴅᴏ`)
                if (m.sender == creador) {
                    data.users[chat(sender)].banActor = ''
                    data.users[chat(sender)].banned = false
                    m.reply('𝐔sᴜᴀʀɪᴏ ᴅᴇsʙᴀɴᴇᴀᴅᴏ ✅')
                } else {
                    if (data.users[chat(sender)].banActor.startsWith(creador)) return m.reply(`𝚬sᴛᴇ 👤 ᴜsᴜᴀʀɪᴏ ғᴜᴇ ʙᴀɴᴇᴀᴅᴏ ᴘᴏʀ ᴇʟ ᴄʀᴇᴀᴅᴏʀ ᴅᴇʟ 🤖 𝚩ᴏᴛ, ɴᴏ ᴘᴜᴇᴅᴇs ᴅᴇsʙᴀɴᴇᴀʀʟᴏ. ❌`)
                    data.users[chat(sender)].banActor = ''
                    data.users[chat(sender)].banned = false
                    m.reply('𝐔sᴜᴀʀɪᴏ ᴅᴇsʙᴀɴᴇᴀᴅᴏ ✅')
                }
            }
        } break

        case 'banlist': case 'premlist': case 'modrlist': case 'moderadorlist': case 'ownerlist': case 'rownerlist': {
            if (!m.isModr ?? !m.isOwner ?? !m.isROwner) return m.sms('owner')
            if (m.command == 'banlist') {
                let users = Object.entries(global.db.data.users).filter(user => user[1].banned)
                m.reply(`*👥 𝐔𝐒𝐔𝚨𝐑𝚰𝚯𝐒 𝚩𝚨𝚴𝚬𝐃𝚯𝐒 🚫*\n\n⌬ 𝚻ᴏᴛᴀʟ: *${users.length}*\n\n${users ? '\n' + users.map(([jid], i) => `${i + 1}. ${conn.getName(jid) == undefined ? 'Desconocido' : conn.getName(jid)}\n⌬ ${jid}`.trim()).join('\n\n') : ''}`.trim())
            }

            else if (m.command == 'premlist') {
                let users = Object.entries(global.db.data.users).filter(user => user[1].premium)
                m.reply(`*👥 𝐔𝐒𝐔𝚨𝐑𝚰𝚯𝐒 𝚸𝐑𝚬𝚳𝚰𝐔𝚳 🥇*\n\n⌬ 𝚻ᴏᴛᴀʟ: *${users.length}*\n\n${users ? '\n' + users.map(([jid], i) => `${i + 1}. ${conn.getName(jid) == undefined ? 'Desconocido' : conn.getName(jid)}\n⌬ ${jid}`.trim()).join('\n\n') : ''}`.trim())
            }

            else if (m.command == 'modrlist' || m.command == 'moderadorlist') {
                let users = Object.entries(global.db.data.users).filter(user => user[1].modr)
                m.reply(`*👥 𝚳𝚯𝐃𝚬𝐑𝚨𝐃𝚯𝐑𝚬𝐒 👑*\n\n⌬ 𝚻ᴏᴛᴀʟ: *${users.length}*\n\n${users ? '\n' + users.map(([jid], i) => `${i + 1}. ${conn.getName(jid) == undefined ? 'Desconocido' : conn.getName(jid)}\n⌬ ${jid}`.trim()).join('\n\n') : ''}`.trim())
            }

            else if (m.command == 'ownerlist') {
                let users = Object.entries(global.db.data.users).filter(user => user[1].owner)
                m.reply(`*👥 𝚯𝐖𝚴𝚬𝐑𝐒 ⭐*\n\n⌬ 𝚻ᴏᴛᴀʟ: *${users.length}*\n\n${users ? '\n' + users.map(([jid], i) => `${i + 1}. ${conn.getName(jid) == undefined ? 'Desconocido' : conn.getName(jid)}\n⌬ ${jid}`.trim()).join('\n\n') : ''}`.trim())
            }

            else if (m.command == 'rownerlist') {
                let users = Object.entries(global.db.data.users).filter(user => user[1].rowner)
                m.reply(`*👥 𝐑𝚯𝐖𝚴𝚬𝐑𝐒 🌟 ${llavec}*\n\n⌬ 𝚻ᴏᴛᴀʟ: *${users.length}*\n\n${users ? '\n' + users.map(([jid], i) => ` ${i + 1}. ${conn.getName(jid) == undefined ? 'Desconocido' : conn.getName(jid)}\n⌬ ${jid}`.trim()).join('\n\n') : ''}`.trim())
            }
        } break

        case 'addowner': case 'delowner': case 'addmodr': case 'addmoderador': case 'delmodr': case 'delmoderador': case 'addprem': case 'addpremium': case 'delprem': case 'delpremium': {
            const sender = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
            const db = global.db.data.users[sender]
            const usuario = sender.slice(0, -15)
            const textMention = `📌 𝚬ᴛɪǫᴜᴇᴛᴀ ᴏ ᴍᴇɴᴄɪᴏɴᴀ ᴀʟ ᴜsᴜᴀʀɪᴏ 👤`
            const User = `@${sender.split`@`[0]}`
            if (!(sender in global.db.data.users)) return m.reply(`👤 𝚬ʟ ᴜsᴜᴀʀɪᴏ ɴᴏ sᴇ ᴇɴᴄᴜᴇɴᴛʀᴀ ᴇɴ ᴍɪ ʙᴀsᴇ ᴅᴇ ᴅᴀᴛᴏs 😔`)

            conn.reply = (text) => { conn.sendMessage(m.chat, { text: text, mentions: [sender] }, { quoted: m }) }

            if (m.command == 'addowner') {
                if (!m.isROwner) return m.sms('owner')
                if (!isNaN(usuario && m.mentionedJid[0] && m.text)) return m.reply(textMention)
                if (db.owner) return m.reply('𝚬ʟ 👤 ᴜsᴜᴀʀɪᴏ ᴍᴇɴsɪᴏɴᴀᴅᴏ ʏᴀ ᴇs 𝚯ᴡɴᴇʀ ⭐')
                db.owner = true
                db.modr = true
                db.premium = true
                conn.reply(User + ' 🎉 𝚨ʜᴏʀᴀ ᴛᴇ ᴄᴏɴᴠɪᴇʀᴛᴇs ᴇɴ 𝚯ᴡɴᴇʀ ⭐')
            }

            else if (m.command == 'delowner') {
                if (!m.isROwner) return m.sms('owner')
                if (!isNaN(usuario && m.mentionedJid[0] && m.text)) return m.reply(textMention)
                if (!db.owner) return m.reply('𝚬ʟ 👤 ᴜsᴜᴀʀɪᴏ ᴍᴇɴsɪᴏɴᴀᴅᴏ ɴᴏ ᴇs ᴏᴡɴᴇʀ 😄')
                db.owner = false
                db.modr = false
                db.premium = false
                conn.reply(User + ' 𝐘ᴀ ɴᴏ ᴇʀᴇs 𝚯ᴡɴᴇʀ 🤣')
            }

            else if (m.command == 'addmodr' || m.command == 'addmoderador') {
                if (!m.isOwner ?? !m.isROwner) return m.sms('owner')
                if (!isNaN(usuario && m.mentionedJid[0] && m.text)) return m.reply(textMention)
                conn.reply(db.owner ? User + ' 𝚮ᴀs sɪᴅᴏ ᴅᴇɢʀᴀᴅᴀᴅᴏ ᴀ sᴏʟᴏ ᴍᴏᴅᴇʀᴀᴅᴏʀ 🤭' : User + ' ᴀʜᴏʀᴀ ᴛᴇ ᴄᴏɴᴠɪᴇʀᴛᴇs ᴇɴ ᴍᴏᴅᴇʀᴀᴅᴏʀ 👑')
                db.owner = false
                ///////
                db.modr = true
                db.premium = true
            }

            else if (m.command == 'delmodr' || m.command == 'delmoderador') {
                if (!m.isOwner ?? !m.isROwner) return m.sms('owner')
                if (!isNaN(usuario && m.mentionedJid[0] && m.text)) return m.reply(textMention)
                db.owner = false
                ///////
                db.modr = false
                db.premium = false
                conn.reply(User + ' 𝐘ᴀ ɴᴏ ᴇʀᴇs ᴍᴏᴅᴇʀᴀᴅᴏʀ 🤣')
            }

            else if (m.command == 'addprem' || m.command == 'addpremium') {
                if (!m.isModr ?? !m.isOwner ?? !m.isROwner) return m.sms('modr')
                if (!isNaN(usuario && m.mentionedJid[0] && m.text)) return m.reply(textMention)
                const text = User + ' 𝚮ᴀs sɪᴅᴏ ᴅᴇɢʀᴀᴅᴀᴅᴏ ᴀ sᴏʟᴏ ᴜsᴜᴀʀɪᴏ ᴘʀᴇᴍɪᴜᴍ 🤭'
                conn.reply(db.owner ? text : db.modr ? text : User + ' ᴀʜᴏʀᴀ ᴛᴇ ᴄᴏɴᴠɪᴇʀᴛᴇs ᴇɴ ᴜɴ ᴜsᴜᴀʀɪᴏ ᴘʀᴇᴍɪᴜᴍ 🥇')
                db.owner = false
                db.modr = false
                ///////
                db.premium = true
            }

            else if (m.command == 'delprem' || m.command == 'delpremium') {
                if (!m.isModr ?? !m.isOwner ?? !m.isROwner) return m.sms('modr')
                if (!isNaN(usuario && m.mentionedJid[0] && m.text)) return m.reply(textMention)
                db.owner = false
                db.modr = false
                ///////
                db.premium = false
                conn.reply(User + ' 𝐘ᴀ ɴᴏ ᴇʀᴇs ᴜsᴜᴀʀɪᴏ ᴘʀᴇᴍɪᴜᴍ 🤣')
            }
        } break

        default:
            if (m.budy.startsWith('=>')) {
                if (!m.isROwner) return m.sms('owner')
                function Return(sul) {
                    const sat = JSON.stringify(sul, null, 2)
                    const bang = util.format(sat)
                    if (sat == undefined) { bang = util.format(sul) }
                    return m.reply(bang)
                }
                try { m.reply(util.format(eval(`(async () => { return ${m.budy.slice(3)} })()`))) } catch (e) { m.reply(String(e)) }
            }

            if (m.budy.startsWith('>')) {
                if (!m.isROwner) return m.sms('owner')
                try {
                    let evaled = await eval(m.budy.slice(2))
                    if (typeof evaled !== 'string') evaled = util.inspect(evaled)
                    await m.reply(evaled)
                } catch (err) {
                    await m.reply(String(err))
                }
            }
            if (m.budy.startsWith('$')) {
                if (!m.isROwner) return m.sms('owner')
                exec(m.budy.slice(2), (err, stdout) => {
                    if (err) return m.reply(err)
                    if (stdout) return m.reply(stdout)
                })
            }
    }
}

async function mediafireDl(url) {
    if (!url) return;
    const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/', '')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`);
    const $ = cheerio.load(res.data);
    const link = $('#downloadButton').attr('href');
    const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').replaceAll(' ', '').replaceAll('\n', '');
    const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text();
    const size = $('#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replaceAll(' ', '');
    let mime = '';
    const rese = await axios.head(link);
    mime = rese.headers['content-type'];
    return { name, size, date, mime, link };
}

async function tts(text = 'error', lang = 'es') {
    return new Promise((resolve, reject) => { try { const tts = gtts(lang); const filePath = path.join(global.__dirname(import.meta.url), './tmp', (1 * new Date) + '.wav'); tts.save(filePath, text, () => { resolve(fs.readFileSync(filePath)); unlinkSync(filePath) }) } catch (e) { reject(e) } })
}

async function GDriveDl(url) {
    let id;
    if (!(url && url.match(/drive\.google/i))) throw 'Invalid URL';
    id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1];
    if (!id) throw 'ID Not Found';
    const res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
        method: 'post',
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            'content-length': 0,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'origin': 'https://drive.google.com',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
            'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
            'x-drive-first-party': 'DriveWebUi',
            'x-json-requested': 'true'
        }
    });
    const { fileName, sizeBytes, downloadUrl } = JSON.parse((await res.text()).slice(4));
    if (!downloadUrl) throw 'Link Download Limit!';
    const data = await fetch(downloadUrl);
    if (data.status !== 200) throw data.statusText;
    return { downloadUrl, fileName, fileSize: formatSize(sizeBytes), mimetype: data.headers.get('content-type') };
}

async function fetchJson(url, options) {
    if (!url) return;
    try {
        options ? options : {}
        const res = await axios({ method: 'GET', url: url, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36' }, ...options })
        return res.data
    } catch (err) { return err }
}

function timeString(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? ":" : ":") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    return hours + " Horas " + minutes + " Minutos"
}

let file = global.__filename(import.meta.url, true)
watchFile(file, async () => { unwatchFile(file); console.log(chalk.redBright(file + " fue actualizado correctamente ✅")) })
