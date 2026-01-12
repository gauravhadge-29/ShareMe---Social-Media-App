const path = require('path')
const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000
const distDir = path.join(__dirname, 'dist')

// Serve static assets from dist
app.use(express.static(distDir, {
  maxAge: '1h',
}))

// SPA fallback: send index.html for all non-file routes
app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`ShareMe frontend server running on port ${PORT}`)
})
