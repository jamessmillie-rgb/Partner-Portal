import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)

const WORKER = 'https://truevitals-stripe-webhook.james-smillie-8c6.workers.dev'
const LOGO = 'https://cdn.prod.website-files.com/6825a8869d9afdbdbc4d8881/68500823ebf7f5e6d4b298f9_Copy%20of%20TrueVitals%20Inverse.png'
const IMG_GYM = 'https://cdn.prod.website-files.com/6825a8869d9afdbdbc4d8881/684748d492723b166ebf1973_gym.jpg'
const IMG_HERO = 'https://cdn.prod.website-files.com/6825a8869d9afdbdbc4d8881/6a85f89c6bd497fdb00d29da_Gemini_Generated_Image_wdxwy1wdxwy1wdxw.webp'
const TRUSTPILOT = 'https://uk.trustpilot.com/review/truevitals.co.uk'
const IMG_YOGA = 'https://cdn.prod.website-files.com/6825a8869d9afdbdbc4d8881/684748d55c72d057d0ab48ee_man-yoga-p-1600.jpg'
const IMG_BOWL = 'https://cdn.prod.website-files.com/6825a8869d9afdbdbc4d8881/684748d64d408f486a9e2f47_healthy-bowl-p-1600.jpg'
const IMG_MED  = 'https://cdn.prod.website-files.com/6825a8869d9afdbdbc4d8881/684748d56f604078858be7f7_man-meditating-p-1600.avif'
const IMG_FRIENDS = 'https://cdn.prod.website-files.com/6825a8869d9afdbdbc4d8881/684748d7020515eb7456f600_friends-laughing-p-2000.avif'
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
          <a href="https://truevitals.co.uk" target="_blank" rel="noopener" className="hidden sm:block px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Main site</a>
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
        <img src={IMG_HERO} alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-tv-dark via-tv-dark/80 to-transparent" />
        <div className="absolute inset-0 lg:hidden bg-tv-dark/55" />
      </div>
      <div className="absolute -top-40 left-1/4 w-[700px] h-[560px] rounded-full bg-tv-teal/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-24 pb-24 sm:pt-32 sm:pb-32">
        <span className="inline-block px-3.5 py-1.5 rounded-full bg-tv-teal/10 text-tv-teal text-[11px] font-bold uppercase tracking-[0.18em] mb-7">Partner Programme</span>
        <h1 className="font-heading font-black text-white leading-[1.02] tracking-[-0.045em] text-[2.6rem] sm:text-6xl lg:text-7xl max-w-4xl">
          The test your clients<br className="hidden sm:block" /> already want.<br />
          <span className="text-tv-teal">Get paid every time.</span>
        </h1>
        <p className="mt-7 text-gray-300 text-lg leading-relaxed max-w-xl">
          Refer your clients, patients or audience to the UK&rsquo;s most comprehensive blood testing. They get money off. You get paid on every test they ever book, not just the first.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="#apply" className="px-7 py-3.5 rounded-xl bg-tv-teal text-tv-dark font-bold text-sm hover:bg-tv-teal-dark transition-all hover:-translate-y-0.5">Apply in two minutes</a>
          <a href="#earn" className="px-7 py-3.5 rounded-xl border-2 border-white/20 text-white font-bold text-sm hover:border-tv-teal hover:text-tv-teal transition-colors">See what you earn</a>
          <a href="https://truevitals.co.uk/our-report" target="_blank" rel="noopener" className="px-5 py-3.5 text-white/70 font-bold text-sm hover:text-tv-teal transition-colors">View a real report &rarr;</a>
        </div>
        <a href={TRUSTPILOT} target="_blank" rel="noopener" className="mt-8 inline-flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors group">
          <span className="flex gap-0.5">{[0,1,2,3,4].map(i=>(
            <svg key={i} viewBox="0 0 24 24" className="w-4 h-4 fill-tv-teal"><path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7L12 17.5 5.8 21.2l1.6-7L2 9.5l7.1-.6L12 2z"/></svg>
          ))}</span>
          <span>Rated <b className="text-white font-semibold">Excellent</b> on Trustpilot</span>
          <span className="text-tv-teal group-hover:translate-x-0.5 transition-transform">&rarr;</span>
        </a>

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 backdrop-blur">
          {[['£20','Advanced'],['£40','Ultimate'],['£80','Signature'],['∞','Paid for life']].map(([a,b],i)=>(
            <div key={i} className="bg-tv-dark/85 px-6 py-7">
              <div className="font-heading font-black text-3xl text-tv-teal tracking-[-0.04em] leading-none">{a}</div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mt-2.5">{b}</div>
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
    { t: 'They are already spending on health', d: 'Supplements, coaching, wearables, therapies, recovery. Most of it bought on guesswork. Blood work is the only thing on that list that tells them whether any of it is working.' },
    { t: 'They trust you, not an advert', d: 'This is the whole thing. A recommendation from someone whose judgement they already rely on converts in a way no advert ever will, whether you are their trainer, their clinician, or someone whose content they follow.' },
    { t: 'It makes you better at what you do', d: 'Someone who tests gives you something real to work from. You stop guessing at why they are tired or why progress has stalled, and start from actual numbers.' }
  ]
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tv-teal-dark mb-4">Why it works</p>
        <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-[-0.035em] leading-[1.08] max-w-2xl">You are not selling them anything new.</h2>
        <p className="mt-6 text-gray-500 text-lg leading-relaxed max-w-2xl">The people who trust you are already tracking sleep, training and diet, and already spending on their health. Blood work is the one measurement most of them are missing.</p>
        <div className="mt-12 grid lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-2 rounded-2xl overflow-hidden h-[280px] lg:h-[560px]">
            <img src={IMG_YOGA} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
            {items.map((it,i)=>(
              <div key={i} className="rounded-2xl border border-gray-100 p-7 hover:border-tv-teal/40 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-tv-teal/10 text-tv-teal-dark flex items-center justify-center font-bold mb-5">✓</div>
                <h3 className="font-heading font-bold text-lg tracking-tight mb-2.5">{it.t}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function HowToSell() {
  const lines = [
    { q: '"I\'m always exhausted, no matter how much I sleep."', a: 'That could be a dozen things and most of them show up on a blood test. Ferritin, thyroid, B12, vitamin D. Worth finding out rather than guessing.' },
    { q: '"I\'ve been doing everything right and nothing\'s changing."', a: 'Before changing anything else, it is worth seeing what is going on underneath. Insulin, thyroid and inflammation all affect this and none of them are visible from the outside.' },
    { q: '"Should I be taking anything?"', a: 'Honestly, I would test first. Half the people who take supplements do not need them and the other half are missing the one that would help.' },
    { q: '"My doctor said everything was fine."', a: 'A standard NHS panel is about fifteen markers. This is a hundred and fourteen. Being told nothing is wrong is not the same as nothing being wrong.' }
  ]
  return (
    <section className="bg-tv-dark py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tv-teal mb-4">How to introduce it</p>
        <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-[-0.035em] leading-[1.08] text-white max-w-2xl">Do not sell it.<br />Recommend it.</h2>
        <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-2xl">Client, patient or audience, the worst thing you can do is pitch. The best thing you can do is raise it when it is obviously relevant, which happens more often than you think.</p>
        <div className="mt-10 grid grid-cols-3 gap-3">
          {[IMG_BOWL, IMG_MED, IMG_FRIENDS].map((im,i)=>(
            <div key={i} className="rounded-2xl overflow-hidden h-32 sm:h-44">
              <img src={im} alt="" className="w-full h-full object-cover opacity-80" />
            </div>
          ))}
        </div>
        <div className="mt-8 space-y-3">
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
    ['Advanced Panel','74 biomarkers','£269','£10','£20',false,'/advanced-panel'],
    ['Ultimate Panel','114 biomarkers','£349','£20','£40',true,'/ultimate-panel'],
    ['Signature Panel','230 biomarkers','£799','£40','£80',false,'/signature-panel']
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
          {rows.map(([n,m,p,d,c,feat,href],i)=>(
            <div key={i} className={`grid grid-cols-4 items-center border-b border-gray-100 last:border-0 ${feat?'bg-tv-teal/5':''}`}>
              <div className="px-6 py-5">
                <a href={'https://truevitals.co.uk'+href} target="_blank" rel="noopener" className="font-heading font-bold text-base block tracking-tight hover:text-tv-teal-dark transition-colors">{n} <span className="text-tv-teal-dark font-normal">&#8599;</span></a>
                <span className="text-xs text-gray-400">{m}</span>
              </div>
              <div className="px-6 py-5 text-right font-semibold">{p}</div>
              <div className="px-6 py-5 text-right font-semibold">{d}</div>
              <div className="px-6 py-5 text-right font-heading font-black text-xl text-tv-teal-dark tracking-tight">{c}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-400">If a client books a bigger panel than you recommended, your commission goes up to match.</p>

        <div className="mt-14 rounded-2xl bg-tv-dark p-8 sm:p-11 relative overflow-hidden">
          <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-tv-teal/8 blur-3xl pointer-events-none" />
          <div className="relative">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tv-teal mb-3">Earning potential</p>
            <h3 className="font-heading font-black text-white text-2xl sm:text-4xl tracking-[-0.035em] leading-tight max-w-2xl">
              Ten referrals a month.<br />Here is what that becomes.
            </h3>
            <p className="mt-5 text-gray-400 leading-relaxed max-w-xl">
              Most customers retest every six months, so a client you refer in January tests again in July. Your commission is paid on both. Refer ten a month and the maths compounds fast.
            </p>

            <div className="mt-10 grid md:grid-cols-2 gap-4">
              {[
                { n:'Ultimate Panel', c:'£40', y1:'£7,200', ss:'£9,600', t:'180' },
                { n:'Signature Panel', c:'£80', y1:'£14,400', ss:'£19,200', t:'180' }
              ].map((p,i)=>(
                <div key={i} className="rounded-2xl bg-white/[0.04] border border-white/10 p-7">
                  <div className="flex items-baseline justify-between mb-7">
                    <h4 className="font-heading font-bold text-white text-lg tracking-tight">{p.n}</h4>
                    <span className="text-xs font-bold text-tv-teal">{p.c} per test</span>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Year one</p>
                  <div className="font-heading font-black text-tv-teal text-5xl sm:text-6xl tracking-[-0.045em] leading-none mb-2">{p.y1}</div>
                  <p className="text-xs text-gray-500 mb-7">120 clients referred &middot; {p.t} tests completed</p>
                  <div className="pt-6 border-t border-white/10">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-gray-400">Year two onwards</span>
                      <span className="font-heading font-bold text-white text-2xl tracking-tight">{p.ss}</span>
                    </div>
                    <p className="text-[11px] text-gray-600 mt-1.5">Once every client is on a six-month cycle</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-tv-teal/10 border border-tv-teal/20 p-6">
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="text-tv-teal font-bold">Year one is the conservative number.</span> A client referred in October has not reached their six-month retest by December, so they only count once. From year two everyone is on cycle, which is where the higher figure comes from.
              </p>
            </div>

            <p className="mt-6 text-xs text-gray-600 leading-relaxed max-w-2xl">
              Illustrative, based on ten referrals a month and a six-month retest cadence. Actual earnings depend on how many clients book and how often they return. Nothing here is a guarantee.
            </p>
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
function SeeIt() {
  const links = [
    { t:'An actual report', d:'Every marker explained in plain English and cross-referenced against the rest. This is what lands in your client\u2019s inbox.', a:'View a real report', href:'/our-report', big:true },
    { t:'Compare the panels', d:'Advanced, Ultimate and Signature side by side, with exactly what each one measures.', a:'See all panels', href:'/panels' },
    { t:'Find a clinic', d:'103 UK clinics plus at-home visits in 200+ areas. Check there is one near your clients.', a:'Search by postcode', href:'/find-a-clinic' },
    { t:'Why we exist', d:'James was told it was in his head. One comprehensive test found a hormone at twice the upper limit.', a:'Read the story', href:'/about' },
    { t:'How we compare', d:'Honest comparison against Medichecks, Thriva, Randox and the rest. We include where they beat us.', a:'Read the comparison', href:'/uk-blood-test-companies-compared' },
    { t:'What customers say', d:'Rated Excellent on Trustpilot. Read what people say about the report, the clinics and the follow-up.', a:'Read the reviews', href:'TP' }
  ]
  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tv-teal-dark mb-4">See it for yourself</p>
        <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-[-0.035em] leading-[1.08] max-w-2xl">Do not take our word for it.</h2>
        <p className="mt-6 text-gray-500 text-lg leading-relaxed max-w-2xl">
          You are putting your name to this, so look at it properly first. Everything below is open, no sign-up needed.
        </p>

        <div className="mt-12 grid lg:grid-cols-3 gap-5">
          <a href={'https://truevitals.co.uk'+links[0].href} target="_blank" rel="noopener"
             className="lg:row-span-2 rounded-2xl bg-tv-dark p-8 sm:p-10 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute -bottom-24 -right-20 w-72 h-72 rounded-full bg-tv-teal/10 blur-3xl" />
            <div className="relative">
              <span className="inline-block px-3 py-1.5 rounded-full bg-tv-teal/15 text-tv-teal text-[10px] font-bold uppercase tracking-[0.14em] mb-7">Start here</span>
              <h3 className="font-heading font-black text-white text-2xl sm:text-3xl tracking-tight mb-4 leading-tight">{links[0].t}</h3>
              <p className="text-gray-400 leading-relaxed">{links[0].d}</p>
            </div>
            <span className="relative mt-10 inline-flex items-center gap-2 text-tv-teal font-bold text-sm group-hover:gap-3 transition-all">{links[0].a} &rarr;</span>
          </a>

          {links.slice(1).map((l,i)=>(
            <a key={i} href={l.href==='TP' ? TRUSTPILOT : 'https://truevitals.co.uk'+l.href} target="_blank" rel="noopener"
               className="rounded-2xl bg-white border border-gray-100 p-7 hover:border-tv-teal/40 transition-colors group">
              <h3 className="font-heading font-bold text-lg tracking-tight mb-2.5">{l.t}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">{l.d}</p>
              <span className="inline-flex items-center gap-1.5 text-tv-teal-dark font-bold text-xs group-hover:gap-2.5 transition-all">{l.a} &rarr;</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

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
              {[['fitness','Fitness','Trainer, gym, coach'],['clinical','Clinical','GP, clinic, nutritionist'],['affiliate','Audience','Creator, community, brand']].map(([v,t,d])=>(
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
    { t:'How we compare', d:'Honest comparison against the other UK providers, including where they beat us.', a:'Read it', href:'https://truevitals.co.uk/uk-blood-test-companies-compared', gated:false },
    { t:'Panel comparison', d:'Advanced, Ultimate and Signature side by side, with what each one measures.', a:'View', href:'https://truevitals.co.uk/panels', gated:false },
    { t:'Example report', d:'What your client actually receives. Plain English, every marker explained.', a:'View', href:'https://truevitals.co.uk/our-report', gated:false },
    { t:'Logo pack', d:'PNG and SVG, light and dark. For your website, emails and socials.', a:'Coming soon', href:'#', gated:true },
    { t:'Client one-pager', d:'A single page you can hand over or attach to an email.', a:'Coming soon', href:'#', gated:true },
    { t:'Social templates', d:'Ready-made posts you can drop your code into.', a:'Coming soon', href:'#', gated:true }
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
          {[['Main site','https://truevitals.co.uk'],['Panels','https://truevitals.co.uk/panels'],['Example report','https://truevitals.co.uk/our-report'],['Find a clinic','https://truevitals.co.uk/find-a-clinic'],['Our story','https://truevitals.co.uk/about'],['Trustpilot','https://uk.trustpilot.com/review/truevitals.co.uk'],['partners@truevitals.co.uk','mailto:partners@truevitals.co.uk']].map(([t,h],i)=>(
            <a key={i} href={h} target="_blank" rel="noopener" className="hover:text-tv-teal transition-colors">{t}</a>
          ))}
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
      options: { emailRedirectTo: window.location.origin, shouldCreateUser: false }
    })
    setBusy(false)
    if (error) {
      const notFound = /not found|signups not allowed|not authorized|Invalid login/i.test(error.message)
      setErr(notFound ? 'notfound' : error.message)
    } else setSent(true)
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
            <p className="text-sm text-gray-400 mb-6">For approved partners. No password &mdash; we email you a link.</p>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}
              placeholder="you@business.com" autoFocus
              className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm outline-none focus:border-tv-teal transition-colors" />
            {err === 'notfound' ? (
              <div className="mt-3 px-3.5 py-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-gray-300 mb-1">No partner account with that email.</p>
                <p className="text-xs text-gray-500 leading-relaxed">Sign in is for approved partners. If you have applied and not heard back, we will email you as soon as it is reviewed.</p>
                <a href="#apply" onClick={onClose} className="inline-block mt-2.5 text-xs font-bold text-tv-teal hover:underline">Apply to join &rarr;</a>
              </div>
            ) : err ? <p className="text-red-400 text-xs mt-2.5">{err}</p> : null}
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
      <SeeIt />
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
    if (!email.trim() || email.indexOf('@') < 1) { setErr('Enter your client\u2019s email address'); return }
    setBusy(true); setErr('')
    try {
      const res = await fetch(WORKER + '/partner-refer', {
        method: 'POST', mode: 'cors', credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auth_user_id: partner.auth_user_id,
          customer_name: name.trim(),
          customer_email: email.trim().toLowerCase(),
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
          Enter their email and we&rsquo;ll create a code just for them. They get money off, you get paid when they book.
        </p>

        {err && <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm">{err}</div>}

        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Client email" type="email"
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm outline-none focus:border-tv-teal transition-colors" />
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Their name (optional)"
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
//  PAYOUT — Stripe Connect
// ============================================================
function Payout({ partner, referrals, payouts, onRefresh }) {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const ready = referrals.filter(r => r.status === 'confirmed')
  const owed = ready.reduce((s, r) => s + (r.commission_pence || 0), 0)
  const paid = payouts.filter(p => p.status === 'paid')

  // Check status when returning from Stripe
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('connect')) {
      fetch(WORKER + '/partner-connect-status', {
        method:'POST', mode:'cors', credentials:'omit',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ auth_user_id: partner.auth_user_id })
      }).then(()=>{ window.history.replaceState({}, '', window.location.pathname); onRefresh() })
    }
  }, [])

  if ((partner.commission_pence || 0) === 0 && !partner.payouts_enabled) return null

  const connect = async () => {
    setBusy(true); setErr('')
    try {
      const r = await fetch(WORKER + '/partner-connect', {
        method:'POST', mode:'cors', credentials:'omit',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ auth_user_id: partner.auth_user_id, return_url: window.location.origin })
      })
      const d = await r.json()
      if (d.error) throw new Error(d.error)
      window.location.href = d.url
    } catch (e) { setErr(e.message || 'Could not start setup'); setBusy(false) }
  }

  // --- Not set up yet ---
  if (!partner.payouts_enabled) return (
    <div className="rounded-2xl border-2 border-tv-teal/30 bg-tv-teal/[0.04] p-6 sm:p-8 mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div className="max-w-lg">
          <h2 className="font-heading font-bold text-gray-900 text-lg mb-1.5">
            {partner.stripe_account_id ? 'Finish setting up payouts' : 'Set up payouts'}
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            {owed > 0
              ? `You have ${gbp(owed)} waiting. Set up payouts and we'll send it.`
              : 'Do this now so your first commission can be paid without delay.'}
            {' '}Takes about five minutes. Stripe handles it securely and we never see your bank details.
          </p>
          {partner.connect_requirements && (
            <p className="text-xs text-amber-600 mt-3">Stripe still needs: {partner.connect_requirements}</p>
          )}
          {err && <p className="text-xs text-red-600 mt-3">{err}</p>}
        </div>
        <button onClick={connect} disabled={busy}
          className="shrink-0 px-7 py-3.5 rounded-xl bg-tv-teal text-tv-dark font-bold text-sm hover:bg-tv-teal-dark transition-colors disabled:opacity-50">
          {busy ? 'Opening…' : partner.stripe_account_id ? 'Continue setup' : 'Set up payouts'}
        </button>
      </div>
    </div>
  )

  // --- Live ---
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 mt-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-tv-teal" />
            <h2 className="font-heading font-bold text-gray-900 text-lg">Payouts active</h2>
          </div>
          {owed > 0 ? (
            <p className="text-sm text-gray-500 leading-relaxed max-w-md">
              <b className="text-gray-900">{gbp(owed)}</b> across {ready.length} referral{ready.length===1?'':'s'} will be sent in the next payment run. Payments go out monthly, straight to your bank.
            </p>
          ) : (
            <p className="text-sm text-gray-500 max-w-md">Nothing owed right now. Anything you earn is paid automatically in the next monthly run.</p>
          )}
          <p className="text-xs text-gray-400 mt-3">We self-bill, so there is no invoice for you to send.</p>
        </div>
        {owed > 0 && <div className="shrink-0 text-right">
          <div className="font-heading font-black text-3xl text-tv-teal tracking-tight">{gbp(owed)}</div>
          <div className="text-[11px] text-gray-400 mt-1">next payment</div>
        </div>}
      </div>

      {paid.length > 0 && (
        <div className="mt-7 pt-6 border-t border-gray-50">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3">Payment history</p>
          {paid.map(p => (
            <div key={p.id} className="flex items-center justify-between py-2 text-sm">
              <div>
                <span className="text-gray-600">{fmtDate(p.paid_at)}</span>
                {p.reference && <span className="font-mono text-xs text-gray-400 ml-3">{p.reference}</span>}
              </div>
              <span className="font-heading font-bold text-gray-900">{gbp(p.amount_pence)}</span>
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
    { name: 'Example report', desc: 'What your client actually receives', href: 'https://truevitals.co.uk/our-report' },
    { name: 'Panel comparison', desc: 'Advanced, Ultimate and Signature side by side', href: 'https://truevitals.co.uk/panels' },
    { name: 'How we compare', desc: 'Honest comparison against other UK providers', href: 'https://truevitals.co.uk/uk-blood-test-companies-compared' }
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
//  WHAT TO SEND — pre-written, code inserted, one tap to copy
// ============================================================
function Scripts({ partner, referrals }) {
  const [tab, setTab] = useState('message')
  const [copied, setCopied] = useState(null)

  // Use their most recent unused code if there is one, otherwise a placeholder
  const latest = referrals.find(r => r.status === 'pending' && r.referral_code)
  const CODE = latest ? latest.referral_code : '[YOUR CODE]'
  const NAME = latest ? (latest.customer_first_name || 'there') : '[NAME]'

  const copy = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id); setTimeout(() => setCopied(null), 2000)
    })
  }

  const T = {
    message: [
      { label: 'The straightforward one', body:
`Hi ${NAME}, I mentioned getting some blood work done. I use TrueVitals — they test up to 230 markers from one blood draw at a clinic near you, and the report actually explains what everything means rather than just giving you numbers.

Have a look: truevitals.co.uk

I've got you a code that takes money off — ${CODE} — just enter it at checkout. Happy to go through the results with you when they land.` },

      { label: 'When they are stuck', body:
`Hi ${NAME}, thinking about what we talked about. Before we change anything else, I reckon it's worth seeing what's actually going on underneath — thyroid, iron, inflammation, insulin. None of it shows from the outside.

TrueVitals do a proper panel at a clinic near you: truevitals.co.uk

Use ${CODE} at checkout for money off. Send me the report when it comes through and we'll work from real numbers.` },

      { label: 'When their GP said fine', body:
`Hi ${NAME}, on what you said about your GP — a standard NHS panel is usually about fifteen markers. Being told nothing's wrong isn't quite the same as nothing being wrong.

TrueVitals test up to 230: truevitals.co.uk

Code ${CODE} takes money off. Worth knowing rather than wondering.` }
    ],

    email: [
      { label: 'Introducing it', subject: 'The blood test I mentioned', body:
`Hi ${NAME},

Following up on what we discussed.

The company I use is TrueVitals. A few things that made me pick them:

• Proper venous blood draw at a clinic, or a nurse at your home. Not a finger-prick kit through the post.
• Up to 230 biomarkers depending on the panel, processed by UKAS-accredited UK labs.
• The report explains what each result means and how they relate to each other, in plain English. Every one is reviewed by a medical professional before it goes out.

Have a look at an example report here: truevitals.co.uk/our-report
And the panels here: truevitals.co.uk/panels

I've arranged a code for you — ${CODE} — enter it at checkout and it comes off the price.

Once the results are in, send them over and we'll go through them together.

Best,
${partner.name || ''}` },

      { label: 'After a consultation', subject: 'Worth testing before we go further', body:
`Hi ${NAME},

Thanks for your time today.

Before we go any further I'd suggest getting a proper blood panel done. A lot of what we talked about — energy, recovery, how you're responding to what you're already doing — is measurable, and right now we're working from how you feel rather than what's actually happening.

I use TrueVitals. Clinic appointment near you, results in a few days, and a report that explains everything rather than just listing numbers.

truevitals.co.uk/panels

Your code is ${CODE}, which takes money off at checkout.

Send me the report when it lands and we'll build the next stage around it.

Best,
${partner.name || ''}` }
    ],

    social: [
      { label: 'Short post', body:
`Most people have never had proper blood work done.

Not the fifteen markers your GP runs. Up to 230 — thyroid, iron, hormones, inflammation, metabolic health, the lot. One appointment, one report that actually explains what it all means.

I've partnered with TrueVitals so anyone here can get money off. Drop me a message and I'll sort you a code.

truevitals.co.uk` },

      { label: 'Story or caption', body:
`If you're tired all the time, or doing everything right and nothing's shifting, it's worth finding out why rather than guessing.

Blood work tells you. TrueVitals test up to 230 markers from one draw and explain every single one.

Message me for a code — it takes money off.` }
    ]
  }

  const tabs = [['message','Text or WhatsApp'],['email','Email'],['social','Social']]

  return (
    <div className="mt-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
        <div>
          <h2 className="font-heading font-bold text-gray-900">What to send</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {latest
              ? <>Written for you with <span className="font-mono text-gray-600">{CODE}</span> already in. Tap to copy, edit anything you like.</>
              : <>Refer a client above and your code drops into these automatically.</>}
          </p>
        </div>
        <div className="flex gap-2">
          {tabs.map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${tab===k?'bg-tv-dark text-white':'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'}`}>{l}</button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {T[tab].map((t,i)=>{
          const full = t.subject ? `Subject: ${t.subject}\n\n${t.body}` : t.body
          const id = tab + i
          return (
            <div key={id} className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50">
                <div>
                  <span className="text-sm font-bold text-gray-900">{t.label}</span>
                  {t.subject && <span className="block text-[11px] text-gray-400 mt-0.5">Subject: {t.subject}</span>}
                </div>
                <button onClick={()=>copy(full,id)}
                  className={`shrink-0 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${copied===id?'bg-tv-teal text-tv-dark':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {copied===id ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="px-5 py-4 text-[13px] text-gray-600 leading-relaxed whitespace-pre-wrap font-sans">{t.body}</pre>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-gray-400 mt-4 leading-relaxed">
        Change these however you like &mdash; they sound better in your own words. Two things to keep: do not promise a test will find anything specific, and do not suggest it replaces seeing a doctor.
      </p>
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
      <Payout partner={partner} referrals={referrals} payouts={payouts} onRefresh={load} />
      <Scripts partner={partner} referrals={referrals} />
      <div className="mt-6">
        <h2 className="font-heading font-bold text-gray-900 mb-1">Resources</h2>
        <p className="text-xs text-gray-400 mb-4">Everything you need to introduce TrueVitals to your clients</p>
        <Resources signedIn={true} />
      </div>
    </Shell>
  )
}
