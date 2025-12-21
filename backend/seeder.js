import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Course from './models/Course.js';

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Course.deleteMany();
        await User.deleteMany();
        console.log('Data cleared...');

        // Create Instructors
        const salt = await bcrypt.genSalt(10);
        const passwordInstructor1 = await bcrypt.hash('instructor1', salt);
        const passwordInstructor2 = await bcrypt.hash('instructor', salt);

        const instructors = await User.insertMany([
            {
                name: 'Instructor One',
                email: 'instructor1@gmail.com',
                password: passwordInstructor1,
                role: 'instructor'
            },
            {
                name: 'Instructor Two',
                email: 'instructor@gmail.com',
                password: passwordInstructor2,
                role: 'instructor'
            }
        ]);

        console.log('Instructors created...');

        const instructor1 = instructors[0]._id;
        const instructor2 = instructors[1]._id;

        // Create Courses
        const courses = [
            // Instructor 1 Courses
            {
                title: 'Complete React Guide',
                description: 'Master React.js from scratch. Learn hooks, router, and redux.',
                price: 49.99,
                category: 'Web Development',
                level: 'Beginner',
                duration: '20h',
                instructor: instructor1,
                modules: [
                    { title: 'Introduction to React', description: 'Basics of React', duration: '2h' },
                    { title: 'Components and Props', description: 'Building reusable UI', duration: '3h' },
                    { title: 'State Management', description: 'Hooks and Context', duration: '5h' }
                ]
            },
            {
                title: 'Advanced Node.js',
                description: 'Deep dive into Node.js, streams, buffers, and performance.',
                price: 59.99,
                category: 'Backend',
                level: 'Advanced',
                duration: '15h',
                instructor: instructor1,
                modules: [
                    { title: 'Event Loop', description: 'Understanding Node internals', duration: '3h' },
                    { title: 'Streams', description: 'Processing large data', duration: '4h' }
                ]
            },
            {
                title: 'Python for Data Science',
                description: 'Learn Python libraries like Pandas, NumPy, and Matplotlib.',
                price: 39.99,
                category: 'Data Science',
                level: 'Intermediate',
                duration: '25h',
                instructor: instructor1,
                modules: [
                    { title: 'NumPy Basics', description: 'Array manipulation', duration: '4h' },
                    { title: 'Pandas DataFrames', description: 'Data analysis', duration: '6h' }
                ]
            },
            {
                title: 'UI/UX Design Masterclass',
                description: 'Learn Figma and design principles from scratch.',
                price: 29.99,
                category: 'Design',
                level: 'Beginner',
                duration: '10h',
                instructor: instructor1,
                modules: [
                    { title: 'Design Principles', description: 'Color theory and typography', duration: '2h' },
                    { title: 'Figma Basics', description: 'Tools and prototyping', duration: '4h' }
                ]
            },
            {
                title: 'Docker & Kubernetes',
                description: 'Containerization and orchestration for modern DevOps.',
                price: 69.99,
                category: 'DevOps',
                level: 'Advanced',
                duration: '18h',
                instructor: instructor1,
                modules: [
                    { title: 'Docker Basics', description: 'Images and containers', duration: '5h' },
                    { title: 'Kubernetes Cluster', description: 'Pods and services', duration: '8h' }
                ]
            },
            {
                title: 'JavaScript: The Hard Parts',
                description: 'Understand closures, prototypes, and async JS.',
                price: 34.99,
                category: 'Web Development',
                level: 'Intermediate',
                duration: '12h',
                instructor: instructor1,
                modules: [
                    { title: 'Closures', description: 'Lexical scope', duration: '3h' },
                    { title: 'Async JS', description: 'Promises and async/await', duration: '4h' }
                ]
            },
            {
                title: 'Machine Learning A-Z',
                description: 'Complete ML course using Python and Scikit-learn.',
                price: 89.99,
                category: 'Data Science',
                level: 'Advanced',
                duration: '40h',
                instructor: instructor1,
                modules: [
                    { title: 'Regression', description: 'Linear and logistic regression', duration: '6h' },
                    { title: 'Clustering', description: 'K-Means and Hierarchical', duration: '5h' }
                ]
            },
            {
                title: 'Next.js 14 Full Course',
                description: 'Build full-stack apps with Next.js App Router.',
                price: 54.99,
                category: 'Web Development',
                level: 'Intermediate',
                duration: '22h',
                instructor: instructor1,
                modules: [
                    { title: 'App Router', description: 'Pages and layouts', duration: '4h' },
                    { title: 'Server Actions', description: 'Handling form submissions', duration: '3h' }
                ]
            },
            {
                title: 'Cybersecurity Fundamentals',
                description: 'Introduction to network security and ethical hacking.',
                price: 44.99,
                category: 'Security',
                level: 'Beginner',
                duration: '16h',
                instructor: instructor1,
                modules: [
                    { title: 'Network Security', description: 'Firewalls and VPNs', duration: '4h' },
                    { title: 'Ethical Hacking', description: 'Penetration testing basics', duration: '5h' }
                ]
            },
            {
                title: 'Flutter & Dart',
                description: 'Build native mobile apps for iOS and Android.',
                price: 59.99,
                category: 'Mobile Development',
                level: 'Beginner',
                duration: '30h',
                instructor: instructor1,
                modules: [
                    { title: 'Dart Literature', description: 'Language basics', duration: '3h' },
                    { title: 'Flutter Widgets', description: 'Building UIs', duration: '8h' }
                ]
            },

            // Instructor 2 Courses
            {
                title: 'AWS Certified Solutions Architect',
                description: 'Pass the SAA-C03 exam with this comprehensive course.',
                price: 99.99,
                category: 'Cloud',
                level: 'Advanced',
                duration: '35h',
                instructor: instructor2,
                modules: [
                    { title: 'IAM', description: 'Identify and Access Management', duration: '3h' },
                    { title: 'EC2', description: 'Elastic Compute Cloud', duration: '5h' },
                    { title: 'S3', description: 'Simple Storage Service', duration: '4h' }
                ]
            },
            {
                title: 'Graphic Design Bootcamp',
                description: 'Photoshop, Illustrator, and InDesign for beginners.',
                price: 39.99,
                category: 'Design',
                level: 'Beginner',
                duration: '18h',
                instructor: instructor2,
                modules: [
                    { title: 'Photoshop Basics', description: 'Layers and masking', duration: '5h' },
                    { title: 'Illustrator Vectors', description: 'Pen tool mastery', duration: '5h' }
                ]
            },
            {
                title: 'SQL Masterclass',
                description: 'Database management using SQL and PostgreSQL.',
                price: 29.99,
                category: 'Database',
                level: 'Intermediate',
                duration: '14h',
                instructor: instructor2,
                modules: [
                    { title: 'Queries', description: 'SELECT, WHERE, JOINs', duration: '4h' },
                    { title: 'Database Design', description: 'Normalization', duration: '3h' }
                ]
            },
            {
                title: 'Digital Marketing Zero to Hero',
                description: 'SEO, Social Media, and Email Marketing strategies.',
                price: 49.99,
                category: 'Marketing',
                level: 'Beginner',
                duration: '20h',
                instructor: instructor2,
                modules: [
                    { title: 'SEO', description: 'Keyword research', duration: '5h' },
                    { title: 'Facebook Ads', description: 'Campaign setup', duration: '4h' }
                ]
            },
            {
                title: 'C++ Programming',
                description: 'High performance coding with modern C++.',
                price: 44.99,
                category: 'Programming',
                level: 'Intermediate',
                duration: '28h',
                instructor: instructor2,
                modules: [
                    { title: 'Pointers', description: 'Memory management', duration: '6h' },
                    { title: 'OOP', description: 'Classes and inheritance', duration: '8h' }
                ]
            },
            {
                title: 'Game Development with Unity',
                description: 'Create 2D and 3D games using C# and Unity.',
                price: 64.99,
                category: 'Game Development',
                level: 'Intermediate',
                duration: '32h',
                instructor: instructor2,
                modules: [
                    { title: 'Unity Interface', description: 'Scene and inspector', duration: '3h' },
                    { title: 'Physics', description: 'Colliders and Rigidbodies', duration: '5h' }
                ]
            },
            {
                title: 'Blockchain & Crypto',
                description: 'Understand how blockchain and cryptocurrencies work.',
                price: 54.99,
                category: 'Technology',
                level: 'Advanced',
                duration: '12h',
                instructor: instructor2,
                modules: [
                    { title: 'Cryptography', description: 'Hash functions', duration: '4h' },
                    { title: 'Smart Contracts', description: 'Solidity basics', duration: '4h' }
                ]
            },
            {
                title: 'Video Editing with Premiere Pro',
                description: 'Edit professional videos for YouTube and Film.',
                price: 39.99,
                category: 'Design',
                level: 'Beginner',
                duration: '15h',
                instructor: instructor2,
                modules: [
                    { title: 'Timeline', description: 'Cutting and trimming', duration: '3h' },
                    { title: 'Color Grading', description: 'Lumetri color', duration: '4h' }
                ]
            },
            {
                title: 'Go (Golang) Programming',
                description: 'Build scalable backend services with Go.',
                price: 49.99,
                category: 'Backend',
                level: 'Intermediate',
                duration: '18h',
                instructor: instructor2,
                modules: [
                    { title: 'Go Routines', description: 'Concurrency', duration: '4h' },
                    { title: 'Web Server', description: 'Building APIs', duration: '5h' }
                ]
            },
            {
                title: 'Agile Project Management',
                description: 'Learn Scrum, Kanban, and Agile methodologies.',
                price: 34.99,
                category: 'Business',
                level: 'Beginner',
                duration: '8h',
                instructor: instructor2,
                modules: [
                    { title: 'Scrum', description: 'Sprints and roles', duration: '3h' },
                    { title: 'Kanban', description: 'Visualizing work', duration: '2h' }
                ]
            }
        ];

        await Course.insertMany(courses);
        console.log('Courses created...');

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedData();
