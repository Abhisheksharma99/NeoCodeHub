import fs from "fs";
import path from "path";

const SOURCE_DIR = path.join(process.cwd(), "src/data");
const isVercel = !!process.env.VERCEL;
const TMP_DIR = "/tmp/neocodehub-data";

/**
 * On Vercel, the filesystem is read-only except /tmp.
 * We copy source data files to /tmp on first access,
 * then read/write from /tmp.
 */
function getDataDir(): string {
  if (!isVercel) return SOURCE_DIR;

  // Ensure /tmp data dir exists
  if (!fs.existsSync(TMP_DIR)) {
    fs.mkdirSync(TMP_DIR, { recursive: true });
  }

  return TMP_DIR;
}

function ensureFileInTmp(filename: string): void {
  if (!isVercel) return;

  const tmpPath = path.join(TMP_DIR, filename);
  const srcPath = path.join(SOURCE_DIR, filename);

  // Only copy if not already in /tmp
  if (!fs.existsSync(tmpPath) && fs.existsSync(srcPath)) {
    if (!fs.existsSync(TMP_DIR)) {
      fs.mkdirSync(TMP_DIR, { recursive: true });
    }
    fs.copyFileSync(srcPath, tmpPath);
  }
}

export function readData<T>(filename: string): T {
  ensureFileInTmp(filename);
  const dataDir = getDataDir();
  const filePath = path.join(dataDir, filename);
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

export function writeData<T>(filename: string, data: T): void {
  ensureFileInTmp(filename);
  const dataDir = getDataDir();
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
