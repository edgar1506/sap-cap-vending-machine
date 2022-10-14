namespace my.machine;


entity Products {
    key ID    : UUID;
        name  : String;
        desc  : String;
        price : Decimal(3, 2);
        stock : Integer;
}
