# 📧 EmailJS Setup Guide for Contact Form

This guide will help you set up EmailJS to send emails directly to your Gmail (mdr78995@gmail.com) from your portfolio contact form.

## 🚀 Quick Setup Steps

### 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Add Email Service (Gmail)

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Select **Gmail**
4. Click **Connect Account** and authorize with your Gmail (mdr78995@gmail.com)
5. Note down your **Service ID** (e.g., `service_xxxxxxx`)

### 3. Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

```html
Subject: New Portfolio Contact: {{subject}} From: {{from_name}} <{{from_email}}>
Subject: {{subject}} Message: {{message}} --- This message was sent from your
portfolio contact form. Reply directly to: {{from_email}}
```

4. Set template variables:

   - `from_name` - Visitor's name
   - `from_email` - Visitor's email
   - `subject` - Message subject
   - `message` - Message content
   - `to_email` - Your email (mdr78995@gmail.com)

5. Note down your **Template ID** (e.g., `template_xxxxxxx`)

### 4. Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `xxxxxxxxxxxxxxx`)

### 5. Update Contact Component

Replace the placeholder values in `src/components/sections/Contact.jsx`:

```javascript
// Replace these with your actual EmailJS credentials
const serviceId = "service_xxxxxxx"; // Your Service ID
const templateId = "template_xxxxxxx"; // Your Template ID
const publicKey = "xxxxxxxxxxxxxxx"; // Your Public Key
```

## 🔧 Complete Configuration Example

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus(null);

  try {
    // Your EmailJS configuration
    const serviceId = "service_abc123";
    const templateId = "template_xyz789";
    const publicKey = "your_public_key_here";

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: "mdr78995@gmail.com",
    };

    await emailjs.send(serviceId, templateId, templateParams, publicKey);

    setSubmitStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
  } catch (error) {
    console.error("Error sending email:", error);
    setSubmitStatus("error");
  } finally {
    setIsSubmitting(false);
  }
};
```

## 📧 Email Template Setup

### Recommended Template Structure:

**Template Name:** Portfolio Contact Form
**Subject:** New Portfolio Contact: {{subject}}

**HTML Content:**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #2563eb;">New Contact from Portfolio</h2>

  <div
    style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;"
  >
    <p><strong>Name:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Subject:</strong> {{subject}}</p>
  </div>

  <div
    style="background: white; padding: 20px; border-left: 4px solid #2563eb;"
  >
    <h3>Message:</h3>
    <p>{{message}}</p>
  </div>

  <hr style="margin: 30px 0;" />
  <p style="color: #64748b; font-size: 14px;">
    This message was sent from your portfolio contact form.<br />
    Reply directly to: {{from_email}}
  </p>
</div>
```

## 🎯 Testing Your Setup

1. **Test Mode**: EmailJS provides a test mode for development
2. **Send Test Email**: Use the contact form to send yourself a test message
3. **Check Spam Folder**: First emails might go to spam
4. **Verify Template**: Ensure all variables are properly mapped

## 🔒 Security Best Practices

### Environment Variables (Recommended)

Create a `.env` file in your project root:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

Then update your component:

```javascript
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
```

### Rate Limiting

- EmailJS free plan: 200 emails/month
- Consider implementing client-side rate limiting
- Add form validation to prevent spam

## 🚨 Troubleshooting

### Common Issues:

1. **"Service not found"**

   - Check your Service ID is correct
   - Ensure Gmail service is properly connected

2. **"Template not found"**

   - Verify Template ID matches exactly
   - Check template is published/active

3. **"Unauthorized"**

   - Confirm Public Key is correct
   - Check account permissions

4. **Emails not received**
   - Check spam/junk folder
   - Verify Gmail service connection
   - Test with different email addresses

### Debug Mode:

```javascript
// Add this for debugging
console.log("Sending email with params:", templateParams);
```

## 📱 Mobile Testing

- Test form on mobile devices
- Verify touch interactions work properly
- Check responsive design maintains functionality

## 🎉 Success!

Once configured, your contact form will:

- ✅ Send emails directly to mdr78995@gmail.com
- ✅ Include visitor's name, email, and message
- ✅ Show success/error notifications
- ✅ Reset form after successful submission
- ✅ Work on all devices with smooth animations

## 📞 Support

If you encounter issues:

1. Check EmailJS documentation: https://www.emailjs.com/docs/
2. Verify all IDs and keys are correct
3. Test with simple template first
4. Check browser console for errors

Your portfolio contact form is now ready to receive messages directly in your Gmail inbox! 🚀
