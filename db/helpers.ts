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

export function shuffle([...arr]) {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};
