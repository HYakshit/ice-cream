import React from 'react'
import { Button } from './Button'
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactSchema } from './contactSchema';

export const ContactForm = ({ fieldMargin, bgColor }) => {
    const methods = useForm({
        resolver: yupResolver(contactSchema),
        mode: 'onTouched'
    });

    const { handleSubmit, register, formState: { errors, isSubmitting } ,reset} = methods;

    const onSubmit = async (data) => {
        console.log("Raw Data:", data);

        const formData = new FormData();
        formData.append('_captcha', 'false');
        formData.append('_template', 'table');
        Object.entries(data).forEach(([key, value]) => formData.append(key, value));

        console.log("FormData Debug:", Array.from(formData.entries()));

        try {
            const response = await fetch("https://formsubmit.co/akshit62832@gmail.com", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error('Submission failed');

            alert("Form submitted successfully!");
            reset();
        } catch (error) {
            console.error(error);
            alert("There was an error submitting the form.");
        }
    };


    return (
        <FormProvider {...methods}>
            <div className={`form ${bgColor} p-4 m-2 rounded-2xl w-full max-w-3xl mx-auto`}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    {/* Input Groups */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col gap-4 w-full">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    {...register('Name')}
                                    className={`input ${fieldMargin} w-full bg-white`}
                                />
                                {errors.Name && <p className="text-red-500 text-sm">{errors.Name.message}</p>}
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Your E-mail"
                                    {...register('email')}
                                    className={`input ${fieldMargin} w-full bg-white`}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 w-full">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    {...register('Subject')}
                                    className={`input ${fieldMargin} w-full bg-white`}
                                />
                                {errors.Subject && <p className="text-red-500 text-sm">{errors.Subject.message}</p>}
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="Your Phone Number"
                                    {...register('Phone_Number')}
                                    className={`input ${fieldMargin} w-full bg-white`}
                                />
                                {errors.Phone_Number && <p className="text-red-500 text-sm">{errors.Phone_Number.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Textarea */}
                    <div>
                        <textarea
                            {...register('Message')}
                            className={`textarea ${fieldMargin} min-h-20 w-full bg-white`}
                            placeholder="Message"
                        ></textarea>
                        {errors.Message && <p className="text-red-500 text-sm">{errors.Message.message}</p>}
                    </div>

                    <Button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </form>
            </div>
        </FormProvider>
    );
}
