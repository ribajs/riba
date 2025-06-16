import { optimize } from "svgo";
import path from "path";
import { promises as fs } from "fs";
import { glob } from "glob";
import sharp from "sharp";

const svgSourceGlob = "src/svg/*.svg";
const distSvgDir = "dist/svg";
const distPngDir = "dist/png";
const distDir = "dist";

async function clean() {
  await fs.rm(distDir, { recursive: true, force: true });
  await fs.mkdir(distSvgDir, { recursive: true });
  await fs.mkdir(distPngDir, { recursive: true });
}

async function buildSvg() {
  const svgFiles = await glob(svgSourceGlob);
  const iconNames = [];

  for (const file of svgFiles) {
    const name = path.basename(file, ".svg");
    iconNames.push(name);
    const svgString = await fs.readFile(file, "utf8");
    const result = optimize(svgString, {
      path: file,
      plugins: [
        { name: "preset-default" },
        { name: "removeDimensions" },
        {
          name: "addAttributesToSVGElement",
          params: {
            attributes: [
              {
                class: `iconset-${name}`,
              },
            ],
          },
        },
      ],
    });
    const destPath = path.join(distSvgDir, path.basename(file));
    await fs.writeFile(destPath, result.data);
  }
  return iconNames.sort();
}

async function createSvgFilelist(iconNames) {
  await fs.writeFile(
    path.join(distDir, "svg.json"),
    JSON.stringify(iconNames, null, 2)
  );
}

async function buildPngs() {
  const svgFiles = await glob(svgSourceGlob);
  const sizes = [8, 16, 32, 64, 128, 256];
  const pngFiles = [];

  const promises = svgFiles.flatMap((file) => {
    const basename = path.basename(file, ".svg");
    return sizes.map(async (size) => {
      const outFileName = `${basename}_${size}.png`;
      const outPath = path.join(distPngDir, outFileName);
      pngFiles.push(outFileName.replace(".png", ""));
      try {
        await sharp(file).resize(size, size).png().toFile(outPath);
      } catch (error) {
        console.error(
          `Error generating PNG for ${file} with size ${size}.`,
          error
        );
      }
    });
  });

  await Promise.all(promises);
  return pngFiles.sort();
}

async function createPngFilelist(pngFiles) {
  await fs.writeFile(
    path.join(distDir, "png.json"),
    JSON.stringify(pngFiles, null, 2)
  );
}

async function main() {
  try {
    console.log("Starting iconset build...");
    await clean();
    console.log("Cleaned dist directory.");

    // SVG
    const svgIconNames = await buildSvg();
    await createSvgFilelist(svgIconNames);
    console.log("✔ SVG icons built and filelist created.");

    // PNG
    const pngFileNames = await buildPngs();
    await createPngFilelist(pngFileNames);
    console.log("✔ PNG icons built and filelist created.");
    console.log("Iconset build finished successfully!");
  } catch (error) {
    console.error("Iconset build failed:", error);
    process.exit(1);
  }
}

main(); 