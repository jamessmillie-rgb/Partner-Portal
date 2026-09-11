import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)

const gbp = (p) => '£' + ((p || 0) / 100).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
const fmtDate = (iso) => iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'
const PANEL = { advanced: 'Advanced', ultimate: 'Ultimate', randox: 'Signature', signature: 'Signature', core: 'Core', insight: 'Insight' }

// ============================================================
//  LOGIN
// ============================================================
function Login() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const send = async () => {
    if (!email.trim()) return
    setBusy(true); setErr('')
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: window.location.origin }
    })
    setBusy(false)
    error ? setErr(error.message) : setSent(true)
  }

  return (
    <div className="min-h-screen bg-tv-dark flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="font-heading font-black text-2xl tracking-tight text-white">True<span className="text-tv-teal">Vitals</span></div>
          <p className="text-sm text-gray-500 mt-2">Partner Portal</p>
        </div>
        {sent ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-tv-teal/15 text-tv-teal flex items-center justify-center mx-auto mb-4 text-xl">✓</div>
            <h1 className="font-heading font-bold text-white mb-2">Check your email</h1>
            <p className="text-sm text-gray-400 leading-relaxed">We've sent a sign-in link to {email}. It's valid for one hour.</p>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h1 className="font-heading font-bold text-white mb-1">Sign in</h1>
            <p className="text-sm text-gray-400 mb-6">No password needed. We'll email you a link.</p>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="you@business.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm outline-none focus:border-tv-teal transition-colors"
            />
            {err && <p className="text-red-400 text-xs mt-2">{err}</p>}
            <button onClick={send} disabled={busy}
              className="w-full mt-4 py-3 rounded-xl bg-tv-teal text-tv-dark font-bold text-sm hover:bg-tv-teal-dark transition-colors disabled:opacity-50">
              {busy ? 'Sending…' : 'Email me a link'}
            </button>
            <p className="text-xs text-gray-600 mt-5 text-center leading-relaxed">
              Not a partner yet? <a href="https://truevitals.co.uk/partners" className="text-tv-teal hover:underline">Apply here</a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================
//  SHELL
// ============================================================
function Shell({ partner, children, onSignOut }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-tv-dark">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="font-heading font-black text-lg tracking-tight text-white">True<span className="text-tv-teal">Vitals</span>
            <span className="ml-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 align-middle">Partner</span>
          </div>
          <div className="relative">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-2.5 text-sm text-gray-300 hover:text-white transition-colors">
              <span className="hidden sm:inline">{partner.business_name || partner.name}</span>
              <span className="w-8 h-8 rounded-full bg-tv-teal/15 text-tv-teal font-bold text-xs flex items-center justify-center">
                {(partner.business_name || partner.name || '?').charAt(0).toUpperCase()}
              </span>
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                <div className="px-4 py-2.5 border-b border-gray-50">
                  <p className="text-xs font-medium text-gray-900 truncate">{partner.name}</p>
                  <p className="text-[11px] text-gray-400 truncate">{partner.email}</p>
                </div>
                <button onClick={onSignOut} className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50">Sign out</button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-10">{children}</main>
      <footer className="max-w-5xl mx-auto px-5 sm:px-8 py-8 text-center">
        <p className="text-xs text-gray-400">Questions? <a href="mailto:partners@truevitals.co.uk" className="text-tv-teal hover:underline">partners@truevitals.co.uk</a></p>
      </footer>
    </div>
  )
}

// ============================================================
//  REFER A CLIENT
// ============================================================

const WORKER = 'https://truevitals-stripe-webhook.james-smillie-8c6.workers.dev'

function ReferClient({ partner, rates, onDone }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [panel, setPanel] = useState('ultimate')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)

  const rate = rates.find(r => r.panel === panel)

  const submit = async () => {
    if (!name.trim()) { setErr('Enter your client\u2019s name'); return }
    setBusy(true); setErr('')
    try {
      const res = await fetch(WORKER + '/partner-refer', {
        method: 'POST', mode: 'cors', credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auth_user_id: partner.auth_user_id,
          customer_name: name.trim(),
          customer_email: email.trim(),
          panel: panel
        })
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Something went wrong')
      setResult(data)
      setName(''); setEmail('')
      onDone()
    } catch (e) {
      setErr(e.message || 'Something went wrong. Try again.')
    }
    setBusy(false)
  }

  const copy = () => {
    navigator.clipboard.writeText(result.code).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000)
    })
  }

  if (result) return (
    <div className="bg-tv-dark rounded-2xl p-6 sm:p-8 mb-6 relative overflow-hidden">
      <div className="absolute -top-24 -right-16 w-64 h-64 rounded-full bg-tv-teal/10 blur-3xl pointer-events-none" />
      <div className="relative">
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-tv-teal mb-3">Code created</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
          <div className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">{result.code}</div>
          <button onClick={copy} className="self-start px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors">
            {copied ? 'Copied' : 'Copy code'}
          </button>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mb-5">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">They save</p>
            <p className="font-heading font-bold text-xl text-white">{gbp(result.discount_pence)}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">You earn</p>
            <p className="font-heading font-bold text-xl text-tv-teal">{gbp(result.commission_pence)}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-5">
          Single use, valid until {fmtDate(result.expires)}. They enter it at checkout on truevitals.co.uk.
          If they upgrade to a bigger panel, your commission goes up to match.
        </p>
        <button onClick={() => setResult(null)}
          className="px-5 py-2.5 rounded-lg bg-tv-teal text-tv-dark text-sm font-bold hover:bg-tv-teal-dark transition-colors">
          Refer someone else
        </button>
      </div>
    </div>
  )

  return (
    <div className="bg-tv-dark rounded-2xl p-6 sm:p-8 mb-6 relative overflow-hidden">
      <div className="absolute -top-24 -right-16 w-64 h-64 rounded-full bg-tv-teal/8 blur-3xl pointer-events-none" />
      <div className="relative">
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-tv-teal mb-2">Refer a client</p>
        <p className="text-sm text-gray-400 mb-6 max-w-md leading-relaxed">
          Enter their details and we&rsquo;ll create a code just for them. They get money off, you get paid when they book.
        </p>

        {err && <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm">{err}</div>}

        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Client name"
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm outline-none focus:border-tv-teal transition-colors" />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Their email (optional)" type="email"
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm outline-none focus:border-tv-teal transition-colors" />
        </div>

        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 mt-5">Which panel are you recommending?</p>
        <div className="grid sm:grid-cols-3 gap-2 mb-5">
          {rates.map(r => (
            <button key={r.panel} onClick={() => setPanel(r.panel)}
              className={`px-4 py-3 rounded-xl border text-left transition-colors ${panel === r.panel ? 'border-tv-teal bg-tv-teal/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
              <span className={`block text-sm font-bold ${panel === r.panel ? 'text-tv-teal' : 'text-white'}`}>{r.label.replace(' Panel', '')}</span>
              <span className="block text-[11px] text-gray-500 mt-0.5">You earn {gbp(r.commission_pence)}</span>
            </button>
          ))}
        </div>

        {rate && (
          <p className="text-xs text-gray-500 mb-5 leading-relaxed">
            They&rsquo;ll save <span className="text-white font-medium">{gbp(rate.discount_pence)}</span> and
            you&rsquo;ll earn <span className="text-tv-teal font-medium">{gbp(rate.commission_pence)}</span> once they book.
            Not sure which panel? Pick anything &mdash; the rate follows whatever they actually buy.
          </p>
        )}

        <button onClick={submit} disabled={busy}
          className="px-6 py-3 rounded-xl bg-tv-teal text-tv-dark font-bold text-sm hover:bg-tv-teal-dark transition-colors disabled:opacity-50">
          {busy ? 'Creating\u2026' : 'Create their code'}
        </button>
      </div>
    </div>
  )
}

// ============================================================
//  STATS
// ============================================================
function Stats({ referrals, partner }) {
  const conv = referrals.filter(r => ['confirmed', 'paid'].includes(r.status))
  const owed = referrals.filter(r => r.status === 'confirmed').reduce((s, r) => s + (r.commission_pence || 0), 0)
  const paid = referrals.filter(r => r.status === 'paid').reduce((s, r) => s + (r.commission_pence || 0), 0)
  const paysCommission = (partner.commission_pence || 0) > 0

  const pendingRefs = referrals.filter(r => r.status === 'pending')
  const cards = [
    { label: 'Waiting to book', value: pendingRefs.length, sub: 'codes issued' },
    { label: 'Booked', value: conv.length, sub: 'completed orders' },
    ...(paysCommission ? [
      { label: 'Pending', value: gbp(owed), sub: 'ready to pay out', accent: true },
      { label: 'Paid to date', value: gbp(paid), sub: 'lifetime earnings' }
    ] : [
      { label: 'Client value', value: gbp(conv.reduce((s, r) => s + (r.order_amount_pence || 0), 0)), sub: 'total referred' }
    ])
  ]

  return (
    <div className={`grid grid-cols-2 ${cards.length >= 3 ? 'lg:grid-cols-4' : ''} gap-3 sm:gap-4 mb-6`}>
      {cards.map((c, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">{c.label}</p>
          <p className={`font-heading font-black text-2xl sm:text-3xl tracking-tight ${c.accent ? 'text-tv-teal' : 'text-gray-900'}`}>{c.value}</p>
          <p className="text-xs text-gray-400 mt-1">{c.sub}</p>
        </div>
      ))}
    </div>
  )
}

// ============================================================
//  REFERRAL LIST
// ============================================================
function Referrals({ referrals, partner }) {
  const paysCommission = (partner.commission_pence || 0) > 0
  const badge = (s) => ({
    confirmed: 'bg-tv-teal/10 text-tv-teal',
    paid: 'bg-gray-100 text-gray-500',
    pending: 'bg-amber-50 text-amber-600',
    void: 'bg-red-50 text-red-500'
  }[s] || 'bg-gray-100 text-gray-500')
  const label = (s) => ({ confirmed: 'Ready to pay', paid: 'Paid', pending: 'Not booked yet', void: 'Cancelled' }[s] || s)

  if (referrals.length === 0) return (
    <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
      <p className="font-heading font-bold text-gray-900 mb-1">No referrals yet</p>
      <p className="text-sm text-gray-400 max-w-xs mx-auto leading-relaxed">Refer your first client above and they&rsquo;ll appear here straight away.</p>
    </div>
  )

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="px-5 sm:px-6 py-5 border-b border-gray-50">
        <h2 className="font-heading font-bold text-gray-900">Your referrals</h2>
        <p className="text-xs text-gray-400 mt-0.5">Codes you&rsquo;ve issued, and orders as they complete</p>
      </div>
      <div className="divide-y divide-gray-50">
        {referrals.map(r => (
          <div key={r.id} className="px-5 sm:px-6 py-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-medium text-sm text-gray-900 truncate">
                {r.customer_name || r.customer_first_name || 'Client'} · {PANEL[r.panel_type] || 'Panel'}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {fmtDate(r.created_at)}
                {r.status === 'pending' && r.referral_code && <span className="font-mono ml-2 text-gray-500">{r.referral_code}</span>}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {paysCommission && <span className="font-heading font-bold text-sm text-gray-900">{gbp(r.commission_pence)}</span>}
              <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${badge(r.status)}`}>{label(r.status)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
//  PAYOUT
// ============================================================
function Payout({ partner, referrals, payouts, onRequested }) {
  const [busy, setBusy] = useState(false)
  const ready = referrals.filter(r => r.status === 'confirmed')
  const owed = ready.reduce((s, r) => s + (r.commission_pence || 0), 0)
  const THRESHOLD = 5000
  const pending = payouts.find(p => ['requested', 'approved'].includes(p.status))

  if ((partner.commission_pence || 0) === 0) return null

  const request = async () => {
    setBusy(true)
    const { error } = await supabase.from('partner_payouts').insert({
      partner_id: partner.id, amount_pence: owed, referral_count: ready.length, status: 'requested'
    })
    setBusy(false)
    if (!error) onRequested()
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-gray-900">Payout</h2>
          {pending ? (
            <p className="text-sm text-gray-500 mt-1">
              {gbp(pending.amount_pence)} requested on {fmtDate(pending.created_at)}. We pay within 5 working days.
            </p>
          ) : owed >= THRESHOLD ? (
            <p className="text-sm text-gray-500 mt-1">{gbp(owed)} ready across {ready.length} referral{ready.length === 1 ? '' : 's'}.</p>
          ) : (
            <p className="text-sm text-gray-500 mt-1">
              {gbp(owed)} earned. Payouts are available once you reach {gbp(THRESHOLD)}.
            </p>
          )}
        </div>
        {!pending && owed >= THRESHOLD && (
          <button onClick={request} disabled={busy}
            className="shrink-0 px-6 py-3 rounded-xl bg-tv-dark text-white font-bold text-sm hover:bg-gray-800 transition-colors disabled:opacity-50">
            {busy ? 'Requesting…' : `Request ${gbp(owed)}`}
          </button>
        )}
      </div>
      {payouts.filter(p => p.status === 'paid').length > 0 && (
        <div className="mt-5 pt-5 border-t border-gray-50">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3">Payment history</p>
          {payouts.filter(p => p.status === 'paid').map(p => (
            <div key={p.id} className="flex justify-between text-sm py-1.5">
              <span className="text-gray-500">{fmtDate(p.paid_at)}</span>
              <span className="font-medium text-gray-900">{gbp(p.amount_pence)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================================
//  ASSETS
// ============================================================
function Assets({ partner }) {
  const items = [
    { name: 'TrueVitals logo pack', desc: 'PNG and SVG, light and dark', href: 'https://truevitals.co.uk/assets/truevitals-logos.zip' },
    { name: 'Partner one-pager', desc: 'What to hand a client', href: 'https://truevitals.co.uk/assets/partner-onepager.pdf' },
    { name: 'Panel comparison', desc: 'Advanced, Ultimate and Signature side by side', href: 'https://truevitals.co.uk/panels' }
  ]
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 mt-6">
      <h2 className="font-heading font-bold text-gray-900 mb-1">Marketing assets</h2>
      <p className="text-xs text-gray-400 mb-4">Everything you need to introduce TrueVitals to your clients</p>
      <div className="space-y-2">
        {items.map((a, i) => (
          <a key={i} href={a.href} target="_blank" rel="noopener"
            className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 hover:border-tv-teal/40 hover:bg-gray-50/50 transition-colors group">
            <div>
              <p className="text-sm font-medium text-gray-900">{a.name}</p>
              <p className="text-xs text-gray-400">{a.desc}</p>
            </div>
            <span className="text-tv-teal text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">Open →</span>
          </a>
        ))}
      </div>
    </div>
  )
}

// ============================================================
//  APP
// ============================================================
export default function App() {
  const [session, setSession] = useState(null)
  const [partner, setPartner] = useState(null)
  const [referrals, setReferrals] = useState([])
  const [payouts, setPayouts] = useState([])
  const [rates, setRates] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); if (!data.session) setLoading(false) })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => { setSession(s); if (!s) { setPartner(null); setLoading(false) } })
    return () => sub.subscription.unsubscribe()
  }, [])

  const load = useCallback(async () => {
    if (!session) return
    const { data: p } = await supabase.from('partners').select('*').eq('auth_user_id', session.user.id).maybeSingle()
    if (!p) { setNotFound(true); setLoading(false); return }
    setPartner(p)
    const [{ data: r }, { data: po }, { data: rt }] = await Promise.all([
      supabase.from('partner_referrals').select('*').eq('partner_id', p.id).order('created_at', { ascending: false }),
      supabase.from('partner_payouts').select('*').eq('partner_id', p.id).order('created_at', { ascending: false }),
      supabase.from('partner_rates').select('*').order('commission_pence')
    ])
    setReferrals(r || []); setPayouts(po || []); setRates(rt || []); setLoading(false)
  }, [session])

  useEffect(() => { load() }, [load])

  if (!session) return <Login />
  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-sm text-gray-400">Loading…</p></div>

  if (notFound) return (
    <div className="min-h-screen bg-tv-dark flex items-center justify-center p-6">
      <div className="max-w-sm text-center">
        <h1 className="font-heading font-bold text-white mb-2">No partner account found</h1>
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">That email isn't linked to an approved partner account. If you've applied recently, we'll be in touch once your application is reviewed.</p>
        <button onClick={() => supabase.auth.signOut()} className="text-sm text-tv-teal hover:underline">Sign out</button>
      </div>
    </div>
  )

  if (partner.status !== 'approved') return (
    <Shell partner={partner} onSignOut={() => supabase.auth.signOut()}>
      <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
        <h1 className="font-heading font-bold text-gray-900 mb-2">Application under review</h1>
        <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">We're reviewing your application and will email you as soon as it's approved. It usually takes a couple of working days.</p>
      </div>
    </Shell>
  )

  return (
    <Shell partner={partner} onSignOut={() => supabase.auth.signOut()}>
      <div className="mb-7">
        <h1 className="font-heading font-black text-2xl text-gray-900 tracking-tight">
          {partner.name?.split(' ')[0] ? `Hello ${partner.name.split(' ')[0]}` : 'Hello'}
        </h1>
        <p className="text-sm text-gray-400 mt-1">Here's how your referrals are doing</p>
      </div>
      <ReferClient partner={partner} rates={rates} onDone={load} />
      <Stats referrals={referrals} partner={partner} />
      <Referrals referrals={referrals} partner={partner} />
      <Payout partner={partner} referrals={referrals} payouts={payouts} onRequested={load} />
      <Assets partner={partner} />
    </Shell>
  )
}
