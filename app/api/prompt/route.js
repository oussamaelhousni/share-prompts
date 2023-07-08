import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";
export const GET = async (req) => {
  try {
    await connectToDB();
    const posts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to get posts", { status: 500 });
  }
};
