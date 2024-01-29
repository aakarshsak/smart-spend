import { createLogger, format, transports, addColors } from "winston";

const customColors = {
  info: "blue",
  error: "red",
  http: "green",
  debug: "yellow",
};

// Adding the custom colors to Winston
addColors(customColors);

const logger = createLogger({
  level: "http",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    // format.errors({ stack: true }),
    format.printf((info) => {
      let colorizer = format.colorize();
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
        info.level = colorizer.colorize("info", "info");
        info.message = colorizer.colorize("info", info.message);
      }

      return `${info.timestamp} ${info.level}: ${info.message}`;
    })
  ),
  transports: [new transports.Console()],
});

export default logger;
