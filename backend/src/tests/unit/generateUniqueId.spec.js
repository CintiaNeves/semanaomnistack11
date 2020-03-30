const generateUniqueId = require('../../src/utils/generateUniqueId')

describe('Generate Unique ID', () => {
    it('should generate an unique ID', () => {

        const id = generateUniqueId();

        expected(id).toHaveLenght(8);
    });
});