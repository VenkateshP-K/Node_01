const express = require('express'); 
const fs = require('fs'); 
const { DateTime } = require('luxon');

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/createfile', (req, res) => {
  try {
    const timeStamp = DateTime.now().toFormat('yyyy-MM-dd_HH-mm-ss');
    const fileName = `./content/${timeStamp}.txt`; 

    fs.writeFile(fileName, timeStamp, (err) => {
      if (err) {
        console.error('Error creating file:', err);
        res.status(500).send('Error creating file');
      } else {
        console.log('File created:', fileName);
        res.status(200).send('File created');
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error');
  }
});
app.get('/', (req, res) => {
  res.send('Hello, Render!'); 
});
app.use(express.static('public'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});