import { MongoClient, ObjectId } from "mongodb";
import SpaceInterface from '../../../types/api/SpaceInterface';
import UserInterface from '../../../types/api/UserInterface';
import SpaceUsersInterface from '../../../types/api/SpaceUsersInterface';

export default defineEventHandler(async(event) => {

    const config = useRuntimeConfig()

    const body = await readBody(event)

    const client = new MongoClient(config.mongodb_uri)

    let res: any;
    let userId: any
    let spacesId: any;
    
    try {
        // Connect to MongoDB server
        await client.connect();
        
        const database = client.db("toadcms");        
        
        const userCollection = database.collection<UserInterface>("users");
        const spaceCollection = database.collection<SpaceInterface>("space");
        const spaceUsersCollection = database.collection<SpaceUsersInterface>("spaceUsers");
        
        // Find the user by email
        const current_user = await userCollection.findOne({email: body.email });
        
        userId = current_user?._id;

        if(userId) {
            // Use aggregation pipeline to join spaceUsers, space and users collections
            const response = await spaceUsersCollection.aggregate([
                // Match documents where user_id equals userId
                { $match: { user_id: new ObjectId(userId) } },
                // Lookup documents from space collection where space_id equals _id
                { $lookup: {
                    from: "space",
                    localField: "space_id",
                    foreignField: "_id",
                    as: "space"
                }},
                // Unwind the space array
                { $unwind: "$space" },
                // Lookup documents from users collection where user_id equals _id
                { $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "users"
                }},
                // Project only the fields that you need
                { $project: {
                    _id: 0,
                    space: 1,
                    users: 1
                }}
            ]).toArray();

            res = response;
            
        }

    } catch (error) {
        console.error(error);
        // Return an error message
        return {
            message: error.message
        }
    } finally {
        // Close the connection
        await client.close();
    }

    // Return a success message with the data
    return {
      message: res
    }
})

