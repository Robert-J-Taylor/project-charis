# Email Deliverability Guide for Project Charis

## 🎯 **Why Emails Go to Spam**

1. **Missing Authentication Records** (SPF, DKIM, DMARC)
2. **Using Gmail/Free Email Domains** for sending
3. **Poor Reputation** (new domain, no history)
4. **Content Triggers** (spammy words, poor formatting)
5. **High Volume** without proper warming

## 🚀 **Immediate Actions (Do These First)**

### 1. **Set Up Custom Domain Authentication**

#### **Step 1: Get a Domain**

- Purchase `projectcharis.org` (or similar)
- Point DNS to your hosting provider

#### **Step 2: Configure SendGrid Domain Authentication**

1. Go to SendGrid Dashboard → Settings → Sender Authentication
2. Click "Authenticate Your Domain"
3. Enter your domain (e.g., `projectcharis.org`)
4. Follow the DNS setup wizard
5. Add the provided CNAME records to your domain's DNS

#### **Step 3: Add SPF Record**

Add this TXT record to your domain's DNS:

```
v=spf1 include:_spf.sendgrid.net ~all
```

#### **Step 4: Add DMARC Record**

Add this TXT record to your domain's DNS:

```
v=DMARC1; p=quarantine; rua=mailto:dmarc@projectcharis.org
```

### 2. **Update Environment Variables**

Update your `.env.local` file:

```env
# Use your custom domain
CONTACT_FROM=noreply@projectcharis.org
CONTACT_TO=contact@projectcharis.org

# Keep your SendGrid API key
SENDGRID_API_KEY=your_sendgrid_api_key_here
```

### 3. **Verify Domain in SendGrid**

1. Go to SendGrid Dashboard → Settings → Sender Authentication
2. Under "Single Sender Verification", add your custom domain email
3. Verify the email address

## 📧 **Email Content Best Practices**

### **Subject Lines**

✅ **Good:**

- "New Contact Form Submission - Project Charis"
- "Waitlist Signup - projectcharis.org"

❌ **Avoid:**

- "URGENT!" "FREE!" "WIN!"
- All caps, excessive punctuation
- Spam trigger words

### **Email Content**

✅ **Good:**

- Professional, clear language
- Proper HTML structure
- Balanced text-to-image ratio
- Clear sender identity

❌ **Avoid:**

- Excessive links
- Poor HTML formatting
- Spam trigger words
- Missing unsubscribe options

## 🔧 **Technical Improvements**

### **1. Add Unsubscribe Headers**

Add to your email templates:

```html
<!-- Unsubscribe link -->
<p style="font-size: 12px; color: #666;">
  <a href="mailto:unsubscribe@projectcharis.org?subject=Unsubscribe"
    >Unsubscribe</a
  >
</p>
```

### **2. Improve Email Headers**

Add these headers to your SendGrid messages:

```javascript
const msg = {
  to: process.env.CONTACT_TO,
  from: {
    email: process.env.CONTACT_FROM,
    name: 'Project Charis',
  },
  subject: 'New Contact Form Submission',
  html: emailHTML,
  text: emailText,
  // Add these headers
  headers: {
    'List-Unsubscribe': '<mailto:unsubscribe@projectcharis.org>',
    'X-Mailer': 'Project Charis Contact Form',
    'X-Priority': '3',
  },
};
```

### **3. Use Dedicated IP (Optional)**

For high volume, consider SendGrid's dedicated IP option:

- Better reputation control
- More predictable deliverability
- Higher cost but better for business use

## 📊 **Monitor and Test**

### **1. Check Deliverability**

- Use tools like [Mail Tester](https://www.mail-tester.com/)
- Test with different email providers (Gmail, Outlook, Yahoo)
- Check spam scores

### **2. Monitor SendGrid Stats**

- Watch bounce rates (keep under 5%)
- Monitor spam reports
- Track open rates

### **3. Warm Up Your Domain**

- Start with low volume
- Gradually increase sending
- Maintain consistent sending patterns

## 🚨 **Red Flags to Avoid**

1. **Don't use free email domains** (gmail.com, yahoo.com) for sending
2. **Don't send high volume** without proper authentication
3. **Don't ignore bounce rates** - clean your lists
4. **Don't use spam trigger words** in content
5. **Don't send without unsubscribe options**

## 📈 **Long-term Strategy**

### **1. Build Domain Reputation**

- Consistent sending patterns
- Low bounce rates
- High engagement rates
- Clean email lists

### **2. Consider Email Service Upgrades**

- **Resend** (developer-friendly, good deliverability)
- **Postmark** (transactional emails, excellent reputation)
- **Mailgun** (flexible, good for developers)

### **3. Implement Feedback Loops**

- Monitor spam complaints
- Handle bounces properly
- Maintain clean subscriber lists

## 🔍 **Testing Checklist**

- [ ] Domain authentication set up (SPF, DKIM, DMARC)
- [ ] Custom domain email addresses
- [ ] Professional email content
- [ ] Unsubscribe links included
- [ ] Tested with multiple email providers
- [ ] Low bounce rates
- [ ] No spam trigger words

## 📞 **Quick Fixes for Immediate Improvement**

1. **Update your `.env.local`** with custom domain emails
2. **Set up domain authentication** in SendGrid
3. **Test with a few different email addresses**
4. **Monitor your SendGrid dashboard** for issues

---

**Need Help?** SendGrid has excellent documentation and support for deliverability issues. Most problems are solved with proper domain authentication!
