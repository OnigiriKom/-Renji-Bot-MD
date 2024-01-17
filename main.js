//by お Onigiri-san ん⟅ 51907182818

import yargs from 'yargs'
import lodash from 'lodash'
import { Low, JSONFile } from 'lowdb'
import pino from 'pino'
import NodeCache from 'node-cache'
import chalk from 'chalk'
import { join } from 'path'
import { readdirSync, unlinkSync } from 'fs'
import { Boom } from '@hapi/boom'
import readline from 'readline'
import { getBuffer, smsg } from './lib/simple.js'
import { sendCase } from './case.js'
import fs from 'fs'
import moment from 'moment-timezone'
import './config.js'

const { default: makeWAconnet, useMultiFileAuthState, PHONENUMBER_MCC, makeInMemoryStore, DisconnectReason, fetchLatestBaileysVersion, proto } = (await import('@whiskeysockets/baileys')).default
const { chain } = lodash

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`));

const __dirname = global.__dirname(import.meta.url);

global.DATABASE = global.db;
global.loadDatabase = async function loadDatabase() { if (global.db.READ) { return new Promise((resolve) => setInterval(async function () { if (!global.db.READ) { clearInterval(this); resolve(global.db.data == null ? global.loadDatabase() : global.db.data) } }, 1 * 1000)) } if (global.db.data !== null) return; global.db.READ = true; await global.db.read().catch(console.error); global.db.READ = null; global.db.data = { users: {}, chats: {}, cloud: {}, settings: {}, ...(global.db.data || {}) }; global.db.chain = chain(global.db.data) }
loadDatabase();

if (global.db) setInterval(async () => { if (global.db.data) await global.db.write() }, 20 * 1000)

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const readLine = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' })
const question = (texto) => { return new Promise((resolver) => { readLine.question(texto, (respuesta) => { resolver(respuesta.trim()) }) }) }
const isNumber = x => typeof x === 'number' && !isNaN(x)
const msgNodeCache = new NodeCache()
const Sesion = '連 Renji Sesión'

const menu = (`╭╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶✦
╵ Elija una OPCIÓN de Conexión
├╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶✦
╵⌬ 1. Código QR.
╵⌬ 2. Código de 8 digitos.
├╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶✦
╵ introduzca 1 o 2
├╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶✦`)

let connect = {}

async function StartBot() {
  const { state, saveCreds } = await useMultiFileAuthState(Sesion)
  const { version } = await fetchLatestBaileysVersion()

  if (!fs.existsSync(`./${Sesion}/creds.json`)) {
    if (!connect.opcion) { connect.opcion = false }
    console.log(chalk.greenBright(menu))
    while (!connect.opcion) {
      const m = await question(chalk.white('├') + chalk.red('─') + chalk.white('> '))
      const comando = m.trim().split(/ +/).shift().toLowerCase()
      switch (comando) {
        case '1': { connect.opcion = '1' } break
        case '2': { connect.opcion = '2' } break
        default: { console.log(`${chalk.white('╰') + chalk.red('─') + chalk.white('[ ') + chalk.greenBright('Por favor, introduce solo el número 1 o 2.') + chalk.white(' ]')}\n`) + console.log(chalk.greenBright(menu)) }
      }
    }
  }

  const connection = {
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: connect.opcion == '1' ? true : false,
    mobile: false,
    browser: connect.opcion == '1' ? ['RenjiBot-MD', 'Edge', '2.0.0'] : ['Chrome (Linux)', '', ''],
    auth: state,
    msgNodeCache,
    generateHighQualityLinkPreview: true,
    getMessage: async (key) => { if (store) { const msg = await store.loadMessage(key.remoteJid, key.id); return msg?.message || undefined } return proto.Message.fromObject({}) }
  }

  const conn = makeWAconnet(connection)
  store?.bind(conn.ev)

  if (!fs.existsSync(`./${Sesion}/creds.json`)) {
    if (!connect.opcion === '2') return
    if (conn.authState.creds.registered) return
    if (!connect.Number) { connect.Number = false }

    while (!connect.Number) {
      const Number = await question(`${chalk.white('├') + chalk.red('─') + chalk.white('[ ') + chalk.greenBright('Escriba el número de WhatsApp que será Bot') + chalk.white(' ]') + '\n'}${chalk.white('├') + chalk.red('─') + chalk.white('>')} `)
      const numero = Number.replace(/[^0-9]/g, '')
      if (numero.match(/^\d+$/) && Object.keys(PHONENUMBER_MCC).some(v => numero.startsWith(v))) { connect.Number = numero; break } else { console.log('Error') }
    }

    setTimeout(async () => {
      let phoneVinculo = await conn.requestPairingCode(connect.Number)
      const code = phoneVinculo?.match(/.{1,4}/g)?.join("-") || phoneVinculo
      console.log(`${chalk.white('╰') + chalk.red('─') + chalk.white('[ ') + chalk.greenBright('CODIGO : ' + code) + chalk.white(' ]')}\n`)
    }, 2000)
  }

  conn.ev.on('connection.update', async (update) => {
    console.log(update); const { connection, lastDisconnect } = update
    if (connection === 'close') { const shouldReconnect = lastDisconnect.error instanceof Boom && lastDisconnect.error.output?.statusCode !== DisconnectReason.loggedOut; console.log('Conexión cerrada debido a ', lastDisconnect.error, ', reconectando... ', shouldReconnect); if (shouldReconnect) { await StartBot().catch(console.error) } } else if (connection === 'open') { console.log('Conectado ✅') }
    if (global.db.data == null) loadDatabase()
  });

  conn.ev.on('creds.update', saveCreds);

  setInterval(async () => { await conn.sendMessage(global.owner.find(o => o[2])?.[0] + '@s.whatsapp.net', { document: fs.readFileSync('./database.json'), caption: '⎔ *fecha :* ' + moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('DD/MM/YY HH:mm:ss'), mimetype: 'document/json', fileName: 'database.json' }) }, 2 * 60 * 60 * 1000)

  conn.ev.on('messages.upsert', async (m) => {
    if (!m.type === 'notify') return;
    if (!m) return
    //console.log(JSON.stringify(m, undefined, 2))
    m.mek = m
    m.prefix = global.prefix
    m = m.messages[0]
    m = await smsg(conn, m, store)
    if (!m.message) return;

    if (m.key) {
      m.groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : ''
      m.groupName = m.isGroup ? m.groupMetadata.subject : ''
      m.participants = m.isGroup ? await m.groupMetadata.participants : ''
      m.groupAdmins = m.isGroup ? await m.participants.filter(v => v.admin !== null).map(v => v.id) : ''

      m.groupOwner = m.isGroup ? m.groupMetadata.owner : ''
      m.groupMembers = m.isGroup ? m.groupMetadata.participants : ''
      m.isBotAdmin = m.isGroup ? m.groupAdmins.includes(m.Bot) : false
      m.isAdmin = m.isGroup ? m.groupAdmins.includes(m.sender) : false
    }

    const creador = (global.owner.find(o => o[2])?.[0] + '@s.whatsapp.net').includes(m.sender)
    const propietario = creador || global.owner.map(owner => owner[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const moderador = propietario || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const premium = moderador || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)

    try {
      let user = global.db.data.users[m.sender]
      if (typeof user !== 'object') global.db.data.users[m.sender] = {}
      if (user) {
        if (!isNumber(user.lastmiming)) user.lastmiming = 10
        if (!isNumber(user.lastrob)) user.lastrob = 10
        if (!isNumber(user.exp)) user.exp = 0
        if (!isNumber(user.coin)) user.coin = 10
        if (!('registered' in user)) user.registered = false
        if (!user.registered) { if (!('name' in user)) user.name = m.name }
        if (!('banned' in user)) user.banned = false
        if (!('rowner' in user)) user.rowner = creador ? true : false
        if (!('owner' in user)) user.owner = propietario ? true : false
        if (!('modr' in user)) user.modr = moderador ? true : false
        if (!('premium' in user)) user.premium = premium ? true : false
        if (!('banActor' in user)) user.banActor = ''
      } else global.db.data.users[m.sender] = {
        rowner: m.Bot == m.sender ? true : creador ? true : false,
        owner: m.Bot == m.sender ? true : propietario ? true : false,
        modr: m.Bot == m.sender ? true : moderador ? true : false,
        premium: m.Bot == m.sender ? true : premium ? true : false,
        banActor: '',
        lastmiming: 0,
        lastrob: 0,
        exp: global.rpg.data.exp,
        coin: global.rpg.data.coin,
        registered: false,
        name: m.name,
        banned: false,
        role: global.rpg.data.role,
        nivel: global.rpg.data.nivel
      }

      let chat = global.db.data.chats[m.chat]
      if (typeof chat !== 'object') global.db.data.chats[m.chat] = {}
      if (chat) {
        if (!('isBanned' in chat)) chat.isBanned = false
        if (!('welcome' in chat)) chat.welcome = false
        if (!('detect' in chat)) chat.detect = true
        if (!('delete' in chat)) chat.delete = true
        if (!('antiTraba' in chat)) chat.antiTraba = true
        if (!('antiLink' in chat)) chat.antiLink = false
      } else global.db.data.chats[m.chat] = {
        commands: {
          servicio: true,
          rpg: true,
        },
        isBanned: false,
        welcome: false,
        detect: true,
        delete: true,
        antiTraba: false,
        antiLink: false,
      }

      let settings = global.db.data.settings[m.Bot]
      if (typeof settings !== 'object') global.db.data.settings[m.Bot] = {}
      if (settings) {
        if (!('objecto' in settings)) settings.objecto = {}
        if (!('autoread' in settings)) settings.autoread = false
        if (!('restrict' in settings)) settings.restrict = true
      } else global.db.data.settings[m.Bot] = {
        objecto: {},
        autoread: false,
        restrict: true
      }

      let cloud = global.db.data.cloud[m.sender]
      if (typeof cloud !== 'object') global.db.data.cloud[m.sender] = {}
      if (cloud) {
        if (!('saveFiles' in cloud)) cloud.saveFiles = []
      } else global.db.data.cloud[m.sender] = {
        saveFiles: []
      }
    } catch (e) { console.error(e) }

    m.isROwner = global.db.data.users[m.sender].rowner
    m.isOwner = global.db.data.users[m.sender].owner
    m.isModr = global.db.data.users[m.sender].modr
    m.isPrems = global.db.data.users[m.sender].premium

    m.body = (m.type(m.message) === 'conversation') ? m.message.conversation : (m.type(m.message) == 'imageMessage') ? m.message.imageMessage.caption : (m.type(m.message) == 'videoMessage') ? m.message.videoMessage.caption : (m.type(m.message) == 'extendedTextMessage') ? m.message.extendedTextMessage.text : ''

    m.budy = (typeof m.body == 'string' ? m.body : '')

    m.command = m.body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
    m.isCmd = m.body.startsWith(prefix)
    m.args = m.body.trim().split(/ +/).slice(1)
    m.text = m.args.join(" ")

    console.log('\x1b[1;31m~\x1b[1;37m>', chalk.white('['), chalk.blue(m.isCmd ? 'EJECUTANDO' : 'MENSAJE'), chalk.white(']'), chalk.green('{'), chalk.rgb(255, 131, 0).underline(m.budy), chalk.green('}'), chalk.blue(m.isCmd ? 'Por' : 'De'), chalk.cyan(m.name), 'Chat', m.isGroup ? chalk.bgGreen('grupo:' + m.groupName || m.chat) : chalk.bgRed('Privado:' + m.name || m.sender), 'Fecha', chalk.magenta(moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('DD/MM/YY HH:mm:ss')).trim())

    if (global.db.data.chats[m.chat].antiTraba) {
      if (m.isAdmin) return;
      if (m.isOwner) return;
      if (m.isROwner) return;
      if (m.Bot == m.sender) return;
      if (m.budy.length > 4000) {
        await conn.sendMessage(m.chat, { text: `╭₊˚꒰ ❌ *𝚻ʀᴀʙᴀ ᴅᴇᴛᴇᴄᴛᴀᴅᴏ*
