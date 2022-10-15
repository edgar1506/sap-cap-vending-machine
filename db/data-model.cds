namespace my.machine;

using {managed} from '@sap/cds/common';

entity Products : managed {
    key ID    : UUID;
        name  : String;
        desc  : String;
        price : Decimal(3, 2);
        stock : Integer;
}
