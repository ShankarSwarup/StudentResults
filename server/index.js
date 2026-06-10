const config = require('./src/config/config');
const connectDB = require('./src/config/db');
const app = require('./src/app');

// Connect to Database
connectDB();

const PORT = config.port;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`Express server is running on port ${PORT}`);
});