├╶╶╶✦
╵¿𝚬ɴ sᴇʀɪᴏ? 𝚻ᴇ ᴀᴛʀᴇᴠɪsᴛᴇ ᴀ 
╵ᴇɴᴠɪᴀʀ ᴛʀᴀʙᴀs, ᴘɪᴇɴsᴀs ǫᴜᴇ 
╵ᴇ́sᴛᴏ ᴇs ᴇʟ 𝟸𝟶𝟷𝟻 🤣
╰ ୨🦠୧─・┈・୨🍙୧・┈・─୨🤖୧\n@${m.sender.split("@")[0]} 👋 𝚨ᴅɪᴏs...\n`, mentions: [m.sender] })
        conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant } })
        setTimeout(() => { conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove') }, 1000)
        conn.sendMessage(m.chat, { text: `𝚳ᴀʀϙᴜᴇ ᴇʟ ᴄʜᴀᴛ ᴄᴏᴍᴏ ʟᴇɪᴅᴏ.${('\n').repeat(200)}` })
      }
    }

    if (global.db.data.chats[m.chat].antiLink) {
      const Regex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
      const isGroupLink = Regex.exec(m.budy)
      const linkisGroup = `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}`
      if (isGroupLink) {
        if (m.isAdmin) return;
        if (m.isOwner) return;
        if (m.isROwner) return;
        if (m.Bot == m.sender) return;
        if (m.budy.includes(linkisGroup)) return;
        await conn.sendMessage(m.chat, { text: `╭₊˚꒰ ❌ *𝚬ɴʟᴀᴄᴇ ᴅᴇᴛᴇᴄᴛᴀᴅᴏ*
