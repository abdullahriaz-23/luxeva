import { site } from '@/config/site'
import { useSeo } from '@/hooks/useSeo'
import { formatPrice } from '@/lib/format'
import { LegalLayout } from './Legal'

export default function Terms() {
  useSeo({ title: 'Terms of service', description: 'Template terms of service for the LUXEVA demo store.' })
  return (
    <LegalLayout
      title="Terms of service"
      updated="1 October 2026"
      sections={[
        { heading: 'Introduction', body: <p>These terms govern your use of the {site.name} website and any purchases made through it. By using the website you agree to these terms.</p> },
        { heading: 'Products & pricing', body: <p>We make every effort to display products, colours and prices accurately. Prices are shown in {site.commerce.currency} and may change without notice. We reserve the right to correct errors and to cancel orders placed at an incorrect price.</p> },
        { heading: 'Orders', body: <p>Your order is an offer to purchase. A contract is formed only when we confirm dispatch. We may decline or cancel an order at our discretion, in which case any payment will be refunded in full.</p> },
        { heading: 'Delivery', body: <p>Delivery times are estimates. Standard delivery is complimentary on orders over {formatPrice(site.commerce.freeShippingThreshold)}. Risk passes to you on delivery.</p> },
        { heading: 'Returns & refunds', body: <p>Unworn items in their original condition and packaging may be returned within 30 days of delivery for a full refund to the original payment method. Personalised and made-to-order items cannot be returned unless faulty.</p> },
        { heading: 'Intellectual property', body: <p>All content on this website — including text, imagery, logos and design — is owned by or licensed to {site.name} and may not be reproduced without permission.</p> },
        { heading: 'Liability', body: <p>To the extent permitted by law, we are not liable for indirect or consequential loss arising from use of the website. Nothing in these terms limits your statutory rights.</p> },
        { heading: 'Governing law', body: <p>These terms are governed by the laws of the jurisdiction in which {site.name} is registered. Replace this clause with the governing law appropriate to your business.</p> },
      ]}
    />
  )
}
