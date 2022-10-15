const cds = require('@sap/cds/lib');
const { GET, POST, PATCH, axios, expect } = cds.test(__dirname + '/..');
axios.defaults.headers['content-type'] = 'application/json';

describe('Basic OData', () => {

    it('serves $metadata documents in v4', async () => {
        const { headers, status, data } = await GET`/customer/$metadata`
        expect(status).to.equal(200)
        expect(headers).to.contain({
            'content-type': 'application/xml',
            'odata-version': '4.0',
        });
    })
});