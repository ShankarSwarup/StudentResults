const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Subject = require('../models/subjects');
const Manage = require('../models/manage');

const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const seedData = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log('Connected to DB for seeding...');

        // Clear existing data
        await Student.deleteMany();
        await Teacher.deleteMany();
        await Subject.deleteMany();
        await Manage.deleteMany();

        const salt = await bcrypt.genSalt(10);
        const hashedDefaultPassword = await bcrypt.hash('password123', salt);

        // 1. Create Teacher
        const teacher = await Teacher.create({
            Tid: 'T-101',
            Name: 'Dr. Shankar Swarup',
            Dept: 'CSE',
            Password: hashedDefaultPassword
        });
        console.log('Sample Teacher Created: T-101 / password123');

        // 2. Create Subjects
        const sub1 = await Subject.create({ Subject: 'Data Structures', Code: 'CS301' });
        const sub2 = await Subject.create({ Subject: 'Algorithms', Code: 'CS302' });
        const sub3 = await Subject.create({ Subject: 'Operating Systems', Code: 'CS303' });
        console.log('Sample Subjects Created');

        // 3. Create Student
        const student = await Student.create({
            Reg: '23CS101',
            Name: 'John Doe',
            Password: hashedDefaultPassword,
            Phn: '9876543210',
            Dept: 'CSE',
            Gender: 'Male',
            DOB: '2005-05-15',
            Email: 'john@example.com',
            Address: '123 Tech Lane, Silicon Valley',
            Year: '2023'
        });
        console.log('Sample Student Created: 23CS101 / password123');

        // 4. Create Subject Mapping (Manage)
        await Manage.create({
            Dept: 'CSE',
            Sem: '3-1',
            Subjects: ['Data Structures', 'Algorithms']
        });
        console.log('Sample Subject Mapping Created for CSE 3-1');

        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedData();
