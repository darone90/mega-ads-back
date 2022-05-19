import {AdRecord} from '../records/ad.record';
import {pool} from "../utils/db";

let testId: string;

const defaultValues = {
    name: 'Test Name',
    description: 'blah',
    url: 'https://megak.pl',
    price:0,
    lat:9,
    lon: 9
}

test('Adding record to database', async () => {
    const ad = new AdRecord(defaultValues);
    testId = await ad.save();

    expect(testId).toMatch(/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/);
})



test('AdRecord returns data from database for one entry', async () => {
    const ad = await AdRecord.getOne(testId);

    expect(ad).toBeDefined();
    expect(ad.name).toEqual('Test Name');
    expect(ad.description).toEqual('blah');
    expect(ad.price).toEqual(0);
    expect(ad.lat).toEqual(9);
    expect(ad.lon).toEqual(9);
})

test('AdRecord returns array of found entries', async () => {
    const ads = await AdRecord.findAll('');

    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
    expect(ads[0].id).toMatch(/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/);

});

test('AdRecord returns array of found entries when searching "a"', async () => {
    const ads = await AdRecord.findAll('a');

    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
    expect(ads[0].id).toMatch(/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/);
})

test('AdRecord returns empty array  when searching something that not exist', async () => {
    const ads = await AdRecord.findAll('--------------------');

    expect(ads).toEqual([]);
})

test('AdRecord returns null for unexisting record', async () => {

    const ad = await AdRecord.getOne('xxx');

    expect(ad).toBeNull();
})

test('Deleting record from database', async () => {
    await AdRecord.remove(testId);
    const adAfterRemove = await AdRecord.getOne(testId);

    expect(adAfterRemove).toBeNull();
})

afterAll(async () => {
    await pool.end()
})