import express from 'express'


const app = express();

app.get('/users', (req, res) => {
  res.json({ id: 32, name: "Gilmar Cintra", email: "teste@gmail.com", password: "lkkljdksjkdj545454kjds", created: "1999-12-31T23:59:59Z", updated: "1999-12-31T23:59:59Z", active: true });
})

export default app;