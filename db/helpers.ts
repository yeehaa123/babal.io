import { readdir, readFile } from 'fs/promises'
import { parse } from 'yaml';

export async function readDir<T>(dirName: string) {
  const dir = await readdir(dirName);
  const output: T[] = [];
  for await (const entry of dir) {
    const item = await readFile(`${dirName}/${entry}`, 'utf8');
    output.push(parse(item));
  }
  return output;
}
