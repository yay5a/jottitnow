const util = require('util');
const fs = require('fs');

const uuidv1 = require('uuid/v1');

const rFileAsync = util.promisify(fs.readFile);
const wFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return rFileAsync('db/db.json', 'utf8');
    }

    write(jott) {
        return wFileAsync('db/db.json', JSON.stringify(jott));
    }

    async getJotts() {
        const jotts = await this.read();
        let parsedJotts;
        try {
            parsedJotts = [].concat(JSON.parse(jotts));
        } catch (err) {
            parsedJotts = [];
        }
        return parsedJotts;
    }
    async addJott(jott) {
        const { title, text } = jott;

        if (!title || !text) {
            throw new Error("Cannot be blank!");
        }

        const newJott = { title, text, id: uuidv1() };

        const jotts = await this.getJotts();
        const updatedJotts = [...jotts, newJott];
        await this.write(updatedJotts);
        return newJott;
    }

    async removeJott(id) {
        return this.getJotts()
            .then((jotts) => jotts.filter((jott) => jott.id !== id))
            .then((filteredJotts) => this.write(filteredJotts));
    }
}

module.exports = new Store();
