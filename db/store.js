const util = require('util');
const fs = require('fs');
const { promisify } = util;
const { readFile, writeFile } = fs.promises;
const { v1: uuidv1 } = require('uuid');

class Store {
    async read() {
        try {
            const jotts = await readFile('db/db.json', 'utf8');
            return JSON.parse(jotts) || [];
        } catch (err) {
            return [];
        }
    }

    async write(jotts) {
        try {
            await writeFile('db/db.json', JSON.stringify(jotts));
        } catch (err) {
            throw new Error('Failed to write jotts to file.');
        }
    }

    async getJotts() {
        const jotts = await this.read();
        return Array.isArray(jotts) ? jotts : [];
    }

    async addJott(jott) {
        const { title, text } = jott;

        if (!title || !text) {
            throw new Error('Cannot be blank!');
        }

        const newJott = { title, text, id: uuidv1() };

        const jotts = await this.getJotts();
        const updatedJotts = [...jotts, newJott];
        await this.write(updatedJotts);
        return newJott;
    }

    async removeJott(id) {
        const jotts = await this.getJotts();
        const filteredJotts = jotts.filter((jott) => jott.id !== id);
        await this.write(filteredJotts);
    }
}

module.exports = new Store();
