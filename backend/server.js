const express = require('express');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 8712;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(helmet())

// Routers
const authRouters = require('./authRouters');
app.use('/api/auth', authRouters)

app.listen(PORT, () => {
  console.log(`Server is now listening on port ${PORT}`)
})