├╶╶╶✦
╵𝐋ᴏs ᴇɴʟᴀᴄᴇs ᴀ ᴏᴛʀᴏs ɢʀᴜᴘᴏs ᴇsᴛᴀ́ɴ 
╵ᴘʀᴏʜɪʙɪᴅᴏs ᴇɴ ᴇsᴛᴇ ɢʀᴜᴘᴏ
╰ ୨🔗୧─・┈・୨🍙୧・┈・─୨🤖୧\n@${m.sender.split("@")[0]} 👋 𝚨ᴅɪᴏs...\n`, mentions: [m.sender] })
        conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant } })
        setTimeout(() => { conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove') }, 1000)
      }
    }

    await sendCase(conn, m, store).catch(e => { m.reply(e); console.log('Error: ' + e) })
  })

  conn.ev.on("groups.update", async (json) => {
    const grupo = json[0]
    const id = grupo.id
    let detect = global.db.data.chats[grupo.id].detect
    if (!detect) return
    let text = ''
    if (!grupo.desc == '') text = ('*🧾 𝐋ᴀ ᴅᴇsᴄʀɪᴘᴄɪóɴ ᴅᴇʟ ⛩️ ɢʀᴜᴘᴏ ғᴜᴇ ᴀᴄᴛᴜᴀʟɪᴢᴀᴅᴀ ✨*\n@desc').replace('@desc', grupo.desc)
    else if (grupo.subject) text = ('*👥 𝚬ʟ ɴᴏᴍʙʀᴇ ᴅᴇʟ ⛩️ ɢʀᴜᴘᴏ ғᴜᴇ ᴀᴄᴛᴜᴀʟɪᴢᴀᴅᴏ ✨*\n@subject').replace('@subject', grupo.subject)
    else if (grupo.icon) text = ('*🖼️ 𝚰ᴍᴀɢᴇɴ ᴅᴇʟ ⛩️ ɢʀᴜᴘᴏ ᴀᴄᴛᴜᴀʟɪᴢᴀᴅᴀ ✨*').replace('@icon', grupo.icon)
    else if (grupo.revoke) text = ('*🔗 𝚬ʟ ʟɪɴᴋ ᴅᴇʟ ⛩️ ɢʀᴜᴘᴏ ғᴜᴇ ᴀᴄᴛᴜᴀʟɪᴢᴀᴅᴏ*\n@revoke').replace('@revoke', grupo.revoke)
    else if (grupo.announce == true) text = ('*⚙️ 𝐂ᴏɴғɪɢᴜʀᴀᴄɪóɴ ᴅᴇʟ ⛩️ ɢʀᴜᴘᴏ ᴄᴀᴍʙɪᴀᴅᴀ 🆕*\n¡𝚨ʜᴏʀᴀ sᴏʟᴏ ʟᴏs ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀᴇs ᴘᴜᴇᴅᴇɴ ᴇɴᴠɪᴀʀ ᴍᴇɴsᴀᴊᴇs! 💬')
    else if (grupo.announce == false) text = ('*⚙️ 𝐂ᴏɴғɪɢᴜʀᴀᴄɪóɴ ᴅᴇʟ ⛩️ ɢʀᴜᴘᴏ ᴄᴀᴍʙɪᴀᴅᴀ 🆕*\n¡𝚨ʜᴏʀᴀ ᴛᴏᴅᴏs ʟᴏs ᴘᴀʀᴛɪᴄɪᴘᴀɴᴛᴇs ᴘᴜᴇᴅᴇɴ ᴇɴᴠɪᴀʀ ᴍᴇɴsᴀᴊᴇs! 💬')
    else if (grupo.restrict == true) text = ('*⚙️ 𝐂ᴏɴғɪɢᴜʀᴀᴄɪóɴ ᴅᴇʟ ⛩️ ɢʀᴜᴘᴏ ᴄᴀᴍʙɪᴀᴅᴀ 🆕*\n📌 𝐋ᴀ ɪɴғᴏʀᴍᴀᴄɪóɴ ᴅᴇʟ ɢʀᴜᴘᴏ sᴇ ʜᴀ ʀᴇsᴛʀɪɴɢɪᴅᴏ, ¡ᴀʜᴏʀᴀ sᴏʟᴏ ʟᴏs ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀᴇs ᴘᴜᴇᴅᴇɴ ᴇᴅɪᴛᴀʀ ʟᴀ ɪɴғᴏʀᴍᴀᴄɪóɴ ᴅᴇʟ ɢʀᴜᴘᴏ 🪀')
    else if (grupo.restrict == false) text = ('*⚙️ ᴄ𝐂ᴏɴғɪɢᴜʀᴀᴄɪóɴ ᴅᴇʟ ɢʀᴜᴘᴏ ᴄᴀᴍʙɪᴀᴅᴀ 🆕*\n🔓 𝐒ᴇ ʜᴀ ᴀʙɪᴇʀᴛᴏ ʟᴀ ɪɴғᴏʀᴍᴀᴄɪóɴ ᴅᴇʟ ɢʀᴜᴘᴏ, ¡ᴀʜᴏʀᴀ ᴛᴏᴅᴏs ʟᴏs ᴘᴀʀᴛɪᴄɪᴘᴀɴᴛᴇs ᴘᴜᴇᴅᴇɴ ᴇᴅɪᴛᴀʀ ʟᴀ ɪɴғᴏʀᴍᴀᴄɪóɴ ᴅᴇʟ ɢʀᴜᴘᴏ! 🪀')
    await conn.sendMessage(id, { text: text })
  })

  conn.ev.on('group-participants.update', async (anu) => {
    const { id, participants, action } = anu
    let chat = global.db.data.chats[id] || {}
    let text = ''
    switch (action) {
      case 'add': case 'remove': {
        if (!chat.welcome) return;
        const groupMetadata = conn.groupMetadata(id)
        for (let user of participants) {
          const pp = './multimedia/imagenes/avatar.jpg'
          let UserImagen = await getBuffer(await conn.profilePictureUrl(user, 'image').catch(pp))
          let fesha = moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('DD/MM/YY HH:mm:ss')
          const welcome = '⎔ 👋 *𝚩ɪᴇɴᴠᴇɴɪᴅᴏ/ᴀ:* @user\n⎔ *📌 𝐑ᴇᴄᴜᴇʀᴅᴀ ᴄᴜᴍᴘʟɪʀ ʟᴀs ʀᴇɢʟᴀs ᴅᴇ ᴇsᴛᴇ ʜᴇʀᴍᴏsᴏ ɢʀᴜᴘᴏ. ✨*\n' + String.fromCharCode(8206).repeat(850) + '\n@desc'
            const bye = '🏎️ 𝐒ᴀʟɪó ᴅᴇʟ ɢʀᴜᴘᴏ: @user'

          text = action === 'add' ? welcome.replace('@user', '@' + user.split('@')[0]).replace('@desc', groupMetadata.desc || '📜 𝐋ᴇᴇ ʟᴀ ᴅᴇsᴄʀɪᴘᴄɪᴏ́ɴ ᴅᴇʟ ɢʀᴜᴘᴏ ʏ ᴄᴜᴍᴘʟᴇ ʟᴀs ʀᴇɢʟᴀs.') : bye.replace('@user', '@' + user.split('@')[0])

          const reply = { text: text, mentions: [user], contextInfo: { externalAdReply: { title: action === 'add' ? '📆 ғᴇᴄʜᴀ ᴅᴇ ɪɴɢʀᴇsᴏ ⬫ ' + fesha : '📆 ғᴇᴄʜᴀ ᴅᴇ sᴀʟɪᴅᴀ ⬫ ' + fesha, body: '🤖 連 𝐑ᴇɴᴊɪ 𝚩ᴏᴛ / お 𝚶ɴɪɢɪʀɪ-sᴀɴ ん⟅ 🍙', thumbnail: UserImagen, mediaType: 1, renderLargerThumbnail: true } } }

          conn.sendMessage(id, reply, { quoted: { key: { participant: "0@s.whatsapp.net", "remoteJid": "0@s.whatsapp.net" }, "message": { "groupInviteMessage": { "groupJid": "573245088667-1616169743@g.us", "inviteCode": "m", "groupName": "P", "caption": action === 'add' ? '⛩️ 𝚴ᴜᴇᴠᴏ ɪɴᴛᴇɢʀᴀɴᴛᴇ ʙɪᴇɴᴠᴇɴɪᴅᴏ! 👋' : '📉 𝚳ᴇɴᴏs ᴜɴ ᴘᴀʀᴛɪᴄɪᴘᴀɴᴛᴇ 🍙', 'jpegThumbnail': UserImagen } } } })
        }
      } break
      case 'promote': text = '@user 🛡️ 𝚨ʜᴏʀᴀ ᴇs ᴀᴅᴍɪɴ ᴅᴇʟ ɢʀᴜᴘᴏ! ⛩️'
      case 'demote': if (!text) text = '@user 😔 𝐘ᴀ ɴᴏ ᴇs ᴀᴅᴍɪɴ ᴅᴇʟ ɢʀᴜᴘᴏ ⛩️'; text = text.replace('@user', '@' + participants[0].split('@')[0]); if (chat.detect) conn.sendMessage(id, { text: text, mentions: [participants] })
        break
    }
  })
}

await StartBot()

function clearTmp() {
  const tmpDir = join(__dirname, 'tmp')
  const filenames = readdirSync(tmpDir)
  filenames.forEach(file => {
    unlinkSync(join(tmpDir, file))
  })
}

setInterval(async () => { clearTmp(); console.log(chalk.bold.cyanBright('ClearTmp')) }, 1000 * 60 * 2)
