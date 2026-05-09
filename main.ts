import { log } from 'console';
import { readFileSync as re, writeFileSync as wr } from 'fs';

interface Loader {
    load(filename: string, 编码表: Set<string>): void;
}

class QingyunLoader implements Loader {
    load(filename: string, 编码表: Set<string>) {
        for (const 行 of [...re('snow_qingyun.fixed.txt', 'utf-8').matchAll(/[a-z]+(?=\t)/g)].map(x => x[0]).sort((a, b) => a.localeCompare(b))) {
            编码表.add(行);
        }
    }
}

const 字母序编码表: Set<string> = new Set();
const loader = new QingyunLoader();
loader.load('', 字母序编码表);
