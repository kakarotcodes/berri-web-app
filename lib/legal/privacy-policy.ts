export const privacyPolicyContent = `# PRIVACY POLICY

---

## 1. INTRODUCTION

Welcome to Berri's Privacy Policy. This policy describes how Berri, based in New Delhi, India ("Berri", "we", "us", or "our"), collects, uses, protects, and shares information when you use the Berri desktop application for macOS ("Software", "Application", or "Berri").

**By using Berri, you acknowledge and agree to the data practices described in this Privacy Policy.** For data processed based on legitimate interest (such as pseudonymous, aggregated analytics), you have the right to object at any time.

If you do not agree with this Privacy Policy, please do not use Berri.

### 1.1 Scope

This Privacy Policy applies to:
- The Berri desktop application for macOS
- Any updates, upgrades, or modifications to the Software
- Any future features or services we may offer (subject to additional terms)

### 1.2 Privacy-First Philosophy

Berri is designed with privacy as a core principle:
- **All data stays local** on your device (stored in SQLite databases)
- **No cloud storage** (all data remains on your device)
- **Minimal data collection** (we only collect what's necessary to improve the app)
- **No third-party data selling** (we will never sell your personal data)

### 1.3 Data Controller and Processor Roles

**Berri as Data Controller:**
- For account, billing, license, and optional analytics configuration, Berri acts as a **Data Controller** and determines how and why this data is processed.

**PostHog as Processor:**
- For optional analytics, PostHog acts as our **Data Processor** under a GDPR-compliant DPA and processes analytics data on our instructions.

**What Berri Does NOT Process:**
- Berri does **not** process the contents of your notes, clipboard, screenshots, or website sessions.
- This data remains **local on your device** and is never transmitted to our servers.

---

## 2. INFORMATION WE COLLECT

### 2.1 Information You Provide Directly

**Account Information:**
- Email address (for license verification and account management)
- Name (optional, for billing purposes)
- Payment information (processed by our third-party payment processor, Dodo Payments)
- **Important:** We do **not** store full payment card numbers or CVV codes. We receive only limited transaction metadata (e.g., last-4 digits, payment token, transaction status) from our payment processor.

**Support Materials (When You Contact Us):**
- Support requests you send us (logs, screenshots, error reports)
- **Important:** Please review and redact any sensitive content before sharing support materials with us.
- **Retention:** We retain support materials only for the duration needed to resolve the ticket and for up to **90 days** thereafter, unless required to retain them for defending legal claims, security investigations, or complying with applicable law. Copies in encrypted backups are removed on the next backup rotation (up to **30 days**).

**Usage Data You Create:**
- Notes, text, and documents you create in Berri
- Clipboard history (text, images, files you copy)
- Screenshots and screen captures
- Website sessions and cookies (for websites you access through Berri)
- File metadata (file paths, names, sizes)
- Customization preferences (themes, shortcuts, module configurations)

**Important:** All of this data is stored **locally on your device** in SQLite databases. We do **not** have access to this data unless you explicitly share it with us (e.g., for support purposes).

### 2.2 Information We Collect Automatically

**Analytics and Telemetry (via PostHog):**
We use PostHog, a privacy-focused analytics platform hosted in the United States, to collect **pseudonymous, aggregated usage data**, including:
- Feature usage statistics (e.g., which modules you use most)
- Application performance metrics (e.g., load times, crashes)
- Error logs and crash reports
- Device information (macOS version, hardware specs, screen resolution)
- Session data (app launches, session duration)

**Default Setting:**
Analytics are **enabled by default** during onboarding, with the option to opt out. You can disable analytics at any time in **Settings → Privacy** or during the initial setup.

**Privacy Protections:**
- **IP addresses** are immediately masked before storage; we do not store full IP addresses
- **Geolocation data** (latitude, longitude, city, country) is blocked client-side and never transmitted
- **No session recording** - we never capture on-screen content
- **DPA in place** - PostHog operates under a GDPR-compliant DPA

**What We Do NOT Collect:**
- Full IP addresses
- Precise location data (latitude, longitude, city, country - all blocked)
- Content of your notes, clipboard items, or files
- Browsing history or URLs you visit
- Passwords, credentials, or authentication tokens
- Personally identifiable information (PII) beyond your email address for license verification
- Third-party service credentials (Google, ChatGPT, etc.)

**Data Sanitization:**
Crash and error data are sanitized client-side to remove URLs, file paths, window titles, clipboard previews, query parameters, and user content before transmission. We use an allow-list for telemetry keys (event names, timestamps, app performance counters, enumerated properties) and block submission of any free-text fields. We also enforce a server-side schema that rejects unexpected keys and free-text payloads. If we ever discover that user content was transmitted despite these controls, we will purge it within **72 hours** and patch our filters.

**Your Right to Opt Out:**
You have the right to opt out of analytics processing at any time:
- Go to **Settings → Privacy** in Berri and toggle off "Share Usage Analytics"
- Or email us at **support@berri.in** and we will disable analytics for your license
- Opting out takes effect immediately for new events. Any queued diagnostic data not yet transmitted is discarded.
- Email opt-out requests are applied at the license level. We will disable analytics for your license and discard any queued telemetry tied to that license.

### 2.3 Third-Party Integrations

Berri provides access to third-party services (e.g., Gmail, Google Drive, ChatGPT, etc.) through its browser features.

**Important:**
- We do **not** collect, store, or process data from third-party services.
- Your interactions with third-party services are governed by **their** privacy policies, not ours.
- Website sessions and cookies are stored **locally on your device** (similar to a standard browser).

---

## 3. HOW WE USE YOUR INFORMATION

We use the information we collect for the following purposes:

### 3.1 To Provide and Improve Berri

- **License verification:** During activation, Berri sends your email address, license key, app version, and a hashed device identifier to our license server solely to validate your entitlement and prevent fraud. **No note, clipboard, screenshot, or browsing content is transmitted.**
- **Product improvement:** Analyze pseudonymous, aggregated usage patterns (IP-masked, no geolocation, no session recording) to improve features, fix bugs, and optimize performance.
- **Support:** Respond to your inquiries, troubleshoot issues, and provide technical assistance.
- **Updates:** Deliver software updates, patches, and new features.

### 3.2 To Communicate With You

- **Transactional emails:** Send purchase confirmations, license keys, and account notifications.
- **Product updates and marketing:** Notify you of new features, updates, or important changes (you can opt out). You can opt out of marketing emails at any time by clicking the unsubscribe link or contacting us.
- **Support:** Respond to your support requests or feedback.

### 3.3 To Ensure Security and Compliance

- **Fraud prevention:** Detect and prevent fraudulent purchases, chargebacks, or abuse.
- **Legal compliance:** Comply with applicable laws, regulations, or legal requests.
- **Terms enforcement:** Enforce our Terms and Conditions and protect our rights.

### 3.4 Analytics and Research

- **Usage analytics:** Understand how users interact with Berri to prioritize features and improvements.
- **Performance monitoring:** Identify and fix crashes, bugs, or performance issues.
- **User research:** Conduct surveys or user testing (with your consent).

### 3.5 No Automated Decision-Making

We do **not** make decisions producing legal or similarly significant effects based solely on automated processing of your personal data.

---

## 4. DATA STORAGE AND SECURITY

### 4.1 Local Data Storage

**Most of your data is stored locally on your device:**
- Notes, clipboard history, screenshots, and files are stored in **SQLite databases** on your macOS device.
- Website sessions and cookies are stored locally (similar to a standard browser).
- **You are solely responsible** for backing up your local data. We do not provide automatic cloud backups by default.

**Data Location:**
- Local data is stored in Berri's application data directory on your device (macOS Application Support). The exact path may vary by version and user account.
- You can view the current data location and export or delete your local data at any time in **Settings → Privacy → Data Location**.

### 4.2 Security Measures

We implement reasonable and proportionate technical and organizational measures to protect your data:
- **Encryption in transit:** All data transmitted over the internet (e.g., license verification, analytics) uses HTTPS/TLS encryption.
- **Access controls:** Access controls limit who can access backend systems.
- **Code signing and notarization:** We ship Apple-notarized, code-signed builds to prevent tampering and verify software integrity on macOS.
- **Security reviews:** We periodically review our security posture and address identified vulnerabilities.

**However:**
- No system is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
- You are responsible for protecting your device, password, and license key.

**Responsible Disclosure:**
We welcome good-faith security research. If you report a vulnerability to **support@berri.in**, do not exploit it beyond what's necessary to demonstrate impact, avoid exposing user data, and give us reasonable time to fix the issue. We will not pursue legal action against security researchers who act in good faith and comply with these guidelines.

### 4.3 Data Retention

**Local Data:**
- Local data remains on your device until you delete it.
- Uninstalling Berri does **not** automatically delete local data (you must manually delete it).

**Analytics Data:**
- Pseudonymous, aggregated analytics data is retained for up to 12 months.
- After 12 months, analytics data is aggregated or deleted.

**Account Data:**
- Your email and license information is retained for as long as your license is active.
- If your license remains inactive for **24 months**, we will delete or anonymize associated account data unless we must retain it for legal, accounting, or security reasons.
- You may request deletion of your account data at any time by emailing support@berri.in.
- **Tax and audit records:** Certain billing and transaction records may be retained for up to **7 years** to comply with tax, accounting, or legal obligations in India.

**Backups:**
Deleted account data and telemetry may persist in encrypted backups for up to **30 days**, after which backups are rotated and the data is permanently removed.

---

## 5. HOW WE SHARE YOUR INFORMATION

We do **not** sell or share your personal information as defined by CCPA/CPRA. We do not rent or trade your personal information to third parties.

### 5.1 Service Providers

We may share limited information with trusted third-party service providers who assist us in operating Berri:

**Payment Processor (Dodo Payments):**
- Process payments and issue refunds
- Handle billing and tax compliance
- **What they receive:** Email, name (if provided), payment information
- **Their privacy policy:** [Dodo Payments Privacy Policy](https://dodopayments.com/privacy-policy)

**Analytics (PostHog):**
- Collect and analyze pseudonymous, aggregated usage data
- **What they receive:** Pseudonymous usage statistics (IP-masked, no geolocation, no session recording), device info, error logs
- **Their privacy policy:** [PostHog Privacy Policy](https://posthog.com/privacy)

**Important:**
- All service providers are contractually obligated to protect your data.
- We only share the **minimum data necessary** for them to perform their services.
- We enter into Data Processing Agreements (DPAs) with all sub-processors and, where applicable, Standard Contractual Clauses (SCCs) and equivalent safeguards.

**Business Customers:**
If your organization requires a Data Processing Agreement (DPA) for compliance purposes, please contact us at support@berri.in to request one.

### 5.2 Legal Requirements

We may disclose your information if required by law or in response to:
- Court orders, subpoenas, or legal processes
- Government or regulatory requests
- Requests to protect our rights, property, or safety
- Requests to prevent fraud, abuse, or illegal activity

### 5.3 Business Transfers

If Berri is acquired, merged, or sold:
- Your information may be transferred to the acquiring entity as a permitted corporate transaction, not a "sale" or "share" under CCPA/CPRA.
- You will be notified via email and given the option to request deletion of your personal data, subject to legal retention obligations (e.g., tax/audit records).
- The acquiring entity will be bound by this Privacy Policy (or you will be notified of changes).

### 5.4 With Your Consent

We may share your information with third parties if you explicitly consent (e.g., integrating with third-party services or sharing data for support purposes).

---

## 6. THIRD-PARTY SERVICES AND WEBSITES

### 6.1 Third-Party Integrations

Berri provides access to third-party services (Gmail, Google Drive, ChatGPT, etc.) through its browser features.

**Important:**
- We do **not** collect, store, or process data from third-party services.
- Your interactions with third-party services are governed by **their** privacy policies.
- We are **not responsible** for the privacy practices of third-party services.

### 6.2 Third-Party Cookies

When you access websites through Berri:
- Websites may set cookies, trackers, or analytics scripts.
- These cookies are stored **locally on your device** (similar to a standard browser).
- We do **not** have access to third-party cookies or tracking data.

**You can clear third-party cookies** at any time through Berri's settings.

### 6.3 External Links

Berri may contain links to external websites or services. We are **not responsible** for the privacy practices or content of external sites.

### 6.4 Cookies & Local Storage

**Berri's Own Cookies:**
- Berri uses **local storage** (not cookies) to maintain application state and user preferences.
- This data is stored **locally on your device** and is never sent to our servers.

**Third-Party Website Cookies:**
- Websites you access through Berri's in-app browser may set their own cookies.
- These cookies remain on your device and are used strictly to maintain sessions inside Berri's browser.
- **We never send these cookies to Berri's servers.**
- You can clear all website cookies anytime in **Settings → Privacy → Clear Website Data**.

---

## 7. YOUR PRIVACY RIGHTS

Depending on your location, you may have the following rights under applicable data protection laws (e.g., GDPR, CCPA):

**Verifying Your Identity:**
To protect your data, we may ask for reasonable information to verify your identity before fulfilling access, deletion, or portability requests. We only process rights requests from the email address on file for your account. If you contact us from a different address, we will require additional verification (e.g., license key proof or signed challenge).

**Manifestly Unfounded or Excessive Requests:**
If a request is manifestly unfounded or excessive (e.g., repetitive, frivolous, or made in bad faith), we may charge a reasonable administrative fee or refuse to act, as permitted by applicable law (e.g., GDPR Article 12(5)). We may also request additional information to verify the legitimacy of the request.

### 7.1 Access

You have the right to request access to the personal data we hold about you.

**How to exercise:** Email us at support@berri.in with the subject line "Data Access Request."

### 7.2 Correction

You have the right to request correction of inaccurate or incomplete personal data.

**How to exercise:** Email us at support@berri.in with the subject line "Data Correction Request."

### 7.3 Deletion

You have the right to request deletion of your personal data ("right to be forgotten").

**How to exercise:** Email us at support@berri.in with the subject line "Data Deletion Request."

**Important:**
- Deleting account/licensing data will **permanently disable license validation and end access to licensed features**. This action is **irreversible**.
- Deletion is subject to legal retention obligations (e.g., tax/audit records may be retained for up to 7 years).
- Local data on your device must be deleted manually (it is not automatically deleted).

### 7.4 Portability

You have the right to request a copy of your personal data in a structured, machine-readable format.

**How to exercise:** Email us at support@berri.in with the subject line "Data Portability Request."

**Scope:** Portability applies only to personal data that we process as a controller (e.g., account, license, and applicable analytics data). Content stored locally on your device (notes, clipboard, screenshots, website data) is not accessible to us and is outside the scope of portability requests.

### 7.5 Opt-Out of Analytics

You can opt out of pseudonymous usage analytics at any time:
- Go to **Settings → Privacy** in Berri
- Toggle off "Share Usage Analytics"

### 7.6 Opt-Out of Marketing Emails

You can opt out of marketing emails by:
- Clicking the "Unsubscribe" link in any marketing email
- Emailing us at support@berri.in with the subject line "Unsubscribe"

**Note:** You will still receive transactional emails (e.g., purchase confirmations, license keys).

### 7.7 Do Not Track (DNT)

Berri does **not** respond to "Do Not Track" (DNT) browser signals, as there is no industry-wide standard for DNT compliance. Instead, you can use the in-app analytics toggle in **Settings → Privacy** to opt out of data collection.

---

## 8. CHILDREN'S PRIVACY

Berri is **not intended for use by children under the age of 16** (or the age of legal majority in your jurisdiction).

We do **not** knowingly collect personal information from children.

**If you believe a child has provided us with personal data:**
- Email us immediately at support@berri.in
- We will delete the data promptly upon verification

**For U.S. residents:**
- Berri is not intended for children under 13, consistent with COPPA.
- If we learn we have collected personal data from a child under 13, we will delete it, disable the account, and, where appropriate, notify the parent or legal guardian.

---

## 9. INTERNATIONAL DATA TRANSFERS

Berri is based in **New Delhi, India**.

**Analytics Data:**
- Our analytics provider (PostHog) is hosted in the United States.
- Analytics data may be transferred to and processed in the United States.

**If you are located outside India:**
- Your data may be transferred to and processed in India or the United States.
- We will take reasonable steps to ensure your data is protected in accordance with this Privacy Policy.

**For users in the European Economic Area (EEA) or UK:**
- International data transfers rely on Standard Contractual Clauses (SCCs) approved by the European Commission and appropriate technical and organizational measures (encryption, data minimization, access controls).
- For the UK, we use the UK Addendum/International Data Transfer Agreement (IDTA) to the SCCs where required.

---

## 10. DATA BREACH NOTIFICATION

In the event of a data breach that affects your personal data:
- We will notify the relevant supervisory authority without undue delay and, where required by law, within **72 hours** of becoming aware of a personal data breach.
- We will notify affected users without undue delay when the breach is likely to result in a high risk to their rights and freedoms.
- We will describe the nature of the breach, the data affected, and steps you can take to protect yourself.
- We will take immediate steps to mitigate the breach and prevent future incidents.

---

## 11. CHANGES TO THIS PRIVACY POLICY

### 11.1 Right to Modify

We reserve the right to update or modify this Privacy Policy at any time.

**Reasons for changes may include:**
- Legal or regulatory requirements
- New features or services
- Security or privacy improvements
- Clarifications or corrections

### 11.2 Notification of Changes

When we make material changes to this Privacy Policy, we will notify you by:
- Posting the updated Privacy Policy at **https://berri.in/privacy**
- Updating the "Last Updated" date at the top of this document
- Sending an email notification (for significant changes)
- Displaying an in-app notification (for significant changes)

### 11.3 Acceptance of Changes

**Your continued use of Berri after changes are posted constitutes your acceptance of the updated Privacy Policy.**

If you do not agree to the updated Privacy Policy:
- You must stop using Berri immediately.
- You may request deletion of your data by emailing support@berri.in.

---

## 12. CONTACT US

If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:

**Email:** support@berri.in
**Website:** https://berri.in
**Location:** New Delhi, India

**Response Time:**
- We will respond to privacy requests within **30 days** (or as required by applicable law).

---

## 13. JURISDICTION-SPECIFIC RIGHTS

### 13.1 European Economic Area (EEA) and UK (GDPR)

If you are located in the EEA or UK, you have additional rights under the General Data Protection Regulation (GDPR):

**Legal Basis for Processing:**
- **Contract:** To provide Berri and fulfill our Terms and Conditions.
- **Legitimate Interest:** To improve Berri, prevent fraud, ensure security, and conduct pseudonymous analytics (IP-masked, no geolocation, aggregated). For EEA/UK users, such data may be considered personal data in pseudonymous form. We minimize and aggregate data wherever possible.

**Data Controller:**
- Berri, based in New Delhi, India, is the data controller.

**Your Rights:**
- Right to access, correction, deletion, portability (see Section 7)
- Right to object to processing (Article 21)
- Right to withdraw consent (where applicable)
- Right to lodge a complaint with your local data protection authority

**Right to Object (Article 21):**
You have the right to object to processing based on legitimate interest (including pseudonymous analytics). We will cease processing unless we demonstrate compelling legitimate grounds that override your interests, rights, and freedoms. You can exercise this right anytime in **Settings → Privacy** by toggling off "Share Usage Analytics" or by emailing **support@berri.in** to disable analytics for your license.

**EU/UK Representative:**
- Not currently required under GDPR Article 27. If our obligations change, we will appoint a representative and update this Policy.

### 13.2 California (CCPA)

If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):

**Your Rights:**
- Right to know what personal data we collect, use, and share
- Right to request deletion of your personal data
- Right to opt out of "sale" of personal data (we do **not** sell personal data)
- Right to opt out of "sharing" for cross-context behavioral advertising (we do **not** share personal data for this purpose)
- Right to non-discrimination for exercising your CCPA/CPRA rights

**Notice at Collection (CPRA):**
- **Categories collected:** Identifiers (email), and app telemetry (pseudonymous, aggregated usage and device data, IP-masked, no geolocation) not linked to a real-name profile.
- **Purpose:** License provisioning, security, product improvement.
- **Retention:** See Section 4.3.

**How to Exercise Your Rights:**
- Email us at support@berri.in with the subject line "CCPA Request"
- We will verify your identity before processing your request

**Shine the Light:**
- Under California Civil Code Section 1798.83, you may request information about our disclosure of personal data to third parties for their direct marketing purposes. We do **not** share personal data for third-party marketing.

### 13.3 India (Digital Personal Data Protection Act - DPDPA)

If you are located in India, you have rights under the Digital Personal Data Protection Act, 2023 (DPDPA):

**Your Rights:**
- Right to access, correction, and deletion of your personal data
- Right to withdraw consent
- Right to nominate a successor to manage your data in case of death or incapacity

**How to Exercise Your Rights:**
- Email us at support@berri.in with the subject line "DPDPA Request"

**Data Fiduciary:**
- Berri, based in New Delhi, India, is the data fiduciary.

**Grievance Officer:**
- The Founder, reachable at support@berri.in
- Location: New Delhi, India
- We aim to acknowledge grievances within **48 hours** and resolve them within **15 days**.

---

## 14. ACKNOWLEDGMENT

**BY USING BERRI, YOU ACKNOWLEDGE THAT:**

You have read and understood this Privacy Policy in its entirety.

You consent to the collection, use, and sharing of your information as described in this Privacy Policy.

You understand that most data is stored locally on your device and you are responsible for backing it up.

You acknowledge the use of analytics and third-party service providers as described in this Privacy Policy.

**If you do not agree to this Privacy Policy, do not use Berri.**

---

**Thank you for trusting Berri with your productivity! We are committed to protecting your privacy and building a product that respects your data.**

---

**END OF PRIVACY POLICY**
`
