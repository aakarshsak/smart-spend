import { createLogger, format, transports, addColors } from "winston";
import "dotenv/config";

const customColors = {
  info: "blue",
  error: "red",
  http: "green",
  debug: "yellow",
};

const customLevels = {
  error: 0,
  info: 1,
  debug: 2,
};

// Adding the custom colors to Winston
addColors(customColors);
console.log(process.env);
const logger = createLogger({
  levels: customLevels,
  level: process.env.LOG_LEVEL || "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    // format.errors({ stack: true }),
    format.printf((info) => {
      let colorizer = format.colorize();
      info.timestamp = colorizer.colorize("debug", info.timestamp);
      if (
        info.httpStatusCode &&
        info.httpStatusCode >= 200 &&
        info.httpStatusCode <= 299
      ) {
        info.level = colorizer.colorize("http", "HTTP");
        info.message = colorizer.colorize("http", info.message);
      } else if (info.httpStatusCode) {
        info.level = colorizer.colorize("error", "HTTP");
        info.message = colorizer.colorize("error", info.message);
      } else if (info.level === "error") {
        info.level = colorizer.colorize("error", "ERROR");
        info.message = colorizer.colorize("error", info.message);
      } else if (info.level === "debug") {
        info.level = colorizer.colorize("debug", "DEBUG");
        info.message = colorizer.colorize("debug", info.message);
      } else if (info.level === "info") {
        info.level = colorizer.colorize("info", "INFO");
        info.message = colorizer.colorize("info", info.message);
      }

      return `${info.timestamp} ${info.level}: ${info.message}`;
    })
  ),
  transports: [new transports.Console()],
});

export default logger;
