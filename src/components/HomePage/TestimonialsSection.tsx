import React from 'react'
import Container from '../Container'
import { Button } from '../Button'
import ElementRevealFromBottom from '../Animations/ElementRevealFromBottom'
import Image from 'next/image'
import { CircleIcon, StarIcon } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Equipa incansável! Não houve um momento em que não nos tivéssemos sentido amparados e ajudados neste processo de procura de casa!',
    authorName: 'Rosário Pinho',
    authorImageUrl: '/images/testimonials/rosario-pinho.png',
    rating: 5,
  },
  {
    quote:
      'Pessoas extremamente bondosas e profissionais dedicados. Equipa 5 estrelas, sem dúvida!',
    authorName: 'Ivan Silva',
    authorImageUrl: '/images/testimonials/ivan-silva.png',
    rating: 5,
  },
  {
    quote: 'Excelentes Profissionais!',
    authorName: 'Mariana',
    authorImageUrl: '/images/testimonials/mariana.png',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20">
      <Container>
        <header className="mb-16">
          <h2 className="section-badge text-accent line-split-animation">Resultados</h2>
          <p className="section-title line-split-animation">O que Dizem os Nossos Clientes</p>
        </header>
        <div className="flex gap-8">
          <div className="flex flex-col items-start flex-1 overflow-hidden">
            <div
              className="max-w-full overflow-x-hidden py-8 relative"
              style={{
                maskImage:
                  'linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)',
              }}
            >
              <div className="testimonials-carousel-track">
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <TestimonialCard key={testimonial.authorName + index} {...testimonial} />
                ))}
              </div>
            </div>
            <ElementRevealFromBottom>
              <Button
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.google.com/search?sa=X&sca_esv=e7fb2861e3919c2e&rlz=1C5CHFA_enPT1132PT1132&tbm=lcl&sxsrf=AE3TifMcnnQhJam6ba6_pVg9HzF5wrqtog:1758324181488&q=Relux+Cr%C3%ADticas&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDayNDGzNDY2MzEzNzQ1tDAyMd3AyPiKkT8oNae0QsG56PDakszkxOJFrOgiAKEnMIc_AAAA&rldimm=13294693364671518245&hl=pt-PT&ved=2ahUKEwi6ifOB_OWPAxUF2AIHHVA2PB8Q9fQKegQIShAF&biw=1440&bih=778&dpr=2#lkt=LocalPoiReviews"
                variant={'secondary'}
              >
                <GoogleIcon className="mb-px" />
                Ler Mais Google Reviews
              </Button>
            </ElementRevealFromBottom>
          </div>
          <div className="flex-1 flex flex-col items-end">
            <p className="text-6xl line-split-animation font-medium tracking-tight line-split-animation text-balance mb-8 text-right">
              Nós <span className="highlight">Tornamos</span> Tudo Mais Fácil para Si.
            </p>
            <ElementRevealFromBottom>
              <Button variant={'accent'}>
                Fale Connosco Hoje <CircleIcon className="size-2 stroke-none fill-current" />
              </Button>
            </ElementRevealFromBottom>
          </div>
        </div>
      </Container>
    </section>
  )
}

function TestimonialCard({
  quote,
  authorName,
  authorImageUrl,
}: {
  quote: string
  authorName: string
  authorImageUrl: string
}) {
  return (
    <div className="shrink-0 px-4">
      <div className="aspect-[3/2] h-full w-96 border border-foreground/5 rounded-xl bg-secondary p-6 flex flex-col">
        <div className="mb-6 flex items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon key={index} className="w-5 h-5 inline-block fill-orange-600 stroke-none" />
          ))}
        </div>
        <blockquote className="mb-6 tracking-tight font-medium line-clamp-4">"{quote}"</blockquote>
        <div className="flex items-center gap-4 mt-auto">
          <Image
            src={authorImageUrl}
            alt={authorName}
            height={40}
            width={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="tracking-tight font-sm">{authorName}</span>
        </div>
      </div>
    </div>
  )
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="currentColor"
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Google</title>
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  )
}
