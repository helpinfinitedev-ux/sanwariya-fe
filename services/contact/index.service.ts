export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const ContactService = {
  submitForm: async (data: ContactFormData): Promise<{ success: boolean; message: string }> => {
    await sleep(1500); // Simulate API call
    console.log("Form submitted:", data);
    return {
      success: true,
      message: "Thank you for reaching out! We will get back to you soon.",
    };
  },
};
