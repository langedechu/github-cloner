const axios = require("axios").default;
const sjs = require("shelljs");
const path = require("node:path");
const { existsSync, mkdir } = require("node:fs");

var clonePath = path.join(__dirname, "cloned", process.argv[2]);

axios
  .get(
    `https://api.github.com/users/${process.argv[2]}/repos?${Math.floor(
      Math.random() * 100
    )}`
  )
  .then(
    /**
     * @param {
     *   {
     *     data: {
     *       name: string,
     *       description: string,
     *       private: boolean,
     *       html_url:
     *       string
     *     }[]
     *   }
     * } res
     */
    (res) => {
      res.data.forEach((repo) => {
        if (!existsSync(clonePath)) {
          mkdir(clonePath, { recursive: true }, (err) => {
            if (err) throw err;
          });
        }

        sjs.cd(clonePath);

        sjs.exec(`git clone ${repo.html_url}.git`);
      });
    }
  );
