import { Owner } from './owner'

export class Company {
    id:        number;   
    name:      string;
    address:   string;
    city:      string;
    country:   string;
    email:     string;
    phone:     string;
    owners:    Owner[];
}