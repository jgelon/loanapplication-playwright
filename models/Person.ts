import { faker } from '@faker-js/faker';

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

export enum MaritalStatus {
    SINGLE = "SINGLE",
    MARRIED = "MARRIED",
    REGISTERED_PARTNERS = "REGISTERED_PARTNERS",
    LIVING_TOGETHER = "LIVING_TOGETHER"   
}

export enum IncomeType {
    TEMPORARY_CONTRACT = "TEMPORARY_CONTRACT",
    PERMANENT_CONTRACT= "PERMANENT_CONTRACT",
    SELF_EMPLOYED = "SELF_EMPLOYED",
    NO_INCOME = "NO_INCOME"
}

export type Person = {
    gender: Gender,
    firstname: string,
    lastname: string,
    dob: Date,
    address: string,
    zipcode: string,
    city: string,
    maritalstatus: MaritalStatus,
    income: number,
    incometype: IncomeType
}

export function createRandomPerson() : Person {
    const person : Person = {
        gender: faker.helpers.arrayElement(Object.values(Gender)) as Gender,
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        dob: faker.date.birthdate(),
        address: faker.location.streetAddress(),
        zipcode: faker.location.zipCode(),
        city: faker.location.city(),
        maritalstatus: faker.helpers.arrayElement(Object.values(MaritalStatus)) as MaritalStatus,
        income: faker.number.int({min: 10000, max: 500000}),
        incometype: faker.helpers.arrayElement(Object.values(IncomeType)) as IncomeType

    }
    return person
}
