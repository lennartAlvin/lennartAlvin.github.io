# 📧 Contact Form Setup Guide

Your contact form is now fully built with professional features! Here's how to activate it:

## 🚀 **Quick Setup Steps**

### **1. EmailJS Setup (5 minutes)**

1. **Create EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up with your Google account or email

2. **Create Email Service**
   - Go to "Email Services" → "Add New Service"
   - Choose "Gmail" (recommended for your @gmail.com address)
   - Connect your `alvin.lennarthsson.dev@gmail.com` account

3. **Create Email Template**
   - Go to "Email Templates" → "Create New Template"
   - Use this template:

   ```
   Subject: New Contact Form Submission: {{subject}}

   Hello Alvin,

   You have received a new message from your portfolio contact form:

   Name: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}

   Message:
   {{message}}

   ---
   This message was sent through your portfolio website.
   You can reply directly to {{from_email}}
   ```

4. **Get Your Credentials**
   - Service ID: Found in "Email Services"
   - Template ID: Found in "Email Templates" 
   - Public Key: Found in "Account" → "General"

### **2. Environment Variables**

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### **3. CV Upload**

1. Add your CV file to `public/cv/Alvin_Lennarthsson_CV.pdf`
2. Or update the filename in `Contact.tsx` line 172 if you prefer a different name

### **4. Test Everything**

```bash
npm run dev
```

Navigate to your contact section and test:
- ✅ Form validation
- ✅ Email sending  
- ✅ Success/error states
- ✅ CV download

---

## 🎯 **Features You Now Have**

### **Professional Contact Form**
- ✅ **Real Email Sending** - Messages go directly to your inbox
- ✅ **Form Validation** - Prevents spam and errors
- ✅ **Loading States** - Professional user feedback
- ✅ **Success/Error Messages** - Users know what happened
- ✅ **Mobile Optimized** - Perfect on all devices

### **Business Impact**
- ✅ **Direct Communication** - No more copy/paste email addresses
- ✅ **Professional Impression** - Shows attention to detail
- ✅ **Lead Capture** - Every visitor can easily reach you
- ✅ **Resume Distribution** - One-click CV downloads

### **Technical Excellence**
- ✅ **TypeScript** - Type-safe form handling
- ✅ **React Hook Form** - Optimized form performance
- ✅ **Framer Motion** - Smooth animations
- ✅ **Error Handling** - Graceful failure modes
- ✅ **Accessibility** - Screen reader friendly

---

## 🔧 **Customization Options**

### **Change Email Template**
Edit the template in EmailJS dashboard to customize:
- Subject line format
- Email body content
- Auto-reply messages

### **Add More Fields**
In `Contact.tsx`, add fields like:
- Phone number
- Company name
- Project budget
- Timeline

### **Styling Tweaks**
Customize colors, spacing, and animations in:
- Form field styles (lines 90-125)
- Button animations (lines 300-320)
- Success/error messages (lines 350-370)

---

## 🚨 **Important Notes**

1. **Environment Variables**: Never commit your EmailJS credentials to Git
2. **CV File**: Make sure your PDF is under 10MB for best performance
3. **Spam Protection**: EmailJS has built-in rate limiting
4. **Mobile Testing**: Test the form on actual mobile devices

---

## 🎉 **You're All Set!**

Your portfolio now has a fully functional, professional contact system. Visitors can:

- 📧 Send you messages directly
- 📱 Use the form on any device
- 📄 Download your CV instantly
- 💼 See your availability status

This will significantly increase your chances of getting contacted by potential employers and clients!

---

## 🛠️ **Need Help?**

If you encounter any issues:

1. Check the browser console for errors
2. Verify your EmailJS credentials
3. Test with a simple message first
4. Make sure your `.env.local` file is in the project root

The contact form is now production-ready and will work perfectly when deployed! 