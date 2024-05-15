import type { CheckpointsDBResult } from '@/types';
import { readdir, readFile, writeFile } from 'fs/promises'
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

export type LLMCache = Map<string, CheckpointsDBResult & { summary: string | null }>;

export function writeCache(cache: LLMCache) {
  const cacheData = Object.fromEntries(cache);
  writeFile('checkpoints.cache', JSON.stringify(cacheData, null, 2)).then(() => {
  })
}

export async function readCache(): Promise<LLMCache | void> {
  return readFile('checkpoints.cache', 'utf8').then((f) => {
    const cacheData = JSON.parse(f);
    return new Map(Object.entries(cacheData)) as LLMCache
  }).catch(() => console.log('initializing'));
}
