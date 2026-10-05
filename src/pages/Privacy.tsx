import { site } from '@/config/site'
import { useSeo } from '@/hooks/useSeo'
import { LegalLayout } from './Legal'

export default function Privacy() {
  useSeo({ title: 'Privacy policy', description: 'Template privacy policy for the LUXEVA demo store.' })
  return (
    <LegalLayout
      title="Privacy policy"
      updated="1 October 2026"
      sections={[
        { heading: 'Who we are', body: <p>This privacy policy explains how {site.name} (“we”, “us”) collects, uses and protects personal information when you visit our website, create an account or place an order.</p> },
        {
          heading: 'Information we collect',
          body: (
            <>
              <p>We may collect information you provide directly, such as your name, email address, shipping address, phone number and order history, as well as information collected automatically, such as device type, browser and pages visited.</p>
              <p>In this template demo, data entered into forms stays in your browser. Your bag, wishlist and demo orders are stored in your browser’s local storage only.</p>
            </>
          ),
        },
        { heading: 'How we use information', body: <p>We use personal information to process and deliver orders, provide client services, personalise your experience, send marketing communications where you have consented, and improve our website and products.</p> },
        { heading: 'Cookies & local storage', body: <p>We use essential cookies and local storage to keep your bag and preferences. With your consent we may use analytics cookies to understand how our website is used. You can control cookies through your browser settings.</p> },
        { heading: 'Sharing information', body: <p>We share information only with trusted service providers who help us operate our business — for example payment processors, delivery partners and email platforms — and only as necessary to provide their services.</p> },
        { heading: 'Your rights', body: <p>Depending on where you live, you may have the right to access, correct, delete or restrict the use of your personal information, and to withdraw consent at any time. Contact us at {site.contact.email} to exercise these rights.</p> },
        { heading: 'Data retention & security', body: <p>We keep personal information only for as long as necessary for the purposes described here, and we use appropriate technical and organisational measures to protect it.</p> },
        { heading: 'Contact', body: <p>Questions about this policy can be sent to {site.contact.email}.</p> },
      ]}
    />
  )
}
