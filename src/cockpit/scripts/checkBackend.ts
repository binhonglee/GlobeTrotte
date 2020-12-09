import * as net from "net";

const port = 4000;
const tester = net
  .createServer()
  .once("error", function () {
    console.info(
      "Backend server seems to be up and running on :" +
        port,
    );
    process.exit(0);
  })
  .once("listening", function () {
    tester
      .once("close", function () {
        console.error(
          "Please make sure the backend server is already running with `plz work`.",
        );
        process.exit(1);
      })
      .close();
  })
  .listen(port);
