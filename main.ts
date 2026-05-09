import { readFileSync as re, writeFileSync as wr } from 'fs';

interface Loader {
    load(filename: string, 编码表: Set<string>): void;
}

class QingyunLoader implements Loader {
    private 声母 = (x => {
        let instance: Set<string>;
        function createInstance() {
            const set: Set<string> = new Set();
            for (const 声母 of 'qwrtypsdfghjklzxcvbnm') {
                set.add(声母);
            }
            return set;
        }

        return {
            getInstance: function() {
                if (!instance) {
                    instance = createInstance();
                }
                return instance;
            }
        }
    })()
    private 应该打空格(编码: string): boolean {
        // 四码没有空格简
        if ([...编码].length === 4) return false;
        if (this.声母.getInstance().has(编码.at(-1)!)) return true;
        return false;
    }

    load(filename: string, 编码表: Set<string>) {
        for (const 行 of [...re('snow_qingyun.fixed.txt', 'utf-8').matchAll(/[a-z]+(?=\t)/g)].map(x => x[0]).sort((a, b) => a.localeCompare(b))) {
            if (this.应该打空格(行)) {
                编码表.add(行 + '_')
            } else {
                编码表.add(行);
            }
        }
    }
}

interface judgment {
    judge(编码集合: Set<string>): Set<string>[];
}

class 是否是前缀 implements judgment {
    judge(编码集合: Set<string>): Set<string>[] {
        const 左商集: Set<string> = new Set();
        const 字母序编码表列表: string[] = [...字母序编码表];
        for (let i = 0; i < 字母序编码表.size - 1; i++) {
            const 编码1 = 字母序编码表列表[i];
            const 编码2 = 字母序编码表列表[i + 1];
            const 编码1长度 = [...编码1].length;
            const 编码2数组 = [...编码2];
            if (编码2数组.slice(0, 编码1长度).join('') === 编码1 && 编码1长度 < 编码2数组.length) {
                console.log(`${编码1} 是 ${编码2} 的左商`);
                左商集.add(编码2数组.slice(编码1长度).join(''));
            }
        }
        return [左商集];
    }
}

const 字母序编码表: Set<string> = new Set();
const loader = new QingyunLoader();
loader.load('', 字母序编码表);
const 判断 = new 是否是前缀();
const 左商集 = 判断.judge(字母序编码表);

// 为前缀码专门写的打印逻辑

if (左商集[0].size === 0) {
    console.log('该输入方案是前缀码');
} else {
    console.log(`该输入方案不是前缀码，左商有：${左商集[0].size} 个，分别为：\n`
        + [...左商集[0]].join('\n'));
}
