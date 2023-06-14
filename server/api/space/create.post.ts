import { MongoClient } from "mongodb";
import SpaceInterface from '../../../types/api/SpaceInterface';
import UserInterface from '../../../types/api/UserInterface';
import SpaceUsersInterface from '../../../types/api/SpaceUsersInterface';

import { generateApiKey } from 'generate-api-key';


export default defineEventHandler(async(event) => {

    const config = useRuntimeConfig()

    const body = await readBody(event)

    const client = new MongoClient(config.mongodb_uri)

    const database = client.db("toadcms");        
    
    let res: any;
    let spaceId: any;
    let userId: any

    try {
        const uniquePrefix = Date.now().toString();
        // Generate a unique API key with a prefix so it's always unique
        const key = generateApiKey({ method: 'base62', prefix: uniquePrefix });
        const collection = database.collection<SpaceInterface>("space");

        const result = await collection.insertOne({
            name: body.space_name,
            slug: body.space_slug,
            api_key: key,
            created_at: new Date(),
            updated_at: new Date()
        });
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        spaceId = result.insertedId;

    } catch (error) {

    }

    try {
        const userCollection = database.collection<UserInterface>("users");
        const result = await userCollection.findOne({email: body.email });
        
        userId = result._id;

        const spaceUsersCollection = database.collection<SpaceUsersInterface>("spaceUsers");

        const response = await spaceUsersCollection.insertOne({
            space_id: spaceId,
            user_id: userId,
            role: 'admin'
        });

        res = response;


    } catch (error) {
        console.error(error);
    }


    return {
      message: res,
      body: body
    }
})
