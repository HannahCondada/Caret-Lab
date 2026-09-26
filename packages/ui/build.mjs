import { copyFileSync, readFileSync, writeFileSync } from "node:fs";

copyFileSync("src/tokens.css", "dist/tokens.css");

for (const file of ["dist/index.d.ts", "dist/settings.d.ts"]) {
  const text = readFileSync(file, "utf8").replace(/import "\.\/tokens\.css";\r?\n/g, "");
  writeFileSync(file, text);
}
