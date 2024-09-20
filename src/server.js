import app from './app';

const port = process.env.API_PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`CTRL + Click em http://localhost:${port}`);
});

