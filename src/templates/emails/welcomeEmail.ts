export const welcomeEmail = (userName: string) => ({
  subject: "Welcome to Agencio – Let’s Get Started! 🎉",
  text: `Dear ${userName},

Welcome to Agencio! We’re excited to have you on board. 🚀

Your account has been successfully created, and you’re all set to explore everything we have to offer. Here’s what you can do next:

✅ Complete your profile to get personalized recommendations
✅ Explore our features and get familiar with our platform
✅ Get started with [briefly mention a key feature or benefit]

👉 <a href="https://www.google.com/" style="cursor: pointer;">
  <button
   style="display: inline-block; padding: 8px 16px; font-size: 16px; 
          color: #ffffff; background-color: #18181b; border-radius: 8px; text-decoration: none; 
          transition: background-color 0.2s ease-in-out; font-family: Inter, sans-serif; outline: none; border: none; cursor: pointer; cursor: pointer;"
   onmouseover="this.style.backgroundColor='#2f2f31'; this.style.transition='background-color 0.2s ease-in-out';"
   onmouseout="this.style.backgroundColor='#18181b'; this.style.transition='background-color 0.2s ease-in-out';">
   Get Started
</button>
</a>


Have any questions? We’re here to help! 💡

Cheers,
Agencio Team`,
});
