import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
    try {
        const { title, description, price, thumbnail, category, level, modules } = req.body;

        const course = new Course({
            title,
            description,
            price,
            thumbnail,
            category,
            level,
            modules,
            instructor: req.user._id,
        });

        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({}).populate("instructor", "name email");
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate("instructor", "name email");

        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


export const updateCourse = async (req, res) => {
    try {
        const { title, description, price, thumbnail, category, level, modules } = req.body;

        const course = await Course.findById(req.params.id);

        if (course) {
            // Check if user is the instructor
            if (course.instructor.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized to update this course' });
            }

            course.title = title || course.title;
            course.description = description || course.description;
            course.price = price || course.price;
            course.thumbnail = thumbnail || course.thumbnail;
            course.category = category || course.category;
            course.level = level || course.level;
            course.modules = modules || course.modules;

            const updatedCourse = await course.save();
            res.json(updatedCourse);
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            // Check if user is the instructor
            if (course.instructor.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized to delete this course' });
            }
            await course.deleteOne();
            res.json({ message: "Course removed" });
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Enroll in a course
// @route   POST /api/courses/:id/enroll
// @access  Private
export const enrollCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            // Check if already enrolled
            if (course.students.includes(req.user._id)) {
                return res.status(400).json({ message: 'Already enrolled in this course' });
            }

            course.students.push(req.user._id);
            await course.save();

            res.status(200).json({ message: 'Enrollment successful' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get enrolled courses for current user
// @route   GET /api/courses/my-courses
// @access  Private
export const getEnrolledCourses = async (req, res) => {
    try {
        const courses = await Course.find({ students: req.user._id });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
