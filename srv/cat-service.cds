using my.machine as my from '../db/data-model';

service CustomerService {
    @readonly
    entity Products as projection on my.Products excluding {
        createdAt,
        createdBy,
        modifiedAt,
        modifiedBy
    };
}
