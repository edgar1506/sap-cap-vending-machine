const cds = require('@sap/cds/lib');
const { GET, POST, PATCH, axios, expect } = cds.test(__dirname + '/..');
axios.defaults.headers['content-type'] = 'application/json';

beforeAll(async () => {
    const db = await cds.connect.to('db');
    // const { Products } = db.model.entities('my.machine');
});

describe("Products API", () => {

    describe("Products GET api", () => {
        it("should return an object with 'value' property", async () => {
            const { data, status } = await GET('/customer/Products');
            expect(status).to.equal(200);
            expect(data).to.have.own.property("value");
        });

        test("'value' property should be an array with 2 values", async () => {
            const { data, status } = await GET('/customer/Products');
            expect(status).to.equal(200);
            expect(Array.isArray(data.value)).to.be.true;
            expect(data.value.length).to.equal(2);
        });

        it("should not return managed attributes", async () => {
            const { data, status } = await GET('/customer/Products');
            expect(status).to.equal(200);
            expect(data).to.have.own.property("value");
            expect(data.value[0]).to.not.have.own.property('createdAt');
            expect(data.value[0]).to.not.have.own.property('createdBy');
            expect(data.value[0]).to.not.have.own.property('modifiedAt');
            expect(data.value[0]).to.not.have.own.property('modifiedBy');
        });
    });

    describe("Products POST api", () => {
        it("should not allow to post data as it's read-only", async () => {
            let customProduct = {
                "name": "Custom Product",
                "desc": "Custom product description",
                "price": 1.23,
                "stock": 5
            };

            await expect(POST`/customer/Products ${customProduct}`).to.be.rejectedWith(/CustomerService\.Products.*is read-only/);
        });
    });

});
