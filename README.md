
### Build. Ship. Earn. at lightspeed

Earn your first Dollars on the Internet with NineTails Stack Template, An Open-Source easy-to-use SaaS starter kit designed for indie hackers, startups, and MVPs to quickly get starter, build & launch ideas and earn their first dollar online.
Ninetails SaaS Starter Kit for AI, IndieHacking or Startups MVP.

> 5 Steps to Earning your first Dollars on the Internet

![Screenshot 2024-09-22 173525](https://github.com/user-attachments/assets/3ca18b11-4b03-4e0e-ae46-92d599f61ea7)

## Get Started

Few things to help you get started that can help and know what you are dealing with. (More detailed documentation is in progress with extra features around payment & email)

Project uses Next.js 14 (App Router), Supabase, PostgresSQL, Drizzle ORM, Stripe, Vercel AI SDK, Auth.js, Resend Emails, PostHog Analytics, Tailwind CSS, Shadcn UI, Acerternity UI, Magic UI and more.

> "No Unit Testing before Reaching 100k Monthly active users or 10k Paid Users"

## 1. Setup Codebase

Clone the Ninetails GitHub Repository from here [Ninetails GitHub](https://github.com/SRX9/ninetails-stack).

Run the following command to install all required packages:

```bash
npm i
```

## 2. Configure Environment Variables

Go to `env.local`, rename it to `.env` and fill in all the mentioned environment variables. To just get started, below are the few platforms you will need to create accounts on to get some of the variable values:

- [Supabase Auth](https://supabase.com/auth): Configure Auth Providers like Google, GitHub as per your wish
- [Supabase DB](https://supabase.com/database): PostgreSQL Database
- [Stripe](https://stripe.com?ref=ninetails-stack.dev): Payments Gateway
- (If required) [Resend](https://resend.com): Email Delivery
- [Posthog](https://Posthog.com): Website Analytics

## 3. Setup Tables in Database

We are using Drizzle ORM to work with the database. Go to `database/schema.ts` file to find all the table schemas we are using. You can add table schemas as you like. Make sure not to delete existing properties of tables like users, accounts, sessions, verification_token as they are required for our Auth.js library.

Now go to terminal and run the following commands:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

## 4. Create Subscription Product on Stripe

We are using Stripe for payment collection of our paid plans. Go to Stripe and set it up (if you don't know how, there are simple video tutorials on YouTube).

- Create a Recurring Product, get its Price ID and paste it in the `.env` file as mentioned before
- Go to Developers -> Webhooks in Stripe
- Setup Stripe WebHook with these events selected:
  - checkout.session.completed
  - invoice.payment_succeeded
  - customer.subscription.updated
  - customer.subscription.deleted
- Set Webhook Endpoint URL as:
  ```
  https://your-website-domain.com/api/webhooks/stripe
  ```

## 5. Deployment

Deployment is very easy for Next.js App. The most common and easy-to-use platform you can use is [Vercel](https://vercel.com?ref=ninetails-stack.dev).

## 6. Have a Question?

If you have any questions, create an issue or you can reach out to the following handles:

- [SRX9 Twitter](https://twitter.com/s_r_x_9)
- [GitHub Profile](https://github.com/SRX9)

## 7. Want to show Support?

If this starter template helped you and you want to show some support, here are a few ways:

- [Star on GitHub](https://github.com/SRX9/ninetails-stack)
- [Follow on Twitter](https://twitter.com/s_r_x_9)
- [Follow on GitHub](https://github.com/SRX9)
- [Sponsor on Github](https://github.com/sponsors/SRX9)

![image](https://github.com/user-attachments/assets/8d03dddd-946d-4509-bf1b-0dc9db57c235)

