const cds = require('@sap/cds/lib');
const utils = require("./helpers/utils");
const { GET, POST, PATCH, axios, expect } = cds.test(__dirname + '/..');
axios.defaults.headers['content-type'] = 'application/json';

beforeAll(async () => {
    const db = await cds.connect.to('db');
    const { Products } = db.model.entities('my.machine');
    console.log("Is products undefined? ", Products);
});

describe('Basic OData', () => {

    it('serves $metadata documents in v4', async () => {
        const { headers, status, data } = await GET`/customer/$metadata`;
        expect(status).to.equal(200)
        expect(headers).to.contain({
            'content-type': 'application/xml',
            'odata-version': '4.0',
        });
    });

    it('exposes required entities', async () => {
        const { data } = await GET`/customer/$metadata`;
        let entities = utils.getEntitiesFromManifest(data);
        let requiredEntities = ["Products"]
        expect(entities.sort()).to.eql(requiredEntities.sort());
    });
});