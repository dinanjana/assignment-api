const winston = require('winston');
const errorLogFile = 'logs/error.log';
const combinedLogFile = 'logs/combined.log';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: errorLogFile, level: 'error' }),
        new winston.transports.File({ filename: combinedLogFile }),
    ],
});

module.exports = {
  logger,
};