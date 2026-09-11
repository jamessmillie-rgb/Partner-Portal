import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)

const WORKER = 'https://truevitals-stripe-webhook.james-smillie-8c6.workers.dev'
const LOGO = 'https://cdn.prod.website-files.com/6825a8869d9afdbdbc4d8881/68500823ebf7f5e6d4b298f9_Copy%20of%20TrueVitals%20Inverse.png'
const IMG_GYM = 'https://cdn.prod.website-files.com/6825a8869d9afdbdbc4d8881/684748d492723b166ebf1973_gym.jpg'
const IMG_HIKE = 'https://cdn.prod.website-files.com/6825a8869d9afdbdbc4d8881/684748d7a80f90e152e08c32_hikers-p-2000.avif'

const gbp = (p) => '£' + ((p || 0) / 100).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
const fmtDate = (iso) => iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'
const PANEL = { advanced: 'Advanced', ultimate: 'Ultimate', randox: 'Signature', signature: 'Signature', core: 'Core', insight: 'Insight' }

// ============================================================
//  PUBLIC MARKETING SITE — shown when not signed in
// ============================================================

function Nav({ onSignIn }) {
  return (
    <header className="sticky top-0 z-50 bg-tv-dark/95 backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={LOGO} alt="TrueVitals" className="h-7 w-auto" />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">Partners</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onSignIn} className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">Sign in</button>
          <a href="#apply" className="px-5 py-2.5 rounded-lg bg-tv-teal text-tv-dark text-sm font-bold hover:bg-tv-teal-dark transition-colors">Apply</a>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative bg-tv-dark overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMG_GYM} alt="" className="w-full h-full object-cover opacity-[0.28]" />
        <div className="absolute inset-0 bg-gradient-to-r from-tv-dark via-tv-dark/95 to-tv-dark/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-tv-dark via-transparent to-tv-dark/60" />
      </div>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-tv-teal/10 blur-3xl pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <span className="inline-block px-3.5 py-1.5 rounded-full bg-tv-teal/10 text-tv-teal text-[11px] font-bold uppercase tracking-[0.18em] mb-7">Partner Programme</span>
        <h1 className="font-heading font-black text-white leading-[1.02] tracking-[-0.045em] text-[2.6rem] sm:text-6xl lg:text-7xl max-w-4xl">
          The test your clients<br className="hidden sm:block" /> already want.<br />
          <span className="text-tv-teal">Get paid every time.</span>
        </h1>
        <p className="mt-7 text-gray-400 text-lg leading-relaxed max-w-xl">
          Refer your clients to the UK&rsquo;s most comprehensive blood testing. They get money off. You get paid on every test they ever book, not just the first.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#apply" className="px-7 py-3.5 rounded-xl bg-tv-teal text-tv-dark font-bold text-sm hover:bg-tv-teal-dark transition-all hover:-translate-y-0.5">Apply in two minutes</a>
          <a href="#earn" className="px-7 py-3.5 rounded-xl border-2 border-white/15 text-white font-bold text-sm hover:border-tv-teal hover:text-tv-teal transition-colors">See what you earn</a>
        </div>
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8">
          {[['£20','Advanced'],['£40','Ultimate'],['£80','Signature'],['∞','Paid for life']].map(([a,b],i)=>(
            <div key={i} className="bg-tv-dark px-6 py-7">
              <div className="font-heading font-black text-3xl text-tv-teal tracking-[-0.04em] leading-none">{a}</div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mt-2.5">{b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Why() {
  const items = [
    { t: 'They have already been to their GP', d: 'And come away with fifteen markers and "everything looks normal". A standard NHS panel does not include ApoB, Lp(a), fasting insulin or HOMA-IR. If the answer is not in those fifteen, it does not get found.' },
    { t: 'They are already spending on health', d: 'Supplements, coaching, wearables, recovery. Most of it bought on guesswork. Blood work is the only thing on that list that tells them whether any of it is working.' },
    { t: 'They trust you, not an advert', d: 'This is the whole thing. A recommendation from someone who knows their training, their diet and their history converts in a way no marketing ever will.' },
    { t: 'It makes you better at your job', d: 'A client who tests gives you data to work from. You stop guessing at why recovery is poor or progress has stalled, and start working from real numbers.' }
  ]
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tv-teal-dark mb-4">Why it works</p>
        <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-[-0.035em] leading-[1.08] max-w-2xl">You are not selling them anything new.</h2>
        <p className="mt-6 text-gray-500 text-lg leading-relaxed max-w-2xl">Your clients are already tracking sleep, steps, macros and recovery. Blood work is the one measurement they are missing, and most of them know it.</p>
        <div className="mt-12 grid sm:grid-cols-2 gap-5">
          {items.map((it,i)=>(
            <div key={i} className="rounded-2xl border border-gray-100 p-7 hover:border-tv-teal/40 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-tv-teal/10 text-tv-teal-dark flex items-center justify-center font-bold mb-5">✓</div>
              <h3 className="font-heading font-bold text-lg tracking-tight mb-2.5">{it.t}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowToSell() {
  const lines = [
    { q: '"I\'m always exhausted, no matter how much I sleep."', a: 'That could be a dozen things and most of them show up on a blood test. Ferritin, thyroid, B12, vitamin D. Worth finding out rather than guessing.' },
    { q: '"I\'ve been really strict and nothing\'s changing."', a: 'Before we change the plan again, it is worth seeing what is going on underneath. Insulin, thyroid and inflammation all affect this and none of them are visible from the outside.' },
    { q: '"Should I be taking anything?"', a: 'Honestly, I would test first. Half the people who take supplements do not need them and the other half are missing the one that would help.' },
    { q: '"My doctor said everything was fine."', a: 'A standard NHS panel is about fifteen markers. This is a hundred and fourteen. Being told nothing is wrong is not the same as nothing being wrong.' }
  ]
  return (
    <section className="bg-tv-dark py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tv-teal mb-4">How to introduce it</p>
        <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-[-0.035em] leading-[1.08] text-white max-w-2xl">Do not sell it.<br />Recommend it.</h2>
        <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-2xl">The worst thing you can do is pitch. The best thing you can do is bring it up at the moment it is obviously relevant, which happens more often than you think.</p>
        <div className="mt-12 space-y-3">
          {lines.map((l,i)=>(
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-600 mb-3">When they say</p>
              <p className="font-heading font-bold text-white text-lg sm:text-xl tracking-tight mb-4 leading-snug">{l.q}</p>
              <p className="text-sm text-gray-400 leading-relaxed"><span className="text-tv-teal font-bold">You say: </span>{l.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Earn() {
  const rows = [
    ['Advanced Panel','74 biomarkers','£269','£10','£20',false],
    ['Ultimate Panel','114 biomarkers','£349','£20','£40',true],
    ['Signature Panel','230 biomarkers','£799','£40','£80',false]
  ]
  return (
    <section id="earn" className="bg-white py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tv-teal-dark mb-4">What you earn</p>
        <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-[-0.035em] leading-[1.08] max-w-2xl">Paid on every test.<br />Not just the first.</h2>
        <p className="mt-6 text-gray-500 text-lg leading-relaxed max-w-2xl">Most referral programmes pay you once and forget you. Ours pays every time that client books again, for as long as they remain a customer.</p>

        <div className="mt-12 rounded-2xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200">
            {['Panel','Price','They save','You earn'].map((h,i)=>(
              <div key={i} className={`px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 ${i>0?'text-right':''}`}>{h}</div>
            ))}
          </div>
          {rows.map(([n,m,p,d,c,feat],i)=>(
            <div key={i} className={`grid grid-cols-4 items-center border-b border-gray-100 last:border-0 ${feat?'bg-tv-teal/5':''}`}>
              <div className="px-6 py-5"><b className="font-heading font-bold text-base block tracking-tight">{n}</b><span className="text-xs text-gray-400">{m}</span></div>
              <div className="px-6 py-5 text-right font-semibold">{p}</div>
              <div className="px-6 py-5 text-right font-semibold">{d}</div>
              <div className="px-6 py-5 text-right font-heading font-black text-xl text-tv-teal-dark tracking-tight">{c}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-400">If a client books a bigger panel than you recommended, your commission goes up to match.</p>

        <div className="mt-14 rounded-2xl bg-tv-dark p-8 sm:p-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tv-teal mb-3">The compounding bit</p>
          <h3 className="font-heading font-black text-white text-2xl sm:text-3xl tracking-tight mb-3">One conversation. Paid for years.</h3>
          <p className="text-gray-400 leading-relaxed max-w-xl mb-8">A client who tests once a year on Ultimate is £40 to you every year they keep going, from one conversation you had once.</p>
          <div className="space-y-2.5 max-w-lg">
            {[['Year 1',20,'£40'],['Year 2',40,'£80'],['Year 3',60,'£120'],['Year 4',80,'£160'],['Year 5',100,'£200']].map(([y,w,v],i)=>(
              <div key={i} className="flex items-center gap-4">
                <span className="w-14 text-[11px] font-bold text-gray-500 uppercase tracking-wider">{y}</span>
                <div className="h-8 rounded-lg bg-gradient-to-r from-tv-teal to-tv-teal/40" style={{width:`${w}%`}} />
                <b className="font-heading font-black text-white text-sm">{v}</b>
              </div>
            ))}
          </div>
          <div className="mt-9 grid sm:grid-cols-3 gap-3">
            {[['£400','10 Ultimate clients, per year'],['£800','20 Ultimate clients, per year'],['£1,600','20 Signature clients, per year']].map(([a,b],i)=>(
              <div key={i} className="rounded-xl bg-white/5 p-6 text-center">
                <div className="font-heading font-black text-3xl text-tv-teal tracking-[-0.04em]">{a}</div>
                <div className="text-[11px] text-gray-500 mt-2 leading-snug">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Band() {
  return (
    <section className="relative h-[340px] sm:h-[420px] overflow-hidden">
      <img src={IMG_HIKE} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-tv-dark/95 via-tv-dark/70 to-transparent" />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 h-full flex items-center">
        <div className="max-w-lg">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tv-teal mb-4">Paid for life</p>
          <h2 className="font-heading font-black text-white text-2xl sm:text-4xl tracking-[-0.035em] leading-tight">
            Your clients are going to test eventually. It may as well be with you.
          </h2>
        </div>
      </div>
    </section>
  )
}

function Steps() {
  const s = [
    ['Apply','Two minutes. We read every application and come back within a couple of working days.'],
    ['Get your portal','Once approved you get a login here. No password to remember, we email you a link each time.'],
    ['Refer a client','Enter their name and a code is created for that one person. Nothing is shared, nothing leaks, every booking tracked to you.'],
    ['Watch it land','Their booking appears in your dashboard within minutes. Request a payout once you pass £50.']
  ]
  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tv-teal-dark mb-4">How it works</p>
        <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-[-0.035em] leading-[1.08]">Four steps. No paperwork.</h2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {s.map(([t,d],i)=>(
            <div key={i} className="rounded-2xl bg-white border border-gray-100 p-7">
              <div className="w-11 h-11 rounded-xl bg-tv-teal text-tv-dark font-heading font-black text-lg flex items-center justify-center mb-5">{i+1}</div>
              <h3 className="font-heading font-bold text-lg tracking-tight mb-2.5">{t}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
//  APPLY FORM (public)
// ============================================================
function Apply() {
  const [type, setType] = useState(null)
  const [f, setF] = useState({ name:'', email:'', business_name:'', phone:'', website:'', description:'' })
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [done, setDone] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = async () => {
    if (!type) { setErr('Choose what kind of partner you are'); return }
    if (!f.name.trim()) { setErr('Enter your name'); return }
    if (!f.email.includes('@')) { setErr('Enter a valid email address'); return }
    setBusy(true); setErr('')
    try {
      const r = await fetch(WORKER + '/partner-apply', {
        method:'POST', mode:'cors', credentials:'omit',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ ...f, partner_type: type })
      })
      if (r.status === 409) throw new Error('There is already an application under that email. We will be in touch.')
      if (!r.ok) throw new Error('Something went wrong. Try again, or email partners@truevitals.co.uk')
      setDone(true)
    } catch (e) { setErr(e.message) }
    setBusy(false)
  }

  const inp = "w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-tv-teal transition-colors"

  return (
    <section id="apply" className="bg-white py-20 sm:py-28 border-t border-gray-100">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tv-teal-dark mb-4">Apply</p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl tracking-[-0.035em]">Join the programme</h2>
          <p className="mt-4 text-gray-500">Free to join. No minimum, no contract, nothing to pay.</p>
        </div>

        {done ? (
          <div className="rounded-2xl border border-tv-teal/30 bg-tv-teal/5 p-12 text-center">
            <div className="w-14 h-14 rounded-full bg-tv-teal/15 text-tv-teal-dark text-2xl flex items-center justify-center mx-auto mb-5">✓</div>
            <h3 className="font-heading font-bold text-xl mb-2.5">Application received</h3>
            <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">We review every application by hand and will be in touch within a couple of working days.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 p-7 sm:p-9">
            {err && <div className="mb-6 px-4 py-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">{err}</div>}

            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">What kind of partner are you?</label>
            <div className="grid sm:grid-cols-3 gap-2.5 mb-6">
              {[['fitness','Fitness','Trainer, gym, coach'],['clinical','Clinical','GP, clinic, nutritionist'],['affiliate','Affiliate','Audience or community']].map(([v,t,d])=>(
                <button key={v} onClick={()=>setType(v)}
                  className={`px-4 py-3.5 rounded-xl border text-left transition-colors ${type===v?'border-tv-teal bg-tv-teal/5':'border-gray-200 hover:border-gray-300'}`}>
                  <span className={`block text-sm font-bold ${type===v?'text-tv-teal-dark':''}`}>{t}</span>
                  <span className="block text-[11px] text-gray-400 mt-0.5">{d}</span>
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <input className={inp} placeholder="Your name" value={f.name} onChange={set('name')} />
              <input className={inp} placeholder="Email" type="email" value={f.email} onChange={set('email')} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <input className={inp} placeholder="Business name (optional)" value={f.business_name} onChange={set('business_name')} />
              <input className={inp} placeholder="Phone (optional)" value={f.phone} onChange={set('phone')} />
            </div>
            <input className={inp + ' mb-3'} placeholder="Website or social (optional)" value={f.website} onChange={set('website')} />
            <textarea className={inp + ' min-h-28 resize-y leading-relaxed'} placeholder="Tell us about your business. Who do you work with, and why would blood testing help them?" value={f.description} onChange={set('description')} />

            <button onClick={submit} disabled={busy}
              className="w-full mt-5 py-4 rounded-xl bg-tv-teal text-tv-dark font-bold text-sm hover:bg-tv-teal-dark transition-colors disabled:opacity-50">
              {busy ? 'Sending…' : 'Submit application'}
            </button>
            <p className="text-xs text-gray-400 text-center mt-4">We&rsquo;ll email you either way. No obligation.</p>
          </div>
        )}
      </div>
    </section>
  )
}

// ============================================================
//  RESOURCES — public preview and full version when signed in
// ============================================================
function Resources({ signedIn }) {
  const items = [
    { t:'Partner pack', d:'The full programme explained. Print it, share it, or read it on your phone.', a:'Download PDF', href:'https://truevitals.co.uk/assets/truevitals-partner-programme.pdf', gated:false },
    { t:'Panel comparison', d:'Advanced, Ultimate and Signature side by side, with what each one measures.', a:'View', href:'https://truevitals.co.uk/panels', gated:false },
    { t:'Example report', d:'What your client actually receives. Thirty pages, plain English, every marker explained.', a:'View', href:'https://truevitals.co.uk/our-report', gated:false },
    { t:'Logo pack', d:'PNG and SVG, light and dark. For your website, emails and socials.', a:'Download', href:'#', gated:true },
    { t:'Client one-pager', d:'A single page you can hand to a client or attach to an email.', a:'Download', href:'#', gated:true },
    { t:'Social templates', d:'Ready-made posts and stories you can drop your code into.', a:'Download', href:'#', gated:true }
  ]
  return (
    <section id="resources" className={signedIn ? '' : 'bg-gray-50 py-20 sm:py-28'}>
      <div className={signedIn ? '' : 'max-w-6xl mx-auto px-5 sm:px-8'}>
        {!signedIn && <>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tv-teal-dark mb-4">Resources</p>
          <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-[-0.035em] leading-[1.08]">Everything you need,<br />ready to go.</h2>
          <p className="mt-6 text-gray-500 text-lg leading-relaxed max-w-2xl">Approved partners get the full kit. Some of it is open to everyone, so you can see exactly what you would be recommending before you apply.</p>
        </>}
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 ${signedIn?'':'mt-12'}`}>
          {items.map((it,i)=>{
            const locked = it.gated && !signedIn
            return (
              <a key={i} href={locked ? '#apply' : it.href} target={locked?'_self':'_blank'} rel="noopener"
                className={`rounded-2xl border p-7 transition-colors block ${locked?'border-gray-100 bg-gray-50/50':'border-gray-100 bg-white hover:border-tv-teal/40'}`}>
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${locked?'bg-gray-100 text-gray-400':'bg-tv-teal/10 text-tv-teal-dark'}`}>
                    {locked ? '🔒' : '↓'}
                  </div>
                  {locked && <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Partners only</span>}
                </div>
                <h3 className="font-heading font-bold text-base tracking-tight mb-2">{it.t}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{it.d}</p>
                <span className={`text-xs font-bold ${locked?'text-gray-400':'text-tv-teal-dark'}`}>{locked ? 'Apply to unlock' : it.a + ' →'}</span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const qs = [
    ['Does it cost anything to join?','No. There is no fee, no minimum number of referrals, and no contract tying you in. If it does not work for you, stop using your code.'],
    ['How and when do I get paid?','Commission is credited as soon as an order completes. Once you pass £50 you can request a payout from your dashboard, and we pay by bank transfer within five working days. You are responsible for declaring the income.'],
    ['I\'m a clinician. Is a referral fee appropriate?','That is your call and depends on your regulator. GMC-registered doctors must declare financial interests when recommending a service. If you would rather not take a fee, we can set you up as a reciprocal partner: you refer patients to us, we refer customers to you, and no money changes hands.'],
    ['Do you send business back to clinical partners?','Yes. When a customer\'s results need clinical input beyond what a report can give, we point them towards partners in their area with the relevant specialism.'],
    ['What do I actually give my clients?','A code, created for that one person, and a link. Your dashboard has a logo pack, a one-page explainer and a panel comparison.']
  ]
  const [open, setOpen] = useState(null)
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <h2 className="font-heading font-black text-3xl sm:text-4xl tracking-[-0.035em] mb-10">Common questions</h2>
        {qs.map(([q,a],i)=>(
          <div key={i} className="border-b border-gray-100">
            <button onClick={()=>setOpen(open===i?null:i)} className="w-full py-5 flex items-center justify-between gap-6 text-left group">
              <span className="font-semibold text-[15px] group-hover:text-tv-teal-dark transition-colors">{q}</span>
              <span className={`shrink-0 w-7 h-7 rounded-full bg-tv-teal/10 text-tv-teal-dark flex items-center justify-center text-lg font-light transition-transform ${open===i?'rotate-45':''}`}>+</span>
            </button>
            {open===i && <p className="pb-5 text-sm text-gray-500 leading-relaxed">{a}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

function Foot() {
  return (
    <footer className="bg-tv-dark py-14">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <img src={LOGO} alt="TrueVitals" className="h-8 w-auto mb-6" />
        <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-gray-400 mb-8">
          <a href="https://truevitals.co.uk" className="hover:text-tv-teal transition-colors">Main site</a>
          <a href="https://truevitals.co.uk/panels" className="hover:text-tv-teal transition-colors">Panels</a>
          <a href="mailto:partners@truevitals.co.uk" className="hover:text-tv-teal transition-colors">partners@truevitals.co.uk</a>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed max-w-3xl">
          TrueVitals Group Ltd, registered in England and Wales, company number 16449605. Registered office: Ground Floor, Rear Barn, The Brookdale Centre, Knutsford, Cheshire, WA16 0SR. Commission rates correct at time of publication and may be reviewed with notice. Blood testing is not a substitute for medical advice. Partners are responsible for declaring commission income to HMRC.
        </p>
      </div>
    </footer>
  )
}

// ============================================================
//  SIGN IN MODAL
// ============================================================
function SignIn({ open, onClose }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  if (!open) return null

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-sm bg-tv-dark border border-white/10 rounded-2xl p-8" onClick={e=>e.stopPropagation()}>
        {sent ? (
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-tv-teal/15 text-tv-teal flex items-center justify-center mx-auto mb-4 text-xl">✓</div>
            <h3 className="font-heading font-bold text-white mb-2">Check your email</h3>
            <p className="text-sm text-gray-400 leading-relaxed">We&rsquo;ve sent a sign-in link to {email}. It&rsquo;s valid for one hour.</p>
          </div>
        ) : (
          <>
            <h3 className="font-heading font-bold text-white text-xl mb-1.5">Partner sign in</h3>
            <p className="text-sm text-gray-400 mb-6">No password needed. We&rsquo;ll email you a link.</p>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}
              placeholder="you@business.com" autoFocus
              className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm outline-none focus:border-tv-teal transition-colors" />
            {err && <p className="text-red-400 text-xs mt-2.5">{err}</p>}
            <button onClick={send} disabled={busy}
              className="w-full mt-4 py-3.5 rounded-xl bg-tv-teal text-tv-dark font-bold text-sm hover:bg-tv-teal-dark transition-colors disabled:opacity-50">
              {busy ? 'Sending…' : 'Email me a link'}
            </button>
            <p className="text-xs text-gray-600 mt-5 text-center">
              Not a partner yet? <a href="#apply" onClick={onClose} className="text-tv-teal hover:underline">Apply here</a>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

// ============================================================
//  MARKETING SITE
// ============================================================
function Marketing() {
  const [signIn, setSignIn] = useState(false)
  return (
    <div className="bg-white">
      <Nav onSignIn={()=>setSignIn(true)} />
      <Hero />
      <Why />
      <HowToSell />
      <Earn />
      <Band />
      <Steps />
      <Resources signedIn={false} />
      <Apply />
      <Faq />
      <Foot />
      <SignIn open={signIn} onClose={()=>setSignIn(false)} />
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
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="TrueVitals" className="h-7 w-auto" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">Partner</span>
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

  if (!session) return <Marketing />
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
      <div className="mt-6">
        <h2 className="font-heading font-bold text-gray-900 mb-1">Resources</h2>
        <p className="text-xs text-gray-400 mb-4">Everything you need to introduce TrueVitals to your clients</p>
        <Resources signedIn={true} />
      </div>
    </Shell>
  )
}
