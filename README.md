# TrueVitals Partner Portal

Partner-facing dashboard. React + Vite + Tailwind + Supabase Auth.
Deploys to Cloudflare Pages.

## Deploy

Cloudflare → Workers & Pages → Create → Pages → Connect to Git → this repo.

    Framework preset:        Vite
    Build command:           npm run build
    Build output directory:  dist

Environment variables (both required):

    VITE_SUPABASE_URL        https://vhhwyzcnytenejtgrgzb.supabase.co
    VITE_SUPABASE_ANON_KEY   <anon key from Supabase → Settings → API>

## Supabase Auth

1. Authentication → Providers → Email → enable, "Confirm email" OFF
2. Authentication → URL Configuration:
   - Site URL: https://partners.truevitals.co.uk
   - Redirect URLs: https://partners.truevitals.co.uk/**
     and https://truevitals-partners.pages.dev/**

## Local dev

    npm install
    cp .env.example .env    # then fill in the anon key
    npm run dev

## Making a partner live

1. They apply at truevitals.co.uk/partners
2. Row appears in `partners` with status pending
3. Approve via the Worker, which mints their Stripe code:

       curl -X POST https://truevitals-stripe-webhook.james-smillie-8c6.workers.dev/partner-approve \
         -H "Content-Type: application/json" \
         -d '{"admin_key":"<PARTNER_ADMIN_KEY>","partner_id":"<uuid>","referral_code":"SORAYA","commission_pence":4000,"customer_discount_pence":4000}'

   Reciprocal-only clinical partner: set both pence values to 0.

4. Supabase → Authentication → Users → Invite → their email.
   Copy the UUID, then:

       UPDATE partners SET auth_user_id = '<uuid>' WHERE email = '<their email>';

## Related

- Schema: `partners`, `partner_referrals`, `partner_payouts` in Supabase
- Application endpoint: `/partner-apply` on truevitals-stripe-webhook
- Public signup page: truevitals.co.uk/partners
