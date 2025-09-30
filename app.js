// app.js
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const express = require('express')
const cors = require('cors')

const app = express()
const dbConnect = require('./config/mongo')
const attributeController = require('./controllers/attributes')

const {
  PORT = 5000,
  SERVE_PATH = 'public',
} = process.env

// --- Core middleware ---
app.use(cors())
app.use(express.json())

// --- API routes FIRST ---
const routes = require('./routes')
app.use('/api', routes)

// Simple health endpoint (useful for Postman / uptime checks)
app.get('/api/health', (req, res) => res.json({ ok: true }))

// --- Static frontend (optional) ---
const staticDir = path.join(__dirname, SERVE_PATH)
const hasIndexHtml = fs.existsSync(path.join(staticDir, 'index.html'))
const hasStaticDir = fs.existsSync(staticDir)

if (hasStaticDir) {
  app.use(express.static(staticDir))
}

// SPA catch-all ONLY for non-API paths, and only if index.html exists
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next() // don't hijack API calls
  if (hasIndexHtml) {
    return res.sendFile(path.join(staticDir, 'index.html'))
  }
  // If you aren't serving a frontend, fall through (Express 404)
  return next()
})

// --- Start server & connect DB ---
app.listen(PORT, async () => {
  // Banner + boot logs
  try {
    const banner = fs.readFileSync('./assets/banner.txt').toString('utf-8')
    console.log(banner)
  } catch (_) { /* ignore missing banner */ }

  console.log(`\nRunning app on: http://localhost:${PORT}`)

  try {
    await dbConnect()
    console.log('Database connected!')
  } catch (error) {
    console.error('Database connection error', error)
  }

  console.log('\nServer started!\n')

  // Seed/bootstrap attributes after DB is up
  try {
    await attributeController.bootstrap()
  } catch (err) {
    console.error('Attribute bootstrap failed:', err?.message || err)
  }
})

module.exports = app
