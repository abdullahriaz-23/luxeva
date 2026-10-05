import { useState, type FormEvent } from 'react'
import { site } from '@/config/site'
import { faqs } from '@/data/faq'
import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/ui/PageHeader'
import { TextField, SelectField, TextAreaField } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { Accordion } from '@/components/ui/Accordion'
import { DemoNotice } from '@/components/ui/DemoNotice'
import { Icon } from '@/components/ui/Icon'
import { img } from '@/lib/asset'

type Fields = { name: string; email: string; topic: string; order: string; message: string }
const empty: Fields = { name: '', email: '', topic: '', order: '', message: '' }
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const topics = ['Order enquiry', 'Sizing & fit', 'Returns & exchanges', 'Repairs & aftercare', 'Showroom appointment', 'Press', 'Something else']

export default function Contact() {
  useSeo({ title: 'Contact', description: 'Client services, showroom appointments and frequently asked questions.' })
  const [f, setF] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Partial<Fields>>({})
  const [sent, setSent] = useState<string | null>(null)

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setF((p) => ({ ...p, [k]: e.target.value }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }))
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const er: Partial<Fields> = {}
    if (f.name.trim().length < 2) er.name = 'Please enter your name.'
    if (!EMAIL.test(f.email.trim())) er.email = 'Please enter a valid email address.'
    if (!f.topic) er.topic = 'Please choose a topic.'
    if (f.message.trim().length < 10) er.message = 'Please write a message of at least 10 characters.'
    setErrors(er)
    const first = Object.keys(er)[0]
    if (first) {
      document.getElementById(`ct-${first}`)?.focus()
      return
    }
    setSent(f.name.trim().split(' ')[0])
    setF(empty)
  }

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        eyebrow="Client services"
        title={<>How may we <em>help?</em></>}
        intro="Our client advisors are on hand for sizing advice, orders, repairs and private appointments."
      />

      <section className="container-site grid gap-16 pb-[var(--spacing-section)] lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-7">
          {sent ? (
            <div className="border border-line-strong bg-cream p-8 sm:p-12" role="status">
              <span className="flex size-12 items-center justify-center rounded-full border border-ink">
                <Icon name="check" size={20} />
              </span>
              <h2 className="mt-8 font-display text-4xl">Thank you, {sent}.</h2>
              <p className="mt-4 max-w-md text-taupe">Your message has been validated successfully.</p>
              <DemoNotice className="mt-6 max-w-lg">
                This is a frontend demo — the message was <strong className="font-medium">not</strong> sent anywhere. Connect a
                form service or your own API to deliver messages (see README → Connecting a backend).
              </DemoNotice>
              <Button variant="secondary" className="mt-8" onClick={() => setSent(null)}>
                Write another message
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
              <TextField id="ct-name" label="Full name" autoComplete="name" required value={f.name} onChange={set('name')} error={errors.name} />
              <TextField id="ct-email" label="Email" type="email" autoComplete="email" required value={f.email} onChange={set('email')} error={errors.email} />
              <SelectField id="ct-topic" label="Topic" required value={f.topic} onChange={set('topic')} error={errors.topic}>
                <option value="">Select a topic</option>
                {topics.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </SelectField>
              <TextField id="ct-order" label="Order number (optional)" value={f.order} onChange={set('order')} placeholder="LX-000000" />
              <TextAreaField id="ct-message" label="Message" required value={f.message} onChange={set('message')} error={errors.message} className="sm:col-span-2" />
              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-taupe">Demo form — messages are validated but not sent.</p>
                <Button type="submit" size="lg" arrow>
                  Send message
                </Button>
              </div>
            </form>
          )}
        </div>

        <aside className="space-y-12 lg:col-span-4 lg:col-start-9">
          <div>
            <p className="eyebrow text-taupe">Client services</p>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              <li className="flex items-start gap-3">
                <Icon name="mail" size={18} className="mt-1 shrink-0" />
                <a href={`mailto:${site.contact.email}`} className="link-underline-static">
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="phone" size={18} className="mt-1 shrink-0" />
                <span>{site.contact.phone}</span>
              </li>
              <li className="pl-8 text-sm text-taupe">{site.contact.hours}</li>
            </ul>
          </div>
          <div>
            <img src={img('campaign/hero-detail.svg')} alt="The showroom: a bag displayed on a stone plinth" loading="lazy" className="aspect-[4/3] w-full bg-sand object-cover" />
            <p className="eyebrow mt-6 text-taupe">Showroom</p>
            <p className="mt-3 font-display text-2xl">{site.contact.showroom.name}</p>
            <address className="mt-3 flex items-start gap-3 not-italic text-[0.95rem] text-taupe">
              <Icon name="pin" size={18} className="mt-1 shrink-0 text-ink" />
              <span>
                {site.contact.showroom.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
                <span className="mt-2 block text-sm">{site.contact.showroom.hours}</span>
              </span>
            </address>
            <p className="mt-3 text-xs text-taupe">Fictional demo address.</p>
          </div>
        </aside>
      </section>

      <section id="faq" className="scroll-mt-24 bg-cream">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-taupe">FAQ</p>
            <h2 className="display-lg mt-5">
              Frequently <em>asked</em>
            </h2>
            <p className="mt-6 max-w-xs text-taupe">Quick answers on delivery, returns, sizing and aftercare.</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Accordion items={faqs.map((q, i) => ({ id: `faq-${i}`, title: q.q, content: <p>{q.a}</p> }))} defaultOpen={['faq-0']} />
          </div>
        </div>
      </section>
    </>
  )
}
