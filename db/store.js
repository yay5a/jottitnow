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

    getJotts() {
        return this.read().then((jotts) => {
            let parsedJotts;
            try {
                parsedJotts = [].concat(JSON.parse(jotts));
            } catch (err) {
                parsedJotts = [];
            }
            return parsedJotts;
        }
        );
    }
    addJott(jott) {
        const { title, text } = jott;

        if (!title || !text) {
            throw new Error("Jott 'title' and 'text' cannot be blank");
        }

        const newJott = { title, text, id: uuidv1() };

        return this.getjotts()
            .then((jotts) => [...jotts, newJott])
            .then((updatedJotts) => this.write(updatedJotts))
            .then(() => newJott);
    }

    async removeJott(id) {
        return this.getJotts()
            .then((jotts) => jotts.filter((jott) => jott.id !== id))
            .then((filteredJotts) => this.write(filteredJotts));
    }
}

module.exports = new Store();
