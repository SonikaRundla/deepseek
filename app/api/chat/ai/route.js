export const maxDuration = 60; 
import OpenAI from "openai";
import { Chat } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Chat from "@/model/Chat";
import connectDB from "@/config/db";

//initialize open ai client with deepseek Api key and bae url
const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(req){
    try{
        const {userId} = getAuth(req)
        const{ chatId, prompt } = await req.json();
        if(!userId){
            return NextResponse.json({
                success: false,
                message: "User not authentiated",
            });

    //find the chat document in the daatbase based on userId and chatid
    await connectDB()
          const data = await Chat.findOne({userId, _id:chatId})

          //create a user message object
          const userPrompt = {
            role: "user",
            content: prompt,
            timestempt: Date.now()
          };
          data.messages.push(userPrompt);

          //call the deepseek apt to get a chat completion
            const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "deepseek-chat",
  });
        const message
        } catch (error) {

        }
    }
}
