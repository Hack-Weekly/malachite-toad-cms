import { MongoClient, ObjectId } from "mongodb";
import UserInterface from '../../../../types/api/UserInterface';
import SpaceUsersInterface from '../../../../types/api/SpaceUsersInterface';

export default defineEventHandler(async(event) => { 

    const config = useRuntimeConfig()

    const body = await readBody(event)

    const client = new MongoClient(config.mongodb_uri)

    const database = client.db("toadcms");        

    let res: any;

    try {
        await client.connect();

        const spaceId = new ObjectId(body.spaceId)
        const userId = new ObjectId(body.userId)

        const spaceUsersCollection = database.collection<SpaceUsersInterface>("spaceUsers");
        const usersCollection = database.collection<UserInterface>("users");

        const collaborators = await spaceUsersCollection.find({space_id: spaceId}).toArray();

        const spaceUsersQuery = { space_id: spaceId, user_id: userId};

        const spaceRes = await spaceUsersCollection.deleteOne(spaceUsersQuery);

        const userIds = collaborators.map(collaborator => collaborator.user_id);

        const users = await usersCollection.find({ _id: { $in: userIds}  }).toArray();

        res = [users, collaborators];

        }
        catch (error) {
            console.error(error);
        } finally {
            await client.close();
        }

    return { res }

});