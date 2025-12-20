import Course from '../models/Course.js';


export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({}).populate('instructor', 'name email');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('instructor', 'name email');
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createCourse = async (req, res) => {
    try {
        const { title, description, price, category, level, duration, modules } = req.body;

        const course = new Course({
            instructor: req.user._id,
            title,
            description,
            price,
            category,
            level,
            duration,
            modules: modules || []
        });

        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateCourse = async (req, res) => {
    try {
        const { title, description, price, category, level, duration, modules } = req.body;

        const course = await Course.findById(req.params.id);

        if (course) {
            if (course.instructor.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            course.title = title || course.title;
            course.description = description || course.description;
            course.price = price || course.price;
            course.category = category || course.category;
            course.level = level || course.level;
            course.duration = duration || course.duration;
            if (modules !== undefined) course.modules = modules;

            const updatedCourse = await course.save();
            res.json(updatedCourse);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            if (course.instructor.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            await course.deleteOne();
            res.json({ message: 'Course removed' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const enrollCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            const alreadyEnrolled = course.students.find(
                (r) => r.toString() === req.user._id.toString()
            );

            if (alreadyEnrolled) {
                return res.status(400).json({ message: 'Already enrolled' });
            }

            course.students.push(req.user._id);
            await course.save();

            res.json({ message: 'Enrolled successfully' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getCourseStudents = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('students', 'name email');

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (course.instructor.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(course.students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getMyEnrolledCourses = async (req, res) => {
    try {
        const courses = await Course.find({ students: req.user._id }).populate('instructor', 'name email');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


