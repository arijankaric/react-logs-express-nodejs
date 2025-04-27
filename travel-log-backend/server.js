const app = require('./app');
// const returnVal = require('dotenv').config();
// console.log(returnVal);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});