import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    console.log(params.id);
    const prompt = await Prompt.findById(params.id);
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch a prompt", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  try {
    await connectToDB();
    const { prompt: text, tag } = await request.json();
    const prompt = await Prompt.findById(params.id);
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    prompt.tag = tag;
    prompt.prompt = text;
    await prompt.save();

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch a prompt", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt deleted successfully", { status: 201 });
  } catch (error) {
    return new Response("Failed to fetch a prompt", { status: 500 });
  }
};
