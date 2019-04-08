
const expect = require('chai').expect;
const util = require('util');
const exec = util.promisify(require('child_process').exec);

describe('Class CLI in index-cli', () => {

    it('should output fitter started', async () => {

        const { stdout, stderr } = await exec('fitter');

        console.log(stderr);
        expect(stdout).to.equal(
            'fitter started.\n'
        )
    });
});
/*
describe('The Application', () => {
    it('should print the correct output', async () => {

        app.getBlueprints()
            .then((data) => {
                expect(data).to.equal(

                );
            });
    });
});
*/