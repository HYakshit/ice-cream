import * as Yup from 'yup';

export const contactSchema = Yup.object().shape({
    Name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
    email: Yup.string().email('Invalid email format'),
    Subject: Yup.string(),
    Phone_Number: Yup.string()
        .required('Phone number is required')
        .min(10, 'Number must be greator than 10 digits')
        .matches(/^[0-9]/, 'use 1234567891 number format'),
    Message: Yup.string().min(5, 'Message must be at least 5 characters')
});