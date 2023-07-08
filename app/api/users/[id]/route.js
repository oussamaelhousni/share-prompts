import { connectToDB } from "@utils/database";
import User from "@models/User";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const user = await User.findById(params.id);
    console.log(user);
    if (!user) {
      return new Response("user not found", { status: 404 });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch the user", { status: 500 });
  }
};
