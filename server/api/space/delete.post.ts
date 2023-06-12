import { MongoClient, ObjectId } from "mongodb";
import SpaceInterface from '../../../types/api/SpaceInterface';
import SpaceUsersInterface from '../../../types/api/SpaceUsersInterface';

export default defineEventHandler(async(event) => { 

    const config = useRuntimeConfig()

    const body = await readBody(event)

    const client = new MongoClient(config.mongodb_uri)

    const database = client.db("toadcms");        

    let res: any;

    try {
        await client.connect();

        const spaceId  = new ObjectId(body.space_id)

        const spaceCollection = database.collection("space");
        const spaceUsersCollection = database.collection("spaceUsers");

        const spaceQuery = { _id: spaceId};
        const spaceUsersQuery = { space_id: spaceId};

        const spaceRes = await spaceCollection.deleteOne(spaceQuery);
        const spaceUsersRes = await spaceUsersCollection.deleteMany(spaceUsersQuery);

        res = [spaceRes.deletedCount, spaceUsersRes.deletedCount];

        }
        catch (error) {
            console.error(error);
        } finally {
            await client.close();
        }

    return { res }

});