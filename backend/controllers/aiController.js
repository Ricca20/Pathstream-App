import OpenAI from 'openai';
import Course from '../models/Course.js';
import dotenv from 'dotenv';

dotenv.config();

export const getCourseRecommendations = async (req, res) => {
    const { prompt } = req.body;

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ message: "Server configuration error: OpenAI API Key missing." });
    }

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    if (!prompt) {
        return res.status(400).json({ message: "Prompt is required" });
    }

    try {
        const courses = await Course.find({}, 'title description category level price _id');

        const courseContext = courses.map(c =>
            `- ${c.title} (ID: ${c._id}): ${c.description}. Category: ${c.category}, Level: ${c.level}`
        ).join('\n');

        const systemMessage = `
            You are a helpful academic counselor for an online learning platform called PathStream.
            Your goal is to recommend courses to students based on their interests and goals.
            
            Here is the list of available courses:
            ${courseContext}
            
            When a user asks for recommendations, analyze their request and suggest the most relevant courses from the list above.
            
            Return your response in the following JSON format ONLY, do not add any markdown formatting or extra text outside the JSON:
            {
                "message": "A friendly personalized message explaining why these courses are a good fit.",
                "recommendedCourseIds": ["ID1", "ID2"]
            }
            
            If no courses match relevantly, suggest general advice but still try to return the closest matches if possible, or an empty list for IDs.
        `;

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemMessage },
                { role: "user", content: prompt }
            ],
            model: "gpt-3.5-turbo",
            response_format: { type: "json_object" },
        });

        const aiResponse = JSON.parse(completion.choices[0].message.content);

        const recommendedCourses = courses.filter(course =>
            aiResponse.recommendedCourseIds.includes(course._id.toString())
        );

        res.json({
            message: aiResponse.message,
            recommendations: recommendedCourses
        });

    } catch (error) {
        res.status(500).json({ message: "Failed to generate recommendations. Please check your API key or try again later." });
    }
};
