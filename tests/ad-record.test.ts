import {AdRecord} from "../records/ad.record";

const defaultValues = {
    name: 'Test Name',
    description: 'blah',
    url: 'https://megak.pl',
    price:0,
    lat:9,
    lon: 9
}

test('can build AdRecord', () => {
    const ad = new AdRecord(defaultValues);

    expect(ad.name).toBe('Test Name');
    expect(ad.description).toBe('blah');
})

test('Invalid price', () => {


    expect( () =>  new AdRecord({
        ...defaultValues,
        price: -3
    })).toThrow('Cena musi być więksaz niż 0 i mniejsza niż 9999999')
})

// @TODO: Check all the validations