const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const graphqlRoutes = require('./graphql/routes');
 
const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/graphgl'
app.use('/graphgl', graphqlRoutes);

// For any request that doesn't match one above,
// send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(PORT, () => console.log(`Server is running on localhost: ${PORT}`));
